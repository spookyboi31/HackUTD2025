import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, TrendingUp, AlertCircle, Bell } from 'lucide-react';
import { AnomalyAlert } from '../utils/mockData';

interface AnomalyAlertsProps {
  alerts: AnomalyAlert[];
}

export function AnomalyAlerts({ alerts }: AnomalyAlertsProps) {
  const getIcon = (type: 'spike' | 'drop' | 'anomaly') => {
    switch (type) {
      case 'spike':
        return <TrendingUp className="w-5 h-5" />;
      case 'drop':
        return <TrendingUp className="w-5 h-5 rotate-180" />;
      case 'anomaly':
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: 'critical' | 'warning' | 'info') => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50 border-red-200',
          icon: 'text-red-600',
          badge: 'bg-red-100 text-red-700 hover:bg-red-100',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
        };
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
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-100 rounded-lg">
          <Bell className="w-5 h-5 text-red-600" />
        </div>
        <div className="flex-1">
          <div className="text-gray-900">Anomaly Detection</div>
          <div className="text-sm text-gray-500">
            Real-time alerts for unusual patterns (3σ+ deviations)
          </div>
        </div>
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          {alerts.length} Active
        </Badge>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const colors = getSeverityColor(alert.severity);
          return (
            <div
              key={alert.id}
              className={`p-4 border rounded-lg ${colors.bg} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-3">
                <div className={colors.icon}>{getIcon(alert.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-gray-900">{alert.title}</div>
                    <Badge className={colors.badge}>{alert.severity}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{alert.description}</div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-white rounded border border-gray-200">
                      {alert.metric}
                    </span>
                    <span className={colors.icon}>
                      {alert.change > 0 ? '+' : ''}
                      {alert.change}% change
                    </span>
                    <span>{getTimeAgo(alert.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detection Info */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <div className="text-xs text-gray-600">
          <span className="text-gray-900">Detection Algorithm:</span> Statistical process control with
          rolling 24hr mean. Critical alerts trigger when volume exceeds 3 standard deviations.
          Sentiment shifts analyzed using weighted moving averages.
        </div>
      </div>
    </Card>
  );
}
