import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { date: "Mon", plastic: 45, points: 890, redemptions: 12 },
  { date: "Tue", plastic: 52, points: 1040, redemptions: 15 },
  { date: "Wed", plastic: 38, points: 760, redemptions: 8 },
  { date: "Thu", plastic: 61, points: 1220, redemptions: 18 },
  { date: "Fri", plastic: 55, points: 1100, redemptions: 14 },
  { date: "Sat", plastic: 48, points: 960, redemptions: 11 },
  { date: "Sun", plastic: 42, points: 840, redemptions: 9 },
];

export function ActivityChart() {
  return (
    <Card className="bg-gradient-to-br from-card to-muted/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="plastic" 
              name="Plastic (kg)" 
              fill="hsl(var(--primary))" 
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="points" 
              name="Points Distributed" 
              fill="hsl(var(--info))" 
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="redemptions" 
              name="Redemptions" 
              fill="hsl(var(--warning))" 
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}