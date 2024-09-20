import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd validate credentials against a backend
    if (username === "test" && password === "test") {
      localStorage.setItem("user", JSON.stringify({ username }));
      navigate('/')
    } else {
      alert("Invalid credentials");
    }
    // } else if (username === "patient" && password === "test") {
    //   localStorage.setItem("user", JSON.stringify({ username }));
    //   navigate("/patient");
    // }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
