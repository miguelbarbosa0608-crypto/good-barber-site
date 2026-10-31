/* ==========================================================================
   Good Barber – A Barbearia
   Menu, revelação ao rolar, contadores, depoimentos, selo aberto/fechado
   e renderização do conteúdo a partir dos arquivos de data/.
   ========================================================================== */
(() => {
  'use strict';

  document.documentElement.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const page = document.body.dataset.page || '';
  // Raiz do site a partir do endereço deste script: funciona também na 404 servida em qualquer caminho.
  const ROOT = new URL('../', document.currentScript ? document.currentScript.src : location.href).href;

  // ========== ÍCONES (SVG inline, sem dependência externa) ==========
  const PATHS = {
    tesoura: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>',
    navalha: '<path d="M3 17 12 8l4 4-9 9H3z"/><path d="m14 6 3-3 4 4-3 3"/>',
    combo: '<path d="m3 7 4 4 5-6 5 6 4-4-2 11H5z"/><path d="M5 21h14"/>',
    gota: '<path d="M12 2.7S6 9.3 6 14a6 6 0 0 0 12 0c0-4.7-6-11.3-6-11.3z"/>',
    folha: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
    pincel: '<path d="M12 2a10 10 0 0 0 0 20 2 2 0 0 0 1.5-3.3 2 2 0 0 1 1.5-3.3h2.3A5.7 5.7 0 0 0 22 9.7C22 5.4 17.5 2 12 2z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16.5" cy="10.5" r="1"/>',
    estrela: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    olho: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
    whatsapp: '<path d="M3 21l1.65-4.95A8.5 8.5 0 1 1 7.95 19.47z"/><path d="M9 8.8c0 3.4 2.8 6.2 6.2 6.2l.9-1.6-2-1-1 .8a4 4 0 0 1-2.3-2.3l.8-1-1-2z"/>',
    telefone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    relogio: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    seta: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    externo: '<path d="M7 17 17 7M7 7h10v10"/>',
    esquerda: '<path d="m15 18-6-6 6-6"/>',
    direita: '<path d="m9 18 6-6-6-6"/>',
    busca: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    cartao: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    dinheiro: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    pix: '<path d="m12 3 9 9-9 9-9-9z"/><path d="m8 12 4-4 4 4-4 4z"/>',
    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>',
    estacionamento: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
    cafe: '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z"/><path d="M6 1v3M10 1v3M14 1v3"/>',
    tv: '<rect x="2" y="7" width="20" height="15" rx="2"/><path d="m17 2-5 5-5-5"/>',
    pessoas: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    rota: '<path d="m3 11 19-9-9 19-2-8z"/>'
  };

  function icon(name, cls = '') {
    const filled = name === 'estrela-cheia';
    const d = PATHS[filled ? 'estrela' : name] || PATHS.estrela;
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
  }

  // ========== UTILITÁRIOS ==========
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const priceHTML = (n) => `<span class="price"><small>R$</small>${Number(n).toLocaleString('pt-BR')}</span>`;

  const normalize = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const ext = 'target="_blank" rel="noopener noreferrer"';
  const newTab = '<span class="visually-hidden"> (abre em nova aba)</span>';

  const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();

  const slug = (s) => normalize(s).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  async function loadJSON(name) {
    const res = await fetch(new URL(`data/${name}.json`, ROOT), { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Falha ao carregar data/${name}.json (${res.status})`);
    return res.json();
  }

  // Imagem real quando existir no site.json; senão, bloco escuro reservado.
  function mediaHTML(src, alt, { mark = '', w = 800, h = 1000, eager = false } = {}) {
    if (src) {
      return `<img src="${esc(src)}" alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
    }
    return `<div class="ph" role="img" aria-label="${esc(alt)} (foto em breve)">${mark ? `<span class="ph__mark" aria-hidden="true">${mark}</span>` : ''}</div>`;
  }

  // ========== LINKS A PARTIR DO SITE.JSON ==========
  // <a data-link="agendamento"> recebe o href certo; externos abrem em nova aba.
  function linkFor(site, key) {
    return {
      agendamento: site.agendamento,
      whatsapp: site.whatsapp,
      whatsappGoodClub: site.whatsappGoodClub,
      instagram: site.instagram.url,
      telefone: site.telefone.link,
      comoChegar: site.mapa.comoChegar,
      avaliacoes: site.avaliacoesGoogle
    }[key];
  }

  function applyLinks(site, root = document) {
    $$('[data-link]', root).forEach((a) => {
      const href = linkFor(site, a.dataset.link);
      if (!href) return;
      a.href = href;
      if (/^https?:/.test(href)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        if (!a.querySelector('.visually-hidden')) a.insertAdjacentHTML('beforeend', newTab);
      }
    });
  }

  // <span data-text="instagram.usuario"> recebe o texto do site.json.
  function applyTexts(site, root = document) {
    $$('[data-text]', root).forEach((el) => {
      const val = el.dataset.text.split('.').reduce((o, k) => (o == null ? o : o[k]), site);
      if (val != null) el.textContent = val;
    });
  }

  // ========== TOPO E RODAPÉ (um único trecho para todas as páginas) ==========
  const MENU = [
    { id: 'inicio', href: ROOT, label: 'Início' },
    { id: 'servicos', href: ROOT + 'servicos.html', label: 'Serviços' },
    { id: 'equipe', href: ROOT + 'equipe.html', label: 'Equipe' },
    { id: 'localizacao', href: ROOT + 'localizacao.html', label: 'Onde estamos' }
  ];

  function brandHTML(site) {
    // TODO: quando a logo original chegar, preencher "logo" em data/site.json (ex.: "assets/img/logo.png").
    const inner = site.logo
      ? `<img src="${esc(new URL(site.logo, ROOT).href)}" alt="${esc(site.nome)}" width="160" height="40">`
      : `<span class="brand__text">Good Barber</span>`;
    return `<a class="brand" href="${ROOT}" aria-label="${esc(site.nome)}, página inicial">${inner}</a>`;
  }

  function renderHeader(site) {
    const mount = $('[data-site-header]');
    if (!mount) return;
    const cur = (id) => (id === page ? ' aria-current="page"' : '');
    mount.outerHTML = `
      <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header class="nav" id="nav">
        ${brandHTML(site)}
        <nav aria-label="Principal">
          <ul class="nav-links">
            ${MENU.map((m) => `<li><a href="${m.href}"${cur(m.id)}>${m.label}</a></li>`).join('')}
          </ul>
        </nav>
        <a class="btn btn--outline nav-cta" data-link="agendamento">Agendar</a>
        <button class="nav-hamburger" id="hamburger" type="button" aria-controls="mobileNav" aria-expanded="false" aria-label="Abrir menu">
          <span></span><span></span><span></span>
        </button>
      </header>
      <div class="mobile-nav" id="mobileNav">
        <nav aria-label="Menu do celular">
          <ul style="display:flex;flex-direction:column;align-items:center;gap:.75rem">
            ${MENU.map((m) => `<li><a href="${m.href}"${cur(m.id)}>${m.label}</a></li>`).join('')}
          </ul>
        </nav>
        <a class="btn btn--gold" data-link="agendamento">${icon('calendario')}<span>Agendar agora</span></a>
      </div>`;
  }

  function renderFooter(site) {
    const mount = $('[data-site-footer]');
    if (!mount) return;
    const year = new Date().getFullYear();
    mount.outerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__top">
            <div class="footer__brand">
              ${brandHTML(site)}
              <p class="footer__tagline">${esc(site.frase)}</p>
              <p class="footer__desc">${esc(site.posicionamento)}.</p>
              <div class="footer__socials">
                <a class="icon-btn" data-link="instagram" aria-label="Instagram ${esc(site.instagram.usuario)}">${icon('instagram')}</a>
                <a class="icon-btn" data-link="whatsapp" aria-label="Falar no WhatsApp">${icon('whatsapp')}</a>
              </div>
            </div>
            <div>
              <h2 class="footer__title">Navegação</h2>
              <ul class="footer__links">
                ${MENU.map((m) => `<li><a href="${m.href}">${m.label}</a></li>`).join('')}
                <li><a data-link="agendamento">Agendar online</a></li>
              </ul>
            </div>
            <div>
              <h2 class="footer__title">Contato</h2>
              <ul class="contact-list">
                <li>${icon('pin')}<span>${esc(site.endereco.completo)}</span></li>
                <li>${icon('telefone')}<a data-link="telefone">${esc(site.telefone.exibicao)}</a></li>
                <li>${icon('instagram')}<a data-link="instagram">${esc(site.instagram.usuario)}</a></li>
              </ul>
            </div>
            <div>
              <h2 class="footer__title">Horários</h2>
              <ul class="contact-list">
                <li>${icon('relogio')}<span>${esc(site.horarioResumo)}</span></li>
              </ul>
              <p class="footer__pay"><strong>Pagamento:</strong> ${site.pagamento.map(esc).join(', ')}.</p>
            </div>
          </div>
          <div class="footer__bottom">
            <p>© ${year} ${esc(site.nome)}. Todos os direitos reservados.</p>
            <p>${esc(site.endereco.bairro)}, ${esc(site.endereco.cidade)} – ${esc(site.endereco.uf)}</p>
          </div>
        </div>
      </footer>`;
  }

  // ========== NAVEGAÇÃO ==========
  function initNav() {
    const nav = $('#nav');
    const burger = $('#hamburger');
    const mobile = $('#mobileNav');
    if (!nav) return;

    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!burger || !mobile) return;
    const setOpen = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      mobile.classList.toggle('active', open);
      document.body.classList.toggle('menu-open', open);
      if (open) setTimeout(() => $('a', mobile)?.focus(), 50);
    };
    burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
    $$('a', mobile).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobile.classList.contains('active')) {
        setOpen(false);
        burger.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && mobile.classList.contains('active')) setOpen(false);
    });
  }

  // ========== REVELAÇÃO AO ROLAR ==========
  let revealObserver = null;
  function initReveal(root = document) {
    const items = $$('.reveal:not(.visible)', root);
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('visible'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    items.forEach((el) => revealObserver.observe(el));
  }

  // ========== NÚMEROS COM CONTAGEM ==========
  function formatCount(value, decimals) {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  function initCounters(root = document) {
    const els = $$('[data-count]', root);
    const finish = (el) => {
      el.textContent = formatCount(Number(el.dataset.count), Number(el.dataset.decimals || 0)) + (el.dataset.suffix || '');
    };
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(finish);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals || 0);
        const suffix = el.dataset.suffix || '';
        const start = performance.now();
        const dur = 1400;
        const step = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = formatCount(target * eased, decimals) + suffix;
          if (t < 1) requestAnimationFrame(step);
          else finish(el);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    els.forEach((el) => io.observe(el));
  }

  // ========== FAIXA ROLANTE ==========
  function initMarquee() {
    $$('[data-marquee]').forEach((el) => {
      const words = el.dataset.marquee.split('|').map((w) => w.trim()).filter(Boolean);
      const group = (hidden) => `<div class="marquee__group"${hidden ? ' aria-hidden="true"' : ''}>${words.map((w) => `<span class="marquee__item">${esc(w)}</span>`).join('')}</div>`;
      // Dois grupos idênticos para o loop contínuo; o segundo fica oculto para leitores de tela.
      el.innerHTML = `<div class="marquee__track">${group(false)}${group(true)}</div>`;
    });
  }

  // ========== HORÁRIO E SELO ABERTO/FECHADO ==========
  const DIAS_JS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

  function nowIn(tz) {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    return { dow: DIAS_JS[get('weekday')], minutes: Number(get('hour')) * 60 + Number(get('minute')) };
  }

  function openStatus(site) {
    const { dow, minutes } = nowIn(site.fusoHorario);
    const today = site.horarios[dow];
    const isOpen = !!(today.abre && minutes >= toMin(today.abre) && minutes < toMin(today.fecha));
    let detail = '';
    if (isOpen) {
      detail = `Fecha às ${today.fecha}`;
    } else if (today.abre && minutes < toMin(today.abre)) {
      detail = `Abre hoje às ${today.abre}`;
    } else {
      for (let i = 1; i <= 7; i++) {
        const d = site.horarios[(dow + i) % 7];
        if (d.abre) {
          detail = `Abre ${i === 1 ? 'amanhã' : d.dia.toLowerCase()} às ${d.abre}`;
          break;
        }
      }
    }
    return { isOpen, dow, detail };
  }

  function hoursTableHTML(site) {
    const { dow } = nowIn(site.fusoHorario);
    // Começa na segunda, termina no domingo.
    const order = [1, 2, 3, 4, 5, 6, 0];
    return `
      <table class="hours">
        <caption>Horário de funcionamento</caption>
        <tbody>
          ${order.map((i) => {
            const d = site.horarios[i];
            return `<tr class="${i === dow ? 'is-today' : ''}"${i === dow ? ' aria-current="date"' : ''}>
              <th scope="row">${esc(d.dia)}</th>
              <td>${d.abre ? `${d.abre} às ${d.fecha}` : 'Fechado'}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>`;
  }

  function updateStatusBadges(site) {
    const st = openStatus(site);
    $$('[data-status]').forEach((el) => {
      el.className = `status ${st.isOpen ? 'status--open' : 'status--closed'}`;
      el.textContent = st.isOpen ? 'Aberto agora' : 'Fechado';
    });
    $$('[data-status-detail]').forEach((el) => { el.textContent = st.detail; });
  }

  // ========== CARTÃO DE LOCALIZAÇÃO ==========
  function renderLocation(site) {
    const mount = $('[data-location]');
    if (!mount) return;
    mount.innerHTML = `
      <div class="location reveal">
        <div class="location__map">
          <iframe src="${esc(site.mapa.embed)}" title="Mapa com a localização da ${esc(site.unidade)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>
        <div class="location__card">
          <div>
            <span class="status" data-status role="status"></span>
            <p class="duration" style="margin-top:.6rem" data-status-detail></p>
          </div>
          <h3 class="location__name">${esc(site.unidade)}</h3>
          <ul class="contact-list">
            <li>${icon('pin')}<span>${esc(site.endereco.completo)}</span></li>
            <li>${icon('telefone')}<a data-link="telefone">${esc(site.telefone.exibicao)}</a></li>
          </ul>
          ${hoursTableHTML(site)}
          <div class="location__actions">
            <a class="btn btn--gold btn--block" data-link="agendamento">${icon('calendario')}<span>Agendar agora</span></a>
            <div class="location__actions-row">
              <a class="btn btn--outline btn--sm" data-link="whatsapp">${icon('whatsapp')}<span>WhatsApp</span></a>
              <a class="btn btn--outline btn--sm" data-link="comoChegar">${icon('rota')}<span>Como chegar</span></a>
            </div>
          </div>
        </div>
      </div>`;
    updateStatusBadges(site);
    setInterval(() => updateStatusBadges(site), 60 * 1000);
  }

  // ========== SOBRE E NÚMEROS ==========
  function renderAbout(site) {
    const mount = $('[data-about]');
    if (!mount) return;
    const [img1, img2] = site.imagens.sobre;
    const g = site.provaSocial.google;
    mount.innerHTML = `
      <div class="about">
        <div class="about__images reveal">
          <span class="about__accent" aria-hidden="true">GB</span>
          <div class="about__img-main">${mediaHTML(img1, 'Ambiente da Good Barber', { mark: 'GB' })}</div>
          <div class="about__img-secondary">${mediaHTML(img2, 'Atendimento na Good Barber', { mark: '' })}</div>
        </div>
        <div class="about__content reveal reveal-d1">
          <p class="section-tag">Sobre a casa</p>
          <h2 class="section-title">${site.textos.sobreTitulo.replace('<em>', '<span class="italic">').replace('</em>', '</span>')}</h2>
          ${site.textos.sobre.map((p) => `<p class="lead">${esc(p)}</p>`).join('')}
          <dl class="stats">
            <div><dt class="visually-hidden">Nota no Google</dt><dd><span class="stat__number" data-count="${g.nota}" data-decimals="1">${formatCount(g.nota, 1)}</span><p class="stat__label">Nota no Google</p></dd></div>
            <div><dt class="visually-hidden">Avaliações</dt><dd><span class="stat__number" data-count="${g.avaliacoes}" data-suffix="+">${g.avaliacoes}+</span><p class="stat__label">Avaliações no Google</p></dd></div>
            <div><dt class="visually-hidden">Barbeiros</dt><dd><span class="stat__number" data-count="${site.numeroBarbeiros}">${site.numeroBarbeiros}</span><p class="stat__label">Barbeiros</p></dd></div>
            <div><dt class="visually-hidden">Funcionamento</dt><dd><span class="stat__number">Seg–Sáb</span><p class="stat__label">08h às 20h</p></dd></div>
          </dl>
        </div>
      </div>`;
  }

  // ========== HERO E GALERIA ==========
  function renderHeroMedia(site) {
    const mount = $('[data-hero-media]');
    if (!mount) return;
    mount.innerHTML = mediaHTML(site.imagens.hero, 'Recepção e salão da Good Barber, no Jardim Europa', {
      mark: 'Good Barber<small>A Barbearia</small>', w: 683, h: 811, eager: true
    });
  }

  function renderGallery(site) {
    const mount = $('[data-gallery]');
    if (!mount) return;
    mount.innerHTML = site.imagens.galeria.map((src, i) => `
      <a class="gallery-strip__item" data-link="instagram" aria-label="Foto ${i + 1} no Instagram ${esc(site.instagram.usuario)}">
        ${mediaHTML(src, `Trabalho da Good Barber, foto ${i + 1}`, { mark: 'GB', w: 600, h: 600 })}
      </a>`).join('');
  }

  // ========== SERVIÇOS ==========
  function serviceCardHTML(s, { withCategory = false, withAction = false, reveal = '' } = {}) {
    return `
      <article class="service-card ${reveal}">
        ${icon(s.icone, 'service-card__icon')}
        ${withCategory ? `<p class="service-card__cat">${esc(s.categoria)}</p>` : ''}
        <h3 class="service-card__name">${esc(s.nome)}</h3>
        <p class="service-card__desc">${esc(s.descricao)}</p>
        <div class="service-card__row">
          ${priceHTML(s.preco)}
          <span class="duration">${icon('relogio')}${esc(s.duracao)}</span>
        </div>
        ${withAction ? `<a class="btn btn--outline btn--sm btn--block service-card__action" data-link="agendamento" aria-label="Agendar ${esc(s.nome)}">Agendar</a>` : ''}
      </article>`;
  }

  function renderFeaturedServices(data) {
    const mount = $('[data-featured-services]');
    if (!mount) return;
    const byId = Object.fromEntries(data.servicos.map((s) => [s.id, s]));
    mount.innerHTML = data.destaques
      .map((id, i) => byId[id] && serviceCardHTML(byId[id], { reveal: `reveal reveal-d${i % 4}` }))
      .filter(Boolean)
      .join('');
  }

  function planHTML(p, club) {
    return `
      <article class="plan ${p.destaque ? 'plan--featured' : ''}">
        ${p.destaque ? '<span class="plan__badge">Mais completo</span>' : ''}
        <p class="plan__label">Good Club</p>
        <h3 class="plan__name">${esc(p.nome)}</h3>
        ${priceHTML(p.preco)}
        <p class="plan__desc">${/^TODO/.test(p.descricao) ? 'Pacote combinado direto com a barbearia. Fale com a gente para saber como funciona.' : esc(p.descricao)}</p>
        <a class="btn ${p.destaque ? 'btn--gold' : 'btn--outline'} btn--block" data-link="whatsappGoodClub" aria-label="Quero o Good Club ${esc(p.nome)}">${icon('whatsapp')}<span>Quero o Good Club</span></a>
      </article>`;
  }

  function renderServicesPage(data, site) {
    const tabsEl = $('[data-tabs]');
    const listEl = $('[data-services-list]');
    const searchEl = $('#busca');
    const infoEl = $('[data-results-info]');
    if (!tabsEl || !listEl) return;

    const cats = ['Todos', ...data.categorias];
    let current = 'Todos';
    const fromHash = decodeURIComponent(location.hash.slice(1));
    const hashCat = cats.find((c) => slug(c) === fromHash);
    if (hashCat) current = hashCat;

    tabsEl.innerHTML = cats.map((c) => `
      <button class="tab" type="button" role="tab" id="tab-${slug(c)}" aria-controls="lista-servicos" aria-selected="${c === current}" tabindex="${c === current ? 0 : -1}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');

    const club = data.goodClub;

    const render = () => {
      const q = normalize(searchEl?.value.trim());
      const match = (txt) => !q || normalize(txt).includes(q);
      const blocks = [];
      let count = 0;

      data.categorias.forEach((cat) => {
        if (current !== 'Todos' && current !== cat) return;
        if (cat === 'Good Club') {
          const plans = club.pacotes.filter((p) => match(`Good Club ${p.nome} pacote assinatura`));
          if (!plans.length) return;
          count += plans.length;
          blocks.push(`
            <section class="category-block" aria-labelledby="cat-${slug(cat)}">
              <div class="club">
                <p class="section-tag">Pacotes</p>
                <h2 class="section-title" id="cat-${slug(cat)}" style="margin-bottom:1rem">Good <span class="italic">Club</span></h2>
                <p class="lead">${esc(club.aviso)}</p>
                <div class="club__grid">${plans.map((p) => planHTML(p, club)).join('')}</div>
              </div>
            </section>`);
          return;
        }
        const items = data.servicos.filter((s) => s.categoria === cat && match(`${s.nome} ${s.descricao} ${s.categoria}`));
        if (!items.length) return;
        count += items.length;
        blocks.push(`
          <section class="category-block" aria-labelledby="cat-${slug(cat)}">
            <h2 class="category-block__title" id="cat-${slug(cat)}">${esc(cat)} <span>${items.length} ${items.length === 1 ? 'serviço' : 'serviços'}</span></h2>
            <div class="services-grid services-grid--list">
              ${items.map((s) => serviceCardHTML(s, { withAction: true })).join('')}
            </div>
          </section>`);
      });

      listEl.setAttribute('aria-labelledby', `tab-${slug(current)}`);
      listEl.innerHTML = blocks.length ? blocks.join('') : `
        <div class="empty-state">
          <p>Nenhum serviço encontrado para "${esc(searchEl.value)}".</p>
          <button class="btn btn--outline btn--sm" type="button" data-clear>Limpar busca</button>
        </div>`;
      applyLinks(site, listEl);
      if (infoEl) infoEl.textContent = q ? `${count} ${count === 1 ? 'resultado' : 'resultados'} para "${searchEl.value.trim()}"` : '';
      $('[data-clear]', listEl)?.addEventListener('click', () => { searchEl.value = ''; render(); searchEl.focus(); });
    };

    const select = (btn, focus) => {
      $$('.tab', tabsEl).forEach((b) => {
        const on = b === btn;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
      });
      current = btn.dataset.cat;
      if (focus) btn.focus();
      btn.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', current === 'Todos' ? location.pathname : `#${slug(current)}`);
      render();
    };

    tabsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab');
      if (btn) select(btn, false);
    });
    tabsEl.addEventListener('keydown', (e) => {
      const tabs = $$('.tab', tabsEl);
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      let n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); select(tabs[n], true); }
    });
    searchEl?.addEventListener('input', render);
    render();
  }

  // ========== EQUIPE ==========
  function renderTeam(team, { full = false } = {}) {
    const mount = $('[data-team]');
    if (!mount) return;
    mount.innerHTML = team.map((m, i) => {
      const photo = m.foto
        ? `<img src="${esc(m.foto)}" alt="${esc(m.nome)}, ${esc(m.funcao.toLowerCase())} da Good Barber" width="${m.largura || 600}" height="${m.altura || 800}" loading="lazy" decoding="async"${m.enquadramento ? ` style="object-position:${esc(m.enquadramento)}"` : ''}>`
        : `<div class="ph" role="img" aria-label="${esc(m.nome)} (foto em breve)"><span class="team-card__initials" aria-hidden="true">${esc(initials(m.nome))}</span></div>`;
      const insta = m.instagram
        ? `<a class="icon-btn" href="https://www.instagram.com/${esc(m.instagram)}" ${ext} aria-label="Instagram de ${esc(m.nome)} (@${esc(m.instagram)})">${icon('instagram')}</a>`
        : '';
      return `
        <article class="team-card reveal reveal-d${i % 4}">
          <div class="team-card__img">${photo}</div>
          <div class="team-card__info">
            <div>
              <h3 class="team-card__name">${esc(m.nome)}</h3>
              <p class="team-card__role">${esc(m.funcao)}</p>
              ${full && m.instagram ? `<p class="team-card__bio"><a class="text-link" style="min-height:auto" href="https://www.instagram.com/${esc(m.instagram)}" ${ext}>@${esc(m.instagram)}${newTab}</a></p>` : ''}
              ${full && m.bio ? `<p class="team-card__bio">${esc(m.bio)}</p>` : ''}
            </div>
            ${insta}
          </div>
        </article>`;
    }).join('');
  }

  // ========== DEPOIMENTOS ==========
  function starsHTML(n, label = true) {
    return `<div class="stars"${label ? ` role="img" aria-label="Nota ${n} de 5"` : ' aria-hidden="true"'}>${Array.from({ length: 5 }, (_, i) => icon(i < n ? 'estrela-cheia' : 'estrela')).join('')}</div>`;
  }

  function renderTestimonials(list, site) {
    const mount = $('[data-testimonials]');
    if (!mount) return;
    // Regra: só aparece no site o depoimento com "verificado": true.
    const items = list.filter((t) => t.verificado === true);
    const g = site.provaSocial.google;

    if (!items.length) {
      mount.innerHTML = `
        <div class="rating-highlight reveal">
          <p class="rating-highlight__score">${formatCount(g.nota, 1)}</p>
          ${starsHTML(Math.round(g.nota))}
          <p class="rating-highlight__text">Avaliado por clientes no Google</p>
          <p class="rating-highlight__sub">${esc(g.texto)}</p>
          <a class="btn btn--outline" data-link="avaliacoes">${icon('externo')}<span>Ver avaliações no Google</span></a>
        </div>`;
      return;
    }

    mount.innerHTML = `
      <div class="slider reveal" role="region" aria-roledescription="carrossel" aria-label="Depoimentos de clientes" tabindex="0">
        <div class="slider__viewport" aria-live="off">
          ${items.map((t, i) => `
            <figure class="slide${i === 0 ? ' active' : ''}" role="group" aria-roledescription="depoimento" aria-label="${i + 1} de ${items.length}"${i === 0 ? '' : ' hidden'}>
              ${starsHTML(t.nota)}
              <blockquote class="slide__quote">“${esc(t.texto)}”</blockquote>
              <figcaption>
                <p class="slide__name">${esc(t.nome)}</p>
                <p class="slide__origin">${esc(t.origem)}</p>
              </figcaption>
            </figure>`).join('')}
        </div>
        ${items.length > 1 ? `
        <div class="slider__controls">
          <button class="icon-btn slider__arrow" type="button" data-prev aria-label="Depoimento anterior">${icon('esquerda')}</button>
          <div class="slider__dots">
            ${items.map((_, i) => `<button class="slider__dot" type="button" data-dot="${i}" aria-label="Ir para o depoimento ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('')}
          </div>
          <button class="icon-btn slider__arrow" type="button" data-next aria-label="Próximo depoimento">${icon('direita')}</button>
        </div>` : ''}
      </div>`;
    if (items.length > 1) initSlider($('.slider', mount));
  }

  function initSlider(slider) {
    const slides = $$('.slide', slider);
    const dots = $$('[data-dot]', slider);
    const viewport = $('.slider__viewport', slider);
    let index = 0;
    let timer = null;
    let paused = false;
    const DELAY = 6000;

    const go = (n, announce = false) => {
      index = (n + slides.length) % slides.length;
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
        s.hidden = i !== index;
      });
      dots.forEach((d, i) => (i === index ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
      // Anuncia a troca só quando a pessoa pediu (setas, pontos, teclado), não na troca automática.
      viewport.setAttribute('aria-live', announce ? 'polite' : 'off');
    };

    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => {
      stop();
      if (reduceMotion || paused) return;
      timer = setInterval(() => go(index + 1), DELAY);
    };

    $('[data-prev]', slider).addEventListener('click', () => { go(index - 1, true); start(); });
    $('[data-next]', slider).addEventListener('click', () => { go(index + 1, true); start(); });
    dots.forEach((d) => d.addEventListener('click', () => { go(Number(d.dataset.dot), true); start(); }));

    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1, true); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1, true); }
    });

    // Pausa ao passar o mouse ou focar
    slider.addEventListener('mouseenter', () => { paused = true; stop(); });
    slider.addEventListener('mouseleave', () => { paused = false; start(); });
    slider.addEventListener('focusin', () => { paused = true; stop(); });
    slider.addEventListener('focusout', (e) => {
      if (!slider.contains(e.relatedTarget)) { paused = false; start(); }
    });

    // Deslizar com o dedo
    let x0 = null;
    let y0 = null;
    slider.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; stop(); }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1), true);
      x0 = y0 = null;
      start();
    });

    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    start();
  }

  // ========== INFORMAÇÕES (pagamento, facilidades, como chegar) ==========
  function facilityIcon(txt) {
    const t = normalize(txt);
    if (t.includes('wi-fi') || t.includes('wifi')) return 'wifi';
    if (t.includes('estacionamento')) return 'estacionamento';
    if (t.includes('bar') || t.includes('lanchonete')) return 'cafe';
    if (t.includes('tv')) return 'tv';
    if (t.includes('crianc') || t.includes('adulto')) return 'pessoas';
    return 'info';
  }
  function paymentIcon(txt) {
    const t = normalize(txt);
    if (t.includes('pix')) return 'pix';
    if (t.includes('dinheiro')) return 'dinheiro';
    return 'cartao';
  }

  function renderInfo(site) {
    const mount = $('[data-info]');
    if (!mount) return;
    mount.innerHTML = `
      <div class="info-block reveal">
        <h3 class="info-block__title">${icon('rota')}Como chegar</h3>
        ${site.textos.comoChegar.map((p) => `<p>${esc(p)}</p>`).join('')}
        <p style="margin-top:1.25rem"><a class="text-link" data-link="comoChegar">Abrir rota no Google Maps ${icon('seta')}</a></p>
      </div>
      <div class="info-block reveal reveal-d1">
        <h3 class="info-block__title">${icon('cartao')}Pagamento</h3>
        <ul class="chips">${site.pagamento.map((p) => `<li class="chip">${icon(paymentIcon(p))}${esc(p)}</li>`).join('')}</ul>
      </div>
      <div class="info-block reveal reveal-d2">
        <h3 class="info-block__title">${icon('estrela')}Facilidades</h3>
        <ul class="chips">${site.facilidades.map((f) => `<li class="chip">${icon(facilityIcon(f))}${esc(f)}</li>`).join('')}</ul>
      </div>`;
  }

  // ========== DADOS ESTRUTURADOS (JSON-LD) ==========
  function renderJsonLd(site) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const groups = {};
    site.horarios.forEach((h, i) => {
      if (!h.abre) return;
      const k = `${h.abre}-${h.fecha}`;
      (groups[k] = groups[k] || []).push(days[i]);
    });
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'BarberShop',
      name: site.nome,
      slogan: site.frase,
      url: `${location.origin}/`,
      telephone: site.telefone.link.replace('tel:', ''),
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.endereco.logradouro,
        addressLocality: site.endereco.cidade,
        addressRegion: site.endereco.uf,
        postalCode: site.endereco.cep,
        addressCountry: 'BR'
      },
      geo: { '@type': 'GeoCoordinates', latitude: site.coordenadas.lat, longitude: site.coordenadas.lng },
      openingHoursSpecification: Object.entries(groups).map(([k, d]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: d,
        opens: k.split('-')[0],
        closes: k.split('-')[1]
      })),
      paymentAccepted: site.pagamento.join(', '),
      sameAs: [site.instagram.url],
      potentialAction: { '@type': 'ReserveAction', target: site.agendamento }
    };
    if (site.logo) ld.image = new URL(site.logo, location.href).href;
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  // ========== INICIALIZAÇÃO ==========
  function showLoadError(err) {
    console.error(err);
    const main = $('main');
    if (!main) return;
    const box = document.createElement('div');
    box.className = 'container';
    box.innerHTML = `<p class="notice" role="alert" style="margin:7rem 0 2rem">${icon('info')}<span>Não foi possível carregar o conteúdo do site. Se você abriu o arquivo direto do computador, rode <code>npx serve .</code> na pasta do projeto e acesse pelo endereço que aparecer.</span></p>`;
    main.prepend(box);
  }

  async function init() {
    initMarquee();
    const needs = ['site'];
    if (page === 'inicio' || page === 'servicos') needs.push('services');
    if (page === 'inicio' || page === 'equipe') needs.push('team');
    if (page === 'inicio') needs.push('testimonials');

    let data;
    try {
      const loaded = await Promise.all(needs.map(loadJSON));
      data = Object.fromEntries(needs.map((n, i) => [n, loaded[i]]));
    } catch (err) {
      showLoadError(err);
      initReveal();
      return;
    }
    const { site } = data;

    renderHeader(site);
    renderFooter(site);
    renderHeroMedia(site);
    renderAbout(site);
    renderGallery(site);
    renderLocation(site);
    renderInfo(site);
    if (data.services) {
      renderFeaturedServices(data.services);
      renderServicesPage(data.services, site);
    }
    if (data.team) renderTeam(data.team, { full: page === 'equipe' });
    if (data.testimonials) renderTestimonials(data.testimonials, site);
    if (page !== 'erro') renderJsonLd(site);

    applyTexts(site);
    applyLinks(site);
    initNav();
    initReveal();
    initCounters();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
