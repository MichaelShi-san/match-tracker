import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MatchesList from "./MatchesList";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MatchesList />
    </QueryClientProvider>
  );
}

export default App;
