import React, { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("name");
  const [userData, setUserData] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);

  const questions = {
    name: "Hello! Welcome to FlexiFit. Please tell us your name.",
    age: "Great! What is your age?",
    gender: "Thank you. What is your gender?",
    height: "Got it. What is your height in cm?",
    weight: "Almost done! What is your weight in kg?",
    activityLevel: "What's your activity level?",
    goal: "Last question! What's your fitness goal?",
    complete: "Thank you for providing all the information!",
  };

  const validationRules = {
    name: (value) => value.length > 1,
    age: (value) =>
      !isNaN(value) && parseInt(value) > 0 && parseInt(value) < 120,
    gender: (value) =>
      ["male", "female", "other"].includes(value.toLowerCase()),
    height: (value) =>
      !isNaN(value) && parseFloat(value) > 50 && parseFloat(value) < 250,
    weight: (value) =>
      !isNaN(value) && parseFloat(value) > 20 && parseFloat(value) < 500,
    activityLevel: (value) =>
      ["sedentary", "moderate", "active"].includes(value.toLowerCase()),
    goal: (value) =>
      ["lose weight", "gain muscle", "maintain"].includes(value.toLowerCase()),
  };

  const optionButtons = {
    gender: ["Male", "Female", "Other"],
    activityLevel: ["Sedentary", "Moderate", "Active"],
    goal: ["Lose Weight", "Gain Muscle", "Maintain"],
  };

  useEffect(() => {
    startNewConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startNewConversation = () => {
    setMessages([{ sender: "bot", text: questions.name }]);
    setCurrentQuestion("name");
    setUserData({});
    setShowOptions(false);
  };

  const handleSendMessage = (input = userInput) => {
    if (input.trim()) {
      const userMessage = { sender: "user", key: currentQuestion, text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      if (
        validationRules[currentQuestion] &&
        !validationRules[currentQuestion](input)
      ) {
        setTimeout(() => {
          const errorMessage = {
            sender: "bot",
            text: `I'm sorry, that doesn't seem to be a valid ${currentQuestion}. Could you please try again?`,
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
          if (currentQuestion in optionButtons) {
            sendOptions(currentQuestion);
          }
        }, 1000);
      } else {
        setUserData((prevData) => ({ ...prevData, [currentQuestion]: input }));
        moveToNextQuestion();
      }

      setUserInput("");
      setShowOptions(false);
    }
  };

  const moveToNextQuestion = () => {
    const questionOrder = [
      "name",
      "age",
      "gender",
      "height",
      "weight",
      "activityLevel",
      "goal",
      "complete",
    ];
    const currentIndex = questionOrder.indexOf(currentQuestion);
    const nextQuestion = questionOrder[currentIndex + 1];

    setTimeout(() => {
      if (nextQuestion === "complete") {
        const summaryMessage = generateSummary();
        setMessages((prevMessages) => [...prevMessages, summaryMessage]);
        sendUpdateOptions();
      } else {
        const botReply = { sender: "bot", text: questions[nextQuestion] };
        setMessages((prevMessages) => [...prevMessages, botReply]);
        if (nextQuestion in optionButtons) {
          sendOptions(nextQuestion);
        }
      }
      setCurrentQuestion(nextQuestion);
    }, 1000);
  };

  const sendOptions = (question) => {
    const optionsMessage = {
      sender: "bot",
      text: "Please select an option:",
      options: optionButtons[question],
    };
    setMessages((prevMessages) => [...prevMessages, optionsMessage]);
    setShowOptions(true);
  };

  const sendUpdateOptions = () => {
    const updateMessage = {
      sender: "bot",
      text: "What would you like to do next?",
      options: ["Update Information", "Start New Conversation", "End Chat"],
    };
    setMessages((prevMessages) => [...prevMessages, updateMessage]);
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    handleSendMessage(option);

    if (option === "Update Information") {
      setTimeout(() => {
        const updateMessage = {
          sender: "bot",
          text: "Which information would you like to update?",
          options: Object.keys(userData),
        };
        setMessages((prevMessages) => [...prevMessages, updateMessage]);
        setShowOptions(true);
      }, 1000);
    } else if (option === "Start New Conversation") {
      startNewConversation();
    } else if (option === "End Chat") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Thank you for using FlexiFit! Have a great day!",
        },
      ]);
    } else if (Object.keys(userData).includes(option)) {
      setTimeout(() => {
        setCurrentQuestion(option);
        const botReply = { sender: "bot", text: questions[option] };
        setMessages((prevMessages) => [...prevMessages, botReply]);
        if (option in optionButtons) {
          sendOptions(option);
        }
      }, 1000);
    }
  };

  const generateSummary = () => {
    const summary = `Great! Here's a summary of your information:
    Name: ${userData.name},
    Age: ${userData.age},
    Gender: ${userData.gender},
    Height: ${userData.height} cm,
    Weight: ${userData.weight} kg,
    Activity Level: ${userData.activityLevel},
    Fitness Goal: ${userData.goal}.
    
    Based on this information, I'd recommend the following:
    ${generateRecommendation()}
    `;
    return { sender: "bot", text: summary };
  };

  const generateRecommendation = () => {
    const age = parseInt(userData.age);
    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height);
    const bmi = weight / (height / 100) ** 2;

    let recommendation = "";

    if (bmi < 18.5) {
      recommendation += "Your BMI suggests you're underweight. ";
    } else if (bmi >= 25) {
      recommendation += "Your BMI suggests you're overweight. ";
    }

    if (userData.goal.toLowerCase() === "lose weight") {
      recommendation +=
        "To lose weight, focus on creating a calorie deficit through diet and exercise. ";
    } else if (userData.goal.toLowerCase() === "gain muscle") {
      recommendation +=
        "To gain muscle, focus on strength training and ensuring adequate protein intake. ";
    }

    if (userData.activityLevel.toLowerCase() === "sedentary") {
      recommendation +=
        "Try to incorporate more movement into your daily routine. ";
    }

    if (age > 40) {
      recommendation +=
        "Don't forget to include flexibility and balance exercises in your routine. ";
    }

    return (
      recommendation ||
      "Maintain a balanced diet and regular exercise routine to support your overall health."
    );
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
                backgroundColor: msg.sender === "user" ? "#007bff" : "#e9e9e9",
                color: msg.sender === "user" ? "white" : "black",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              {msg.text}
            </p>
            {msg.options && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  marginTop: "5px",
                }}
              >
                {msg.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleOptionClick(option)}
                    style={{
                      margin: "2px",
                      padding: "5px 10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
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
        disabled={showOptions}
      />
      <button
        onClick={() => handleSendMessage()}
        style={{ width: "60px", padding: "10px" }}
        disabled={showOptions}
      >
        Send
      </button>
    </div>
  );
};

export default ChatBot;
