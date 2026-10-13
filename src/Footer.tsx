import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Call, LocalPostOffice } from "@mui/icons-material";
import { CORES } from "./theme";
import { EMAIL, TELEFONE } from "./utils";

// Texto escuro sobre o fundo areia: contraste ~8:1 (o branco ficava ~1,9:1)
const COR_TEXTO = CORES.fundo;

const linkSx = { color: COR_TEXTO, fontSize: "0.875rem" };

function Footer() {
  return (
    <Box
      component="footer"
      id="contato"
      sx={{
        bgcolor: CORES.areia,
        color: COR_TEXTO,
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
                mb: 1.5,
                textTransform: "uppercase",
              }}
            >
              PLANAR
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Soluções modernas em móveis com qualidade, elegância e design
              pensado para o seu ambiente.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Navegação
            </Typography>
            <Stack spacing={1}>
              <Link href="#inicio" underline="hover" sx={linkSx}>
                Início
              </Link>
              <Link href="#produtos" underline="hover" sx={linkSx}>
                Produtos
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Atendimento & Contato
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <LocalPostOffice fontSize="small" />
                <Typography variant="body2">Email:</Typography>
                <Link
                  href={`mailto:${EMAIL}`}
                  underline="hover"
                  sx={{ ...linkSx, fontWeight: 600 }}
                >
                  {EMAIL}
                </Link>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Call fontSize="small" />
                <Typography variant="body2">Telefone:</Typography>
                <Link
                  href={`tel:+55${TELEFONE.replace(/\D/g, "")}`}
                  underline="hover"
                  sx={{ ...linkSx, fontWeight: 600 }}
                >
                  {TELEFONE}
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(43, 41, 38, 0.2)" }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption">
            © {new Date().getFullYear()} PLANAR Móveis. Todos os direitos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
