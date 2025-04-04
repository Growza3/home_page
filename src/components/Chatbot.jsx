import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Chatbot.module.css";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");  // Store API Key in state
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Fetch API Key from backend
    axios.get("http://localhost:5000/api/get-api-key")
      .then(response => {
        setApiKey(response.data.apiKey);
        console.log("Fetched API Key:", response.data.apiKey);
      })
      .catch(error => console.error("Error fetching API key", error));
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!apiKey) {
      console.error("API Key is missing");
      return;
    }
  
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
  
    try {
      console.log("Using API Key:", apiKey);
  
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "dall-e-2",
          messages: [
            { role: "system", content: "You are a helpful chatbot." },
            ...newMessages.map(msg => ({
              role: msg.sender === "bot" ? "assistant" : "user",
              content: msg.text
            }))
          ],
          max_tokens: 150
        },
        {
          headers: {
            "OpenAI-Organization": "org-sh8Waw4gTYEVeqZ9AdZsCCgR", // ✅ Add your Team ID here
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          }
        }
      );
  
      const botReply = response.data.choices?.[0]?.message?.content || "Sorry, I couldn't understand.";
      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...newMessages, { sender: "bot", text: "Oops! Something went wrong." }]);
    }
  };
  
  return (
    <div className={styles.chatbotContainer}>
      <button className={styles.chatbotToggle} onClick={toggleChat}>
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {isOpen && (
        <div className={styles.chatbotBox}>
          <div className={styles.chatbotHeader}>Chat with Growza AI</div>
          <div className={styles.chatbotMessages}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === "bot" ? styles.botMessage : styles.userMessage}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.chatbotInputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}><FaPaperPlane /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
