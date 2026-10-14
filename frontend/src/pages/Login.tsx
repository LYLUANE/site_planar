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
import { ApiError, CREDENCIAIS_DEMO, MODO_DEMO } from "../api/cliente";
import { useAuth } from "../hooks/useAuth";
import SeletorIdioma from "../components/SeletorIdioma";
import { useIdioma } from "../i18n";
import type { Textos } from "../i18n/textos";
import { CORES } from "../theme";

const REGEX_LOGIN = /^[a-zA-Z0-9._@-]{3,50}$/;

function mensagemDeErro(erro: Error, t: Textos) {
  if (erro instanceof ApiError) {
    if (erro.status === 400 || erro.status === 401) {
      return t.login.credenciaisErradas;
    }
    return erro.message;
  }
  return t.login.erroInesperado;
}

function Login() {
  const { entrar, entrando, erroLogin, ehAdmin } = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const { t } = useIdioma();

  if (ehAdmin) return <Navigate to="/admin" replace />;

  const erroCampoLogin =
    tentouEnviar && !REGEX_LOGIN.test(login) ? t.login.loginInvalido : null;
  const erroCampoSenha =
    tentouEnviar && (senha.length < 8 || senha.length > 128)
      ? t.login.senhaCurta
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
      return;
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <SeletorIdioma />
      </Box>
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
            {t.login.titulo}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t.login.subtitulo}
          </Typography>
        </Box>

        {MODO_DEMO && (
          <Alert
            severity="info"
            sx={{ mb: 2 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  setLogin(CREDENCIAIS_DEMO.login);
                  setSenha(CREDENCIAIS_DEMO.senha);
                }}
              >
                {t.login.preencher}
              </Button>
            }
          >
            {t.login.demo} <strong>{CREDENCIAIS_DEMO.login}</strong>,{" "}
            {t.login.demoSenha} <strong>{CREDENCIAIS_DEMO.senha}</strong>
          </Alert>
        )}

        {erroLogin && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {mensagemDeErro(erroLogin, t)}
          </Alert>
        )}

        <TextField
          label={t.login.login}
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
          label={t.login.senha}
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
                      mostrarSenha
                        ? t.login.esconderSenha
                        : t.login.mostrarSenha
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
          {entrando ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t.login.entrar
          )}
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Link component={RouterLink} to="/" underline="hover" variant="body2">
            {t.login.voltar}
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
