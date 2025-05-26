import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TicketDashboard from "./pages/TicketDashboard";
import './App.css'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketDashboard />} />
        <Route path="/dashboard" element={<TicketDashboard />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
