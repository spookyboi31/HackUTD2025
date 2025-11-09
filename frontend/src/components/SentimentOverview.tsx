import { Card } from './ui/card';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { Badge } from './ui/badge';

interface SentimentOverviewProps {
  happinessScore: number;
  scoreChange: number;
  goodPercent: number;
  neutralPercent: number;
  badPercent: number;
  totalVolume: number;
  volumeChange: number;
}

export function SentimentOverview({
  happinessScore,
  scoreChange,
  goodPercent,
  neutralPercent,
  badPercent,
  totalVolume,
  volumeChange,
}: SentimentOverviewProps) {
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (change < 0) return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-400" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Main Happiness Score */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
        <div className="flex items-start justify-between mb-2">
          <div className="text-gray-600">Happiness Index</div>
          <div className="flex items-center gap-1">
            {getTrendIcon(scoreChange)}
            <span className={`text-sm ${getTrendColor(scoreChange)}`}>
              {scoreChange > 0 ? '+' : ''}{scoreChange.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="text-5xl text-purple-600">{happinessScore}</div>
          <div className="text-xl text-gray-500 mb-1">/100</div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {happinessScore >= 70 ? 'Strong' : happinessScore >= 60 ? 'Good' : 'Needs Attention'}
        </div>
      </Card>

      {/* Positive Sentiment */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="text-gray-600">Positive</div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Good</Badge>
        </div>
        <div className="text-4xl text-green-600">{goodPercent.toFixed(1)}%</div>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${goodPercent}%` }}
          />
        </div>
      </Card>

      {/* Neutral Sentiment */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="text-gray-600">Neutral</div>
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Neutral</Badge>
        </div>
        <div className="text-4xl text-yellow-600">{neutralPercent.toFixed(1)}%</div>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 transition-all duration-500"
            style={{ width: `${neutralPercent}%` }}
          />
        </div>
      </Card>

      {/* Negative Sentiment */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="text-gray-600">Negative</div>
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Bad</Badge>
        </div>
        <div className="text-4xl text-red-600">{badPercent.toFixed(1)}%</div>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${badPercent}%` }}
          />
        </div>
      </Card>

      {/* Volume Stats */}
      <Card className="p-6 md:col-span-2">
        <div className="flex items-start justify-between mb-2">
          <div className="text-gray-600">Total Feedback Volume (24h)</div>
          <div className="flex items-center gap-1">
            {getTrendIcon(volumeChange)}
            <span className={`text-sm ${getTrendColor(volumeChange)}`}>
              {volumeChange > 0 ? '+' : ''}{volumeChange.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="text-3xl">{totalVolume.toLocaleString()}</div>
        <div className="mt-2 text-sm text-gray-500">
          posts across all platforms
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="p-6 md:col-span-2">
        <div className="text-gray-600 mb-3">Data Sources</div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-500">Social Media</div>
            <div className="text-xl">68%</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Reviews</div>
            <div className="text-xl">22%</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Forums</div>
            <div className="text-xl">10%</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
