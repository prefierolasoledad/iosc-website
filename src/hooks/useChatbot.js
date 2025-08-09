// hooks/useChatbot.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://iosctestbackend-production.up.railway.app/';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize session and check connection - only on client side
  useEffect(() => {
    // Prevent running on server side
    if (typeof window === 'undefined') return;

    const initializeSession = async () => {
      try {
        // Check if API is available
        const healthResponse = await api.get('/health');
        setIsConnected(true);

        // Generate session ID with consistent client-side generation
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        const newSessionId = `session_${timestamp}_${random}`;
        setSessionId(newSessionId);

        // Add welcome message with consistent timestamp
        const welcomeMessage = {
          id: 'welcome',
          role: 'assistant',
          content: 'Hello! I\'m your IoSC assistant. I can help you with information about our tech club, events, projects, team members, and more. What would you like to know?',
          timestamp: new Date().toISOString(),
        };

        setMessages([welcomeMessage]);
        setError(null);
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize chatbot:', error);
        setIsConnected(false);
        setError('Unable to connect to chatbot service. Please try again later.');
        setIsInitialized(true);
      }
    };

    // Small delay to ensure client-side rendering is complete
    const timeoutId = setTimeout(initializeSession, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const sendMessage = useCallback(async (message) => {
    if (!message.trim() || isLoading || !sessionId || typeof window === 'undefined') return;

    const userMessage = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      role: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    try {
      const response = await api.post('/chat', {
        message: message.trim(),
        session_id: sessionId,
      });

      const assistantMessage = {
        id: `assistant_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        role: 'assistant',
        content: response.data.response,
        timestamp: response.data.timestamp,
      };

      // Add assistant message
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error sending message:', error);

      let errorMessage = 'Sorry, I encountered an error while processing your message. Please try again.';

      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again with a shorter message.';
      } else if (error.response?.status === 503) {
        errorMessage = 'Chatbot service is temporarily unavailable. Please try again later.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }

      const errorMessageObj = {
        id: `error_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date().toISOString(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessageObj]);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [sessionId, isLoading]);

  const clearMessages = useCallback(async () => {
    if (typeof window === 'undefined') return;

    try {
      if (sessionId) {
        await api.delete(`/sessions/${sessionId}`);
      }
      setMessages([
        {
          id: `welcome_new_${Date.now()}`,
          role: 'assistant',
          content: 'Chat cleared! How can I help you today?',
          timestamp: new Date().toISOString(),
        },
      ]);
      setError(null);
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
  }, [sessionId]);

  const retryConnection = useCallback(async () => {
    if (typeof window === 'undefined') return;

    setError(null);
    try {
      const healthResponse = await api.get('/health');
      setIsConnected(true);

      if (!sessionId) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        const newSessionId = `session_${timestamp}_${random}`;
        setSessionId(newSessionId);
      }
    } catch (error) {
      console.error('Retry connection failed:', error);
      setIsConnected(false);
      setError('Still unable to connect to chatbot service.');
    }
  }, [sessionId]);

  const getChatHistory = useCallback(async () => {
    if (!sessionId || typeof window === 'undefined') return [];

    try {
      const response = await api.get(`/sessions/${sessionId}/history`);
      return response.data.messages;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  }, [sessionId]);

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading,
    isTyping,
    isConnected,
    error,
    sessionId,
    retryConnection,
    getChatHistory,
    isInitialized, // Add this to know when hook is ready
  };
};
