import React, { useState } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Navbar from "../components/NavBar";

const Authentication = () => {
  const [login, setLogin] = useState(false);

  const containerStyle = {
    flex: 1,
    height: "100%",
    display: "flex",
    background: "var(--surface-ground)",
    "@media (max-width: 700px)": {
      flexDirection: "column",
    },
  };

  const leftSideStyle = {
    flex: 1,
    position: "relative",
    "@media (max-width: 700px)": {
      display: "none",
    },
  };

  const logoStyle = {
    position: "absolute",
    width: "70px",
    top: "40px",
    left: "60px",
    zIndex: 10,
  };

  const authImageStyle = {
    position: "relative",
    height: "100%",
    width: "100%",
    objectFit: "cover",
  };

  const rightSideStyle = {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    gap: "16px",
    alignItems: "center",
    justifyContent: "center",
  };

  const textStyle = {
    fontSize: "16px",
    textAlign: "center",
    color: "var(--text-color-secondary)",
    marginTop: "16px",
    "@media (max-width: 400px)": {
      fontSize: "14px",
    },
  };

  const textButtonStyle = {
    color: "var(--primary-color)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: 600,
  };

  return (
    <>
        <Navbar />
      <div style={rightSideStyle}>
        <Card
          style={{
            width: "100%",
            maxWidth: "500px",
            border: "none",
          }}
        >
          {!login ? (
            <>
              <Login />
              <div style={textStyle}>
                Don't have an account?{" "}
                <span style={textButtonStyle} onClick={() => setLogin(true)}>
                  SignUp
                </span>
              </div>
            </>
          ) : (
            <>
              <SignUp />
              <div style={textStyle}>
                Already have an account?{" "}
                <span style={textButtonStyle} onClick={() => setLogin(false)}>
                  SignIn
                </span>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default Authentication;
