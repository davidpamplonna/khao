# KHAO

Landing page do Restobar KHAO, com foco em cozinha tailandesa contemporânea, narrativa visual, cardápio interativo e apresentação da experiência do restaurante.

## Stack

- Next.js `16.3.5`
- React `19.2.8`
- TypeScript
- Tailwind CSS `4`
- GSAP e ScrollTrigger para animações
- Lenis para rolagem suave
- Swiper para a galeria
- `next/image` para otimização de imagens

## Requisitos

- Node.js compatível com a versão usada pelo Next.js 16
- npm

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Depois, abra `http://localhost:3000`.

## Scripts

| Comando         | Uso                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `npm run dev`   | Inicia o servidor de desenvolvimento.                                                                  |
| `npm run build` | Gera a build de produção e verifica a compilação.                                                      |
| `npm run start` | Inicia a aplicação em modo de produção após o build.                                                   |
| `npm run lint`  | Executa o ESLint.                                                                                      |
| `npm run clean` | Remove a pasta `.next` em ambientes Unix. No Windows, remova essa pasta manualmente ou use PowerShell. |

Antes de abrir um pull request, execute:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Estrutura principal

```text
src/
	app/                 Layout e página principal do App Router
	components/
		layout/            Header, navegação e rodapé
		sections/          Hero, essência, experiência, menu, combos e CTA
		ui/                Componentes reutilizáveis, título, botão e galeria
	data/
		assets/            Caminhos centralizados para imagens, vídeos e ícones
		menu.ts            Categorias e pratos exibidos no cardápio
		combo.ts           Combos exibidos na página
	motion/              Lenis e controle de bloqueio da rolagem
	styles/              Tokens, tipografia e estilos globais
	types/               Tipos de menu e combos
public/
	assets/              Imagens, ícones e vídeos usados pela página
```

## Onde alterar o conteúdo

### Cardápio

Edite [src/data/menu.ts](src/data/menu.ts). Cada categoria possui `id`, `number`, `label` e uma lista de pratos. Cada prato precisa de `id` único, nome, descrição, imagem existente e `alt` descritivo.

Os tipos correspondentes estão em [src/types/menu.ts](src/types/menu.ts).

### Combos

Edite [src/data/combo.ts](src/data/combo.ts). As imagens devem ser registradas em [src/data/assets/image.ts](src/data/assets/image.ts) e armazenadas em `public/assets/combos/`.

### Imagens e vídeos

Os caminhos públicos ficam centralizados em [src/data/assets/image.ts](src/data/assets/image.ts) e [src/data/assets/video.ts](src/data/assets/video.ts). Coloque novos arquivos na pasta adequada dentro de `public/assets/` ou `public/videos/` e atualize o mapa correspondente.

### Dados do restaurante

Endereço, horários, redes sociais e links de navegação ainda precisam ser conferidos antes da publicação. Hoje eles aparecem principalmente em [src/components/layout/footer.tsx](src/components/layout/footer.tsx), [src/components/layout/navbar.tsx](src/components/layout/navbar.tsx) e [src/data/assets/menu.ts](src/data/assets/menu.ts).

Consulte [ajuste.md](ajuste.md) para o plano detalhado de correção.

## Arquitetura da página

A página inicial é montada em [src/app/page.tsx](src/app/page.tsx), nesta ordem: Header, Hero, Essência, Experiência, Cardápio, Combos, CTA, Galeria e Footer.

As seções são componentes client-side quando dependem de GSAP, Swiper, estado ou eventos do navegador. O layout global configura fontes, metadados, idioma e rolagem suave em [src/app/layout.tsx](src/app/layout.tsx).

## Animações e acessibilidade

As animações usam GSAP e algumas seções já verificam `prefers-reduced-motion`. Toda nova animação deve manter o conteúdo acessível quando o usuário solicitar menos movimento. Elementos modais, menus e galerias também precisam controlar foco, oferecer fechamento pelo teclado e indicar seu estado com ARIA.

## Assets e performance

Os vídeos e imagens fazem parte importante da experiência visual, mas aumentam o carregamento inicial. Antes de publicar, comprima imagens e prefira AVIF ou WebP, use poster nos vídeos, evite carregar vídeos fora da viewport sem necessidade e teste a página em rede móvel e em dispositivos de baixo desempenho.

## Estado atual

O projeto compila e possui lint configurado. Ainda há ajustes funcionais pendentes, principalmente destinos de navegação, fluxo de reservas, dados reais do restaurante, acessibilidade do menu mobile e lightbox. O documento [ajuste.md](ajuste.md) lista cada pendência, o arquivo responsável e a forma recomendada de implementação.
