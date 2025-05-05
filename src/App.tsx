import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import "./global.css";
import { router } from "./pages/routes";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop"/>
        <Toaster richColors />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  );
}
