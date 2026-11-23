/* beyond numbers — script.js */

/* ============ EDIT THESE ============ */
const CONFIG = {
  whatsapp: "917303314027",        // your number with country code, no + or spaces
  email: "sahilkmar32@gmail.com"  // your email
};
/* ==================================== */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover)').matches;

/* ---------- pixel sprites (tools / analysis icons) ---------- */
const SPRITES = {
  magnifier: [
    "..#####....",
    ".#.....#...",
    "#.......#..",
    "#.......#..",
    "#.......#..",
    ".#.....#...",
    "..#####....",
    ".......#...",
    "........#..",
    ".........#.",
    "..........#"
  ],
  bars: [
    ".........##",
    ".........##",
    ".........##",
    ".....##..##",
    ".....##..##",
    ".....##..##",
    ".##..##..##",
    ".##..##..##",
    ".##..##..##",
    ".##..##..##",
    "###########"
  ],
  trend: [
    ".........##",
    "........##.",
    ".#.....##..",
    ".##...##...",
    "..#..##....",
    "...###.....",
    "...........",
    "#..........",
    "#..........",
    "#..........",
    "###########"
  ],
  sigma: [
    "#########",
    "#.......#",
    ".#.......",
    "..#......",
    "...#.....",
    "....#....",
    "...#.....",
    "..#......",
    ".#.......",
    "#.......#",
    "#########"
  ],
  eye: [
    "...........",
    "...#####...",
    ".##.....##.",
    "#...###...#",
    "#..#####..#",
    "#...###...#",
    ".##.....##.",
    "...#####..."
  ],
  table: [
    "###########",
    "#.........#",
    "###########",
    "#...#.....#",
    "#...#.....#",
    "###########",
    "#...#.....#",
    "#...#.....#",
    "###########"
  ],
  doc: [
    "#######..",
    "#.....##.",
    "#.....#.#",
    "#.....###",
    "#.###...#",
    "#.......#",
    "#.###...#",
    "#.......#",
    "#########"
  ],
  bolt: [
    ".....####",
    "....###..",
    "...###...",
    "..######.",
    "....###..",
    "...###...",
    "..###....",
    ".##......"
  ]
};

function spriteSVG(name, px, color) {
  const rows = SPRITES[name];
  const w = Math.max(...rows.map(r => r.length));
  const h = rows.length;
  let rects = '';
  rows.forEach((row, y) => [...row].forEach((c, x) => {
    if (c === '#') rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }));
  return `<svg viewBox="0 0 ${w} ${h}" width="${w * px}" height="${h * px}" fill="${color || 'currentColor'}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}

document.querySelectorAll('[data-sprite]').forEach(el => {
  el.innerHTML = spriteSVG(el.dataset.sprite, Number(el.dataset.px) || 5);
});


/* ---------- tool logos ---------- */
const S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const TOOL_ICONS = {
  excel:      `<rect x="3" y="3" width="18" height="18" rx="2" ${S}/><path d="M8 8l8 8M16 8l-8 8" ${S}/>`,
  powerbi:    `<rect x="3" y="12" width="5" height="9" rx="1"/><rect x="9.5" y="7" width="5" height="14" rx="1"/><rect x="16" y="3" width="5" height="18" rx="1"/>`,
  powerquery: `<path d="M3 4h18l-7 8v6l-4 2v-8z" ${S}/>`,
  dax:        `<rect x="2.5" y="4" width="19" height="16" rx="2" ${S}/><text x="12" y="15.5" text-anchor="middle" font-size="9" font-weight="700" font-family="monospace">fx</text>`,
  pivot:      `<rect x="3" y="3" width="18" height="18" rx="2" ${S}/><path d="M3 9h18M9 9v12" ${S}/>`,
  vba:        `<path d="M9 7l-5 5 5 5M15 7l5 5-5 5" ${S}/>`,
  sheets:     `<rect x="4" y="3" width="16" height="18" rx="2" ${S}/><path d="M4 9h16M4 15h16M12 9v12" ${S}/>`,
  sql:        `<ellipse cx="12" cy="6" rx="8" ry="3" ${S}/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" ${S}/>`
};
document.querySelectorAll('[data-tool]').forEach(el => {
  const d = TOOL_ICONS[el.dataset.tool];
  if (d) el.insertAdjacentHTML('afterbegin', `<svg class="tl" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${d}</svg>`);
});

/* ---------- small things: year, links, nav, progress ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-email]').forEach(a => { a.href = 'mailto:' + CONFIG.email; a.textContent = CONFIG.email; });
document.querySelectorAll('[data-wa]').forEach(a => { a.href = 'https://wa.me/' + CONFIG.whatsapp; });

const burger = document.getElementById('burger');
const links = document.getElementById('links');
burger.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
links.addEventListener('click', e => {
  if (e.target.closest('a')) { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
});

const progress = document.getElementById('progress');
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- scroll reveal + count-up ---------- */
function countUp(el) {
  const target = Number(el.dataset.count);
  const dec = Number(el.dataset.dec) || 0;
  const dur = 1600;
  const start = performance.now();
  (function tick(now) {
    const k = Math.min(1, (now - start) / dur);
    const v = target * (1 - Math.pow(1 - k, 3));
    el.textContent = v.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (k < 1) requestAnimationFrame(tick);
  })(start);
}

const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    en.target.querySelectorAll('[data-count]').forEach(el => reduceMotion ? (el.textContent = Number(el.dataset.count).toLocaleString('en-IN', { minimumFractionDigits: Number(el.dataset.dec) || 0 })) : countUp(el));
    revealIO.unobserve(en.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

/* ---------- hanging cards: flip on tap (touch) ---------- */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    if (!canHover) {
      const wasFlipped = card.classList.contains('flipped');
      document.querySelectorAll('.card.flipped').forEach(c => c.classList.remove('flipped'));
      if (!wasFlipped) card.classList.add('flipped');
    }
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
  });
});

/* ---------- cluttered -> focused scribble ---------- */
(function () {
  const figure = document.getElementById('focus');
  const group = document.getElementById('strands');
  const pencil = document.getElementById('pencil');
  if (!figure) return;

  const NS = 'http://www.w3.org/2000/svg';
  const W = 520, H = 300, N = 150, S = 7, cy = H / 2;

  function rng(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  const r = rng(11);

  const strands = Array.from({ length: S }, () => ({
    ax: 28 + r() * 42, fx: 2 + r() * 4, px: r() * 6.28, wx: (r() - .5) * 1.6,
    ay: 30 + r() * 48, fy: 2.5 + r() * 5, py: r() * 6.28, wy: (r() - .5) * 1.6,
    ay2: 10 + r() * 26, fy2: 7 + r() * 7, py2: r() * 6.28
  }));

  const paths = strands.map((s, i) => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('stroke-width', i === 0 ? 2.6 : 1.3);
    group.appendChild(p);
    return p;
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function pt(s, u, k, t) {
    const e = 0.3 + 0.7 * Math.sin(Math.PI * u);
    const x0 = 24 + u * (W - 108);
    const x = x0 + k * e * s.ax * Math.sin(s.fx * u * 6.283 + s.px + t * s.wx);
    const y = cy + k * e * (s.ay * Math.sin(s.fy * u * 6.283 + s.py + t * s.wy) + s.ay2 * Math.sin(s.fy2 * u * 6.283 + s.py2));
    return [clamp(x, 8, W - 90), clamp(y, 12, H - 12)];
  }

  let intro = reduceMotion ? 1 : 0;
  let p = 0, target = 0, visible = true, auto = null, userTouched = false;
  const easeIn = v => 1 - Math.pow(1 - v, 3);

  function render(ts) {
    const t = reduceMotion ? 0 : ts / 1000;
    if (intro < 1) intro = Math.min(1, intro + 0.0065);
    p += (target - p) * 0.085;
    if (Math.abs(target - p) < 0.0005) p = target;
    const pe = p * p * (3 - 2 * p);
    const k = 1 - pe;
    const kmax = Math.max(1, Math.floor(easeIn(intro) * (N - 1)));

    strands.forEach((s, i) => {
      let d = '';
      for (let j = 0; j <= kmax; j++) {
        const q = pt(s, j / (N - 1), k, t);
        d += (j ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1);
      }
      paths[i].setAttribute('d', d);
      paths[i].style.opacity = i === 0 ? 1 : (0.5 * k).toFixed(3);
    });

    const tip = pt(strands[0], kmax / (N - 1), k, t);
    pencil.setAttribute('transform', `translate(${tip[0].toFixed(1)} ${tip[1].toFixed(1)}) rotate(-40)`);
  }

  function loop(ts) {
    requestAnimationFrame(loop);
    if (visible) render(ts);
  }
  requestAnimationFrame(loop);

  function setFocus(on) {
    target = on ? 1 : 0;
    figure.classList.toggle('is-focused', on);
  }

  new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(figure);

  // desktop: hover
  figure.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') setFocus(true); });
  figure.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') setFocus(false); });
  // touch / keyboard: tap toggles
  figure.addEventListener('click', () => {
    if (canHover) return;
    userTouched = true; clearInterval(auto);
    setFocus(target === 0);
  });
  figure.addEventListener('focus', () => setFocus(true));
  figure.addEventListener('blur', () => setFocus(false));

  // touch devices: gently demo the effect until the visitor taps it
  if (!canHover && !reduceMotion) {
    setTimeout(() => {
      if (userTouched) return;
      setFocus(true);
      auto = setInterval(() => { if (visible && !userTouched) setFocus(target === 0); }, 3800);
    }, 3200);
  }
})();

/* ---------- pixel analytics background ---------- */
(function () {
  const cv = document.getElementById('px');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H, cell, cols, rows, heat, sparks, sprites, dpr;
  const mouse = { x: -999, y: -999 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cell = W < 700 ? 8 : 10;
    cols = Math.ceil(W / cell); rows = Math.ceil(H / cell);
    heat = new Float32Array(cols * rows);

    // sparse twinkling pixels
    const count = Math.floor(cols * rows / 70);
    sparks = Array.from({ length: count }, () => ({ x: (Math.random() * cols) | 0, y: (Math.random() * rows) | 0, ph: Math.random() * 6.28 }));

    // floating analysis icons
    const list = [
      ['magnifier', .07, .2], ['eye', .86, .16], ['sigma', .8, .52],
      ['trend', .1, .58], ['bars', .46, .08], ['table', .62, .72]
    ];
    const use = W < 700 ? list.slice(0, 4) : list;
    sprites = use.map(([n, fx, fy], i) => ({ n, x: Math.round(fx * cols), y: Math.round(fy * rows), ph: i * 1.7 }));
    if (reduceMotion) draw(0);
  }

  function drawSprite(s, t) {
    const rowsArr = SPRITES[s.n];
    const oy = Math.round(Math.sin(t * 0.0006 + s.ph) * 2);
    const flick = 0.09 + 0.04 * Math.sin(t * 0.002 + s.ph);
    ctx.fillStyle = `rgba(10,10,10,${flick})`;
    rowsArr.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        if (row[x] === '#') ctx.fillRect((s.x + x) * cell, (s.y + y + oy) * cell, cell - 1, cell - 1);
      }
    });
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    // twinkles
    for (const s of sparks) {
      const a = 0.04 + 0.07 * (0.5 + 0.5 * Math.sin(t * 0.0015 + s.ph));
      ctx.fillStyle = `rgba(10,10,10,${a})`;
      ctx.fillRect(s.x * cell, s.y * cell, cell - 1, cell - 1);
    }

    // pixel bar chart rising from the bottom
    const period = 5, nb = Math.ceil(cols / period);
    for (let b = 0; b < nb; b++) {
      const wave = 0.5 + 0.5 * Math.sin(b * 0.7 + t * 0.0009);
      const mod = 0.6 + 0.4 * Math.sin(b * 1.9 - t * 0.0005);
      const hc = Math.floor(rows * 0.28 * wave * mod) + 2;
      for (let j = 0; j < hc; j++) {
        const top = j === hc - 1;
        const a = top ? 0.2 : 0.07 * (1 - j / hc) + 0.012;
        ctx.fillStyle = `rgba(10,10,10,${a})`;
        for (let w = 0; w < 3; w++) {
          const cx = b * period + w;
          if (cx < cols) ctx.fillRect(cx * cell, (rows - 1 - j) * cell, cell - 1, cell - 1);
        }
      }
    }

    // cursor heat trail
    for (let i = 0; i < heat.length; i++) {
      const h = heat[i];
      if (h > 0.02) {
        const x = i % cols, y = (i / cols) | 0;
        ctx.fillStyle = `rgba(10,10,10,${h * 0.22})`;
        ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1);
        heat[i] = h * 0.93;
      }
    }

    sprites.forEach(s => drawSprite(s, t));
  }

  function stamp(px, py) {
    const cx = (px / cell) | 0, cy = (py / cell) | 0;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      if (dx * dx + dy * dy > 5) continue;
      const x = cx + dx, y = cy + dy;
      if (x >= 0 && y >= 0 && x < cols && y < rows) heat[y * cols + x] = 1;
    }
  }
  addEventListener('pointermove', e => stamp(e.clientX, e.clientY), { passive: true });

  let last = 0;
  function loop(t) {
    requestAnimationFrame(loop);
    if (document.hidden || t - last < 33) return;
    last = t;
    draw(t);
  }

  let rw = innerWidth;
  addEventListener('resize', () => { if (innerWidth !== rw) { rw = innerWidth; resize(); } });
  resize();
  if (!reduceMotion) requestAnimationFrame(loop);
})();

/* ---------- contact form -> WhatsApp ---------- */
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const text = `hi beyond numbers! i'm ${d.get('name')} from ${d.get('business')}. i need: ${d.get('need')}.` + (d.get('message') ? `\n${d.get('message')}` : '');
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
