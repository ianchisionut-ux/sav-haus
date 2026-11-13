import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { wallMaterials, type WallMaterialId } from './wallMaterials';

type Marker = { id: WallMaterialId; x: number; y: number; visible: boolean };
type Options = { onSelect: (id: WallMaterialId) => void; onMarkers: (markers: Marker[]) => void; onError: () => void };

export function createWallScene(host: HTMLDivElement, options: Options) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-label', 'Secțiune 3D a peretelui timber frame. Trage pentru rotire sau selectează materialele din listă.');
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#142f38');
  scene.fog = new THREE.Fog('#142f38', 22, 65);
  const camera = new THREE.OrthographicCamera(-4, 4, 3, -3, .1, 100);
  const defaultCamera = new THREE.Vector3(-7.7, 4.7, 9.5);
  camera.position.copy(defaultCamera);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.32, 0);
  controls.enableDamping = true; controls.dampingFactor = .085;
  controls.enablePan = false; controls.enableZoom = false;
  controls.minPolarAngle = .35; controls.maxPolarAngle = Math.PI * .51;
  const studio = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, .025);
  scene.environment = environment.texture; scene.environmentIntensity = .55;
  studio.dispose();
  scene.add(new THREE.HemisphereLight('#e1edff', '#3a352b', 1.1));
  const key = new THREE.DirectionalLight('#ffead0', 3.8);
  key.position.set(3, 8, 6); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = key.shadow.camera.bottom = -8;
  key.shadow.camera.right = key.shadow.camera.top = 8;
  key.shadow.camera.far = 30; key.shadow.normalBias = .018; key.shadow.bias = -.00015;
  scene.add(key);
  const rim = new THREE.DirectionalLight('#aacdff', 2.0); rim.position.set(-5, 4, -5); scene.add(rim);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshStandardMaterial({ color: '#142f38', roughness: .9 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -.07; floor.receiveShadow = true; scene.add(floor);
  const grid = new THREE.GridHelper(30, 60, '#36535a', '#23424b'); grid.position.y = -.055;
  const gridMat = grid.material as THREE.Material; gridMat.transparent = true; gridMat.opacity = .21; scene.add(grid);
  let seed = 2006;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const textures: THREE.Texture[] = [];
  function texture(kind: 'osb' | 'wood' | 'wool' | 'membrane' | 'lining') {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = { osb: '#b69762', wood: '#d7b77e', wool: '#b8bc77', membrane: '#a6ada7', lining: '#e5e4d9' }[kind];
    ctx.fillRect(0, 0, 512, 512);
    if (kind === 'osb') {
      for (let i = 0; i < 3000; i++) {
        const x = random() * 512, y = random() * 512, a = random() * Math.PI;
        ctx.save(); ctx.translate(x, y); ctx.rotate(a);
        ctx.fillStyle = ['#ddc79a', '#c7a973', '#977545', '#af8f59', '#ead5a8'][Math.floor(random() * 5)];
        const w = 7 + random() * 40, h = 1 + random() * 7;
        ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 3, h); ctx.lineTo(w / 2, h * .6); ctx.lineTo(w / 3, -h * .3); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#7e64304a'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(w / 2, h * .5); ctx.stroke(); ctx.restore();
      }
    } else if (kind === 'wood') {
      for (let i = 0; i < 160; i++) {
        ctx.strokeStyle = i % 3 ? '#8d60282c' : '#f2dab14d'; ctx.lineWidth = random() * 2 + .3;
        const x = random() * 512;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.bezierCurveTo(x + 7, 170, x - 9, 340, x + 1, 512); ctx.stroke();
      }
      for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.strokeStyle = '#91682c65'; ctx.lineWidth = .7; ctx.ellipse(230, 290, 3 + i * 2.2, 8 + i * 5.0, -.12, 0, Math.PI * 2); ctx.stroke(); }
    } else if (kind === 'wool') {
      for (let i = 0; i < 18000; i++) {
        ctx.strokeStyle = ['#d4d59b', '#828c4f', '#b1b671', '#ebebba'][Math.floor(random() * 4)]; ctx.lineWidth = .5 + random() * 1.3;
        const x = random() * 512, y = random() * 512; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + random() * 9, y - random() * 6, x + random() * 13 - 6, y + random() * 12 - 6); ctx.stroke();
      }
    } else if (kind === 'membrane') {
      ctx.strokeStyle = '#e5e9de9c'; ctx.lineWidth = .8;
      for (let n = 0; n <= 512; n += 24) { ctx.beginPath(); ctx.moveTo(n, 0); ctx.lineTo(n, 512); ctx.moveTo(0, n); ctx.lineTo(512, n); ctx.stroke(); }
      ctx.strokeStyle = '#4a575344'; for (let n = 1; n < 512; n += 47) { ctx.beginPath(); ctx.moveTo(0, n); ctx.bezierCurveTo(130, n - 6, 350, n + 9, 512, n + 3); ctx.stroke(); }
    } else {
      for (let i = 0; i < 12000; i++) { ctx.fillStyle = i % 2 ? '#fff9' : '#979c9220'; ctx.fillRect(random() * 512, random() * 512, 1, 1); }
    }
    const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = map.wrapT = THREE.RepeatWrapping; map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); textures.push(map); return map;
  }
  const osbMap = texture('osb'), woodMap = texture('wood'), woolMap = texture('wool'), membraneMap = texture('membrane'), liningMap = texture('lining');
  const osb = new THREE.MeshStandardMaterial({ map: osbMap, bumpMap: osbMap, bumpScale: .018, roughness: .86 });
  const wood = new THREE.MeshStandardMaterial({ map: woodMap, roughness: .69, bumpMap: woodMap, bumpScale: .007 });
  const wool = new THREE.MeshStandardMaterial({ map: woolMap, bumpMap: woolMap, bumpScale: .045, roughness: 1 });
  const foil = new THREE.MeshStandardMaterial({ map: membraneMap, bumpMap: membraneMap, bumpScale: .009, roughness: .39, metalness: .77, side: THREE.DoubleSide });
  const gypsum = new THREE.MeshStandardMaterial({ map: liningMap, roughness: .93, bumpMap: liningMap, bumpScale: .003 });
  const tape = new THREE.MeshStandardMaterial({ color: '#245f48', roughness: .6 });
  const metal = new THREE.MeshStandardMaterial({ color: '#a9b4b2', metalness: .85, roughness: .27 });
  const black = new THREE.MeshStandardMaterial({ color: '#13191b', roughness: .7 });
  const layers = wallMaterials.map(m => { const group = new THREE.Group(); group.name = m.id; group.userData.materialId = m.id; scene.add(group); return group; });
  function box(group: THREE.Group, width: number, height: number, depth: number, x: number, y: number, z: number, material: THREE.Material, radius = .006) {
    const geometry = new RoundedBoxGeometry(width, height, depth, 2, Math.min(radius, depth * .25));
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; mesh.userData.materialId = group.name; group.add(mesh); return mesh;
  }
  const W = 3.2, H = 2.65;
  box(layers[0], W, H, .035, 0, H / 2, -.135, osb);
  // Timber and insulation share one structural plane in the assembled wall.
  for (const x of [-1.51, -.51, .51, 1.51]) box(layers[1], .18, H, .22, x, H / 2, 0, wood, .008);
  for (const y of [.09, H - .09]) box(layers[1], W - .18, .18, .22, 0, y, 0, wood, .008);
  for (const x of [-1.01, 0, 1.01]) box(layers[1], .83, .13, .22, x, 1.30, 0, wood, .006);
  for (const x of [-1.01, 0, 1.01]) {
    box(layers[2], .82, 1.03, .205, x, .70, 0, wool, .017);
    box(layers[2], .82, 1.08, .205, x, 1.97, 0, wool, .017);
  }
  // Staggered display cutouts reveal the actual layer order, as in the reference model.
  box(layers[3], 2.30, 2.25, .035, .45, 1.125, .135, osb);
  box(layers[4], 2.06, 2.0, .009, .57, 1.0, .162, foil, .001);
  box(layers[4], 2.06, .075, .006, .57, 1.54, .170, tape, .001);
  box(layers[5], 1.83, 1.65, .035, .685, .825, .195, gypsum, .003);
  // Horizontal board joint and visible screw heads.
  box(layers[5], 1.82, .006, .004, .685, .85, .214, new THREE.MeshStandardMaterial({ color: '#b9bdae', roughness: 1 }), .001);
  for (const x of [-.13, .68, 1.47]) for (const y of [.16, .76, 1.48]) {
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(.011, .011, .004, 12), black); screw.rotation.x = Math.PI / 2; screw.position.set(x, y, .216); screw.userData.materialId = 'lining'; layers[5].add(screw);
  }
  const points = [new THREE.Vector3(-.95, .08, .12), new THREE.Vector3(-.95, .7, .12), new THREE.Vector3(-.89, .86, .12), new THREE.Vector3(-.89, 1.52, .12)];
  const path = new THREE.CatmullRomCurve3(points);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(path, 48, .038, 10, false), black); tube.userData.materialId = 'accessories'; layers[6].add(tube);
  for (let i = 0; i < 45; i++) {
    const point = path.getPoint(i / 45), tangent = path.getTangent(i / 45);
    const rib = new THREE.Mesh(new THREE.TorusGeometry(.040, .006, 4, 10), black); rib.position.copy(point); rib.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent); rib.userData.materialId = 'accessories'; layers[6].add(rib);
  }
  for (const x of [-1.5, 1.5]) {
    box(layers[6], .17, .23, .016, x, .13, .134, metal, .004);
    box(layers[6], .17, .016, .22, x, .016, .23, metal, .004);
    for (const y of [.09, .18]) {
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(.022, .022, .014, 6), metal); bolt.rotation.x = Math.PI / 2; bolt.position.set(x, y, .15); bolt.userData.materialId = 'accessories'; layers[6].add(bolt);
    }
  }
  // A fine surface fleece makes the insulation read as fibers, rather than foam.
  const fiberVertices: number[] = [];
  for (let i = 0; i < 6500; i++) {
    const bay = Math.floor(random() * 3), x = [-1.01, 0, 1.01][bay] + (random() - .5) * .81;
    const y = .2 + random() * 2.25;
    if (Math.abs(y - 1.3) < .08) continue;
    const z = .105 + random() * .009;
    fiberVertices.push(x, y, z, x + (random() - .5) * .035, y + random() * .025, z + random() * .012);
  }
  const fibers = new THREE.BufferGeometry(); fibers.setAttribute('position', new THREE.Float32BufferAttribute(fiberVertices, 3));
  layers[2].add(new THREE.LineSegments(fibers, new THREE.LineBasicMaterial({ color: '#d7d69b', transparent: true, opacity: .35 })));
  const highlight = new THREE.BoxHelper(layers[1], '#f9982d');
  (highlight.material as THREE.Material).transparent = true; (highlight.material as THREE.Material).opacity = .62; scene.add(highlight);
  let selected: WallMaterialId = 'timber', targetOpen = 0, openness = 0, frame = 0, disposed = false, paused = false, aspect = 1;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
  let downX = 0, downY = 0, markerTime = 0;
  const down = (event: PointerEvent) => { downX = event.clientX; downY = event.clientY; };
  const hitTest = (event: PointerEvent) => {
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(layers, true).find(hit => !!hit.object.userData.materialId);
  };
  const up = (event: PointerEvent) => {
    if (Math.hypot(event.clientX - downX, event.clientY - downY) > 6) return;
    const hit = hitTest(event); if (hit) options.onSelect(hit.object.userData.materialId as WallMaterialId);
  };
  const move = (event: PointerEvent) => { renderer.domElement.style.cursor = hitTest(event) ? 'pointer' : 'grab'; };
  const contextLost = (event: Event) => { event.preventDefault(); options.onError(); };
  renderer.domElement.addEventListener('pointerdown', down); renderer.domElement.addEventListener('pointerup', up); renderer.domElement.addEventListener('pointermove', move); renderer.domElement.addEventListener('webglcontextlost', contextLost);
  function projection() {
    const h = Math.max(4.3 + openness * .5, (4.5 + openness * 4.0) / aspect);
    camera.left = -h * aspect / 2; camera.right = h * aspect / 2; camera.top = h / 2; camera.bottom = -h / 2; camera.updateProjectionMatrix();
  }
  const resize = () => { const bounds = host.getBoundingClientRect(); aspect = bounds.width / Math.max(1, bounds.height); renderer.setSize(bounds.width, bounds.height, false); projection(); };
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  const intersection = new IntersectionObserver(entries => { paused = !entries[0].isIntersecting; }, { rootMargin: '80px' }); intersection.observe(host);
  const projected = new THREE.Vector3();
  const offsets = [-2.5, -1.5, -.5, .5, 1.5, 2.5, -1.5];
  function animate(now: number) {
    if (disposed) return;
    frame = requestAnimationFrame(animate);
    if (paused || document.hidden) return;
    const before = openness;
    openness = reducedMotion ? targetOpen : THREE.MathUtils.lerp(openness, targetOpen, .085);
    if (Math.abs(openness - targetOpen) < .001) openness = targetOpen;
    if (before !== openness) projection();
    layers.forEach((group, index) => { group.position.z = offsets[index] * openness * 1.35; group.position.y = group.name === selected ? .055 : 0; });
    highlight.setFromObject(layers[wallMaterials.findIndex(m => m.id === selected)]);
    controls.update(); renderer.render(scene, camera);
    if (now - markerTime > 70) {
      markerTime = now;
      options.onMarkers(wallMaterials.slice(0, 6).map((m, i) => {
        const anchor = layers[i]; projected.set(0, i === 5 ? 1.85 : i === 4 ? 2.17 : i === 3 ? 2.42 : 2.84, anchor.position.z).project(camera);
        return { id: m.id, x: (projected.x * .5 + .5) * host.clientWidth, y: (-projected.y * .5 + .5) * host.clientHeight, visible: openness > .55 && Math.abs(projected.x) < .97 && Math.abs(projected.y) < .97 && projected.z < 1 };
      }));
    }
  }
  frame = requestAnimationFrame(animate);
  return {
    setOpen: (value: number) => { targetOpen = THREE.MathUtils.clamp(value, 0, 1); },
    select: (id: WallMaterialId) => { selected = id; },
    reset: () => { camera.position.copy(defaultCamera); controls.target.set(0, 1.32, 0); camera.zoom = 1; camera.updateProjectionMatrix(); controls.update(); },
    zoom: (factor: number) => { camera.zoom = THREE.MathUtils.clamp(camera.zoom * factor, .65, 1.8); camera.updateProjectionMatrix(); },
    dispose: () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', down); renderer.domElement.removeEventListener('pointerup', up); renderer.domElement.removeEventListener('pointermove', move); renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
      scene.traverse(object => { if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material)); } });
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose()); environment.dispose(); pmrem.dispose(); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
