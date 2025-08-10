// components/Chatbot.jsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../hooks/useChatbot';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  const {
    messages,
    sendMessage,
    clearMessages,
    isLoading,
    isTyping,
    isConnected,
    error,
    retryConnection,
  } = useChatbot();

  // Enhanced scroll to bottom function
  const scrollToBottom = () => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100); // Small delay to ensure DOM is updated

    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timeoutId = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    if (!inputMessage.trim() || isLoading) return;

    const messageToSend = inputMessage;
    setInputMessage('');
    await sendMessage(messageToSend);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClearMessages = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearMessages();
  };

  const handleRetryConnection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    retryConnection();
  };

  const ConnectionStatus = () => {
    if (!isConnected && error) {
      return (
        <div className="connection-error">
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
          <button
            onClick={handleRetryConnection}
            className="retry-button"
            type="button"
          >
            Retry Connection
          </button>
        </div>
      );
    }
    return null;
  };

  const TypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <div className="message-container assistant">
        <div className="avatar assistant-avatar">
          <span className="avatar-text">🤖</span>
        </div>
        <div className="message assistant-message typing-indicator">
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="typing-text">IoSC Assistant is typing...</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
      {/* Chat Toggle Button */}
      <button
        className={`chat-toggle ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        type="button"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <span className="close-icon">✕</span>
        ) : (
          <>
            <span className="chat-icon">💬</span>
            {!isConnected && <span className="offline-indicator">⚠️</span>}
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window" onClick={(e) => e.stopPropagation()}>
          {/* Chat Header */}
          <div className="chat-header">
            <div className="header-info">
              <div className="bot-avatar">🤖</div>
              <div className="header-text">
                <h3>IoSC Assistant</h3>
                <span className={`status ${isConnected ? 'online' : 'offline'}`}>
                  {isConnected ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <div className="header-actions">
              <button
                onClick={handleClearMessages}
                className="clear-button"
                title="Clear chat"
                disabled={isLoading}
                type="button"
              >
                🗑️
              </button>
              <button
                onClick={handleToggle}
                className="minimize-button"
                title="Minimize"
                type="button"
              >
                ➖
              </button>
            </div>
          </div>

          {/* Connection Status */}
          <ConnectionStatus />

          {/* Chat Messages */}
          <div
            className="chat-messages"
            ref={messagesContainerRef}
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: '100%'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-container ${message.role} ${message.isError ? 'error' : ''}`}
              >
                <div className={`avatar ${message.role}-avatar`}>
                  <span className="avatar-text">
                    {message.role === 'user' ? '👤' : '🤖'}
                  </span>
                </div>
                <div
                  className={`message ${message.role}-message`}
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(message.content)
                  }}
                />
                <div className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}

            <TypingIndicator />
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="chat-input-container">
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <div className="input-wrapper">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isConnected
                      ? "Ask me anything about IoSC..."
                      : "Connecting to chatbot..."
                  }
                  disabled={isLoading || !isConnected}
                  rows={1}
                  className="message-input"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim() || !isConnected}
                  className="send-button"
                  onClick={handleSendMessage}
                >
                  {isLoading ? (
                    <span className="loading-spinner">⏳</span>
                  ) : (
                    <span className="send-icon">📤</span>
                  )}
                </button>
              </div>
            </form>
            {isConnected && (
              <div className="chat-footer">
                <small>Powered by IoSC RAG Assistant</small>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;