import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { chat, struct, saveWorkout } from "../api/server.js";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [workout, setWorkout] = useState(null);
  if (workout) {
    console.log(workout);
    console.log(JSON.parse(workout));
  }

  useEffect(() => {
    // Send welcome message when component mounts
    const userName = currentUser ? currentUser.name : "";
    setMessages([
      {
        sender: "bot",
        text: `Hello${` ${
          userName.split(" ")[0]
        }`}! I'm **FlexiAi** your **Personal Trainer**. How can I help you today?`,
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (input = userInput) => {
    if (input.trim()) {
      // Add user message to chat
      const userMessage = { sender: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput(""); // Clear input field
      setIsLoading(true);

      try {
        // Send all messages (including the new one) to maintain context
        const response = await chat({
          messages: [...messages, userMessage].filter(
            (msg) => msg.sender !== "error"
          ), // Exclude error messages from context
        });

        // Add bot response to chat
        const botMessage = {
          sender: "bot",
          text: response.data.reply,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        if (currentUser) {
          const structWorkout = await struct({
            data: response.data.reply,
          });
          setWorkout(structWorkout.data.out);
          const token = localStorage.getItem("flexi-user-token");
          await saveWorkout(token, { workoutString: structWorkout.data.out })
            .then((res) => {
              console.log("saved workout")
            })
            .catch((err) => {
              alert(err);
            });
        }
      } catch (error) {
        console.error("API call failed:", error);
        // Add error message to chat
        const errorMessage = {
          sender: "error",
          text: "I'm sorry, I encountered an error. Please try again.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        maxWidth: "70%",
        margin: "0 auto",
        marginTop: "5%",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          height: "72vh",
          overflowY: "scroll",
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "white",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "12px",
                backgroundColor:
                  msg.sender === "user"
                    ? "#007bff"
                    : msg.sender === "error"
                    ? "#ff4444"
                    : "#e9e9e9",
                color:
                  msg.sender === "user" || msg.sender === "error"
                    ? "white"
                    : "black",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              <ReactMarkdown>{msg.text.trim()}</ReactMarkdown>
            </p>
          </div>
        ))}
        {isLoading && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="4"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: "calc(100% - 70px)",
            padding: "10px",
            marginRight: "10px",
          }}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isLoading}
        />
        <button
          onClick={() => handleSendMessage()}
          style={{
            width: "60px",
            padding: "10px",
            backgroundColor: isLoading ? "#cccccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
