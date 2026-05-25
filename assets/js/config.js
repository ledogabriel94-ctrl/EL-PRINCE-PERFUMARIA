/* ============================================================
   EL PRINCE COMPANY — Configuração
   ------------------------------------------------------------
   FASE A (agora): deixe vazio. O site roda com dados locais
   (seed.js) e o painel admin salva no navegador (localStorage).

   FASE B (depois de criar o projeto Supabase NOVO da loja):
   preencha SUPABASE_URL e SUPABASE_ANON_KEY com os dados do
   projeto (Settings → API). O site passa a ler/gravar no banco
   real e o admin salva para todos os clientes.
   ============================================================ */
window.EL_PRINCE_CONFIG = {
  SUPABASE_URL: "",        // ex: "https://xxxx.supabase.co"
  SUPABASE_ANON_KEY: "",   // ex: "sb_publishable_..."
  STORAGE_BUCKET: "produtos",

  // Senha do admin no MODO LOCAL (Fase A) apenas. Troque se quiser.
  // Na Fase B a senha real é definida no Supabase Auth e isto é ignorado.
  LOCAL_ADMIN_PASSWORD: "elprince123"
};
