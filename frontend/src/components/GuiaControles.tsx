import { Box, Stack, Typography } from "@mui/material";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import MouseIcon from "@mui/icons-material/Mouse";
import PinchIcon from "@mui/icons-material/Pinch";
import SwipeIcon from "@mui/icons-material/Swipe";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { useIdioma } from "../i18n";
import { CORES } from "../theme";

const ehToque =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

const ICONES = ehToque
  ? [SwipeIcon, PinchIcon, TouchAppIcon]
  : [ThreeSixtyIcon, MouseIcon, CenterFocusStrongIcon];

function GuiaControles() {
  const { t } = useIdioma();
  const dicas = (ehToque ? t.guia.toque : t.guia.mouse).map((dica, i) => ({
    ...dica,
    Icone: ICONES[i],
  }));

  return (
    <Box
      component="aside"
      aria-label={t.guia.aria}
      sx={{
        border: `1px solid ${CORES.borda}`,
        bgcolor: CORES.fundoFaixa,
        px: 2,
        py: 1.25,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1.5,
        }}
      >
        {dicas.map(({ Icone, acao, efeito }) => (
          <Stack
            key={acao}
            direction={{ xs: "column", sm: "row" }}
            sx={{
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Icone sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography
              variant="caption"
              sx={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.3 }}
            >
              <Box component="strong" sx={{ color: CORES.areia }}>
                {acao}
              </Box>
              <br />
              {efeito}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}

export default GuiaControles;
