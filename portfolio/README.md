# Portfólio — Evelyn Luane

Landing page pessoal com animações de scroll e um palco 3D com a stack.
Projeto independente da loja PLANAR (não entra no deploy do `frontend/`).

```bash
cd portfolio
npm install
npm run dev       # http://localhost:5173
npm run build     # gera dist/ (base relativa, funciona em qualquer subpasta)
```

## Seções

| Seção      | Efeito                                                                 |
|------------|------------------------------------------------------------------------|
| Loader     | nome letra a letra + contador, cortina sobe revelando a hero           |
| Hero       | nome gigante em gradiente, foto em arco com borda luminosa, parallax   |
| Manifesto  | seção fixa, palavras "acendem" conforme o scroll                       |
| Sobre      | cards 3D com inclinação e reflexo holográfico seguindo o mouse         |
| Stack      | logos 3D extrudados num palco; o anel gira com o scroll (hover = giro) |
| Momentos   | galeria horizontal fixada, com parallax nas fotos                      |
| Transição  | "DEV" cresce até virar o fundo da seção de contato                     |
| Contato    | botão magnético para o GitHub                                          |

## Idiomas (PT / EN)

Seletor **PT | EN** na barra do topo. O idioma inicial vem de `?lang=pt` / `?lang=en`
na URL, depois da última escolha do visitante e, por fim, do idioma do navegador.
Todos os textos ficam em `src/i18n/textos.ts`; o TypeScript acusa se faltar alguma
tradução.

## Onde editar

- Textos e legendas (nos dois idiomas): `src/i18n/textos.ts`
- Idade, links, tecnologias e ordem das fotos: `src/data.ts`
- Fotos: `public/fotos/*.webp` (referenciadas pelo nome em `data.ts`)
- Cores e gradientes: variáveis no topo de `src/styles.css`
- Cena 3D (luzes, palco, câmera): `src/components/StackCena.tsx`

Stack: React 19, Vite, TypeScript, three.js / React Three Fiber, GSAP
(ScrollTrigger + SplitText) e Lenis. Os logos vêm do `simple-icons`.
