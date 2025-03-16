import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../../lib/catalyst/button';
import { Field } from '../../lib/catalyst/fieldset';
import { Input } from '../../lib/catalyst/input';
import './ChatBox.css'; // Import the CSS file for styling
import { HiArrowNarrowUp } from 'react-icons/hi';
interface ChatBoxProps {
  sendMessage: (message: string) => void;
  chatMessages: string[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ sendMessage, chatMessages }) => {
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="p-4 border rounded shadow-md my-4">
      {/* <h2 className="text-xl font-bold mb-4"></h2> */}
      <div className="messages mb-4">
        {chatMessages.map((message, index) => (
          <div key={index} className="message mb-2 p-2 bg-gray-100 rounded">
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
        ))}
      </div>
      <Field className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 g-gray-100"
        />
        <Button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded">
          <HiArrowNarrowUp />
        </Button>
      </Field>
    </div>
  );
};

export default ChatBox;
