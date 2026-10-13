import { useState } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ApiError } from "../api/cliente";
import { useAuth } from "../hooks/useAuth";
import { CORES } from "../theme";

// Mesmas regras do backend, para avisar antes de enviar
const REGEX_LOGIN = /^[a-zA-Z0-9._@-]{3,50}$/;

function mensagemDeErro(erro: Error) {
  if (erro instanceof ApiError) {
    // 400 (formato inválido) e 401 viram a mesma mensagem: não revela o motivo
    if (erro.status === 400 || erro.status === 401) {
      return "Login ou senha incorretos.";
    }
    return erro.message;
  }
  return "Erro inesperado. Tente novamente.";
}

function Login() {
  const { entrar, entrando, erroLogin, ehAdmin } = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tentouEnviar, setTentouEnviar] = useState(false);

  if (ehAdmin) return <Navigate to="/admin" replace />;

  const erroCampoLogin =
    tentouEnviar && !REGEX_LOGIN.test(login) ? "Login inválido" : null;
  const erroCampoSenha =
    tentouEnviar && (senha.length < 8 || senha.length > 128)
      ? "A senha tem pelo menos 8 caracteres"
      : null;

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setTentouEnviar(true);
    if (!REGEX_LOGIN.test(login) || senha.length < 8 || senha.length > 128) {
      return;
    }
    try {
      await entrar(login, senha);
      setSenha("");
      navigate("/admin", { replace: true });
    } catch {
      // erro exibido pelo erroLogin
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={enviar}
        noValidate
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: { xs: 3, sm: 4 },
          bgcolor: CORES.fundoCard,
          backgroundImage: "none",
          border: `1px solid ${CORES.borda}`,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <LockOutlinedIcon sx={{ color: "primary.main", fontSize: 36 }} />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            Área administrativa
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            PLANAR Móveis
          </Typography>
        </Box>

        {erroLogin && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {mensagemDeErro(erroLogin)}
          </Alert>
        )}

        <TextField
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value.trim())}
          error={Boolean(erroCampoLogin)}
          helperText={erroCampoLogin}
          autoComplete="username"
          autoFocus
          fullWidth
          margin="normal"
          slotProps={{ htmlInput: { maxLength: 50 } }}
        />
        <TextField
          label="Senha"
          type={mostrarSenha ? "text" : "password"}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={Boolean(erroCampoSenha)}
          helperText={erroCampoSenha}
          autoComplete="current-password"
          fullWidth
          margin="normal"
          slotProps={{
            htmlInput: { maxLength: 128 },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setMostrarSenha((v) => !v)}
                    aria-label={
                      mostrarSenha ? "esconder senha" : "mostrar senha"
                    }
                    edge="end"
                  >
                    {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={entrando}
          sx={{ mt: 2, py: 1.5, fontWeight: 700, borderRadius: 0 }}
        >
          {entrando ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Link component={RouterLink} to="/" underline="hover" variant="body2">
            ← Voltar para o site
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
