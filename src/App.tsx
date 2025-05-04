import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./global.css";
import { router } from "./pages/routes";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop"/>
      <Toaster richColors />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
