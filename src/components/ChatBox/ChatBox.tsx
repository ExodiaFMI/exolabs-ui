import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatBox.css'; // Import the CSS file for styling

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="chat-box">
      <h2>Chat Box</h2>

      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;
