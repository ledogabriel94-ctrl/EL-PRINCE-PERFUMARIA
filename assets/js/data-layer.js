/* ============================================================
   EL PRINCE COMPANY — Camada de dados (Data Layer)
   API única usada pela vitrine e pelo admin.
   - Se o Supabase estiver configurado (config.js) → usa Supabase.
   - Senão → modo LOCAL: seed.js + localStorage (Fase A).
   Todos os métodos são assíncronos para a troca ser transparente.
   ============================================================ */
(function () {
  const CFG = window.EL_PRINCE_CONFIG || {};
  const SEED = window.EL_PRINCE_SEED || [];
  const LS_CATALOG = "elprince_catalog_v1";
  const LS_SESSION = "elprince_session_v1";

  const useSupabase = !!(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY && window.supabase);
  let sb = null;
  if (useSupabase) {
    sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);
  }

  /* ---------------- helpers (modo local) ---------------- */
  function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

  function localLoad() {
    try {
      const raw = localStorage.getItem(LS_CATALOG);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    const fresh = deepClone(SEED);
    localStorage.setItem(LS_CATALOG, JSON.stringify(fresh));
    return fresh;
  }
  function localSave(list) {
    localStorage.setItem(LS_CATALOG, JSON.stringify(list));
  }

  /* ============================================================
     API PÚBLICA
     ============================================================ */
  const DataLayer = {
    mode: useSupabase ? "supabase" : "local",

    /* ---- catálogo ---- */
    async list({ onlyActive = false } = {}) {
      if (useSupabase) {
        let q = sb.from("products").select("*").order("sort", { ascending: true });
        if (onlyActive) q = q.eq("active", true);
        const { data, error } = await q;
        if (error) throw error;
        return data || [];
      }
      let list = localLoad().sort((a, b) => (a.sort || 0) - (b.sort || 0));
      if (onlyActive) list = list.filter((p) => p.active !== false);
      return deepClone(list);
    },

    async upsert(product) {
      if (useSupabase) {
        const { data, error } = await sb.from("products").upsert(product).select().single();
        if (error) throw error;
        return data;
      }
      const list = localLoad();
      if (!product.id) product.id = "loc-" + Date.now().toString(36);
      const i = list.findIndex((p) => p.id === product.id);
      if (i >= 0) list[i] = { ...list[i], ...product };
      else list.push({ active: true, flavors: [], sort: (list.length + 1) * 1, ...product });
      localSave(list);
      return deepClone(product);
    },

    async remove(id) {
      if (useSupabase) {
        const { error } = await sb.from("products").delete().eq("id", id);
        if (error) throw error;
        return true;
      }
      const list = localLoad().filter((p) => p.id !== id);
      localSave(list);
      return true;
    },

    async resetToSeed() {
      if (useSupabase) throw new Error("Reset disponível apenas no modo local.");
      localSave(deepClone(SEED));
      return true;
    },

    /* ---- imagens ---- */
    async uploadImage(file) {
      if (useSupabase) {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await sb.storage.from(CFG.STORAGE_BUCKET || "produtos").upload(path, file, { upsert: false });
        if (error) throw error;
        const { data } = sb.storage.from(CFG.STORAGE_BUCKET || "produtos").getPublicUrl(path);
        return data.publicUrl;
      }
      // modo local: devolve dataURL (fica salvo no próprio produto/localStorage)
      return await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = reject;
        r.readAsDataURL(file);
      });
    },

    /* ---- autenticação ---- */
    async signIn(email, password) {
      if (useSupabase) {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data.user;
      }
      // modo local (demo): valida e-mail do admin + senha do config
      const adminEmail = (window.EL_PRINCE_INFO || {}).adminEmail || "";
      const ok = email.trim().toLowerCase() === adminEmail.toLowerCase()
              && password === (CFG.LOCAL_ADMIN_PASSWORD || "elprince123");
      if (!ok) throw new Error("E-mail ou senha inválidos.");
      const user = { email: adminEmail };
      localStorage.setItem(LS_SESSION, JSON.stringify(user));
      return user;
    },

    async signOut() {
      if (useSupabase) { await sb.auth.signOut(); return; }
      localStorage.removeItem(LS_SESSION);
    },

    async currentUser() {
      if (useSupabase) {
        const { data } = await sb.auth.getUser();
        return data.user || null;
      }
      try { return JSON.parse(localStorage.getItem(LS_SESSION)) || null; } catch (_) { return null; }
    }
  };

  window.DataLayer = DataLayer;
})();
