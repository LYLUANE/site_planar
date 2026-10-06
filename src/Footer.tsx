import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Call, LocalPostOffice } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#c8bcac",
        color: "white",
        py: 6,
        px: { xs: 2, sm: 4 },
        width: "100%",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ justifyContent: "space-between" }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 2,
                color: "white",
                mb: 1.5,
                textTransform: "uppercase",
              }}
            >
              PLANAR
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
              Soluções modernas em móveis com qualidade, elegância e design
              pensado para o seu ambiente.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mb: 1.5, color: "white" }}
            >
              Navegação
            </Typography>
            <Stack spacing={1}>
              <Link
                href="#inicio"
                underline="hover"
                sx={{ color: "white", fontSize: "0.875rem", cursor: "pointer" }}
              >
                Início
              </Link>
              <Link
                href="#produtos"
                underline="hover"
                sx={{ color: "white", fontSize: "0.875rem", cursor: "pointer" }}
              >
                Produtos
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mb: 1.5, color: "white" }}
            >
              Atendimento & Contato
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocalPostOffice fontSize="small" sx={{ color: "white" }} />
                <Typography variant="body2">Email:</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: 600 }}
                >
                  planar_moveis@gmail.com
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Call fontSize="small" sx={{ color: "white" }} />
                <Typography variant="body2">Telefone:</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: 600 }}
                >
                  (14) 99665-1162
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(224, 224, 224, 0.2)" }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ opacity: 0.8, color: "white" }}>
            © {new Date().getFullYear()} PLANAR Móveis. Todos os direitos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
