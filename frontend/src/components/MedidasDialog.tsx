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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useIdioma } from "../i18n";
import type { Textos } from "../i18n/textos";
import type { Medidas, Produto } from "../types";
import {
  formatarMedidas,
  LIMITES_MEDIDA,
  linkWhatsApp,
  medidasIguais,
} from "../utils";

const CAMPOS: (keyof Medidas)[] = ["largura", "profundidade", "altura"];

type Valores = Record<keyof Medidas, string>;

const paraValores = (m: Medidas): Valores => ({
  largura: String(m.largura),
  profundidade: String(m.profundidade),
  altura: String(m.altura),
});

function erroDoCampo(
  valor: string,
  chave: keyof Medidas,
  padrao: Medidas,
  t: Textos,
) {
  const n = Number(valor);
  if (!/^\d+$/.test(valor)) return t.medidas.numeroInteiro;
  const min = Math.min(LIMITES_MEDIDA[chave].min, padrao[chave]);
  const max = Math.max(LIMITES_MEDIDA[chave].max, padrao[chave]);
  if (n < Math.max(min, 1) || n > max) return t.medidas.entre(min, max);
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
  const { t, textoDoProduto } = useIdioma();
  const { nome } = textoDoProduto(produto);

  const erros = {
    largura: erroDoCampo(valores.largura, "largura", produto.medidas, t),
    profundidade: erroDoCampo(
      valores.profundidade,
      "profundidade",
      produto.medidas,
      t,
    ),
    altura: erroDoCampo(valores.altura, "altura", produto.medidas, t),
  };
  const erroQuantidade =
    /^\d+$/.test(quantidade) && +quantidade >= 1 && +quantidade <= 99
      ? null
      : t.medidas.deUmA99;
  const valido = !Object.values(erros).some(Boolean) && !erroQuantidade;

  const medidas: Medidas = {
    largura: Number(valores.largura),
    profundidade: Number(valores.profundidade),
    altura: Number(valores.altura),
  };
  const personalizado = !medidasIguais(medidas, produto.medidas);

  const confirmar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valido || personalizado) return;
    onConfirmar(produto, medidas, Number(quantidade));
  };

  return (
    <Box component="form" onSubmit={confirmar} noValidate>
      <DialogTitle sx={{ fontWeight: 700, pb: 0.5 }}>{nome}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          {t.medidas.padrao(formatarMedidas(produto.medidas))}
        </Typography>

        <Stack direction="row" spacing={1.5}>
          {CAMPOS.map((chave) => (
            <TextField
              key={chave}
              label={t.medidas[chave]}
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
                  "aria-label": t.medidas.emCm(t.medidas[chave]),
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
            label={t.medidas.quantidade}
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
            {t.medidas.voltarPadrao}
          </Button>
        </Stack>

        {personalizado ? (
          <Typography
            variant="body2"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            {t.medidas.orcamento}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: 700 }}
          >
            {t.preco(produto.precoCentavos * (Number(quantidade) || 1))}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          {t.geral.cancelar}
        </Button>
        {personalizado ? (
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            disabled={!valido}
            href={linkWhatsApp(
              t.whatsapp.orcamento(
                Number(quantidade),
                nome,
                formatarMedidas(medidas),
                formatarMedidas(produto.medidas),
              ),
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            {t.medidas.conversar}
          </Button>
        ) : (
          <Button type="submit" variant="contained" disabled={!valido}>
            {t.medidas.adicionar}
          </Button>
        )}
      </DialogActions>
    </Box>
  );
}

export default MedidasDialog;
