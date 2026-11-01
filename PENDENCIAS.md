# Pendências

Itens que dependem de confirmação do dono ou de material que ainda não chegou. Ao resolver um item, marque com `[x]` e ajuste o arquivo indicado.

## Horários
- [ ] **Confirmar o domingo.** O site mostra domingo fechado. O Google mostra "24 horas", provavelmente por engano. Corrigir a ficha do Google ou `data/site.json` (`horarios`).

## Serviços e preços (`data/services.json`)
- [ ] **Pigmentação Completa** custa R$ 30, o mesmo que a Simples, apesar de durar 45 min (a Simples dura 15 min). Confirmar o preço na Trinks.
- [ ] **Corte + Barba + Sobrancelha** tem descrição só "BARBA" na Trinks. Confirmar e, se for o caso, corrigir na Trinks.
- [ ] **Good Club:** confirmar como funcionam os pacotes (período, quantidade de atendimentos, forma de pagamento). Hoje a descrição de cada pacote está como `TODO`.
- [ ] Revisar as descrições curtas dos serviços, escritas de forma neutra a partir dos nomes da Trinks.

## Equipe (`data/team.json`)
- [ ] **Lourenço** pode aparecer na Trinks como "Keven". Confirmar o nome certo.
- [ ] **Kauan Borba:** Instagram pendente.
- [x] Fotos dos quatro barbeiros (adicionadas em `assets/img/equipe/`).

## Depoimentos (`data/testimonials.json`)
- [ ] Conferir os cinco depoimentos na ficha **GoodBarber** do Google Maps. Os prints misturavam avaliações de outra barbearia. Só mudar para `"verificado": true` depois de conferir cada um.
- [ ] Acrescentar de 10 a 15 depoimentos verificados.

## Fotos e marca
- [ ] Logo original da Good Barber em boa resolução (hoje há um logotipo provisório em texto).
- [x] Foto do salão no topo da página inicial (`assets/img/hero.webp`). A foto tem 683x811 px: se houver uma versão maior (1400 px ou mais de largura), ela fica mais nítida em telas grandes.
- [x] Fotos da seção Sobre (`assets/img/sobre/`).
- [x] Fotos de cortes na galeria (19 fotos em `assets/img/cortes/`, lista em `data/site.json`).
- [ ] Confirmar a autorização de uso de imagem das pessoas nas fotos de cortes, principalmente as crianças e os adolescentes (autorização do responsável). Para tirar uma foto, basta apagar a linha dela em `imagens.galeria`.
- [ ] Favicon e imagem de compartilhamento (Open Graph) a partir da logo original.

## Textos
- [ ] Revisar o texto da seção "Sobre" (rascunho escrito só com os fatos conhecidos).

## Domínio e publicação
- [ ] Escolher e registrar o domínio. Depois, atualizar `sitemap.xml`, `robots.txt`, as tags Open Graph, o JSON-LD e `data/site.json` (`dominio`).

## Página futura
- [ ] **Curso de formação de barbeiros:** criar a página depois que o dono confirmar o curso (conteúdo, datas, valores).
