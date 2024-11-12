import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./components/SignUp";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import Workouts from "./pages/Workout";
import Dashboard from "./pages/Dashboard";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        {!currentUser ? (
          <>
            <Route path="/login" element={<Authentication />} />
            <Route path="/sign-up" element={<SignUp />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
