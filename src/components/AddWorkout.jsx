import React from "react";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  const cardStyle = {
    flex: 1,
    minWidth: "280px",
    padding: window.innerWidth <= 600 ? "16px" : "24px",
    border: "1px solid var(--text-color-secondary)",
    borderRadius: "14px",
    boxShadow: "1px 6px 20px 0px rgba(var(--primary-color), 0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const titleStyle = {
    fontWeight: 600,
    fontSize: window.innerWidth <= 600 ? "14px" : "16px",
    color: "var(--primary-color)",
    marginBottom: "1rem",
  };

  const textareaStyle = {
    width: "100%",
    marginBottom: "1rem",
  };

  const buttonStyle = {
    alignSelf: "flex-start",
  };

  // Handle responsive styles
  const [styles, setStyles] = React.useState({
    cardStyle,
    titleStyle,
  });

  React.useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600;
      setStyles({
        cardStyle: {
          ...cardStyle,
          padding: isMobile ? "16px" : "24px",
        },
        titleStyle: {
          ...titleStyle,
          fontSize: isMobile ? "14px" : "16px",
        },
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card style={styles.cardStyle}>
      <div style={styles.titleStyle}>Add New Workout</div>
      <InputTextarea
        rows={10}
        placeholder={`Enter in this format:

#Category
-Workout Name
-Sets
-Reps
-Weight
-Duration`}
        value={workout}
        onChange={(e) => setWorkout(e.target.value)}
        style={textareaStyle}
        autoResize={false}
      />
      <Button
        label="Add Workout"
        size="small"
        onClick={addNewWorkout}
        loading={buttonLoading}
        disabled={buttonLoading}
        style={buttonStyle}
        severity="primary"
      />
    </Card>
  );
};

export default AddWorkout;
