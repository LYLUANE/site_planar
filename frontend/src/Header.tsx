import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Bag from "./Bag";
import type { Carrinho } from "./hooks/useCarrinho";
import ScrollReveal from "./Scroll";
import { CORES } from "./theme";

const LINKS_MENU = [
  { label: "Estrutura", href: "#inicio" },
  { label: "Catálogo", href: "#produtos" },
  { label: "Contato", href: "#contato" },
];

interface HeaderProps {
  carrinho: Carrinho;
  carrinhoAberto: boolean;
  onOpenCarrinho: () => void;
  onCloseCarrinho: () => void;
}

function Header({
  carrinho,
  carrinhoAberto,
  onOpenCarrinho,
  onCloseCarrinho,
}: HeaderProps) {
  const { totalItens } = carrinho;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        bgcolor: CORES.fundoHeader,
        backdropFilter: "blur(8px)",
        backgroundImage: "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <ScrollReveal direction="up">
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

            <Box
              component="nav"
              sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}
            >
              {LINKS_MENU.map(({ label, href }) => (
                <Button
                  key={href}
                  component="a"
                  href={href}
                  color="inherit"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: 2,
                    opacity: 0.8,
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>

            <IconButton
              color="inherit"
              onClick={onOpenCarrinho}
              aria-label={`carrinho de compras, ${totalItens} itens`}
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 0,
                p: 1,
              }}
            >
              <Badge badgeContent={totalItens} color="primary">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </ScrollReveal>

      <Bag
        carrinho={carrinho}
        open={carrinhoAberto}
        onClose={onCloseCarrinho}
      />
    </AppBar>
  );
}

export default Header;
