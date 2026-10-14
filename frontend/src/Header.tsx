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
import SeletorIdioma from "./components/SeletorIdioma";
import type { Carrinho } from "./hooks/useCarrinho";
import { useIdioma } from "./i18n";
import ScrollReveal from "./Scroll";
import { CORES } from "./theme";

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
  const { t } = useIdioma();
  const linksMenu = [
    { label: t.header.estrutura, href: "#inicio" },
    { label: t.header.catalogo, href: "#produtos" },
    { label: t.header.contato, href: "#contato" },
  ];

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
              {linksMenu.map(({ label, href }) => (
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

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <SeletorIdioma />
              <IconButton
                color="inherit"
                onClick={onOpenCarrinho}
                aria-label={t.header.carrinhoAria(totalItens)}
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
            </Box>
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
