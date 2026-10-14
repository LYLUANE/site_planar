import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useSalvarProduto } from "../../hooks/useProdutos";
import { useIdioma } from "../../i18n";
import type { Textos } from "../../i18n/textos";
import type { Medidas, Produto } from "../../types";
import { reaisParaCentavos } from "../../utils";

const MEDIDA_MAX = 500;
const TAMANHO_MAX_FOTO = 2 * 1024 * 1024;
const TIPOS_FOTO = ["image/jpeg", "image/png", "image/webp"];

interface Valores {
  nome: string;
  descricao: string;
  preco: string;
  largura: string;
  profundidade: string;
  altura: string;
}

const VAZIO: Valores = {
  nome: "",
  descricao: "",
  preco: "",
  largura: "",
  profundidade: "",
  altura: "",
};

const deProduto = (p: Produto, separadorDecimal: string): Valores => ({
  nome: p.nome,
  descricao: p.descricao,
  preco: (p.precoCentavos / 100).toFixed(2).replace(".", separadorDecimal),
  largura: String(p.medidas.largura),
  profundidade: String(p.medidas.profundidade),
  altura: String(p.medidas.altura),
});

const CAMPOS_MEDIDA: (keyof Medidas)[] = ["largura", "profundidade", "altura"];

function validar(v: Valores, temFoto: boolean, t: Textos) {
  const erros: Partial<Record<keyof Valores | "foto", string>> = {};
  const nome = v.nome.trim();
  const descricao = v.descricao.trim();
  if (nome.length < 2 || nome.length > 80) erros.nome = t.formulario.erroNome;
  if (descricao.length < 5 || descricao.length > 500) {
    erros.descricao = t.formulario.erroDescricao;
  }
  const centavos = reaisParaCentavos(v.preco);
  if (centavos === null || centavos < 1 || centavos > 100_000_000) {
    erros.preco = t.formulario.erroPreco;
  }
  for (const chave of CAMPOS_MEDIDA) {
    const n = Number(v[chave]);
    if (!/^\d+$/.test(v[chave]) || n < 1 || n > MEDIDA_MAX) {
      erros[chave] = t.formulario.erroMedida(MEDIDA_MAX);
    }
  }
  if (!temFoto) erros.foto = t.formulario.erroFoto;
  return erros;
}

interface ProdutoFormDialogProps {
  aberto: boolean;
  produto: Produto | null;
  onClose: () => void;
}

function ProdutoFormDialog({
  aberto,
  produto,
  onClose,
}: ProdutoFormDialogProps) {
  return (
    <Dialog
      open={aberto}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: { backgroundImage: "none" } } }}
    >
      {aberto && (
        <Formulario
          key={produto?.id ?? "novo"}
          produto={produto}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
}

function Formulario({
  produto,
  onClose,
}: Omit<ProdutoFormDialogProps, "aberto">) {
  const salvar = useSalvarProduto();
  const { t } = useIdioma();
  const [valores, setValores] = useState<Valores>(() =>
    produto ? deProduto(produto, t.separadorDecimal) : VAZIO,
  );
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [erroArquivo, setErroArquivo] = useState<string | null>(null);
  const [previa, setPrevia] = useState<string | null>(
    produto?.imagemUrl ?? null,
  );
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const erros = validar(valores, Boolean(arquivo || produto), t);
  const mostrar = (campo: keyof typeof erros) =>
    tentouEnviar ? erros[campo] : undefined;

  const alterar =
    (campo: keyof Valores, filtro?: (texto: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValores((v) => ({
        ...v,
        [campo]: filtro ? filtro(e.target.value) : e.target.value,
      }));

  const escolherFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const escolhido = e.target.files?.[0];
    e.target.value = "";
    if (!escolhido) return;
    if (!TIPOS_FOTO.includes(escolhido.type)) {
      setErroArquivo(t.formulario.erroTipoFoto);
      return;
    }
    if (escolhido.size > TAMANHO_MAX_FOTO) {
      setErroArquivo(t.formulario.erroTamanhoFoto);
      return;
    }
    setErroArquivo(null);
    setArquivo(escolhido);
    const leitor = new FileReader();
    leitor.onload = () => setPrevia(leitor.result as string);
    leitor.readAsDataURL(escolhido);
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentouEnviar(true);
    if (Object.keys(erros).length > 0) return;

    salvar.mutate(
      {
        id: produto?.id,
        arquivo,
        dados: {
          nome: valores.nome.trim(),
          descricao: valores.descricao.trim(),
          precoCentavos: reaisParaCentavos(valores.preco)!,
          largura: Number(valores.largura),
          profundidade: Number(valores.profundidade),
          altura: Number(valores.altura),
          imagem: produto?.imagem,
        },
      },
      { onSuccess: onClose },
    );
  };

  return (
    <Box component="form" onSubmit={enviar} noValidate>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {produto ? t.formulario.editar : t.formulario.novo}
      </DialogTitle>
      <DialogContent>
        {salvar.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {salvar.error.message}
          </Alert>
        )}

        <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 1 }}>
          <Avatar
            src={previa ?? undefined}
            variant="rounded"
            sx={{ width: 96, height: 96 }}
          >
            <PhotoCameraIcon />
          </Avatar>
          <Box>
            <Button component="label" variant="outlined" size="small">
              {previa ? t.formulario.trocarFoto : t.formulario.escolherFoto}
              <input
                type="file"
                hidden
                accept={TIPOS_FOTO.join(",")}
                onChange={escolherFoto}
              />
            </Button>
            <Typography
              variant="caption"
              component="div"
              sx={{
                mt: 0.5,
                color:
                  erroArquivo || mostrar("foto")
                    ? "error.main"
                    : "text.secondary",
              }}
            >
              {erroArquivo ?? mostrar("foto") ?? t.formulario.ajudaFoto}
            </Typography>
          </Box>
        </Stack>

        <TextField
          label={t.formulario.nome}
          value={valores.nome}
          onChange={alterar("nome")}
          error={Boolean(mostrar("nome"))}
          helperText={mostrar("nome")}
          fullWidth
          margin="dense"
          slotProps={{ htmlInput: { maxLength: 80 } }}
        />
        <TextField
          label={t.formulario.descricao}
          value={valores.descricao}
          onChange={alterar("descricao")}
          error={Boolean(mostrar("descricao"))}
          helperText={mostrar("descricao") ?? `${valores.descricao.length}/500`}
          fullWidth
          multiline
          minRows={2}
          margin="dense"
          slotProps={{ htmlInput: { maxLength: 500 } }}
        />
        <TextField
          label={t.formulario.preco}
          value={valores.preco}
          onChange={alterar("preco", (texto) => texto.replace(/[^\d.,]/g, ""))}
          error={Boolean(mostrar("preco"))}
          helperText={mostrar("preco")}
          margin="dense"
          slotProps={{
            htmlInput: { inputMode: "decimal", maxLength: 15 },
            input: {
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            },
          }}
        />

        <Typography variant="subtitle2" sx={{ mt: 2, mb: 0.5 }}>
          {t.formulario.medidasPadrao}
        </Typography>
        <Stack direction="row" spacing={1.5}>
          {CAMPOS_MEDIDA.map((chave) => (
            <TextField
              key={chave}
              label={t.medidas[chave]}
              value={valores[chave]}
              onChange={alterar(chave, (t) => t.replace(/\D/g, "").slice(0, 3))}
              error={Boolean(mostrar(chave))}
              helperText={mostrar(chave)}
              size="small"
              slotProps={{ htmlInput: { inputMode: "numeric" } }}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={salvar.isPending}>
          {t.geral.cancelar}
        </Button>
        <Button type="submit" variant="contained" disabled={salvar.isPending}>
          {salvar.isPending ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            t.geral.salvar
          )}
        </Button>
      </DialogActions>
    </Box>
  );
}

export default ProdutoFormDialog;
