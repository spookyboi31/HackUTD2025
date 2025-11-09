import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Lightbulb, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { WeightedInsight } from '../utils/mockData';

interface AIInsightsProps {
  insights: WeightedInsight[];
}

export function AIInsights({ insights }: AIInsightsProps) {
  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'low':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 70) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">
            <Lightbulb className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="text-gray-900 mb-1">AI-Powered Weighted Insights</div>
            <div className="text-sm text-gray-600">
              Prioritized action items based on customer feedback volume, sentiment trends, internal
              data patterns, and competitive dynamics. Weighted scores reflect potential business
              impact.
            </div>
          </div>
        </div>
      </Card>

      {/* Insights List */}
      <div className="space-y-3">
        {insights.map((insight) => (
          <Card
            key={insight.id}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4"
            style={{
              borderLeftColor:
                insight.impact === 'high'
                  ? '#ef4444'
                  : insight.impact === 'medium'
                  ? '#f59e0b'
                  : '#3b82f6',
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-gray-900">{insight.title}</div>
                  <Badge className={getImpactColor(insight.impact)}>
                    {insight.impact.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 mb-2">{insight.description}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {insight.category}
                  </span>
                  <span>•</span>
                  <span>{insight.source}</span>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-lg border-2 text-center min-w-[80px] ${getScoreColor(
                  insight.weightedScore
                )}`}
              >
                <div className="text-2xl">{insight.weightedScore}</div>
                <div className="text-xs">Priority</div>
              </div>
            </div>

            {/* Suggested Action */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-blue-900 mb-1">Suggested Action</div>
                  <div className="text-sm text-gray-700">{insight.suggestedAction}</div>
                </div>
              </div>
            </div>

            {/* Priority Number */}
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Weighted by: Volume × Sentiment Trend × Churn Risk × Competitive Impact
              </div>
              <div className="flex items-center gap-1 text-sm text-purple-600">
                <AlertCircle className="w-4 h-4" />
                <span>Priority #{insight.priority}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Weighting Methodology */}
      <Card className="p-6 bg-gray-50">
        <div className="mb-3 text-gray-900">Weighting Methodology</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-700 mb-1">High Priority (80-100):</div>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• High volume + negative trend</li>
              <li>• Correlates with churn data</li>
              <li>• Competitive disadvantage</li>
            </ul>
          </div>
          <div>
            <div className="text-gray-700 mb-1">Medium Priority (70-79):</div>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• Moderate volume impact</li>
              <li>• Emerging trends</li>
              <li>• Opportunity areas</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs text-gray-600">
            <span className="text-purple-600">AI Note:</span> Insights are re-weighted in real-time
            based on new data. Team meeting transcripts and internal resource allocation are factored
            into action prioritization.
          </div>
        </div>
      </Card>
    </div>
  );
}
