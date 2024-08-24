import React, { useState } from "react";
import { askChatbot } from "../services/api";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    askChatbot({ question: input })
      .then((response) => {
        console.log("Chatbot response:", response.data); // Log the response from the chatbot
        const botMessage = { text: response.data.answer, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) => {
        console.error("Error from chatbot:", error); // Log any errors
      });

    setInput("");
  };

  return (
    <div className="chatbot">
      <button onClick={onClose}>Close</button>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;
