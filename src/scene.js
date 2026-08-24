import * as THREE from "three";

/**
 * Immersive 3D product scene: a rotating pedestal with a product "gem" and
 * orbit-style camera. Lightweight, no loaders required (procedural geometry),
 * so it runs offline with no asset dependencies.
 */
export function startExperience(root) {
  if (!root) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1018);

  const camera = new THREE.PerspectiveCamera(
    45,
    root.clientWidth / root.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.2, 4);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xd4af37, 1.2);
  key.position.set(3, 5, 2);
  scene.add(key);
  const rim = new THREE.PointLight(0xefa7c5, 1.0, 20);
  rim.position.set(-3, 1, -2);
  scene.add(rim);

  // Pedestal
  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 1.3, 0.3, 48),
    new THREE.MeshStandardMaterial({ color: 0x241722, roughness: 0.8 })
  );
  pedestal.position.y = -0.6;
  scene.add(pedestal);

  // Product "gem"
  const gem = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.9, 0),
    new THREE.MeshStandardMaterial({
      color: 0xefa7c5,
      metalness: 0.4,
      roughness: 0.15,
      flatShading: true,
    })
  );
  scene.add(gem);

  // Slow auto-rotate
  let raf;
  const animate = () => {
    gem.rotation.y += 0.004;
    gem.rotation.x += 0.0015;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  };
  animate();

  // Basic resize handling
  const onResize = () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  };
  window.addEventListener("resize", onResize);

  // Simple pointer drag to orbit
  let dragging = false;
  let lastX = 0;
  root.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
  });
  window.addEventListener("pointerup", () => (dragging = false));
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    gem.rotation.y += dx * 0.01;
  });

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onResize);
    renderer.dispose();
  };
}
