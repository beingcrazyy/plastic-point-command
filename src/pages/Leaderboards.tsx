import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Medal, 
  Award, 
  Download, 
  ArrowLeft,
  Crown,
  Star,
  TrendingUp
} from "lucide-react";
import { format } from "date-fns";

const mockLeaderboardData = {
  global: [
    { id: 1, rank: 1, name: "Sarah Chen", email: "sarah@example.com", score: 2450, lastPlayed: "2024-01-20", totalGames: 15, avatar: null },
    { id: 2, rank: 2, name: "Mike Johnson", email: "mike@example.com", score: 2280, lastPlayed: "2024-01-19", totalGames: 12, avatar: null },
    { id: 3, rank: 3, name: "Emma Wilson", email: "emma@example.com", score: 2150, lastPlayed: "2024-01-20", totalGames: 18, avatar: null },
    { id: 4, rank: 4, name: "David Lee", email: "david@example.com", score: 1980, lastPlayed: "2024-01-18", totalGames: 9, avatar: null },
    { id: 5, rank: 5, name: "Lisa Rodriguez", email: "lisa@example.com", score: 1875, lastPlayed: "2024-01-20", totalGames: 14, avatar: null }
  ],
  perGame: [
    { id: 1, rank: 1, name: "Alex Thompson", email: "alex@example.com", score: 950, lastPlayed: "2024-01-20", attempts: 3, avatar: null },
    { id: 2, rank: 2, name: "Maria Garcia", email: "maria@example.com", score: 890, lastPlayed: "2024-01-19", attempts: 5, avatar: null },
    { id: 3, rank: 3, name: "John Smith", email: "john@example.com", score: 825, lastPlayed: "2024-01-20", attempts: 2, avatar: null },
    { id: 4, rank: 4, name: "Sophie Brown", email: "sophie@example.com", score: 780, lastPlayed: "2024-01-18", attempts: 4, avatar: null },
    { id: 5, rank: 5, name: "Tom Wilson", email: "tom@example.com", score: 745, lastPlayed: "2024-01-19", attempts: 6, avatar: null }
  ]
};

const mockGames = [
  { id: 1, name: "Climate Quiz Challenge", type: "quiz" },
  { id: 2, name: "Recycling Memory Game", type: "memory" },
  { id: 3, name: "Ocean Cleanup Puzzle", type: "puzzle" },
  { id: 4, name: "Green Trivia Master", type: "trivia" }
];

export default function Leaderboards() {
  const [selectedGame, setSelectedGame] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all-time");
  const [sortField, setSortField] = useState("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case 2: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      case 3: return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleDownloadCSV = (type: string) => {
    // In a real app, this would generate and download a CSV file
    const filename = `leaderboard_${type}_${timeFilter}_${new Date().toISOString().split('T')[0]}.csv`;
    console.log(`Downloading ${filename}`);
    // Mock download
    const blob = new Blob(["Sample CSV data"], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leaderboards</h1>
            <p className="text-muted-foreground mt-2">Track top performers across all games</p>
          </div>
          <Link to="/games">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Players</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active This Week</p>
                  <p className="text-2xl font-bold">342</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Top Score</p>
                  <p className="text-2xl font-bold">2,450</p>
                </div>
                <Star className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl font-bold">1,156</p>
                </div>
                <Award className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="global" className="space-y-6">
          <TabsList>
            <TabsTrigger value="global">Global Leaderboard</TabsTrigger>
            <TabsTrigger value="per-game">Per-Game Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Global Leaderboard - {timeFilter === "all-time" ? "All Time" : timeFilter}
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownloadCSV("global")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:text-foreground"
                        onClick={() => handleSort("score")}
                      >
                        Total Score {sortField === "score" && (sortOrder === "desc" ? "↓" : "↑")}
                      </TableHead>
                      <TableHead>Games Played</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:text-foreground"
                        onClick={() => handleSort("lastPlayed")}
                      >
                        Last Played {sortField === "lastPlayed" && (sortOrder === "desc" ? "↓" : "↑")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLeaderboardData.global.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getRankIcon(player.rank)}
                            <Badge className={getRankBadgeColor(player.rank)}>
                              #{player.rank}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={player.avatar || undefined} />
                              <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-muted-foreground">{player.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-lg">{player.score.toLocaleString()}</TableCell>
                        <TableCell>{player.totalGames}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(player.lastPlayed), "MMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="per-game" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Select value={selectedGame} onValueChange={setSelectedGame}>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Select a game" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Games</SelectItem>
                      {mockGames.map((game) => (
                        <SelectItem key={game.id} value={game.id.toString()}>
                          {game.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-5 h-5" />
                  {selectedGame === "all" ? "All Games" : mockGames.find(g => g.id.toString() === selectedGame)?.name} - {timeFilter === "all-time" ? "All Time" : timeFilter}
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownloadCSV("per-game")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:text-foreground"
                        onClick={() => handleSort("score")}
                      >
                        Score {sortField === "score" && (sortOrder === "desc" ? "↓" : "↑")}
                      </TableHead>
                      <TableHead>Attempts</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:text-foreground"
                        onClick={() => handleSort("lastPlayed")}
                      >
                        Last Played {sortField === "lastPlayed" && (sortOrder === "desc" ? "↓" : "↑")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLeaderboardData.perGame.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getRankIcon(player.rank)}
                            <Badge className={getRankBadgeColor(player.rank)}>
                              #{player.rank}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={player.avatar || undefined} />
                              <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-muted-foreground">{player.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-lg">{player.score.toLocaleString()}</TableCell>
                        <TableCell>{player.attempts}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(player.lastPlayed), "MMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}