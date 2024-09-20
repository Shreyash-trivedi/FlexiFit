import React from "react";
import NavBar from "../components/NavBar";
import ChatBot from "../components/ChatBot";

function Landing() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <ChatBot />
      </div>
    </div>
  );
}

export default Landing;
