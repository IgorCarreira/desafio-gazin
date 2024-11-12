import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./global.css";
import { router } from "./routes";
import { ThemeProvider } from "./components/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HelmetProvider>
        <Helmet titleTemplate="Gazin | %s" />
        <Toaster theme="dark" />
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </HelmetProvider>
    </ThemeProvider>
  );
}
