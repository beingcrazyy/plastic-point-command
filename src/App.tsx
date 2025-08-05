import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Users from "./pages/Users";
import Stores from "./pages/Stores";
import Rewards from "./pages/Rewards";
import Rates from "./pages/Rates";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Games from "./pages/Games";
import CreateGame from "./pages/CreateGame";
import GameRewards from "./pages/GameRewards";
import GameSchedule from "./pages/GameSchedule";
import Leaderboards from "./pages/Leaderboards";
import GameHistory from "./pages/GameHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/users" element={<Users />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/create" element={<CreateGame />} />
        <Route path="/games/:id/edit" element={<CreateGame />} />
        <Route path="/games/:id/rewards" element={<GameRewards />} />
        <Route path="/games/:id/schedule" element={<GameSchedule />} />
        <Route path="/games/leaderboards" element={<Leaderboards />} />
        <Route path="/games/:id/history" element={<GameHistory />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
