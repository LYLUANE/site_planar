import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Bag from "./Bag";
import type { Produto } from "./Major";
import ScrollReveal from "./Scroll";
import GLBViewer from "./three";

interface HeadProps {
  carrinho: Produto[];
  carrinhoAberto: boolean;
  onOpenCarrinho: () => void;
  onCloseCarrinho: () => void;
  onRemoverDoCarrinho: (produto: Produto) => void;
}

function Head({
  carrinho,
  carrinhoAberto,
  onOpenCarrinho,
  onCloseCarrinho,
  onRemoverDoCarrinho,
}: HeadProps) {
  return (
    <Box
      id="inicio"
      sx={{
        bgcolor: "#121315",
        minHeight: "auto",
        color: "#ffffff",
      }}
    >
      <ScrollReveal direction="up">
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
                {/* Direciona para a animação da mesa (Início) */}
                <Button
                  component="a"
                  href="#inicio"
                  color="inherit"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: 2,
                    opacity: 0.8,
                    textDecoration: "none",
                  }}
                >
                  Estrutura
                </Button>
                {/* Direciona para o catálogo de produtos */}
                <Button
                  component="a"
                  href="#produtos"
                  color="inherit"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: 2,
                    opacity: 0.8,
                    textDecoration: "none",
                  }}
                >
                  Catálogo
                </Button>
                {/* Direciona para o Footer (Contato) */}
                <Button
                  component="a"
                  href="#contato"
                  color="inherit"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: 2,
                    opacity: 0.8,
                    textDecoration: "none",
                  }}
                >
                  Contato
                </Button>
              </Box>

              <Box>
                <IconButton
                  color="inherit"
                  onClick={onOpenCarrinho}
                  aria-label="carrinho de compras"
                  sx={{
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 0,
                    p: 1,
                  }}
                >
                  <Badge badgeContent={carrinho.length} color="primary">
                    <ShoppingCartIcon sx={{ color: "white" }} />
                  </Badge>
                </IconButton>

                <Bag
                  carrinho={carrinho}
                  open={carrinhoAberto}
                  onClose={onCloseCarrinho}
                  onRemoverDoCarrinho={onRemoverDoCarrinho}
                />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ScrollReveal>
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
                Móveis Industriais de aço e madeira. Cada parafuso, cada tubo,
                cada tampo — visíveis. Arraste o controle e veja como a Mesa
                Industrial é feita. Use o scroll para ampliar o holograma!
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ScrollReveal>

      <GLBViewer url="src/assets/produtos/mesa-reta-holograma.glb" />
    </Box>
  );
}

export default Head;
