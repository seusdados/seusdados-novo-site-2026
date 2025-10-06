import React, { useEffect } from 'react';

const DpoAnimation: React.FC = () => {
  useEffect(() => {
    // Inicializar a animação após o componente ser montado
    const timer = setTimeout(() => {
      initializeAnimation();
    }, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  const initializeAnimation = () => {
    // CSS variables function
    function varCss(name: string) {
      return getComputedStyle(document.querySelector('.csc-animation') || document.documentElement)
        .getPropertyValue(name)
        .trim();
    }

    const steps = [
      { id: 1,  label: "ENTRADA",  icon: "#i-entrada", color: "#3B82F6",
        area: "Canal: meudpo",
        desc: "Usuário abre chamado via plataforma meudpo." },
      { id: 2,  label: "RECEPÇÃO", icon: "#i-recepcao", color: "#0EA5E9",
        area: "Recepção Seusdados",
        desc: "Seusdados recepciona, classifica e prioriza." },
      { id: 3,  label: "ANÁLISE 1", icon: "#i-juridico", color: "#22C55E",
        area: "Consultor Jurídico",
        desc: "Análise legal, base legal e parecer objetivo." },
      { id: 4,  label: "ANÁLISE 2", icon: "#i-ti", color: "#8B5CF6",
        area: "Consultor de TI",
        desc: "Avaliação técnica, integrações e requisitos." },
      { id: 5,  label: "ANÁLISE 3", icon: "#i-seg", color: "#F43F5E",
        area: "Segurança da Informação",
        desc: "Risco, controles e recomendações de SI." },
      { id: 6,  label: "ANÁLISE 4", icon: "#i-proc", color: "#F59E0B",
        area: "Gestão de Processos",
        desc: "Padronização, fluxo e orientações operacionais." },
      { id: 7,  label: "ENTREGA",  icon: "#i-entrega", color: "#10B981",
        area: "Cliente",
        desc: "Orientação estruturada retorna ao cliente, com prazos (SLA)." }
    ];

    const svg = document.querySelector(".csc-animation svg[viewBox]") as SVGElement;
    if (!svg) return;
    
    const track = document.getElementById("csc-track") as unknown as SVGCircleElement;
    const nodesGroup = document.getElementById("csc-nodes");
    const orb = document.getElementById("csc-orb");

    const uiStep = document.getElementById("csc-ui-step");
    const uiDesc = document.getElementById("csc-ui-desc");
    const uiArea = document.getElementById("csc-ui-area");
    const kChamados = document.getElementById("csc-kpi-chamados");
    const kSla = document.getElementById("csc-kpi-sla");
    const kNps = document.getElementById("csc-kpi-nps");

    if (!track || !nodesGroup || !orb || !uiStep || !uiDesc || !uiArea || !kChamados || !kSla || !kNps) {
      return;
    }

    const cx = 280, cy = 280, r = 210;
    const totalLen = track.getTotalLength();
    const startAngle = -90;

    // Create nodes
    steps.forEach((s, idx) => {
      const angle = ((startAngle + (360/steps.length)*idx) * Math.PI) / 180;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      const g = document.createElementNS("http://www.w3.org/2000/svg","g");
      g.setAttribute("class","csc-node");
      g.setAttribute("data-id", s.id.toString());
      g.setAttribute("transform", `translate(${x}, ${y})`);
      g.innerHTML = `
        <circle r="20" fill="${s.color}" />
        <circle class="csc-halo" r="28" stroke="${s.color}" />
        <g class="csc-icon" fill="#fff" stroke="none" width="24" height="24">
          <use href="${s.icon}" width="24" height="24"></use>
        </g>
        <text class="csc-label" y="42">${s.label}</text>
      `;
      g.addEventListener("click", () => { setActive(idx); progress = nodeLens[idx]; });
      nodesGroup.appendChild(g);
    });

    // Animation variables
    let progress = 0;
    let speed = 85; // px per sec
    let running = true;
    let last = performance.now();
    let currentIdx = -1;
    const nodeLens = steps.map((_, i) => (totalLen / steps.length) * i);

    function frame(now: number) {
      if (!running) return;
      const dt = (now - last) / 1000;
      last = now;
      progress = (progress + speed * dt) % totalLen;
      const pt = track.getPointAtLength(progress);
      orb.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);

      let idx = 0, minDist = Infinity;
      for (let i=0; i<nodeLens.length; i++) {
        const d = Math.min(
          Math.abs(progress - nodeLens[i]),
          totalLen - Math.abs(progress - nodeLens[i])
        );
        if (d < minDist) { minDist = d; idx = i; }
      }
      if (idx !== currentIdx) {
        currentIdx = idx;
        setActive(currentIdx);
        bumpKPIs(currentIdx);
      }
      requestAnimationFrame(frame);
    }

    function setActive(i: number) {
      document.querySelectorAll(".csc-node").forEach(n => n.classList.remove("active"));
      const node = document.querySelector(`.csc-node[data-id="${steps[i].id}"]`);
      if (node) node.classList.add("active");
      const s = steps[i];
      if (uiStep) uiStep.textContent = `${s.id}. ${s.label}`;
      if (uiDesc) uiDesc.textContent = s.desc;
      if (uiArea) uiArea.textContent = s.area;
      const orbCircle = orb.querySelector("circle");
      if (orbCircle) orbCircle.setAttribute("fill", s.color);
    }

    // KPI updates (demo)
    const base = { chamados: 128, sla: 98, nps: 78 };
    function bumpKPIs(idx: number){
      // small deterministic adjustments by step
      const delta = [2,1,0,1,0,-1,3][idx];
      animateNumber(kChamados, base.chamados + delta);
      animateNumber(kNps, base.nps + (idx%2===0?1:-1));
      if (kSla) kSla.textContent = (base.sla - (idx===5?1:0)) + "%";
    }
    
    function animateNumber(el: HTMLElement, target: number) {
      const current = parseInt(el.textContent || '0', 10) || 0;
      const diff = target - current;
      const steps = 10;
      let c = 0;
      const iv = setInterval(()=>{
        c++;
        el.textContent = Math.round(current + diff * (c/steps)).toString();
        if (c>=steps) clearInterval(iv);
      }, 30);
    }

    // Controls
    const btnTheme = document.getElementById("csc-btn-theme");
    const btnPlay = document.getElementById("csc-btn-play");
    const btnSpeed = document.getElementById("csc-btn-speed");
    
    if (btnTheme) {
      btnTheme.addEventListener("click", () => {
        const container = document.querySelector(".csc-animation");
        if (container) {
          container.classList.toggle("light");
          const pressed = btnTheme.getAttribute("aria-pressed") === "true";
          btnTheme.setAttribute("aria-pressed", String(!pressed));
        }
      });
    }
    
    if (btnPlay) {
      btnPlay.addEventListener("click", () => {
        const pressed = btnPlay.getAttribute("aria-pressed") === "true";
        if (pressed) { 
          running = false; 
          btnPlay.textContent = "▶️ Reproduzir"; 
        } else { 
          running = true; 
          last = performance.now(); 
          requestAnimationFrame(frame); 
          btnPlay.textContent = "⏯️ Pausar"; 
        }
        btnPlay.setAttribute("aria-pressed", String(!pressed));
      });
    }
    
    if (btnSpeed) {
      btnSpeed.addEventListener("click", () => {
        speed = speed === 85 ? 130 : 85;
        btnSpeed.setAttribute("aria-pressed", String(speed===130));
      });
    }

    // Start animation
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      requestAnimationFrame(frame);
    } else {
      running = false;
      setActive(0);
      document.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") { currentIdx = (currentIdx+1+steps.length)%steps.length; setActive(currentIdx); }
        if (e.key === "ArrowLeft")  { currentIdx = (currentIdx-1+steps.length)%steps.length; setActive(currentIdx); }
      });
    }
  };
  
  return (
    <section className="csc-animation py-16">
      <style>
        {`
          .csc-animation {
            --c-entrada: #3B82F6;
            --c-recepcao: #0EA5E9;
            --c-juridico: #22C55E;
            --c-ti: #8B5CF6;
            --c-seg: #F43F5E;
            --c-proc: #F59E0B;
            --c-entrega: #10B981;
            --c-track: #D1D5DB;
            --c-bg: #0b1020;
            --c-card: rgba(255,255,255,0.04);
            --c-border: rgba(255,255,255,0.10);
            --c-text: #F8FAFC;
            --shadow: 0 10px 30px rgba(0,0,0,.25);
          }
          .csc-animation.light {
            --c-track: #E5E7EB;
            --c-bg: #f7f9fc;
            --c-card: #ffffff;
            --c-border: #e5e7eb;
            --c-text: #0f172a;
          }
          .csc-wrap {
            padding: 32px 16px 48px;
            background: radial-gradient(1200px 800px at 70% 30%, #101935 0%, var(--c-bg) 60%, #0a0f1d 100%);
            border-radius: 16px;
            color: var(--c-text);
          }
          .csc-animation.light .csc-wrap {
            background: radial-gradient(1200px 800px at 70% 30%, #e8f4f8 0%, var(--c-bg) 60%, #f0f9ff 100%);
          }
          .csc-hero {
            width: 100%;
            max-width: 1040px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            margin: 0 auto 10px;
          }
          .csc-hero h2 {
            font-size: clamp(22px, 2.2vw, 30px);
            margin: 0;
            letter-spacing: .2px;
          }
          .csc-controls {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          .csc-btn {
            appearance: none;
            border: 1px solid var(--c-border);
            background: var(--c-card);
            color: var(--c-text);
            padding: 8px 12px;
            border-radius: 10px;
            font-size: 14px;
            cursor: pointer;
          }
          .csc-btn[aria-pressed="true"] { outline: 2px solid var(--c-entrada); }
          .csc-btn:hover { filter: brightness(1.06); }
          .csc-container {
            display: grid;
            grid-template-columns: 560px 400px;
            gap: 24px;
            align-items: center;
            max-width: 1040px;
            width: 100%;
            margin: 0 auto;
          }
          @media (max-width: 1060px) {
            .csc-container { grid-template-columns: 1fr; }
            .csc-viz { margin: 0 auto; }
          }
          .csc-panel {
            background: var(--c-card);
            border: 1px solid var(--c-border);
            border-radius: 16px;
            padding: 18px 20px;
            box-shadow: var(--shadow);
          }
          .csc-panel h3 { margin: 0 0 8px; font-size: 18px; opacity: .9; }
          .csc-panel .csc-step { font-size: 26px; margin: 4px 0; line-height: 1.25; }
          .csc-panel .csc-desc { margin: 10px 0 14px; opacity: .9; }
          .csc-meta { display: flex; gap: 10px; flex-wrap: wrap; }
          .csc-badge {
            font-size: 12px; letter-spacing: .3px; text-transform: uppercase;
            padding: 6px 10px; border-radius: 999px; border: 1px solid var(--c-border);
            background: var(--c-card);
          }
          .csc-kpis { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-top: 14px; }
          .csc-kpi {
            border: 1px solid var(--c-border); border-radius: 12px; padding: 10px 12px; background: var(--c-card);
          }
          .csc-kpi-label { font-size: 12px; opacity: .85; }
          .csc-kpi-value { font-size: 22px; font-weight: 700; margin-top: 2px; }
          .csc-legend { margin-top: 12px; font-size: 13px; opacity: .8; }
          .csc-viz { position: relative; width: 560px; height: 560px; }
          .csc-viz svg { width: 560px; height: 560px; display: block; }
          .csc-track { stroke: var(--c-track); stroke-width: 3; fill: none; opacity: .75; }
          .csc-center {
            fill: none; stroke: rgba(255,255,255,0.12); stroke-width: 2;
            filter: drop-shadow(0 0 18px rgba(255,255,255,0.06));
          }
          .csc-animation.light .csc-center {
            stroke: rgba(0,0,0,0.12);
            filter: drop-shadow(0 0 18px rgba(0,0,0,0.06));
          }
          .csc-meudpo-circle { fill: rgba(255,255,255,0.06); stroke: rgba(255,255,255,0.16); }
          .csc-animation.light .csc-meudpo-circle { fill: rgba(0,0,0,0.06); stroke: rgba(0,0,0,0.16); }
          .csc-meudpo-text { font-size: 14px; fill: #E2E8F0; text-anchor: middle; }
          .csc-animation.light .csc-meudpo-text { fill: #0f172a; }
          .csc-node { filter: drop-shadow(0 6px 12px rgba(0,0,0,.25)); }
          .csc-node circle { stroke: rgba(255,255,255,.15); stroke-width: 2; }
          .csc-animation.light .csc-node circle { stroke: rgba(0,0,0,.15); }
          .csc-node.active circle { transform: scale(1.08); transform-box: fill-box; transform-origin: center; }
          .csc-node .csc-label { font-size: 12px; fill: #E5E7EB; text-anchor: middle; }
          .csc-animation.light .csc-node .csc-label { fill: #374151; }
          .csc-node .csc-icon { transform: translate(-12px,-12px); opacity: .95; }
          .csc-node.active .csc-label { font-weight: 600; }
          .csc-halo { fill: none; stroke-width: 10; stroke: transparent; opacity: 0; transition: opacity .35s ease; }
          .csc-node.active .csc-halo { opacity: .60; }
          .csc-orb { filter: drop-shadow(0 0 10px rgba(255,255,255,.35)); }
          .csc-orb circle { stroke: rgba(255,255,255,0.7); stroke-width: 2; }
          @media (prefers-reduced-motion: reduce) {
            [data-anim="moving"] { animation: none !important; transition: none !important; }
          }
        `}
      </style>
      
      <div className="csc-wrap">
        <header className="csc-hero">
          <h2>Fluxo CSC em Movimento — <strong>meudpo</strong></h2>
          <div className="csc-controls">
            <button id="csc-btn-theme" className="csc-btn" aria-pressed="false" title="Alternar tema claro/escuro">🌗 Tema</button>
            <button id="csc-btn-play" className="csc-btn" aria-pressed="true" title="Pausar/retomar animação">⏯️ Pausar</button>
            <button id="csc-btn-speed" className="csc-btn" aria-pressed="false" title="Alternar velocidade">⚡ Velocidade</button>
          </div>
        </header>

        <div className="csc-container" role="region" aria-label="Fluxo do Centro de Serviços Compartilhados da Seusdados">
          <div className="csc-viz" aria-hidden="false">
            {/* SVG symbols (inline sprite) */}
            <svg width="0" height="0" style={{position: 'absolute', left: '-9999px', visibility: 'hidden'}} aria-hidden="true">
              <symbol id="i-entrada" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" ry="2" fill="currentColor" opacity="0.15" />
                <path d="M4 7l8 5 8-5" fill="none" stroke="currentColor" strokeWidth="2" />
              </symbol>
              <symbol id="i-recepcao" viewBox="0 0 24 24">
                <path d="M3 7h18v6l-3 4H6l-3-4z" fill="currentColor" opacity="0.15" />
                <path d="M7 11h10" stroke="currentColor" strokeWidth="2" />
              </symbol>
              <symbol id="i-juridico" viewBox="0 0 24 24">
                <path d="M12 5v4M6 9h12" stroke="currentColor" strokeWidth="2" />
                <path d="M6 9l-3 5h6l-3-5zm12 0l-3 5h6l-3-5z" fill="currentColor" opacity="0.2" />
                <path d="M10 19h4" stroke="currentColor" strokeWidth="2" />
              </symbol>
              <symbol id="i-ti" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="12" rx="2" ry="2" fill="currentColor" opacity="0.15" />
                <rect x="8" y="17" width="8" height="2" rx="1" ry="1" fill="currentColor" />
              </symbol>
              <symbol id="i-seg" viewBox="0 0 24 24">
                <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" fill="currentColor" opacity="0.2" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
              </symbol>
              <symbol id="i-proc" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M16.7 7.3l2.1-2.1M5.2 18.8l2.1-2.1" stroke="currentColor" strokeWidth="2" />
              </symbol>
              <symbol id="i-entrega" viewBox="0 0 24 24">
                <path d="M3 12l18-7-8 9-1 7-3-6-6-3z" fill="currentColor" opacity="0.2" />
              </symbol>
            </svg>

            <svg viewBox="0 0 560 560" role="img" aria-label="Fluxo CSC em anel com sete etapas ao redor do meudpo">
              {/* Orbit track */}
              <circle id="csc-track" className="csc-track" cx="280" cy="280" r="210" />

              {/* Center / meudpo */}
              <circle className="csc-meudpo-circle" cx="280" cy="280" r="92" />
              <circle className="csc-center" cx="280" cy="280" r="102" />
              <text className="csc-meudpo-text" x="280" y="276">plataforma</text>
              <text className="csc-meudpo-text" x="280" y="298" style={{fontWeight: '700'}}>meudpo</text>

              {/* Nodes */}
              <g id="csc-nodes"></g>

              {/* Moving orb */}
              <g id="csc-orb" className="csc-orb" data-anim="moving">
                <circle cx="0" cy="0" r="10" fill="#fff" />
              </g>
            </svg>
          </div>

          <aside className="csc-panel" aria-live="polite">
            <h3>Fluxo do Centro de Serviços Compartilhados</h3>
            <div className="csc-step" id="csc-ui-step">1. ENTRADA — Usuário abre chamado</div>
            <div className="csc-desc" id="csc-ui-desc">Chamado criado no meudpo e encaminhado para recepção.</div>
            <div className="csc-meta">
              <span className="csc-badge" id="csc-ui-area">Canal: meudpo</span>
              <span className="csc-badge" id="csc-ui-sla">SLA: conforme contrato</span>
              <span className="csc-badge" id="csc-ui-status">Status: Em andamento</span>
            </div>
            <div className="csc-kpis" aria-label="Indicadores">
              <div className="csc-kpi"><div className="csc-kpi-label">Chamados no mês</div><div className="csc-kpi-value" id="csc-kpi-chamados">128</div></div>
              <div className="csc-kpi"><div className="csc-kpi-label">% no prazo</div><div className="csc-kpi-value" id="csc-kpi-sla">98%</div></div>
              <div className="csc-kpi"><div className="csc-kpi-label">NPS</div><div className="csc-kpi-value" id="csc-kpi-nps">78</div></div>
            </div>
            <div className="csc-legend">Cada nó representa uma etapa: Recepção → análises (Jurídico, TI, Segurança, Processos) → Entrega. Loop contínuo.</div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DpoAnimation;