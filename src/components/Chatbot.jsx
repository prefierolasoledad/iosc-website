import React, { useState } from 'react';
import './Chatbot.css';
import questions from './questions';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);  // Track if the chatbot is open
  const [activeChat, setActiveChat] = useState(null);  // Store the active chat response

  const handleQuestionClick = (answer) => {
    setActiveChat(answer);
  };

  return (
    <div>
      {/* The chatbot button, appears when chatbot is minimized */}
      {!isOpen && (
        <div className="chatbot-button" onClick={() => setIsOpen(true)}>
          🗨️ Chat with IoSC
        </div>
      )}

      {/* Chatbot interface when open */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>🤖 IoSC Bot</span>
            <button className="close-button" onClick={() => setIsOpen(false)}>❌</button>
          </div>
          <div className="chatbot-menu">
            <button className="chatbot-menu-item" onClick={() => handleQuestionClick("Yo! IoSC is where tech meets madness 🤖💥 Students’ most dynamic, tech-crazy club!")}>
              What is IoSC?
            </button>
            <button className="chatbot-menu-item" onClick={() => handleQuestionClick("OF COURSE it's IoSC 😎 Any other answer is fake news 🧢")}>
              Which is the best club?
            </button>
            <button className="chatbot-menu-item" onClick={() => handleQuestionClick("i3 (Software 💻), i5 (IoT 📟), i7 (Games 🎮), i9 (AI 🧠), Arc (Design 🎨), Ultra (Ground crew 🚀)")}>
              Tell me about the teams
            </button>
            <button className="chatbot-menu-item" onClick={() => handleQuestionClick("Vespera & Azintek 💣🔥 The most explosive fests in Delhi!")}>
              Events?
            </button>
            <button className="chatbot-menu-item" onClick={() => handleQuestionClick("Tech + Free Food = IoSC ❤️")}>
              Will I get food in events?
            </button>
          </div>
          {activeChat && (
            <div className="chatbot-response">
              <div className="response-bubble">{activeChat}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
