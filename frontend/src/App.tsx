import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import {
  Activity,
  TrendingUp,
  Users,
  Lightbulb,
  Bell,
  MessageSquare,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { SentimentOverview } from "./components/SentimentOverview";
import { TrendChart } from "./components/TrendChart";
import { VolumeChart } from "./components/VolumeChart";
import { CategoryBreakdown } from "./components/CategoryBreakdown";
import { CompetitorComparison } from "./components/CompetitorComparison";
import { AIInsights } from "./components/AIInsights";
import { PositiveInsights } from "./components/PositiveInsights";
import { AnomalyAlerts } from "./components/AnomalyAlerts";
import { SocialFeed } from "./components/SocialFeed";
import { FilterControls } from "./components/FilterControls";
import {
  generateTimeSeriesData,
  categoryInsights,
  competitorData,
  weightedInsights,
  positiveInsights,
  socialPosts,
  anomalyAlerts,
} from "./utils/mockData";

export default function App() {
  const [timeRange, setTimeRange] = useState("30d");
  const [dataSource, setDataSource] = useState("all");
  const [timeSeriesData, setTimeSeriesData] = useState(
    generateTimeSeriesData(30),
  );
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSeriesData(generateTimeSeriesData(30));
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate current metrics
  const latestData = timeSeriesData[timeSeriesData.length - 1];
  const previousData =
    timeSeriesData[timeSeriesData.length - 2];

  const happinessScore = Math.round(
    ((latestData.good * 1.0 +
      latestData.neutral * 0.5 +
      latestData.bad * 0) /
      (latestData.good + latestData.neutral + latestData.bad)) *
      100,
  );

  const previousHappinessScore = Math.round(
    ((previousData.good * 1.0 +
      previousData.neutral * 0.5 +
      previousData.bad * 0) /
      (previousData.good +
        previousData.neutral +
        previousData.bad)) *
      100,
  );

  const scoreChange = happinessScore - previousHappinessScore;
  const volumeChange =
    ((latestData.totalVolume - previousData.totalVolume) /
      previousData.totalVolume) *
    100;

  const handleRefresh = () => {
    setTimeSeriesData(generateTimeSeriesData(30));
    setLastUpdate(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">
                  T-Mobile Customer Happiness Index
                </h1>
                <p className="text-sm text-gray-500">
                  Real-time sentiment analytics & AI-powered
                  insights
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="space-y-6">
          {/* Filter Controls */}
          <FilterControls
            timeRange={timeRange}
            dataSource={dataSource}
            onTimeRangeChange={setTimeRange}
            onDataSourceChange={setDataSource}
            onRefresh={handleRefresh}
          />

          {/* Overview Metrics */}
          <SentimentOverview
            happinessScore={happinessScore}
            scoreChange={scoreChange}
            goodPercent={latestData.good}
            neutralPercent={latestData.neutral}
            badPercent={latestData.bad}
            totalVolume={latestData.totalVolume}
            volumeChange={volumeChange}
          />

          {/* Tabbed Interface */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">
                  Overview
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">
                  Categories
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="competitors"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">
                  Competitors
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span className="hidden sm:inline">
                  AI Insights
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className="flex items-center gap-2"
              >
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger
                value="feed"
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">
                  Social Feed
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              {/* Quick Insights Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-lg">
                      <Sparkles className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-600 mb-1">
                        Opportunities to Amplify
                      </div>
                      <div className="text-3xl text-green-600 mb-2">
                        {positiveInsights.length}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        High-impact wins ready to scale
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-gray-700">
                            5G Speed Leadership (92 impact)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-gray-700">
                            Device Selection Surge (85 impact)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-gray-700">
                            Store Team Excellence (79 impact)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-600 mb-1">
                        Risks to Address
                      </div>
                      <div className="text-3xl text-red-600 mb-2">
                        {
                          weightedInsights.filter(
                            (i) => i.type === "risk",
                          ).length
                        }
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Critical issues requiring action
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span className="text-gray-700">
                            Billing System Issues (94 priority)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span className="text-gray-700">
                            Pricing Perception (82 priority)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span className="text-gray-700">
                            App Performance (76 priority)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TrendChart
                  data={timeSeriesData}
                  title="Sentiment Trends Over Time"
                />
                <VolumeChart data={timeSeriesData} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <CategoryBreakdown
                    categories={categoryInsights}
                  />
                </div>
                <div>
                  <AnomalyAlerts alerts={anomalyAlerts} />
                </div>
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories">
              <CategoryBreakdown
                categories={categoryInsights}
              />
            </TabsContent>

            {/* Competitors Tab */}
            <TabsContent value="competitors">
              <CompetitorComparison
                competitors={competitorData}
              />
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent value="insights" className="space-y-4">
              {/* Toggle between Risks and Opportunities */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-900 mb-1">
                      AI-Powered Insights & Actions
                    </div>
                    <div className="text-sm text-gray-500">
                      View risks to mitigate and opportunities
                      to amplify
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const risksElement =
                          document.getElementById(
                            "risks-section",
                          );
                        risksElement?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      View Risks (
                      {
                        weightedInsights.filter(
                          (i) => i.type === "risk",
                        ).length
                      }
                      )
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const oppsElement =
                          document.getElementById(
                            "opportunities-section",
                          );
                        oppsElement?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      View Opportunities (
                      {positiveInsights.length})
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Positive Insights First - Lead with wins */}
              <div id="opportunities-section">
                <PositiveInsights insights={positiveInsights} />
              </div>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gray-100 px-4 text-sm text-gray-500">
                    Risks & Issues to Address
                  </span>
                </div>
              </div>

              {/* Risk Insights */}
              <div id="risks-section">
                <AIInsights
                  insights={weightedInsights.filter(
                    (i) => i.type === "risk",
                  )}
                />
              </div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AnomalyAlerts alerts={anomalyAlerts} />
                <Card className="p-6">
                  <div className="mb-4">
                    <div className="text-gray-900">
                      Alert Settings
                    </div>
                    <div className="text-sm text-gray-500">
                      Configure thresholds and notifications
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-700">
                          Volume Spike Threshold
                        </div>
                        <div className="text-sm text-purple-600">
                          3.0σ
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Alert when volume exceeds 3 standard
                        deviations above mean
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-700">
                          Sentiment Drop Alert
                        </div>
                        <div className="text-sm text-purple-600">
                          -5% in 24h
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Alert when happiness score drops 5+
                        points in 24 hours
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-700">
                          Category Risk Threshold
                        </div>
                        <div className="text-sm text-purple-600">
                          &lt;50 score
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Alert when any category falls below 50
                        happiness score
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Social Feed Tab */}
            <TabsContent value="feed" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <SocialFeed posts={socialPosts} />
                </div>
                <div className="space-y-4">
                  <Card className="p-6">
                    <div className="mb-4">
                      <div className="text-gray-900">
                        Engagement Metrics
                      </div>
                      <div className="text-sm text-gray-500">
                        Top performing posts (24h)
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">
                            Total Interactions
                          </span>
                          <span className="text-gray-900">
                            {socialPosts
                              .reduce(
                                (sum, post) =>
                                  sum + post.interactions,
                                0,
                              )
                              .toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-full bg-purple-500 rounded-full w-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">
                            Positive Posts
                          </span>
                          <span className="text-green-600">
                            {
                              socialPosts.filter(
                                (p) => p.sentiment === "good",
                              ).length
                            }
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{
                              width: `${(socialPosts.filter((p) => p.sentiment === "good").length / socialPosts.length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">
                            Negative Posts
                          </span>
                          <span className="text-red-600">
                            {
                              socialPosts.filter(
                                (p) => p.sentiment === "bad",
                              ).length
                            }
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div
                            className="h-full bg-red-500 rounded-full"
                            style={{
                              width: `${(socialPosts.filter((p) => p.sentiment === "bad").length / socialPosts.length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-6 bg-purple-50 border-purple-200">
                    <div className="text-gray-900 mb-2">
                      Response Recommendations
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        • High-engagement negative posts require
                        immediate attention
                      </p>
                      <p>
                        • Leverage positive testimonials in
                        marketing
                      </p>
                      <p>
                        • Monitor trending topics for proactive
                        responses
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}