import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, ThumbsUp, Twitter, Facebook } from 'lucide-react';
import { SocialPost } from '../utils/mockData';

interface SocialFeedProps {
  posts: SocialPost[];
}

export function SocialFeed({ posts }: SocialFeedProps) {
  const getSentimentColor = (sentiment: 'good' | 'neutral' | 'bad') => {
    switch (sentiment) {
      case 'good':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'bad':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <div className="text-gray-900">High-Engagement Social Feed</div>
        <div className="text-sm text-gray-500">
          Top posts by interaction volume - sorted by impact
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gray-100 rounded">
                  {getPlatformIcon(post.platform)}
                </div>
                <span className="text-sm text-gray-600">{post.platform}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">{getTimeAgo(post.timestamp)}</span>
              </div>
              <Badge className={getSentimentColor(post.sentiment)}>
                {post.sentiment}
              </Badge>
            </div>

            <div className="text-sm text-gray-700 mb-3 leading-relaxed">{post.content}</div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">{post.category}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.interactions.toLocaleString()} interactions</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feed Info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-xs text-blue-900">
          <span className="text-blue-600">AI Note:</span> Posts are ranked by interaction volume
          (likes + comments + shares) and sentiment impact. High-engagement negative posts receive
          priority for immediate response recommendations.
        </div>
      </div>
    </Card>
  );
}
