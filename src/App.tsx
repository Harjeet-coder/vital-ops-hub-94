import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { HospitalProvider } from "@/providers/HospitalProvider";
import Index from "./pages/Index";
import Admission from "./pages/Admission";
import Beds from "./pages/Beds";
import BloodBank from "./pages/BloodBank";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import PatientDetails from "./pages/PatientDetails";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HospitalProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/beds" element={<Beds />} />
          <Route path="/blood-bank" element={<BloodBank />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </HospitalProvider>
  </QueryClientProvider>
);

export default App;