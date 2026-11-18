import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Timer,
  Vector3,
  WebGLRenderer,
} from "three";

/*
 * The background of the whole site: a LiDAR-style point cloud.
 * A rolling terrain of points with a scan ring sweeping out from the centre (like a spinning sensor),
 * and a "scanned object" floating above it, swept by a moving laser plane.
 * Heights and colours are computed in the shaders, so the CPU only updates a few uniforms per frame.
 */

const COLORS = {
  low: new Color("#2A4A9E"),
  high: new Color("#8FB4FF"),
  scan: new Color("#6EE7F9"),
  wire: new Color("#2F6FED"),
};

const terrainVertex = /* glsl */ `
  uniform float uTime;
  uniform float uScan;
  uniform float uPixelRatio;
  attribute float aRand;
  varying float vHeight;
  varying float vRing;
  varying float vAlpha;

  float terrain(vec2 p) {
    return sin(p.x * 0.32 + uTime * 0.22) * 0.65
         + sin(p.y * 0.27 - uTime * 0.17) * 0.75
         + sin((p.x + p.y) * 0.58 + uTime * 0.3) * 0.25
         + sin(length(p) * 0.45 - uTime * 0.35) * 0.4;
  }

  void main() {
    vec3 p = position;
    p.y = terrain(p.xz);
    float d = length(p.xz);
    vRing = 1.0 - smoothstep(0.0, 1.1, abs(d - uScan));
    vHeight = p.y;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.7 + vRing * 2.4 + aRand * 0.9) * uPixelRatio * (10.0 / -mv.z);
    // Fade out at the far edge and right in front of the camera
    vAlpha = smoothstep(24.0, 8.0, d) * smoothstep(1.5, 5.0, -mv.z);
  }
`;

const objectVertex = /* glsl */ `
  uniform float uTime;
  uniform float uScanY;
  uniform float uPixelRatio;
  attribute float aRand;
  varying float vHeight;
  varying float vRing;
  varying float vAlpha;

  void main() {
    vec3 n = normalize(position);
    float wobble = sin(n.x * 4.0 + uTime * 0.9) * sin(n.y * 3.0 + uTime * 0.7) * sin(n.z * 5.0 + uTime * 0.5);
    vec3 p = position * (1.0 + wobble * 0.18);
    vec4 world = modelMatrix * vec4(p, 1.0);
    vRing = 1.0 - smoothstep(0.0, 0.14, abs(world.y - uScanY));
    vHeight = n.y * 1.4;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.0 + vRing * 3.0 + aRand) * uPixelRatio * (10.0 / -mv.z);
    vAlpha = 0.55 + aRand * 0.45;
  }
`;

const pointFragment = /* glsl */ `
  uniform vec3 uLow;
  uniform vec3 uHigh;
  uniform vec3 uScanColor;
  uniform float uFade;
  varying float vHeight;
  varying float vRing;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    vec3 color = mix(uLow, uHigh, smoothstep(-1.4, 1.6, vHeight));
    color = mix(color, uScanColor, vRing);
    gl_FragColor = vec4(color, vAlpha * (0.65 + vRing * 0.35) * uFade);
  }
`;

const pointMaterial = (vertexShader: string, pixelRatio: number) =>
  new ShaderMaterial({
    vertexShader,
    fragmentShader: pointFragment,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uScan: { value: 0 },
      uScanY: { value: 0 },
      uFade: { value: 1 },
      uPixelRatio: { value: pixelRatio },
      uLow: { value: COLORS.low },
      uHigh: { value: COLORS.high },
      uScanColor: { value: COLORS.scan },
    },
  });

function terrainGeometry(size: number, count: number) {
  const positions = new Float32Array(count * count * 3);
  const rand = new Float32Array(count * count);
  const step = size / (count - 1);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const k = i * count + j;
      // A little jitter keeps it from reading as a perfect grid
      positions[k * 3] = -size / 2 + i * step + (Math.random() - 0.5) * step * 0.6;
      positions[k * 3 + 2] = -size / 2 + j * step + (Math.random() - 0.5) * step * 0.6;
      rand[k] = Math.random();
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aRand", new BufferAttribute(rand, 1));
  return geometry;
}

/** Evenly spread points over a sphere (Fibonacci lattice) */
function sphereGeometry(radius: number, count: number) {
  const positions = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
    rand[i] = Math.random();
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aRand", new BufferAttribute(rand, 1));
  return geometry;
}

/**
 * Starts the scene on the canvas. With `animate: false` (reduced motion) it draws a single still frame.
 * Calls `onReady` after the first frame. Returns a function that stops and frees everything.
 */
export function startPointCloud(canvas: HTMLCanvasElement, { animate, onReady }: { animate: boolean; onReady: () => void }) {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
  renderer.setPixelRatio(pixelRatio);

  const scene = new Scene();
  const camera = new PerspectiveCamera(55, 1, 0.1, 100);

  // Fewer points on small screens: phones have less GPU to spare and the detail wouldn't show anyway
  const small = window.innerWidth < 768;
  const terrain = new Points(terrainGeometry(48, small ? 110 : 170), pointMaterial(terrainVertex, pixelRatio));
  scene.add(terrain);

  const object = new Group();
  const blob = new Points(sphereGeometry(1.5, small ? 2600 : 4200), pointMaterial(objectVertex, pixelRatio));
  const cage = new LineSegments(
    new EdgesGeometry(new IcosahedronGeometry(2.1, 1)),
    new LineBasicMaterial({ color: COLORS.wire, transparent: true, opacity: 0.35, blending: AdditiveBlending })
  );
  object.add(blob, cage);
  scene.add(object);

  const terrainUniforms = (terrain.material as ShaderMaterial).uniforms;
  const blobUniforms = (blob.material as ShaderMaterial).uniforms;
  const cageMaterial = cage.material as LineBasicMaterial;

  const lookAt = new Vector3();
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let wide = true;

  const resize = () => {
    const { innerWidth: w, innerHeight: h } = window;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    wide = w / h > 1;
    // Beside the headline on wide screens; above it, smaller, on phones
    object.position.set(wide ? 4.4 : 0.4, wide ? 1.9 : 3.6, wide ? 0 : -2);
    object.scale.setScalar(wide ? 1 : 0.75);
  };

  const timer = new Timer();

  const render = () => {
    timer.update();
    const t = animate ? timer.getElapsed() : 12;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);

    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;

    // Past the hero the scene rises and dims so the content stays readable
    camera.position.set(pointer.x * 0.8, 3.2 + scroll * 2.2 - pointer.y * 0.4, 10 - scroll * 1.5);
    lookAt.set(0, 1.2 - scroll * 0.8, 0);
    camera.lookAt(lookAt);

    const fade = 1 - scroll * 0.55;
    terrainUniforms.uTime.value = t;
    terrainUniforms.uScan.value = (t * 4.5) % 26;
    terrainUniforms.uFade.value = fade;
    blobUniforms.uTime.value = t;
    blobUniforms.uScanY.value = object.position.y + Math.sin(t * 0.9) * 1.7 * object.scale.x;
    // The object recedes further than the terrain so it never sits loudly behind content
    const objectFade = 1 - scroll * 0.75;
    blobUniforms.uFade.value = objectFade;
    cageMaterial.opacity = 0.35 * objectFade;

    object.rotation.y = t * 0.15 + scroll * 1.5;
    object.rotation.x = Math.sin(t * 0.2) * 0.15;
    cage.rotation.y = -t * 0.25;
    terrain.rotation.y = scroll * 0.4;

    renderer.render(scene, camera);
  };

  const onPointer = (e: PointerEvent) => {
    pointer.tx = e.clientX / window.innerWidth - 0.5;
    pointer.ty = e.clientY / window.innerHeight - 0.5;
  };
  // Don't draw while the tab is hidden
  const onVisibility = () => renderer.setAnimationLoop(document.hidden ? null : render);
  const onResize = () => {
    resize();
    if (!animate) render();
  };

  resize();
  render();
  onReady();

  window.addEventListener("resize", onResize);
  if (animate) {
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    renderer.setAnimationLoop(render);
  }

  return () => {
    renderer.setAnimationLoop(null);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", onVisibility);
    scene.traverse((obj) => {
      if (obj instanceof Points || obj instanceof LineSegments) {
        obj.geometry.dispose();
        (obj.material as ShaderMaterial | LineBasicMaterial).dispose();
      }
    });
    renderer.dispose();
  };
}
