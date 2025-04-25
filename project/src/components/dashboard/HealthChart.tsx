import React from 'react';
import { Card } from '../ui/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HealthMetric } from '../../store/healthStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HealthChartProps {
  metrics: HealthMetric[];
  metricType: 'heart_rate' | 'blood_glucose' | 'weight' | 'steps' | 'sleep_hours';
  title: string;
  color: string;
}

export const HealthChart: React.FC<HealthChartProps> = ({ 
  metrics, 
  metricType, 
  title,
  color
}) => {
  const sortedMetrics = [...metrics]
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  
  const labels = sortedMetrics.map(metric => 
    new Date(metric.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  );
  
  const data = sortedMetrics.map(metric => metric[metricType] || null);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: color,
        backgroundColor: `${color}22`,
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };
  
  if (metrics.length === 0) {
    return (
      <Card title={title} className="h-64">
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card title={title} className="h-64">
      <div className="h-full">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};