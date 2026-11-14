/* ===== EDIT HERE: contact + stock =====
   Set avail:false to hide a product from the Buy section. */
const WHATSAPP = "37400000000"; // replace with client's number (country code, no +)
/* Offline placeholder: a quiet mushroom silhouette on green. Always loads.
   To use real photos later, add an img:"images/name.jpg" field to a product
   (or change this function to return your own file paths). */
const IMG = (k, n) => {
  const c = [["#B7C6A5","#5E7F4A"],["#5E7F4A","#2F4A2B"],["#A9B89A","#4A6B3A"]][n % 3];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c[0]}'/><stop offset='1' stop-color='${c[1]}'/></linearGradient></defs><rect width='400' height='500' fill='url(#g)'/><g fill='#F6F8F2' fill-opacity='.8'><path d='M110 290a90 80 0 0 1 180 0z'/><rect x='185' y='290' width='30' height='70' rx='12'/></g></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
};

const species = [
  {n:"Lion's mane", l:"Hericium erinaceus", t:"18-24 °C", h:"85-95%", s:"Hardwood sawdust", d:"14-21 days", k:"mushroom,white",
   about:"Soft, shaggy and mild, with a taste often compared to crab. Valued in the kitchen and in wellness routines."},
  {n:"Reishi", l:"Ganoderma lucidum", t:"21-27 °C", h:"85-95%", s:"Hardwood logs or sawdust", d:"60-90 days", k:"reishi,mushroom",
   about:"A glossy, woody mushroom with a bitter taste, traditionally brewed as a tea or taken as an extract."},
  {n:"Cordyceps", l:"Cordyceps militaris", t:"18-22 °C", h:"70-80%", s:"Grain and rice medium", d:"45-60 days", k:"orange,mushroom",
   about:"Bright orange and slender. Grown on grain, and popular as a dried ingredient and in extracts."},
  {n:"Turkey tail", l:"Trametes versicolor", t:"18-24 °C", h:"80-90%", s:"Hardwood logs or sawdust", d:"30-60 days", k:"turkeytail,fungi",
   about:"Thin, banded fans that look like a turkey's feathers. Used almost only as tea or extract."},
  {n:"Shiitake", l:"Lentinula edodes", t:"12-20 °C", h:"80-90%", s:"Oak logs or sawdust blocks", d:"60-90 days", k:"shiitake,mushroom",
   about:"Deep, savoury and meaty. One of the most widely cooked mushrooms in the world, fresh or dried."},
  {n:"Enoki", l:"Flammulina velutipes", t:"8-15 °C", h:"85-95%", s:"Sawdust with bran", d:"21-30 days", k:"enoki,mushroom",
   about:"Long, delicate stems with small caps. Crisp and lightly sweet, a favourite for soups and hot pots."}
];

const cats = [
  {id:"fresh", n:"Fresh mushrooms", i:"bi-basket2", d:"Harvested and packed within a day."},
  {id:"dried", n:"Dried mushrooms", i:"bi-sun", d:"Slow-dried for tea, broth and cooking."},
  {id:"extract", n:"Extracts", i:"bi-droplet", d:"Concentrated extracts of medicinal species."},
  {id:"mycelium", n:"Mycelium", i:"bi-diagram-3", d:"Living culture for growers."},
  {id:"block", n:"Grow blocks", i:"bi-box-seam", d:"Ready to fruit at home."},
  {id:"spawn", n:"Grain spawn", i:"bi-grid-3x3-gap", d:"Colonised grain to start your own substrate."}
];

const products = [
  {n:"Lion's mane, fresh", c:"fresh", p:6500, u:"500 g", k:"mushroom,white", a:true},
  {n:"Shiitake, fresh", c:"fresh", p:4800, u:"500 g", k:"shiitake", a:true},
  {n:"Enoki, fresh", c:"fresh", p:3200, u:"200 g", k:"enoki", a:false},
  {n:"Shiitake, dried", c:"dried", p:7500, u:"100 g", k:"dried,mushroom", a:true},
  {n:"Turkey tail, dried", c:"dried", p:5200, u:"100 g", k:"turkeytail", a:true},
  {n:"Reishi extract", c:"extract", p:12000, u:"60 ml", k:"reishi", a:true},
  {n:"Cordyceps extract", c:"extract", p:14500, u:"60 ml", k:"cordyceps", a:false},
  {n:"Lion's mane mycelium", c:"mycelium", p:3500, u:"jar", k:"mycelium", a:true},
  {n:"Oyster grow block", c:"block", p:5500, u:"2 kg", k:"oyster,mushroom", a:true},
  {n:"Lion's mane grow block", c:"block", p:6500, u:"2 kg", k:"mushroom,white", a:false},
  {n:"Rye grain spawn", c:"spawn", p:2800, u:"1 kg", k:"grain,rye", a:true},
  {n:"Millet grain spawn", c:"spawn", p:2800, u:"1 kg", k:"millet,grain", a:true}
].map((x, i) => ({...x, id:i}));

const $ = s => document.querySelector(s);
const money = n => n.toLocaleString("en-US") + " AMD";

/* nav */
const nav = $("#nav"), menu = $("#menu"), burger = $("#burger");
addEventListener("scroll", () => nav.classList.toggle("solid", scrollY > 30), {passive:true});
const drawer = $("#drawer"), scrim = $("#scrim");
drawer.inert = true; // keeps off-screen links out of the tab order
$("#dWa").href = `https://wa.me/${WHATSAPP}`;
function toggle(open) {
  const was = drawer.classList.contains("open");
  drawer.classList.toggle("open", open);
  scrim.classList.toggle("open", open);
  drawer.inert = !open;
  burger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
  if (open) $("#dClose").focus({preventScroll:true});
  else if (was) burger.focus({preventScroll:true});
}
burger.onclick = () => toggle(true);
scrim.onclick = $("#dClose").onclick = () => toggle(false);
drawer.addEventListener("click", e => { if (e.target.closest(".d-links a, .d-cta")) toggle(false); });
addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });
matchMedia("(min-width:761px)").addEventListener("change", e => { if (e.matches) toggle(false); });
$("#yr").textContent = new Date().getFullYear();
$(".hero-arch img").src = IMG("", 0);

/* mushrooms */
const spList = $("#spList");
spList.innerHTML = species.map((s, i) =>
  `<li><button data-i="${i}">${s.n}<small>${s.l}</small></button></li>`).join("");
let cur = 0;
function showSpecies(i) {
  cur = i;
  const s = species[i];
  [...spList.children].forEach((li, j) => li.classList.toggle("on", i === j));
  $("#spImg").src = IMG(s.k, 30 + i);
  $("#spImg").alt = s.n;
  const info = $("#spInfo");
  info.classList.remove("in");
  info.innerHTML = `<div class="sp-head">
      <button class="sp-btn" data-dir="-1" aria-label="Previous mushroom"><i class="bi bi-arrow-left"></i></button>
      <div><h3>${s.n}</h3><em class="lat">${s.l}</em></div>
      <button class="sp-btn" data-dir="1" aria-label="Next mushroom"><i class="bi bi-arrow-right"></i></button>
    </div><p>${s.about}</p><a href="#grow" data-grow="${i}">How to grow it</a>`;
  // same word-by-word rise as the headings; the paragraph follows the title
  let n = 0;
  info.querySelectorAll("h3, p").forEach(el => {
    const step = el.tagName === "P" ? .3 : 1;
    el.innerHTML = el.textContent.split(/\s+/).map(w => {
      const d = (n += step).toFixed(2);
      return `<span class="w"><span style="--i:${d}">${w}</span></span>`;
    }).join(" ");
  });
  // restart the picture reveal
  const img = $("#spImg"); img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
  requestAnimationFrame(() => requestAnimationFrame(() => info.classList.add("in")));
}
spList.onclick = e => { const b = e.target.closest("button"); if (b) showSpecies(+b.dataset.i); };
showSpecies(0);

/* mobile slider: arrow buttons and swipe on the picture */
const go = d => showSpecies((cur + d + species.length) % species.length);
$("#spInfo").addEventListener("click", e => {
  const b = e.target.closest("[data-dir]"); if (!b) return;
  const d = +b.dataset.dir; go(d);
  $("#spInfo").querySelector(`[data-dir="${d}"]`).focus({preventScroll:true});
});
let x0 = 0;
const arch = document.querySelector(".sp-arch");
arch.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, {passive:true});
arch.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
});

/* products (categories) + buy */
let filter = "all";
const chips = $("#chips"), grid = $("#grid");
$("#cats").innerHTML = cats.map(c => {
  const n = products.filter(p => p.c === c.id && p.a).length;
  return `<button class="cat" data-c="${c.id}"><i class="bi ${c.i}"></i><h3>${c.n}</h3><p>${c.d}</p><span>${n} available</span></button>`;
}).join("");
chips.innerHTML = [{id:"all", n:"All"}, ...cats].map(c => `<button data-c="${c.id}">${c.n}</button>`).join("");

const order = new Set();
function render() {
  [...chips.children].forEach(b => b.classList.toggle("on", b.dataset.c === filter));
  const on = chips.querySelector(".on"); // keep the active filter visible in the sliding strip
  if (on) chips.scrollTo({left: on.offsetLeft - (chips.clientWidth - on.offsetWidth) / 2, behavior: "smooth"});
  const list = products.filter(p => p.a && (filter === "all" || p.c === filter));
  $("#empty").hidden = list.length > 0;
  grid.innerHTML = list.map(p => `
    <article class="card">
      <div class="ph"><img loading="lazy" src="${p.img || IMG(p.k, p.id)}" alt="${p.n}"></div>
      <h3>${p.n}</h3>
      <span class="cat-l">${cats.find(c => c.id === p.c).n}</span>
      <div class="row"><span class="price">${money(p.p)} <small>/ ${p.u}</small></span>
      <button class="add ${order.has(p.id) ? "on" : ""}" data-id="${p.id}"><i class="bi ${order.has(p.id) ? "bi-check2" : "bi-plus"}"></i>${order.has(p.id) ? "Added" : "Add"}</button></div>
    </article>`).join("");
}
chips.onclick = e => { const b = e.target.closest("button"); if (b) { filter = b.dataset.c; render(); } };
$("#cats").onclick = e => {
  const b = e.target.closest("button"); if (!b) return;
  filter = b.dataset.c; render(); $("#buy").scrollIntoView();
};
grid.onclick = e => {
  const b = e.target.closest(".add"); if (!b) return;
  const id = +b.dataset.id;
  order.has(id) ? order.delete(id) : order.add(id);
  render(); updateTray();
};
function updateTray() {
  const items = products.filter(p => order.has(p.id));
  $("#tray").hidden = !items.length;
  $("#trayCount").textContent = items.length + (items.length === 1 ? " item selected" : " items selected");
  const msg = "Hello Highfungi, I would like to order:\n" + items.map(p => `- ${p.n} (${p.u})`).join("\n");
  $("#send").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
$("#clear").onclick = () => { order.clear(); render(); updateTray(); };
render();

/* how to grow */
const steps = [
  ["Choose a species", "Start with oyster or lion's mane. They forgive beginner mistakes."],
  ["Pick a substrate", "Sawdust, straw or grain, pasteurised so only your mushroom grows."],
  ["Let it colonise", "Keep it warm and dark while the mycelium spreads through the block."],
  ["Fruit and harvest", "Add fresh air, humidity and light, then harvest before the caps flatten."]
];
let gTab = "global", gSp = 0;
const body = $("#growBody"), tabs = $("#growTabs");
function grow() {
  [...tabs.children].forEach(b => b.classList.toggle("on", b.dataset.t === gTab));
  if (gTab === "global") {
    body.innerHTML = `<ol class="steps">${steps.map(s => `<li><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join("")}</ol>`;
  } else if (gTab === "species") {
    const s = species[gSp];
    body.innerHTML = `<div class="pick">${species.map((x, i) => `<button class="${i === gSp ? "on" : ""}" data-i="${i}">${x.n}</button>`).join("")}</div>
      <dl class="facts"><div><dt>Temperature</dt><dd>${s.t}</dd></div><div><dt>Humidity</dt><dd>${s.h}</dd></div><div><dt>Substrate</dt><dd>${s.s}</dd></div><div><dt>Time to harvest</dt><dd>${s.d}</dd></div></dl>
      <p class="tip">${s.about}</p>`;
  } else {
    const g = (lab, str, lo, hi) => { const [a, b] = str.match(/\d+/g).map(Number);
      return `<div class="g"><div class="g-l"><span>${lab}</span><b>${str}</b></div><div class="g-t"><i style="--l:${(a - lo) / (hi - lo) * 100}%;--w:${(b - a) / (hi - lo) * 100}%"></i></div></div>`; };
    body.innerHTML = `<div class="gauges">${species.map((s, i) => `<div class="g-row" style="--d:${i * 90}ms"><div class="g-name"><h3>${s.n}</h3><p>${s.s}, ${s.d}</p></div>${g("Temperature", s.t, 0, 40)}${g("Humidity", s.h, 50, 100)}</div>`).join("")}</div>
      <p class="tip">Figures are general guides. Placeholder values to be confirmed by the farm.</p>`;
    requestAnimationFrame(() => requestAnimationFrame(() => body.querySelector(".gauges").classList.add("in")));
  }
}
tabs.onclick = e => { const b = e.target.closest("button"); if (b) { gTab = b.dataset.t; grow(); } };
body.onclick = e => { const b = e.target.closest(".pick button"); if (b) { gSp = +b.dataset.i; grow(); } };
$("#spInfo").addEventListener("click", e => { const a = e.target.closest("[data-grow]"); if (a) { gTab = "species"; gSp = +a.dataset.grow; grow(); } });
grow();

/* ===== text motion ===== */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  // split headings into words, keeping <br> line breaks
  document.querySelectorAll(".hero h1, .head h2").forEach(el => {
    let i = 0;
    const out = document.createDocumentFragment();
    el.childNodes.forEach(n => {
      if (n.nodeName === "BR") return out.appendChild(n.cloneNode());
      n.textContent.split(/\s+/).filter(Boolean).forEach(word => {
        const w = document.createElement("span"), s = document.createElement("span");
        w.className = "w"; s.textContent = word; s.style.setProperty("--i", i++);
        w.appendChild(s); out.appendChild(w); out.appendChild(document.createTextNode(" "));
      });
    });
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    el.innerHTML = ""; el.appendChild(out); el.classList.add("split");
  });

  // reveal when scrolled into view (once)
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), {threshold: .25});
  document.querySelectorAll(".split, .head, .lead").forEach(el => io.observe(el));

  // gentle parallax: negative = lags behind scroll, positive = drifts ahead
  if (reduce) return;
  const set = (sel, v) => { const el = document.querySelector(sel); if (el) el.dataset.px = v; };
  set(".hero h1", -.14); set(".hero-arch", .07);
  document.querySelectorAll(".head h2").forEach(h => h.dataset.px = -.06);
  const items = [...document.querySelectorAll("[data-px]")];
  let tick = false;
  const run = () => {
    tick = false;
    const vh = innerHeight;
    items.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const d = Math.max(-vh, Math.min(vh, r.top + r.height / 2 - vh / 2));
      el.style.transform = `translate3d(0,${(d * el.dataset.px).toFixed(1)}px,0)`;
    });
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(run); } }, {passive:true});
  addEventListener("resize", run);
  run();
})();

/* ===== mobile hero: the two headline lines drift in opposite directions ===== */
(() => {
  const h1 = document.querySelector(".hero h1");
  const br = h1 && h1.querySelector("br");
  if (!br || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const line = () => Object.assign(document.createElement("span"), {className: "ln"});
  const a = line(), b = line();
  for (let n = h1.firstChild; n && n !== br; n = h1.firstChild) a.appendChild(n);
  br.remove();
  while (h1.firstChild) b.appendChild(h1.firstChild);
  h1.append(a, b);

  const mobile = matchMedia("(max-width:760px)"), MAX = 14; // px, kept inside the page padding
  let queued = false;
  const update = () => {
    queued = false;
    if (!mobile.matches) { a.style.transform = b.style.transform = ""; return; }
    const p = Math.min(1, scrollY / (innerHeight * .8));
    a.style.transform = `translate3d(${(p * MAX).toFixed(1)}px,0,0)`;
    b.style.transform = `translate3d(${(-p * MAX).toFixed(1)}px,0,0)`;
  };
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, {passive: true});
  mobile.addEventListener("change", update);
  update();
})();


/* ===== scroll progress + language switch ===== */
(() => {
  const prog = $("#prog");
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
  };
  let q = false;
  addEventListener("scroll", () => { if (!q) { q = true; requestAnimationFrame(() => { q = false; update(); }); } }, {passive: true});
  addEventListener("resize", update);
  update();

  // language switch: Armenian is not translated yet, so it says so politely
  const toast = $("#toast"); let t;
  document.querySelectorAll(".lang").forEach(g => g.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b || b.dataset.l !== "hy") return;
    toast.textContent = "Armenian version coming soon";
    toast.classList.add("show"); clearTimeout(t);
    t = setTimeout(() => toast.classList.remove("show"), 2400);
  }));
})();