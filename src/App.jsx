import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1B2122",
            color: "#fff",
            border:
              "1px solid rgba(255,255,255,.08)",
            borderRadius: "16px",
          },

          success: {
            iconTheme: {
              primary: "#F97316",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}