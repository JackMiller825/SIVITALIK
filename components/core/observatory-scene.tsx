"use client";

/* WebGL buffers, materials, and refs are mutated every frame on purpose. */
/* eslint-disable react-hooks/immutability, react-hooks/refs */

import { type CoreMode } from "@/lib/core-modes";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

type Quality = { dpr: number; antialias: boolean; count: number };

function quality(): Quality {
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  const low = mobile || cores <= 4;
  return {
    dpr: Math.min(window.devicePixelRatio || 1, low ? 1.15 : 1.5),
    antialias: !low,
    count: low ? 42 : 80,
  };
}

function fibonacci(out: Float32Array, count: number, radius: number, jitter: number) {
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < count; index += 1) {
    const y = count === 1 ? 0 : 1 - (index / (count - 1)) * 2;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * index;
    const shift = jitter * Math.sin(index * 12.9898);
    out[index * 3] = Math.cos(theta) * radial * (radius + shift);
    out[index * 3 + 1] = y * (radius + shift * 0.35);
    out[index * 3 + 2] = Math.sin(theta) * radial * (radius + shift);
  }
}

function createLayout(mode: CoreMode, count: number) {
  const out = new Float32Array(count * 3);
  if (mode === "intelligence") {
    fibonacci(out, count, 1.36, 0.16);
    for (let index = 0; index < count; index += 4) {
      out[index * 3] *= 0.58;
      out[index * 3 + 1] *= 0.58;
      out[index * 3 + 2] *= 0.58;
    }
    return out;
  }
  if (mode === "community") {
    fibonacci(out, count, 1.5, 0.02);
    return out;
  }
  if (mode === "ethereum") {
    const raw: number[] = [];
    for (let x = -2; x <= 2; x += 1) {
      for (let y = -2; y <= 2; y += 1) {
        for (let z = -2; z <= 2; z += 1) {
          const distance = Math.abs(x) + Math.abs(y) + Math.abs(z);
          if (distance === 0 || distance > 3) continue;
          raw.push(x * 0.5, y * 0.5, z * 0.5);
        }
      }
    }
    const available = raw.length / 3;
    const seen = new Map<number, number>();
    for (let index = 0; index < count; index += 1) {
      const source = Math.floor((index * available) / count) % available;
      const repeat = seen.get(source) ?? 0;
      seen.set(source, repeat + 1);
      const angle = index * 0.7;
      out[index * 3] = raw[source * 3] + Math.cos(angle) * repeat * 0.08;
      out[index * 3 + 1] = raw[source * 3 + 1] + Math.sin(angle) * repeat * 0.08;
      out[index * 3 + 2] = raw[source * 3 + 2];
    }
    return out;
  }
  const half = Math.max(1, Math.floor(count / 2));
  for (let index = 0; index < count; index += 1) {
    const left = index < half;
    const local = index % half;
    const t = half <= 1 ? 0 : local / (half - 1);
    const reach = 0.42 + (1 - t) * 1.2;
    if (left) {
      out[index * 3] = -reach;
      out[index * 3 + 1] = Math.sin(t * Math.PI * 1.45) * 0.82;
      out[index * 3 + 2] = Math.cos(t * Math.PI) * 0.32;
    } else {
      const step = Math.round(t * 5) / 5;
      out[index * 3] = reach;
      out[index * 3 + 1] = (step - 0.5) * 1.45;
      out[index * 3 + 2] = ((index % 3) - 1) * 0.2;
    }
  }
  return out;
}

function linkNearest(points: Float32Array, count: number) {
  const links = new Uint16Array(count * 2);
  for (let i = 0; i < count; i += 1) {
    let bestA = 0;
    let bestB = 0;
    let distA = Infinity;
    let distB = Infinity;
    const ix = points[i * 3];
    const iy = points[i * 3 + 1];
    const iz = points[i * 3 + 2];
    for (let j = 0; j < count; j += 1) {
      if (i === j) continue;
      const dx = ix - points[j * 3];
      const dy = iy - points[j * 3 + 1];
      const dz = iz - points[j * 3 + 2];
      const dist = dx * dx + dy * dy + dz * dz;
      if (dist < distA) {
        distB = distA;
        bestB = bestA;
        distA = dist;
        bestA = j;
      } else if (dist < distB) {
        distB = dist;
        bestB = j;
      }
    }
    links[i * 2] = bestA;
    links[i * 2 + 1] = bestB;
  }
  return links;
}

const MODE_COLOR: Record<CoreMode, string> = {
  intelligence: "#35DFFF",
  ethereum: "#c4b2ff",
  humanity: "#EAF0FF",
  community: "#35DFFF",
};

const SPIN: Record<CoreMode, number> = {
  intelligence: 0.07,
  ethereum: 0.045,
  humanity: 0.012,
  community: 0.09,
};

function Network({ mode, count }: { mode: CoreMode; count: number }) {
  const current = useMemo(() => createLayout("intelligence", count), [count]);
  const linePositions = useMemo(() => new Float32Array(count * 12), [count]);
  const target = useRef(createLayout("intelligence", count));
  const links = useRef(linkNearest(current, count));
  const pointsGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(current, 3));
    return geometry;
  }, [current]);
  const lineGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geometry;
  }, [linePositions]);
  const pointsMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#d8fbff",
        size: count > 60 ? 0.045 : 0.07,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    [count],
  );
  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#35DFFF",
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );
  const color = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    target.current = createLayout(mode, count);
    links.current = linkNearest(target.current, count);
  }, [count, mode]);

  useEffect(() => {
    return () => {
      pointsGeo.dispose();
      lineGeo.dispose();
      pointsMat.dispose();
      lineMat.dispose();
    };
  }, [lineGeo, lineMat, pointsGeo, pointsMat]);

  useFrame((_, delta) => {
    const next = target.current;
    const step = 1 - Math.exp(-delta * 3.1);
    for (let index = 0; index < current.length; index += 1) {
      current[index] += (next[index] - current[index]) * step;
    }
    const position = pointsGeo.getAttribute("position") as THREE.BufferAttribute;
    position.needsUpdate = true;
    let offset = 0;
    for (let index = 0; index < count; index += 1) {
      for (let link = 0; link < 2; link += 1) {
        const neighbor = links.current[index * 2 + link];
        linePositions[offset++] = current[index * 3];
        linePositions[offset++] = current[index * 3 + 1];
        linePositions[offset++] = current[index * 3 + 2];
        linePositions[offset++] = current[neighbor * 3];
        linePositions[offset++] = current[neighbor * 3 + 1];
        linePositions[offset++] = current[neighbor * 3 + 2];
      }
    }
    const lineAttr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
    lineAttr.needsUpdate = true;
    color.set(MODE_COLOR[mode]);
    lineMat.color.lerp(color, step);
  });

  return (
    <>
      <points geometry={pointsGeo} material={pointsMat} frustumCulled={false} />
      <lineSegments geometry={lineGeo} material={lineMat} frustumCulled={false} />
    </>
  );
}

const shellVertex = `
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const shellFragment = `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vWorld;
  uniform float uWeight;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), viewDir)), 1.7);
    float pulse = 0.9 + 0.1 * sin(uTime * 1.5);
    vec3 color = mix(uColorA, uColorB, fresnel) * pulse;
    gl_FragColor = vec4(color, (0.12 + fresnel * 0.85) * uWeight);
  }
`;

function Crystal({
  mode,
  active,
  geometry,
  edges,
  scale,
  color,
  emissive,
}: {
  mode: CoreMode;
  active: RefObject<CoreMode>;
  geometry: THREE.BufferGeometry;
  edges: THREE.BufferGeometry;
  scale: number;
  color: string;
  emissive: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const shell = useRef<THREE.Mesh>(null);
  const weight = useRef(mode === "intelligence" ? 1 : 0);
  const uniforms = useMemo(
    () => ({
      uWeight: { value: mode === "intelligence" ? 1 : 0 },
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#8B3DFF") },
      uColorB: { value: new THREE.Color("#35DFFF") },
    }),
    [mode],
  );

  useFrame((state, delta) => {
    const goal = active.current === mode ? 1 : 0;
    weight.current = THREE.MathUtils.damp(weight.current, goal, 3.2, delta);
    const shown = weight.current > 0.03;
    if (mesh.current) {
      mesh.current.visible = shown;
      mesh.current.scale.setScalar(scale * (0.9 + weight.current * 0.1));
      mesh.current.rotation.y += delta * 0.16 * Math.max(weight.current, 0.15);
      const material = mesh.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.08 + weight.current * 0.78;
    }
    if (lines.current) {
      lines.current.visible = shown;
      const material = lines.current.material as THREE.LineBasicMaterial;
      material.opacity = weight.current * 0.8;
    }
    if (shell.current) {
      shell.current.visible = shown;
      uniforms.uWeight.value = weight.current;
      uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.65}
        metalness={0.74}
        roughness={0.2}
        transparent
        depthWrite={false}
      />
      <lineSegments ref={lines} geometry={edges}>
        <lineBasicMaterial color="#efeaff" transparent depthWrite={false} toneMapped={false} />
      </lineSegments>
      <mesh ref={shell} geometry={geometry} scale={1.045}>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={shellVertex}
          fragmentShader={shellFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </mesh>
  );
}

function Rings() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * 0.12;
  });
  return (
    <group ref={group}>
      <mesh rotation={[1.15, 0.2, 0]}>
        <torusGeometry args={[1.62, 0.006, 12, 140]} />
        <meshBasicMaterial color="#35DFFF" transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh rotation={[1.9, 0.8, 0.4]}>
        <torusGeometry args={[1.82, 0.005, 12, 140]} />
        <meshBasicMaterial color="#8B3DFF" transparent opacity={0.45} toneMapped={false} />
      </mesh>
    </group>
  );
}

function World({
  mode,
  modeRef,
  count,
}: {
  mode: CoreMode;
  modeRef: RefObject<CoreMode>;
  count: number;
}) {
  const group = useRef<THREE.Group>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const spin = useRef(0);
  const { pointer } = useThree();
  const geometries = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1, 1);
    const octa = new THREE.OctahedronGeometry(1, 0);
    const sphere = new THREE.SphereGeometry(1, 32, 20);
    const spark = new THREE.SphereGeometry(1, 20, 16);
    return {
      ico,
      octa,
      sphere,
      spark,
      icoEdges: new THREE.EdgesGeometry(ico),
      octaEdges: new THREE.EdgesGeometry(octa),
      sphereEdges: new THREE.EdgesGeometry(sphere, 12),
      sparkEdges: new THREE.EdgesGeometry(spark),
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geometry) => geometry.dispose());
    };
  }, [geometries]);

  useFrame((_, delta) => {
    spin.current += delta * SPIN[modeRef.current];
    if (!group.current) return;
    const targetX = pointer.y * 0.22;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta);
    group.current.rotation.y = spin.current + pointer.x * 0.28;
    const time = performance.now() * 0.001;
    const x = Math.cos(time * 0.65) * 1.65;
    const y = Math.sin(time * 0.42) * 0.7;
    const z = Math.sin(time * 0.65) * 1.65;
    pulse.current?.position.set(x, y, z);
    light.current?.position.set(x, y, z);
  });

  return (
    <group ref={group}>
      <Network mode={mode} count={count} />
      <Crystal mode="intelligence" active={modeRef} geometry={geometries.ico} edges={geometries.icoEdges} scale={0.78} color="#160826" emissive="#5a27b8" />
      <Crystal mode="ethereum" active={modeRef} geometry={geometries.octa} edges={geometries.octaEdges} scale={1.08} color="#12061f" emissive="#6d3bff" />
      <Crystal mode="humanity" active={modeRef} geometry={geometries.spark} edges={geometries.sparkEdges} scale={0.24} color="#12343d" emissive="#35DFFF" />
      <Crystal mode="community" active={modeRef} geometry={geometries.sphere} edges={geometries.sphereEdges} scale={1.48} color="#07101f" emissive="#1a4d66" />
      <Rings />
      <mesh ref={pulse}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#35DFFF" toneMapped={false} />
      </mesh>
      <pointLight ref={light} color="#35DFFF" intensity={16} distance={5.5} decay={2} />
    </group>
  );
}

export default function ObservatoryScene({
  mode,
  onReady,
}: {
  mode: CoreMode;
  onReady?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const [active, setActive] = useState(true);
  const settings = useMemo(() => quality(), []);

  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(element);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") setActive(false);
      else {
        const rect = element.getBoundingClientRect();
        setActive(rect.bottom > 0 && rect.top < window.innerHeight);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        dpr={settings.dpr}
        camera={{ position: [0, 0.1, 6.35], fov: 38 }}
        frameloop={active ? "always" : "never"}
        gl={{
          antialias: settings.antialias,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          onReady?.();
        }}
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[3.2, 2.2, 4]} color="#8B3DFF" intensity={28} distance={14} />
        <pointLight position={[-3.4, -1.6, 2.5]} color="#35DFFF" intensity={12} distance={12} />
        <World mode={mode} modeRef={modeRef} count={settings.count} />
      </Canvas>
    </div>
  );
}
