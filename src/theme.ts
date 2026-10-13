import { createTheme } from "@mui/material/styles";

export const CORES = {
  // Grafite quente: mais suave que o preto, combina com o dourado e o areia
  fundo: "#2b2926",
  fundoHeader: "rgba(43, 41, 38, 0.85)",
  fundoFaixa: "#36332f",
  fundoCard: "#3a3733",
  dourado: "#c4a482",
  douradoEscuro: "#b39371",
  areia: "#c8bcac",
  borda: "#4d4944",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: CORES.dourado,
      dark: CORES.douradoEscuro,
      contrastText: "#000000",
    },
    background: {
      default: CORES.fundo,
      paper: CORES.fundo,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
          // espaço do header fixo, para os links #produtos/#contato não ficarem escondidos
          scrollPaddingTop: 72,
        },
      },
    },
  },
});

export default theme;
