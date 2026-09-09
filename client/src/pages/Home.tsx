import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Clapperboard,
  Clock3,
  Cloud,
  Film,
  Gauge,
  Layers3,
  Library,
  Menu,
  Mic2,
  MoreHorizontal,
  Play,
  Plus,
  Radio,
  RotateCcw,
  Search,
  Settings2,
  Sparkles,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

const imageBase = "/manus-storage/";

const modes = [
  {
    id: "topic",
    label: "Topic to video",
    eyebrow: "MODE A",
    description: "Give FrameForge the idea. It writes, plans, sources, and assembles.",
    icon: Sparkles,
  },
  {
    id: "script",
    label: "Script to video",
    eyebrow: "MODE B",
    description: "Keep your exact words. FrameForge infers scenes and visual direction.",
    icon: WandSparkles,
  },
  {
    id: "documentary",
    label: "Documentary mode",
    eyebrow: "MODE C",
    description: "Ground every fact in research and reach for real archival media first.",
    icon: BookOpen,
  },
];

const pipeline = [
  { label: "Route request", icon: Radio },
  { label: "Write the script", icon: Sparkles },
  { label: "Plan scenes", icon: Layers3 },
  { label: "Source real media", icon: Library },
  { label: "Voice + captions", icon: Mic2 },
  { label: "Assemble MP4", icon: Film },
];

const recentProjects = [
  { title: "The hidden life of coffee", meta: "Topic to video · 3:00", status: "Ready", color: "coral", image: `${imageBase}landscape-grain_eb9b5452.jpg` },
  { title: "A small history of radio", meta: "Documentary mode · 6:30", status: "Rendering", color: "blue", image: `${imageBase}editing-station_2917c963.jpg` },
  { title: "Notes from a night train", meta: "Script to video · 1:45", status: "Draft", color: "sand", image: `${imageBase}landscape-grain_eb9b5452.jpg` },
];

function BrandMark() {
  return (
    <div className="brand-mark" aria-label="FrameForge home">
      <div className="brand-mark-icon"><Clapperboard size={17} strokeWidth={2.5} /></div>
      <span>Frame<span>Forge</span></span>
    </div>
  );
}

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (item: string) => void }) {
  const items = [
    { label: "Create", icon: Plus },
    { label: "Projects", icon: Library },
    { label: "Pipeline", icon: Gauge },
  ];
  return (
    <aside className="sidebar">
      <BrandMark />
      <div className="sidebar-rule" />
      <p className="sidebar-label">Workspace</p>
      <nav className="side-nav" aria-label="Workspace navigation">
        {items.map(({ label, icon: Icon }) => (
          <button key={label} className={`side-nav-item ${active === label ? "active" : ""}`} onClick={() => onNavigate(label)}>
            <Icon size={17} strokeWidth={2} />
            <span>{label}</span>
            {label === "Projects" && <span className="nav-count">3</span>}
          </button>
        ))}
      </nav>
      <p className="sidebar-label later-label">Learn</p>
      <nav className="side-nav">
        <button className="side-nav-item" onClick={() => toast("Docs are coming soon") }><BookOpen size={17} /><span>Docs</span></button>
        <button className="side-nav-item" onClick={() => toast("Settings are coming soon") }><Settings2 size={17} /><span>Settings</span></button>
      </nav>
      <div className="sidebar-bottom">
        <div className="compute-card">
          <div className="compute-head"><span className="status-dot" /> Free compute</div>
          <p>GPU jobs are off by default. Stock + motion keeps you moving.</p>
          <div className="compute-meter"><span style={{ width: "72%" }} /></div>
          <div className="compute-foot"><span>7.2 / 10 hrs</span><span>this week</span></div>
        </div>
        <button className="profile-row" onClick={() => toast("Account menu coming soon")}>
          <span className="avatar">AM</span><span className="profile-copy"><strong>Alex Morgan</strong><small>Free workspace</small></span><MoreHorizontal size={17} />
        </button>
      </div>
    </aside>
  );
}

function Header({ active, onMenu }: { active: string; onMenu: () => void }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={19} /></button>
      <div className="crumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>{active}</strong></div>
      <div className="topbar-actions">
        <div className="status-pill"><span className="status-dot" /> All systems normal</div>
        <button className="icon-button" onClick={() => toast("Search is coming soon")} aria-label="Search"><Search size={17} /></button>
        <button className="help-button" onClick={() => toast("You’re on the free plan — no credit card needed.")}><span>?</span> Help</button>
      </div>
    </header>
  );
}

function ModeCard({ mode, selected, onClick }: { mode: typeof modes[number]; selected: boolean; onClick: () => void }) {
  const Icon = mode.icon;
  return (
    <button className={`mode-card ${selected ? "selected" : ""}`} onClick={onClick}>
      <div className="mode-card-top"><span className="mode-eyebrow">{mode.eyebrow}</span><span className={`mode-radio ${selected ? "checked" : ""}`}>{selected && <Check size={11} strokeWidth={3} />}</span></div>
      <div className="mode-icon"><Icon size={18} /></div>
      <strong>{mode.label}</strong>
      <p>{mode.description}</p>
    </button>
  );
}

function PipelineCard({ rendering }: { rendering: boolean }) {
  const activeIndex = rendering ? 2 : 0;
  return (
    <section className="pipeline-card panel-card">
      <div className="panel-header">
        <div><span className="section-kicker">LIVE PIPELINE</span><h2>{rendering ? "Your film is taking shape" : "A small team of agents"}</h2></div>
        <span className={`live-tag ${rendering ? "rendering" : ""}`}><span className="live-dot" />{rendering ? "Rendering" : "Ready"}</span>
      </div>
      <div className="pipeline-visual">
        <div className="pipeline-line"><span className={rendering ? "line-progress" : ""} /></div>
        {pipeline.map(({ label, icon: Icon }, index) => (
          <div key={label} className={`pipeline-step ${index < activeIndex || (rendering && index === activeIndex) ? "done" : ""} ${index === activeIndex ? "current" : ""}`}>
            <div className="pipeline-icon">{index < activeIndex ? <Check size={14} strokeWidth={3} /> : <Icon size={15} />}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="pipeline-note"><Zap size={14} /><span><strong>Phase 1 default:</strong> stock media + Ken Burns motion. No GPU required.</span><ArrowUpRight size={14} /></div>
    </section>
  );
}

function RecentProjects({ onOpen }: { onOpen: (title: string) => void }) {
  return (
    <section className="recent-section">
      <div className="section-heading"><div><span className="section-kicker">YOUR WORK</span><h2>Recent projects</h2></div><button className="text-button" onClick={() => toast("Project archive coming soon")}>View archive <ArrowUpRight size={14} /></button></div>
      <div className="recent-grid">
        {recentProjects.map((project) => (
          <button className="project-card" key={project.title} onClick={() => onOpen(project.title)}>
            <div className={`project-thumb ${project.color}`} style={{ backgroundImage: `linear-gradient(135deg, rgba(14,16,18,.08), rgba(14,16,18,.65)), url(${project.image})` }}>
              <span className={`project-status ${project.status.toLowerCase()}`}><span />{project.status}</span>
              <span className="thumb-play"><Play size={14} fill="currentColor" /></span>
            </div>
            <div className="project-copy"><strong>{project.title}</strong><span>{project.meta}</span></div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Create");
  const [mode, setMode] = useState("topic");
  const [prompt, setPrompt] = useState("The hidden life of coffee — from seed to daily ritual");
  const [duration, setDuration] = useState(3);
  const [heavyMode, setHeavyMode] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedMode = useMemo(() => modes.find((item) => item.id === mode) ?? modes[0], [mode]);

  const handleCreate = () => {
    if (!prompt.trim()) {
      toast.error("Add a topic or script to get started");
      return;
    }
    setRendering(true);
    toast.success("Pipeline started — your first scenes are being planned");
  };

  const handleNav = (item: string) => {
    setActiveNav(item);
    setMobileOpen(false);
    if (item !== "Create") toast(`${item} view is ready for your next build`);
  };

  return (
    <div className="app-shell">
      <div className={`mobile-overlay ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)} />
      <div className={`sidebar-wrap ${mobileOpen ? "open" : ""}`}><Sidebar active={activeNav} onNavigate={handleNav} /></div>
      <div className="main-shell">
        <Header active={activeNav} onMenu={() => setMobileOpen(true)} />
        <main className="main-content">
          <div className="welcome-row">
            <div><div className="eyebrow-row"><span className="eyebrow-dot" /> BUILD 0.1 · PHASE 1</div><h1>Turn an idea into a <em>finished film.</em></h1><p className="welcome-sub">A zero-cost, multi-agent video studio for the curious and resourceful.</p></div>
            <div className="hero-meta"><div className="hero-meta-icon"><Cloud size={18} /></div><span><strong>Free-tier first</strong><small>No paid API calls by default</small></span></div>
          </div>

          <div className="workspace-grid">
            <section className="create-card panel-card">
              <div className="panel-header create-header"><div><span className="section-kicker">NEW PROJECT</span><h2>What are we making?</h2></div><button className="quiet-button" onClick={() => { setPrompt(""); toast("Input cleared"); }}><RotateCcw size={14} /> Reset</button></div>
              <div className="mode-grid">{modes.map((item) => <ModeCard key={item.id} mode={item} selected={mode === item.id} onClick={() => setMode(item.id)} />)}</div>
              <div className="input-label-row"><label htmlFor="brief">{mode === "script" ? "Your script" : mode === "documentary" ? "Documentary topic" : "Your topic"}</label><span>{mode === "script" ? "Exact words preserved" : "Be specific or stay loose"}</span></div>
              <textarea id="brief" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder={mode === "script" ? "Paste your narration here..." : "What should your film be about?"} rows={3} />
              <div className="controls-row">
                <div className="duration-control"><div className="input-label-row"><label htmlFor="duration">Target length</label><strong>{duration}:00</strong></div><input id="duration" type="range" min="1" max="12" value={duration} onChange={(event) => setDuration(Number(event.target.value))} /><div className="range-labels"><span>1 min</span><span>12 min</span></div></div>
                <div className="output-control"><label>Output</label><button className="select-button" onClick={() => toast("16:9 is the default output")}>16:9 landscape <ChevronDown size={15} /></button></div>
              </div>
              <div className="advanced-row"><div><button className={`toggle ${heavyMode ? "on" : ""}`} onClick={() => setHeavyMode(!heavyMode)} aria-pressed={heavyMode}><span /></button><span><strong>Use hero video scenes</strong><small>{heavyMode ? "Slower + GPU-heavy, used sparingly" : "Off · stock + motion keeps it free"}</small></span></div><span className="advanced-badge">{heavyMode ? "HEAVY" : "RECOMMENDED"}</span></div>
              <button className="create-button" onClick={handleCreate}><span>{rendering ? "Pipeline running" : "Start building"}</span>{rendering ? <span className="button-loader"><span /><span /><span /></span> : <ArrowUpRight size={17} />}</button>
              <p className="fine-print"><Zap size={12} /> {selectedMode.label} · estimated first draft in a few minutes on free-tier infrastructure</p>
            </section>
            <PipelineCard rendering={rendering} />
          </div>

          <div className="lower-grid">
            <section className="principles-card panel-card"><div className="principles-art"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><span>FF</span></div><div className="principles-copy"><span className="section-kicker">THE FRAMEFORGE WAY</span><h2>Use real media first.<br /><em>Generate only when needed.</em></h2><p>Long-form video doesn’t need a GPU for every second. We reach for free stock and archival footage, then add motion, voice, captions, and music in code.</p><button className="text-button" onClick={() => toast("The principles guide is coming soon")}>Read the build principles <ArrowUpRight size={14} /></button></div></section>
            <section className="stat-card panel-card"><div className="stat-top"><span className="section-kicker">PIPELINE HEALTH</span><span className="stat-live"><span /> live</span></div><div className="stat-number">98<span>%</span></div><p>of the Phase 1 pipeline runs without a GPU.</p><div className="stat-bars"><span style={{ height: "58%" }} /><span style={{ height: "75%" }} /><span style={{ height: "64%" }} /><span style={{ height: "88%" }} /><span style={{ height: "94%" }} /><span style={{ height: "80%" }} /><span style={{ height: "96%" }} /></div><div className="stat-foot"><span>Stock + Ken Burns</span><span>healthy</span></div></section>
          </div>
          <RecentProjects onOpen={(title) => toast(`${title} opened in preview`)} />
        </main>
        <footer className="app-footer"><span>FrameForge <span className="footer-dot">·</span> built for curious people</span><span>v0.1.0 <span className="footer-dot">·</span> <button onClick={() => toast("Status page coming soon")}>System status</button></span></footer>
      </div>
    </div>
  );
}
