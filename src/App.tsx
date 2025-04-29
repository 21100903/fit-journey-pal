
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import WorkoutDetailPage from "./pages/WorkoutDetailPage";
import CustomWorkoutPage from "./pages/CustomWorkoutPage";
import NutritionPage from "./pages/NutritionPage";
import FoodDetailPage from "./pages/FoodDetailPage";
import MealHistoryPage from "./pages/MealHistoryPage";
import AddEntryPage from "./pages/AddEntryPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/workouts/:workoutId" element={<WorkoutDetailPage />} />
            <Route path="/custom-workout" element={<CustomWorkoutPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/nutrition/:foodId" element={<FoodDetailPage />} />
            <Route path="/meals" element={<MealHistoryPage />} />
            <Route path="/add" element={<AddEntryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
