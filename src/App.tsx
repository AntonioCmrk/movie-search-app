import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import NavigationRoutes from "./navigation/NavigationRoutes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100 ">
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <NavigationRoutes />
          <Toaster />
        </MainLayout>
      </QueryClientProvider>
    </div>
  );
}

export default App;
