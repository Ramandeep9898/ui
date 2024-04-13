import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import { EmployeeDataProvider } from "./hooks/employeeDataContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EmployeeDataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/charts" element={<Home />} />
        </Routes>
      </EmployeeDataProvider>
    </QueryClientProvider>
  );
}

export default App;
