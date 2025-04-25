import React from 'react';
import { Card } from '../ui/Card';
import { HealthMetric } from '../../store/healthStore';

interface HealthMetricsTableProps {
  metrics: HealthMetric[];
  isLoading: boolean;
}

export const HealthMetricsTable: React.FC<HealthMetricsTableProps> = ({ 
  metrics, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <Card className="min-h-[300px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-blue-600 rounded-full"></div>
      </Card>
    );
  }

  if (metrics.length === 0) {
    return (
      <Card className="min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">No health data recorded yet</p>
          <p className="text-sm text-gray-400">Use the form above to add your first health metrics</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Health Data">
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
            {metrics.slice(0, 5).map((metric, index) => (
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
  );
};