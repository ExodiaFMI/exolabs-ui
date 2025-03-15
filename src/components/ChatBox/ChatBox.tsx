import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../../lib/catalyst/button';
import { Field } from '../../lib/catalyst/fieldset';
import { Input } from '../../lib/catalyst/input';
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
    <div className="p-4 border rounded shadow-md my-4">
      <h2 className="text-xl font-bold mb-4">Chat Box</h2>

      <div className="messages mb-4">
        {messages.map((message, index) => (
          <div key={index} className="message mb-2 p-2 bg-gray-100 rounded">
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
        ))}
      </div>
      <Field className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <Button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded">
          Send
        </Button>
      </Field>
    </div>
  );
};

export default ChatBox;
