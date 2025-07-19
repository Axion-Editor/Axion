import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

const isNative = () => {
  return !!(window as any).Capacitor;
};

const queryClient = new QueryClient();

const App = () => {
  const Router = isNative() ? MemoryRouter : BrowserRouter;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster/>
        <Sonner/>
        <Router>
          <Routes>
            <Route path={"/"} element={<Index/>}/>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path={"*"} element={<NotFound/>}/>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
