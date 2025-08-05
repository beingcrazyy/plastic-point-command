import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Plus, Filter, Calendar as CalendarIcon, Edit, Trash, History, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const mockGames = [
  {
    id: 1,
    name: "Climate Quiz Challenge",
    type: "quiz",
    status: "live",
    created: "2024-01-15",
    schedule: "2024-01-20 to 2024-02-20",
    participants: 1245
  },
  {
    id: 2,
    name: "Recycling Memory Game",
    type: "memory",
    status: "scheduled",
    created: "2024-01-10",
    schedule: "2024-02-01 to 2024-02-28",
    participants: 0
  },
  {
    id: 3,
    name: "Ocean Cleanup Puzzle",
    type: "puzzle",
    status: "draft",
    created: "2024-01-08",
    schedule: "Not scheduled",
    participants: 0
  },
  {
    id: 4,
    name: "Green Trivia Master",
    type: "trivia",
    status: "archived",
    created: "2023-12-15",
    schedule: "2023-12-20 to 2024-01-15",
    participants: 892
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "live": return "bg-green-500/10 text-green-600 border-green-500/20";
    case "scheduled": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "draft": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    case "archived": return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "quiz": return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    case "puzzle": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    case "trivia": return "bg-pink-500/10 text-pink-600 border-pink-500/20";
    case "memory": return "bg-cyan-500/10 text-cyan-600 border-cyan-500/20";
    default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
  }
};

export default function Games() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = mockGames.filter(game => {
    const matchesType = typeFilter === "all" || game.type === typeFilter;
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Games</h1>
            <p className="text-muted-foreground mt-2">Manage your gamification content</p>
          </div>
          <div className="flex gap-3">
            <Link to="/games/leaderboards">
              <Button variant="outline" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Leaderboards
              </Button>
            </Link>
            <Link to="/games/create">
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Game
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Games</p>
                  <p className="text-2xl font-bold">{mockGames.length}</p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Live Games</p>
                  <p className="text-2xl font-bold">{mockGames.filter(g => g.status === "live").length}</p>
                </div>
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Participants</p>
                  <p className="text-2xl font-bold">{mockGames.reduce((sum, g) => sum + g.participants, 0).toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Participation</p>
                  <p className="text-2xl font-bold">{Math.round(mockGames.reduce((sum, g) => sum + g.participants, 0) / mockGames.length).toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Filter className="w-4 h-4 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="puzzle">Puzzle</SelectItem>
                  <SelectItem value="trivia">Trivia</SelectItem>
                  <SelectItem value="memory">Memory</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[300px] justify-start text-left font-normal", !dateRange?.from && "text-muted-foreground")}>
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
          </CardContent>
        </Card>

        {/* Games Table */}
        <Card>
          <CardHeader>
            <CardTitle>Game List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell className="font-medium">{game.name}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(game.type)}>
                        {game.type.charAt(0).toUpperCase() + game.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(game.status)}>
                        {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{game.schedule}</TableCell>
                    <TableCell>{game.participants.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link to={`/games/${game.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to={`/games/${game.id}/history`}>
                          <Button variant="ghost" size="sm">
                            <History className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
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