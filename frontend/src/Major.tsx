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
import { formatarMedidas, formatarPreco } from "./utils";

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
                Tentar de novo
              </Button>
            }
          >
            Não foi possível carregar os produtos. {error.message}
          </Alert>
        </Grid>
      );
    }

    if (produtos.length === 0) {
      return (
        <Typography sx={{ color: CORES.fundo }}>
          Nenhum produto cadastrado ainda.
        </Typography>
      );
    }

    return produtos.map((produto) => (
      <Grid
        key={produto.id}
        size={tamanhoGrid}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Card sx={cardSx}>
          <CardMedia
            component="img"
            image={produto.imagemUrl}
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
              sx={{ color: "rgba(255, 255, 255, 0.75)", mb: 1.5 }}
            >
              {produto.descricao}
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
              {formatarMedidas(produto.medidas)} (L × P × A)
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
            <Typography
              variant="h6"
              sx={{ color: "primary.main", fontWeight: 700 }}
            >
              {formatarPreco(produto.precoCentavos)}
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
              aria-label={`adicionar ${produto.nome} ao carrinho`}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    ));
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
