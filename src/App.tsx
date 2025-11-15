import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Home from "./pages/home";
import { Provider } from "./components/ui/provider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
