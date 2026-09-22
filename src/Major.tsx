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
import criado_mudo from "./assets/produtos/criado_mudo.jpeg";
import escada from "./assets/produtos/escada.jpeg";
import mesa from "./assets/produtos/mesa.jpeg";
import quadro from "./assets/produtos/quadro.jpeg";
import estante from "./assets/produtos/estante.jpeg";
import mesa_reta from "./assets/produtos/mesa-reta.jpeg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
interface Produto {
  id: number;
  nome: string;
  legenda: string;
}
interface MajorProps {
  onAdicionarAoCarrinho: (produto: Produto) => void;
}

function Major({ onAdicionarAoCarrinho }: MajorProps) {
  const produtos: Produto[] = [
    {
      id: 1,
      nome: criado_mudo,
      legenda:
        "Criado-mudo de medidas 45cm x 35cm x 55cm, madeira pinus envernizada e estrutura de metalon.",
    },
    {
      id: 2,
      nome: escada,
      legenda:
        "Escada auxiliar de 2 degraus de medidas 40cm x 40cm x 45cm, madeira pinus envernizada e estrutura de metalon.",
    },
    {
      id: 3,
      nome: mesa,
      legenda:
        "Mesa de escritório/estudo de medidas 120cm x 60cm x 75cm, madeira pinus envernizada e estrutura de metalon.",
    },
    {
      id: 4,
      nome: quadro,
      legenda:
        "Moldura de quadro decorativo de medidas 30cm x 30cm, estrutura minimalista em metalon.",
    },
    {
      id: 5,
      nome: estante,
      legenda:
        "Estante de medidas 90cm x 180cm x 34cm, três planos de madeira maciça de 30mm apoiados em colunas de aço escovado.",
    },
    {
      id: 6,
      nome: mesa_reta,
      legenda:
        "Mesa Industrial de medidas 160cm x 78cm x 80cm, tampo maciço sobre base tubular de aço escovado.",
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
          justifyContent="center"
          sx={{
            maxWidth: 1200,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {produtos.map((imagem, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
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
                  image={imagem.nome}
                  sx={{
                    height: 280,
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  alt={`Produto ${imagem.id}`}
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
                    {imagem.legenda}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                  <IconButton
                    onClick={() => onAdicionarAoCarrinho(imagem)}
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
