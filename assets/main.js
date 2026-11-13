// Script compartilhado pela home e pelas páginas de case: cada bloco só roda se a seção dele existir na página
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2, '0');

// Globo em wireframe: meridianos são elipses cuja largura oscila, simulando rotação
const SVG_NS = 'http://www.w3.org/2000/svg';
const globes = [...document.querySelectorAll('svg.globe')].map(svg => {
  const color = svg.dataset.color, stroke = svg.dataset.stroke;
  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('fill', 'none');
  g.setAttribute('stroke', color);
  g.setAttribute('stroke-width', stroke);
  g.setAttribute('vector-effect', 'non-scaling-stroke');
  svg.appendChild(g);
  const add = (tag, attrs) => {
    const el = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    g.appendChild(el);
    return el;
  };
  add('circle', { cx: 50, cy: 50, r: 48 });
  for (const lat of [-60, -30, 0, 30, 60]) {
    const rad = lat * Math.PI / 180;
    const y = 50 + 48 * Math.sin(rad), rx = 48 * Math.cos(rad);
    add('ellipse', { cx: 50, cy: y, rx, ry: rx * 0.12 });
  }
  const meridians = Array.from({ length: 6 }, () => add('ellipse', { cx: 50, cy: 50, rx: 0, ry: 48 }));
  return { meridians };
});
const drawGlobes = t => {
  for (const { meridians } of globes) {
    meridians.forEach((m, i) => {
      const phase = t / 4000 + (i * Math.PI) / meridians.length;
      m.setAttribute('rx', Math.abs(48 * Math.cos(phase)).toFixed(2));
    });
  }
};
if (reduceMotion) drawGlobes(0);
else (function loop(t) { drawGlobes(t); requestAnimationFrame(loop); })(0);

// Projetos: para adicionar um site, tire o print (1440x900) em prints/ e inclua uma linha aqui
// cat: chave de CATEGORIES; isNew: selo "Novo"; label: texto no lugar do endereço
// wide: card largo no mosaico; wideMd: largo só com 2 colunas (ajuste para a grade fechar sem buracos)
// url de site externo abre no visualizador; url de página .html (case) abre na mesma aba
const CATEGORIES = { produto: 'Produto & UX', branding: 'Branding', saude: 'Saúde', beleza: 'Beleza & varejo', negocios: 'Negócios', servicos: 'Serviços & indústria' };
const PROJECTS = [
  { name: 'Mechas Contour', url: 'https://mechas-contour-site.vercel.app/', label: 'Landing page · Beleza & conversão', img: 'mechascontour', imgUrl: 'prints/mechascontour.png', seg: 'Beleza · Landing page · Mechas Contour', cat: 'beleza', isNew: true, wideMd: true },
  { name: 'Abreu Oliveira', url: 'abreu-oliveira.html', label: 'Case · Landing page para tráfego pago', img: 'abreuoliveira', seg: 'Advocacia · Landing page · ~30 contratos/mês', cat: 'negocios', isNew: true },
  { name: 'Atlantec', url: 'atlantec.html', label: 'Case · Reestruturação de catálogo', img: 'atlantec', seg: 'Instrumentação oceanográfica · Catálogo B2B', cat: 'servicos', isNew: true },
  { name: 'Grupo Brasil', url: 'grupo-brasil.html', label: 'Case · Rebranding, site e blog', img: 'grupobrasilservicos', seg: 'Terceirização · Rebranding e conteúdo', cat: 'servicos', isNew: true },
  { name: 'Hooney V2', url: 'hooney.html', label: 'Case UX/UI · MVP no Figma', img: 'hooney', seg: 'Produto · App mobile · UX/UI', cat: 'produto', isNew: true },
  { name: 'WebQuarto V2', url: 'webquarto.html', label: 'Case UX/UI · MVP no Figma', img: 'webquarto', seg: 'Produto · Reserva de quartos · UX/UI', cat: 'produto', isNew: true },
  { name: 'MoradiaMatch', url: 'moradiamatch.html', label: 'Case UX/UI · MVP no Figma', img: 'moradiamatch', seg: 'Produto · App de locação · UX/UI', cat: 'produto', isNew: true },
  { name: 'Escalada Digital', url: 'https://escaladadigital.vercel.app', img: 'escaladadigital', seg: 'Marketing & performance', cat: 'negocios', isNew: true, wideMd: true },
  { name: 'Ótica da Ilha', url: 'https://oticadalinha.vercel.app', img: 'oticadalinha', seg: 'Ótica · Armações e lentes', cat: 'beleza', isNew: true },
  { name: 'Beeviral', url: 'beeviral.html', label: 'Manual de marca · 31 páginas', img: 'beeviral', seg: 'Branding · Manual de marca e identidade visual', cat: 'branding', wide: true },
  { name: 'Ana Podocare', url: 'https://anapodocare.com', img: 'anapodocare', seg: 'Podologia · Londres', cat: 'saude' },
  { name: 'Perfezione Clinic', url: 'https://perfezioneclinic.com', img: 'perfezioneclinic', seg: 'Estética · Madri', cat: 'saude' },
  { name: "Fernand's Hair", url: 'https://fernandshair.com.br', img: 'fernandshair', seg: 'Beleza · Mega hair', cat: 'beleza' },
  { name: 'Val Pereira', url: 'https://valddtdst.com.br', img: 'valddtdst', seg: 'Dedetização e desentupimento', cat: 'servicos' },
  { name: 'Silva Leão', url: 'https://silvaleaocontabilidade.com.br', img: 'silvaleaocontabilidade', seg: 'Assessoria contábil', cat: 'negocios' },
  { name: 'NeuroAprender Brasil', url: 'https://neuroaprenderbrasil.com.br', img: 'neuroaprenderbrasil', seg: 'Clínica e contraturno', cat: 'saude' },
  { name: 'Lavinia Imóveis', url: 'https://laviniaimoveis.com.br', img: 'laviniaimoveis', seg: 'Imobiliária · Alphaville', cat: 'negocios' },
  { name: 'Cinthia Melo', url: 'https://cinthiamelonutri.com.br', img: 'cinthiamelonutri', seg: 'Nutrição infantil', cat: 'saude' },
];
const isExternal = p => /^https?:/.test(p.url);
const printUrl = p => p.imgUrl || `prints/${p.img}.webp`;
const host = p => p.label || p.url.replace('https://', '');
const arrow = cls => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M8 7h9v9"/></svg>`;
const badge = p => p.isNew ? '<span class="badge">Novo</span>' : '';
const browser = (p, lazy) => `
  <div class="browser">
    <div class="browser__bar"><i></i><i></i><i></i><span class="browser__url">${host(p)}</span></div>
    <div class="browser__view"><img src="${printUrl(p)}" alt="Página inicial do site ${p.name}"${lazy ? ' loading="lazy"' : ''} decoding="async" width="1200" height="750"></div>
  </div>`;

// Lista de trabalhos (só na home): índice, mosaico, filtros, preview e visualizador de site
const indexEl = document.querySelector('.js-index');
const mosaicEl = document.querySelector('.js-mosaic');
if (indexEl) {
  indexEl.innerHTML = PROJECTS.map((p, i) => `
    <li data-cat="${p.cat}">
      <a class="row" href="${p.url}" data-i="${i}">
        <span class="row__num">${pad(i + 1)}</span>
        <span class="row__name">${p.name}${badge(p)}</span>
        <span class="row__seg">${p.seg}</span>
        <span class="row__url">${host(p)}</span>
        ${arrow('row__arrow')}
      </a>
    </li>`).join('');
  mosaicEl.innerHTML = PROJECTS.map((p, i) => `
    <a class="tile${p.wide ? ' tile--wide' : ''}${p.wideMd ? ' tile--wide-md' : ''}" href="${p.url}" data-cat="${p.cat}" data-i="${i}">
      ${browser(p, true)}
      <div class="tile__meta">
        <div><h3>${p.name}${badge(p)}</h3><p class="tile__seg">${p.seg}</p></div>
        <span class="tile__num">${pad(i + 1)}</span>
      </div>
    </a>`).join('');

  // Filtros por segmento
  const countEl = document.querySelector('.js-count');
  const filtersEl = document.querySelector('.js-filters');
  const counts = PROJECTS.reduce((acc, p) => (acc[p.cat] = (acc[p.cat] || 0) + 1, acc), {});
  filtersEl.innerHTML = [['all', 'Todos', PROJECTS.length], ...Object.entries(CATEGORIES).map(([k, v]) => [k, v, counts[k] || 0])]
    .map(([k, label, n]) => `<button class="chip" type="button" data-filter="${k}" aria-pressed="${k === 'all'}">${label}<sup>${n}</sup></button>`).join('');
  const applyFilter = cat => {
    filtersEl.querySelectorAll('.chip').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === cat)));
    document.querySelectorAll('.js-index > li, .js-mosaic > .tile').forEach(el => {
      const match = cat === 'all' || el.dataset.cat === cat;
      el.classList.toggle('is-filtered', !match);
      el.classList.remove('pop');
      if (match) { void el.offsetWidth; el.classList.add('pop'); }
    });
    mosaicEl.classList.toggle('is-all', cat === 'all');
    countEl.textContent = pad(indexEl.querySelectorAll('li:not(.is-filtered)').length);
  };
  filtersEl.addEventListener('click', e => { const b = e.target.closest('[data-filter]'); if (b) applyFilter(b.dataset.filter); });
  countEl.textContent = pad(PROJECTS.length);

  // Índice ↔ Mosaico (em telas de toque, que não têm o preview no hover, começa no mosaico)
  const viewBtns = document.querySelectorAll('[data-view]');
  const setView = view => {
    viewBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
    indexEl.hidden = view !== 'index';
    mosaicEl.hidden = view !== 'mosaic';
  };
  viewBtns.forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
  if (!matchMedia('(hover: hover)').matches) setView('mosaic');

  // Preview flutuante do Índice: segue o cursor com atraso e inclina conforme a velocidade
  const peek = document.querySelector('.peek');
  const peekImg = peek.querySelector('img');
  const peekUrl = peek.querySelector('.browser__url');
  const pos = { x: 0, y: 0, tx: 0, ty: 0 };
  let peekIdx = -1, peeking = false;
  const showPeek = i => {
    if (i !== peekIdx) {
      const p = PROJECTS[i];
      peekImg.src = printUrl(p);
      peekImg.style.animation = 'none'; void peekImg.offsetWidth; peekImg.style.animation = '';
      peekUrl.textContent = host(p);
      peekIdx = i;
    }
    if (!peeking) { peeking = true; peek.classList.add('is-on'); requestAnimationFrame(followPeek); }
  };
  const hidePeek = () => { peeking = false; peek.classList.remove('is-on'); };
  const followPeek = () => {
    const w = peek.offsetWidth, h = peek.offsetHeight;
    // Fica à direita do cursor e vira para a esquerda perto da borda
    const x = pos.tx + 40 + w > innerWidth ? pos.tx - w - 40 : pos.tx + 40;
    const y = Math.min(Math.max(pos.ty - h / 2, 12), innerHeight - h - 12);
    const dx = x - pos.x;
    pos.x += dx * (reduceMotion ? 1 : .14);
    pos.y += (y - pos.y) * (reduceMotion ? 1 : .14);
    const tilt = reduceMotion ? 0 : Math.max(-12, Math.min(12, dx * .08));
    peek.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${tilt}deg)`;
    if (peeking) requestAnimationFrame(followPeek);
  };
  indexEl.addEventListener('pointermove', e => {
    const row = e.target.closest('.row');
    if (!row || e.pointerType !== 'mouse') return;
    if (!peeking) { pos.x = e.clientX + 40; pos.y = e.clientY - 120; }
    pos.tx = e.clientX; pos.ty = e.clientY;
    showPeek(+row.dataset.i);
  });
  indexEl.addEventListener('pointerleave', hidePeek);
  indexEl.addEventListener('focusin', e => {
    const row = e.target.closest('.row');
    if (!row) return;
    const r = row.getBoundingClientRect();
    pos.tx = r.left + r.width * .55; pos.ty = r.top + r.height / 2;
    showPeek(+row.dataset.i);
  });
  indexEl.addEventListener('focusout', hidePeek);
  addEventListener('scroll', () => { if (peeking && !indexEl.matches(':hover')) hidePeek(); }, { passive: true });

  // Inclinação 3D dos cards do mosaico
  mosaicEl.addEventListener('pointermove', e => {
    const tile = e.target.closest('.tile');
    if (!tile || reduceMotion) return;
    const r = tile.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    tile.style.setProperty('--ry', `${px * 10}deg`);
    tile.style.setProperty('--rx', `${-py * 10}deg`);
  });
  mosaicEl.addEventListener('pointerout', e => {
    const tile = e.target.closest('.tile');
    if (tile && !tile.contains(e.relatedTarget)) { tile.style.removeProperty('--rx'); tile.style.removeProperty('--ry'); }
  });

  // Visualizador na mesma aba: o site do projeto abre ao vivo numa janela sobre o portfólio.
  // Cases (.html) navegam normalmente; Ctrl/Cmd/Shift + clique e botão do meio continuam abrindo em nova aba.
  const modal = document.querySelector('.js-site');
  const frame = modal.querySelector('.js-site-frame');
  const view = modal.querySelector('.site__view');
  const external = PROJECTS.map((p, i) => i).filter(i => isExternal(PROJECTS[i]));
  let cur = -1, lastFocus = null;

  const show = i => {
    const p = PROJECTS[i];
    cur = i;
    modal.querySelector('.js-site-name').innerHTML = p.name + badge(p);
    modal.querySelector('.js-site-seg').textContent = p.seg;
    modal.querySelector('.js-site-url').textContent = host(p);
    modal.querySelector('.js-site-open').href = p.url;
    frame.title = `Site ${p.name}`;
    view.classList.remove('is-loaded');
    frame.src = p.url;
  };
  const open = i => {
    lastFocus = document.activeElement;
    hidePeek();
    show(i);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.js-site-close').focus();
  };
  const close = () => {
    modal.hidden = true;
    frame.src = 'about:blank';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };
  const step = dir => {
    const k = external.indexOf(cur);
    show(external[(k + dir + external.length) % external.length]);
  };
  frame.addEventListener('load', () => { if (frame.src !== 'about:blank') view.classList.add('is-loaded'); });

  [indexEl, mosaicEl].forEach(list => list.addEventListener('click', e => {
    const a = e.target.closest('a[data-i]');
    if (!a || !isExternal(PROJECTS[+a.dataset.i])) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    open(+a.dataset.i);
  }));
  modal.querySelector('.js-site-close').addEventListener('click', close);
  modal.querySelector('.js-site-prev').addEventListener('click', () => step(-1));
  modal.querySelector('.js-site-next').addEventListener('click', () => step(1));
  modal.querySelectorAll('[data-device]').forEach(b => b.addEventListener('click', () => {
    modal.classList.toggle('is-mobile', b.dataset.device === 'mobile');
    modal.querySelectorAll('[data-device]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));
  addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
}

// Faixa do hero: prints de todos os projetos, duplicados para o marquee não ter emenda
const track = document.querySelector('.strip__track');
if (track) {
  track.innerHTML = PROJECTS.map(p => `<div class="strip__tile"><img src="${printUrl(p)}" alt="" decoding="async" width="1200" height="750"><span>${p.name}</span></div>`).join('');
  track.innerHTML += track.innerHTML;
}

// Menu em tela cheia
const menu = document.getElementById('menu');
const menuBtn = document.querySelector('.nav__menu-btn');
if (menu && menuBtn) {
  const setMenu = open => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenu(true));
  menu.querySelector('.menu__close').addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });
}

// Título que acende palavra por palavra conforme a rolagem
const para = document.querySelector('.js-words');
if (para) {
  para.innerHTML = para.textContent.trim().split(/\s+/).map(w => `<span class="word">${w}</span>`).join(' ');
  const words = para.querySelectorAll('.word');
  const lightWords = () => {
    const r = para.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
    const lit = Math.round(progress * words.length);
    words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
  };
  addEventListener('scroll', lightWords, { passive: true });
  lightWords();
}

// Revelação ao entrar na tela
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

// Chegando de outra página com âncora (ex.: "Voltar aos trabalhos"): as imagens que carregam depois
// empurram a seção para baixo, então reposiciona quando a página termina de carregar
if (location.hash.length > 1) {
  addEventListener('load', () => {
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
}

// Foto do Sobre: "explosão" de pixels ao entrar + lente pixelada que segue o mouse.
// Pixeliza reduzindo e ampliando a imagem (sem ler pixels), então funciona até abrindo o arquivo direto.
(() => {
  const box = document.querySelector('.js-pixel');
  if (!box) return;
  const img = box.querySelector('img');
  const cv = box.querySelector('canvas');
  const c = cv.getContext('2d');
  const base = document.createElement('canvas'), small = document.createElement('canvas');
  const LENS_BLOCK = 12;
  let W = 0, H = 0, mx = -999, my = -999, enterAt = 0, active = false, running = false;

  const prepare = () => {
    W = cv.width = base.width = box.clientWidth;
    H = cv.height = base.height = box.clientHeight;
    // Mesmo enquadramento do <img>: object-fit cover, object-position 50% 30%
    const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
    base.getContext('2d').drawImage(img, (W - dw) * .5, (H - dh) * .3, dw, dh);
  };
  const pixelated = block => {
    small.width = Math.ceil(W / block); small.height = Math.ceil(H / block);
    small.getContext('2d').drawImage(base, 0, 0, small.width, small.height);
    c.imageSmoothingEnabled = false;
    c.drawImage(small, 0, 0, small.width * block, small.height * block);
  };
  const hash = (a, b, t) => (((a * 73856093) ^ (b * 19349663) ^ (t * 83492791)) >>> 0) % 1000 / 1000;

  const draw = now => {
    const t = reduceMotion ? 1 : Math.min(1, (now - enterAt) / 650);
    const burst = Math.round(56 * (1 - t) ** 2);
    if (burst > 2) pixelated(burst); else c.drawImage(base, 0, 0);

    // Lente: células dentro do raio, com borda irregular, grade de "LED" e alguns pixels verdes piscando
    const R = Math.min(W, H) * .3, b = LENS_BLOCK, tick = Math.floor(now / 110);
    const lens = new Path2D(), greens = [];
    for (let y = Math.floor((my - R) / b) * b; y < my + R; y += b) {
      for (let x = Math.floor((mx - R) / b) * b; x < mx + R; x += b) {
        const d = Math.hypot(x + b / 2 - mx, y + b / 2 - my);
        if (d > R || (d > R * .7 && hash(x / b, y / b, 0) < (d / R - .7) * 3)) continue;
        lens.rect(x, y, b, b);
        if (hash(x / b, y / b, tick) < .05) greens.push([x, y]);
      }
    }
    c.save();
    c.clip(lens);
    pixelated(b);
    c.fillStyle = '#000';
    for (let x = Math.floor((mx - R) / b) * b; x < mx + R; x += b) c.fillRect(x, my - R, 1, R * 2);
    for (let y = Math.floor((my - R) / b) * b; y < my + R; y += b) c.fillRect(mx - R, y, R * 2, 1);
    c.fillStyle = 'rgba(165, 124, 255, .9)';
    greens.forEach(([x, y]) => c.fillRect(x + 1, y + 1, b - 1, b - 1));
    c.restore();

    if (active || t < 1) requestAnimationFrame(draw); else running = false;
  };
  const enter = (x, y) => {
    if (!img.complete || !img.naturalWidth) return;
    if (box.clientWidth !== W || box.clientHeight !== H) prepare();
    mx = x; my = y; enterAt = performance.now(); active = true;
    box.classList.add('is-pixel');
    if (!running) { running = true; requestAnimationFrame(draw); }
  };
  const leave = () => { active = false; box.classList.remove('is-pixel'); };
  const local = e => { const r = box.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };

  box.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') enter(...local(e)); });
  box.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') [mx, my] = local(e); });
  box.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') leave(); });
  // No toque, o efeito roda por um instante onde o dedo encostou
  box.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') return;
    enter(...local(e));
    setTimeout(leave, 1400);
  });
})();

// Case Hooney: só carrega o protótipo do Figma (pesado) quando a seção chega perto da tela
(() => {
  const frame = document.querySelector('.js-proto');
  if (!frame) return;
  const loading = frame.parentElement.querySelector('.proto__loading');
  frame.addEventListener('load', () => { setTimeout(() => loading.hidden = true, 1500); });
  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    frame.src = frame.dataset.src;
    obs.disconnect();
  }, { rootMargin: '600px 0px' }).observe(frame);
})();

// Case de landing page: site ao vivo (carrega perto da tela) com alternância Desktop/Mobile
(() => {
  const live = document.querySelector('.js-live');
  if (!live) return;
  const frame = live.querySelector('iframe');
  const view = live.querySelector('.site__view');
  frame.addEventListener('load', () => view.classList.add('is-loaded'));
  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    frame.src = frame.dataset.src;
    obs.disconnect();
  }, { rootMargin: '600px 0px' }).observe(live);
  live.querySelectorAll('[data-device]').forEach(b => b.addEventListener('click', () => {
    live.classList.toggle('is-mobile', b.dataset.device === 'mobile');
    live.querySelectorAll('[data-device]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));
})();

// Manual de marca: carrossel 3D (coverflow) + tela cheia com virada de página
(() => {
  const flow = document.querySelector('.flow');
  if (!flow) return;
  const TOTAL = 31;
  const src = i => `manual/pages/p${pad(i + 1)}.webp`;       // 1600px, só na tela cheia
  const thumb = i => `manual/pages/sm/p${pad(i + 1)}.webp`;  // 820px, no carrossel
  const stage = document.querySelector('.js-flow');
  const range = document.querySelector('.js-flow-range');
  const num = document.querySelector('.js-flow-num');
  document.querySelectorAll('.js-flow-total').forEach(el => el.textContent = TOTAL);
  range.max = TOTAL;
  stage.innerHTML = Array.from({ length: TOTAL }, (_, i) =>
    `<button class="flow__page" type="button" data-i="${i}" tabindex="-1" aria-label="Página ${i + 1}">
      <img data-src="${thumb(i)}" decoding="async" alt="Página ${i + 1} do manual de marca Beeviral" draggable="false">
    </button>`).join('');
  const pages = [...stage.children];
  let cur = 0;

  const layout = () => {
    const mobile = innerWidth < 768;
    pages.forEach((el, i) => {
      const d = i - cur, a = Math.abs(d), s = Math.sign(d);
      // Página da frente reta; as outras se afastam em leque, giradas para o centro
      // Profundidade folgada para a borda das vizinhas nunca passar à frente da página atual, mesmo com a inclinação
      const x = d === 0 ? 0 : s * ((mobile ? 34 : 52) + a * (mobile ? 8 : 13));
      const z = d === 0 ? 0 : -300 - a * 90;
      const ry = d === 0 ? 0 : -s * Math.min(50, 35 + a * 4);
      el.style.transform = `translateX(${x}%) translateZ(${z}px) rotateY(${ry}deg)`;
      el.style.zIndex = 100 - a;
      el.style.opacity = a > 5 ? 0 : 1 - a * .1;
      el.style.visibility = a > 5 ? 'hidden' : '';
      el.classList.toggle('is-current', d === 0);
      el.classList.toggle('is-near', a <= 2);
      const img = el.querySelector('img');
      if (a <= 5 && !img.src) img.src = img.dataset.src;   // carrega só as páginas próximas
    });
    num.textContent = pad(cur + 1);
    range.value = cur + 1;
  };
  const go = i => { cur = Math.max(0, Math.min(TOTAL - 1, i)); layout(); };

  document.querySelector('.js-flow-prev').addEventListener('click', () => go(cur - 1));
  document.querySelector('.js-flow-next').addEventListener('click', () => go(cur + 1));
  range.addEventListener('input', () => go(range.value - 1));
  flow.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { go(cur - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { go(cur + 1); e.preventDefault(); }
    if (e.key === 'Enter') openViewer(cur);
  });

  // Arrastar / deslizar: cada ~90px muda uma página; clique sem arrasto abre ou navega
  let downX = null, startCur = 0, dragged = false;
  flow.addEventListener('pointerdown', e => { downX = e.clientX; startCur = cur; dragged = false; });
  addEventListener('pointermove', e => {
    if (downX === null) return;
    const steps = Math.round((downX - e.clientX) / 90);
    if (steps) dragged = true;
    if (startCur + steps !== cur) go(startCur + steps);
  });
  addEventListener('pointerup', () => { downX = null; });
  stage.addEventListener('click', e => {
    const page = e.target.closest('.flow__page');
    if (!page || dragged) return;
    const i = +page.dataset.i;
    i === cur ? openViewer(i) : go(i);
  });

  // Leve inclinação do palco acompanhando o mouse
  flow.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || reduceMotion || downX !== null) return;
    const r = flow.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    stage.style.transform = `rotateX(${-py * 4}deg) rotateY(${px * 5}deg)`;
  });
  flow.addEventListener('pointerleave', () => { stage.style.transform = ''; });
  addEventListener('resize', layout);
  layout();

  // Tela cheia
  const viewer = document.querySelector('.js-viewer');
  const vImg = document.querySelector('.js-viewer-img');
  const vNum = document.querySelector('.js-viewer-num');
  let vCur = 0, flipping = false, lastFocus = null;
  const setPage = i => {
    vCur = i; vImg.src = src(i); vImg.alt = `Página ${i + 1} do manual de marca Beeviral`;
    vNum.textContent = pad(i + 1);
    [i - 1, i + 1].filter(n => n >= 0 && n < TOTAL).forEach(n => { new Image().src = src(n); });  // pré-carrega vizinhas
  };
  const flip = async dir => {
    const next = vCur + dir;
    if (next < 0 || next >= TOTAL || flipping) return;
    if (reduceMotion) { setPage(next); go(next); return; }
    flipping = true;
    const out = vImg.animate([{ transform: 'rotateY(0)' }, { transform: `rotateY(${-dir * 90}deg)`, filter: 'brightness(.5)' }],
      { duration: 220, easing: 'cubic-bezier(.6, 0, .9, .4)' });
    await out.finished;
    setPage(next); go(next);
    await vImg.decode().catch(() => {});
    await vImg.animate([{ transform: `rotateY(${dir * 90}deg)`, filter: 'brightness(.5)' }, { transform: 'rotateY(0)' }],
      { duration: 260, easing: 'cubic-bezier(.1, .6, .4, 1)' }).finished;
    flipping = false;
  };
  function openViewer(i) {
    lastFocus = document.activeElement;
    setPage(i);
    viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    viewer.querySelector('.js-viewer-close').focus();
    if (!reduceMotion) vImg.animate([{ transform: 'scale(.85) rotateX(12deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 400, easing: 'cubic-bezier(.2, .7, .2, 1)' });
  }
  const closeViewer = () => {
    viewer.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };
  document.querySelector('.js-flow-open').addEventListener('click', () => openViewer(cur));
  document.querySelector('.js-viewer-close').addEventListener('click', closeViewer);
  document.querySelector('.js-viewer-prev').addEventListener('click', () => flip(-1));
  document.querySelector('.js-viewer-next').addEventListener('click', () => flip(1));
  viewer.addEventListener('click', e => { if (e.target === viewer || e.target.classList.contains('viewer__stage')) closeViewer(); });
  addEventListener('keydown', e => {
    if (viewer.hidden) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowLeft') flip(-1);
    if (e.key === 'ArrowRight') flip(1);
  });
  let vDown = null;
  viewer.addEventListener('pointerdown', e => { vDown = e.clientX; });
  viewer.addEventListener('pointerup', e => {
    if (vDown !== null && Math.abs(e.clientX - vDown) > 60) flip(e.clientX < vDown ? 1 : -1);
    vDown = null;
  });
})();

// WhatsApp: número com DDI 55 + DDD 49, e mensagem já preenchida
const WHATSAPP = '5549999631780';
const WHATSAPP_MSG = 'Olá, Pedro! Vi seu portfólio e gostaria de conversar sobre uma oportunidade.';
document.querySelectorAll('.js-whats').forEach(a => a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MSG)}`);

const LINKEDIN = 'https://www.linkedin.com/in/pedro-henrique-coelho-de-souza-8a600a289/';
document.querySelectorAll('.js-linkedin').forEach(a => a.href = LINKEDIN);

// Faixa de ferramentas: duplica os itens para o loop ficar contínuo
const toolsTrack = document.querySelector('.tools__track');
if (toolsTrack) toolsTrack.innerHTML += toolsTrack.innerHTML.replace(/<li>/g, '<li aria-hidden="true">');

// Hero futurista: a luz de fundo acompanha o mouse
const futureHero = document.querySelector('.hero--future');
if (futureHero && !reduceMotion && matchMedia('(hover: hover)').matches) {
  futureHero.addEventListener('pointermove', e => {
    const r = futureHero.getBoundingClientRect();
    futureHero.style.setProperty('--mx', `${e.clientX - r.left}px`);
    futureHero.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
}

// Etiqueta "Você" piscando que acompanha o ponteiro do mouse (só com mouse)
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const tag = document.createElement('span');
  tag.className = 'you-tag';
  tag.setAttribute('aria-hidden', 'true');
  tag.textContent = 'Você';
  document.body.appendChild(tag);
  // Posiciona na hora, sem atraso, colada na ponta da seta
  const move = e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    tag.style.transform = `translate3d(${e.clientX + 12}px, ${e.clientY + 16}px, 0)`;
    tag.classList.add('is-on');
  };
  addEventListener('pointermove', move, { passive: true });
  addEventListener('pointerdown', move, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => tag.classList.remove('is-on'));
  addEventListener('blur', () => tag.classList.remove('is-on'));
}
