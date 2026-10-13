import { Box, Stack, Typography } from "@mui/material";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import MouseIcon from "@mui/icons-material/Mouse";
import PinchIcon from "@mui/icons-material/Pinch";
import SwipeIcon from "@mui/icons-material/Swipe";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { CORES } from "../theme";

const ehToque =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

const DICAS = ehToque
  ? [
      { Icone: SwipeIcon, acao: "Deslize", efeito: "para girar" },
      { Icone: PinchIcon, acao: "Pinça", efeito: "para ampliar" },
      { Icone: TouchAppIcon, acao: "Toque 2×", efeito: "para centralizar" },
    ]
  : [
      { Icone: ThreeSixtyIcon, acao: "Arraste", efeito: "para girar" },
      { Icone: MouseIcon, acao: "Scroll", efeito: "para ampliar" },
      {
        Icone: CenterFocusStrongIcon,
        acao: "Duplo clique",
        efeito: "para centralizar",
      },
    ];

function GuiaControles() {
  return (
    <Box
      component="aside"
      aria-label="Como manipular a mesa em 3D"
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
        {DICAS.map(({ Icone, acao, efeito }) => (
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
