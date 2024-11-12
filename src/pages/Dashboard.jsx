import React, { useEffect, useState } from "react";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api/server.js";
import Navbar from "../components/NavBar.jsx";
import { useSelector } from "react-redux";

const Dashboard = () => {
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
    maxWidth: "1400px",
    display: "flex",
    flexDirection: "column",
    gap: window.innerWidth <= 600 ? "12px" : "22px",
  };

  const titleStyle = {
    padding: "0px 16px",
    fontSize: "22px",
    color: "white",
    fontWeight: 500,
  };

  const flexWrapStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: window.innerWidth <= 600 ? "12px" : "22px",
    padding: "0px 16px",
  };

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "0px 16px",
    gap: window.innerWidth <= 600 ? "12px" : "22px",
  };

  const cardWrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: window.innerWidth <= 600 ? "12px" : "20px",
    marginBottom: "100px",
  };

  // Handle responsive styles
  const [styles, setStyles] = useState({
    wrapperStyle,
    flexWrapStyle,
    sectionStyle,
    cardWrapperStyle,
  });

  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs
-Back Squat
-5 setsX15 reps
-30 kg
-10 min`);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600;
      setStyles({
        wrapperStyle: {
          ...wrapperStyle,
          gap: isMobile ? "12px" : "22px",
        },
        flexWrapStyle: {
          ...flexWrapStyle,
          gap: isMobile ? "12px" : "22px",
        },
        sectionStyle: {
          ...sectionStyle,
          gap: isMobile ? "12px" : "22px",
        },
        cardWrapperStyle: {
          ...cardWrapperStyle,
          gap: isMobile ? "12px" : "20px",
        },
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("flexi-user-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("flexi-user-token");
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      setLoading(false);
    });
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("flexi-user-token");
    await addWorkout(token, { workoutString: workout })
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <div style={containerStyle}>
        <div style={styles.wrapperStyle}>
          <div style={titleStyle}>Dashboard</div>
          <div style={styles.flexWrapStyle}>
            {counts.map((item, index) => (
              <CountsCard key={index} item={item} data={data} />
            ))}
          </div>

          <div style={styles.flexWrapStyle}>
            <WeeklyStatCard data={data} />
            <CategoryChart data={data} />
            <AddWorkout
              workout={workout}
              setWorkout={setWorkout}
              addNewWorkout={addNewWorkout}
              buttonLoading={buttonLoading}
            />
          </div>

          <div style={styles.sectionStyle}>
            <div style={titleStyle}>Todays Workouts</div>
            <div style={styles.cardWrapperStyle}>
              {todaysWorkouts.map((workout, index) => (
                <WorkoutCard key={index} workout={workout} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
