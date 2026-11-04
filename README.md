# Pedro Henrique · Web Designer Sênior

Portfólio de Pedro Henrique Coelho de Souza, com projetos de web design, UX/UI e branding.

- **Site:** [designerux.vercel.app](https://designerux.vercel.app)
- **LinkedIn:** [Pedro Henrique](https://www.linkedin.com/in/pedro-henrique-coelho-de-souza-8a600a289/)

## Projetos

- **Abreu Oliveira:** landing page para tráfego pago (~30 contratos por mês)
- **Atlantec:** reestruturação de catálogo B2B
- **Grupo Brasil:** rebranding, site e blog
- **Hooney V2, WebQuarto V2 e MoradiaMatch:** UX/UI de produtos, com MVP no Figma
- **Beeviral:** manual de marca e identidade visual

## Estrutura

Site estático em HTML, CSS e JavaScript. Não precisa instalar dependências nem compilar.

| Pasta / arquivo | Conteúdo |
|---|---|
| `index.html` | Página inicial |
| `*.html` | Páginas dos projetos |
| `assets/style.css` | Estilos do site |
| `assets/main.js` | Projetos, filtros, carrossel e efeitos |
| `assets/i18n.js` | Tradução para inglês (botão PT / EN) |
| `prints/` | Imagens dos projetos em WebP |
| `manual/pages/` | Páginas do manual Beeviral (`sm/` contém versões leves para o carrossel) |
| `img/` | Imagens do portfólio |
| `cv/` | Currículo em PDF |

## Publicar no GitHub

Envie o conteúdo desta pasta para a raiz do repositório. Para publicar pelo GitHub Pages, abra **Settings → Pages**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/(root)`. O endereço será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

O site usa caminhos relativos para carregar as páginas e os recursos quando publicado dentro de um repositório. O arquivo `.nojekyll` mantém a publicação como arquivos estáticos, sem processamento Jekyll.

## Vercel

O site também pode ser publicado na Vercel como projeto estático, sem comando de build. Se o repositório estiver conectado à Vercel, novos envios para a branch configurada podem gerar deploys automáticos.
