import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, Target, TrendingUp, Award } from 'lucide-react';
import { WeightedInsight } from '../utils/mockData';

interface PositiveInsightsProps {
  insights: WeightedInsight[];
}

export function PositiveInsights({ insights }: PositiveInsightsProps) {
  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'medium':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'low':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-purple-600 bg-purple-50 border-purple-200';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">
            <Sparkles className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="text-gray-900 mb-1">Positive Opportunities & Wins to Leverage</div>
            <div className="text-sm text-gray-600">
              AI-identified strengths with high business impact. Prioritized by sentiment strength,
              growth trends, competitive advantage, and amplification potential. These are your moments
              to celebrate and scale.
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
                  ? '#10b981'
                  : insight.impact === 'medium'
                  ? '#3b82f6'
                  : '#8b5cf6',
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-gray-900">{insight.title}</div>
                  <Badge className={getImpactColor(insight.impact)}>
                    {insight.impact.toUpperCase()}
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    WINNING
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
                <div className="text-xs">Impact</div>
              </div>
            </div>

            {/* Suggested Action */}
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-green-900 mb-1">Recommended Action to Amplify</div>
                  <div className="text-sm text-gray-700">{insight.suggestedAction}</div>
                </div>
              </div>
            </div>

            {/* Priority Number */}
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Weighted by: Sentiment Strength × Growth Trend × Competitive Gap × Virality Potential
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Award className="w-4 h-4" />
                <span>Opportunity #{insight.priority}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Strategy Guide */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="mb-3 text-gray-900">Leveraging Positive Insights - Strategic Playbook</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-700 mb-2">🎯 Marketing Amplification:</div>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• Convert customer testimonials into ad creative</li>
              <li>• Create competitive comparison content</li>
              <li>• Launch user-generated content campaigns</li>
              <li>• Target competitor customers with proof points</li>
            </ul>
          </div>
          <div>
            <div className="text-gray-700 mb-2">🚀 Operational Excellence:</div>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• Replicate best practices across regions</li>
              <li>• Feature high-performers in training</li>
              <li>• Scale what's working before fixing what's broken</li>
              <li>• Use wins to boost team morale and retention</li>
            </ul>
          </div>
          <div>
            <div className="text-gray-700 mb-2">💰 Revenue Opportunities:</div>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• Upsell based on satisfaction patterns</li>
              <li>• Launch referral programs in happy segments</li>
              <li>• Increase retention with positive reinforcement</li>
              <li>• Premium tier messaging to satisfied customers</li>
            </ul>
          </div>
          <div>
            <div className="text-gray-700 mb-2">🎪 Brand Building:</div>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• PR campaigns around customer success stories</li>
              <li>• Social proof in all customer touchpoints</li>
              <li>• Award submissions with data backing</li>
              <li>• Influencer partnerships in winning categories</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Quick Wins */}
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-gray-900 mb-2">Quick Win: Immediate Actions (Next 7 Days)</div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-200 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <span className="text-green-600">5G Speed:</span> Create 3 customer testimonial
                  videos and boost on social media targeting Verizon/AT&T customers
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-200 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <span className="text-green-600">Store Teams:</span> Send personalized thank you +
                  bonus to Times Square & Miami teams, share their success internally
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-200 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <span className="text-green-600">Rural Coverage:</span> Launch geo-targeted campaign
                  in newly covered areas with "Welcome to the Network" messaging
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
