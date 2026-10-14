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
import type { Carrinho } from "./hooks/useCarrinho";
import { useIdioma } from "./i18n";
import type { ItemCarrinho } from "./types";
import { CORES } from "./theme";
import {
  calcularTotal,
  formatarMedidas,
  linkWhatsApp,
  medidasIguais,
} from "./utils";

interface CarrinhoProps {
  open: boolean;
  onClose: () => void;
  carrinho: Carrinho;
}

function Bag({ open, onClose, carrinho: carrinhoHook }: CarrinhoProps) {
  const {
    itens: carrinho,
    totalItens,
    alterarQuantidade,
    remover,
  } = carrinhoHook;
  const [itemParaDeletar, setItemParaDeletar] = useState<ItemCarrinho | null>(
    null,
  );
  const { t, textoDoProduto } = useIdioma();

  const mensagemPedido = () =>
    t.whatsapp.pedido(
      carrinho.map(({ produto, medidas, quantidade }) =>
        t.whatsapp.linha({
          quantidade,
          nome: textoDoProduto(produto).nome,
          medidas: formatarMedidas(medidas),
          personalizado: !medidasIguais(medidas, produto.medidas),
          subtotal: t.preco(produto.precoCentavos * quantidade),
        }),
      ),
      t.preco(calcularTotal(carrinho)),
      carrinho.some(
        (item) => !medidasIguais(item.medidas, item.produto.medidas),
      ),
    );

  const handleConfirmarRemocao = () => {
    if (itemParaDeletar) {
      remover(itemParaDeletar.chave);
      setItemParaDeletar(null);
    }
  };

  const diminuir = (item: ItemCarrinho) => {
    if (item.quantidade <= 1) setItemParaDeletar(item);
    else alterarQuantidade(item.chave, item.quantidade - 1);
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
          <Typography variant="h6">{t.carrinho.titulo(totalItens)}</Typography>
          <IconButton
            onClick={onClose}
            aria-label={t.carrinho.fecharAria}
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
              {t.carrinho.vazio}
            </Typography>
          ) : (
            <List disablePadding>
              {carrinho.map((item) => {
                const { produto, medidas, quantidade } = item;
                const personalizado = !medidasIguais(medidas, produto.medidas);
                const { nome } = textoDoProduto(produto);
                return (
                  <Fragment key={item.chave}>
                    <ListItem
                      disableGutters
                      alignItems="flex-start"
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label={t.carrinho.removerAria(nome)}
                          onClick={() => setItemParaDeletar(item)}
                          sx={{ color: "#ff5252" }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={produto.imagemUrl}
                          alt={nome}
                          variant="rounded"
                          sx={{ width: 56, height: 56, mr: 1 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography variant="subtitle2" noWrap>
                            {nome}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="caption"
                              component="div"
                              sx={{ color: "text.secondary" }}
                            >
                              {formatarMedidas(medidas)}
                              {personalizado && (
                                <Box
                                  component="span"
                                  sx={{ color: "primary.main", ml: 0.5 }}
                                >
                                  {t.carrinho.personalizado}
                                </Box>
                              )}
                            </Typography>
                            <Typography
                              variant="caption"
                              component="div"
                              sx={{ color: "primary.main" }}
                            >
                              {t.preco(produto.precoCentavos)}
                            </Typography>
                            <Stack
                              direction="row"
                              sx={{ alignItems: "center", mt: 0.5 }}
                            >
                              <IconButton
                                size="small"
                                aria-label={t.carrinho.diminuirAria(nome)}
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
                                aria-label={t.carrinho.aumentarAria(nome)}
                                onClick={() =>
                                  alterarQuantidade(item.chave, quantidade + 1)
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
              <Typography variant="subtitle1">{t.carrinho.total}</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t.preco(calcularTotal(carrinho))}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              startIcon={<WhatsAppIcon />}
              href={linkWhatsApp(mensagemPedido())}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 0,
              }}
            >
              {t.carrinho.finalizar}
            </Button>
          </Box>
        )}
      </Drawer>

      <Dialog
        open={Boolean(itemParaDeletar)}
        onClose={() => setItemParaDeletar(null)}
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
        <DialogTitle sx={{ fontWeight: 700 }}>
          {t.carrinho.removerTitulo}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            {t.carrinho.removerAntes}{" "}
            <strong>
              {itemParaDeletar && textoDoProduto(itemParaDeletar.produto).nome}
            </strong>{" "}
            {t.carrinho.removerDepois}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setItemParaDeletar(null)}
            sx={{ color: "white", opacity: 0.8 }}
          >
            {t.geral.cancelar}
          </Button>
          <Button
            onClick={handleConfirmarRemocao}
            variant="contained"
            color="error"
            autoFocus
          >
            {t.geral.remover}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Bag;
