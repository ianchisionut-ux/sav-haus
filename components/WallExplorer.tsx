"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { wallMaterials, wallIllustrationNote, type WallMaterialId } from '@/lib/wallMaterials';
import type { createWallScene } from '@/lib/wallScene';

export default function WallExplorer() {
  const [selected, setSelected] = useState<WallMaterialId>('timber');
  const [open, setOpen] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [mobileDetail, setMobileDetail] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<ReturnType<typeof createWallScene> | null>(null);
  const selectedRef = useRef<WallMaterialId>('timber');
  const openRef = useRef(0);
  const markers = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileClose = useRef<HTMLButtonElement>(null);
  const material = wallMaterials.find(item => item.id === selected)!;

  const select = useCallback((id: WallMaterialId) => {
    selectedRef.current = id; setSelected(id); scene.current?.select(id);
  }, []);
  const selectOnModel = useCallback((id: WallMaterialId) => {
    select(id);
    if (window.matchMedia('(max-width: 760px)').matches) setMobileDetail(true);
  }, [select]);
  const expand = (value: number) => {
    openRef.current = value; setOpen(value); scene.current?.setOpen(value / 100);
  };

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false, starting = false;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting) || starting) return;
      starting = true; observer.disconnect(); setFailed(false);
      import('@/lib/wallScene').then(({ createWallScene }) => {
        if (cancelled) return;
        const controller = createWallScene(element, {
          onSelect: selectOnModel,
          onMarkers: positions => positions.forEach((position, index) => {
            const marker = markers.current[index]; if (!marker) return;
            marker.style.transform = `translate(-50%, -100%) translate(${position.x}px,${position.y}px)`;
            marker.style.display = position.visible ? 'flex' : 'none';
          }),
          onError: () => { if (!cancelled) { setFailed(true); setReady(false); } },
        });
        scene.current = controller; controller.select(selectedRef.current); controller.setOpen(openRef.current / 100); setReady(true);
      }).catch(() => { if (!cancelled) { setFailed(true); setReady(false); } });
    }, { rootMargin: '240px' });
    observer.observe(element);
    return () => { cancelled = true; observer.disconnect(); scene.current?.dispose(); scene.current = null; };
  }, [attempt, selectOnModel]);

  useEffect(() => {
    if (!mobileDetail) return;
    mobileClose.current?.focus({ preventScroll: true });
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileDetail(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [mobileDetail]);

  return <section id="perete-interactiv" className="wall-explorer" aria-label="Secțiune interactivă a peretelui timber frame">
    <div className="wall-container">
      <div className="wall-section-heading">
        <div><p className="wall-eyebrow"><span /> DINCOLO DE FAȚADĂ / TIMBER FRAME</p><h2>Un perete.<br /><em>Fiecare strat contează.</em></h2></div>
        <p>Desfă secțiunea, rotește perspectiva și selectează un material. Descoperă cum se întâlnesc lemnul, izolația și straturile de închidere.</p>
      </div>
      <div className="wall-workbench">
        <div className="wall-visual-column">
          <div className={`wall-viewport ${failed ? 'wall-failed' : ''}`}>
            <div className="wall-canvas" ref={host} />
            {!ready && <div className="wall-fallback" aria-hidden="true"><div className="wall-fallback-model">{wallMaterials.slice(0, 6).map((layer, i) => <i key={layer.id} style={{ backgroundColor: layer.color, transform: `translate(${i * 20}px, ${i * -9}px)` }} />)}</div><span>{failed ? 'Explorează materialele din listă' : 'Se pregătește secțiunea 3D'}</span></div>}
            <div className="wall-viewport-heading"><span><i /> SECȚIUNE 3D</span><span>MACHETĂ ILUSTRATIVĂ</span></div>
            <div className="wall-markers" aria-hidden={open < 55}>{wallMaterials.slice(0, 6).map((layer, i) => <button key={layer.id} ref={element => { markers.current[i] = element; }} style={{ display: 'none' }} onClick={() => selectOnModel(layer.id)} tabIndex={open >= 55 ? 0 : -1} aria-label={`Selectează ${layer.name}`} aria-pressed={selected === layer.id}>{layer.number}</button>)}</div>
            {failed && <button className="wall-retry" onClick={() => { setReady(false); setAttempt(n => n + 1); }}>Reîncearcă vizualizarea 3D ↻</button>}
            <div className="wall-view-tools" aria-label="Comenzi cameră perete"><button onClick={() => scene.current?.zoom(1.15)} disabled={!ready} aria-label="Apropie secțiunea">+</button><button onClick={() => scene.current?.zoom(.87)} disabled={!ready} aria-label="Îndepărtează secțiunea">−</button><button onClick={() => scene.current?.reset()} disabled={!ready} aria-label="Resetează perspectiva peretelui">⟲</button></div>
            <div className="wall-orientation"><span>FAȚA OPUSĂ</span><i /><span>SPRE INTERIOR</span></div>
            <span className="wall-drag-hint">↔ Trage pentru rotire · Click pe material</span>
          </div>
          <div className="wall-explode-controls">
            <button className="wall-explode-button" onClick={() => expand(open > 50 ? 0 : 100)} aria-pressed={open > 50}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="m3 7 9-4 9 4-9 4-9-4ZM3 12l9 4 9-4M3 17l9 4 9-4" /></svg>{open > 50 ? 'Asamblează peretele' : 'Desfă straturile'}<span>{open > 50 ? '↙' : '↗'}</span></button>
            <div className="wall-slider"><div><label htmlFor="wall-openness">Deschiderea straturilor</label><output htmlFor="wall-openness">{open}%</output></div><input id="wall-openness" type="range" min="0" max="100" step="1" value={open} onChange={event => expand(Number(event.target.value))} style={{ background: `linear-gradient(to right, #f9982d ${open}%, #ffffff20 ${open}%)` }} aria-valuetext={`${open}% desfăcut`} /><div><span>Asamblat</span><span>Desfăcut</span></div></div>
          </div>
        </div>
        <aside className="wall-material-panel" aria-label="Materialele peretelui">
          <div className="wall-material-list-heading"><span>STRAT CU STRAT</span><span>01 — 06</span></div>
          <div className="wall-material-list">{wallMaterials.map(layer => <button key={layer.id} onClick={() => select(layer.id)} aria-pressed={selected === layer.id} aria-controls="wall-material-detail"><span className="wall-layer-number">{layer.number}</span><i style={{ backgroundColor: layer.color }} /><span>{layer.shortName}</span><span className="wall-layer-arrow" aria-hidden="true">↗</span></button>)}</div>
          <div className="wall-material-detail" id="wall-material-detail" aria-live="polite" aria-atomic="true">
            <span className="wall-material-category"><i style={{ backgroundColor: material.color }} />{material.category}</span>
            <h3>{material.name}</h3><p>{material.description}</p>
            <ul>{material.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
            <div className="wall-material-note"><span>{material.confirmation}</span><p>{material.note}</p></div>
          </div>
        </aside>
      </div>
      <div className="wall-section-footer"><p>{wallIllustrationNote}</p><a href="/oferta">Discută alcătuirea casei tale <span>↗</span></a></div>
      {mobileDetail && <div className="wall-mobile-detail" role="dialog" aria-modal="false" aria-labelledby="wall-mobile-material-title"><div><span className="wall-material-category">{material.category}</span><button ref={mobileClose} onClick={() => setMobileDetail(false)} aria-label="Închide detaliile materialului">×</button></div><h3 id="wall-mobile-material-title">{material.name}</h3><p>{material.description}</p><p className="wall-mobile-note">{material.note}</p><a href="#wall-material-detail" onClick={() => setMobileDetail(false)}>Toate detaliile materialului <span>↓</span></a></div>}
    </div>
  </section>;
}
