import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NoticesProvider } from "@/contexts/NoticesContext";
import Index from "./pages/Index";
import Board from "./pages/Board";
import NoticeDetail from "./pages/NoticeDetail";
import Profile from "./pages/Profile";
import CampusMap from "./pages/CampusMap";
import Auth from "./pages/Auth";
import CreateNotice from "./pages/CreateNotice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NoticesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/board" element={<Board />} />
              <Route path="/notice/:id" element={<NoticeDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/map" element={<CampusMap />} />
              <Route path="/create-notice" element={<CreateNotice />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NoticesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
