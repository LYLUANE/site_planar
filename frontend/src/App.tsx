import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import Home from "./Home";
import RotaAdmin from "./components/RotaAdmin";

// Login e painel ficam em chunks separados: quem só visita a loja não baixa
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));

const carregando = (
  <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <Suspense fallback={carregando}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RotaAdmin>
              <Admin />
            </RotaAdmin>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
