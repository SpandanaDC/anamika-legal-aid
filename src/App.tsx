
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EducateYourself from "./pages/EducateYourself";
import SeniorCitizenHelp from "./pages/SeniorCitizenHelp";
import LegalAid from "./pages/LegalAid";
import Anamika from "./pages/Anamika";
import Subscription from "./pages/Subscription";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/educate-yourself" element={<EducateYourself />} />
              <Route path="/senior-citizen-help" element={<SeniorCitizenHelp />} />
              <Route path="/legal-aid" element={<LegalAid />} />
              <Route path="/anamika" element={<Anamika />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
