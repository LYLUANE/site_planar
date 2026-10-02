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
        color: "#e0e0e0",
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
                color: "#e0e0e0",
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
              sx={{ fontWeight: 700, mb: 1.5, color: "#e0e0e0" }}
            >
              Navegação
            </Typography>
            <Stack spacing={1}>
              <Link
                href="#inicio"
                underline="hover"
                sx={{ color: "#e0e0e0", fontSize: "0.875rem" }}
              >
                Início
              </Link>
              <Link
                href="#produtos"
                underline="hover"
                sx={{ color: "#e0e0e0", fontSize: "0.875rem" }}
              >
                Produtos
              </Link>
              <Link
                href="#sobre"
                underline="hover"
                sx={{ color: "#e0e0e0", fontSize: "0.875rem" }}
              >
                Sobre Nós
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mb: 1.5, color: "#e0e0e0" }}
            >
              Atendimento & Contato
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocalPostOffice fontSize="small" sx={{ color: "#e0e0e0" }} />
                <Typography variant="body2">Email:</Typography>
                <Link
                  href="mailto:planar_moveis@gmail.com"
                  underline="hover"
                  sx={{ color: "#e0e0e0", fontWeight: 600 }}
                >
                  planar_moveis@gmail.com
                </Link>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Call fontSize="small" sx={{ color: "#e0e0e0" }} />
                <Typography variant="body2">Telefone:</Typography>
                <Link
                  href="tel:14996651162"
                  underline="hover"
                  sx={{ color: "#e0e0e0", fontWeight: 600 }}
                >
                  (14) 99665-1162
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(224, 224, 224, 0.2)" }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} PLANAR Móveis. Todos os direitos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
