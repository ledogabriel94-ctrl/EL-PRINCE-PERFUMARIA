-- ============================================================
-- EL PRINCE COMPANY — Carga inicial de produtos (Fase B)
-- Rodar após 0001_init.sql. Idempotente (on conflict do nothing).
-- ============================================================

insert into public.products (id, category, brand, name, price_atacado, price_varejo, atacado_min, sort, flavors) values
-- ===== PODS — IGNITE =====
('pod-01','pods','IGNITE','Ignite V155 Puffs Ultra Slim',65,75,10,1, ARRAY['Banana Ice','Tropical Açaí','Strawberry Kiwi','Green Apple','Watermelon Dragonfruit','Kiwi Passion Guava','Watermelon Mix','Blueberry Ice','Strawberry Banana','Pineapple Ice','Strawberry Ice','Grape Ice','Strawberry Watermelon','Menthol']),
('pod-02','pods','IGNITE','Ignite Mix 40K Puffs',85,95,10,2, ARRAY['Grape Pop + Peach Ice','Strawberry Mango Ice + Banana Ice','Ice Mint + Peach Grape','Mighty Melon + Menthol','Strawberry Watermelon + Aloe Grape','Banana Ice + Strawberry Ice','Blueberry Ice + Raspberry Black Berry','Orange Ice + Strawberry Ice','Watermelon Grape + Açaí Ice','Pineapple Mango Ice + Strawberry Ice','Apple Ice + Strawberry Watermelon','Grape + Strawberry Ice','Watermelon + Cherry','Mango Ice + Passion Fruit Guava']),
('pod-03','pods','IGNITE','Ignite 40K Puffs Ice',79,89,10,3, ARRAY['Blueberry','Cola','Lemon Lime','Peach Mango Watermelon','Strawberry Kiwi','Pineapple Ice']),
('pod-04','pods','IGNITE','Ignite Sweet V40K Puffs',79,89,10,4, ARRAY['Cool Menthol','Blue Razz Pop','Green Apple']),
('pod-05','pods','IGNITE','Ignite 30K Puffs Ultra Slim',80,90,10,5, ARRAY['Green Apple','Strawberry Kiwi','Watermelon Ice','Watermelon Mix','Minty Melon','Strawberry Banana','Sweet And Sour Pomegranate','Banana Ice','Blueberry Strawberry Coconut','Banana Coconut Water','Menthol','Ice Mint']),
('pod-06','pods','IGNITE','Ignite 30K Puffs',80,90,10,6, ARRAY['Menthol','Banana','Sweet And Sour Pomegranate']),
('pod-07','pods','IGNITE','Ignite V55K Puffs',53,63,10,7, ARRAY['Menthol','Aloe Grape','Vanilla Cream','Minty Melon','Blueberry Ice','Strawberry Ice','Miami Mint','Melon Mix','Grape Ice','Ice Mint','Strawberry Banana','Grape Apple Açaí','Strawberry Watermelon','Strawberry Kiwi','Watermelon Ice']),
('pod-08','pods','IGNITE','Ignite V80K Puffs New Edition',60,70,10,8, ARRAY['Tobacco','Strawberry Ice','Strawberry Kiwi']),
('pod-09','pods','IGNITE','Ignite V3500 Puffs',30,40,10,9, ARRAY['Strawberry Apple Watermelon','Cherry Ice','Blue Raspberry Ice','Grape Ice','Menthol','Fruit Splash','Ice Mint','Green Apple Peach Kiwi']),
('pod-10','pods','IGNITE','Ignite V Nano 1000 Puffs',27,37,10,10, ARRAY['Orange Soda Ice','Cherry Lemonade','Blueberry Raspberry','Ice Mint','Cola Ice','Green Apple','Cool Menthol','Açaí Grape']),
('pod-11','pods','IGNITE','Ignite P100',65,75,10,11, ARRAY['Grape Ice','Ice Mint','Watermelon Ice','Green Apple','Strawberry Ice','Menthol']),
('pod-12','pods','IGNITE','Ignite P100 Refil',45,55,10,12, ARRAY['Blueberry Ice','Strawberry Kiwi','Green Apple','Banana Ice']),
-- ===== PODS — ELF BAR =====
('pod-13','pods','ELF BAR','Elf Bar BC 10K Puffs Special Edition',53,63,10,13, ARRAY['Admiration Blue','Honeydew Duo Ice']),
('pod-14','pods','ELF BAR','Elf Bar BC 15K Puffs',55,65,10,14, ARRAY['Kiwi Passion Fruit Guava','Tropical Lemonade','Green Apple Ice','Passion Fruit Orange Guava','Americano Ice / Café','Hawaiian Popsicle','Peach Mango Watermelon','Strawberry Ice Cream','Bubbaloo Grape','Strawberry Kiwi','Blue Razz Ice','Miami Mint','Mango Magic','Pineapple Ice']),
('pod-15','pods','ELF BAR','Elf Bar Trio 40K Puffs',70,80,10,15, ARRAY['Pomegranate Blast','Orange Blast','Blueberry Pom Slushy','Scary Berry','Strawberry Orange Lime','Cool Menthol','Sour Apple Ice','Pineapple Lime','Blue Razz Ice','Black Mint','Sakura Grape','Peach Twist','La Grape']),
('pod-16','pods','ELF BAR','Elf Bar BC Pro 45K Puffs',85,95,10,16, ARRAY['Americano Ice','Green Apple Ice','Tropical Baja','Watermelon Peach Frost','Grape Twist','Kiwi Passion Fruit Guava','Watermelon Ice']),
('pod-17','pods','ELF BAR','Elf Bar Ice King 40K Puffs',75,85,10,17, ARRAY['Baja Splash','Sour Apple Ice','Double Apple Ice','Cherry Strazz','Blue Razz Ice','Miami Mint','Sour Lush Gummy','Dragon Strawnana','Hawaiian Slush','Peach Blue Slush','Strawberry Spark','Neon Twist','Cola Slush','Black Mint','Green Apple Slush','Wild Berry Slush']),
('pod-18','pods','ELF BAR','Elf Bar TE 30K Puffs',72,82,10,18, ARRAY['Elf Love','Cherry Strazz','Watermelon Ice','Menthol','Bubbaloo Tutti Frutti','Açaí Banana','Miami Mint','Dragon Strawnana','Strawmelon Peach','Green Apple']),
('pod-19','pods','ELF BAR','Elf Bar EW Refil 16K Puffs',63,73,10,19, ARRAY['Sour Blackberry Blueberry','Sour Apple Ice','Dragon Melon']),
-- ===== PODS — OUTRAS MARCAS =====
('pod-20','pods','DINNER LADY','Dinner Lady 20K Puffs',65,75,10,20, ARRAY['Apple Peach Ice','Banana Ice','Blue Mint','Cola Ice','Grape Ice','Ice Mint','Menthol','Mango Ice','Passion Fruit Ice','Peach Mango Watermelon','Pineapple Ice','Strawberry Ice','Watermelon Ice']),
('pod-21','pods','OXBAR','Oxbar 30K Puffs',65,75,10,21, ARRAY['Red Ice','Sour Mango','Raspberry Lemon','Double Apple','Grande Purple','Paradise Grape','Grape Peach','Passion Kiwi','Blue Raspberry Lemon','Blackcurrant Lemon','Ox Love','Raspberry Watermelon','Strawberry Watermelon','Fanta Strawberry']),
('pod-22','pods','DOJO X VAPORESSO','Dojo Sphere X Vaporesso 40K Puffs',62,72,10,22, ARRAY['Miami Mint','Strawberry Kiwi','Sour Apple B + Pop','Peachy Smash','Strawberry Slam Dunk','Grape Mojo','Berry Blast Triad','Fresh Splash','Fresh Berry Orange','Sour Batch Watermelon Peach','Hawaii Dream','Baja Splash Mtd','Blue Razz Ice','Frosty Banana Taffy']),
('pod-23','pods','RABBEATS','Rabbeats RC 50K Puffs',75,85,10,23, ARRAY['Menthol','Triple Berry','Ice Mint','Blueberry Lemon']),
('pod-24','pods','THE BLACK SHEEP','The Black Sheep 20K Puffs',75,85,10,24, ARRAY['Menthol + Fresh Mint']),
('pod-25','pods','THE BLACK SHEEP','The Black Sheep 40K Puffs',90,100,10,25, ARRAY['Fresh Mint + Mango Orange','Grape + Grape','Grape + Grape Mango','Strawberry Kiwi + Cola Lime','Blueberry Bubble + Sour Green Apple','Grape + Menthol','Kiwi Grape Starfruit + Açaí Strawberry Banana','Açaí Strawberry + Açaí Grape','Grape Mango + Fresh Mint']),
('pod-26','pods','NIK BAR','Nik Bar 10K Puffs',50,60,10,26, ARRAY['Clear (Menta Suave e Gelada)','Stone Freeze','Fresh Mint','Strawberry Shortcake','Aloe Grape','Green Apple','Blueberry Ice','Menthol','Miami Mint','Passion Sour Kiwi','Strawberry Kiwi','Watermelon Sour','Watermelon Bubblegum','Strawberry Banana','Grape Apple','Strawberry Apple Watermelon','Banana Ice','Pineapple Ice','Sakura Grape']),
('pod-27','pods','NIK BAR','Nik Bar Ice Baby 40K Puffs',75,85,10,27, ARRAY['Sour Apple Ice']),
('pod-28','pods','NIK BAR','Nik Bar 30K Puffs',65,75,10,28, ARRAY['Fresh Mint','Blueberry Ice','Sakura Grape','Menthol','Sour Apple Ice','Passion Fruit Sour Kiwi','Ice Mint','Miami Mint']),
('pod-29','pods','LOST MARY','Lost Mary Mixer 30K Puffs',63,73,10,29, ARRAY['Grapefruit Green Tea','Grapefruit Lemon Lime','Aloe Grape Sour Apple','Orange Strawberry']),
('pod-30','pods','LOST MARY','Lost Mary Dura 35K Puffs',60,70,10,30, ARRAY['Pineapple Ice','Summer Orange','Hawaiian Juice','Hawaiian Mint','Miami Mint','Blue Razz Ice','Grapefruit Passion Guava','Watermelon Ice','Strawberry Ice','Menthol','Green Apple','Pomegranate Cherry Pineapple','Strawberry Kiwi','Strawberry Watermelon','Mango Ice']),
('pod-31','pods','HQD','HQD Glaze Plus 30K Puffs',65,75,10,31, ARRAY['Black Ice','Banana Ice']),
('pod-32','pods','ZERO','Zero 5K Puffs',25,35,10,32, ARRAY['Lush Freeze','Strawberry Mango','Tropical Punch','Watermelon Ice']),
-- ===== PERFUMES — LATTAFA =====
('perf-01','perfume','LATTAFA','Asad Elixir',190,200,3,101,'{}'),
('perf-02','perfume','LATTAFA','Asad Preto',165,175,3,102,'{}'),
('perf-03','perfume','LATTAFA','Asad Bourbon',190,200,3,103,'{}'),
('perf-04','perfume','LATTAFA','Yara Rosa',165,175,3,104,'{}'),
('perf-05','perfume','LATTAFA','Yara Cande',155,165,3,105,'{}'),
('perf-06','perfume','LATTAFA','Fakhar Black',175,185,3,106,'{}'),
('perf-07','perfume','LATTAFA','Fakhar Gold',165,175,3,107,'{}'),
('perf-08','perfume','LATTAFA','Fakhar Rosa',230,240,3,108,'{}'),
-- ===== PERFUMES — AL WATANIAH =====
('perf-09','perfume','AL WATANIAH','Sabah Al Ward',135,145,3,109,'{}'),
('perf-10','perfume','AL WATANIAH','Sabah Al Ward Sugar',150,160,3,110,'{}'),
('perf-11','perfume','AL WATANIAH','Ameerati',130,140,3,111,'{}'),
('perf-12','perfume','AL WATANIAH','Durrat Al Aroos',135,145,3,112,'{}'),
('perf-13','perfume','AL WATANIAH','Shagaf Al Ward',155,165,3,113,'{}'),
('perf-14','perfume','AL WATANIAH','Attar Al Wesal',145,155,3,114,'{}'),
-- ===== PERFUMES — ARMAF =====
('perf-15','perfume','ARMAF','Club de Nuit Woman',190,200,3,115,'{}'),
('perf-16','perfume','ARMAF','Club de Nuit Intense',200,210,3,116,'{}'),
-- ===== PERFUMES — ARQUS =====
('perf-17','perfume','ARQUS','La Bella Eau de Parfum',155,165,3,117,'{}'),
('perf-18','perfume','ARQUS','Al Pine Homem Sport',165,175,3,118,'{}'),
-- ===== PERFUMES — MAISON ALHAMBRA =====
('perf-19','perfume','MAISON ALHAMBRA','Salvo Intense Eau de Parfum',150,160,3,119,'{}'),
('perf-20','perfume','MAISON ALHAMBRA','Yeah! Man Eau de Parfum',165,175,3,120,'{}'),
('perf-21','perfume','MAISON ALHAMBRA','Victorioso Nero Eau de Parfum',165,175,3,121,'{}')
on conflict (id) do nothing;
