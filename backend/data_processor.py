import json
import numpy as np
import pickle
import os
from typing import List, Dict, Any
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from collections import Counter
import string


class IoSCDataProcessor:
    def __init__(self):
        """
        Initialize the data processor with TF-IDF vectorizer
        """
        self.vectorizer = TfidfVectorizer(
            max_features=5000,
            stop_words='english',
            ngram_range=(1, 2),
            lowercase=True
        )
        self.processed_data = []
        self.tfidf_matrix = None
        self.is_fitted = False

    def load_data(self, json_file_path: str) -> List[Dict]:
        """
        Load the processed IoSC data from JSON file
        """
        try:
            with open(json_file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
            # The data is already a list of documents
            return data
        except FileNotFoundError:
            print(f"File {json_file_path} not found. Please ensure the JSON file exists.")
            return []
        except json.JSONDecodeError:
            print(f"Error decoding JSON from {json_file_path}")
            return []

    def preprocess_text(self, text: str) -> str:
        """
        Clean and preprocess text
        """
        # Convert to lowercase
        text = text.lower()

        # Remove punctuation
        text = text.translate(str.maketrans('', '', string.punctuation))

        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()

        return text

    def chunk_content(self, content: str, max_length: int = 300) -> List[str]:
        """
        Split content into smaller chunks for better retrieval
        """
        if len(content) <= max_length:
            return [content]

        # Split by sentences first
        sentences = re.split(r'[.!?]+', content)
        chunks = []
        current_chunk = ""

        for sentence in sentences:
            sentence = sentence.strip()
            if not sentence:
                continue

            # If adding this sentence would exceed max_length, start a new chunk
            if len(current_chunk) + len(sentence) + 1 > max_length:
                if current_chunk:
                    chunks.append(current_chunk.strip())
                current_chunk = sentence
            else:
                current_chunk += ". " + sentence if current_chunk else sentence

        # Add the last chunk
        if current_chunk:
            chunks.append(current_chunk.strip())

        return chunks

    def create_searchable_documents(self, raw_documents: List[Dict]) -> List[Dict]:
        """
        Create searchable documents from the processed IoSC data
        """
        documents = []

        for doc in raw_documents:
            # Create chunks from content
            chunks = self.chunk_content(doc['content'])

            for i, chunk in enumerate(chunks):
                # Create searchable text combining all relevant info
                # Include title, content, tags, and category for better searchability
                tags_text = ' '.join(doc.get('tags', []))
                searchable_text = f"{doc['title']} {chunk} {tags_text} {doc['category']}"

                processed_doc = {
                    'id': f"{doc['id']}_{i}" if len(chunks) > 1 else doc['id'],
                    'title': doc['title'],
                    'content': chunk,
                    'category': doc['category'],
                    'tags': doc.get('tags', []),
                    'url': doc.get('url', ''),
                    'metadata': doc.get('metadata', {}),
                    'full_content': doc['content'],
                    'searchable_text': searchable_text,
                    'chunk_index': i,
                    'total_chunks': len(chunks)
                }
                documents.append(processed_doc)

        return documents

    def create_tfidf_matrix(self, documents: List[Dict]):
        """
        Create TF-IDF matrix for all documents
        """
        texts = [doc['searchable_text'] for doc in documents]

        print(f"Creating TF-IDF matrix for {len(texts)} documents...")
        self.tfidf_matrix = self.vectorizer.fit_transform(texts)
        self.is_fitted = True
        print("TF-IDF matrix created successfully!")

    def process_data(self, json_file_path: str) -> List[Dict]:
        """
        Complete data processing pipeline
        """
        print("Loading data...")
        raw_documents = self.load_data(json_file_path)

        if not raw_documents:
            print("No data loaded. Please check your JSON file.")
            return []

        print(f"Loaded {len(raw_documents)} documents")

        print("Creating searchable documents...")
        documents = self.create_searchable_documents(raw_documents)
        print(f"Created {len(documents)} searchable documents")

        print("Creating TF-IDF matrix...")
        self.create_tfidf_matrix(documents)

        self.processed_data = documents

        return documents

    def save_processed_data(self, output_dir: str = "processed_data"):
        """
        Save processed data and TF-IDF matrix
        """
        os.makedirs(output_dir, exist_ok=True)

        # Save documents
        with open(os.path.join(output_dir, "documents.json"), 'w', encoding='utf-8') as f:
            json.dump(self.processed_data, f, indent=2, ensure_ascii=False)

        # Save TF-IDF vectorizer and matrix
        with open(os.path.join(output_dir, "vectorizer.pkl"), 'wb') as f:
            pickle.dump(self.vectorizer, f)

        with open(os.path.join(output_dir, "tfidf_matrix.pkl"), 'wb') as f:
            pickle.dump(self.tfidf_matrix, f)

        print(f"Saved {len(self.processed_data)} documents and TF-IDF data to {output_dir}")

    def load_processed_data(self, data_dir: str = "processed_data"):
        """
        Load previously processed data and TF-IDF matrix
        """
        try:
            # Load documents
            with open(os.path.join(data_dir, "documents.json"), 'r', encoding='utf-8') as f:
                self.processed_data = json.load(f)

            # Load vectorizer and matrix
            with open(os.path.join(data_dir, "vectorizer.pkl"), 'rb') as f:
                self.vectorizer = pickle.load(f)

            with open(os.path.join(data_dir, "tfidf_matrix.pkl"), 'rb') as f:
                self.tfidf_matrix = pickle.load(f)

            self.is_fitted = True
            print(f"Loaded {len(self.processed_data)} documents and TF-IDF data from {data_dir}")
            return True
        except FileNotFoundError:
            print(f"Processed data not found in {data_dir}")
            return False

    def search_similar(self, query: str, top_k: int = 3) -> List[Dict]:
        """
        Search for similar documents based on query
        """
        if not self.processed_data or not self.is_fitted:
            print("No processed data available. Please process data first.")
            return []

        # Preprocess query
        processed_query = self.preprocess_text(query)

        # Transform query to TF-IDF vector
        query_vector = self.vectorizer.transform([processed_query])

        # Calculate cosine similarities
        similarities = cosine_similarity(query_vector, self.tfidf_matrix).flatten()

        # Get top k similar documents
        top_indices = np.argsort(similarities)[-top_k:][::-1]

        results = []
        for idx in top_indices:
            if similarities[idx] > 0:  # Only include results with positive similarity
                result = self.processed_data[idx].copy()
                result['similarity_score'] = float(similarities[idx])
                results.append(result)

        return results

    def search_by_category(self, category: str, top_k: int = 5) -> List[Dict]:
        """
        Search for documents by category
        """
        if not self.processed_data:
            print("No processed data available.")
            return []

        category_docs = [doc for doc in self.processed_data if doc['category'].lower() == category.lower()]
        return category_docs[:top_k]

    def search_by_tags(self, tags: List[str], top_k: int = 5) -> List[Dict]:
        """
        Search for documents that contain any of the specified tags
        """
        if not self.processed_data:
            print("No processed data available.")
            return []

        results = []
        for doc in self.processed_data:
            doc_tags = [tag.lower() for tag in doc.get('tags', [])]
            if any(tag.lower() in doc_tags for tag in tags):
                results.append(doc)

        return results[:top_k]

    def get_stats(self):
        """
        Get statistics about the processed data
        """
        if not self.processed_data:
            print("No processed data available.")
            return

        categories = [doc['category'] for doc in self.processed_data]
        category_counts = Counter(categories)

        # Get all unique tags
        all_tags = []
        for doc in self.processed_data:
            all_tags.extend(doc.get('tags', []))
        tag_counts = Counter(all_tags)

        print(f"\nDataset Statistics:")
        print(f"Total documents: {len(self.processed_data)}")
        print(f"Categories:")
        for category, count in category_counts.items():
            print(f"  - {category}: {count}")

        print(f"\nTop 10 Tags:")
        for tag, count in tag_counts.most_common(10):
            print(f"  - {tag}: {count}")

        if self.is_fitted:
            print(f"\nTF-IDF vocabulary size: {len(self.vectorizer.vocabulary_)}")

    def get_all_categories(self) -> List[str]:
        """
        Get all unique categories in the dataset
        """
        if not self.processed_data:
            return []

        categories = list(set(doc['category'] for doc in self.processed_data))
        return sorted(categories)

    def get_all_tags(self) -> List[str]:
        """
        Get all unique tags in the dataset
        """
        if not self.processed_data:
            return []

        all_tags = []
        for doc in self.processed_data:
            all_tags.extend(doc.get('tags', []))

        return sorted(list(set(all_tags)))


# Example usage and testing
if __name__ == "__main__":
    # Initialize processor
    processor = IoSCDataProcessor()

    # Process data using the new IoSC processed data format
    documents = processor.process_data('iosc_processed_data.json')

    if documents:
        # Save processed data
        processor.save_processed_data()

        # Show statistics
        processor.get_stats()

        # Test search
        test_queries = [
            "Who is the president of IoSC?",
            "Who are the mentors of IoSC?",
            "What projects does IoSC work on?",
            "How to contact IoSC?",
            "Tell me about the AI team",
            "What is Team I3?",
            "Tell me about Azintek tech fest",
            "What is Hydro Heroes project?",
            "Who are the alumni of IoSC?",
            "Tell me about the leadership team"
        ]

        print("\n" + "=" * 60)
        print("TESTING SEARCH FUNCTIONALITY")
        print("=" * 60)

        for query in test_queries:
            print(f"\nQuery: '{query}'")
            results = processor.search_similar(query, top_k=2)

            if results:
                for i, result in enumerate(results):
                    print(f"\nResult {i + 1} (Score: {result['similarity_score']:.3f})")
                    print(f"Title: {result['title']}")
                    print(f"Content: {result['content']}")
                    print(f"Category: {result['category']}")
                    print(f"Tags: {', '.join(result['tags'])}")
                    print("-" * 50)
            else:
                print("No relevant results found.")

        # Test category search
        print("\n" + "=" * 60)
        print("TESTING CATEGORY SEARCH")
        print("=" * 60)

        categories = processor.get_all_categories()
        print(f"Available categories: {categories}")

        for category in categories[:3]:  # Test first 3 categories
            print(f"\nCategory: '{category}'")
            results = processor.search_by_category(category, top_k=2)
            for result in results:
                print(f"- {result['title']}")

        # Test tag search
        print("\n" + "=" * 60)
        print("TESTING TAG SEARCH")
        print("=" * 60)

        test_tags = ["AI", "hackathon", "leadership", "IoT"]
        for tag in test_tags:
            print(f"\nTag: '{tag}'")
            results = processor.search_by_tags([tag], top_k=2)
            for result in results:
                print(f"- {result['title']}")

        print("\nData processing completed successfully!")
        print("You can now proceed to building the RAG chatbot interface.")
    else:
        print("Failed to process data. Please check your iosc_processed_data.json file.")