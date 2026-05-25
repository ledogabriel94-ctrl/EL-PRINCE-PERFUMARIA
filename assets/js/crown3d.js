/* ============================================================
   EL PRINCE COMPANY — Coroa 3D (Three.js / WebGL)
   Coroa dourada procedural girando no fundo do hero.
   Carregado como módulo ES. Fallback gracioso se não houver WebGL.
   ============================================================ */
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

(function initCrown() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  // Detecção de WebGL
  try {
    const test = document.createElement("canvas");
    if (!(window.WebGLRenderingContext && (test.getContext("webgl") || test.getContext("experimental-webgl")))) {
      canvas.style.display = "none";
      return;
    }
  } catch (e) {
    canvas.style.display = "none";
    return;
  }

  const host = canvas.parentElement;
  let W = host.clientWidth, H = host.clientHeight || window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();

  // Ambiente para reflexos metálicos realistas
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(35, W / H, 0.1, 100);
  camera.position.set(0, 1.05, 8.4);
  camera.lookAt(0, 1.15, 0);

  // Luzes (destaques dourados)
  const key = new THREE.DirectionalLight(0xfff0c0, 2.2); key.position.set(4, 6, 5); scene.add(key);
  const warm = new THREE.PointLight(0xffcf6b, 60, 40); warm.position.set(-5, 2, 4); scene.add(warm);
  const red = new THREE.PointLight(0x8b0000, 30, 40); red.position.set(3, -3, 3); scene.add(red);
  scene.add(new THREE.AmbientLight(0x402d10, 0.6));

  // Materiais
  const gold = new THREE.MeshStandardMaterial({
    color: 0xD4AF37, metalness: 1.0, roughness: 0.22,
    emissive: 0x3a2a08, emissiveIntensity: 0.35
  });
  const goldBright = new THREE.MeshStandardMaterial({
    color: 0xF5E27A, metalness: 1.0, roughness: 0.15,
    emissive: 0x5a4410, emissiveIntensity: 0.4
  });
  const ruby = new THREE.MeshStandardMaterial({
    color: 0x8b0000, metalness: 0.3, roughness: 0.1,
    emissive: 0x4a0000, emissiveIntensity: 0.6
  });
  const pearl = new THREE.MeshStandardMaterial({
    color: 0xfff5e0, metalness: 0.1, roughness: 0.25,
    emissive: 0x2a2418, emissiveIntensity: 0.3
  });

  const crown = new THREE.Group();
  const R = 1.55;          // raio da coroa
  const bandH = 0.95;      // altura do aro

  // Aro principal (cilindro aberto)
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(R, R * 1.02, bandH, 64, 1, true), gold
  );
  band.position.y = -0.1;
  crown.add(band);

  // Anel inferior grosso (base)
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(R * 1.02, 0.13, 24, 80), goldBright);
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = -0.575;
  crown.add(baseRing);

  // Anel superior fino
  const topRing = new THREE.Mesh(new THREE.TorusGeometry(R, 0.07, 20, 80), goldBright);
  topRing.rotation.x = Math.PI / 2;
  topRing.position.y = 0.375;
  crown.add(topRing);

  // Pontas (espigões) + gemas no topo
  const N = 8;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const big = i % 2 === 0;
    const h = big ? 1.5 : 0.95;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.17, h, 24), big ? goldBright : gold);
    spike.position.set(Math.cos(a) * R, 0.375 + h / 2, Math.sin(a) * R);
    crown.add(spike);

    // gema no topo de cada ponta
    const gem = new THREE.Mesh(new THREE.SphereGeometry(big ? 0.16 : 0.11, 24, 24), big ? ruby : pearl);
    gem.position.set(Math.cos(a) * R, 0.375 + h + (big ? 0.12 : 0.08), Math.sin(a) * R);
    crown.add(gem);
  }

  // Gemas cravadas no aro
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 + Math.PI / N;
    const gem = new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 24), i % 2 ? ruby : pearl);
    gem.position.set(Math.cos(a) * R * 1.0, -0.05, Math.sin(a) * R * 1.0);
    gem.scale.z = 0.5;
    gem.lookAt(0, -0.05, 0);
    crown.add(gem);
  }

  // Cruz/ornamento central no topo
  const orbStem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 16), goldBright);
  orbStem.position.y = 0.375 + 1.5 + 0.35;
  crown.add(orbStem);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), goldBright);
  orb.position.y = 0.375 + 1.5 + 0.72;
  crown.add(orb);

  const BASE_Y = 1.05;
  crown.position.y = BASE_Y;
  crown.scale.setScalar(0.92);
  scene.add(crown);

  // Partículas douradas flutuando
  const pGeo = new THREE.BufferGeometry();
  const pCount = 90;
  const pos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pos[i*3]   = (Math.random() - 0.5) * 12;
    pos[i*3+1] = (Math.random() - 0.5) * 8;
    pos[i*3+2] = (Math.random() - 0.5) * 6 - 1;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0xD4AF37, size: 0.045, transparent: true, opacity: 0.55, depthWrite: false
  }));
  scene.add(particles);

  // Resize
  function resize() {
    W = host.clientWidth; H = host.clientHeight || window.innerHeight;
    camera.aspect = W / H; camera.updateProjectionMatrix();
    renderer.setSize(W, H, false);
  }
  window.addEventListener("resize", resize);

  // Mouse parallax suave
  let tx = 0, ty = 0;
  window.addEventListener("mousemove", (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 0.4;
    ty = (e.clientY / window.innerHeight - 0.5) * 0.25;
  });

  const clock = new THREE.Clock();
  let running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) animate(); });

  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    crown.rotation.y += 0.0045;
    crown.position.y = BASE_Y + Math.sin(t * 0.8) * 0.08;
    crown.rotation.x = THREE.MathUtils.lerp(crown.rotation.x, 0.12 + ty, 0.05);
    crown.rotation.z = THREE.MathUtils.lerp(crown.rotation.z, tx * 0.3, 0.05);
    particles.rotation.y = t * 0.02;
    renderer.render(scene, camera);
  }
  animate();
})();
