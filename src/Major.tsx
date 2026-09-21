import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import criado_mudo from "./assets/produtos/criado_mudo.jpeg";
import escada from "./assets/produtos/escada.jpeg";
import mesa from "./assets/produtos/mesa.jpeg";
import quadro from "./assets/produtos/quadro.jpeg";

function Major() {
  interface Produto {
    nome: string;
    legenda: string;
  }

  const produtos: Produto[] = [
    {
      nome: criado_mudo,
      legenda:
        "Criado-mudo de medidas 45cm x 35cm x 55cm, madeira pinus envernizada e estrutura de metalon.",
    },
    {
      nome: escada,
      legenda:
        "Escada auxiliar de 2 degraus de medidas 40cm x 40cm x 45cm, madeira pinus envernizada e estrutura de metalon.",
    },
    {
      nome: mesa,
      legenda:
        "Mesa de escritório/estudo de medidas 120cm x 60cm x 75cm, madeira pinus envernizada e estrutura de metalon.",
    },
    {
      nome: quadro,
      legenda:
        "Moldura de quadro decorativo de medidas 30cm x 30cm, estrutura minimalista em metalon.",
    },
  ];
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        py: { xs: 4, md: 6 },
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        justifyContent="center"
        sx={{
          maxWidth: 900,
          width: "100%",
          margin: "0 auto",
        }}
      >
        {produtos.map((imagem, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={3} sx={{}}>
              <Card sx={{ maxWidth: 400, position: "relative" }}>
                <CardMedia
                  component="img"
                  height="500"
                  image={imagem.nome}
                  alt={`Produto ${index + 1}`}
                  sx={{
                    height: 320,
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
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
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Major;
