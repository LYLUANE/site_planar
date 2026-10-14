import { Typography, Box } from "@mui/material";
import { keyframes } from "@mui/system";
import { useIdioma } from "./i18n";
import { CORES } from "./theme";

const mov = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

interface SignboardProps {
  speed?: number;
  pauseOnHover?: boolean;
}

function Signboard({ speed = 25, pauseOnHover = true }: SignboardProps) {
  const { t } = useIdioma();
  const itens = t.letreiro;
  const itensDuplicados = [...itens, ...itens];

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: CORES.fundoFaixa,
        color: CORES.dourado,
        py: 1.5,
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        whiteSpace: "nowrap",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          animation: `${mov} ${speed}s linear infinite`,
          "&:hover": {
            animationPlayState: pauseOnHover ? "paused" : "running",
          },
        }}
      >
        {itensDuplicados.map((text, index) => (
          <Box
            key={`${text}-${index}`}
            aria-hidden={index >= itens.length}
            sx={{
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                letterSpacing: "2px",
                fontWeight: 500,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                px: 3,
              }}
            >
              {text}
            </Typography>
            <Typography
              component="span"
              aria-hidden
              sx={{
                fontSize: "1.2rem",
                opacity: 0.6,
              }}
            >
              •
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Signboard;
