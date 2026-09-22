import React from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";

export interface Produto {
  id: number;
  nome: string;
  legenda: string;
}

interface CarrinhoProps {
  open: boolean;
  onClose: () => void;
  carrinho: Produto[];
  onRemoverDoCarrinho: (indexRemover: number) => void;
}

function Bag({ open, onClose, carrinho, onRemoverDoCarrinho }: CarrinhoProps) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
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
          <List>
            {carrinho.map((item, index) => (
              <React.Fragment key={`${item.id}-${index}`}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="remover"
                      onClick={() => onRemoverDoCarrinho(index)}
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

      {/* Rodapé do Carrinho */}
      {carrinho.length > 0 && (
        <Box sx={{ pt: 2, borderTop: "1px solid #333" }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "primary.main",
              py: 1.5,
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Finalizar Pedido
          </Button>
        </Box>
      )}
    </Drawer>
  );
}

export default Bag;
