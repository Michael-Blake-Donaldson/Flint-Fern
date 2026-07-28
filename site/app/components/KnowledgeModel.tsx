"use client";

import { useEffect, useRef, useState } from "react";
import type { EntryDetail } from "../entryDetails";

type Props = {
  slug: string;
  model: EntryDetail["model"];
  tone: string;
};

export function KnowledgeModel({ slug, model, tone }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRotation = useRef(-0.35);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let frame = 0;
    let resizeObserver: ResizeObserver | undefined;
    let visibilityObserver: IntersectionObserver | undefined;

    async function buildScene() {
      try {
        const THREE = await import("three");
        if (disposed || !mount) return;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        renderer.setSize(mount.clientWidth, mount.clientHeight, false);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.domElement.className = "fire-canvas";
        renderer.domElement.setAttribute("aria-hidden", "true");
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
        camera.position.set(5.2, 3.25, 6.4);
        camera.lookAt(0, 0.6, 0);
        scene.add(new THREE.HemisphereLight(0xf5f1e8, 0x24372a, 2.2));
        const key = new THREE.DirectionalLight(0xfff2dc, 3.3);
        key.position.set(-4, 7, 5);
        key.castShadow = true;
        key.shadow.mapSize.set(512, 512);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0x8cb6bd, 1.8);
        rim.position.set(5, 2, -4);
        scene.add(rim);

        const root = new THREE.Group();
        root.position.y = -0.55;
        scene.add(root);

        const palette = {
          pine: 0x27452d,
          forest: 0x3c5b40,
          moss: 0xaab79d,
          canvas: 0xf5f1e8,
          stone: 0x9c988e,
          leather: 0x6f5636,
          ember: 0xc86c32,
          lake: 0x356d7a,
          hazard: 0xa23a32,
          charcoal: 0x222522,
          white: 0xfffdf8,
        };
        const material = (color: number, metalness = 0, roughness = 0.72, opacity = 1) =>
          new THREE.MeshStandardMaterial({ color, metalness, roughness, transparent: opacity < 1, opacity, side: THREE.DoubleSide });
        const mesh = (geometry: InstanceType<typeof THREE.BufferGeometry>, mat: InstanceType<typeof THREE.Material>, parent = root) => {
          const object = new THREE.Mesh(geometry, mat);
          object.castShadow = true;
          object.receiveShadow = true;
          parent.add(object);
          return object;
        };
        const sphere = (position: [number, number, number], scale: [number, number, number], color: number, parent = root) => {
          const object = mesh(new THREE.SphereGeometry(1, 24, 18), material(color), parent);
          object.position.set(...position);
          object.scale.set(...scale);
          return object;
        };
        const cylinder = (position: [number, number, number], radius: number, height: number, color: number, parent = root, radial = 24) => {
          const object = mesh(new THREE.CylinderGeometry(radius, radius, height, radial), material(color), parent);
          object.position.set(...position);
          return object;
        };
        const box = (position: [number, number, number], scale: [number, number, number], color: number, parent = root) => {
          const object = mesh(new THREE.BoxGeometry(...scale), material(color), parent);
          object.position.set(...position);
          return object;
        };
        const extrude = (points: Array<[number, number]>, depth: number, color: number, parent = root) => {
          const shape = new THREE.Shape();
          points.forEach(([x, y], index) => index === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y));
          shape.closePath();
          const object = mesh(new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.035, bevelSegments: 2 }), material(color), parent);
          object.geometry.center();
          return object;
        };
        const ground = mesh(new THREE.CircleGeometry(3.15, 48), material(0x30463a, 0, 1, 0.18));
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.05;
        ground.receiveShadow = true;

        if (slug === "black-bear") {
          const bear = new THREE.Group();
          bear.rotation.y = -0.25;
          root.add(bear);
          sphere([0, 1.1, 0], [1.65, 0.92, 0.72], 0x302a24, bear);
          sphere([-1.35, 1.45, 0], [0.72, 0.66, 0.62], 0x352e27, bear);
          sphere([-1.92, 1.35, 0], [0.52, 0.34, 0.42], 0x5b4938, bear);
          sphere([-1.48, 1.98, 0.42], [0.2, 0.24, 0.12], 0x2b251f, bear);
          sphere([-1.48, 1.98, -0.42], [0.2, 0.24, 0.12], 0x2b251f, bear);
          [[-0.95, 0.48, 0.46], [0.75, 0.48, 0.46], [-0.95, 0.48, -0.46], [0.75, 0.48, -0.46]].forEach(([x, y, z]) => {
            const leg = cylinder([x, y, z], 0.23, 0.9, 0x302a24, bear, 14);
            const paw = sphere([x - 0.1, 0.07, z], [0.42, 0.16, 0.3], 0x28231f, bear);
            leg.rotation.z = z > 0 ? 0.03 : -0.03;
            paw.rotation.y = 0.12;
          });
          sphere([1.58, 1.25, 0], [0.2, 0.25, 0.24], 0x302a24, bear);
        } else if (slug === "baseplate-compass") {
          const plate = mesh(new THREE.BoxGeometry(3.7, 0.12, 2.5), material(palette.canvas, 0, 0.24, 0.52));
          plate.position.y = 0.25;
          const bezel = mesh(new THREE.TorusGeometry(1.12, 0.13, 12, 64), material(palette.charcoal, 0.25, 0.35));
          bezel.rotation.x = Math.PI / 2;
          bezel.position.y = 0.45;
          const capsule = mesh(new THREE.CylinderGeometry(0.98, 0.98, 0.1, 48), material(0xd9e7e3, 0, 0.25, 0.46));
          capsule.position.y = 0.42;
          for (let index = 0; index < 24; index += 1) {
            const angle = (index / 24) * Math.PI * 2;
            const tick = box([Math.sin(angle) * 1.11, 0.59, Math.cos(angle) * 1.11], [index % 3 === 0 ? 0.045 : 0.025, 0.08, index % 3 === 0 ? 0.22 : 0.12], palette.white);
            tick.rotation.y = angle;
          }
          const needleNorth = extrude([[0, 1.22], [-0.17, 0], [0.17, 0]], 0.07, palette.hazard);
          needleNorth.rotation.x = -Math.PI / 2;
          needleNorth.position.y = 0.6;
          const needleSouth = extrude([[0, -1.12], [-0.17, 0], [0.17, 0]], 0.07, palette.white);
          needleSouth.rotation.x = -Math.PI / 2;
          needleSouth.position.y = 0.59;
          const travel = extrude([[0, 0.7], [-0.32, 0.25], [-0.1, 0.25], [-0.1, -0.5], [0.1, -0.5], [0.1, 0.25], [0.32, 0.25]], 0.035, palette.ember);
          travel.rotation.x = -Math.PI / 2;
          travel.position.set(0, 0.39, -1.55);
        } else if (slug === "hypothermia") {
          sphere([0, 2.05, 0], [0.48, 0.52, 0.48], 0xd7b093);
          const torso = cylinder([0, 1.1, 0], 0.62, 1.45, palette.lake, root, 18);
          torso.scale.z = 0.62;
          [[-0.9, 1.25, 0], [0.9, 1.25, 0], [-0.34, 0.05, 0], [0.34, 0.05, 0]].forEach(([x, y, z], index) => {
            const limb = cylinder([x, y, z], 0.16, index < 2 ? 1.25 : 1.45, index < 2 ? 0x6f91a1 : 0x4a6c7b, root, 14);
            limb.rotation.z = index === 0 ? -0.58 : index === 1 ? 0.58 : 0;
          });
          [0.85, 1.12, 1.4].forEach((radius, index) => {
            const shell = mesh(new THREE.SphereGeometry(radius, 32, 18), material(index === 0 ? palette.ember : palette.lake, 0, 0.3, 0.11));
            shell.scale.set(1, 1.45, 0.7);
            shell.position.y = 1.1;
          });
          for (let i = 0; i < 8; i += 1) {
            const arrow = extrude([[0, 0.34], [-0.1, 0.14], [-0.03, 0.14], [-0.03, -0.2], [0.03, -0.2], [0.03, 0.14], [0.1, 0.14]], 0.03, palette.lake);
            const angle = (i / 8) * Math.PI * 2;
            arrow.position.set(Math.cos(angle) * 1.65, 1.15, Math.sin(angle) * 1.0);
            arrow.rotation.set(0, -angle, angle - Math.PI / 2);
          }
        } else if (slug === "white-tailed-deer-track") {
          const addTrack = (x: number, z: number, turn: number) => {
            const track = new THREE.Group();
            track.position.set(x, 0.18, z);
            track.rotation.y = turn;
            root.add(track);
            const hoofShape: Array<[number, number]> = [[0, 1.1], [-0.38, 0.46], [-0.32, -0.62], [0, -0.82], [0.15, -0.3], [0.18, 0.44]];
            const left = extrude(hoofShape, 0.16, palette.leather, track);
            left.rotation.x = -Math.PI / 2;
            left.position.x = -0.18;
            const right = left.clone();
            right.scale.x = -1;
            right.position.x = 0.18;
            track.add(right);
            sphere([-0.35, 0.08, -0.96], [0.13, 0.07, 0.18], palette.leather, track);
            sphere([0.35, 0.08, -0.96], [0.13, 0.07, 0.18], palette.leather, track);
          };
          addTrack(-0.65, 0.25, -0.08);
          addTrack(0.75, -1.35, 0.12);
        } else if (slug === "water-purification") {
          const dirty = cylinder([-1.35, 0.65, 0], 0.68, 1.4, palette.leather, root, 32);
          dirty.material = material(0x8c7455, 0, 0.42, 0.62);
          const filter = cylinder([0, 1.2, 0], 0.48, 2.4, palette.charcoal, root, 32);
          filter.material = material(0x58635c, 0.35, 0.32);
          [0.45, 0.95, 1.45].forEach((y, index) => {
            const disk = cylinder([0, y, 0], 0.4, 0.12, [palette.stone, palette.moss, palette.lake][index], root, 32);
            disk.material.transparent = true;
            disk.material.opacity = 0.82;
          });
          const clean = cylinder([1.35, 0.65, 0], 0.68, 1.4, palette.lake, root, 32);
          clean.material = material(palette.lake, 0, 0.28, 0.56);
          for (let i = 0; i < 10; i += 1) sphere([-1.35 + i * 0.3, 1.55 + Math.sin(i) * 0.12, 0], [0.07, 0.1, 0.07], i < 5 ? 0x8c7455 : palette.lake);
        } else if (slug === "lightning-safety") {
          const ridge = mesh(new THREE.ConeGeometry(2.5, 1.55, 5), material(0x3d5144));
          ridge.position.y = 0.72;
          ridge.rotation.y = 0.35;
          [[-1, 2.7, 0], [0, 2.92, 0.1], [0.95, 2.7, -0.08], [-0.25, 2.55, 0.35]].forEach(([x, y, z], i) => sphere([x, y, z], [1.05, 0.62, 0.76], i % 2 ? 0x46545b : 0x59666b));
          const bolt = extrude([[0.2, 1.45], [-0.38, 0.35], [0.05, 0.35], [-0.42, -1.35], [0.55, -0.1], [0.08, -0.1]], 0.16, 0xffcc55);
          bolt.position.set(0.25, 1.15, 0.45);
          box([2.05, 0.38, 0.55], [1.05, 0.72, 0.9], palette.canvas);
          const roof = mesh(new THREE.ConeGeometry(0.9, 0.55, 4), material(palette.pine));
          roof.position.set(2.05, 1.02, 0.55);
          roof.rotation.y = Math.PI / 4;
          const safeRing = mesh(new THREE.TorusGeometry(1.05, 0.05, 8, 56), material(palette.moss));
          safeRing.rotation.x = Math.PI / 2;
          safeRing.position.set(2.05, 0.05, 0.55);
        } else if (slug === "fixed-blade-knife") {
          const knife = new THREE.Group();
          knife.rotation.set(-0.18, -0.35, -0.2);
          knife.position.y = 1.05;
          root.add(knife);
          const blade = extrude([[-2.3, 0.35], [0.15, 0.38], [0.55, 0.22], [0.12, -0.18], [-1.65, -0.35], [-2.35, -0.05]], 0.16, 0xbfc4c1, knife);
          blade.material = material(0xbfc4c1, 0.82, 0.2);
          const bevel = extrude([[-2.2, -0.02], [0.12, -0.14], [-1.65, -0.32]], 0.17, 0xe8ece8, knife);
          bevel.position.z = 0.01;
          box([1.45, 0.05, 0], [2.1, 0.82, 0.48], palette.leather, knife);
          box([0.4, 0.05, 0], [0.15, 1.12, 0.72], palette.charcoal, knife);
          [0.8, 1.5, 2.05].forEach((x) => {
            const pin = cylinder([x, 0.05, 0.26], 0.09, 0.55, palette.stone, knife, 18);
            pin.rotation.x = Math.PI / 2;
          });
          const sheath = box([1.1, -1.25, -0.35], [3.2, 0.75, 0.34], 0x4a3828);
          sheath.rotation.z = 0.08;
        } else if (slug === "brook-trout") {
          const fish = new THREE.Group();
          fish.position.y = 1.05;
          fish.rotation.y = -0.18;
          root.add(fish);
          const body = sphere([0, 0, 0], [1.85, 0.72, 0.46], 0x4f6953, fish);
          body.material = material(0x48634f, 0.05, 0.48);
          sphere([-1.62, 0.05, 0], [0.5, 0.52, 0.42], 0x556d55, fish);
          const tail = extrude([[0, 0], [1.1, 0.82], [0.82, 0], [1.1, -0.82]], 0.16, 0x58715a, fish);
          tail.position.x = 1.95;
          const fin = extrude([[-0.65, 0], [0.65, 0], [0.18, 0.85]], 0.09, palette.ember, fish);
          fin.position.set(0.1, -0.55, 0);
          for (let i = 0; i < 18; i += 1) {
            const x = -1.25 + (i % 6) * 0.48;
            const y = -0.35 + Math.floor(i / 6) * 0.34;
            sphere([x, y, 0.43], [0.07, 0.07, 0.035], i % 3 === 0 ? palette.ember : 0xd6d6a8, fish);
          }
          sphere([-1.85, 0.17, 0.34], [0.09, 0.09, 0.06], palette.charcoal, fish);
          const finEdge = box([0.1, -0.79, 0.06], [1.25, 0.06, 0.19], palette.white, fish);
          finEdge.rotation.z = -0.02;
        } else if (slug === "contour-lines") {
          const layers = [
            { y: 0.1, r: 2.5, h: 0.25 },
            { y: 0.35, r: 2.05, h: 0.25 },
            { y: 0.6, r: 1.62, h: 0.25 },
            { y: 0.85, r: 1.18, h: 0.25 },
            { y: 1.1, r: 0.72, h: 0.25 },
          ];
          layers.forEach(({ y, r, h }, index) => {
            const layer = mesh(new THREE.CylinderGeometry(r * 0.7, r, h, 64), material(index % 2 ? 0x6f8068 : 0x7f9275));
            layer.position.set(index * 0.18 - 0.38, y, index * -0.12);
            const line = mesh(new THREE.TorusGeometry(r * 0.84, index === 2 ? 0.045 : 0.025, 8, 64), material(index === 2 ? palette.ember : palette.canvas));
            line.rotation.x = Math.PI / 2;
            line.position.set(index * 0.18 - 0.38, y + h / 2 + 0.02, index * -0.12);
          });
          const valley = extrude([[-0.45, -0.25], [0, 0.55], [0.45, -0.25]], 0.08, palette.lake);
          valley.rotation.x = -Math.PI / 2;
          valley.position.set(-0.75, 1.45, 0.35);
        } else if (slug === "food-storage") {
          const body = cylinder([0, 0.8, 0], 1.18, 1.7, palette.charcoal, root, 40);
          body.material = material(0x4f5a54, 0.2, 0.38);
          cylinder([0, 1.75, 0], 1.28, 0.22, palette.pine, root, 40);
          const seal = mesh(new THREE.TorusGeometry(1.0, 0.07, 10, 48), material(palette.ember));
          seal.rotation.x = Math.PI / 2;
          seal.position.y = 1.65;
          [-0.5, 0.5].forEach((x) => box([x, 1.92, 0.92], [0.3, 0.16, 0.16], palette.stone));
          for (let i = 0; i < 14; i += 1) {
            const angle = (i / 14) * Math.PI * 2;
            const scent = sphere([Math.cos(angle) * 1.8, 0.4 + (i % 4) * 0.34, Math.sin(angle) * 1.8], [0.06, 0.06, 0.06], palette.ember);
            scent.material.transparent = true;
            scent.material.opacity = 0.56;
          }
        } else if (slug === "poison-ivy") {
          const vine = cylinder([-0.55, 1.15, 0], 0.11, 2.65, palette.leather, root, 12);
          vine.rotation.z = -0.18;
          const addLeafCluster = (y: number, turn: number, scale = 1) => {
            const cluster = new THREE.Group();
            cluster.position.set(-0.25, y, 0);
            cluster.rotation.y = turn;
            cluster.scale.setScalar(scale);
            root.add(cluster);
            const stem = cylinder([0, 0, 0], 0.035, 1.05, palette.leather, cluster, 8);
            stem.rotation.z = Math.PI / 2;
            const leafPoints: Array<[number, number]> = [[0, 0.9], [-0.34, 0.55], [-0.27, 0.2], [-0.48, -0.08], [-0.2, -0.18], [0, -0.55], [0.2, -0.18], [0.48, -0.08], [0.27, 0.2], [0.34, 0.55]];
            [[0.86, 0.15, 0], [-0.6, 0, 0.15], [-0.58, 0, -0.18]].forEach(([x, ly, z], index) => {
              const leaf = extrude(leafPoints, 0.055, index === 0 ? 0x4f7a46 : 0x638956, cluster);
              leaf.scale.set(0.48, index === 0 ? 0.75 : 0.62, 1);
              leaf.position.set(x, ly, z);
              leaf.rotation.set(0, index === 2 ? Math.PI : 0, index === 0 ? -Math.PI / 2 : index === 1 ? 0.62 : -0.62);
            });
          };
          addLeafCluster(1.7, -0.18, 1);
          addLeafCluster(0.62, 0.4, 0.82);
          for (let i = 0; i < 12; i += 1) sphere([-0.7 + Math.sin(i) * 0.08, 0.2 + i * 0.18, 0.12], [0.05, 0.08, 0.05], 0x8a6743);
        }

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const start = window.performance.now();
        let current = -0.35;
        let visible = true;
        let pointerDown = false;
        let previousX = 0;
        const animate = () => {
          if (disposed) return;
          frame = window.requestAnimationFrame(animate);
          if (!visible) return;
          const elapsed = (window.performance.now() - start) / 1000;
          const auto = reduced || pausedRef.current ? 0 : elapsed * 0.065;
          current += (targetRotation.current + auto - current) * 0.04;
          root.rotation.y = current;
          if (!reduced && !pausedRef.current) root.position.y = -0.55 + Math.sin(elapsed * 1.1) * 0.025;
          renderer.render(scene, camera);
        };
        const resize = () => {
          const width = Math.max(mount.clientWidth, 1);
          const height = Math.max(mount.clientHeight, 1);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        const pointerStart = (event: PointerEvent) => {
          pointerDown = true;
          previousX = event.clientX;
          renderer.domElement.setPointerCapture(event.pointerId);
        };
        const pointerMove = (event: PointerEvent) => {
          if (!pointerDown) return;
          targetRotation.current += (event.clientX - previousX) * 0.012;
          previousX = event.clientX;
        };
        const pointerEnd = (event: PointerEvent) => {
          pointerDown = false;
          if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
        };
        renderer.domElement.addEventListener("pointerdown", pointerStart);
        renderer.domElement.addEventListener("pointermove", pointerMove);
        renderer.domElement.addEventListener("pointerup", pointerEnd);
        renderer.domElement.addEventListener("pointercancel", pointerEnd);
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);
        visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "120px" });
        visibilityObserver.observe(mount);
        resize();
        animate();
        setReady(true);

        return () => {
          renderer.domElement.removeEventListener("pointerdown", pointerStart);
          renderer.domElement.removeEventListener("pointermove", pointerMove);
          renderer.domElement.removeEventListener("pointerup", pointerEnd);
          renderer.domElement.removeEventListener("pointercancel", pointerEnd);
          window.cancelAnimationFrame(frame);
          resizeObserver?.disconnect();
          visibilityObserver?.disconnect();
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
              object.geometry?.dispose();
              const materials = Array.isArray(object.material) ? object.material : [object.material];
              materials.forEach((item) => item?.dispose());
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        if (!disposed) setSupported(false);
        return undefined;
      }
    }

    let cleanup: (() => void) | undefined;
    let started = false;
    const startObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      startObserver.disconnect();
      void buildScene().then((value) => { cleanup = value; });
    }, { rootMargin: "260px" });
    startObserver.observe(mount);
    return () => {
      disposed = true;
      startObserver.disconnect();
      cleanup?.();
    };
  }, [slug]);

  const rotate = (amount: number) => { targetRotation.current += amount; };
  const togglePaused = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };

  return (
    <div className={`fire-exhibit fire-exhibit--entry knowledge-exhibit knowledge-exhibit--${tone}`}>
      <div
        className="fire-stage"
        role="img"
        aria-label={`Interactive three-dimensional model. ${model.description}`}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") rotate(-0.3);
          if (event.key === "ArrowRight") rotate(0.3);
          if (event.key === " ") {
            event.preventDefault();
            togglePaused();
          }
        }}
      >
        <div className="fire-viewport" ref={mountRef} />
        {!ready && supported && <div className="model-loading" aria-hidden="true"><i /><span>Preparing model</span></div>}
        {!supported && <div className="model-fallback"><span aria-hidden="true">3D</span><p>{model.description}</p></div>}
        {ready && (
          <div className="model-hotspots" aria-hidden="true">
            <span className="hotspot hotspot--heat"><i />{model.hotspots[0]}</span>
            <span className="hotspot hotspot--fuel"><i />{model.hotspots[1]}</span>
            <span className="hotspot hotspot--air"><i />{model.hotspots[2]}</span>
          </div>
        )}
        <div className="exhibit-badge" aria-hidden="true"><span>3D</span>{model.study}</div>
      </div>
      <div className="model-controls" aria-label={`${model.study} controls`}>
        <button type="button" onClick={() => rotate(-0.34)} aria-label="Rotate model left">←</button>
        <button type="button" onClick={togglePaused}>{paused ? "Play" : "Pause"}</button>
        <button type="button" onClick={() => rotate(0.34)} aria-label="Rotate model right">→</button>
      </div>
      <p className="model-note">Drag to inspect · Arrow keys rotate · Space pauses</p>
    </div>
  );
}
