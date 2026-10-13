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
import type { Medidas, Produto } from "../../types";
import { reaisParaCentavos } from "../../utils";

// Mesmos limites do backend (o backend valida de novo de qualquer forma)
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

const deProduto = (p: Produto): Valores => ({
  nome: p.nome,
  descricao: p.descricao,
  preco: (p.precoCentavos / 100).toFixed(2).replace(".", ","),
  largura: String(p.medidas.largura),
  profundidade: String(p.medidas.profundidade),
  altura: String(p.medidas.altura),
});

const CAMPOS_MEDIDA: { chave: keyof Medidas; rotulo: string }[] = [
  { chave: "largura", rotulo: "Largura" },
  { chave: "profundidade", rotulo: "Profundidade" },
  { chave: "altura", rotulo: "Altura" },
];

function validar(v: Valores, temFoto: boolean) {
  const erros: Partial<Record<keyof Valores | "foto", string>> = {};
  const nome = v.nome.trim();
  const descricao = v.descricao.trim();
  if (nome.length < 2 || nome.length > 80) erros.nome = "De 2 a 80 caracteres";
  if (descricao.length < 5 || descricao.length > 500) {
    erros.descricao = "De 5 a 500 caracteres";
  }
  const centavos = reaisParaCentavos(v.preco);
  if (centavos === null || centavos < 1 || centavos > 100_000_000) {
    erros.preco = "Ex.: 1.890,00";
  }
  for (const { chave } of CAMPOS_MEDIDA) {
    const n = Number(v[chave]);
    if (!/^\d+$/.test(v[chave]) || n < 1 || n > MEDIDA_MAX) {
      erros[chave] = `1 a ${MEDIDA_MAX}`;
    }
  }
  if (!temFoto) erros.foto = "Escolha uma foto";
  return erros;
}

interface ProdutoFormDialogProps {
  aberto: boolean;
  /** Produto em edição; null = novo produto */
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
  const [valores, setValores] = useState<Valores>(() =>
    produto ? deProduto(produto) : VAZIO,
  );
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [erroArquivo, setErroArquivo] = useState<string | null>(null);
  const [previa, setPrevia] = useState<string | null>(
    produto?.imagemUrl ?? null,
  );
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const erros = validar(valores, Boolean(arquivo || produto));
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
      setErroArquivo("Use JPG, PNG ou WEBP");
      return;
    }
    if (escolhido.size > TAMANHO_MAX_FOTO) {
      setErroArquivo("A foto deve ter até 2 MB");
      return;
    }
    setErroArquivo(null);
    setArquivo(escolhido);
    // prévia local da foto, antes de enviar
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
        {produto ? "Editar produto" : "Novo produto"}
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
              {previa ? "Trocar foto" : "Escolher foto"}
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
              {erroArquivo ?? mostrar("foto") ?? "JPG, PNG ou WEBP até 2 MB"}
            </Typography>
          </Box>
        </Stack>

        <TextField
          label="Nome"
          value={valores.nome}
          onChange={alterar("nome")}
          error={Boolean(mostrar("nome"))}
          helperText={mostrar("nome")}
          fullWidth
          margin="dense"
          slotProps={{ htmlInput: { maxLength: 80 } }}
        />
        <TextField
          label="Descrição"
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
          label="Preço"
          value={valores.preco}
          onChange={alterar("preco", (t) => t.replace(/[^\d.,]/g, ""))}
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
          Medidas padrão (cm)
        </Typography>
        <Stack direction="row" spacing={1.5}>
          {CAMPOS_MEDIDA.map(({ chave, rotulo }) => (
            <TextField
              key={chave}
              label={rotulo}
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
          Cancelar
        </Button>
        <Button type="submit" variant="contained" disabled={salvar.isPending}>
          {salvar.isPending ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Salvar"
          )}
        </Button>
      </DialogActions>
    </Box>
  );
}

export default ProdutoFormDialog;
