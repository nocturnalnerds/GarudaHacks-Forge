import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Chat.css';

import { languages } from '../../data/languageData';
import defaultUserIcon from '../../assets/images/default.png';
import bumiIcon from '../../assets/images/bumi.png'; // Import the new icon

// ... (getBotResponse function remains unchanged) ...
const getBotResponse = async (userMessage, language) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (language.toLowerCase() === 'jawa') {
    return `Nggih, kula nampi pesen sampeyan babagan: "${userMessage}"`;
  }
  if (language.toLowerCase() === 'sunda') {
    return `Leres, abdi nampi pesen anjeun ngeunaan: "${userMessage}"`;
  }
  return `I have received your message about: "${userMessage}"`;
};

function Chat() {
  // ... (all your existing hooks and functions like useState, useEffect, handleSend, etc. remain unchanged) ...
  const { language } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const botData = languages.find(lang => lang.name.toLowerCase() === language.toLowerCase());

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `Hello! You are now chatting with the ${language} bot. Ask me anything!`,
        sender: 'bot',
      },
    ]);
  }, [language]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsBotTyping(true);
    const botResponseText = await getBotResponse(input, language);
    const botMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
    setIsBotTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div className="chat-page">
      <header className="chat-header">
        <Link to="/selector" className="back-arrow-chat">←</Link>
        <h1>Chat with {language} Bot</h1>

        {/* NEW: Add the link to the game map */}
        <Link to="/map" className="game-link">
          <span>Back to the game</span>
          <img src={bumiIcon} alt="Game Map" />
        </Link>
      </header>
      
      {/* The rest of your JSX (.chat-messages, .chat-input-area) remains unchanged */}
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-row ${msg.sender}`}>
            {msg.sender === 'bot' && (
              <img src={botData?.image} alt="Bot Avatar" className="chat-avatar" />
            )}
            <div className="message-bubble">
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <img src={defaultUserIcon} alt="User Avatar" className="chat-avatar" />
            )}
          </div>
        ))}
        {isBotTyping && (
          <div className="message-row bot">
            <img src={botData?.image} alt="Bot Avatar" className="chat-avatar" />
            <div className="message-bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;