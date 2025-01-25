import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./context/ThemeContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <RouterProvider router={router}></RouterProvider>
            </HelmetProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
