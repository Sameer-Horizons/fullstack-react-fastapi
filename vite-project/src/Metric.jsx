import React from 'react';
import { Link } from 'react-router-dom';

const MetricCard = ({ title, value, className }) => {
  return (
    <div className={`metric-card ${className}`}>
      <h3>{title}</h3>
      <p className="metric-value">{value}</p>
      <Link to="/Userdetails">more details</Link>
    </div>
  );
};

export default MetricCard;