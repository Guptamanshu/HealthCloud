import React, { useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { HealthMetricsTable } from '../components/dashboard/HealthMetricsTable';
import { HealthChart } from '../components/dashboard/HealthChart';
import { useHealthStore } from '../store/healthStore';
import { useAuthStore } from '../store/authStore';

export const HealthMetricsPage = () => {
  const { user } = useAuthStore();
  const { metrics, fetchHealthData, isLoading } = useHealthStore();

  useEffect(() => {
    if (user) {
      fetchHealthData(user.id);
    }
  }, [user, fetchHealthData]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Health Metrics</h1>
        <p className="text-gray-500">View and analyze your health data</p>
      </div>
      
      {/* Charts */}
      <div className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthChart 
            metrics={metrics}
            metricType="heart_rate"
            title="Heart Rate Trend"
            color="#EF4444"
          />
          
          <HealthChart 
            metrics={metrics}
            metricType="blood_glucose"
            title="Blood Glucose Trend"
            color="#8B5CF6"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthChart 
            metrics={metrics}
            metricType="steps"
            title="Daily Steps"
            color="#3B82F6"
          />
          
          <HealthChart 
            metrics={metrics}
            metricType="sleep_hours"
            title="Sleep Duration"
            color="#F59E0B"
          />
        </div>
      </div>
      
      {/* Full metrics table */}
      <Card title="All Health Records">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heart Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Pressure</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Glucose</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Steps</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sleep</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {metrics.map((metric, index) => (
                <tr key={metric.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(metric.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {metric.heart_rate ? `${metric.heart_rate} bpm` : '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {metric.blood_pressure_systolic && metric.blood_pressure_diastolic 
                      ? `${metric.blood_pressure_systolic}/${metric.blood_pressure_diastolic} mmHg` 
                      : '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {metric.blood_glucose ? `${metric.blood_glucose} mg/dL` : '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {metric.weight ? `${metric.weight} kg` : '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {metric.steps || '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {metric.sleep_hours ? `${metric.sleep_hours} hrs` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};