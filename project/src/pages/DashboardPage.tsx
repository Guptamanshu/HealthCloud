import React, { useEffect } from 'react';
import { Heart, Activity, Scale, Footprints, Moon, BarChart3 } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { HealthMetricForm } from '../components/dashboard/HealthMetricForm';
import { HealthMetricsTable } from '../components/dashboard/HealthMetricsTable';
import { HealthChart } from '../components/dashboard/HealthChart';
import { useHealthStore } from '../store/healthStore';
import { useAuthStore } from '../store/authStore';
import { generateDummyHealthData, generateWeeklySummary } from '../data/dummyData';

export const DashboardPage = () => {
  const { user } = useAuthStore();
  const { metrics, fetchHealthData, isLoading } = useHealthStore();

  useEffect(() => {
    if (user) {
      fetchHealthData(user.id);
    }
  }, [user, fetchHealthData]);

  // Use dummy data if no metrics are available
  const displayMetrics = metrics.length > 0 ? metrics : generateDummyHealthData('dummy-user-1');
  const latestMetric = displayMetrics[0];
  const weeklySummary = generateWeeklySummary(displayMetrics);

  // Calculate week-over-week changes
  const getChange = (current: number, previous: number): number => {
    return previous ? Math.round(((current - previous) / previous) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Health Dashboard</h1>
        <p className="text-gray-500">Monitor and track your health metrics</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Heart Rate"
          value={`${weeklySummary.averageHeartRate} bpm`}
          change={getChange(weeklySummary.averageHeartRate, 75)}
          icon={<Heart size={24} />}
          color="red"
        />
        
        <StatCard
          title="Blood Pressure"
          value={
            latestMetric?.blood_pressure_systolic && latestMetric?.blood_pressure_diastolic
              ? `${latestMetric.blood_pressure_systolic}/${latestMetric.blood_pressure_diastolic}`
              : '120/80'
          }
          icon={<Activity size={24} />}
          color="blue"
        />
        
        <StatCard
          title="Blood Glucose"
          value={`${weeklySummary.averageBloodGlucose} mg/dL`}
          change={getChange(weeklySummary.averageBloodGlucose, 95)}
          icon={<BarChart3 size={24} />}
          color="purple"
        />
        
        <StatCard
          title="Weight"
          value={`${weeklySummary.averageWeight} kg`}
          change={getChange(weeklySummary.averageWeight, 71.2)}
          icon={<Scale size={24} />}
          color="green"
        />
        
        <StatCard
          title="Weekly Steps"
          value={weeklySummary.totalSteps.toLocaleString()}
          change={getChange(weeklySummary.totalSteps, 52000)}
          icon={<Footprints size={24} />}
          color="blue"
        />
        
        <StatCard
          title="Avg. Sleep"
          value={`${weeklySummary.averageSleep} hrs`}
          change={getChange(weeklySummary.averageSleep, 7.2)}
          icon={<Moon size={24} />}
          color="yellow"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthChart 
          metrics={displayMetrics}
          metricType="heart_rate"
          title="Heart Rate Trend"
          color="#EF4444"
        />
        
        <HealthChart 
          metrics={displayMetrics}
          metricType="blood_glucose"
          title="Blood Glucose Trend"
          color="#8B5CF6"
        />
        
        <HealthChart 
          metrics={displayMetrics}
          metricType="weight"
          title="Weight Trend"
          color="#10B981"
        />
        
        <HealthChart 
          metrics={displayMetrics}
          metricType="steps"
          title="Daily Steps"
          color="#3B82F6"
        />
      </div>
      
      {/* Add new metrics */}
      <div className="grid grid-cols-1 gap-6">
        <HealthMetricForm />
        <HealthMetricsTable metrics={displayMetrics} isLoading={isLoading} />
      </div>
    </div>
  );
};