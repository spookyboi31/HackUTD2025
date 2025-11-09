import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Calendar, RefreshCw, Download } from 'lucide-react';

interface FilterControlsProps {
  timeRange: string;
  dataSource: string;
  onTimeRangeChange: (value: string) => void;
  onDataSourceChange: (value: string) => void;
  onRefresh: () => void;
}

export function FilterControls({
  timeRange,
  dataSource,
  onTimeRangeChange,
  onDataSourceChange,
  onRefresh,
}: FilterControlsProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Select value={dataSource} onValueChange={onDataSourceChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select data source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="social">Social Media Only</SelectItem>
              <SelectItem value="reviews">Reviews Only</SelectItem>
              <SelectItem value="forums">Forums Only</SelectItem>
              <SelectItem value="internal">Internal Data</SelectItem>
              <SelectItem value="anonymous">Anonymous Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="w-full md:w-auto flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Live data stream active</span>
        </div>
      </div>
    </Card>
  );
}
