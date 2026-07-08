/* HELIODON — machined titanium object (three.js + RoomEnvironment) + motion */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('stage');

function initStage() {
  const ctx = canvas.getContext('webgl2', { antialias: true, alpha: true })
           || canvas.getContext('webgl', { antialias: true, alpha: true });
  if (!ctx) { canvas.classList.add('fallback'); return; }
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, context: ctx, antialias: true, alpha: true }); }
  catch (e) { canvas.classList.add('fallback'); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8.5);

  const group = new THREE.Group(); scene.add(group);
  const geo = new THREE.TorusKnotGeometry(1.55, 0.5, 240, 40, 2, 3);
  const mat = new THREE.MeshStandardMaterial({ color: 0xc2c6ce, metalness: 1.0, roughness: 0.32, envMapIntensity: 1.15 });
  const knot = new THREE.Mesh(geo, mat);
  group.add(knot);

  // key + rim lights for extra definition on top of the environment
  const key = new THREE.DirectionalLight(0xffe8cf, 1.4); key.position.set(5, 6, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fc4ff, 1.0); rim.position.set(-6, -2, -4); scene.add(rim);

  function layout() {
    const w = innerWidth;
    group.position.x = w < 820 ? 0 : 1.9;   // clear the left-aligned hero text on desktop
    camera.aspect = w / innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(w, innerHeight);
  }
  layout(); addEventListener('resize', layout);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  if (!reduce) addEventListener('pointermove', e => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = e.clientY / innerHeight - 0.5; }, { passive: true });

  const clock = new THREE.Clock();
  function frame() {
    const t = clock.getElapsedTime();
    const scroll = (scrollY || 0) * 0.0016;
    mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
    group.rotation.y = t * 0.18 + scroll * 6.0 + mouse.x * 0.6;
    group.rotation.x = 0.2 + Math.sin(t * 0.12) * 0.14 + mouse.y * 0.4;
    renderer.render(scene, camera);
    if (!reduce) requestAnimationFrame(frame);
  }
  if (reduce) { group.rotation.set(0.35, 0.7, 0); renderer.render(scene, camera); }
  else requestAnimationFrame(frame);
}
try { initStage(); } catch (e) { canvas.classList.add('fallback'); }

/* motion layer */
const hero = document.querySelector('.hero');
requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('loaded')));
setTimeout(() => hero.classList.add('loaded'), 400);
const revealAll = () => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in'));
window.addEventListener('load', () => {
  if (!window.gsap) { revealAll(); return; }
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.reveal:not(.hero .reveal)').forEach(el =>
    ScrollTrigger.create({ trigger: el, start: 'top 88%', onEnter: () => el.classList.add('is-in') }));
});
setTimeout(() => { if (!window.gsap) revealAll(); }, 2500);
