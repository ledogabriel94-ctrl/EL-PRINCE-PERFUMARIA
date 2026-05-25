/* ============================================================
   EL PRINCE COMPANY — Coroa 3D (Three.js / WebGL)
   Coroa dourada procedural girando como PLANO DE FUNDO do hero
   (discreta, atrás do conteúdo). Fallback se não houver WebGL.
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
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  // Câmera afastada → coroa menor e centralizada ao fundo
  const camera = new THREE.PerspectiveCamera(35, W / H, 0.1, 100);
  camera.position.set(0, 0.5, 11.5);
  camera.lookAt(0, 0.3, 0);

  // Luzes mais suaves (fundo discreto)
  const key = new THREE.DirectionalLight(0xfff0c0, 1.6); key.position.set(4, 6, 5); scene.add(key);
  const warm = new THREE.PointLight(0xffcf6b, 40, 40); warm.position.set(-5, 2, 4); scene.add(warm);
  const red = new THREE.PointLight(0x8b0000, 18, 40); red.position.set(3, -3, 3); scene.add(red);
  scene.add(new THREE.AmbientLight(0x402d10, 0.5));

  // Materiais
  const gold = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 1.0, roughness: 0.24, emissive: 0x2a1f06, emissiveIntensity: 0.25 });
  const goldBright = new THREE.MeshStandardMaterial({ color: 0xF5E27A, metalness: 1.0, roughness: 0.16, emissive: 0x4a360c, emissiveIntensity: 0.3 });
  const ruby = new THREE.MeshStandardMaterial({ color: 0x8b0000, metalness: 0.3, roughness: 0.12, emissive: 0x3a0000, emissiveIntensity: 0.5 });
  const pearl = new THREE.MeshStandardMaterial({ color: 0xfff5e0, metalness: 0.1, roughness: 0.25, emissive: 0x2a2418, emissiveIntensity: 0.25 });

  const crown = new THREE.Group();
  const R = 1.55, bandH = 0.95;

  const band = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 1.02, bandH, 64, 1, true), gold);
  band.position.y = -0.1; crown.add(band);

  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(R * 1.02, 0.13, 24, 80), goldBright);
  baseRing.rotation.x = Math.PI / 2; baseRing.position.y = -0.575; crown.add(baseRing);

  const topRing = new THREE.Mesh(new THREE.TorusGeometry(R, 0.07, 20, 80), goldBright);
  topRing.rotation.x = Math.PI / 2; topRing.position.y = 0.375; crown.add(topRing);

  const N = 8;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const big = i % 2 === 0;
    const h = big ? 1.5 : 0.95;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.17, h, 24), big ? goldBright : gold);
    spike.position.set(Math.cos(a) * R, 0.375 + h / 2, Math.sin(a) * R); crown.add(spike);
    const gem = new THREE.Mesh(new THREE.SphereGeometry(big ? 0.16 : 0.11, 24, 24), big ? ruby : pearl);
    gem.position.set(Math.cos(a) * R, 0.375 + h + (big ? 0.12 : 0.08), Math.sin(a) * R); crown.add(gem);
  }
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 + Math.PI / N;
    const gem = new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 24), i % 2 ? ruby : pearl);
    gem.position.set(Math.cos(a) * R, -0.05, Math.sin(a) * R); gem.scale.z = 0.5; gem.lookAt(0, -0.05, 0); crown.add(gem);
  }
  const orbStem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 16), goldBright);
  orbStem.position.y = 0.375 + 1.5 + 0.35; crown.add(orbStem);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), goldBright);
  orb.position.y = 0.375 + 1.5 + 0.72; crown.add(orb);

  const BASE_Y = 0.2;
  crown.position.y = BASE_Y;
  crown.scale.setScalar(0.85);
  scene.add(crown);

  // Poucas partículas, bem sutis
  const pGeo = new THREE.BufferGeometry();
  const pCount = 45;
  const pos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pos[i*3] = (Math.random()-0.5)*14; pos[i*3+1] = (Math.random()-0.5)*9; pos[i*3+2] = (Math.random()-0.5)*6 - 1;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xD4AF37, size: 0.04, transparent: true, opacity: 0.35, depthWrite: false }));
  scene.add(particles);

  function resize() {
    W = host.clientWidth; H = host.clientHeight || window.innerHeight;
    camera.aspect = W / H; camera.updateProjectionMatrix(); renderer.setSize(W, H, false);
  }
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) animate(); });

  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    crown.rotation.y += 0.0032;                       // giro lento
    crown.position.y = BASE_Y + Math.sin(t * 0.6) * 0.05;
    crown.rotation.x = 0.06;                          // leve inclinação fixa (sem jitter)
    particles.rotation.y = t * 0.015;
    renderer.render(scene, camera);
  }
  animate();
})();
