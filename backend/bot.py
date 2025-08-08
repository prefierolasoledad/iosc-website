from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
import logging
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv
from data_processor import IoSCDataProcessor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI(title="IoSC RAG Chatbot API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models for API
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str
    timestamp: str
    status: str = "success"


class HealthResponse(BaseModel):
    status: str
    gemini_available: bool
    data_loaded: bool
    timestamp: str


@dataclass
class ChatMessage:
    """Represents a chat message with role, content, and timestamp."""
    role: str
    content: str
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())
    metadata: Dict[str, Any] = field(default_factory=dict)


class IoSCRAGChatbot:
    """
    IoSC RAG (Retrieval-Augmented Generation) Chatbot that combines
    knowledge retrieval with AI generation for answering IoSC-related questions.
    """

    def __init__(self, data_dir: str = "processed_data", context_window: int = 5):
        """
        Initialize the chatbot with data processing and AI model setup.
        """
        self.data_dir = data_dir
        self.context_window = context_window
        self.chat_sessions: Dict[str, List[ChatMessage]] = {}
        self.data_processor = None
        self.model = None
        self.gemini_available = False

        # System prompt for the AI model
        self.system_prompt = """You are an AI assistant specializing in the IoSC Tech Club. 
Your role is to provide accurate, helpful, and friendly responses about IoSC based on the provided context.

Guidelines:
- Use the context information to answer questions accurately
- Be conversational and professional
- If information is not in the context, politely state this and suggest contacting IoSC directly
- Provide specific details when available
- Use formatting to make responses clear and readable
- If multiple sources are relevant, synthesize the information coherently
- Keep responses concise but informative"""

        # Query expansion mappings
        self.query_expansions = {
            'iosc': 'intel oneapi students club',
            'iot': 'internet of things',
            'ai': 'artificial intelligence',
            'ml': 'machine learning',
            'dl': 'deep learning',
            'who is': 'about',
            'what is': 'about',
            'contact': 'contact information',
            'events': 'events activities workshops',
            'projects': 'projects initiatives',
            'members': 'team members leadership',
        }

        # Initialize components
        self._initialize_components()

    def _initialize_components(self) -> None:
        """Initialize data processor and AI model."""
        try:
            self._setup_data_processor()
            self._setup_gemini()
            logger.info("IoSC RAG Chatbot initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize chatbot: {str(e)}")
            raise

    def _setup_data_processor(self) -> None:
        """Initialize and load the data processor."""
        try:
            self.data_processor = IoSCDataProcessor()
            if not self.data_processor.load_processed_data(self.data_dir):
                raise RuntimeError("Failed to load processed data")
            logger.info("Data processor loaded successfully")
        except Exception as e:
            logger.error(f"Data processor setup failed: {str(e)}")
            raise

    def _setup_gemini(self) -> None:
        """Configure and test the Gemini AI model."""
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            logger.warning("Gemini API key not found in environment variables")
            self.gemini_available = False
            return

        try:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')

            # Test the model with a simple prompt
            test_response = self.model.generate_content("Hello")
            if test_response and test_response.text:
                self.gemini_available = True
                logger.info("Gemini API configured successfully")
            else:
                raise RuntimeError("Gemini API test failed")

        except Exception as e:
            logger.error(f"Gemini setup error: {str(e)}")
            self.gemini_available = False

    def get_session_history(self, session_id: str) -> List[ChatMessage]:
        """Get chat history for a session."""
        if session_id not in self.chat_sessions:
            self.chat_sessions[session_id] = []
        return self.chat_sessions[session_id]

    def preprocess_query(self, query: str) -> str:
        """Preprocess user query by expanding abbreviations and normalizing text."""
        if not query:
            return ""

        query = query.lower().strip()

        # Expand abbreviations and common terms
        for abbr, full in self.query_expansions.items():
            import re
            pattern = rf'\b{re.escape(abbr)}\b'
            query = re.sub(pattern, full, query)

        return query

    def get_relevant_context(self, query: str, top_k: int = 5, min_similarity: float = 0.05) -> List[Dict]:
        """Retrieve relevant context documents for the query."""
        try:
            if not self.data_processor:
                return []

            processed_query = self.preprocess_query(query)
            results = self.data_processor.search_similar(processed_query, top_k=top_k)

            # Filter by minimum similarity score
            relevant_docs = [doc for doc in results if doc.get('similarity_score', 0) > min_similarity]

            logger.info(f"Retrieved {len(relevant_docs)} relevant documents for query: {query}")
            return relevant_docs

        except Exception as e:
            logger.error(f"Error retrieving context: {str(e)}")
            return []

    def format_context_for_llm(self, context_docs: List[Dict]) -> str:
        """Format retrieved context documents for the language model."""
        if not context_docs:
            return "No relevant context found in the IoSC knowledge base."

        formatted_context = "=== CONTEXT INFORMATION FROM IOSC KNOWLEDGE BASE ===\n\n"

        for i, doc in enumerate(context_docs, 1):
            formatted_context += f"--- SOURCE {i} ---\n"
            formatted_context += f"Title: {doc.get('title', 'Unknown')}\n"
            formatted_context += f"Category: {doc.get('category', 'General')}\n"
            formatted_context += f"Content: {doc.get('content', 'No content available')}\n"
            formatted_context += f"Relevance Score: {doc.get('similarity_score', 0):.3f}\n\n"

        return formatted_context

    def get_conversation_context(self, session_id: str) -> str:
        """Get recent conversation context for continuity."""
        chat_history = self.get_session_history(session_id)
        if not chat_history:
            return ""

        recent_messages = chat_history[-self.context_window:]
        context = "=== RECENT CONVERSATION CONTEXT ===\n"

        for msg in recent_messages:
            context += f"{msg.role.upper()}: {msg.content}\n"

        return context + "\n"

    def generate_response_with_gemini(self, query: str, context_docs: List[Dict], session_id: str) -> str:
        """Generate response using Gemini AI model."""
        if not self.gemini_available:
            return self.fallback_response(query, context_docs)

        try:
            context_text = self.format_context_for_llm(context_docs)
            conversation_context = self.get_conversation_context(session_id)

            prompt = f"""
{self.system_prompt}

{conversation_context}

{context_text}

=== USER QUESTION ===
{query}

Based on the context information provided above, please provide a helpful and accurate response.
If the context doesn't contain relevant information, politely inform the user and suggest contacting IoSC directly.
"""

            response = self.model.generate_content(prompt)

            if response and response.text:
                return response.text.strip()
            else:
                logger.warning("Empty response from Gemini API")
                return self.fallback_response(query, context_docs)

        except Exception as e:
            logger.error(f"Gemini API Error: {str(e)}")
            return self.fallback_response(query, context_docs)

    def fallback_response(self, query: str, context_docs: List[Dict]) -> str:
        """Generate fallback response when AI model is unavailable."""
        if not context_docs:
            return (
                "I don't have specific information about that in my knowledge base. "
                "For detailed information, please contact IoSC directly through their official channels."
            )

        response = "Based on the available information:\n\n"

        for doc in context_docs:
            if doc.get('similarity_score', 0) > 0.1:
                response += f"**{doc.get('title', 'Unknown Title')}** ({doc.get('category', 'General')}):\n"
                response += f"{doc.get('content', 'No content available')}\n\n"

        response += "*Would you like me to provide more specific information about any aspect?*"
        return response

    def chat(self, user_input: str, session_id: str) -> str:
        """Main chat function to process user input and generate response."""
        if not user_input.strip():
            return "Please ask me something about IoSC!"

        try:
            # Get relevant context documents
            context_docs = self.get_relevant_context(user_input, top_k=5)

            # Generate response using AI model or fallback
            response = self.generate_response_with_gemini(user_input, context_docs, session_id)

            # Store conversation in history
            chat_history = self.get_session_history(session_id)

            chat_history.append(ChatMessage(
                role="user",
                content=user_input,
                metadata={"context_docs_count": len(context_docs)}
            ))

            chat_history.append(ChatMessage(
                role="assistant",
                content=response,
                metadata={"gemini_used": self.gemini_available}
            ))

            # Keep only recent messages to prevent memory issues
            if len(chat_history) > 20:
                self.chat_sessions[session_id] = chat_history[-20:]

            return response

        except Exception as e:
            logger.error(f"Error in chat processing: {str(e)}")
            return "I apologize, but I encountered an error while processing your question. Please try again."

    def get_health_status(self) -> Dict[str, Any]:
        """Get chatbot health status."""
        return {
            "gemini_available": self.gemini_available,
            "data_loaded": self.data_processor is not None,
            "active_sessions": len(self.chat_sessions)
        }


# Initialize the chatbot instance
try:
    chatbot = IoSCRAGChatbot()
    logger.info("Chatbot initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize chatbot: {str(e)}")
    chatbot = None


@app.on_event("startup")
async def startup_event():
    """Startup event handler."""
    logger.info("FastAPI server starting up...")
    if chatbot:
        logger.info("IoSC RAG Chatbot API is ready!")
    else:
        logger.error("Chatbot initialization failed!")


@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "IoSC RAG Chatbot API", "status": "running"}


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    if not chatbot:
        raise HTTPException(status_code=503, detail="Chatbot not available")

    status = chatbot.get_health_status()
    return HealthResponse(
        status="healthy" if status["data_loaded"] else "degraded",
        gemini_available=status["gemini_available"],
        data_loaded=status["data_loaded"],
        timestamp=datetime.now().isoformat()
    )


@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Main chat endpoint."""
    if not chatbot:
        raise HTTPException(status_code=503, detail="Chatbot not available")

    # Generate session ID if not provided
    session_id = request.session_id or f"session_{datetime.now().strftime('%Y%m%d_%H%M%S_%f')}"

    try:
        response = chatbot.chat(request.message, session_id)

        return ChatResponse(
            response=response,
            session_id=session_id,
            timestamp=datetime.now().isoformat(),
            status="success"
        )

    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/sessions/{session_id}/history")
async def get_chat_history(session_id: str):
    """Get chat history for a session."""
    if not chatbot:
        raise HTTPException(status_code=503, detail="Chatbot not available")

    history = chatbot.get_session_history(session_id)
    return {
        "session_id": session_id,
        "messages": [
            {
                "role": msg.role,
                "content": msg.content,
                "timestamp": msg.timestamp,
                "metadata": msg.metadata
            }
            for msg in history
        ]
    }


@app.delete("/sessions/{session_id}")
async def clear_session(session_id: str):
    """Clear chat history for a session."""
    if not chatbot:
        raise HTTPException(status_code=503, detail="Chatbot not available")

    if session_id in chatbot.chat_sessions:
        del chatbot.chat_sessions[session_id]
        return {"message": f"Session {session_id} cleared"}

    return {"message": f"Session {session_id} not found"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)