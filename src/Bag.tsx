import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";

export interface Produto {
  id: number;
  nome: string;
  legenda: string;
  preco:Number
}

interface CarrinhoProps {
  open: boolean;
  onClose: () => void;
  carrinho: Produto[];
  onRemoverDoCarrinho: (produtoRemover: Produto) => void;
}

function Bag({ open, onClose, carrinho, onRemoverDoCarrinho }: CarrinhoProps) {
  // Estado para armazenar o produto selecionado para exclusão
  const [produtoParaDeletar, setProdutoParaDeletar] = useState<Produto | null>(
    null,
  );

  const handleConfirmarRemocao = () => {
    if (produtoParaDeletar) {
      onRemoverDoCarrinho(produtoParaDeletar);
      setProdutoParaDeletar(null);
    }
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
              width: { xs: "100%", sm: 380 },
              bgcolor: "#121315",
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
          <Typography variant="h6">Seu Carrinho ({carrinho.length})</Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "#333", mb: 2 }} />

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
              {carrinho.map((item, index) => (
                <React.Fragment key={`${item.id}-${index}`}>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="remover"
                        onClick={() => setProdutoParaDeletar(item)}
                        sx={{ color: "#ff5252" }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={item.nome}
                        alt={item.legenda}
                        variant="rounded"
                        sx={{ width: 56, height: 56, mr: 1 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" noWrap>
                          Produto #{item.id}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          sx={{
                            color: "gray",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.legenda}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider sx={{ borderColor: "#2a2a2a", my: 1 }} />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {carrinho.length > 0 && (
          <Box sx={{ pt: 2, borderTop: "1px solid #333" }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#c4a482",
                color: "#000",
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 0,
                "&:hover": {
                  bgcolor: "#b39371",
                },
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
              bgcolor: "#121315",
              color: "white",
              p: 3,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Remover produto?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Tem certeza de que deseja remover este produto do carrinho?
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
