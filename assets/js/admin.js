/* ============================================================
   EL PRINCE COMPANY — Painel Admin
   Login + CRUD de produtos (preços, sabores, fotos).
   Usa DataLayer (Supabase se configurado, senão local).
   ============================================================ */
(function () {
  const DL = window.DataLayer;
  const INFO = window.EL_PRINCE_INFO || {};
  let PRODUCTS = [];

  const $ = (id) => document.getElementById(id);
  const brl = (n) => "R$ " + Number(n || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- views ---------- */
  function showLogin() { $("login-view").style.display = "flex"; $("dash-view").style.display = "none"; }
  function showDash() { $("login-view").style.display = "none"; $("dash-view").style.display = "block"; loadProducts(); }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", async () => {
    $("mode-pill").innerHTML = DL.mode === "supabase"
      ? `Conectado ao <b>Supabase</b> (alterações salvas para todos os clientes).`
      : `Modo <b>LOCAL</b> — alterações salvas só neste navegador. Conecte o Supabase para publicar.`;
    // dica de login no modo local
    if (DL.mode === "local") {
      $("login-email").value = INFO.adminEmail || "";
    }
    const user = await DL.currentUser();
    if (user) showDash(); else showLogin();

    wire();
  });

  function wire() {
    $("login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      $("login-err").textContent = "";
      try {
        await DL.signIn($("login-email").value, $("login-pass").value);
        showDash();
      } catch (err) {
        $("login-err").textContent = err.message || "Falha no login.";
      }
    });
    $("btn-logout").onclick = async () => { await DL.signOut(); showLogin(); };
    $("btn-new").onclick = () => openModal(null);
    $("btn-reset").onclick = async () => {
      if (DL.mode !== "local") { alert("Restauração disponível apenas no modo local."); return; }
      if (confirm("Restaurar a lista original de produtos? Suas alterações locais serão perdidas.")) {
        await DL.resetToSeed(); loadProducts();
      }
    };
    $("admin-search").addEventListener("input", renderTable);
    $("admin-cat").addEventListener("change", renderTable);

    // modal
    $("modal-close").onclick = closeModal;
    $("modal-cancel").onclick = closeModal;
    $("modal").addEventListener("click", (e) => { if (e.target === $("modal")) closeModal(); });
    $("modal-save").onclick = saveProduct;
    $("f-category").addEventListener("change", toggleFlavors);

    $("f-image-file").addEventListener("change", async (e) => {
      const file = e.target.files[0]; if (!file) return;
      $("upload-hint").textContent = "Enviando imagem…";
      try {
        const url = await DL.uploadImage(file);
        $("f-image-url").value = url;
        showPreview(url);
        $("upload-hint").textContent = "Imagem pronta ✓";
      } catch (err) { $("upload-hint").textContent = "Erro no upload: " + err.message; }
    });
    $("f-image-url").addEventListener("input", () => showPreview($("f-image-url").value));
  }

  /* ---------- data ---------- */
  async function loadProducts() {
    try { PRODUCTS = await DL.list(); } catch (e) { alert("Erro ao carregar: " + e.message); return; }
    renderStats(); renderTable();
  }

  function renderStats() {
    const pods = PRODUCTS.filter((p) => p.category === "pods");
    const perf = PRODUCTS.filter((p) => p.category === "perfume");
    const off = PRODUCTS.filter((p) => p.active === false);
    $("stats").innerHTML = `
      <div class="stat"><div class="n">${PRODUCTS.length}</div><div class="l">Produtos</div></div>
      <div class="stat"><div class="n">${pods.length}</div><div class="l">Pods</div></div>
      <div class="stat"><div class="n">${perf.length}</div><div class="l">Perfumes</div></div>
      <div class="stat"><div class="n">${off.length}</div><div class="l">Inativos</div></div>`;
  }

  function renderTable() {
    const q = $("admin-search").value.trim().toLowerCase();
    const cat = $("admin-cat").value;
    let list = PRODUCTS.slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
    if (cat) list = list.filter((p) => p.category === cat);
    if (q) list = list.filter((p) =>
      (p.brand + " " + p.name).toLowerCase().includes(q) ||
      (p.flavors || []).some((f) => f.toLowerCase().includes(q)));

    const rows = $("admin-rows");
    if (list.length === 0) { rows.innerHTML = `<tr><td colspan="9" style="text-align:center;color:var(--text-muted);padding:30px">Nenhum produto.</td></tr>`; return; }
    rows.innerHTML = list.map((p) => `
      <tr>
        <td>${p.image_url ? `<img class="t-img" src="${esc(p.image_url)}" alt="">` : `<div class="t-img ph">❖</div>`}</td>
        <td><span class="tag-cat ${p.category}">${p.category === "pods" ? "Pod" : "Perfume"}</span></td>
        <td>${esc(p.brand)}</td>
        <td>${esc(p.name)}</td>
        <td>${brl(p.price_atacado)}</td>
        <td>${brl(p.price_varejo)}</td>
        <td>${(p.flavors || []).length || "—"}</td>
        <td>${p.active === false ? '<span class="tag-off">inativo</span>' : "✓ ativo"}</td>
        <td><div class="row-actions">
          <button class="icon-btn" data-edit="${esc(p.id)}">✎</button>
          <button class="icon-btn del" data-del="${esc(p.id)}">🗑</button>
        </div></td>
      </tr>`).join("");

    rows.querySelectorAll("[data-edit]").forEach((b) => b.onclick = () => openModal(PRODUCTS.find((x) => x.id === b.dataset.edit)));
    rows.querySelectorAll("[data-del]").forEach((b) => b.onclick = () => delProduct(b.dataset.del));
  }

  /* ---------- modal ---------- */
  function toggleFlavors() {
    $("flavors-field").style.display = $("f-category").value === "perfume" ? "none" : "block";
    if ($("f-category").value === "perfume" && !$("f-min").value) $("f-min").value = 3;
    if ($("f-category").value === "pods" && !$("f-min").value) $("f-min").value = 10;
  }
  function showPreview(url) {
    const img = $("f-image-preview");
    if (url) { img.src = url; img.style.display = "block"; } else img.style.display = "none";
  }

  function openModal(p) {
    $("modal-title").textContent = p ? "Editar produto" : "Novo produto";
    $("f-id").value = p ? p.id : "";
    $("f-category").value = p ? p.category : "pods";
    $("f-brand").value = p ? p.brand : "";
    $("f-name").value = p ? p.name : "";
    $("f-atacado").value = p ? p.price_atacado : "";
    $("f-varejo").value = p ? p.price_varejo : "";
    $("f-min").value = p ? p.atacado_min : "";
    $("f-sort").value = p ? (p.sort || "") : "";
    $("f-flavors").value = p ? (p.flavors || []).join("\n") : "";
    $("f-image-url").value = p ? (p.image_url || "") : "";
    $("f-image-file").value = "";
    $("f-active").checked = p ? p.active !== false : true;
    $("upload-hint").textContent = "";
    showPreview(p ? p.image_url : "");
    toggleFlavors();
    $("modal").classList.add("open");
  }
  function closeModal() { $("modal").classList.remove("open"); }

  async function saveProduct() {
    const cat = $("f-category").value;
    const prod = {
      id: $("f-id").value || undefined,
      category: cat,
      brand: $("f-brand").value.trim(),
      name: $("f-name").value.trim(),
      price_atacado: Number($("f-atacado").value || 0),
      price_varejo: Number($("f-varejo").value || 0),
      atacado_min: Number($("f-min").value || (cat === "pods" ? 10 : 3)),
      sort: Number($("f-sort").value || 0),
      flavors: cat === "perfume" ? [] : $("f-flavors").value.split("\n").map((s) => s.trim()).filter(Boolean),
      image_url: $("f-image-url").value.trim() || null,
      active: $("f-active").checked
    };
    if (!prod.brand || !prod.name) { alert("Preencha marca e nome do produto."); return; }
    if (!prod.price_varejo) prod.price_varejo = prod.price_atacado + (cat === "pods" ? 10 : 10);
    try {
      await DL.upsert(prod);
      closeModal();
      loadProducts();
    } catch (e) { alert("Erro ao salvar: " + e.message); }
  }

  async function delProduct(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!confirm(`Remover "${p ? p.name : id}"? Esta ação não pode ser desfeita.`)) return;
    try { await DL.remove(id); loadProducts(); } catch (e) { alert("Erro ao remover: " + e.message); }
  }
})();
