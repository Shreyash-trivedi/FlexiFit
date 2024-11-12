import React from "react";
import NavBar from "../components/NavBar";
import ChatBot from "../components/ChatBot";
import { useSelector } from "react-redux";

function Landing() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <div>
        <NavBar currentUser={currentUser} />
      </div>
      <div>
        <ChatBot />
      </div>
    </div>
  );
}

export default Landing;
