import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { Sky } from 'three/addons/objects/Sky.js';

export type EstateView = 'house' | 'neighborhood';
export type EstateLight = 'day' | 'sunset';
export type SceneOptions = {
  onSelect: (id: string) => void;
  onLoading: (loading: boolean) => void;
  onError: (message: string) => void;
  onLabels: (labels: { id: string; x: number; y: number; visible: boolean }[]) => void;
};

export function createEstateScene(host: HTMLDivElement, options: SceneOptions) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1.3 : 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-label', 'Proprietăți SAV HAUS în 3D. Trage pentru rotire; folosește butoanele de model pentru navigare accesibilă.');
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#d3d8cd');
  scene.fog = new THREE.Fog('#d3d8cd', 150, 360);
  const camera = new THREE.PerspectiveCamera(40, 1, .2, 600);
  camera.position.set(-24, 19, 29);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 2, 0);
  controls.enableDamping = true;
  controls.dampingFactor = .08;
  controls.enablePan = false;
  controls.minDistance = 15;
  controls.maxDistance = 65;
  controls.minPolarAngle = .30;
  controls.maxPolarAngle = Math.PI * .47;
  controls.enableZoom = false; // Keep normal page scrolling; explicit +/- controls zoom.
  controls.touches.ONE = THREE.TOUCH.ROTATE;
  controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
  const hemi = new THREE.HemisphereLight('#e4efff', '#63694a', .65);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight('#fff1d6', 3.6);
  sun.position.set(-25, 34, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(window.innerWidth < 760 ? 1024 : 2048, window.innerWidth < 760 ? 1024 : 2048);
  sun.shadow.bias = -.00015;
  sun.shadow.normalBias = .035;
  sun.shadow.camera.near = .5;
  sun.shadow.camera.far = 220;
  sun.shadow.camera.left = sun.shadow.camera.bottom = -25;
  sun.shadow.camera.right = sun.shadow.camera.top = 25;
  scene.add(sun, sun.target);
  const sky = new Sky();
  sky.scale.setScalar(450);
  const uniforms = sky.material.uniforms;
  uniforms.turbidity.value = 5;
  uniforms.rayleigh.value = 1.3;
  uniforms.mieCoefficient.value = .004;
  uniforms.mieDirectionalG.value = .8;
  const sunDirection = new THREE.Vector3(-.6, .65, .45).normalize();
  uniforms.sunPosition.value.copy(sunDirection);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const skyScene = new THREE.Scene();
  skyScene.add(sky);
  let environment = pmrem.fromScene(skyScene, .025, .1, 600);
  scene.environment = environment.texture;
  scene.environmentIntensity = .55;
  const terrain = new THREE.Mesh(new THREE.PlaneGeometry(550, 550), new THREE.MeshStandardMaterial({ color: '#777f5f', roughness: 1 }));
  terrain.rotation.x = -Math.PI / 2;
  terrain.position.y = -.36;
  terrain.receiveShadow = true;
  scene.add(terrain);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(140, 6), new THREE.MeshStandardMaterial({ color: '#93958a', roughness: .95 }));
  road.rotation.x = -Math.PI / 2;
  road.position.set(51, -.12, -17);
  road.visible = false;
  scene.add(road);
  const positions = Array.from({ length: 8 }, (_, i) => new THREE.Vector3((i % 4) * 34, 0, -Math.floor(i / 4) * 34));
  const models = new Map<string, THREE.Group>();
  const requests = new Map<string, Promise<THREE.Group>>();
  const draco = new DRACOLoader();
  draco.setDecoderPath('/draco/');
  draco.setWorkerLimit(2);
  const loader = new GLTFLoader().setDRACOLoader(draco);
  let disposed = false, activeId = '01', view: EstateView = 'house', flying = false, frame = 0, paused = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const destination = new THREE.Vector3(), destinationTarget = new THREE.Vector3();
  let animationStart = 0;
  const startPosition = new THREE.Vector3(), startTarget = new THREE.Vector3();
  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
  let pointerDown = { x: 0, y: 0 };

  function disposeObject(object: THREE.Object3D) {
    object.traverse(o => {
      if (!(o instanceof THREE.Mesh)) return;
      o.geometry.dispose();
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach(m => {
        Object.values(m).forEach(v => { if (v instanceof THREE.Texture) v.dispose(); });
        m.dispose();
      });
    });
  }
  function load(id: string): Promise<THREE.Group> {
    const cached = models.get(id);
    if (cached) return Promise.resolve(cached);
    const request = requests.get(id);
    if (request) return request;
    const pending = loader.loadAsync('/models/casa-' + id + '.glb').then(gltf => {
      const root = gltf.scene;
      if (disposed) { disposeObject(root); return root; }
      // Exclude any unrelated selected helper from the authoring session.
      [...root.children].filter(o => !o.name.startsWith('architecture') && !o.name.startsWith('landscape')).forEach(o => { root.remove(o); disposeObject(o); });
      root.position.copy(positions[Number(id) - 1]);
      root.traverse(o => {
        o.userData.houseId = id;
        if (!(o instanceof THREE.Mesh)) return;
        o.castShadow = !o.name.includes('grass');
        o.receiveShadow = true;
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach(m => {
          if (!(m instanceof THREE.MeshStandardMaterial)) return;
          m.envMapIntensity = .55;
          if (m.map) m.map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
          if (o.name.includes('glass')) { m.metalness = .6; m.roughness = .14; m.envMapIntensity = 1.4; }
          if (o.name.includes('water')) { m.metalness = .4; m.roughness = .16; m.envMapIntensity = 1.3; }
          if (o.name.includes('stucco') && m.map) { m.bumpMap = m.map; m.bumpScale = .025; }
        });
      });
      root.visible = view === 'neighborhood' || activeId === id;
      scene.add(root);
      models.set(id, root);
      return root;
    }).catch(error => { requests.delete(id); throw error; });
    requests.set(id, pending);
    return pending;
  }
  function fly(position: THREE.Vector3, target: THREE.Vector3) {
    startPosition.copy(camera.position); startTarget.copy(controls.target);
    destination.copy(position); destinationTarget.copy(target); animationStart = performance.now(); flying = true;
    if (reducedMotion) { camera.position.copy(position); controls.target.copy(target); flying = false; controls.update(); }
  }
  function shadows(center: THREE.Vector3, radius: number) {
    sun.target.position.copy(center);
    const offset = sun.position.clone().sub(controls.target).normalize().multiplyScalar(60);
    sun.position.copy(center).add(offset);
    sun.shadow.camera.left = sun.shadow.camera.bottom = -radius;
    sun.shadow.camera.right = sun.shadow.camera.top = radius;
    sun.shadow.camera.updateProjectionMatrix();
  }
  async function focus(id: string, open = false) {
    activeId = id; view = 'house'; road.visible = false;
    const center = positions[Number(id) - 1];
    models.forEach((m, key) => { m.visible = key === id; });
    options.onLoading(!models.has(id));
    try {
      await load(id);
      if (disposed || activeId !== id || view !== 'house') return;
      models.get(id)!.visible = true;
      const offset = Number(id) === 1 ? new THREE.Vector3(-23, 16, 25) : new THREE.Vector3(-23, 18, 28);
      if (window.innerWidth < 760) offset.multiplyScalar(1.18);
      fly(center.clone().add(offset), center.clone().add(new THREE.Vector3(open ? 1 : -1, 1.7, 0)));
      shadows(center, 24);
      options.onLoading(false);
    } catch { if (!disposed && activeId === id) { options.onLoading(false); options.onError('La acest moment modelul 3D nu a putut fi încărcat. Poți reîncerca sau consulta planurile.'); } }
  }
  async function overview() {
    view = 'neighborhood'; road.visible = true;
    models.forEach(m => { m.visible = true; });
    options.onLoading(true);
    const center = new THREE.Vector3(51, 0, -17);
    controls.maxDistance = 210;
    fly(center.clone().add(new THREE.Vector3(-68, 91, 112)), center);
    shadows(center, 95);
    const results = await Promise.allSettled(Array.from({ length: 8 }, (_, i) => load(String(i + 1).padStart(2, '0'))));
    if (disposed || view !== 'neighborhood') return;
    options.onLoading(false);
    if (results.some(r => r.status === 'rejected')) options.onError('Unele proprietăți nu s-au încărcat. Selectează modelul dorit pentru a reîncerca.');
  }
  function setLight(mode: EstateLight) {
    const sunset = mode === 'sunset';
    hemi.intensity = sunset ? .35 : .65;
    sun.intensity = sunset ? 3.3 : 3.6;
    sun.color.set(sunset ? '#ffb86b' : '#fff1d6');
    const center = view === 'house' ? positions[Number(activeId) - 1] : new THREE.Vector3(51, 0, -17);
    sun.position.copy(center).add(new THREE.Vector3(-35, sunset ? 14 : 42, 25));
    sun.target.position.copy(center);
    uniforms.sunPosition.value.set(-.6, sunset ? .13 : .65, .45).normalize();
    uniforms.turbidity.value = sunset ? 8 : 5;
    const next = pmrem.fromScene(skyScene, .025, .1, 600);
    scene.environment = next.texture; environment.dispose(); environment = next;
    scene.background = new THREE.Color(sunset ? '#c7b69d' : '#d3d8cd');
    (scene.fog as THREE.Fog).color.copy(scene.background);
    renderer.toneMappingExposure = sunset ? .9 : 1.02;
  }
  const onDown = (e: PointerEvent) => { pointerDown = { x: e.clientX, y: e.clientY }; flying = false; };
  const onUp = (e: PointerEvent) => {
    if (Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y) > 7) return;
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.set((e.clientX - bounds.left) / bounds.width * 2 - 1, -(e.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects([...models.values()].filter(m => m.visible), true).find(h => h.object.name.startsWith('architecture'));
    if (hit) options.onSelect(hit.object.userData.houseId as string);
  };
  const lost = (event: Event) => { event.preventDefault(); options.onError('Vizualizarea 3D a fost întreruptă. Reîncarcă scena sau explorează planurile de mai jos.'); };
  renderer.domElement.addEventListener('pointerdown', onDown);
  renderer.domElement.addEventListener('pointerup', onUp);
  renderer.domElement.addEventListener('webglcontextlost', lost);
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height, false); camera.aspect = width / Math.max(1, height); camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  const visibility = new IntersectionObserver(entries => { paused = !entries[0].isIntersecting; }, { rootMargin: '120px' }); visibility.observe(host);
  const labelPoint = new THREE.Vector3();
  let lastLabel = 0;
  function animate(now: number) {
    frame = requestAnimationFrame(animate);
    if (paused || document.hidden) return;
    if (flying) {
      const t = Math.min(1, (now - animationStart) / 1250), ease = t * t * (3 - 2 * t);
      camera.position.lerpVectors(startPosition, destination, ease); controls.target.lerpVectors(startTarget, destinationTarget, ease);
      if (t === 1) flying = false;
    }
    controls.update(); renderer.render(scene, camera);
    if (now - lastLabel > 80) {
      lastLabel = now;
      options.onLabels(positions.map((p, i) => {
        labelPoint.copy(p).add(new THREE.Vector3(0, i > 4 ? 9 : 6.5, 0)).project(camera);
        return { id: String(i + 1).padStart(2, '0'), x: (labelPoint.x * .5 + .5) * host.clientWidth, y: (-labelPoint.y * .5 + .5) * host.clientHeight, visible: view === 'neighborhood' && !!models.get(String(i + 1).padStart(2, '0')) && Math.abs(labelPoint.x) < .95 && Math.abs(labelPoint.y) < .95 && labelPoint.z < 1 };
      }));
    }
  }
  frame = requestAnimationFrame(animate);
  return {
    focus: (id: string) => { controls.maxDistance = 65; return focus(id); }, overview, setLight,
    zoom: (amount: number) => { flying = false; const delta = camera.position.clone().sub(controls.target); const distance = THREE.MathUtils.clamp(delta.length() * amount, controls.minDistance, controls.maxDistance); camera.position.copy(controls.target).add(delta.setLength(distance)); },
    dispose: () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect(); controls.dispose(); draco.dispose();
      renderer.domElement.removeEventListener('pointerdown', onDown); renderer.domElement.removeEventListener('pointerup', onUp); renderer.domElement.removeEventListener('webglcontextlost', lost);
      disposeObject(scene); environment.dispose(); pmrem.dispose(); renderer.dispose(); renderer.domElement.remove();
    }
  };
}
