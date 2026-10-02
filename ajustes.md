# Revisão técnica e plano de ajustes — KHAO

## Escopo e validação

Revisão estática do App Router, componentes, dados, assets, acessibilidade,
performance e documentação do projeto.

Verificações executadas:

- `npm run lint` — aprovado.
- `npx tsc --noEmit` — aprovado.
- `npm run build` — aprovado.

Não encontrei uma suíte de testes automatizados ou um script `test` no
`package.json`. Os pontos abaixo são recomendações de evolução; os três
comandos aprovados verificam qualidade estática e build, não substituem testes
de comportamento.

## Ajustes prioritários

### 1. Conectar o formulário de reserva a um serviço real — P1

**Evidência:** em [src/components/ui/Form.tsx](src/components/ui/Form.tsx), o
submit apenas chama `setIsSent(true)`, e a confirmação afirma que um e-mail foi
enviado. Não há requisição, persistência ou confirmação real do serviço.

**Impacto:** visitantes podem acreditar que uma reserva foi solicitada quando
nenhum dado saiu do navegador; isso pode resultar em reservas perdidas.

**Passo a passo:**

1. Definir o fluxo de reservas com o restaurante: API própria, plataforma de
   reservas ou provedor de e-mail/formulário.
2. Criar a integração no servidor (Route Handler ou Server Action), validar os
   campos novamente no servidor e manter credenciais fora do cliente.
3. Substituir `handleSubmit` por envio assíncrono com estados explícitos de
   carregamento, sucesso e erro.
4. Só mostrar a confirmação de recebimento após resposta bem-sucedida do
   serviço; apresentar falhas e permitir nova tentativa.
5. Validar limites, data/horário, telefone e política de retenção dos dados.
6. Testar sucesso, falha de rede, dados inválidos e submissões duplicadas.

### 2. Substituir dados e destinos de demonstração — P1

**Evidência:** [src/components/layout/footer.tsx](src/components/layout/footer.tsx)
e [src/components/layout/navbar.tsx](src/components/layout/navbar.tsx) exibem
`Av. Exemplo, 123`; os horários também estão duplicados no rodapé e no menu.
Os links do rodapé em `#reservas`, `#contato`, `#localizacao` e `#eventos` não
correspondem a IDs existentes. O destino TikTok aponta para a página genérica da
plataforma em [src/data/navbar.ts](src/data/navbar.ts).

**Impacto:** informação incorreta e links sem destino reduzem confiança e
impedem a navegação esperada.

**Passo a passo:**

1. Confirmar com o responsável endereço, horários, telefone, canais sociais e
   disponibilidade de reservas/eventos.
2. Criar uma única fonte tipada para esses dados e consumi-la no menu e rodapé.
3. Atualizar cada link para um destino real: ID presente na página, URL externa
   válida ou ação apropriada.
4. Conferir todos os links em desktop e mobile e testar cada âncora.
5. Atualizar os dados estruturados do restaurante com as informações
   confirmadas, sem publicar valores fictícios.

### 3. Corrigir a imagem quebrada nos metadados sociais — P1

**Evidência:** [src/app/layout.tsx](src/app/layout.tsx) e
[src/app/page.tsx](src/app/page.tsx) referenciam
`/assets/cta/cta-khao-aerial.opt.webp`, mas o arquivo disponível é
`/assets/cta/cta-khao-aerial.webp`.

**Impacto:** Open Graph/Twitter cards e a propriedade `image` do JSON-LD podem
retornar 404 em compartilhamentos e crawlers.

**Passo a passo:**

1. Corrigir os dois caminhos ou centralizar a URL a partir de
   `KHAO_ASSETS.cta.cta_aerial`.
2. Validar a resposta HTTP da URL corrigida em ambiente de produção.
3. Inspecionar o HTML renderizado e testar os cards em validadores de
   compartilhamento.

### 4. Reduzir o peso de imagens e controlar vídeos fora da tela — P2 (OK)

**Evidência original:** havia imagens WebP com aproximadamente 3,6–5,3 MB,
por exemplo `restaurant_terrace.webp` (5,32 MB), `cta-khao-aerial.webp`
(4,47 MB) e `restaurant_int.webp` (4,21 MB). Os três vídeos têm cerca de
1,9–2,8 MB. Hero e Experience usavam autoplay e `preload="metadata"` sem pausa
explícita ao saírem da viewport.

**Impacto:** imagens grandes aumentam o tempo de transferência ao serem
solicitadas; vídeos podem consumir CPU, bateria e dados móveis mesmo quando o
visitante não está vendo a seção.

**Implementado:**

1. Redimensionadas e recomprimidas 22 imagens WebP: as imagens largas foram
   limitadas a 1920 px, as fotos da galeria a 576 px e os posters foram
   recomprimidos sem ampliar suas dimensões.
2. O conjunto passou de 44.668.136 bytes para 1.749.126 bytes
   (−42.919.010 bytes, 96,1% menos no disco). Exemplos: `restaurant_terrace.webp`
   passou de 5.575.754 para 323.526 bytes; `cta-khao-aerial.webp`, de 4.683.474
   para 131.894 bytes; e `restaurant_int.webp`, de 4.417.712 para 173.300 bytes.
3. Ajustados `sizes` para os limites visuais dos cards e da galeria; a imagem
   inicial do carrossel do modal é a única pré-carregada. O logo do Hero usa
   `preload` com dimensões responsivas.
4. Os vídeos do Hero, Experience e modal agora usam `IntersectionObserver`:
   pausam fora da viewport ou com a aba oculta e retomam quando visíveis. O
   modal também sincroniza a reprodução ao trocar a categoria.
5. Autoplay decorativo fica desativado com `prefers-reduced-motion`; vídeos
   usam `preload="none"` e posters. Corrigido o caminho do poster da seção
   Experience para o arquivo existente.

**Pendente de medição em navegador/produção:** não foi possível comparar
Lighthouse e bytes transferidos por viewport nesta alteração. Os três MP4s
continuam entre 1,9 MB e 2,8 MB; a transcodificação de bitrate/formato deve ser
avaliada com os vídeos finais e validação visual/auditiva antes de substituir
os arquivos atuais.

## Melhorias de acessibilidade e confiabilidade

### 5. Completar o comportamento acessível dos diálogos — P2

**Evidência:** o formulário em [src/components/ui/Form.tsx](src/components/ui/Form.tsx)
usa `role="dialog"` e `aria-modal`, mas não mantém o foco dentro do diálogo nem
retorna o foco ao botão que o abriu. A seção CTA declara
`aria-labelledby="khao-cta-title"` em
[src/components/sections/CtaSection.tsx](src/components/sections/CtaSection.tsx),
mas o componente `Title` não recebe nem renderiza esse ID.

**Impacto:** navegação por teclado e identificação da região para tecnologias
assistivas ficam inconsistentes.

**Passo a passo:**

1. Adicionar um rótulo acessível real ao título da CTA (por exemplo, suportar
   `id` no componente `Title`, ou rotular a seção por um heading com ID).
2. Ao abrir o formulário, guardar o elemento acionador e mover o foco para o
   diálogo.
3. Implementar ciclo de foco por Tab/Shift+Tab, Escape e restauração do foco ao
   fechar, incluindo fechamento pelo backdrop.
4. Auditar MenuModal e menu mobile para manter um comportamento consistente.
5. Validar com teclado e leitor de tela, incluindo abertura, envio, erro e
   fechamento.

### 6. Corrigir o limite de data no fuso horário — P3

**Evidência:** `getToday()` em
[src/components/ui/Form.tsx](src/components/ui/Form.tsx) usa
`toISOString().split("T")[0]`, que calcula a data em UTC.

**Impacto:** perto da virada do dia, o atributo `min` pode permitir o dia
anterior ou bloquear o dia atual, dependendo do fuso do visitante.

**Passo a passo:**

1. Definir qual fuso horário governa reservas (preferencialmente o do
   restaurante).
2. Gerar `YYYY-MM-DD` nesse fuso, evitando depender de UTC ou do fuso do
   dispositivo.
3. Cobrir virada de dia e diferenças de fuso com testes.

## Qualidade de engenharia e documentação

### 7. Adicionar testes automatizados para fluxos essenciais — P2

**Evidência:** não há script `test` nem arquivos de teste versionados na
estrutura atual.

**Passo a passo:**

1. Escolher e configurar ferramentas compatíveis com o projeto (testes de
   componentes/unidades e E2E).
2. Cobrir navegação por categorias, scroll lock, fechamento dos diálogos,
   validação e envio do formulário, links de navegação e preferência por
   movimento reduzido.
3. Adicionar os comandos de teste ao `package.json`.
4. Executar lint, typecheck, testes e build no CI antes de aceitar alterações.

### 8. Atualizar o README para corresponder ao repositório — P2

**Evidência:** [README.md](README.md) documenta módulos de combos e mapas de
assets que não constam na estrutura versionada, e aponta para `ajuste.md`, que
não existe. Este relatório passa a ser `ajustes.md`.

**Passo a passo:**

1. Atualizar a árvore de diretórios e remover instruções para módulos
   inexistentes.
2. Corrigir os caminhos de configuração de assets para `src/config/khao-assets.ts`.
3. Trocar a referência `ajuste.md` por `ajustes.md`.
4. Manter a seção “Estado atual” sincronizada com a integração real de reservas
   e os testes disponíveis.

## Sequência sugerida

1. Confirmar dados oficiais do restaurante e destinos das redes sociais.
2. Corrigir metadados/imagem social e links quebrados.
3. Definir e integrar o fluxo real de reservas antes de anunciar a confirmação.
4. Corrigir acessibilidade dos diálogos e do título da CTA.
5. Otimizar imagens/vídeos com medições de produção.
6. Adicionar testes dos fluxos críticos e executar no CI.
7. Atualizar o README após a arquitetura e os fluxos estarem definidos.
8. Corrigir o cálculo da data conforme o fuso oficial das reservas.

## Pontos positivos observados

- TypeScript está em modo `strict` e o build valida tipos.
- ESLint e regras de Core Web Vitals do Next estão configurados.
- A maioria das imagens é servida por `next/image` com texto alternativo.
- Há tratamento para `prefers-reduced-motion` em animações importantes.
- Os vídeos decorativos são silenciados e usam `playsInline`.
- O App Router fornece metadados, sitemap, robots e JSON-LD do restaurante.
