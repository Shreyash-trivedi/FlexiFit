import React from "react";
import { Card } from "primereact/card";

const WorkoutCard = ({ workout, tag }) => {
  console.log({workout});
  const cardStyle = {
    flex: 1,
    minWidth: "250px",
    maxWidth: "400px",
    padding: window.innerWidth <= 600 ? "12px 14px" : "16px 18px",
    border: "1px solid var(--text-color-secondary)",
    borderRadius: "14px",
    boxShadow: "1px 6px 20px 0px rgba(var(--primary-color), 0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const categoryStyle = {
    width: "fit-content",
    fontSize: "14px",
    color: "var(--primary-color)",
    fontWeight: 500,
    background: "var(--primary-50)",
    padding: "4px 10px",
    borderRadius: "8px",
  };

  const nameStyle = {
    fontSize: "20px",
    color: "var(--text-color)",
    fontWeight: 600,
  };

  const setsStyle = {
    fontSize: "15px",
    color: "var(--text-color-secondary)",
    fontWeight: 500,
    display: "flex",
    gap: "6px",
  };

  const flexStyle = {
    display: "flex",
    gap: "16px",
  };

  const detailsStyle = {
    fontSize: "15px",
    color: "var(--text-color)",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const iconStyle = {
    fontSize: "20px",
  };

  // Handle responsive styles
  const [styles, setStyles] = React.useState({
    cardStyle,
  });

  React.useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600;
      setStyles({
        cardStyle: {
          ...cardStyle,
          padding: isMobile ? "12px 14px" : "16px 18px",
        },
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card style={styles.cardStyle}>
      <div style={categoryStyle}>#{tag ? tag : ""}</div>
      <div style={nameStyle}>{workout?.name}</div>
      <div style={setsStyle}>
        Count: {workout?.sets} sets X {workout?.reps} reps
      </div>
      <div style={flexStyle}>
        <div style={detailsStyle}>
          <i className="pi pi-compass" style={iconStyle}></i>
          {workout?.weight} kg
        </div>
        <div style={detailsStyle}>
          <i className="pi pi-clock" style={iconStyle}></i>
          {workout?.duration} min
        </div>
      </div>
    </Card>
  );
};

export default WorkoutCard;
