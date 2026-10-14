import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StraightenIcon from "@mui/icons-material/Straighten";
import MedidasDialog from "./components/MedidasDialog";
import { useProdutos } from "./hooks/useProdutos";
import type { Medidas, Produto } from "./types";
import { CORES } from "./theme";
import { useIdioma } from "./i18n";
import { formatarMedidas } from "./utils";

export interface MajorProps {
  onAdicionarAoCarrinho: (
    produto: Produto,
    medidas: Medidas,
    quantidade: number,
  ) => void;
}

const cardSx = {
  width: "100%",
  maxWidth: 345,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  bgcolor: CORES.fundoCard,
  backgroundImage: "none",
  color: "white",
} as const;

const tamanhoGrid = { xs: 12, sm: 6, md: 4, lg: 3 };

function CardCarregando() {
  return (
    <Card sx={cardSx}>
      <Skeleton variant="rectangular" height={280} />
      <CardContent>
        <Skeleton width="60%" height={28} />
        <Skeleton />
        <Skeleton width="80%" />
      </CardContent>
    </Card>
  );
}

function Major({ onAdicionarAoCarrinho }: MajorProps) {
  const { data: produtos, isPending, isError, error, refetch } = useProdutos();
  const { t, textoDoProduto } = useIdioma();
  const [produtoEscolhido, setProdutoEscolhido] = useState<Produto | null>(
    null,
  );

  const conteudo = () => {
    if (isPending) {
      return Array.from({ length: 4 }, (_, i) => (
        <Grid
          key={i}
          size={tamanhoGrid}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CardCarregando />
        </Grid>
      ));
    }

    if (isError) {
      return (
        <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => refetch()}>
                {t.geral.tentarDeNovo}
              </Button>
            }
          >
            {t.produtos.erroCarregar} {error.message}
          </Alert>
        </Grid>
      );
    }

    if (produtos.length === 0) {
      return (
        <Typography sx={{ color: CORES.fundo }}>{t.produtos.vazio}</Typography>
      );
    }

    return produtos.map((produto) => {
      const { nome, descricao } = textoDoProduto(produto);
      return (
        <Grid
          key={produto.id}
          size={tamanhoGrid}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card sx={cardSx}>
            <CardMedia
              component="img"
              image={produto.imagemUrl}
              alt={nome}
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
                {nome}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.75)", mb: 1.5 }}
              >
                {descricao}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                <StraightenIcon fontSize="inherit" />
                {formatarMedidas(produto.medidas)} {t.produtos.eixos}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
              <Typography
                variant="h6"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                {t.preco(produto.precoCentavos)}
              </Typography>
              <IconButton
                onClick={() => setProdutoEscolhido(produto)}
                sx={{
                  color: "white",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
                aria-label={t.produtos.adicionarAria(nome)}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <Box
      id="produtos"
      component="section"
      sx={{ width: "100%", px: 2, py: { xs: 4, md: 6 }, bgcolor: CORES.areia }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: "bold",
          color: CORES.fundo,
          mb: 3,
          textAlign: "center",
        }}
      >
        {t.produtos.titulo}
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
        {conteudo()}
      </Grid>

      <MedidasDialog
        produto={produtoEscolhido}
        onClose={() => setProdutoEscolhido(null)}
        onConfirmar={(produto, medidas, quantidade) => {
          onAdicionarAoCarrinho(produto, medidas, quantidade);
          setProdutoEscolhido(null);
        }}
      />
    </Box>
  );
}

export default Major;
