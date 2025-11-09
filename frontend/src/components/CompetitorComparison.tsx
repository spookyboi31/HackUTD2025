import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Badge } from './ui/badge';
import { CompetitorData } from '../utils/mockData';

interface CompetitorComparisonProps {
  competitors: CompetitorData[];
}

export function CompetitorComparison({ competitors }: CompetitorComparisonProps) {
  const radarData = [
    {
      metric: 'Good',
      'T-Mobile': competitors[0].sentiment.good,
      'Verizon': competitors[1].sentiment.good,
      'AT&T': competitors[2].sentiment.good,
      'Mint Mobile': competitors[3].sentiment.good,
    },
    {
      metric: 'Neutral',
      'T-Mobile': competitors[0].sentiment.neutral,
      'Verizon': competitors[1].sentiment.neutral,
      'AT&T': competitors[2].sentiment.neutral,
      'Mint Mobile': competitors[3].sentiment.neutral,
    },
    {
      metric: 'Bad',
      'T-Mobile': competitors[0].sentiment.bad,
      'Verizon': competitors[1].sentiment.bad,
      'AT&T': competitors[2].sentiment.bad,
      'Mint Mobile': competitors[3].sentiment.bad,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Happiness Score Comparison */}
      <Card className="p-6">
        <div className="mb-4">
          <div className="text-gray-900">Competitive Happiness Index</div>
          <div className="text-sm text-gray-500">
            Compare sentiment across carriers - identify opportunities
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={competitors}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              domain={[0, 100]}
              label={{
                value: 'Happiness Score',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: 12 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="happinessScore" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Detailed Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {competitors.map((competitor, index) => (
          <Card
            key={competitor.name}
            className={`p-6 ${
              index === 0 ? 'border-2 border-purple-300 bg-purple-50/50' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-900">{competitor.name}</div>
              {index === 0 && (
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  You
                </Badge>
              )}
            </div>
            <div className="text-4xl mb-4">{competitor.happinessScore}</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Positive</span>
                <span className="text-green-600">{competitor.sentiment.good}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${competitor.sentiment.good}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Neutral</span>
                <span className="text-yellow-600">{competitor.sentiment.neutral}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: `${competitor.sentiment.neutral}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Negative</span>
                <span className="text-red-600">{competitor.sentiment.bad}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all"
                  style={{ width: `${competitor.sentiment.bad}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Radar Chart */}
      <Card className="p-6">
        <div className="mb-4">
          <div className="text-gray-900">Sentiment Distribution Comparison</div>
          <div className="text-sm text-gray-500">
            Visualize competitive positioning across sentiment types
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Radar
              name="T-Mobile"
              dataKey="T-Mobile"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.5}
              strokeWidth={2}
            />
            <Radar
              name="Verizon"
              dataKey="Verizon"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="AT&T"
              dataKey="AT&T"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Mint Mobile"
              dataKey="Mint Mobile"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      {/* Competitive Insights */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="mb-3 text-gray-900">AI Competitive Insights</div>
        <div className="space-y-3">
          <div className="p-3 bg-white rounded-lg border border-blue-200">
            <div className="text-sm">
              <span className="text-blue-600">Opportunity:</span> T-Mobile leads in positive sentiment
              by 7% vs Verizon. Leverage this in comparative marketing campaigns.
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-blue-200">
            <div className="text-sm">
              <span className="text-blue-600">Threat:</span> Mint Mobile showing strong growth in value
              perception. Monitor pricing messaging to maintain competitive positioning.
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-blue-200">
            <div className="text-sm">
              <span className="text-blue-600">Action:</span> AT&T experiencing billing issues (18%
              negative mentions). Counter-message T-Mobile's transparent billing practices.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
