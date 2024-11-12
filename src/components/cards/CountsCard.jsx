import React from "react";
import { Card } from "primereact/card";

const CountsCard = ({ item, data }) => {
  const cardStyle = {
    flex: 1,
    minWidth: "200px",
    padding: "24px",
    border: "1px solid var(--text-color-secondary)",
    borderRadius: "14px",
    display: "flex",
    gap: "6px",
    boxShadow: "1px 6px 20px 0px rgba(var(--primary-color), 0.15)",
  };

  const leftStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: window.innerWidth <= 600 ? "6px" : "12px",
  };

  const titleStyle = {
    fontWeight: 600,
    fontSize: window.innerWidth <= 600 ? "14px" : "16px",
    color: "var(--primary-color)",
  };

  const valueStyle = {
    fontWeight: 600,
    fontSize: window.innerWidth <= 600 ? "22px" : "32px",
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
    color: "var(--text-color)",
  };

  const unitStyle = {
    fontSize: "14px",
    marginBottom: "8px",
  };

  const spanStyle = {
    marginBottom: "8px",
    fontWeight: 500,
    fontSize: window.innerWidth <= 600 ? "12px" : "16px",
    color: "var(--green-500)", // Use PrimeReact's built-in color variables
  };

  const iconStyle = {
    height: "fit-content",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    background: item.lightColor,
    color: item.color,
  };

  const descStyle = {
    fontSize: window.innerWidth <= 600 ? "12px" : "14px",
    color: "var(--text-color-secondary)",
    marginBottom: "6px",
  };

  // Handle responsive styles
  const [styles, setStyles] = React.useState({
    titleStyle,
    valueStyle,
    spanStyle,
    descStyle,
    leftStyle,
  });

  React.useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600;
      setStyles({
        ...styles,
        titleStyle: { ...titleStyle, fontSize: isMobile ? "14px" : "16px" },
        valueStyle: { ...valueStyle, fontSize: isMobile ? "22px" : "32px" },
        spanStyle: { ...spanStyle, fontSize: isMobile ? "12px" : "16px" },
        descStyle: { ...descStyle, fontSize: isMobile ? "12px" : "14px" },
        leftStyle: { ...leftStyle, gap: isMobile ? "6px" : "12px" },
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card style={cardStyle}>
      <div style={styles.leftStyle}>
        <div style={styles.titleStyle}>{item.name}</div>
        <div style={styles.valueStyle}>
          {data && data[item.key].toFixed(2)}
          <div style={unitStyle}>{item.unit}</div>
          <div style={spanStyle}>(+10%)</div>
        </div>
        <div style={styles.descStyle}>{item.desc}</div>
      </div>
      <div style={iconStyle}>
        <i className={item.icon} style={item.iconStyle} />
      </div>
    </Card>
  );
};

export default CountsCard;
