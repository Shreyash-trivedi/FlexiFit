import React from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";

const CategoryChart = ({ data }) => {
  // Convert the pieChartData to PrimeReact Chart format
  const chartData = {
    labels: data?.pieChartData?.map((item) => item.label) || [],
    datasets: [
      {
        data: data?.pieChartData?.map((item) => item.value) || [],
        backgroundColor: data?.pieChartData?.map((item) => item.color) || [],
        hoverBackgroundColor:
          data?.pieChartData?.map((item) => item.color) || [],
      },
    ],
  };

  // PrimeReact Chart options
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
    cutout: "60%", // This creates the donut effect (similar to innerRadius)
    radius: "90%", // Similar to outerRadius
  };

  const cardStyle = {
    flex: 1,
    minWidth: "280px",
    padding: "24px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "14px",
    boxShadow: "1px 6px 20px 0px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const titleStyle = {
    fontWeight: 600,
    color: "var(--primary-color)", // Using PrimeReact's primary color variable
    marginBottom: "1rem",
  };

  // Media query styles can be handled with a useEffect and window.matchMedia
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const handleResize = (e) => {
      if (e.matches) {
        cardStyle.padding = "16px";
      } else {
        cardStyle.padding = "24px";
      }
    };

    mediaQuery.addListener(handleResize);
    handleResize(mediaQuery);

    return () => mediaQuery.removeListener(handleResize);
  }, []);

  return (
    <Card style={cardStyle}>
      <div style={titleStyle}>Weekly Calories Burned</div>
      {data?.pieChartData && (
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          style={{ height: "300px" }}
        />
      )}
    </Card>
  );
};

export default CategoryChart;
