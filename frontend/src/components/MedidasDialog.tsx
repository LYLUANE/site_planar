import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import type { Medidas, Produto } from "../types";
import {
  formatarMedidas,
  formatarPreco,
  LIMITES_MEDIDA,
  medidasIguais,
} from "../utils";

const CAMPOS: { chave: keyof Medidas; rotulo: string }[] = [
  { chave: "largura", rotulo: "Largura" },
  { chave: "profundidade", rotulo: "Profundidade" },
  { chave: "altura", rotulo: "Altura" },
];

type Valores = Record<keyof Medidas, string>;

const paraValores = (m: Medidas): Valores => ({
  largura: String(m.largura),
  profundidade: String(m.profundidade),
  altura: String(m.altura),
});

function erroDoCampo(valor: string, chave: keyof Medidas, padrao: Medidas) {
  const n = Number(valor);
  if (!/^\d+$/.test(valor)) return "Use um número inteiro";
  const min = Math.min(LIMITES_MEDIDA[chave].min, padrao[chave]);
  const max = Math.max(LIMITES_MEDIDA[chave].max, padrao[chave]);
  if (n < Math.max(min, 1) || n > max) return `Entre ${min} e ${max} cm`;
  return null;
}

interface MedidasDialogProps {
  produto: Produto | null;
  onClose: () => void;
  onConfirmar: (produto: Produto, medidas: Medidas, quantidade: number) => void;
}

function MedidasDialog({ produto, onClose, onConfirmar }: MedidasDialogProps) {
  return (
    <Dialog
      open={produto !== null}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { sx: { backgroundImage: "none" } } }}
    >
      {produto && (
        <FormularioMedidas
          key={produto.id}
          produto={produto}
          onClose={onClose}
          onConfirmar={onConfirmar}
        />
      )}
    </Dialog>
  );
}

function FormularioMedidas({
  produto,
  onClose,
  onConfirmar,
}: MedidasDialogProps & { produto: Produto }) {
  const [valores, setValores] = useState<Valores>(() =>
    paraValores(produto.medidas),
  );
  const [quantidade, setQuantidade] = useState("1");

  const erros = {
    largura: erroDoCampo(valores.largura, "largura", produto.medidas),
    profundidade: erroDoCampo(
      valores.profundidade,
      "profundidade",
      produto.medidas,
    ),
    altura: erroDoCampo(valores.altura, "altura", produto.medidas),
  };
  const erroQuantidade =
    /^\d+$/.test(quantidade) && +quantidade >= 1 && +quantidade <= 99
      ? null
      : "De 1 a 99";
  const valido = !Object.values(erros).some(Boolean) && !erroQuantidade;

  const medidas: Medidas = {
    largura: Number(valores.largura),
    profundidade: Number(valores.profundidade),
    altura: Number(valores.altura),
  };
  const personalizado = valido && !medidasIguais(medidas, produto.medidas);

  const confirmar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valido) return;
    onConfirmar(produto, medidas, Number(quantidade));
  };

  return (
    <Box component="form" onSubmit={confirmar} noValidate>
      <DialogTitle sx={{ fontWeight: 700, pb: 0.5 }}>
        {produto.nome}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Medidas padrão: {formatarMedidas(produto.medidas)}. Ajuste se precisar
          de outro tamanho — fazemos sob medida.
        </Typography>

        <Stack direction="row" spacing={1.5}>
          {CAMPOS.map(({ chave, rotulo }) => (
            <TextField
              key={chave}
              label={rotulo}
              value={valores[chave]}
              onChange={(e) =>
                setValores((v) => ({
                  ...v,
                  [chave]: e.target.value.replace(/\D/g, "").slice(0, 3),
                }))
              }
              error={Boolean(erros[chave])}
              helperText={erros[chave] ?? "cm"}
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  "aria-label": `${rotulo} em cm`,
                },
              }}
              size="small"
            />
          ))}
        </Stack>

        <Stack
          direction="row"
          sx={{ mt: 1, alignItems: "center", justifyContent: "space-between" }}
        >
          <TextField
            label="Quantidade"
            value={quantidade}
            onChange={(e) =>
              setQuantidade(e.target.value.replace(/\D/g, "").slice(0, 2))
            }
            error={Boolean(erroQuantidade)}
            helperText={erroQuantidade ?? " "}
            slotProps={{ htmlInput: { inputMode: "numeric" } }}
            size="small"
            sx={{ width: 110 }}
          />
          <Button
            size="small"
            startIcon={<RestartAltIcon />}
            onClick={() => setValores(paraValores(produto.medidas))}
            disabled={!personalizado}
            sx={{ mb: 2.5 }}
          >
            Medidas padrão
          </Button>
        </Stack>

        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: 700 }}
        >
          {formatarPreco(produto.precoCentavos * (Number(quantidade) || 1))}
        </Typography>
        {personalizado && (
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Medidas personalizadas: o valor final é confirmado no atendimento.
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" disabled={!valido}>
          Adicionar ao carrinho
        </Button>
      </DialogActions>
    </Box>
  );
}

export default MedidasDialog;
