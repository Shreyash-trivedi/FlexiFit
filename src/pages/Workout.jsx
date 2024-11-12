import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import WorkoutCard from "../components/cards/WorkoutCard";
import { getWorkouts } from "../api/server.js";
import { useDispatch } from "react-redux";
import Navbar from "../components/NavBar.jsx";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const Workouts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);

  const containerStyle = {
    flex: 1,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "22px 0px",
    overflowY: "scroll",
  };

  const wrapperStyle = {
    flex: 1,
    maxWidth: "1600px",
    display: "flex",
    gap: "22px",
    padding: "0px 16px",
    "@media (max-width: 600px)": {
      gap: "12px",
      flexDirection: "column",
    },
  };

  const leftStyle = {
    flex: "0.2",
    height: "fit-content",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "1px 6px 20px 0px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    fontWeight: 600,
    fontSize: "16px",
    color: "var(--primary-color)",
    "@media (max-width: 600px)": {
      fontSize: "14px",
    },
  };

  const rightStyle = {
    flex: 1,
  };

  const cardWrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "100px",
    "@media (max-width: 600px)": {
      gap: "12px",
    },
  };

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "0px 16px",
    gap: "22px",
    "@media (max-width: 600px)": {
      gap: "12px",
    },
  };

  const secTitleStyle = {
    fontSize: "22px",
    color: "white",
    fontWeight: 500,
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("flexi-user-token");
    try {
      const res = await getWorkouts(
        token,
        date ? `?date=${formatDate(date)}` : ""
      );
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  useEffect(() => {
    getTodaysWorkout();
  }, [date]);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <div style={containerStyle}>
        <div style={wrapperStyle}>
          <Card style={leftStyle}>
            <div style={titleStyle}>Select Date</div>
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              inline
              showWeek={false}
            />
          </Card>
          <div style={rightStyle}>
            <div style={sectionStyle}>
              <div style={secTitleStyle}>Today's Workout</div>
              {loading ? (
                <ProgressSpinner style={{ width: "50px", height: "50px" }} />
              ) : (
                <div style={cardWrapperStyle}>
                  {todaysWorkouts.length > 0 &&
                    todaysWorkouts[0].exercise.map((workout) => (
                      <WorkoutCard
                        key={workout.id}
                        workout={workout}
                        tag={todaysWorkouts[0].tag}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Workouts;
