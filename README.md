# 👑 El Prince Company — Loja Online

Loja com tema **árabe de luxo**, **coroa 3D** (WebGL), **carrinho de compras** com checkout
no WhatsApp e **painel administrativo** para o dono gerenciar produtos, preços, sabores e fotos.

---

## ▶️ Como rodar localmente (Fase A — agora)

Abra um terminal **nesta pasta** e rode um servidor estático:

```bash
python -m http.server 8000
```

Depois acesse no navegador:

- **Loja:** http://localhost:8000
- **Painel admin:** http://localhost:8000/admin.html

> Precisa de um servidor (não abrir o arquivo direto com `file://`) porque a coroa 3D
> usa módulos ES e o catálogo carrega via JavaScript.

### 🔑 Login do painel (modo LOCAL)
- **E-mail:** `abdodiabb90@gmail.com`
- **Senha:** `elprince123`  *(definida em `assets/js/config.js` → `LOCAL_ADMIN_PASSWORD`)*

No **modo local**, as alterações do admin ficam salvas **só no seu navegador**
(`localStorage`). Para que os clientes vejam as mudanças, conclua a **Fase B** (Supabase).

---

## 🗂️ Estrutura

```
index.html              Loja (vitrine)
admin.html              Painel administrativo
assets/
  css/styles.css        Estilos (tema árabe, carrinho, admin, responsivo)
  js/
    config.js           Configuração (Supabase + senha local)
    seed.js             Catálogo inicial + dados da loja
    data-layer.js       Acesso a dados (Supabase OU local)
    store.js            Render da vitrine (filtros, busca de sabor)
    cart.js             Carrinho + regra atacado/varejo + checkout WhatsApp
    crown3d.js          Coroa 3D (Three.js)
    agegate.js          Verificação +18
    admin.js            Login + CRUD do painel
  img/                  Coloque aqui a logo (logo.png) e fotos, se quiser
supabase/
  migrations/0001_init.sql   Tabela + segurança (RLS) + Storage
  seed.sql                   Carga dos produtos
```

---

## ☁️ Fase B — Ativar o painel real (Supabase)

Quando quiser que o admin salve **para todos os clientes** e suba fotos de verdade:

1. **Crie um projeto novo** em https://supabase.com (gratuito), só para a loja.
2. No projeto, vá em **SQL Editor** e rode, nesta ordem:
   - `supabase/migrations/0001_init.sql`
   - `supabase/seed.sql`
   (Isso cria a tabela `products`, as regras de segurança, o bucket de fotos `produtos`
   e carrega o catálogo.)
3. **Crie o usuário admin** em **Authentication → Users → Add user**:
   - E-mail: `abdodiabb90@gmail.com` · defina a senha desejada · marque *Auto Confirm*.
4. Em **Project Settings → API**, copie a **Project URL** e a **publishable key**.
5. Preencha `assets/js/config.js`:
   ```js
   SUPABASE_URL: "https://SEU-PROJETO.supabase.co",
   SUPABASE_ANON_KEY: "sb_publishable_...."
   ```
6. Recarregue o site. Agora o catálogo vem do banco e o painel salva de verdade
   (inclusive **upload de fotos** no bucket `produtos`).

> O site detecta sozinho: com o config preenchido usa o Supabase; vazio, usa o modo local.

---

## 🌐 Publicar online (opcional)

Como é um site estático, pode publicar de graça em **Vercel**, **Netlify** ou **Cloudflare Pages**:
basta enviar esta pasta. Faça isso **depois da Fase B**, para o painel funcionar para os clientes.

---

## 📋 Regras de preço (já implementadas)

- **Pods:** atacado a partir de **10 peças** · varejo = atacado + R$10.
- **Perfumes:** atacado a partir de **3 peças**.
- O carrinho aplica **atacado automaticamente** ao atingir o mínimo da categoria
  e avisa quantas peças faltam.

## 🖼️ Logo
Salve a imagem da coroa em `assets/img/logo.png` para usá-la no lugar do ícone padrão
(o site já funciona sem ela — usa uma coroa em SVG e a coroa 3D no topo).
