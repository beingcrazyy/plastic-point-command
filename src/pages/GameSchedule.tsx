import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Repeat, 
  Globe,
  AlertTriangle,
  Save,
  Send,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, isSameDay } from "date-fns";
import { toast } from "sonner";

interface ScheduleConflict {
  id: string;
  gameName: string;
  startDate: Date;
  endDate: Date;
}

export default function GameSchedule() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [timezone, setTimezone] = useState("UTC");
  const [repeatEnabled, setRepeatEnabled] = useState(false);
  const [repeatFrequency, setRepeatFrequency] = useState("weekly");
  const [repeatEndDate, setRepeatEndDate] = useState<Date>();
  const [conflicts, setConflicts] = useState<ScheduleConflict[]>([]);

  // Mock conflicts for demonstration
  const mockConflicts: ScheduleConflict[] = [
    {
      id: "1",
      gameName: "Ocean Cleanup Challenge",
      startDate: new Date(2024, 1, 15),
      endDate: new Date(2024, 1, 20)
    }
  ];

  const checkForConflicts = (start?: Date, end?: Date) => {
    if (!start || !end) return;
    
    const conflictingGames = mockConflicts.filter(conflict => {
      return (start <= conflict.endDate && end >= conflict.startDate);
    });
    
    setConflicts(conflictingGames);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date && !endDate) {
      setEndDate(addDays(date, 7)); // Default to 1 week duration
    }
    checkForConflicts(date, endDate);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    checkForConflicts(startDate, date);
  };

  const timezones = [
    "UTC",
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney"
  ];

  const handleSave = () => {
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    toast.success("Schedule saved as draft");
  };

  const handlePublish = () => {
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    if (conflicts.length > 0) {
      toast.error("Please resolve scheduling conflicts before publishing");
      return;
    }
    toast.success("Game published successfully!");
    navigate("/games");
  };

  const handleBack = () => {
    navigate(`/games/${id}/rewards`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Schedule Game</h1>
            <p className="text-muted-foreground mt-2">Set when your game will be available to players</p>
          </div>
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Rewards
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Schedule Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Date Range
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className={cn("w-full justify-start text-left font-normal mt-1", !startDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick start date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={handleStartDateChange}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className={cn("w-full justify-start text-left font-normal mt-1", !endDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={handleEndDateChange}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Time Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={i} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="end-time">End Time</Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={i} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz} value={tz}>
                            {tz}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Repeat Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Repeat className="w-5 h-5" />
                  Repeat Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="repeat-enabled"
                    checked={repeatEnabled}
                    onChange={(e) => setRepeatEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="repeat-enabled">Enable recurring schedule</Label>
                </div>
                
                {repeatEnabled && (
                  <div className="space-y-4 pl-6 border-l-2 border-primary/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Repeat Frequency</Label>
                        <Select value={repeatFrequency} onValueChange={setRepeatFrequency}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Repeat Until</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="outline" 
                              className={cn("w-full justify-start text-left font-normal mt-1", !repeatEndDate && "text-muted-foreground")}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {repeatEndDate ? format(repeatEndDate, "PPP") : <span>Select end date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={repeatEndDate}
                              onSelect={setRepeatEndDate}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Conflicts */}
            {conflicts.length > 0 && (
              <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-medium mb-2">Scheduling Conflicts Detected:</div>
                  <div className="space-y-1">
                    {conflicts.map((conflict) => (
                      <div key={conflict.id} className="text-sm">
                        • {conflict.gameName} ({format(conflict.startDate, "MMM dd")} - {format(conflict.endDate, "MMM dd")})
                      </div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Schedule Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Schedule Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Duration</Label>
                    <p className="font-medium">
                      {startDate && endDate
                        ? `${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days`
                        : "Not set"
                      }
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Daily Hours</Label>
                    <p className="font-medium">{startTime} - {endTime} ({timezone})</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Repeat</Label>
                    <p className="font-medium">
                      {repeatEnabled ? `Every ${repeatFrequency}` : "One-time event"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Status</Label>
                    <Badge variant={conflicts.length > 0 ? "destructive" : "secondary"}>
                      {conflicts.length > 0 ? "Has Conflicts" : "Ready to Publish"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" onClick={() => {
                  setStartDate(new Date());
                  setEndDate(addDays(new Date(), 7));
                }}>
                  Start Today
                </Button>
                <Button variant="outline" className="w-full" onClick={() => {
                  const tomorrow = addDays(new Date(), 1);
                  setStartDate(tomorrow);
                  setEndDate(addDays(tomorrow, 7));
                }}>
                  Start Tomorrow
                </Button>
                <Button variant="outline" className="w-full" onClick={() => {
                  const nextWeek = addDays(new Date(), 7);
                  setStartDate(nextWeek);
                  setEndDate(addDays(nextWeek, 7));
                }}>
                  Start Next Week
                </Button>
              </CardContent>
            </Card>

            {startDate && endDate && conflicts.length === 0 && (
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Ready to Publish</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    No conflicts detected. Your game is ready to go live!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Schedule
          </Button>
          <Button 
            onClick={handlePublish}
            disabled={!startDate || !endDate || conflicts.length > 0}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Publish Game
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}