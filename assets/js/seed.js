/* ============================================================
   EL PRINCE COMPANY — Dados iniciais (seed)
   Catálogo extraído das listas oficiais do WhatsApp/Instagram.
   PODS:    preço da tabela = ATACADO  •  varejo = atacado + R$10  •  atacado mín. 10 peças
   PERFUME: atacado/varejo explícitos                              •  atacado mín. 3 peças
   ============================================================ */
window.EL_PRINCE_SEED = [
  /* ----------------------------- IGNITE ----------------------------- */
  { id:"pod-01", category:"pods", brand:"IGNITE", name:"Ignite V155 Puffs Ultra Slim",
    price_atacado:65, price_varejo:75, atacado_min:10, active:true, sort:1,
    flavors:["Banana Ice","Tropical Açaí","Strawberry Kiwi","Green Apple","Watermelon Dragonfruit","Kiwi Passion Guava","Watermelon Mix","Blueberry Ice","Strawberry Banana","Pineapple Ice","Strawberry Ice","Grape Ice","Strawberry Watermelon","Menthol"] },

  { id:"pod-02", category:"pods", brand:"IGNITE", name:"Ignite Mix 40K Puffs",
    price_atacado:85, price_varejo:95, atacado_min:10, active:true, sort:2,
    flavors:["Grape Pop + Peach Ice","Strawberry Mango Ice + Banana Ice","Ice Mint + Peach Grape","Mighty Melon + Menthol","Strawberry Watermelon + Aloe Grape","Banana Ice + Strawberry Ice","Blueberry Ice + Raspberry Black Berry","Orange Ice + Strawberry Ice","Watermelon Grape + Açaí Ice","Pineapple Mango Ice + Strawberry Ice","Apple Ice + Strawberry Watermelon","Grape + Strawberry Ice","Watermelon + Cherry","Mango Ice + Passion Fruit Guava"] },

  { id:"pod-03", category:"pods", brand:"IGNITE", name:"Ignite 40K Puffs Ice",
    price_atacado:79, price_varejo:89, atacado_min:10, active:true, sort:3,
    flavors:["Blueberry","Cola","Lemon Lime","Peach Mango Watermelon","Strawberry Kiwi","Pineapple Ice"] },

  { id:"pod-04", category:"pods", brand:"IGNITE", name:"Ignite Sweet V40K Puffs",
    price_atacado:79, price_varejo:89, atacado_min:10, active:true, sort:4,
    flavors:["Cool Menthol","Blue Razz Pop","Green Apple"] },

  { id:"pod-05", category:"pods", brand:"IGNITE", name:"Ignite 30K Puffs Ultra Slim",
    price_atacado:80, price_varejo:90, atacado_min:10, active:true, sort:5,
    flavors:["Green Apple","Strawberry Kiwi","Watermelon Ice","Watermelon Mix","Minty Melon","Strawberry Banana","Sweet And Sour Pomegranate","Banana Ice","Blueberry Strawberry Coconut","Banana Coconut Water","Menthol","Ice Mint"] },

  { id:"pod-06", category:"pods", brand:"IGNITE", name:"Ignite 30K Puffs",
    price_atacado:80, price_varejo:90, atacado_min:10, active:true, sort:6,
    flavors:["Menthol","Banana","Sweet And Sour Pomegranate"] },

  { id:"pod-07", category:"pods", brand:"IGNITE", name:"Ignite V55K Puffs",
    price_atacado:53, price_varejo:63, atacado_min:10, active:true, sort:7,
    flavors:["Menthol","Aloe Grape","Vanilla Cream","Minty Melon","Blueberry Ice","Strawberry Ice","Miami Mint","Melon Mix","Grape Ice","Ice Mint","Strawberry Banana","Grape Apple Açaí","Strawberry Watermelon","Strawberry Kiwi","Watermelon Ice"] },

  { id:"pod-08", category:"pods", brand:"IGNITE", name:"Ignite V80K Puffs New Edition",
    price_atacado:60, price_varejo:70, atacado_min:10, active:true, sort:8,
    flavors:["Tobacco","Strawberry Ice","Strawberry Kiwi"] },

  { id:"pod-09", category:"pods", brand:"IGNITE", name:"Ignite V3500 Puffs",
    price_atacado:30, price_varejo:40, atacado_min:10, active:true, sort:9,
    flavors:["Strawberry Apple Watermelon","Cherry Ice","Blue Raspberry Ice","Grape Ice","Menthol","Fruit Splash","Ice Mint","Green Apple Peach Kiwi"] },

  { id:"pod-10", category:"pods", brand:"IGNITE", name:"Ignite V Nano 1000 Puffs",
    price_atacado:27, price_varejo:37, atacado_min:10, active:true, sort:10,
    flavors:["Orange Soda Ice","Cherry Lemonade","Blueberry Raspberry","Ice Mint","Cola Ice","Green Apple","Cool Menthol","Açaí Grape"] },

  { id:"pod-11", category:"pods", brand:"IGNITE", name:"Ignite P100",
    price_atacado:65, price_varejo:75, atacado_min:10, active:true, sort:11,
    flavors:["Grape Ice","Ice Mint","Watermelon Ice","Green Apple","Strawberry Ice","Menthol"] },

  { id:"pod-12", category:"pods", brand:"IGNITE", name:"Ignite P100 Refil",
    price_atacado:45, price_varejo:55, atacado_min:10, active:true, sort:12,
    flavors:["Blueberry Ice","Strawberry Kiwi","Green Apple","Banana Ice"] },

  /* ----------------------------- ELF BAR ----------------------------- */
  { id:"pod-13", category:"pods", brand:"ELF BAR", name:"Elf Bar BC 10K Puffs Special Edition",
    price_atacado:53, price_varejo:63, atacado_min:10, active:true, sort:13,
    flavors:["Admiration Blue","Honeydew Duo Ice"] },

  { id:"pod-14", category:"pods", brand:"ELF BAR", name:"Elf Bar BC 15K Puffs",
    price_atacado:55, price_varejo:65, atacado_min:10, active:true, sort:14,
    flavors:["Kiwi Passion Fruit Guava","Tropical Lemonade","Green Apple Ice","Passion Fruit Orange Guava","Americano Ice / Café","Hawaiian Popsicle","Peach Mango Watermelon","Strawberry Ice Cream","Bubbaloo Grape","Strawberry Kiwi","Blue Razz Ice","Miami Mint","Mango Magic","Pineapple Ice"] },

  { id:"pod-15", category:"pods", brand:"ELF BAR", name:"Elf Bar Trio 40K Puffs",
    price_atacado:70, price_varejo:80, atacado_min:10, active:true, sort:15,
    flavors:["Pomegranate Blast","Orange Blast","Blueberry Pom Slushy","Scary Berry","Strawberry Orange Lime","Cool Menthol","Sour Apple Ice","Pineapple Lime","Blue Razz Ice","Black Mint","Sakura Grape","Peach Twist","La Grape"] },

  { id:"pod-16", category:"pods", brand:"ELF BAR", name:"Elf Bar BC Pro 45K Puffs",
    price_atacado:85, price_varejo:95, atacado_min:10, active:true, sort:16,
    flavors:["Americano Ice","Green Apple Ice","Tropical Baja","Watermelon Peach Frost","Grape Twist","Kiwi Passion Fruit Guava","Watermelon Ice"] },

  { id:"pod-17", category:"pods", brand:"ELF BAR", name:"Elf Bar Ice King 40K Puffs",
    price_atacado:75, price_varejo:85, atacado_min:10, active:true, sort:17,
    flavors:["Baja Splash","Sour Apple Ice","Double Apple Ice","Cherry Strazz","Blue Razz Ice","Miami Mint","Sour Lush Gummy","Dragon Strawnana","Hawaiian Slush","Peach Blue Slush","Strawberry Spark","Neon Twist","Cola Slush","Black Mint","Green Apple Slush","Wild Berry Slush"] },

  { id:"pod-18", category:"pods", brand:"ELF BAR", name:"Elf Bar TE 30K Puffs",
    price_atacado:72, price_varejo:82, atacado_min:10, active:true, sort:18,
    flavors:["Elf Love","Cherry Strazz","Watermelon Ice","Menthol","Bubbaloo Tutti Frutti","Açaí Banana","Miami Mint","Dragon Strawnana","Strawmelon Peach","Green Apple"] },

  { id:"pod-19", category:"pods", brand:"ELF BAR", name:"Elf Bar EW Refil 16K Puffs",
    price_atacado:63, price_varejo:73, atacado_min:10, active:true, sort:19,
    flavors:["Sour Blackberry Blueberry","Sour Apple Ice","Dragon Melon"] },

  /* --------------------------- OUTRAS MARCAS --------------------------- */
  { id:"pod-20", category:"pods", brand:"DINNER LADY", name:"Dinner Lady 20K Puffs",
    price_atacado:65, price_varejo:75, atacado_min:10, active:true, sort:20,
    flavors:["Apple Peach Ice","Banana Ice","Blue Mint","Cola Ice","Grape Ice","Ice Mint","Menthol","Mango Ice","Passion Fruit Ice","Peach Mango Watermelon","Pineapple Ice","Strawberry Ice","Watermelon Ice"] },

  { id:"pod-21", category:"pods", brand:"OXBAR", name:"Oxbar 30K Puffs",
    price_atacado:65, price_varejo:75, atacado_min:10, active:true, sort:21,
    flavors:["Red Ice","Sour Mango","Raspberry Lemon","Double Apple","Grande Purple","Paradise Grape","Grape Peach","Passion Kiwi","Blue Raspberry Lemon","Blackcurrant Lemon","Ox Love","Raspberry Watermelon","Strawberry Watermelon","Fanta Strawberry"] },

  { id:"pod-22", category:"pods", brand:"DOJO X VAPORESSO", name:"Dojo Sphere X Vaporesso 40K Puffs",
    price_atacado:62, price_varejo:72, atacado_min:10, active:true, sort:22,
    flavors:["Miami Mint","Strawberry Kiwi","Sour Apple B + Pop","Peachy Smash","Strawberry Slam Dunk","Grape Mojo","Berry Blast Triad","Fresh Splash","Fresh Berry Orange","Sour Batch Watermelon Peach","Hawaii Dream","Baja Splash Mtd","Blue Razz Ice","Frosty Banana Taffy"] },

  { id:"pod-23", category:"pods", brand:"RABBEATS", name:"Rabbeats RC 50K Puffs",
    price_atacado:75, price_varejo:85, atacado_min:10, active:true, sort:23,
    flavors:["Menthol","Triple Berry","Ice Mint","Blueberry Lemon"] },

  { id:"pod-24", category:"pods", brand:"THE BLACK SHEEP", name:"The Black Sheep 20K Puffs",
    price_atacado:75, price_varejo:85, atacado_min:10, active:true, sort:24,
    flavors:["Menthol + Fresh Mint"] },

  { id:"pod-25", category:"pods", brand:"THE BLACK SHEEP", name:"The Black Sheep 40K Puffs",
    price_atacado:90, price_varejo:100, atacado_min:10, active:true, sort:25,
    flavors:["Fresh Mint + Mango Orange","Grape + Grape","Grape + Grape Mango","Strawberry Kiwi + Cola Lime","Blueberry Bubble + Sour Green Apple","Grape + Menthol","Kiwi Grape Starfruit + Açaí Strawberry Banana","Açaí Strawberry + Açaí Grape","Grape Mango + Fresh Mint"] },

  { id:"pod-26", category:"pods", brand:"NIK BAR", name:"Nik Bar 10K Puffs",
    price_atacado:50, price_varejo:60, atacado_min:10, active:true, sort:26,
    flavors:["Clear (Menta Suave e Gelada)","Stone Freeze","Fresh Mint","Strawberry Shortcake","Aloe Grape","Green Apple","Blueberry Ice","Menthol","Miami Mint","Passion Sour Kiwi","Strawberry Kiwi","Watermelon Sour","Watermelon Bubblegum","Strawberry Banana","Grape Apple","Strawberry Apple Watermelon","Banana Ice","Pineapple Ice","Sakura Grape"] },

  { id:"pod-27", category:"pods", brand:"NIK BAR", name:"Nik Bar Ice Baby 40K Puffs",
    price_atacado:75, price_varejo:85, atacado_min:10, active:true, sort:27,
    flavors:["Sour Apple Ice"] },

  { id:"pod-28", category:"pods", brand:"NIK BAR", name:"Nik Bar 30K Puffs",
    price_atacado:65, price_varejo:75, atacado_min:10, active:true, sort:28,
    flavors:["Fresh Mint","Blueberry Ice","Sakura Grape","Menthol","Sour Apple Ice","Passion Fruit Sour Kiwi","Ice Mint","Miami Mint"] },

  { id:"pod-29", category:"pods", brand:"LOST MARY", name:"Lost Mary Mixer 30K Puffs",
    price_atacado:63, price_varejo:73, atacado_min:10, active:true, sort:29,
    flavors:["Grapefruit Green Tea","Grapefruit Lemon Lime","Aloe Grape Sour Apple","Orange Strawberry"] },

  { id:"pod-30", category:"pods", brand:"LOST MARY", name:"Lost Mary Dura 35K Puffs",
    price_atacado:60, price_varejo:70, atacado_min:10, active:true, sort:30,
    flavors:["Pineapple Ice","Summer Orange","Hawaiian Juice","Hawaiian Mint","Miami Mint","Blue Razz Ice","Grapefruit Passion Guava","Watermelon Ice","Strawberry Ice","Menthol","Green Apple","Pomegranate Cherry Pineapple","Strawberry Kiwi","Strawberry Watermelon","Mango Ice"] },

  { id:"pod-31", category:"pods", brand:"HQD", name:"HQD Glaze Plus 30K Puffs",
    price_atacado:65, price_varejo:75, atacado_min:10, active:true, sort:31,
    flavors:["Black Ice","Banana Ice"] },

  { id:"pod-32", category:"pods", brand:"ZERO", name:"Zero 5K Puffs",
    price_atacado:25, price_varejo:35, atacado_min:10, active:true, sort:32,
    flavors:["Lush Freeze","Strawberry Mango","Tropical Punch","Watermelon Ice"] },

  /* ============================ PERFUMES ============================ */
  /* ----- LATTAFA ----- */
  { id:"perf-01", category:"perfume", brand:"LATTAFA", name:"Asad Elixir",     price_atacado:190, price_varejo:200, atacado_min:3, active:true, sort:101, flavors:[] },
  { id:"perf-02", category:"perfume", brand:"LATTAFA", name:"Asad Preto",      price_atacado:165, price_varejo:175, atacado_min:3, active:true, sort:102, flavors:[] },
  { id:"perf-03", category:"perfume", brand:"LATTAFA", name:"Asad Bourbon",    price_atacado:190, price_varejo:200, atacado_min:3, active:true, sort:103, flavors:[] },
  { id:"perf-04", category:"perfume", brand:"LATTAFA", name:"Yara Rosa",       price_atacado:165, price_varejo:175, atacado_min:3, active:true, sort:104, flavors:[] },
  { id:"perf-05", category:"perfume", brand:"LATTAFA", name:"Yara Cande",      price_atacado:155, price_varejo:165, atacado_min:3, active:true, sort:105, flavors:[] },
  { id:"perf-06", category:"perfume", brand:"LATTAFA", name:"Fakhar Black",    price_atacado:175, price_varejo:185, atacado_min:3, active:true, sort:106, flavors:[] },
  { id:"perf-07", category:"perfume", brand:"LATTAFA", name:"Fakhar Gold",     price_atacado:165, price_varejo:175, atacado_min:3, active:true, sort:107, flavors:[] },
  { id:"perf-08", category:"perfume", brand:"LATTAFA", name:"Fakhar Rosa",     price_atacado:230, price_varejo:240, atacado_min:3, active:true, sort:108, flavors:[] },

  /* ----- AL WATANIAH ----- */
  { id:"perf-09", category:"perfume", brand:"AL WATANIAH", name:"Sabah Al Ward",        price_atacado:135, price_varejo:145, atacado_min:3, active:true, sort:109, flavors:[] },
  { id:"perf-10", category:"perfume", brand:"AL WATANIAH", name:"Sabah Al Ward Sugar",  price_atacado:150, price_varejo:160, atacado_min:3, active:true, sort:110, flavors:[] },
  { id:"perf-11", category:"perfume", brand:"AL WATANIAH", name:"Ameerati",             price_atacado:130, price_varejo:140, atacado_min:3, active:true, sort:111, flavors:[] },
  { id:"perf-12", category:"perfume", brand:"AL WATANIAH", name:"Durrat Al Aroos",      price_atacado:135, price_varejo:145, atacado_min:3, active:true, sort:112, flavors:[] },
  { id:"perf-13", category:"perfume", brand:"AL WATANIAH", name:"Shagaf Al Ward",       price_atacado:155, price_varejo:165, atacado_min:3, active:true, sort:113, flavors:[] },
  { id:"perf-14", category:"perfume", brand:"AL WATANIAH", name:"Attar Al Wesal",       price_atacado:145, price_varejo:155, atacado_min:3, active:true, sort:114, flavors:[] },

  /* ----- ARMAF ----- */
  { id:"perf-15", category:"perfume", brand:"ARMAF", name:"Club de Nuit Woman",    price_atacado:190, price_varejo:200, atacado_min:3, active:true, sort:115, flavors:[] },
  { id:"perf-16", category:"perfume", brand:"ARMAF", name:"Club de Nuit Intense",  price_atacado:200, price_varejo:210, atacado_min:3, active:true, sort:116, flavors:[] },

  /* ----- ARQUS ----- */
  { id:"perf-17", category:"perfume", brand:"ARQUS", name:"La Bella Eau de Parfum",     price_atacado:155, price_varejo:165, atacado_min:3, active:true, sort:117, flavors:[] },
  { id:"perf-18", category:"perfume", brand:"ARQUS", name:"Al Pine Homem Sport",        price_atacado:165, price_varejo:175, atacado_min:3, active:true, sort:118, flavors:[] },

  /* ----- MAISON ALHAMBRA ----- */
  { id:"perf-19", category:"perfume", brand:"MAISON ALHAMBRA", name:"Salvo Intense Eau de Parfum",      price_atacado:150, price_varejo:160, atacado_min:3, active:true, sort:119, flavors:[] },
  { id:"perf-20", category:"perfume", brand:"MAISON ALHAMBRA", name:"Yeah! Man Eau de Parfum",          price_atacado:165, price_varejo:175, atacado_min:3, active:true, sort:120, flavors:[] },
  { id:"perf-21", category:"perfume", brand:"MAISON ALHAMBRA", name:"Victorioso Nero Eau de Parfum",    price_atacado:165, price_varejo:175, atacado_min:3, active:true, sort:121, flavors:[] }
];

/* Informações fixas da loja (não editáveis pelo admin, conforme decidido) */
window.EL_PRINCE_INFO = {
  brand: "El Prince Company",
  whatsapp: "5511981931779",
  whatsappDisplay: "(11) 98193-1779",
  instagram: "https://www.instagram.com/elprinceco",
  instagramHandle: "@elprinceco",
  threads: "https://www.threads.net/@elprinceco",
  email: "abdodiabb90@gmail.com",
  address: "R. Barão de Duprat, 323 — Centro Histórico, São Paulo - SP, 01023-001",
  mapsQuery: "R. Barão de Duprat, 323 - Centro Histórico de São Paulo, São Paulo - SP, 01023-001",
  slogan: "Temos os melhores produtos, com os menores preços.",
  hoursOnline: "Atendimento online: Seg a Sex até 17h • Sáb até 14h",
  hoursStore: "Loja: Segunda a Sexta, 08:00 — 17:00",
  adminEmail: "abdodiabb90@gmail.com"
};
