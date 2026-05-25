/* ============================================================
   EL PRINCE COMPANY — Vitrine (render dos produtos)
   Pods: grade com filtro por marca + busca por sabor.
   Perfumes: agrupados por marca.
   ============================================================ */
(function () {
  let ALL = [], PODS = [], PERF = [];
  let activeBrand = "TODAS", term = "";

  function brl(n) { return "R$ " + Number(n).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  function puffBadge(name) {
    const k = name.match(/(\d+)\s*K\s*puffs/i);
    if (k) return k[1] + "K";
    if (/ultra slim/i.test(name)) return "ULTRA SLIM";
    if (/refil/i.test(name)) return "REFIL";
    const n = name.match(/(\d{3,5})\s*puffs/i);
    if (n) return n[1];
    return "";
  }

  async function boot() {
    const podGrid = document.getElementById("disp-grid");
    const perfGrid = document.getElementById("perfumes-grid");
    if (podGrid) podGrid.innerHTML = `<div class="grid-loading">Carregando catálogo…</div>`;
    try {
      ALL = await window.DataLayer.list({ onlyActive: true });
    } catch (e) {
      console.error(e);
      if (podGrid) podGrid.innerHTML = `<div class="grid-empty">Não foi possível carregar os produtos.</div>`;
      return;
    }
    PODS = ALL.filter((p) => p.category === "pods");
    PERF = ALL.filter((p) => p.category === "perfume");
    buildBrandFilter();
    renderPods();
    renderPerfumes();
  }

  /* ---------------- PODS ---------------- */
  function buildBrandFilter() {
    const bar = document.getElementById("disp-filter");
    if (!bar) return;
    const brands = ["TODAS", ...[...new Set(PODS.map((p) => p.brand))]];
    bar.innerHTML = brands.map((b) =>
      `<button class="filter-btn ${b === activeBrand ? "active" : ""}" data-brand="${esc(b)}">${esc(b)}</button>`
    ).join("");
    bar.querySelectorAll(".filter-btn").forEach((btn) => btn.onclick = () => {
      activeBrand = btn.dataset.brand;
      bar.querySelectorAll(".filter-btn").forEach((x) => x.classList.toggle("active", x === btn));
      renderPods();
    });
  }

  function podMatches(p) {
    if (activeBrand !== "TODAS" && p.brand !== activeBrand) return false;
    if (term) {
      const inName = (p.brand + " " + p.name).toLowerCase().includes(term);
      const inFlavor = (p.flavors || []).some((f) => f.toLowerCase().includes(term));
      if (!inName && !inFlavor) return false;
    }
    return true;
  }

  function renderPods() {
    const grid = document.getElementById("disp-grid");
    if (!grid) return;
    const list = PODS.filter(podMatches);
    if (list.length === 0) {
      grid.innerHTML = `<div class="grid-empty">Nenhum produto encontrado${term ? ` para "<b>${esc(term)}</b>"` : ""}.</div>`;
      return;
    }
    grid.innerHTML = list.map((p) => {
      const flavors = p.flavors || [];
      const badge = puffBadge(p.name);
      const tags = flavors.map((f) => {
        const m = term && f.toLowerCase().includes(term);
        return `<span class="flavor-tag ${m ? "match" : ""}">${esc(f)}</span>`;
      }).join("");
      const opts = flavors.length
        ? `<div class="flavor-select-wrap"><label>Escolha o sabor</label>
             <select class="flavor-select">${flavors.map((f) => `<option>${esc(f)}</option>`).join("")}</select></div>`
        : "";
      return `
      <div class="product-card">
        <span class="card-brand">${esc(p.brand)}</span>
        ${badge ? `<span class="card-badge">${esc(badge)}</span>` : ""}
        <div class="card-body">
          <div class="card-name">${esc(p.name)}</div>
          <div class="card-puffs">${flavors.length} ${flavors.length === 1 ? "sabor" : "sabores"} disponíve${flavors.length === 1 ? "l" : "is"}</div>
          <div class="card-price-row">
            <div><span class="price-label">Atacado · 10+</span><span class="price-atacado">${brl(p.price_atacado)}</span></div>
            <div><span class="price-label">Varejo</span><span class="price-varejo">${brl(p.price_varejo)}</span></div>
          </div>
          ${flavors.length ? `<div class="card-flavors"><div class="flavors-title">Sabores</div><div class="flavors-list">${tags}</div></div>` : ""}
          <div class="card-foot">
            ${opts}
            <button class="btn-add" data-id="${p.id}">＋ Adicionar ao carrinho</button>
          </div>
        </div>
      </div>`;
    }).join("");

    grid.querySelectorAll(".btn-add").forEach((btn) => btn.onclick = () => {
      const p = PODS.find((x) => x.id === btn.dataset.id);
      const sel = btn.closest(".card-foot").querySelector(".flavor-select");
      const flavor = sel ? sel.value : "";
      window.Cart.add(p, flavor, 1);
    });
  }

  /* ---------------- PERFUMES ---------------- */
  function renderPerfumes() {
    const grid = document.getElementById("perfumes-grid");
    if (!grid) return;
    if (PERF.length === 0) { grid.innerHTML = `<div class="grid-empty">Nenhum perfume cadastrado.</div>`; return; }
    const brands = [...new Set(PERF.map((p) => p.brand))];
    let html = "";
    brands.forEach((b) => {
      html += `<div class="perf-brand-header"><span class="perf-brand-name">${esc(b)}</span><span class="perf-brand-line"></span></div>`;
      PERF.filter((p) => p.brand === b).forEach((p) => {
        const img = p.image_url
          ? `<img class="perf-img" src="${esc(p.image_url)}" alt="${esc(p.name)}" loading="lazy">`
          : `<div class="perf-placeholder">❖<small>${esc(b)}</small></div>`;
        html += `
        <div class="perf-card">
          <div class="perf-img-wrap">${img}</div>
          <div class="perf-body">
            <div class="perf-name">${esc(p.name)}</div>
            <div class="perf-prices">
              <div class="perf-price-box"><span class="perf-price-label">Atacado · 3+</span><span class="perf-price-val">${brl(p.price_atacado)}</span></div>
              <div class="perf-price-box"><span class="perf-price-label">Varejo</span><span class="perf-price-val">${brl(p.price_varejo)}</span></div>
            </div>
            <button class="btn-add" data-id="${p.id}">＋ Adicionar ao carrinho</button>
          </div>
        </div>`;
      });
    });
    grid.innerHTML = html;
    grid.querySelectorAll(".btn-add").forEach((btn) => btn.onclick = () => {
      const p = PERF.find((x) => x.id === btn.dataset.id);
      window.Cart.add(p, "", 1);
    });
  }

  /* ---------------- busca por sabor ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("flavor-search");
    if (search) search.addEventListener("input", () => { term = search.value.trim().toLowerCase(); renderPods(); });
    boot();
  });
})();
