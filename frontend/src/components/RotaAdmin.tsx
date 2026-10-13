import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

function RotaAdmin({ children }: { children: ReactNode }) {
  const { verificando, ehAdmin } = useAuth();

  if (verificando) {
    return (
      <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return ehAdmin ? children : <Navigate to="/login" replace />;
}

export default RotaAdmin;
