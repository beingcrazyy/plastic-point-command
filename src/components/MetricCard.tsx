import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  icon: LucideIcon;
  color?: "default" | "success" | "warning" | "info";
  className?: string;
}

const colorClasses = {
  default: "bg-gradient-to-br from-card to-muted/30 border-border",
  success: "bg-gradient-to-br from-success/5 to-success/10 border-success/20",
  warning: "bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20",
  info: "bg-gradient-to-br from-info/5 to-info/10 border-info/20",
};

const iconColorClasses = {
  default: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  info: "text-info bg-info/10",
};

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = "default",
  className 
}: MetricCardProps) {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-success";
      case "down": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↗";
      case "down": return "↘";
      default: return "→";
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
      colorClasses[color],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {value}
            </p>
            {change && (
              <div className="flex items-center space-x-1">
                <span className={cn("text-sm font-medium", getTrendColor(change.trend))}>
                  {getTrendIcon(change.trend)} {Math.abs(change.value)}%
                </span>
                <span className="text-xs text-muted-foreground">vs yesterday</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            iconColorClasses[color]
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}