import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

/**
 * Só renderiza o conteúdo para um admin confirmado pelo backend.
 * (A proteção de verdade é a API, que recusa qualquer escrita sem token de
 * admin; isto aqui só evita mostrar a tela para quem não está logado.)
 */
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
