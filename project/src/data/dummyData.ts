import { HealthMetric } from '../store/healthStore';

// Generate dates for the last 30 days
const generateDates = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString());
  }
  
  return dates;
};

// Generate random number within a range with normal distribution
const normalRandom = (min: number, max: number, decimals = 0): number => {
  // Using Box-Muller transform for normal distribution
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  
  // Scale to our desired range
  const mean = (max + min) / 2;
  const stdDev = (max - min) / 6;
  let value = z0 * stdDev + mean;
  
  // Clamp to our desired range
  value = Math.min(Math.max(value, min), max);
  
  // Apply decimals
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
};

// Generate realistic variations in health metrics
const generateHealthMetric = (baseMetrics: Partial<HealthMetric>): Partial<HealthMetric> => {
  const variance = 0.1; // 10% variance
  
  return Object.entries(baseMetrics).reduce((acc, [key, value]) => {
    if (typeof value === 'number') {
      const min = value * (1 - variance);
      const max = value * (1 + variance);
      acc[key as keyof HealthMetric] = normalRandom(min, max, 
        key === 'weight' || key === 'sleep_hours' ? 1 : 0
      );
    }
    return acc;
  }, {} as Partial<HealthMetric>);
};

// Generate 30 days of health metrics with realistic patterns
export const generateDummyHealthData = (userId: string): HealthMetric[] => {
  const dates = generateDates(30);
  
  // Base metrics for a healthy adult
  const baseMetrics = {
    heart_rate: 72,
    blood_pressure_systolic: 120,
    blood_pressure_diastolic: 80,
    blood_glucose: 100,
    weight: 70.5,
    steps: 8000,
    sleep_hours: 7.5,
  };

  return dates.map(date => {
    const dailyMetrics = generateHealthMetric(baseMetrics);
    
    // Add weekly patterns
    const dayOfWeek = new Date(date).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      dailyMetrics.steps = normalRandom(9000, 12000);
      dailyMetrics.sleep_hours = normalRandom(8, 9, 1);
    }
    
    return {
      id: crypto.randomUUID(),
      user_id: userId,
      ...dailyMetrics,
      created_at: date
    } as HealthMetric;
  });
};

// Single user profile with image
export const dummyProfile = {
  id: 'dummy-user-1',
  full_name: 'Alex Morgan',
  age: 32,
  gender: 'Female',
  height: 170,
  weight: 65.5,
  medical_conditions: 'None',
  blood_type: 'A+',
  emergency_contact: 'James Morgan (Spouse) - +1 234 567 8900',
  allergies: 'None',
  medications: 'None',
  profile_image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  lifestyle: {
    exercise_frequency: '4-5 times per week',
    diet_type: 'Mediterranean',
    smoking_status: 'Non-smoker',
    alcohol_consumption: 'Occasional',
    occupation: 'Software Engineer',
    stress_level: 'Moderate',
    sleep_quality: 'Good'
  },
  fitness_goals: [
    'Maintain healthy weight',
    'Improve cardiovascular health',
    'Increase strength',
    'Better stress management'
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Generate a complete dataset for testing
export const generateFullDummyDataset = (userId: string) => {
  return {
    profile: {
      ...dummyProfile,
      id: userId
    },
    healthMetrics: generateDummyHealthData(userId)
  };
};

// Generate weekly health summary
export const generateWeeklySummary = (metrics: HealthMetric[]) => {
  const lastSevenDays = metrics.slice(0, 7);
  
  const average = (arr: number[]) => 
    arr.reduce((a, b) => a + b, 0) / arr.length;
  
  return {
    averageHeartRate: Math.round(average(lastSevenDays.map(m => m.heart_rate || 0))),
    averageSteps: Math.round(average(lastSevenDays.map(m => m.steps || 0))),
    averageSleep: Number(average(lastSevenDays.map(m => m.sleep_hours || 0)).toFixed(1)),
    averageBloodGlucose: Math.round(average(lastSevenDays.map(m => m.blood_glucose || 0))),
    totalSteps: lastSevenDays.reduce((sum, day) => sum + (day.steps || 0), 0),
    averageWeight: Number(average(lastSevenDays.map(m => m.weight || 0)).toFixed(1))
  };
};