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

import criado_mudo from "./assets/produtos/criado_mudo.jpeg";
import escada from "./assets/produtos/escada.jpeg";
import mesa from "./assets/produtos/mesa.jpeg";
import quadro from "./assets/produtos/quadro.jpeg";
import estante from "./assets/produtos/estante.jpeg";
import mesa_reta from "./assets/produtos/mesa-reta.jpeg";

export interface Produto {
  id: number;
  nome: string;
  legenda: string;
  preco: Number;
}

export interface MajorProps {
  onAdicionarAoCarrinho: (produto: Produto) => void;
}

function Major({ onAdicionarAoCarrinho }: MajorProps) {
  const produtos: Produto[] = [
    {
      id: 1,
      nome: criado_mudo,
      legenda:
        "Criado-mudo de medidas 45cm x 35cm x 55cm, madeira pinus envernizada e estrutura de metalon.",
      preco: 280.0,
    },
    {
      id: 2,
      nome: escada,
      legenda:
        "Escada auxiliar de 2 degraus de medidas 40cm x 40cm x 45cm, madeira pinus envernizada e estrutura de metalon.",
      preco: 190.0,
    },
    {
      id: 3,
      nome: mesa,
      legenda:
        "Mesa de escritório/estudo de medidas 120cm x 60cm x 75cm, madeira pinus envernizada e estrutura de metalon.",
      preco: 580.0,
    },
    {
      id: 4,
      nome: quadro,
      legenda:
        "Moldura de quadro decorativo de medidas 30cm x 30cm, estrutura minimalista em metalon.",
      preco: 95.0,
    },
    {
      id: 5,
      nome: estante,
      legenda:
        "Estante de medidas 90cm x 180cm x 34cm, três planos de madeira maciça de 30mm apoiados em colunas de aço escovado.",
      preco: 1450.0,
    },
    {
      id: 6,
      nome: mesa_reta,
      legenda:
        "Mesa Industrial de medidas 160cm x 78cm x 80cm, tampo maciço sobre base tubular de aço escovado.",
      preco: 1890.0,
    },
  ];
  return (
    <Box sx={{ width: "100%", px: 2, py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "white",
          mb: 3,
          textAlign: "center",
        }}
      >
        Nossos Produtos
      </Typography>

      <Box
        component="section"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            maxWidth: 1800,
            width: "100%",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
          {produtos.map((produto) => (
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
                  bgcolor: "black",
                  color: "white",
                }}
              >
                <CardMedia
                  component="img"
                  image={produto.nome}
                  sx={{
                    height: 280,
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  alt={`Produto ${produto.id}`}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    "&:last-child": { pb: 2 },
                  }}
                >
                  <Typography variant="body2" component="p">
                    {produto.legenda}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                  <IconButton
                    onClick={() => onAdicionarAoCarrinho(produto)}
                    sx={{
                      color: "white",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      "&:hover": {
                        bgcolor: "primary.main",
                      },
                    }}
                    aria-label="adicionar ao carrinho"
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Major;
