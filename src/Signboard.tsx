import React from "react";
import { Typography, Box } from "@mui/material";
import { keyframes } from "@mui/system";

const mov = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const ITEMS: string[] = [
  "SAPATAS NIVELADORAS",
  "FEITO SOB MEDIDA",
  "ENTREGA PARA TODO O BRASIL",
  "AÇO ESCOVADO",
  "MADEIRA MACIÇA",
  "PARAFUSOS OCULTOS",
];

interface MovBannerProps {
  Speed?: number;
  PauseOnHover?: boolean;
}

export const Signboard: React.FC<MovBannerProps> = ({
  Speed = 25,
  PauseOnHover = true,
}) => {
  const doubleItems = [...ITEMS, ...ITEMS];

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#121212",
        color: "#c4a482",
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
          animation: `${mov} ${Speed}s linear infinite`,
          "&:hover": {
            animationPlayState: PauseOnHover ? "paused" : "running",
          },
        }}
      >
        {doubleItems.map((text, index) => (
          <Box
            key={`${text}-${index}`}
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
};

export default Signboard;
