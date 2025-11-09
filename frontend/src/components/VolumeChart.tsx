import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { SentimentData } from '../utils/mockData';

interface VolumeChartProps {
  data: SentimentData[];
}

export function VolumeChart({ data }: VolumeChartProps) {
  const chartData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    volume: item.totalVolume,
  }));

  // Calculate mean and standard deviation for anomaly detection
  const volumes = data.map(d => d.totalVolume);
  const mean = volumes.reduce((a, b) => a + b, 0) / volumes.length;
  const stdDev = Math.sqrt(
    volumes.map(v => Math.pow(v - mean, 2)).reduce((a, b) => a + b, 0) / volumes.length
  );
  const upperThreshold = mean + 3 * stdDev;

  return (
    <Card className="p-6">
      <div className="mb-4">
        <div className="text-gray-900">Feedback Volume Tracking</div>
        <div className="text-sm text-gray-500">
          Monitor total feedback volume with anomaly detection (3σ threshold)
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            label={{ value: 'Total Posts', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [value.toLocaleString(), 'Volume']}
          />
          <ReferenceLine 
            y={mean} 
            stroke="#9ca3af" 
            strokeDasharray="3 3" 
            label={{ value: 'Mean', fontSize: 11, fill: '#6b7280' }}
          />
          <ReferenceLine 
            y={upperThreshold} 
            stroke="#ef4444" 
            strokeDasharray="3 3" 
            label={{ value: '3σ Alert', fontSize: 11, fill: '#ef4444' }}
          />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-gray-500">Mean Volume</div>
          <div className="text-xl">{Math.round(mean).toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-500">Std Deviation</div>
          <div className="text-xl">{Math.round(stdDev).toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-500">Alert Threshold</div>
          <div className="text-xl text-red-600">{Math.round(upperThreshold).toLocaleString()}</div>
        </div>
      </div>
    </Card>
  );
}
