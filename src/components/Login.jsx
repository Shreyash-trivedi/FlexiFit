import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice.js";
import { UserSignIn } from "../api/server.js";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

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
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const res = await UserSignIn({ email, password });
        dispatch(loginSuccess(res.data));
        
      } catch (err) {
        alert(err.response.data.message);
      } finally {
        setLoading(false);
        setButtonDisabled(false);
        navigate("/")
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div>
        <div style={titleStyle}>Welcome to FlexiFit 👋</div>
        <div style={spanStyle}>Please login with your details here</div>
      </div>

      <div style={formContainerStyle}>
        <div style={inputWrapperStyle}>
          <label style={labelStyle}>Email Address</label>
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            style={{ width: "100%" }}
          />
        </div>

        <div style={inputWrapperStyle}>
          <label style={labelStyle}>Password</label>
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            feedback={false}
            // toggleMask
            style={{ width: "100%" }}
            inputStyle={{ width: "100%" }}
          />
        </div>

        <Button
          label="Sign In"
          onClick={handelSignIn}
          loading={loading}
          disabled={buttonDisabled}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "var(--primary-color)",
            border: "none",
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
