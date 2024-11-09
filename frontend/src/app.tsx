import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./global.css";
import { router } from "./routes";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="Gazin | %s" />
      <Toaster richColors />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
