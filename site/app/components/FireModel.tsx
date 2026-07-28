"use client";

import { useEffect, useRef, useState } from "react";

type FireModelVariant = "hero" | "exhibit" | "entry";

export function FireModel({ variant = "hero" }: { variant?: FireModelVariant }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRotation = useRef(0);
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
    let visible = true;
    let pointerDown = false;
    let previousX = 0;

    async function buildScene() {
      try {
        const THREE = await import("three");
        if (disposed || !mount) return;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
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
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
        camera.position.set(4.6, 3.1, 5.3);
        camera.lookAt(0, 0.72, 0);

        scene.add(new THREE.HemisphereLight(0xc7d8ce, 0x22160f, 1.45));
        const keyLight = new THREE.DirectionalLight(0xf4ead6, 2.25);
        keyLight.position.set(-3.8, 6, 3.2);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.set(512, 512);
        scene.add(keyLight);

        const fireLight = new THREE.PointLight(0xff7b32, 11.5, 8, 1.8);
        fireLight.position.set(0, 1.25, 0);
        fireLight.castShadow = true;
        fireLight.shadow.mapSize.set(256, 256);
        scene.add(fireLight);

        const model = new THREE.Group();
        model.position.y = -0.7;
        scene.add(model);

        const ground = new THREE.Mesh(
          new THREE.CircleGeometry(3.2, 48),
          new THREE.MeshStandardMaterial({
            color: 0x15241a,
            roughness: 1,
            metalness: 0,
            transparent: true,
            opacity: 0.86,
          }),
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.02;
        ground.receiveShadow = true;
        model.add(ground);

        const ash = new THREE.Mesh(
          new THREE.CircleGeometry(1.18, 28),
          new THREE.MeshStandardMaterial({ color: 0x2a2823, roughness: 1 }),
        );
        ash.rotation.x = -Math.PI / 2;
        ash.position.y = 0.012;
        ash.receiveShadow = true;
        model.add(ash);

        const stoneGeometry = new THREE.DodecahedronGeometry(0.38, 0);
        const stoneColors = [0x697068, 0x535c56, 0x7a7d72, 0x454d48];
        for (let index = 0; index < 12; index += 1) {
          const angle = (index / 12) * Math.PI * 2;
          const stone = new THREE.Mesh(
            stoneGeometry,
            new THREE.MeshStandardMaterial({
              color: stoneColors[index % stoneColors.length],
              flatShading: true,
              roughness: 0.96,
            }),
          );
          stone.position.set(Math.cos(angle) * 1.38, 0.25, Math.sin(angle) * 1.38);
          stone.scale.set(1 + (index % 3) * 0.08, 0.72 + (index % 2) * 0.08, 0.9 + ((index + 1) % 3) * 0.06);
          stone.rotation.set(index * 0.31, -angle, index * 0.17);
          stone.castShadow = true;
          stone.receiveShadow = true;
          model.add(stone);
        }

        const bark = new THREE.MeshStandardMaterial({
          color: 0x5f321d,
          roughness: 0.92,
          flatShading: true,
        });
        const cutWood = new THREE.MeshStandardMaterial({
          color: 0xa77a4c,
          roughness: 0.88,
          flatShading: true,
        });
        const logGeometry = new THREE.CylinderGeometry(0.26, 0.31, 2.45, 12, 4);

        function addLog(rotation: number, y: number, x: number) {
          const log = new THREE.Mesh(logGeometry, [bark, cutWood, cutWood]);
          log.rotation.z = Math.PI / 2;
          log.rotation.y = rotation;
          log.position.set(x, y, 0);
          log.castShadow = true;
          log.receiveShadow = true;
          model.add(log);
          return log;
        }

        addLog(Math.PI / 4, 0.55, -0.12);
        addLog(-Math.PI / 4, 0.58, 0.12);

        const kindlingMaterial = new THREE.MeshStandardMaterial({
          color: 0x8b5731,
          roughness: 0.9,
          flatShading: true,
        });

        function addStick(from: InstanceType<typeof THREE.Vector3>, to: InstanceType<typeof THREE.Vector3>, radius = 0.075) {
          const direction = new THREE.Vector3().subVectors(to, from);
          const midpoint = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
          const geometry = new THREE.CylinderGeometry(radius * 0.78, radius, direction.length(), 7);
          const stick = new THREE.Mesh(geometry, kindlingMaterial);
          stick.position.copy(midpoint);
          stick.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
          stick.castShadow = true;
          model.add(stick);
        }

        for (let index = 0; index < 7; index += 1) {
          const angle = (index / 7) * Math.PI * 2;
          addStick(
            new THREE.Vector3(Math.cos(angle) * 0.78, 0.42, Math.sin(angle) * 0.78),
            new THREE.Vector3(Math.cos(angle + 0.75) * 0.12, 1.78, Math.sin(angle + 0.75) * 0.12),
            0.067 + (index % 2) * 0.012,
          );
        }

        const emberMaterial = new THREE.MeshStandardMaterial({
          color: 0xe55d2d,
          emissive: 0xff4b18,
          emissiveIntensity: 4.5,
          roughness: 0.65,
        });
        const emberGeometry = new THREE.IcosahedronGeometry(0.08, 0);
        for (let index = 0; index < 26; index += 1) {
          const angle = index * 2.399;
          const radius = 0.18 + ((index * 37) % 71) / 100;
          const ember = new THREE.Mesh(emberGeometry, emberMaterial);
          ember.position.set(Math.cos(angle) * radius, 0.23 + (index % 4) * 0.025, Math.sin(angle) * radius);
          ember.scale.setScalar(0.55 + (index % 5) * 0.12);
          model.add(ember);
        }

        const flameProfile = [
          new THREE.Vector2(0.01, 0),
          new THREE.Vector2(0.42, 0.12),
          new THREE.Vector2(0.55, 0.52),
          new THREE.Vector2(0.38, 1.05),
          new THREE.Vector2(0.26, 1.48),
          new THREE.Vector2(0.07, 2.02),
          new THREE.Vector2(0.01, 2.18),
        ];
        const flameGeometry = new THREE.LatheGeometry(flameProfile, 28);
        flameGeometry.translate(0, 0.18, 0);

        function flameLayer(color: number, emissive: number, opacity: number, scale: [number, number, number], x = 0) {
          const material = new THREE.MeshStandardMaterial({
            color,
            emissive,
            emissiveIntensity: 3.2,
            transparent: true,
            opacity,
            roughness: 0.5,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          const flame = new THREE.Mesh(flameGeometry, material);
          flame.position.set(x, 0.55, 0);
          flame.scale.set(...scale);
          flame.rotation.z = x * 0.42;
          model.add(flame);
          return flame;
        }

        const flameOuter = flameLayer(0xd75424, 0xff3f16, 0.56, [0.76, 0.78, 0.76], -0.04);
        const flameMiddle = flameLayer(0xff9b38, 0xff6c20, 0.7, [0.5, 0.62, 0.5], 0.1);
        const flameCore = flameLayer(0xffe29b, 0xffbb50, 0.88, [0.25, 0.38, 0.25], -0.04);
        const flameSideA = flameLayer(0xee6828, 0xff521c, 0.48, [0.3, 0.46, 0.3], -0.28);
        const flameSideB = flameLayer(0xff8a32, 0xff641e, 0.45, [0.23, 0.34, 0.23], 0.3);
        flameSideA.rotation.z = -0.22;
        flameSideB.rotation.z = 0.26;

        const sparkCount = 34;
        const sparkPositions = new Float32Array(sparkCount * 3);
        const sparkOffsets = Array.from({ length: sparkCount }, (_, index) => ({
          angle: index * 2.71,
          radius: 0.08 + ((index * 19) % 40) / 100,
          speed: 0.42 + (index % 7) * 0.07,
          phase: (index / sparkCount) * 2.4,
        }));
        const sparkGeometry = new THREE.BufferGeometry();
        sparkGeometry.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
        const sparks = new THREE.Points(
          sparkGeometry,
          new THREE.PointsMaterial({
            color: 0xffc36f,
            size: 0.055,
            transparent: true,
            opacity: 0.88,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true,
          }),
        );
        model.add(sparks);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const startTime = window.performance.now();
        let currentRotation = -0.25;

        function drawSparks(time: number) {
          sparkOffsets.forEach((spark, index) => {
            const life = (time * spark.speed + spark.phase) % 2.4;
            const spread = spark.radius + life * 0.08;
            sparkPositions[index * 3] = Math.cos(spark.angle + life * 0.7) * spread;
            sparkPositions[index * 3 + 1] = 1.15 + life * 1.15;
            sparkPositions[index * 3 + 2] = Math.sin(spark.angle + life * 0.45) * spread;
          });
          sparkGeometry.attributes.position.needsUpdate = true;
        }

        function render() {
          if (disposed) return;
          frame = window.requestAnimationFrame(render);
          if (!visible) return;
          const elapsed = (window.performance.now() - startTime) / 1000;
          const motionPaused = pausedRef.current || prefersReducedMotion;
          const autoTurn = motionPaused ? 0 : elapsed * 0.075;
          currentRotation += (targetRotation.current + autoTurn - currentRotation) * 0.035;
          model.rotation.y = currentRotation;
          const flicker = motionPaused ? 0 : Math.sin(elapsed * 8.1) * 0.035 + Math.sin(elapsed * 4.7) * 0.025;
          flameOuter.scale.y = 0.78 + flicker;
          flameOuter.scale.x = flameOuter.scale.z = 0.76 - flicker * 0.5;
          flameMiddle.scale.y = 0.62 - flicker * 0.6;
          flameMiddle.position.x = 0.12 + Math.sin(elapsed * 2.4) * 0.055;
          flameCore.scale.y = 0.38 + flicker * 0.45;
          flameSideA.scale.y = 0.46 + Math.sin(elapsed * 5.6) * 0.018;
          flameSideB.scale.y = 0.34 + Math.sin(elapsed * 6.9 + 1.3) * 0.015;
          fireLight.intensity = 11.5 + flicker * 32;
          if (!motionPaused) drawSparks(elapsed);
          renderer.render(scene, camera);
        }

        function resize() {
          const width = Math.max(mount.clientWidth, 1);
          const height = Math.max(mount.clientHeight, 1);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }

        function pointerStart(event: PointerEvent) {
          pointerDown = true;
          previousX = event.clientX;
          renderer.domElement.setPointerCapture(event.pointerId);
        }
        function pointerMove(event: PointerEvent) {
          if (!pointerDown) return;
          const delta = event.clientX - previousX;
          previousX = event.clientX;
          targetRotation.current += delta * 0.012;
        }
        function pointerEnd(event: PointerEvent) {
          pointerDown = false;
          if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
        }

        renderer.domElement.addEventListener("pointerdown", pointerStart);
        renderer.domElement.addEventListener("pointermove", pointerMove);
        renderer.domElement.addEventListener("pointerup", pointerEnd);
        renderer.domElement.addEventListener("pointercancel", pointerEnd);
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);
        visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "120px" });
        visibilityObserver.observe(mount);
        resize();
        drawSparks(0.7);
        render();
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
              materials.forEach((material) => material?.dispose());
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
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      cleanup?.();
    };
  }, []);

  function rotate(delta: number) {
    targetRotation.current += delta;
  }

  function togglePaused() {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  }

  return (
    <div className={`fire-exhibit fire-exhibit--${variant}`}>
      <div
        className="fire-stage"
        role="img"
        aria-label="Interactive three-dimensional model of a small controlled campfire: a stone ring, crossed fuel wood, a ventilated kindling cone, hot embers, and a stable flame."
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
        {!supported && (
          <div className="model-fallback">
            <span aria-hidden="true">△</span>
            <p>Interactive model unavailable. The complete text guide remains below.</p>
          </div>
        )}
        {ready && variant !== "hero" && (
          <div className="model-hotspots" aria-hidden="true">
            <span className="hotspot hotspot--heat"><i /> Heat core</span>
            <span className="hotspot hotspot--fuel"><i /> Fuel sequence</span>
            <span className="hotspot hotspot--air"><i /> Oxygen path</span>
          </div>
        )}
        <div className="exhibit-badge" aria-hidden="true"><span>3D</span> Firecraft study 01</div>
      </div>
      <div className="model-controls" aria-label="Campfire model controls">
        <button type="button" onClick={() => rotate(-0.34)} aria-label="Rotate model left">←</button>
        <button type="button" onClick={togglePaused}>{paused ? "Play" : "Pause"}</button>
        <button type="button" onClick={() => rotate(0.34)} aria-label="Rotate model right">→</button>
      </div>
      <p className="model-note">Drag to inspect · Arrow keys rotate · Space pauses</p>
    </div>
  );
}
