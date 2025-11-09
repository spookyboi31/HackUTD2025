import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CategoryInsight } from '../utils/mockData';

interface CategoryBreakdownProps {
  categories: CategoryInsight[];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const chartData = categories.map((cat) => ({
    name: cat.category,
    score: cat.sentiment,
    volume: cat.volume,
  }));

  const getBarColor = (score: number) => {
    if (score >= 70) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-4">
      {/* Chart View */}
      <Card className="p-6">
        <div className="mb-4">
          <div className="text-gray-900">Aspect-Based Sentiment Analysis (ABSA)</div>
          <div className="text-sm text-gray-500">Sentiment scores by category</div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={100}
              stroke="#9ca3af"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              domain={[0, 100]}
              label={{ value: 'Sentiment Score', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value.toFixed(1)}`, 'Score']}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Detailed List View */}
      <Card className="p-6">
        <div className="mb-4">
          <div className="text-gray-900">Category Details</div>
          <div className="text-sm text-gray-500">Click to drill down into specific insights</div>
        </div>
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.category}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-gray-900">{category.category}</div>
                  {category.sentiment >= 70 ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Strong
                    </Badge>
                  ) : category.sentiment >= 60 ? (
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                      Good
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      At Risk
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl">{category.sentiment}</div>
                    <div className="text-xs text-gray-500">score</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {category.volume.toLocaleString()} mentions
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(category.trend)}
                  <span
                    className={`text-sm ${
                      category.trend === 'up'
                        ? 'text-green-600'
                        : category.trend === 'down'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {category.changePercent > 0 ? '+' : ''}
                    {category.changePercent.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${category.sentiment}%`,
                    backgroundColor: getBarColor(category.sentiment),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
