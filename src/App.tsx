
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
import SeniorCitizenPortal from "./pages/SeniorCitizenPortal";
import LegalAid from "./pages/LegalAid";
import Anamika from "./pages/Anamika";
import PersonalChatbot from "./pages/PersonalChatbot";
import ConnectWithExperts from "./pages/ConnectWithExperts";
import Subscription from "./pages/Subscription";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";
import History from "./pages/History";
import CaseUpdates from "./pages/CaseUpdates";
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
              <Route path="/senior-citizen-portal" element={<SeniorCitizenPortal />} />
              <Route path="/legal-aid" element={<LegalAid />} />
              <Route path="/anamika" element={<Anamika />} />
              <Route path="/personal-chatbot" element={<PersonalChatbot />} />
              <Route path="/connect-with-experts" element={<ConnectWithExperts />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/history" element={<History />} />
              <Route path="/case-updates" element={<CaseUpdates />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
