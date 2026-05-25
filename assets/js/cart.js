/* ============================================================
   EL PRINCE COMPANY — Carrinho
   - Persistência em localStorage
   - Preço ATACADO/VAREJO automático por quantidade da CATEGORIA
     (pods: ≥10 peças  •  perfumes: ≥3 peças)
   - Checkout: monta a mensagem e abre o WhatsApp da loja
   ============================================================ */
(function () {
  const LS = "elprince_cart_v1";
  const INFO = window.EL_PRINCE_INFO || {};
  const CAT_LABEL = { pods: "DESCARTÁVEIS", perfume: "PERFUMES ÁRABES" };
  const CAT_UNIT = { pods: "peças", perfume: "perfumes" };

  let items = load();

  function load() { try { return JSON.parse(localStorage.getItem(LS)) || []; } catch (_) { return []; } }
  function save() { localStorage.setItem(LS, JSON.stringify(items)); }
  function brl(n) { return "R$ " + Number(n).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function keyOf(id, flavor) { return id + "|" + (flavor || ""); }

  /* ---- regra de atacado por categoria ---- */
  function catTotals() {
    const t = {};
    items.forEach((i) => { t[i.category] = (t[i.category] || 0) + i.qty; });
    return t;
  }
  function catMin(cat) {
    const it = items.find((i) => i.category === cat);
    return it ? (it.atacado_min || (cat === "pods" ? 10 : 3)) : (cat === "pods" ? 10 : 3);
  }
  function isAtacado(cat) { return (catTotals()[cat] || 0) >= catMin(cat); }
  function unitPrice(i) { return isAtacado(i.category) ? i.price_atacado : i.price_varejo; }

  /* ---- API ---- */
  const Cart = {
    add(product, flavor, qty) {
      qty = qty || 1;
      const k = keyOf(product.id, flavor);
      const ex = items.find((i) => i.key === k);
      if (ex) ex.qty += qty;
      else items.push({
        key: k, id: product.id, name: product.name, brand: product.brand,
        category: product.category, flavor: flavor || "",
        price_atacado: Number(product.price_atacado), price_varejo: Number(product.price_varejo),
        atacado_min: product.atacado_min || (product.category === "pods" ? 10 : 3), qty
      });
      save(); this.render();
      toast(`Adicionado: ${product.name}${flavor ? " — " + flavor : ""}`);
      pulseCount();
    },
    setQty(key, qty) {
      const it = items.find((i) => i.key === key);
      if (!it) return;
      it.qty = Math.max(0, qty);
      if (it.qty === 0) items = items.filter((i) => i.key !== key);
      save(); this.render();
    },
    remove(key) { items = items.filter((i) => i.key !== key); save(); this.render(); },
    clear() { items = []; save(); this.render(); },
    count() { return items.reduce((s, i) => s + i.qty, 0); },
    total() { return items.reduce((s, i) => s + i.qty * unitPrice(i), 0); },
    open() { ovl().classList.add("open"); drw().classList.add("open"); document.body.classList.add("no-scroll"); },
    close() { ovl().classList.remove("open"); drw().classList.remove("open"); document.body.classList.remove("no-scroll"); },

    render() {
      // badge
      const badge = document.getElementById("cart-count");
      if (badge) { const c = this.count(); badge.textContent = c; badge.classList.toggle("empty", c === 0); }

      const box = document.getElementById("cart-items");
      const foot = document.getElementById("cart-foot");
      if (!box) return;

      if (items.length === 0) {
        box.innerHTML = `<div class="cart-empty"><span class="ce-icon">☾</span>Seu carrinho está vazio.<br>Adicione perfumes ou descartáveis para começar.</div>`;
        if (foot) foot.style.display = "none";
        return;
      }
      if (foot) foot.style.display = "block";

      // agrupa por categoria
      const cats = [...new Set(items.map((i) => i.category))];
      let html = "";
      cats.forEach((cat) => {
        const list = items.filter((i) => i.category === cat);
        html += `<div class="ci-cat-label flavors-title" style="margin:6px 0">${CAT_LABEL[cat] || cat}</div>`;
        list.forEach((i) => {
          const up = unitPrice(i);
          const atac = isAtacado(i.category);
          html += `
          <div class="cart-item">
            <div>
              <div class="ci-name">${i.brand ? i.brand + " · " : ""}${i.name}</div>
              ${i.flavor ? `<div class="ci-flavor">${i.flavor}</div>` : ""}
              <div class="ci-unit">${brl(up)} <span class="${atac ? "at" : ""}">${atac ? "(atacado)" : "(varejo)"}</span> / un</div>
            </div>
            <div class="ci-right">
              <div class="ci-line-total">${brl(up * i.qty)}</div>
              <div class="qty">
                <button data-dec="${i.key}">−</button><span>${i.qty}</span><button data-inc="${i.key}">+</button>
              </div>
              <button class="ci-remove" data-rm="${i.key}">remover</button>
            </div>
          </div>`;
        });
        // aviso de atacado
        const totalCat = catTotals()[cat] || 0;
        const min = catMin(cat);
        if (totalCat >= min) {
          html += `<div class="cart-note ok">✓ Preço de ATACADO aplicado em ${CAT_LABEL[cat]} (${totalCat} ${CAT_UNIT[cat]}).</div>`;
        } else {
          const faltam = min - totalCat;
          html += `<div class="cart-note">Faltam <b>${faltam}</b> ${CAT_UNIT[cat]} para liberar o <b>ATACADO</b> em ${CAT_LABEL[cat]} (economia por unidade).</div>`;
        }
      });
      box.innerHTML = html;

      const tot = document.getElementById("cart-total");
      if (tot) tot.textContent = brl(this.total());

      // wire qty/remove
      box.querySelectorAll("[data-inc]").forEach((b) => b.onclick = () => this.setQty(b.dataset.inc, get(b.dataset.inc).qty + 1));
      box.querySelectorAll("[data-dec]").forEach((b) => b.onclick = () => this.setQty(b.dataset.dec, get(b.dataset.dec).qty - 1));
      box.querySelectorAll("[data-rm]").forEach((b) => b.onclick = () => this.remove(b.dataset.rm));
    },

    checkoutWhatsApp() {
      if (items.length === 0) { toast("Seu carrinho está vazio."); return; }
      const cats = [...new Set(items.map((i) => i.category))];
      let msg = "👑 *PEDIDO — EL PRINCE COMPANY* 👑\n\n";
      cats.forEach((cat) => {
        msg += `*${CAT_LABEL[cat] || cat}*\n`;
        items.filter((i) => i.category === cat).forEach((i) => {
          const up = unitPrice(i);
          msg += `• ${i.qty}x ${i.brand ? i.brand + " " : ""}${i.name}${i.flavor ? " (" + i.flavor + ")" : ""} — ${brl(up)} = ${brl(up * i.qty)}\n`;
        });
        msg += isAtacado(cat) ? `_(preço de atacado)_\n\n` : `_(preço de varejo)_\n\n`;
      });
      msg += `*TOTAL: ${brl(this.total())}*\n\nOlá! Gostaria de fazer este pedido. 🙏`;
      const url = `https://wa.me/${INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    }
  };

  function get(key) { return items.find((i) => i.key === key) || { qty: 0 }; }
  function ovl() { return document.getElementById("cart-overlay"); }
  function drw() { return document.getElementById("cart-drawer"); }

  function pulseCount() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    badge.animate([{ transform: "scale(1)" }, { transform: "scale(1.4)" }, { transform: "scale(1)" }], { duration: 350 });
  }

  let toastWrap;
  function toast(text) {
    if (!toastWrap) { toastWrap = document.createElement("div"); toastWrap.className = "toast-wrap"; document.body.appendChild(toastWrap); }
    const el = document.createElement("div"); el.className = "toast"; el.textContent = text;
    toastWrap.appendChild(el);
    setTimeout(() => { el.style.transition = "opacity .4s"; el.style.opacity = "0"; setTimeout(() => el.remove(), 400); }, 2200);
  }

  window.Cart = Cart;
  window.elToast = toast;

  document.addEventListener("DOMContentLoaded", () => {
    Cart.render();
    document.querySelectorAll("[data-open-cart]").forEach((b) => b.onclick = () => Cart.open());
    const c = document.querySelector(".cart-close"); if (c) c.onclick = () => Cart.close();
    const o = ovl(); if (o) o.onclick = () => Cart.close();
    const co = document.getElementById("btn-checkout"); if (co) co.onclick = () => Cart.checkoutWhatsApp();
    const cl = document.getElementById("cart-clear"); if (cl) cl.onclick = () => { if (confirm("Esvaziar o carrinho?")) Cart.clear(); };
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") Cart.close(); });
  });
})();
