# threejs-commerce-experience

An immersive **3D product showcase** built with **Three.js** and **WebGL**, bundled
with Vite. A procedurally-generated product "gem" sits on a pedestal with a gold
key light and pink rim light; drag to orbit, and it auto-rotates when idle.

> Original project. No external 3D model assets required — geometry is generated
> in code, so the demo runs offline. Swap the `IcosahedronGeometry` for a
> `GLTFLoader` load of your real product model to go to production.

## Features

- Real-time WebGL rendering (Three.js).
- Auto-rotation + pointer-drag orbit.
- PBR-style material (metalness / roughness) with gold + pink lighting.
- Responsive canvas with resize handling.
- Zero asset dependencies.

## Tech Stack

- Three.js
- Vite
- WebGL

## Getting Started

```bash
npm install
npm run dev      # local dev server
npm run build    # outputs to dist/
```

## Going to production

Replace the procedural gem in `src/scene.js` with a `GLTFLoader.load('/models/your-product.glb', ...)`
call, position a camera that frames it, and add a loading manager. Everything
else (lighting, orbit, render loop) stays the same.

## License

MIT — see [LICENSE](LICENSE).

---

## Links

- 🌐 Website: [huggehub.com](https://www.huggehub.com)
- 💻 GitHub: [@astrodevit-creator](https://github.com/astrodevit-creator)
- 🔗 LinkedIn: _(add your profile URL)_
