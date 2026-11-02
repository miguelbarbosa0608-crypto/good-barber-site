# Como publicar o site da Good Barber

O site é estático (HTML, CSS e JavaScript). Não precisa de banco de dados nem de etapa de build: basta um serviço que entregue os arquivos.

---

## Onde o site está hoje: GitHub Pages

O site está no ar em **https://miguelbarbosa0608-crypto.github.io/good-barber-site/**. Cada `git push` em `main` publica sozinho, em cerca de um minuto. O repositório precisa ficar público para isso funcionar no plano grátis do GitHub.

Ao trocar para outro serviço ou para um domínio próprio, em `404.html` ajuste também a pequena linha de script que define a base do site (`/good-barber-site/`).

---

## Alternativa com repositório privado: Cloudflare Pages (grátis)

Cada `git push` em `main` publica o site sozinho, em cerca de um minuto. (Os nomes dos menus do Cloudflare podem mudar um pouco com o tempo; a ideia é sempre a mesma.)

1. Crie uma conta em **dash.cloudflare.com** (se ainda não tiver).
2. No menu da esquerda, abra **Workers e Pages** e clique em **Criar**. Escolha a aba **Pages** e depois **Conectar ao Git**.
3. Autorize o acesso ao GitHub e selecione o repositório **good-barber-site**.
4. Configure assim:
   - **Branch de produção:** `main`
   - **Predefinição de framework:** Nenhuma
   - **Comando de build:** deixe vazio
   - **Diretório de saída do build:** `/` (a raiz do projeto)
5. Clique em **Salvar e implantar**. No fim, o Cloudflare mostra um endereço como `good-barber-site.pages.dev`. O site já está no ar nele.

A pasta `referencias/` não vai para o GitHub (está no `.gitignore`), então também não vai para o site.

A página `404.html` é usada automaticamente pelo Cloudflare Pages quando alguém acessa um endereço que não existe.

---

## Alternativa: Hostinger

1. No **hPanel**, abra **Arquivos > Gerenciador de arquivos** e entre na pasta `public_html`.
2. Envie todo o conteúdo do projeto **sem a pasta `referencias/`**: `index.html`, `servicos.html`, `equipe.html`, `localizacao.html`, `404.html`, `robots.txt`, `sitemap.xml` e as pastas `css/`, `js/`, `data/` e `assets/`.
3. Para usar a página de erro, crie (ou edite) o arquivo `.htaccess` em `public_html` com a linha:
   ```
   ErrorDocument 404 /404.html
   ```
4. Se o seu plano tiver **Avançado > Git** no hPanel, dá para conectar o repositório e puxar as atualizações por lá.

> **Atenção:** sem a integração com Git, cada mudança (preço, foto, depoimento) exige enviar de novo os arquivos alterados pelo gerenciador de arquivos.

---

## Domínio (ainda não existe)

1. **Escolher:** curto, fácil de falar e de digitar. Ex.: `goodbarber.com.br`, `goodbarbergoiania.com.br`. Evite hífens.
2. **Registrar:** domínios `.com.br` são registrados no **Registro.br** (registro.br), com CPF ou CNPJ. Custa cerca de R$ 40 por ano. `.com` pode ser registrado no próprio Cloudflare ou na Hostinger.
3. **Apontar o DNS:**
   - **Cloudflare Pages:** no projeto, abra **Domínios personalizados > Configurar domínio** e siga as instruções. O jeito mais simples é mudar os servidores DNS do domínio (no Registro.br, em "DNS > Alterar servidores DNS") para os dois que o Cloudflare indicar.
   - **Hostinger:** no Registro.br, troque os servidores DNS para os da Hostinger (aparecem no hPanel, em **Domínios**).
4. **HTTPS:** o Cloudflare ativa o certificado sozinho. Na Hostinger, ative em **Segurança > SSL** (é grátis). A propagação do DNS pode levar algumas horas.
5. **Depois do domínio**, troque `miguelbarbosa0608-crypto.github.io/good-barber-site` pelo domínio real (por exemplo, `goodbarber.com.br`) nestes arquivos:
   - `sitemap.xml` e `robots.txt`
   - as tags `canonical` e `og:url`/`og:image` no topo de cada página `.html`
   - `data/site.json`, campo `dominio`

   O JSON-LD (dados para o Google) usa o endereço do site automaticamente.

---

## Depois de publicar

- [ ] Abrir o site no celular e testar o menu, os botões e o mapa.
- [ ] Clicar em **Agendar** e conferir que abre a página da Good Barber na Trinks.
- [ ] Clicar em **WhatsApp** e conferir que abre a conversa com o (62) 99128-0297 e a mensagem pronta.
- [ ] Conferir o selo **Aberto agora / Fechado** em horários diferentes.
- [ ] Atualizar o link do site na **ficha do Google** (Perfil da Empresa) e na **bio do Instagram**.
- [ ] Enviar o `sitemap.xml` no **Google Search Console** (search.google.com/search-console) depois de registrar o domínio.
