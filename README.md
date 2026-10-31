# Good Barber – A Barbearia

Site da **Good Barber – A Barbearia** (Jardim Europa, Goiânia, GO). Site estático em HTML, CSS e JavaScript puro, sem framework e sem etapa de build. O objetivo do site é levar o cliente a agendar pela Trinks.

## Como rodar localmente

Com o Node.js instalado, na pasta do projeto:

```bash
npx serve .
```

Depois abra o endereço que aparecer no terminal (normalmente http://localhost:3000).

> Abrir o `index.html` direto com dois cliques não funciona, porque o navegador bloqueia a leitura dos arquivos de `data/`. Use sempre um servidor local, como o `npx serve .`.

## Onde editar o conteúdo

Todo o conteúdo do site fica em `data/`. Não é preciso mexer no HTML.

| O que mudar | Arquivo |
|---|---|
| Endereço, telefone, WhatsApp, Instagram, link da Trinks, horários, formas de pagamento | `data/site.json` |
| Serviços e preços | `data/services.json` |
| Equipe | `data/team.json` |
| Depoimentos (só aparece no site quem tiver `"verificado": true`) | `data/testimonials.json` |
| Logo e fotos (hero, sobre, galeria) | `data/site.json`, campos `logo` e `imagens` (coloque os arquivos em `assets/img/`) |
| Textos da seção "Sobre" e de "Como chegar" | `data/site.json`, campo `textos` |

### Depoimentos

1. Confira o depoimento na ficha da Good Barber no Google Maps (nome e texto iguais).
2. Em `data/testimonials.json`, mude `"verificado": false` para `"verificado": true`.
3. Para acrescentar um novo, copie um bloco e preencha `nome`, `nota`, `texto` e `origem`.

Com pelo menos um depoimento verificado, a seção vira um carrossel com troca automática. Sem nenhum, ela mostra só a nota do Google e o botão "Ver avaliações no Google".

### Fotos

Coloque o arquivo em `assets/img/` (de preferência `.webp` ou `.jpg`, com até uns 300 KB) e escreva o caminho no `site.json`, por exemplo `"hero": "assets/img/hero.webp"`. Enquanto o campo estiver `null`, o site mostra um bloco escuro no lugar. Fotos da equipe vão no campo `foto` de `data/team.json`.

## Estrutura

```
index.html  servicos.html  equipe.html  localizacao.html  404.html
css/        estilos
js/         scripts (menu, animações, depoimentos, aberto/fechado, renderização dos dados)
data/       conteúdo editável
assets/     logo, fotos, favicon
```

Itens que ainda dependem de confirmação estão em `PENDENCIAS.md`. O passo a passo de publicação está em `DEPLOY.md`.
