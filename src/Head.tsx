import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  ImageList,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export interface Produto {
  id: number;
  nome: string;
  legenda: string;
}
interface HeaderProps {
  carrinho: Produto[];
  onOpenCarrinho: () => void;
}

function Head({ carrinho, onOpenCarrinho }: HeaderProps) {
  return (
    <>
      <Box sx={{ bgcolor: "#121315", minHeight: "auto", color: "#ffffff" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ justifyContent: "space-between", py: 1 }}
            >
              <Typography
                variant="body2"
                sx={{ letterSpacing: 3, fontWeight: 700, color: "#e0e0e0" }}
              >
                <Box
                  component="span"
                  sx={{ opacity: 0.5, fontSize: "0.75rem", mr: 0.5 }}
                >
                  PLR •
                </Box>{" "}
                PLANAR
              </Typography>

              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: 2,
                    opacity: 0.8,
                  }}
                >
                  Estrutura
                </Button>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: 2,
                    opacity: 0.8,
                  }}
                >
                  Catálogo
                </Button>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: 2,
                    opacity: 0.8,
                  }}
                >
                  Contato
                </Button>
              </Box>

              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 0,
                  px: 2,
                  py: 0.8,
                  fontSize: "0.75rem",
                  letterSpacing: 2,
                }}
              >
                <IconButton
                  color="inherit"
                  onClick={onOpenCarrinho}
                  aria-label="carrinho de compras"
                >
                  <Badge badgeContent={carrinho.length} color="primary">
                    <ShoppingCartIcon sx={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </Button>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 8 }, pb: 4 }}>
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item={{ xs: 12, md: 7 }}>
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
                <Box component="span" sx={{ color: "#c4a482" }}>
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
                Móveis industriais de aço e madeira. Cada parafuso, cada tubo,
                cada tampo — visíveis. Arraste o controle e veja como a Mesa
                Industrial é construída por dentro.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Box
          sx={{
            width: "auto",
            height: { xs: "400px", md: "550px" },
            bgcolor: "#c8bcac", 
            position: "relative",
            mt: 4,
          }}
        ></Box>
      </Box>
    </>
  );
}
export default Head;
