import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "./components/ui/provider";
import GlobeContainer from "./pages/home/globe-container";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider>
        <QueryClientProvider client={queryClient}>
          {/* <Home /> */}
          <GlobeContainer />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
