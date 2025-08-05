import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Filter, 
  Download,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const mockGameData = {
  id: 1,
  name: "Climate Quiz Challenge",
  type: "quiz",
  status: "live"
};

const mockGameSessions = [
  {
    id: 1,
    user: { name: "Sarah Chen", email: "sarah@example.com", avatar: null },
    score: 850,
    maxScore: 1000,
    duration: "4m 32s",
    completedAt: "2024-01-20T14:30:00Z",
    attempts: 2
  },
  {
    id: 2,
    user: { name: "Mike Johnson", email: "mike@example.com", avatar: null },
    score: 720,
    maxScore: 1000,
    duration: "6m 15s",
    completedAt: "2024-01-20T13:45:00Z",
    attempts: 1
  },
  {
    id: 3,
    user: { name: "Emma Wilson", email: "emma@example.com", avatar: null },
    score: 950,
    maxScore: 1000,
    duration: "3m 58s",
    completedAt: "2024-01-20T12:20:00Z",
    attempts: 3
  },
  {
    id: 4,
    user: { name: "David Lee", email: "david@example.com", avatar: null },
    score: 680,
    maxScore: 1000,
    duration: "5m 42s",
    completedAt: "2024-01-19T16:10:00Z",
    attempts: 1
  },
  {
    id: 5,
    user: { name: "Lisa Rodriguez", email: "lisa@example.com", avatar: null },
    score: 790,
    maxScore: 1000,
    duration: "4m 18s",
    completedAt: "2024-01-19T15:35:00Z",
    attempts: 2
  }
];

const mockAnalyticsData = {
  participationOverTime: [
    { date: "Jan 15", participants: 25, avgScore: 720 },
    { date: "Jan 16", participants: 32, avgScore: 745 },
    { date: "Jan 17", participants: 28, avgScore: 680 },
    { date: "Jan 18", participants: 45, avgScore: 790 },
    { date: "Jan 19", participants: 38, avgScore: 735 },
    { date: "Jan 20", participants: 52, avgScore: 810 }
  ],
  scoreDistribution: [
    { range: "0-200", count: 5 },
    { range: "201-400", count: 12 },
    { range: "401-600", count: 28 },
    { range: "601-800", count: 45 },
    { range: "801-1000", count: 32 }
  ]
};

export default function GameHistory() {
  const { id } = useParams();
  const [userFilter, setUserFilter] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [sortField, setSortField] = useState("completedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredSessions = mockGameSessions.filter(session => {
    const matchesUser = session.user.name.toLowerCase().includes(userFilter.toLowerCase()) ||
                       session.user.email.toLowerCase().includes(userFilter.toLowerCase());
    // In a real app, you'd filter by date range here
    return matchesUser;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const completionRate = (mockGameSessions.length / 150) * 100; // Assuming 150 attempts total
  const averageScore = Math.round(mockGameSessions.reduce((sum, s) => sum + s.score, 0) / mockGameSessions.length);
  const averageDuration = "4m 52s"; // Mock calculation

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Game History & Analytics</h1>
            <p className="text-muted-foreground mt-2">
              {mockGameData.name} - Detailed performance insights
            </p>
          </div>
          <Link to="/games">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </Link>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold">{mockGameSessions.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold">{averageScore}</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold">{averageDuration}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Participation Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockAnalyticsData.participationOverTime}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="participants" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Participants"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgScore" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    name="Avg Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Score Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockAnalyticsData.scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="range" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="user-filter">Filter by User</Label>
                <Input
                  id="user-filter"
                  placeholder="Search by name or email..."
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={cn("w-[300px] justify-start text-left font-normal mt-1", !dateRange?.from && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Sessions Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Game Sessions</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:text-foreground"
                    onClick={() => handleSort("score")}
                  >
                    Score {sortField === "score" && (sortOrder === "desc" ? "↓" : "↑")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:text-foreground"
                    onClick={() => handleSort("duration")}
                  >
                    Duration {sortField === "duration" && (sortOrder === "desc" ? "↓" : "↑")}
                  </TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:text-foreground"
                    onClick={() => handleSort("completedAt")}
                  >
                    Completed At {sortField === "completedAt" && (sortOrder === "desc" ? "↓" : "↑")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={session.user.avatar || undefined} />
                          <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{session.user.name}</p>
                          <p className="text-sm text-muted-foreground">{session.user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={cn("font-bold text-lg", getScoreColor(session.score, session.maxScore))}>
                          {session.score}
                        </span>
                        <span className="text-muted-foreground">/ {session.maxScore}</span>
                        <Badge variant="secondary" className="text-xs">
                          {Math.round((session.score / session.maxScore) * 100)}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{session.duration}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{session.attempts}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(session.completedAt), "MMM dd, yyyy 'at' h:mm a")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}