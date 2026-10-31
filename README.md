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

## Estrutura

```
index.html  servicos.html  equipe.html  localizacao.html  404.html
css/        estilos
js/         scripts (menu, animações, depoimentos, aberto/fechado, renderização dos dados)
data/       conteúdo editável
assets/     logo, fotos, favicon
```

Itens que ainda dependem de confirmação estão em `PENDENCIAS.md`. O passo a passo de publicação está em `DEPLOY.md`.
