import { lazy, Suspense } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import GuiaControles from "./components/GuiaControles";
import { useIdioma } from "./i18n";
import ScrollReveal from "./Scroll";

const MODELO_MESA = `${import.meta.env.BASE_URL}models/mesa-reta-holograma.glb`;

const GLBViewer = lazy(() => import("./three"));
const ALTURA_VIEWER = { xs: 260, md: 300 };

const LARGURA_COLUNA = 420;

function Head() {
  const { t } = useIdioma();
  return (
    <Box
      id="inicio"
      sx={{
        bgcolor: "background.default",
        color: "#ffffff",
      }}
    >
      <ScrollReveal direction="down">
        <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 8 }, pb: 4 }}>
          <Grid container spacing={4} sx={{ alignItems: "flex-end" }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "4rem", md: "5.5rem" },
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  color: "#f5f5f7",
                }}
              >
                {t.hero.titulo1}
                <br />
                <Box component="span" sx={{ color: "primary.main" }}>
                  {t.hero.titulo2}
                </Box>
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  maxWidth: LARGURA_COLUNA,
                }}
              >
                {t.hero.texto}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ScrollReveal>

      <Container maxWidth="xl" sx={{ pb: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }} offset={{ md: 7 }}>
            <Box sx={{ maxWidth: LARGURA_COLUNA, mx: { xs: "auto", md: 0 } }}>
              <Suspense fallback={<Box sx={{ height: ALTURA_VIEWER }} />}>
                <GLBViewer url={MODELO_MESA} height={ALTURA_VIEWER} />
              </Suspense>
              <GuiaControles />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Head;
