"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { LOGO_PATH, LOGO_VIEWBOX } from "./logoPath";
import styles from "./Logo3D.module.css";

/**
 * 3D-монограмма «bs» из оранжевого металла (WebGL / three.js).
 * — следует за курсором (ноутбук) или наклоном пальца (телефон);
 * — при прокрутке поворачивается и «распадается» на линии и частицы.
 * На слабых устройствах и при «уменьшении движения» показывается обычный SVG.
 */
export default function Logo3D({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      let THREE: typeof import("three");
      let SVGLoader: typeof import("three/examples/jsm/loaders/SVGLoader.js").SVGLoader;
      let RoomEnvironment: typeof import("three/examples/jsm/environments/RoomEnvironment.js").RoomEnvironment;
      try {
        THREE = await import("three");
        ({ SVGLoader } = await import("three/examples/jsm/loaders/SVGLoader.js"));
        ({ RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js"));
      } catch {
        setFallback(true);
        return;
      }
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        setFallback(true);
        return;
      }
      const mobile = window.matchMedia("(max-width: 899px)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 9);

      // Геометрия из SVG-контура логотипа
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}"><path d="${LOGO_PATH}"/></svg>`;
      const data = new SVGLoader().parse(svg);
      const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
      const geo = new THREE.ExtrudeGeometry(shapes, {
        depth: 90,
        bevelEnabled: true,
        bevelThickness: 18,
        bevelSize: 10,
        bevelSegments: 4,
        curveSegments: 10,
      });
      geo.center();
      const [, , vw, vh] = LOGO_VIEWBOX.split(" ").map(Number);
      const s = 4.4 / vh;
      geo.scale(s, -s, s);
      geo.computeVertexNormals();

      const group = new THREE.Group();
      scene.add(group);

      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xff6a1a,
        metalness: 0.9,
        roughness: 0.26,
        clearcoat: 1,
        clearcoatRoughness: 0.2,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo, 20),
        new THREE.LineBasicMaterial({ color: 0xff6a1a, transparent: true, opacity: 0 }),
      );
      group.add(edges);

      // Частицы на вершинах — разлетаются при прокрутке
      const pos = geo.attributes.position;
      const count = Math.min(pos.count, mobile ? 1200 : 2600);
      const base = new Float32Array(count * 3);
      const dir = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const j = Math.floor((i / count) * pos.count);
        base[i * 3] = pos.getX(j);
        base[i * 3 + 1] = pos.getY(j);
        base[i * 3 + 2] = pos.getZ(j);
        const v = new THREE.Vector3(pos.getX(j), pos.getY(j), pos.getZ(j) + (Math.random() - 0.5)).normalize();
        dir[i * 3] = v.x * (1 + Math.random() * 2);
        dir[i * 3 + 1] = v.y * (1 + Math.random() * 2);
        dir[i * 3 + 2] = v.z * (1 + Math.random() * 3);
      }
      const pgeo = new THREE.BufferGeometry();
      const ppos = new Float32Array(base);
      pgeo.setAttribute("position", new THREE.BufferAttribute(ppos, 3));
      const points = new THREE.Points(
        pgeo,
        new THREE.PointsMaterial({ color: 0xff8a45, size: 0.025, transparent: true, opacity: 0, depthWrite: false }),
      );
      group.add(points);

      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(3, 4, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xff6a1a, 2.5);
      rim.position.set(-5, -2, -4);
      scene.add(rim);

      function resize() {
        const w = el!.clientWidth;
        const h = el!.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // логотип всегда целиком помещается по высоте и ширине
        const fitH = 4.4 / (2 * Math.tan((camera.fov * Math.PI) / 360));
        const fitW = ((4.4 * vw) / vh) / (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
        camera.position.z = Math.max(fitH, fitW) * 1.35;
        camera.updateProjectionMatrix();
      }
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      // Ввод
      let px = 0;
      let py = 0;
      const onPointer = (e: PointerEvent) => {
        px = (e.clientX / window.innerWidth) * 2 - 1;
        py = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
      io.observe(el);

      let rx = 0;
      let ry = 0;
      let prog = 0;
      let raf = 0;
      const t0 = performance.now();

      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) return;
        const t = (performance.now() - t0) / 1000;
        const rect = el.getBoundingClientRect();
        const target = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.9)));
        prog += (target - prog) * 0.08;

        const idleY = reduce ? 0 : Math.sin(t * 0.6) * 0.35;
        rx += (py * 0.35 - rx) * 0.06;
        ry += (px * 0.6 + idleY - ry) * 0.06;
        group.rotation.x = rx + prog * 0.6;
        group.rotation.y = ry + prog * Math.PI * 1.1;
        group.position.y = reduce ? 0 : Math.sin(t * 1.1) * 0.06;

        mat.opacity = 1 - Math.min(1, prog * 1.6);
        mesh.visible = mat.opacity > 0.01;
        (edges.material as import("three").LineBasicMaterial).opacity = Math.min(1, prog * 2.2) * (1 - Math.max(0, prog - 0.7) * 2);
        const spread = Math.max(0, prog - 0.25) * 3.2;
        (points.material as import("three").PointsMaterial).opacity = Math.min(1, prog * 2);
        for (let i = 0; i < count * 3; i++) ppos[i] = base[i] + dir[i] * spread;
        pgeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      };
      frame();
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        geo.dispose();
        pgeo.dispose();
        mat.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={host} className={`${styles.host} ${className ?? ""}`} data-ready={ready} aria-hidden="true">
      {(fallback || !ready) && <Logo className={styles.fallback} />}
    </div>
  );
}
