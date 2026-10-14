import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Call, LocalPostOffice } from "@mui/icons-material";
import { Link as RouterLink } from "react-router";
import { CORES } from "./theme";
import { useIdioma } from "./i18n";
import { EMAIL, TELEFONE } from "./utils";

const COR_TEXTO = CORES.fundo;

const linkSx = { color: COR_TEXTO, fontSize: "0.875rem" };

function Footer() {
  const { t } = useIdioma();
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
              {t.rodape.slogan}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              {t.rodape.navegacao}
            </Typography>
            <Stack spacing={1}>
              <Link href="#inicio" underline="hover" sx={linkSx}>
                {t.rodape.inicio}
              </Link>
              <Link href="#produtos" underline="hover" sx={linkSx}>
                {t.rodape.produtos}
              </Link>
              <Link
                component={RouterLink}
                to="/login"
                underline="hover"
                sx={{ ...linkSx, opacity: 0.7 }}
              >
                {t.rodape.admin}
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              {t.rodape.contato}
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <LocalPostOffice fontSize="small" />
                <Typography variant="body2">{t.rodape.email}</Typography>
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
                <Typography variant="body2">{t.rodape.telefone}</Typography>
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
            {t.rodape.direitos(new Date().getFullYear())}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
