import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Chat.css';

import { languages } from '../../data/languageData';
import defaultUserIcon from '../../assets/images/default.png';
import bumiIcon from '../../assets/images/bumi.png'; // Import the new icon
import axios from 'axios';


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

const handlePlayAudio = async (text , lang) => {
  const LANG_ENUM = {
    Bali: "bali",
    Jawa: "java",
    Madura: "madura",
    Makasar: "makasar",
    Sunda: "sunda"
  };

  const selectedLang = LANG_ENUM[lang];
  const apiUrl = import.meta.env.VITE_BE_API;
  const response = await axios.post(`${apiUrl}/quiz/tts`, { lang:selectedLang, text });

  if (response.status === 200 && response.data.url) {
    const audioUrl = response.data.url;  // The URL returned by your API
    console.log(`Playing audio from: ${audioUrl}`);

    // Play the audio
    const audio = new Audio(audioUrl);
    audio.play();
  } else {
    console.error('Failed to get audio URL from TTS API');
  }
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
        text: `Hallo! Kenalin aku bot bahasa ${language} . Tanya aku apa saja yaa!`,
        translation: '',
        picture: '',
        sender: 'bot',
      },
    ]);
  }, [language]);


  const handleSend = async () => {
    if (input.trim() === '') return;
    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user.id, user.name);
    setIsBotTyping(true);

    try {
      const apiUrl = import.meta.env.VITE_BE_API;
      const response = await axios.post(`${apiUrl}/chatAI/${language}/${user.id}`, {
        message: input
      });
      console.log(response)

      const botReplies = {id: Date.now(), text: response.data.message, translation: response.data.translation, picture: response.data.imageUrl ,sender: 'bot'}
      setMessages(prev => [...prev, botReplies]);
      // const { message, translation, imageUrl } = response.data;
      setIsBotTyping(false);
      // // ✅ Handle the response
      // console.log('AI Message:', message);
      // console.log('Indonesian Translation:', translation);
      // console.log('Image URL (if any):', imageUrl);
      
      // 🧠 Set this into your state or message list
      // setMessages(prev => [...prev, { from: 'ai', message, translation, imageUrl }]);
      
      setInput(''); // clear input after sending
    } catch (error) {
      console.error('Failed to send message:', error);
      // You can show toast or UI error message here
    }
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
      
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-row ${msg.sender}`}>
            {msg.sender === 'bot' && (
              <>
                <img src={botData?.image} alt="Bot Avatar" className="chat-avatar" />
                {/* Speaker icon for bot message */}
                <button
                  className="speaker-btn"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '8px',
                    padding: 0,
                    alignSelf: 'flex-start'
                  }}
                  onClick={() => {
                    handlePlayAudio(msg.text, language);
                  }}
                  title="Play message"
                >
                  {/* Simple SVG speaker icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </button>
              </>
            )}
            <div className="message-bubble">
              {msg.text}
              {msg.translation && (
                <>
                  <br />
                  <hr style={{ border: '0', borderTop: '1px solid #bbb', margin: '8px 0' }} />
                  <div className="message-translation">{msg.translation}</div>
                </>
              )}
              {/* Slot for image if exists */}
              {msg.picture && (
                <div className="message-image">
                  <img src={msg.picture} alt="Chat Visual" style={{ maxWidth: '200px', marginTop: '8px', borderRadius: '8px' }} />
                </div>
              )}
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