import "./chatBot.scss";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const socket = io("http://localhost:4000");

function ChatBot({ postId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      socket.emit("newUser", currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      senderId: currentUser.id,
      postId,
      text: newMessage,
    };

    socket.emit("sendMessage", { receiverId: postId, data: messageData });
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  return (
    <div className="chatBot">
      <div className="chatBotHeader">
        <h2>Chat Bot</h2>
      </div>
      <div className="chatBotMessages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.senderId === currentUser.id ? "own" : ""}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chatBotInput">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;
