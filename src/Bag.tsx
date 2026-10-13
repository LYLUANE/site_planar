import { Fragment, useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import type { ItemCarrinho, Produto } from "./types";
import { CORES } from "./theme";
import { calcularTotal, formatarPreco, linkPedidoWhatsApp } from "./utils";

interface CarrinhoProps {
  open: boolean;
  onClose: () => void;
  carrinho: ItemCarrinho[];
  onAlterarQuantidade: (produto: Produto, quantidade: number) => void;
  onRemoverDoCarrinho: (produto: Produto) => void;
}

function Bag({
  open,
  onClose,
  carrinho,
  onAlterarQuantidade,
  onRemoverDoCarrinho,
}: CarrinhoProps) {
  const [produtoParaDeletar, setProdutoParaDeletar] = useState<Produto | null>(
    null,
  );

  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  const handleConfirmarRemocao = () => {
    if (produtoParaDeletar) {
      onRemoverDoCarrinho(produtoParaDeletar);
      setProdutoParaDeletar(null);
    }
  };

  const diminuir = ({ produto, quantidade }: ItemCarrinho) => {
    // Chegar a zero pelo "−" também pede confirmação
    if (quantidade <= 1) setProdutoParaDeletar(produto);
    else onAlterarQuantidade(produto, quantidade - 1);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", sm: 400 },
              bgcolor: "background.default",
              backgroundImage: "none",
              color: "white",
              p: 3,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
          }}
        >
          <Typography variant="h6">Seu Carrinho ({totalItens})</Typography>
          <IconButton
            onClick={onClose}
            aria-label="fechar carrinho"
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: CORES.borda, mb: 2 }} />

        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {carrinho.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", mt: 4, color: "gray" }}
            >
              Seu carrinho está vazio.
            </Typography>
          ) : (
            <List disablePadding>
              {carrinho.map((item) => {
                const { produto, quantidade } = item;
                return (
                  <Fragment key={produto.id}>
                    <ListItem
                      disableGutters
                      alignItems="flex-start"
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label={`remover ${produto.nome}`}
                          onClick={() => setProdutoParaDeletar(produto)}
                          sx={{ color: "#ff5252" }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={produto.imagem}
                          alt={produto.nome}
                          variant="rounded"
                          sx={{ width: 56, height: 56, mr: 1 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography variant="subtitle2" noWrap>
                            {produto.nome}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="caption"
                              component="div"
                              sx={{ color: "primary.main" }}
                            >
                              {formatarPreco(produto.preco)}
                            </Typography>
                            <Stack
                              direction="row"
                              sx={{ alignItems: "center", mt: 0.5 }}
                            >
                              <IconButton
                                size="small"
                                aria-label={`diminuir quantidade de ${produto.nome}`}
                                onClick={() => diminuir(item)}
                                sx={{ color: "white" }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography
                                variant="body2"
                                aria-live="polite"
                                sx={{ minWidth: 24, textAlign: "center" }}
                              >
                                {quantidade}
                              </Typography>
                              <IconButton
                                size="small"
                                aria-label={`aumentar quantidade de ${produto.nome}`}
                                onClick={() =>
                                  onAlterarQuantidade(produto, quantidade + 1)
                                }
                                sx={{ color: "white" }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider sx={{ borderColor: CORES.borda, my: 1 }} />
                  </Fragment>
                );
              })}
            </List>
          )}
        </Box>

        {carrinho.length > 0 && (
          <Box sx={{ pt: 2, borderTop: `1px solid ${CORES.borda}` }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1">Total</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {formatarPreco(calcularTotal(carrinho))}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              startIcon={<WhatsAppIcon />}
              href={linkPedidoWhatsApp(carrinho)}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 0,
              }}
            >
              Finalizar Pedido
            </Button>
          </Box>
        )}
      </Drawer>

      {/* Modal/Pop-up de Confirmação */}
      <Dialog
        open={Boolean(produtoParaDeletar)}
        onClose={() => setProdutoParaDeletar(null)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", sm: 380 },
              bgcolor: "background.default",
              backgroundImage: "none",
              color: "white",
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Remover produto?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Tem certeza de que deseja remover{" "}
            <strong>{produtoParaDeletar?.nome}</strong> do carrinho?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setProdutoParaDeletar(null)}
            sx={{ color: "white", opacity: 0.8 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmarRemocao}
            variant="contained"
            color="error"
            autoFocus
          >
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Bag;
