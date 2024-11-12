import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

const WeeklyStatCard = ({ data }) => {
  const cardStyle = {
    flex: 1,
    minWidth: '280px',
    padding: '24px',
    border: '1px solid var(--text-color-secondary)',
    borderRadius: '14px',
    boxShadow: '1px 6px 20px 0px rgba(var(--primary-color), 0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  };

  const titleStyle = {
    fontWeight: 600,
    fontSize: window.innerWidth <= 600 ? '14px' : '16px',
    color: 'var(--primary-color)',
    marginBottom: '1rem'
  };

  // Handle responsive styles
  const [styles, setStyles] = React.useState({
    cardStyle,
    titleStyle
  });

  React.useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600;
      setStyles({
        cardStyle: { 
          ...cardStyle, 
          padding: isMobile ? '16px' : '24px' 
        },
        titleStyle: { 
          ...titleStyle, 
          fontSize: isMobile ? '14px' : '16px' 
        }
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Convert data format for PrimeReact Chart
  const chartData = {
    labels: data?.totalWeeksCaloriesBurnt?.weeks || [],
    datasets: [
      {
        label: 'Calories Burned',
        data: data?.totalWeeksCaloriesBurnt?.caloriesBurned || [],
        backgroundColor: 'rgba(var(--primary-color), 0.8)',
        borderColor: 'var(--primary-color)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'var(--surface-border)'
        }
      },
      x: {
        grid: {
          color: 'var(--surface-border)'
        }
      }
    }
  };

  return (
    <Card style={styles.cardStyle}>
      <div style={styles.titleStyle}>Weekly Calories Burned</div>
      {data?.totalWeeksCaloriesBurnt && (
        <Chart 
          type="bar" 
          data={chartData} 
          options={chartOptions}
          style={{ height: '300px' }}
        />
      )}
    </Card>
  );
};

export default WeeklyStatCard;