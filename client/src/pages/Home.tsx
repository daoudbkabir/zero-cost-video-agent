import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleAlert,
  Clapperboard,
  Clock3,
  Cloud,
  FileCheck2,
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
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

const storage = "/manus-storage/";
const modes = [
  { id: "script", label: "Script to video", eyebrow: "MVP FOCUS", description: "Keep your exact words. OpenReel infers scenes and visual direction.", icon: WandSparkles },
  { id: "topic", label: "Topic to video", eyebrow: "PHASE 2", description: "Research, write, storyboard, and render from one idea.", icon: Sparkles },
  { id: "documentary", label: "Documentary mode", eyebrow: "PHASE 3", description: "Ground every claim in sources and use real media first.", icon: BookOpen },
];
const stages = [
  { label: "Research", sub: "Source facts", icon: Radio, phase: "Phase 2" },
  { label: "Script review", sub: "Edit before compute", icon: FileCheck2, phase: "Ready" },
  { label: "Storyboard", sub: "Shots + provenance", icon: Layers3, phase: "Ready" },
  { label: "Render shots", sub: "0 / 12 complete", icon: Film, phase: "Queued" },
  { label: "Voice + captions", sub: "Kokoro + Whisper", icon: Mic2, phase: "Queued" },
  { label: "Assembly + QA", sub: "FFmpeg export", icon: ShieldCheck, phase: "Queued" },
];
const shots = [
  { no: "01", title: "The first line", copy: "A close-up of handwritten notes sliding into frame; soft window light, tactile paper grain.", tag: "AI generated", image: `${storage}editing-station_2917c963.jpg` },
  { no: "02", title: "A world in motion", copy: "Wide shot of a late-night editor's desk; blue monitor glow and a slow camera push-in.", tag: "Real footage", image: `${storage}editing-station_2917c963.jpg` },
  { no: "03", title: "Keep the thread", copy: "Abstract ink lines connect three frames on a dark table. Gentle overhead pan.", tag: "AI generated", image: `${storage}landscape-grain_eb9b5452.jpg` },
];

function Brand() {
  return <div className="brand-mark"><div className="brand-mark-icon"><Clapperboard size={17} strokeWidth={2.5} /></div><span>Open<span>Reel</span></span></div>;
}
function Sidebar({ active, onNavigate }: { active: string; onNavigate: (item: string) => void }) {
  const items = [{ label: "Create", icon: Plus }, { label: "Projects", icon: Library }, { label: "Pipeline", icon: Gauge }];
  return <aside className="sidebar"><Brand /><div className="sidebar-rule" /><p className="sidebar-label">Workspace</p><nav className="side-nav">{items.map(({ label, icon: Icon }) => <button key={label} className={`side-nav-item ${active === label ? "active" : ""}`} onClick={() => onNavigate(label)}><Icon size={17} /><span>{label}</span>{label === "Projects" && <span className="nav-count">3</span>}</button>)}</nav><p className="sidebar-label later-label">Product</p><nav className="side-nav"><button className="side-nav-item" onClick={() => toast("Docs are coming soon")}><BookOpen size={17} /><span>Docs & roadmap</span></button><button className="side-nav-item" onClick={() => toast("Settings are coming soon")}><Settings2 size={17} /><span>Settings</span></button></nav><div className="sidebar-bottom"><div className="compute-card"><div className="compute-head"><span className="status-dot" /> Free compute</div><p>Short videos first. Shots checkpoint so failed renders never restart the whole job.</p><div className="compute-meter"><span style={{ width: "72%" }} /></div><div className="compute-foot"><span>7.2 / 10 hrs</span><span>this week</span></div></div><button className="profile-row" onClick={() => toast("Account menu coming soon")}><span className="avatar">AM</span><span className="profile-copy"><strong>Alex Morgan</strong><small>Free workspace</small></span><MoreHorizontal size={17} /></button></div></aside>;
}
function Header({ active, onMenu }: { active: string; onMenu: () => void }) {
  return <header className="topbar"><button className="mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={19} /></button><div className="crumb"><span>OpenReel</span><span className="crumb-slash">/</span><strong>{active}</strong></div><div className="topbar-actions"><div className="status-pill"><span className="status-dot" /> Pipeline healthy</div><button className="icon-button" onClick={() => toast("Search is coming soon")} aria-label="Search"><Search size={17} /></button><button className="help-button" onClick={() => toast("OpenReel is short-video-first: 30–120 seconds before long-form scaling.")}><span>?</span> Help</button></div></header>;
}
function ModeCard({ mode, selected, onClick }: { mode: typeof modes[number]; selected: boolean; onClick: () => void }) {
  const Icon = mode.icon;
  return <button className={`mode-card ${selected ? "selected" : ""}`} onClick={onClick}><div className="mode-card-top"><span className="mode-eyebrow">{mode.eyebrow}</span><span className={`mode-radio ${selected ? "checked" : ""}`}>{selected && <Check size={11} strokeWidth={3} />}</span></div><div className="mode-icon"><Icon size={18} /></div><strong>{mode.label}</strong><p>{mode.description}</p></button>;
}
function WorkflowRail({ activeStage }: { activeStage: number }) {
  return <section className="pipeline-card panel-card"><div className="panel-header"><div><span className="section-kicker">END-TO-END FLOW</span><h2>From words to a watchable cut</h2></div><span className="live-tag"><span className="live-dot" />{activeStage > 0 ? "In progress" : "Ready"}</span></div><div className="pipeline-visual"><div className="pipeline-line"><span style={{ height: `${Math.max(12, activeStage * 20)}%` }} /></div>{stages.map(({ label, sub, icon: Icon, phase }, index) => <div key={label} className={`pipeline-step ${index < activeStage ? "done" : ""} ${index === activeStage ? "current" : ""}`}><div className="pipeline-icon">{index < activeStage ? <Check size={14} strokeWidth={3} /> : <Icon size={15} />}</div><span><strong>{label}</strong><small>{sub}</small></span><em>{phase}</em></div>)}</div><div className="pipeline-note"><Zap size={14} /><span><strong>Honest by design:</strong> 5–15 second shots are chained, checkpointed, and assembled into the final cut.</span><ArrowUpRight size={14} /></div></section>;
}
function StoryboardPreview({ onOpen }: { onOpen: () => void }) {
  return <section className="storyboard-card panel-card"><div className="panel-header"><div><span className="section-kicker">STORYBOARD PREVIEW</span><h2>Review every shot before compute</h2></div><button className="quiet-button" onClick={onOpen}>Open storyboard <ArrowUpRight size={14} /></button></div><div className="shot-list">{shots.map((shot) => <button className="shot-row" key={shot.no} onClick={onOpen}><div className="shot-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(15,17,18,.15), rgba(15,17,18,.6)), url(${shot.image})` }}><span>{shot.no}</span><i><Play size={11} fill="currentColor" /></i></div><div className="shot-copy"><strong>{shot.title}</strong><p>{shot.copy}</p><span className={`shot-tag ${shot.tag === "Real footage" ? "real" : "ai"}`}>{shot.tag === "Real footage" ? <Check size={10} /> : <Sparkles size={10} />}{shot.tag}</span></div><ArrowUpRight className="shot-arrow" size={14} /></button>)}</div></section>;
}
function RecentProjects({ onOpen }: { onOpen: (title: string) => void }) {
  const projects = [{ title: "Notes from a night train", meta: "Script to video · 00:45", status: "Draft", image: `${storage}landscape-grain_eb9b5452.jpg` }, { title: "A small history of radio", meta: "Documentary mode · 06:30", status: "Rendering", image: `${storage}editing-station_2917c963.jpg` }];
  return <section className="recent-section"><div className="section-heading"><div><span className="section-kicker">YOUR WORK</span><h2>Recent projects</h2></div><button className="text-button" onClick={() => toast("Project archive coming soon")}>View archive <ArrowUpRight size={14} /></button></div><div className="recent-grid">{projects.map((project) => <button className="project-card" key={project.title} onClick={() => onOpen(project.title)}><div className="project-thumb" style={{ backgroundImage: `linear-gradient(135deg, rgba(14,16,18,.08), rgba(14,16,18,.65)), url(${project.image})` }}><span className="project-status"><span />{project.status}</span><span className="thumb-play"><Play size={14} fill="currentColor" /></span></div><div className="project-copy"><strong>{project.title}</strong><span>{project.meta}</span></div></button>)}</div></section>;
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Create");
  const [mode, setMode] = useState("script");
  const [prompt, setPrompt] = useState("Paste your narration here — OpenReel will keep your exact words and shape the visuals around them.");
  const [duration, setDuration] = useState(1);
  const [qualityBoost, setQualityBoost] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const selectedMode = useMemo(() => modes.find((item) => item.id === mode) ?? modes[0], [mode]);
  const startFlow = () => { if (!prompt.trim()) return toast.error("Add a script to continue"); setActiveStage(1); toast.success("Script parsed — review your scenes before rendering"); };
  const openStoryboard = () => { setReviewOpen(true); setActiveStage(2); };
  const navigate = (item: string) => { setActiveNav(item); setMobileOpen(false); if (item !== "Create") toast(`${item} view is ready for the next build`); };

  return <div className="app-shell"><div className={`mobile-overlay ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)} /><div className={`sidebar-wrap ${mobileOpen ? "open" : ""}`}><Sidebar active={activeNav} onNavigate={navigate} /></div><div className="main-shell"><Header active={activeNav} onMenu={() => setMobileOpen(true)} /><main className="main-content"><div className="welcome-row"><div><div className="eyebrow-row"><span className="eyebrow-dot" /> OPENREEL · BUILD 0.2</div><h1>From a rough script to a <em>real cut.</em></h1><p className="welcome-sub">An open, agentic video studio that lets you review the story before the render.</p></div><div className="hero-meta"><div className="hero-meta-icon"><Cloud size={18} /></div><span><strong>Free-tier first</strong><small>30–120 sec MVP output</small></span></div></div>
    <div className="workspace-grid"><section className="create-card panel-card"><div className="panel-header create-header"><div><span className="section-kicker">1 · NEW PROJECT</span><h2>Start with your story</h2></div><button className="quiet-button" onClick={() => { setPrompt(""); setActiveStage(0); toast("New project reset"); }}><X size={14} /> Clear</button></div><div className="mode-grid">{modes.map((item) => <ModeCard key={item.id} mode={item} selected={mode === item.id} onClick={() => setMode(item.id)} />)}</div><div className="input-label-row"><label htmlFor="brief">{mode === "script" ? "Your script" : mode === "documentary" ? "Documentary topic" : "Your topic"}</label><span>{mode === "script" ? "Narration stays yours" : "Coming in the next phase"}</span></div><textarea id="brief" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Paste your narration here..." rows={3} /><div className="controls-row"><div className="duration-control"><div className="input-label-row"><label htmlFor="duration">Target length</label><strong>{duration}:00</strong></div><input id="duration" type="range" min="1" max="3" value={duration} onChange={(event) => setDuration(Number(event.target.value))} /><div className="range-labels"><span>30 sec</span><span>3 min</span></div></div><div className="output-control"><label>Output</label><button className="select-button" onClick={() => toast("16:9 landscape is selected for this MVP")}>16:9 landscape <ChevronDown size={15} /></button></div></div><div className="advanced-row"><div><button className={`toggle ${qualityBoost ? "on" : ""}`} onClick={() => setQualityBoost(!qualityBoost)} aria-pressed={qualityBoost}><span /></button><span><strong>Quality boost</strong><small>{qualityBoost ? "Optional paid API tier · not required" : "Off · open models and free tools only"}</small></span></div><span className="advanced-badge">{qualityBoost ? "OPTIONAL" : "OPEN FIRST"}</span></div><button className="create-button" onClick={startFlow}><span>{activeStage > 0 ? "Continue to script review" : "Parse my script"}</span><ArrowUpRight size={17} /></button><p className="fine-print"><Zap size={12} /> {selectedMode.label} · your script is reviewed before any heavy render work</p></section><WorkflowRail activeStage={activeStage} /></div>
    <div className="lower-grid"><StoryboardPreview onOpen={openStoryboard} /><section className="principles-card panel-card compliance-card"><div className="principles-art"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><ShieldCheck size={34} /></div><div className="principles-copy"><span className="section-kicker">GUARDRAILS BUILT IN</span><h2>Provenance, continuity,<br /><em>and a clean export.</em></h2><p>Every shot carries its source type, license, and attribution status. Documentary mode will show citations on screen, and QA blocks export when a claim is missing one.</p><button className="text-button" onClick={() => toast("Compliance guide is coming soon")}>See the safety rules <ArrowUpRight size={14} /></button></div></section></div>
    <div className="roadmap-strip"><div><span className="section-kicker">MVP ROADMAP</span><strong>Short videos first. Long-form by chaining what works.</strong></div><div className="roadmap-pills"><span className="done-pill"><Check size={11} /> Phase 1 · Script → video</span><span><Clock3 size={11} /> Phase 2 · Topic research</span><span><BookOpen size={11} /> Phase 3 · Documentary citations</span></div></div>
    <RecentProjects onOpen={(title) => toast(`${title} opened in preview`)} />
    {reviewOpen && <div className="review-modal" role="dialog" aria-modal="true"><div className="review-backdrop" onClick={() => setReviewOpen(false)} /><div className="review-panel"><div className="review-head"><div><span className="section-kicker">2 · SCRIPT REVIEW</span><h2>Make the story yours before it renders.</h2></div><button className="icon-button" onClick={() => setReviewOpen(false)} aria-label="Close review"><X size={18} /></button></div><div className="review-status"><Check size={15} /> Parsed into 3 scenes · 00:45 estimated narration · no facts invented</div><textarea defaultValue={prompt} rows={10} /><div className="review-foot"><span><ShieldCheck size={14} /> Save compute by editing before storyboard generation.</span><button className="create-button" onClick={() => { setReviewOpen(false); setActiveStage(3); toast.success("Storyboard queued — 3 shots planned"); }}>Approve script <ArrowUpRight size={16} /></button></div></div></div>}
    </main><footer className="app-footer"><span>OpenReel <span className="footer-dot">·</span> open pipeline, honest constraints</span><span>v0.2 <span className="footer-dot">·</span> <button onClick={() => toast("Status page coming soon")}>System status</button></span></footer></div></div>;
}
