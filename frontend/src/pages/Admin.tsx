import { useState } from "react";
import { Link as RouterLink } from "react-router";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ProdutoFormDialog from "../components/admin/ProdutoFormDialog";
import { useAuth } from "../hooks/useAuth";
import { useProdutos, useRemoverProduto } from "../hooks/useProdutos";
import { CORES } from "../theme";
import type { Produto } from "../types";
import { formatarMedidas, formatarPreco } from "../utils";

function Admin() {
  const { usuario, sair } = useAuth();
  const { data: produtos, isPending, isError, error } = useProdutos();
  const remover = useRemoverProduto();

  const [formAberto, setFormAberto] = useState(false);
  const [emEdicao, setEmEdicao] = useState<Produto | null>(null);
  const [paraRemover, setParaRemover] = useState<Produto | null>(null);

  const abrirNovo = () => {
    setEmEdicao(null);
    setFormAberto(true);
  };
  const abrirEdicao = (produto: Produto) => {
    setEmEdicao(produto);
    setFormAberto(true);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: CORES.fundoHeader,
          backgroundImage: "none",
          borderBottom: `1px solid ${CORES.borda}`,
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <Typography sx={{ fontWeight: 700, letterSpacing: 3, flexGrow: 1 }}>
            PLANAR{" "}
            <Box component="span" sx={{ opacity: 0.5 }}>
              • admin
            </Box>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: { xs: "none", sm: "block" },
            }}
          >
            {usuario?.login}
          </Typography>
          <Tooltip title="Ver site">
            <IconButton component={RouterLink} to="/" color="inherit">
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sair">
            <IconButton onClick={sair} color="inherit" aria-label="sair">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            gap: 2,
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            Produtos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={abrirNovo}
          >
            Novo produto
          </Button>
        </Box>

        {isError && <Alert severity="error">{error.message}</Alert>}
        {remover.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {remover.error.message}
          </Alert>
        )}

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            bgcolor: CORES.fundoCard,
            backgroundImage: "none",
            border: `1px solid ${CORES.borda}`,
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  Medidas (L × P × A)
                </TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell align="right" sx={{ width: 110 }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isPending &&
                Array.from({ length: 4 }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={4}>
                      <Skeleton height={56} />
                    </TableCell>
                  </TableRow>
                ))}

              {produtos?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                    Nenhum produto cadastrado. Clique em “Novo produto”.
                  </TableCell>
                </TableRow>
              )}

              {produtos?.map((produto) => (
                <TableRow key={produto.id} hover>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar
                        src={produto.imagemUrl}
                        alt=""
                        variant="rounded"
                        sx={{ width: 48, height: 48 }}
                      />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {produto.nome}
                        </Typography>
                        <Typography
                          variant="caption"
                          noWrap
                          component="div"
                          sx={{ color: "text.secondary", maxWidth: 320 }}
                        >
                          {produto.descricao}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {formatarMedidas(produto.medidas)}
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    {formatarPreco(produto.precoCentavos)}
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    <IconButton
                      size="small"
                      onClick={() => abrirEdicao(produto)}
                      aria-label={`editar ${produto.nome}`}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setParaRemover(produto)}
                      aria-label={`remover ${produto.nome}`}
                      sx={{ color: "error.main" }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <ProdutoFormDialog
        aberto={formAberto}
        produto={emEdicao}
        onClose={() => setFormAberto(false)}
      />

      <Dialog
        open={paraRemover !== null}
        onClose={() => setParaRemover(null)}
        slotProps={{ paper: { sx: { backgroundImage: "none" } } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Remover produto?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>{paraRemover?.nome}</strong> será removido do site. Essa
            ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setParaRemover(null)} color="inherit">
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={remover.isPending}
            onClick={() =>
              paraRemover &&
              remover.mutate(paraRemover.id, {
                onSuccess: () => setParaRemover(null),
              })
            }
          >
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Admin;
