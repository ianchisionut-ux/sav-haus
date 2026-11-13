"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { houseModels } from '@/lib/houseModels';
import { levelDetails, formatSquareMeters } from '@/lib/housePlanDetails';
import type { createEstateScene, EstateLight } from '@/lib/estateScene';

type SceneController = ReturnType<typeof createEstateScene>;
type Tab = 'overview' | 'plans' | 'areas';
const lotNames = ['Grădina intimă', 'Oaza de relaxare', 'Deschisă spre natură', 'Grădina familiei', 'Spațiu fără compromis', 'Refugiul cu mansardă', 'Acasă, în echilibru', 'Priveliște pe două niveluri'];
const groups = [
  { name: 'Zona de zi', color: '#f9982d', match: /living|bucătărie|birou/i },
  { name: 'Zona de noapte', color: '#557e60', match: /dormitor|dressing/i },
  { name: 'Spații complementare', color: '#a7b9b4', match: /.*/ },
];

function AreaChart({ id }: { id: string }) {
  const rooms = Object.values(levelDetails[id]).flatMap(level => [...level.rooms]);
  const values = [0, 0, 0];
  rooms.forEach(([name, area]) => { const index = groups.findIndex(group => group.match.test(name)); values[index] += area; });
  const total = values.reduce((a, b) => a + b, 0);
  let cumulative = 0;
  return <div className="estate-infographic">
    <svg viewBox="0 0 180 180" role="img" aria-label="Repartizarea suprafețelor: zona de zi, zona de noapte și spații complementare">
      <circle cx="90" cy="90" r="67" fill="none" stroke="#e8eae4" strokeWidth="17" />
      {values.map((value, i) => {
        const length = value / total * 420.97, start = cumulative; cumulative += length;
        return <circle key={groups[i].name} cx="90" cy="90" r="67" fill="none" stroke={groups[i].color} strokeWidth="17" strokeDasharray={`${Math.max(0, length - 3)} 420.97`} strokeDashoffset={-start} transform="rotate(-90 90 90)" />;
      })}
      <text x="90" y="88" textAnchor="middle" className="estate-chart-number">{houseModels.find(m => m.id === id)!.area.toLocaleString('ro-RO')}</text>
      <text x="90" y="109" textAnchor="middle" className="estate-chart-label">m² utili</text>
    </svg>
    <div>{values.map((value, i) => <div className="estate-chart-legend" key={groups[i].name}><i style={{ background: groups[i].color }} /><span>{groups[i].name}<strong>{formatSquareMeters(value)}</strong></span></div>)}</div>
  </div>;
}

export default function EstateExplorer() {
  const [selected, setSelected] = useState('01');
  const [neighborhood, setNeighborhood] = useState(false);
  const [details, setDetails] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');
  const [light, setLight] = useState<EstateLight>('day');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<SceneController | null>(null);
  const labels = useRef<(HTMLButtonElement | null)[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const detailsButton = useRef<HTMLButtonElement>(null);
  const selectedRef = useRef('01');
  const select = useCallback((id: string, open = false) => {
    selectedRef.current = id;
    setSelected(id); setNeighborhood(false); setError(''); setTab('overview');
    if (open) setDetails(true);
    void controller.current?.focus(id);
    window.history.replaceState(null, '', '#casa-' + id);
  }, []);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('casa') || window.location.hash.replace('#casa-', '');
    if (houseModels.some(m => m.id === requested)) { selectedRef.current = requested; setSelected(requested); }
    let cancelled = false;
    setError(''); setLoading(true); setReady(false);
    import('@/lib/estateScene').then(({ createEstateScene }) => {
      if (cancelled || !host.current) return;
      const scene = createEstateScene(host.current, {
        onSelect: id => select(id, true),
        onLoading: value => { if (!cancelled) { setLoading(value); if (!value) setReady(true); } },
        onError: message => { if (!cancelled) { setError(message); setLoading(false); setReady(false); } },
        onLabels: positions => positions.forEach((position, i) => {
          const element = labels.current[i];
          if (!element) return;
          element.style.transform = `translate(-50%, -100%) translate(${position.x}px,${position.y}px)`;
          element.style.display = position.visible ? 'flex' : 'none';
        }),
      });
      controller.current = scene;
      void scene.focus(selectedRef.current);
    }).catch(() => { if (!cancelled) { setError('Browserul nu a putut porni vizualizarea 3D. Poți consulta imaginile și planurile fiecărui model.'); setLoading(false); } });
    return () => { cancelled = true; controller.current?.dispose(); controller.current = null; };
  }, [select, attempt]);

  useEffect(() => {
    if (!details) return;
    heading.current?.focus({ preventScroll: true });
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setDetails(false); detailsButton.current?.focus({ preventScroll: true }); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [details]);

  const model = houseModels.find(m => m.id === selected)!;
  const level = levelDetails[selected];
  const next = (delta: number) => select(String((Number(selected) - 1 + delta + 8) % 8 + 1).padStart(2, '0'));
  const openOverview = () => {
    setNeighborhood(true); setDetails(false); setError('');
    void controller.current?.overview();
  };
  const changeLight = (value: EstateLight) => { setLight(value); controller.current?.setLight(value); };
  const closeDetails = () => { setDetails(false); detailsButton.current?.focus({ preventScroll: true }); };

  return <section id="exploreaza" className={`estate-explorer ${details ? 'estate-has-details' : ''} ${error ? 'estate-unavailable' : ''}`} aria-label="Explorează interactiv colecția SAV HAUS">
    <div className="estate-scene" ref={host} />
    {!ready && <img className="estate-poster" src={`/catalog/casa-${selected}.jpg`} alt={`Perspectivă Casa ${selected} din catalogul SAV HAUS`} />}
    <div className="estate-shade" />
    <div className="estate-editorial">
      <div className="estate-eyebrow"><span /> COLECȚIA SAV HAUS / 2026</div>
      <h1>O casă.<br />{' '}O lume <em>a ta.</em></h1>
      <p>Opt feluri de a locui. Descoperă casa care îți seamănă, înainte să îi treci pragul.</p>
      <button className="estate-overview-button" onClick={neighborhood ? () => select(selected) : openOverview}><span aria-hidden="true">{neighborhood ? '⌂' : '▦'}</span>{neighborhood ? 'Înapoi la casa mea' : 'Explorează toate proprietățile'}<span aria-hidden="true">↗</span></button>
      <a className="estate-wall-link" href="#perete-interactiv">Descoperă peretele în 3D <span aria-hidden="true">↓</span></a>
      <div className="estate-edition"><strong>08</strong><span>modele de case<br />61 — 165 m² utili</span></div>
    </div>
    <div className="estate-world-labels" aria-hidden={!neighborhood}>
      {houseModels.map((m, i) => <button key={m.id} ref={el => { labels.current[i] = el; }} style={{ display: 'none' }} tabIndex={neighborhood ? 0 : -1} className="estate-world-label" onClick={() => select(m.id, true)} aria-label={`Descoperă Casa ${m.id}, ${m.area} metri pătrați`}><b>{m.id}</b><span>Casa {m.id}<small>{m.area.toLocaleString('ro-RO')} m²</small></span><span>↗</span></button>)}
    </div>
    <div className="estate-top-tools">
      <span className="estate-live"><i /> EXPLORARE 3D</span>
      <div className="estate-light-switch" aria-label="Atmosfera scenei">
        <button aria-pressed={light === 'day'} onClick={() => changeLight('day')}>☀ <span>Zi</span></button>
        <button aria-pressed={light === 'sunset'} onClick={() => changeLight('sunset')}>◐ <span>Apus</span></button>
      </div>
    </div>
    {!neighborhood && !details && <button className="estate-house-pin" onClick={() => setDetails(true)} aria-label={`Vezi detalii despre Casa ${selected}`}><span className="estate-pin-dot" /><span>Casa {selected}<small>Descoperă modelul</small></span><b>+</b></button>}
    <div className="estate-camera-tools" aria-label="Comenzi cameră">
      <button onClick={() => controller.current?.zoom(.85)} aria-label="Apropie camera">+</button>
      <button onClick={() => controller.current?.zoom(1.15)} aria-label="Îndepărtează camera">−</button>
      <button onClick={() => neighborhood ? controller.current?.overview() : controller.current?.focus(selected)} aria-label="Resetează perspectiva">⟲</button>
    </div>
    {loading && <div className="estate-loading" role="status"><span /> Pregătim {neighborhood ? 'colecția' : `Casa ${selected}`}…</div>}
    {error && <div className="estate-error" role="status"><p>{error}</p><button onClick={() => { setNeighborhood(false); setAttempt(n => n + 1); }}>Reîncarcă scena</button><button onClick={() => setDetails(true)}>Vezi modelul și planurile</button></div>}
    {!details && <div className="estate-selected-card" aria-live="polite">
      <div className="estate-selected-title"><span className="estate-eyebrow">{neighborhood ? 'ALEGE O PROPRIETATE DIN SCENĂ' : lotNames[Number(selected) - 1]}</span><div><h2>Casa {selected}</h2><div className="estate-arrows"><button onClick={() => next(-1)} aria-label="Modelul anterior">←</button><button onClick={() => next(1)} aria-label="Modelul următor">→</button></div></div></div>
      <div className="estate-selected-stats"><div><strong>{model.area.toLocaleString('ro-RO')}<small> m²</small></strong><span>Suprafață utilă</span></div><div><strong>{model.bedrooms}</strong><span>{model.bedrooms === 1 ? 'Dormitor' : 'Dormitoare'}</span></div><div><strong>{model.floors}</strong><span>Regim de înălțime</span></div></div>
      <button className="estate-detail-button" ref={detailsButton} onClick={() => setDetails(true)}>Descoperă casa <span>↗</span></button>
    </div>}
    {details && <aside className="estate-detail-panel" role="dialog" aria-modal="false" aria-labelledby="estate-detail-title">
      <div className="estate-panel-heading"><div><span className="estate-eyebrow">MODELUL {selected} / COLECȚIA 2026</span><h2 id="estate-detail-title" ref={heading} tabIndex={-1}>Casa <em>{selected}</em></h2></div><button onClick={closeDetails} aria-label="Închide detaliile">×</button></div>
      <p className="estate-panel-tagline">{model.title}</p>
      <div className="estate-tabs" aria-label="Informații despre casă">{([['overview', 'Prezentare'], ['plans', 'Planuri'], ['areas', 'Suprafețe']] as const).map(([key, label]) => <button key={key} aria-pressed={tab === key} onClick={() => setTab(key)}>{label}</button>)}</div>
      <div className="estate-panel-content">
        {tab === 'overview' && <>
          <img className="estate-catalog-image" src={`/catalog/casa-${selected}.jpg`} alt={`Randare ilustrativă Casa ${selected} din catalog`} />
          <p className="estate-description">{model.description}</p>
          <div className="estate-facts">{[[formatSquareMeters(model.area), 'Suprafață utilă'], [formatSquareMeters(model.built), 'Suprafață desfășurată'], [String(model.bedrooms), 'Dormitoare'], [model.floors, 'Regim de înălțime']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
          <h3>Loc pentru tot ce contează.</h3><AreaChart id={selected} />
          {model.areaNote && <p className="estate-note">{model.areaNote}</p>}
        </>}
        {tab === 'plans' && <>{model.plans.map(plan => <div key={plan.name} className="estate-floor-plan"><div><h3>{plan.name}</h3><span>{formatSquareMeters(level[plan.name].usefulArea)}</span></div><a href={`/catalog/plan-${selected}-${level[plan.name].sourcePage}.jpg`} target="_blank" rel="noreferrer" aria-label={`Deschide planul ${plan.name} la dimensiune completă`}><img src={`/catalog/plan-${selected}-${level[plan.name].sourcePage}.jpg`} alt={`Plan original ${plan.name} Casa ${selected}`} /><span>Mărește planul ↗</span></a><p>{level[plan.name].exteriorDimensions} · Cote exterioare maxime</p>{level[plan.name].note && <p className="estate-note">{level[plan.name].note}</p>}</div>)}</>}
        {tab === 'areas' && <>{Object.entries(level).map(([name, info]) => <div className="estate-room-schedule" key={name}><h3>{name} <span>{formatSquareMeters(info.usefulArea)}</span></h3>{info.rooms.map(([room, area], i) => <div className="estate-room-row" key={`${room}-${i}`}><div><span>{room}</span><strong>{formatSquareMeters(area)}</strong></div><i style={{ width: `${area / Math.max(...info.rooms.map(r => r[1])) * 100}%` }} /></div>)}{info.separate?.map(([room, area]) => <p className="estate-note" key={room}>{room}: {formatSquareMeters(area)}, prezentat separat.</p>)}{info.note && <p className="estate-note">{info.note}</p>}</div>)}</>}
        <p className="estate-source-note">Date din catalogul SAV HAUS 2026. Volumetria 3D este reconstituită vizual. Amenajările loturilor sunt ilustrative.</p>
      </div>
      <div className="estate-panel-footer"><Link className="estate-detail-button" href={`/oferta?model=${selected}`}>Solicită o ofertă <span>↗</span></Link><Link href={`/modele-case/${selected}`}>Pagina completă a modelului ↗</Link></div>
    </aside>}
    <div className="estate-bottom-bar"><span className="estate-navigation-hint"><span aria-hidden="true">↔</span> Trage pentru a roti · Click pe casă pentru detalii</span><span className="estate-counter">{selected} <i>/ 08</i></span></div>
    <nav className="estate-model-strip" aria-label="Alege unul dintre cele opt modele de case">{houseModels.map(m => <button key={m.id} onClick={() => select(m.id)} aria-pressed={!neighborhood && selected === m.id} aria-label={`Casa ${m.id}, ${m.area} metri pătrați, ${m.floors}`}><img src={`/catalog/casa-${m.id}.jpg`} alt="" /><span><b>Casa {m.id}</b><small>{m.area.toLocaleString('ro-RO')} m² <i>· {m.floors}</i></small></span><span className="estate-model-index">{m.id}</span></button>)}</nav>
  </section>;
}
