import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { UserSignUp } from "../api/server.js";
import { loginSuccess } from "../redux/reducers/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const containerStyle = {
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "36px",
  };

  const titleStyle = {
    fontSize: "30px",
    fontWeight: "800",
    color: "var(--text-color)",
  };

  const spanStyle = {
    fontSize: "16px",
    fontWeight: "400",
    color: "var(--text-color-secondary)",
    opacity: "0.9",
  };

  const formContainerStyle = {
    display: "flex",
    gap: "20px",
    flexDirection: "column",
  };

  const inputWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-color)",
  };

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignUp({ name, email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert("Account Created Successfully");
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };

  return (
    <div style={containerStyle}>
      <div>
        <div style={titleStyle}>Create New Account 👋</div>
        <div style={spanStyle}>
          Please enter details to create a new account
        </div>
      </div>
      <div style={formContainerStyle}>
        <div style={inputWrapperStyle}>
          <label style={labelStyle}>Name</label>
          <InputText
            style={{ width: "100%" }}
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={inputWrapperStyle}>
          <label style={labelStyle}>Email Address </label>
          <InputText
            style={{ width: "100%" }}
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={inputWrapperStyle}>
          <label style={labelStyle}>Password</label>
          <InputText
            style={{ width: "100%" }}
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "var(--primary-color)",
            border: "none",
          }}
          label="Sign Up"
          loading={loading}
          disabled={buttonDisabled}
          onClick={handleSignUp}
        />
      </div>
    </div>
  );
};

export default SignUp;
