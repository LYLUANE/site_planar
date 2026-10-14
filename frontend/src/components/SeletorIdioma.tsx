import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useIdioma, type Idioma } from "../i18n";

function SeletorIdioma() {
  const { idioma, setIdioma, t } = useIdioma();

  return (
    <ToggleButtonGroup
      value={idioma}
      exclusive
      size="small"
      aria-label={t.idioma.rotulo}
      onChange={(_, novo: Idioma | null) => novo && setIdioma(novo)}
      sx={{
        "& .MuiToggleButton-root": {
          px: 1,
          py: 0.25,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: 1,
          borderRadius: 0,
          color: "rgba(255, 255, 255, 0.6)",
          borderColor: "rgba(255, 255, 255, 0.2)",
        },
        "& .MuiToggleButton-root.Mui-selected": {
          color: "primary.contrastText",
          bgcolor: "primary.main",
          "&:hover": { bgcolor: "primary.dark" },
        },
      }}
    >
      <ToggleButton value="pt" lang="pt-BR">
        PT
      </ToggleButton>
      <ToggleButton value="en" lang="en">
        EN
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default SeletorIdioma;
