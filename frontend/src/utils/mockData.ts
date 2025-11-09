// Mock data generation for Customer Happiness Index

export interface SentimentData {
  timestamp: string;
  good: number;
  neutral: number;
  bad: number;
  totalVolume: number;
}

export interface CategoryInsight {
  category: string;
  sentiment: number;
  volume: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface CompetitorData {
  name: string;
  happinessScore: number;
  sentiment: {
    good: number;
    neutral: number;
    bad: number;
  };
}

export interface WeightedInsight {
  id: string;
  title: string;
  description: string;
  category: string;
  weightedScore: number;
  impact: 'high' | 'medium' | 'low';
  source: string;
  suggestedAction: string;
  priority: number;
  type: 'opportunity' | 'risk';
}

export interface SocialPost {
  id: string;
  platform: string;
  content: string;
  sentiment: 'good' | 'neutral' | 'bad';
  interactions: number;
  timestamp: string;
  category: string;
}

export interface AnomalyAlert {
  id: string;
  type: 'spike' | 'drop' | 'anomaly';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  metric: string;
  change: number;
  timestamp: string;
}

// Generate time series data
export const generateTimeSeriesData = (days: number = 30): SentimentData[] => {
  const data: SentimentData[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const baseGood = 60 + Math.random() * 15;
    const baseNeutral = 25 + Math.random() * 10;
    const baseBad = 15 - Math.random() * 5;
    
    data.push({
      timestamp: date.toISOString(),
      good: baseGood,
      neutral: baseNeutral,
      bad: baseBad,
      totalVolume: Math.floor(5000 + Math.random() * 3000),
    });
  }
  
  return data;
};

// Category insights based on ABSA
export const categoryInsights: CategoryInsight[] = [
  {
    category: 'Network Coverage',
    sentiment: 72,
    volume: 12543,
    trend: 'up',
    changePercent: 5.2,
  },
  {
    category: 'Customer Service',
    sentiment: 68,
    volume: 8932,
    trend: 'down',
    changePercent: -3.1,
  },
  {
    category: 'Pricing',
    sentiment: 58,
    volume: 15234,
    trend: 'down',
    changePercent: -8.4,
  },
  {
    category: '5G Speed',
    sentiment: 81,
    volume: 6782,
    trend: 'up',
    changePercent: 12.3,
  },
  {
    category: 'Store Experience',
    sentiment: 75,
    volume: 4521,
    trend: 'stable',
    changePercent: 0.8,
  },
  {
    category: 'App Performance',
    sentiment: 64,
    volume: 9834,
    trend: 'down',
    changePercent: -4.7,
  },
  {
    category: 'Device Selection',
    sentiment: 77,
    volume: 5643,
    trend: 'up',
    changePercent: 3.2,
  },
  {
    category: 'Billing Issues',
    sentiment: 45,
    volume: 11234,
    trend: 'down',
    changePercent: -6.8,
  },
];

// Competitor data
export const competitorData: CompetitorData[] = [
  {
    name: 'T-Mobile',
    happinessScore: 72,
    sentiment: { good: 65, neutral: 23, bad: 12 },
  },
  {
    name: 'Verizon',
    happinessScore: 68,
    sentiment: { good: 58, neutral: 28, bad: 14 },
  },
  {
    name: 'AT&T',
    happinessScore: 64,
    sentiment: { good: 55, neutral: 30, bad: 15 },
  },
  {
    name: 'Mint Mobile',
    happinessScore: 71,
    sentiment: { good: 62, neutral: 26, bad: 12 },
  },
];

// Weighted insights with AI suggestions
export const weightedInsights: WeightedInsight[] = [
  {
    id: '1',
    title: 'Billing System Issues - Critical Churn Risk',
    description: 'Significant spike in billing-related complaints (45% happiness score). Correlates with Year 7 customer drop-off pattern identified in internal data.',
    category: 'Billing Issues',
    weightedScore: 94,
    impact: 'high',
    source: 'Social Media (Twitter, Reddit) + Internal Customer Data',
    suggestedAction: 'Immediate: Launch proactive billing audit for Year 6-8 customers. Deploy targeted retention campaign with billing transparency messaging. Long-term: Overhaul billing notification system.',
    priority: 1,
    type: 'risk',
  },
  {
    id: '2',
    title: '5G Speed Leadership Opportunity',
    description: 'Highest positive sentiment (81%) and growing. Competitors showing 15-20% lower satisfaction in this category.',
    category: '5G Speed',
    weightedScore: 88,
    impact: 'high',
    source: 'Google Reviews + Social Media',
    suggestedAction: 'Double down on 5G messaging in marketing. Create competitive comparison campaigns highlighting speed advantage. Leverage customer testimonials in high-interaction posts.',
    priority: 2,
    type: 'opportunity',
  },
  {
    id: '3',
    title: 'Pricing Perception Decline',
    description: '8.4% negative trend in pricing sentiment. Verizon launching aggressive promotions creating market pressure.',
    category: 'Pricing',
    weightedScore: 82,
    impact: 'high',
    source: 'Multi-platform Social + Competitor Analysis',
    suggestedAction: 'Counter-messaging: Emphasize total value proposition (5G speed, coverage, perks). Consider limited-time loyalty rewards for at-risk segments.',
    priority: 3,
    type: 'risk',
  },
  {
    id: '4',
    title: 'App Performance Degradation',
    description: 'Negative sentiment trending over past 14 days. Common complaints: slow loading, login issues, bill pay failures.',
    category: 'App Performance',
    weightedScore: 76,
    impact: 'medium',
    source: 'App Store Reviews + Reddit',
    suggestedAction: 'Technical sprint to address top 3 reported bugs. Issue public acknowledgment and timeline. Push update within 2 weeks.',
    priority: 4,
    type: 'risk',
  },
  {
    id: '5',
    title: 'Customer Service Recovery Needed',
    description: '3.1% decline in customer service sentiment. Wait times and resolution quality mentioned in 67% of negative posts.',
    category: 'Customer Service',
    weightedScore: 71,
    impact: 'medium',
    source: 'Social Media Forums + Google Reviews',
    suggestedAction: 'Staff augmentation during peak hours. Implement AI-assisted ticket routing. Enhance agent training on top complaint categories.',
    priority: 5,
    type: 'risk',
  },
  {
    id: '6',
    title: 'Store Experience Positive Momentum',
    description: 'Stable positive sentiment (75%). Staff friendliness and expertise frequently praised.',
    category: 'Store Experience',
    weightedScore: 65,
    impact: 'medium',
    source: 'Google Reviews + Yelp',
    suggestedAction: 'Capture video testimonials from satisfied store customers. Use in recruitment marketing to attract similar talent. Replicate best practices from top-performing locations.',
    priority: 6,
    type: 'opportunity',
  },
];

// Positive insights - opportunities to leverage
export const positiveInsights: WeightedInsight[] = [
  {
    id: 'p1',
    title: '5G Speed Excellence - Market Leadership Position',
    description: '81% positive sentiment with 12.3% growth trend. Customer testimonials mention "fastest speeds" and "blows competitors away". Volume: 6,782 mentions.',
    category: '5G Speed',
    weightedScore: 92,
    impact: 'high',
    source: 'Google Reviews + Social Media + Speed Test Apps',
    suggestedAction: 'Launch "5G Speed Challenge" campaign inviting customers to test against competitors. Create shareable speed test graphics. Partner with tech influencers for side-by-side comparisons. Amplify in paid social targeting competitor customers.',
    priority: 1,
    type: 'opportunity',
  },
  {
    id: 'p2',
    title: 'Device Selection Satisfaction Surge',
    description: '77% sentiment score, up 3.2% this period. Customers praising "latest phones first" and trade-in programs. High engagement on new device launch posts.',
    category: 'Device Selection',
    weightedScore: 85,
    impact: 'high',
    source: 'Social Media + Store Reviews + Forum Discussions',
    suggestedAction: 'Create "First to 5G Devices" brand positioning. Develop case studies of early adopters. Launch referral program tied to device upgrades. Use customer unboxing videos in marketing.',
    priority: 2,
    type: 'opportunity',
  },
  {
    id: 'p3',
    title: 'Store Team Recognition Wave',
    description: '75% positive sentiment with viral posts praising in-store staff. "Best customer service" mentioned in 89% of positive store reviews. Times Square and Miami stores trending.',
    category: 'Store Experience',
    weightedScore: 79,
    impact: 'high',
    source: 'Google Reviews + Yelp + Facebook',
    suggestedAction: 'Feature top-performing store teams in national advertising. Create "Meet Your Local Team" content series. Implement staff spotlight program. Use authentic customer testimonials in store recruitment.',
    priority: 3,
    type: 'opportunity',
  },
  {
    id: 'p4',
    title: 'Network Coverage Rural Expansion Success',
    description: 'Positive sentiment up 5.2% driven by rural coverage improvements. Mentions from previously underserved areas. "Finally have service" is common theme.',
    category: 'Network Coverage',
    weightedScore: 76,
    impact: 'medium',
    source: 'Social Media + Google Reviews + Coverage Maps',
    suggestedAction: 'Target rural market segments with coverage expansion messaging. Create "Coverage Stories" campaign featuring real customer experiences. Counter AT&T/Verizon rural positioning. Geo-target expanded coverage areas.',
    priority: 4,
    type: 'opportunity',
  },
  {
    id: 'p5',
    title: 'Customer Loyalty Program Momentum',
    description: 'T-Mobile Tuesdays and perks generating positive buzz. 68% of mentions highlight "extra value". Highest engagement among 25-34 age group.',
    category: 'Pricing',
    weightedScore: 72,
    impact: 'medium',
    source: 'Social Media + App Reviews + Internal Data',
    suggestedAction: 'Amplify perks in value messaging to counter pricing concerns. Create viral "Tuesdays Haul" UGC campaign. Partner with high-value brands for exclusive offers. Highlight total value vs competitors.',
    priority: 5,
    type: 'opportunity',
  },
  {
    id: 'p6',
    title: 'Customer Service Heroes Creating Wow Moments',
    description: 'Despite overall CS decline, specific agents getting called out for exceptional service. "Went above and beyond" mentioned in 234 posts. Story-driven testimonials.',
    category: 'Customer Service',
    weightedScore: 68,
    impact: 'medium',
    source: 'Social Media + Customer Support Tickets + Reviews',
    suggestedAction: 'Feature exceptional service stories in marketing. Create "Customer Hero" internal recognition program. Train all agents on successful resolution patterns. Use real transcripts in training materials.',
    priority: 6,
    type: 'opportunity',
  },
];

// Social media posts with high engagement
export const socialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'Twitter',
    content: "Just got my bill and there's a $45 charge I never authorized. Third month in a row. @TMobile this is unacceptable. About to switch after 8 years.",
    sentiment: 'bad',
    interactions: 2847,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'Billing Issues',
  },
  {
    id: '2',
    platform: 'Reddit',
    content: 'T-Mobile 5G speeds in LA are insane! Consistently getting 800+ Mbps downtown. Verizon was half that when I had them.',
    sentiment: 'good',
    interactions: 1923,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: '5G Speed',
  },
  {
    id: '3',
    platform: 'Twitter',
    content: "Their app has been unusable for 3 days. Can't pay my bill, can't check usage. How is this acceptable for a major carrier?",
    sentiment: 'bad',
    interactions: 1654,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: 'App Performance',
  },
  {
    id: '4',
    platform: 'Facebook',
    content: 'Shoutout to the team at the Times Square store! They spent 45 mins helping my mom switch her phone and taught her everything. Best customer service.',
    sentiment: 'good',
    interactions: 1432,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    category: 'Store Experience',
  },
  {
    id: '5',
    platform: 'Reddit',
    content: "Pricing is getting ridiculous. They keep adding fees and the 'Un-carrier' promise feels like a joke now. Considering Mint Mobile.",
    sentiment: 'bad',
    interactions: 1287,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Pricing',
  },
  {
    id: '6',
    platform: 'Google Reviews',
    content: 'Coverage in rural Montana has improved dramatically. Finally can use my phone at the ranch. Thank you T-Mobile!',
    sentiment: 'good',
    interactions: 987,
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    category: 'Network Coverage',
  },
];

// Anomaly alerts
export const anomalyAlerts: AnomalyAlert[] = [
  {
    id: '1',
    type: 'spike',
    severity: 'critical',
    title: 'Billing Complaints Spike',
    description: 'Volume of billing-related negative posts is 4.2σ above 24hr mean',
    metric: 'Billing Issues Volume',
    change: 342,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'spike',
    severity: 'warning',
    title: 'App Performance Complaints Rising',
    description: 'App-related issues up 156% compared to last week',
    metric: 'App Performance Sentiment',
    change: 156,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'anomaly',
    severity: 'info',
    title: '5G Speed Praise Trending',
    description: 'Positive mentions of 5G speed up 89% - unusual positive pattern detected',
    metric: '5G Speed Positive Volume',
    change: 89,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'spike',
    severity: 'info',
    title: 'Store Experience Viral Moment',
    description: 'Times Square store team getting exceptional praise - 234% increase in positive mentions in 24hrs',
    metric: 'Store Experience Positive Sentiment',
    change: 234,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'spike',
    severity: 'info',
    title: 'Rural Coverage Success Stories',
    description: 'Unexpected spike in positive coverage testimonials from previously underserved areas',
    metric: 'Network Coverage Positive Volume',
    change: 127,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
];
