import { lazy, Suspense } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import ScrollReveal from "./Scroll";

const MODELO_MESA = `${import.meta.env.BASE_URL}models/mesa-reta-holograma.glb`;

// three.js é pesado: fica num chunk separado para o resto da página aparecer antes
const GLBViewer = lazy(() => import("./three"));
const ALTURA_VIEWER = { xs: 360, md: 500 };

function Head() {
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
                Honestidade
                <br />
                <Box component="span" sx={{ color: "primary.main" }}>
                  estrutural.
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
                  maxWidth: "420px",
                }}
              >
                Móveis Industriais de aço e madeira. Cada parafuso, cada tubo,
                cada tampo — visíveis. Arraste para girar a Mesa Industrial e
                veja como ela é feita. Use o scroll para ampliar o holograma!
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ScrollReveal>

      <Suspense fallback={<Box sx={{ height: ALTURA_VIEWER }} />}>
        <GLBViewer url={MODELO_MESA} height={ALTURA_VIEWER} />
      </Suspense>
    </Box>
  );
}

export default Head;
