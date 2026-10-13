import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { PRODUTOS } from "./data/produtos";
import type { Produto } from "./types";
import { CORES } from "./theme";
import { formatarPreco } from "./utils";

export interface MajorProps {
  onAdicionarAoCarrinho: (produto: Produto) => void;
}

function Major({ onAdicionarAoCarrinho }: MajorProps) {
  return (
    <Box
      id="produtos"
      component="section"
      sx={{ width: "100%", px: 2, py: { xs: 4, md: 6 } }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: "bold",
          color: "white",
          mb: 3,
          textAlign: "center",
        }}
      >
        Nossos Produtos
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          maxWidth: 1800,
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        {PRODUTOS.map((produto) => (
          <Grid
            key={produto.id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 345,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                bgcolor: CORES.fundoCard,
                backgroundImage: "none",
                color: "white",
              }}
            >
              <CardMedia
                component="img"
                image={produto.imagem}
                alt={produto.nome}
                loading="lazy"
                sx={{
                  height: 280,
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  {produto.nome}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.75)" }}
                >
                  {produto.legenda}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "primary.main", fontWeight: 700 }}
                >
                  {formatarPreco(produto.preco)}
                </Typography>
                <IconButton
                  onClick={() => onAdicionarAoCarrinho(produto)}
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                    },
                  }}
                  aria-label={`adicionar ${produto.nome} ao carrinho`}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Major;
