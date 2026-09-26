import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowLeft, ArrowRight, Bell, BriefcaseBusiness, CalendarDays,
  Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleAlert,
  ClipboardCheck, Download, Edit3, ExternalLink, FileText, Filter, Home,
  Inbox, LayoutDashboard, Mail, Menu, MoreHorizontal, Plus, RefreshCw,
  Search, Send, Settings, ShieldCheck, SlidersHorizontal, Sparkles, Trash2,
  Upload, UserPlus, Users, X, Zap
} from "lucide-react";
import "./styles.css";

const routes = {
  "/": "dashboard",
  "/jds": "jds",
  "/jd/1": "jd-detail",
  "/bench": "bench",
  "/skills": "skills",
  "/consent": "consent",
  "/submissions": "submissions",
  "/inbox": "inbox"
};

const initialJobs = [
  { id: "REQ-4482", title: "Senior Java Developer", company: "Zenith Technologies", location: "Charlotte, NC", mode: "Hybrid", source: "Email", posted: "14 min ago", quality: 82, shortlist: 6, state: "Ready to Submit", skills: ["Java", "Spring Boot", "Kafka", "AWS"], visa: "USC / GC", exp: "8+ yrs" },
  { id: "REQ-4479", title: "Data Engineer", company: "Apex Partners", location: "Remote", mode: "Remote", source: "Portal", posted: "41 min ago", quality: 91, shortlist: 4, state: "Consent In", skills: ["Snowflake", "dbt", "Python", "AWS"], visa: "USC / GC", exp: "6+ yrs" },
  { id: "REQ-4475", title: "ServiceNow Admin", company: "Nexus IT", location: "Austin, TX", mode: "Onsite", source: "Email", posted: "1 hr ago", quality: 74, shortlist: 3, state: "Consent Sent", skills: ["ServiceNow", "ITSM", "ITIL"], visa: "GC", exp: "5+ yrs" },
  { id: "REQ-4471", title: ".NET Core Developer", company: "Zenith Technologies", location: "Dallas, TX", mode: "Hybrid", source: "Email", posted: "3 hr ago", quality: 88, shortlist: 2, state: "Consent In", skills: [".NET", "C#", "Azure", "SQL"], visa: "USC / GC", exp: "7+ yrs" },
  { id: "REQ-4468", title: "Salesforce Admin", company: "Meridian Global", location: "Remote", mode: "Remote", source: "Portal", posted: "5 hr ago", quality: 69, shortlist: 0, state: "Held Below Floor", skills: ["Salesforce", "Apex", "Flows"], visa: "USC", exp: "5+ yrs" },
  { id: "REQ-4462", title: "QA Automation Engineer", company: "Apex Partners", location: "Tampa, FL", mode: "Hybrid", source: "Email", posted: "9 hr ago", quality: 93, shortlist: 5, state: "Consent In", skills: ["Selenium", "Cypress", "Java", "API"], visa: "GC / USC", exp: "5+ yrs" },
  { id: "REQ-4459", title: "Senior Data Scientist", company: "Helix Direct", location: "Boston, MA", mode: "Hybrid", source: "Email", posted: "19 hr ago", quality: 90, shortlist: 2, state: "Consent Sent", skills: ["Python", "ML", "SQL", "AWS"], visa: "USC / GC", exp: "7+ yrs" },
  { id: "REQ-4453", title: "React Developer", company: "Nexus IT", location: "Remote", mode: "Remote", source: "Portal", posted: "2 days ago", quality: 85, shortlist: 0, state: "No Match on Bench", skills: ["React", "TypeScript", "Next.js"], visa: "USC", exp: "4+ yrs" }
];

const initialConsultants = [
  { id: "C-1042", name: "Ramesh Kulkarni", location: "Charlotte, NC", years: 11, skills: ["Java", "Spring Boot", "AWS", "Kafka"], availability: "Now", visa: "GC", benchAge: 18, consent: "Ready to Submit", type: "Internal", rate: 78 },
  { id: "C-1038", name: "Sofia Mendes", location: "Remote", years: 9, skills: ["Java", "Kafka", "Kubernetes", "AWS"], availability: "22 Sep", visa: "USC", benchAge: 9, consent: "Ready to Submit", type: "Internal", rate: 82 },
  { id: "C-1031", name: "Ajay Verma", location: "Dallas, TX", years: 8, skills: ["Java", "Spring", "Oracle", "Kafka"], availability: "Now", visa: "GC", benchAge: 41, consent: "Awaiting Consent", type: "External", rate: 76 },
  { id: "C-1027", name: "Daniel Okonkwo", location: "Austin, TX", years: 7, skills: ["ServiceNow", "ITSM", "ITIL"], availability: "Now", visa: "H-1B", benchAge: 62, consent: "Interview Set", type: "External", rate: 71 },
  { id: "C-1022", name: "Meera Iyer", location: "Remote", years: 6, skills: ["Snowflake", "dbt", "Python", "SQL"], availability: "Now", visa: "USC", benchAge: 5, consent: "Ready to Submit", type: "Internal", rate: 72 },
  { id: "C-1019", name: "Nadia Haddad", location: "Tampa, FL", years: 8, skills: ["Selenium", "Cypress", "Java", "API"], availability: "15 Sep", visa: "GC", benchAge: 71, consent: "Ready to Submit", type: "External", rate: 68 },
  { id: "C-1014", name: "Vikram Rao", location: "Charlotte, NC", years: 10, skills: ["Java", "Spring Boot", "Kafka", "AWS"], availability: "Now", visa: "GC", benchAge: 12, consent: "Available", type: "Internal", rate: 80 },
  { id: "C-1008", name: "Priya Nair", location: "Raleigh, NC", years: 7, skills: ["Java", "Microservices", "AWS"], availability: "29 Sep", visa: "USC", benchAge: 24, consent: "Available", type: "Internal", rate: 79 },
  { id: "C-1003", name: "Arjun Das", location: "Remote", years: 6, skills: ["Java", "Spring", "PostgreSQL"], availability: "Now", visa: "USC", benchAge: 33, consent: "Awaiting Consent", type: "External", rate: 73 }
];

const initialSubmissions = [
  { id: "SUB-8821", consultant: "Ramesh Kulkarni", job: "Senior Java Developer", company: "Zenith Technologies", score: 94, status: "Submitted", submitted: "Today 06:40", vendor: "Zenith Prime" },
  { id: "SUB-8818", consultant: "Sofia Mendes", job: "Senior Java Developer", company: "Zenith Technologies", score: 89, status: "Under Review", submitted: "Today 07:12", vendor: "Zenith Prime" },
  { id: "SUB-8814", consultant: "Meera Iyer", job: "Data Engineer", company: "Apex Partners", score: 91, status: "Interview", submitted: "Today 05:58", vendor: "Apex Staffing" },
  { id: "SUB-8807", consultant: "Tobias Lang", job: ".NET Core Developer", company: "Zenith Technologies", score: 88, status: "Submitted", submitted: "Today 07:31", vendor: "Zenith Prime" },
  { id: "SUB-8799", consultant: "Nadia Haddad", job: "QA Automation Engineer", company: "Apex Partners", score: 93, status: "Rejected", submitted: "Yesterday 08:02", vendor: "Apex Staffing" }
];

const inboxSeed = [
  { id: 1, from: "Zenith Prime Vendor", subject: "REQ-4482 - Interview request", preview: "Please confirm availability for the technical round...", time: "9 min", unread: true, tag: "Interview" },
  { id: 2, from: "Apex Staffing", subject: "Data Engineer - Rate confirmation", preview: "Client has accepted the submitted rate. Please confirm...", time: "32 min", unread: true, tag: "Rate" },
  { id: 3, from: "Zenith Technologies", subject: "New Java requirement", preview: "Please find the attached requirement for an immediate joiner...", time: "1 hr", unread: false, tag: "JD" },
  { id: 4, from: "Consultant - Ramesh Kulkarni", subject: "RTR signed", preview: "Attached is the signed RTR for the Senior Java role.", time: "2 hr", unread: false, tag: "RTR" }
];

function getRoute() { return window.location.pathname in routes ? window.location.pathname : "/"; }

function App() {
  const [path, setPath] = useState(getRoute());
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState(null);
  const [jobs, setJobs] = useState(initialJobs);
  const [consultants, setConsultants] = useState(initialConsultants);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [inbox, setInbox] = useState(inboxSeed);
  const [modal, setModal] = useState(null);
  const [drawer, setDrawer] = useState(null);

  const navigate = (to) => {
    setPath(to);
    window.history.pushState({}, "", to);
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPop = () => setPath(getRoute());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const notify = (message, tone = "success") => {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 2800);
  };

  const addJob = (job) => {
    setJobs((prev) => [{ ...job, id: `REQ-${4480 + prev.length + 1}` }, ...prev]);
    setModal(null);
    notify("Job description added to the register");
    navigate("/jds");
  };

  const addConsultant = (person) => {
    setConsultants((prev) => [{ ...person, id: `C-${1050 + prev.length}` }, ...prev]);
    setModal(null);
    notify("Consultant added to bench inventory");
    navigate("/bench");
  };

  const sendConsent = (person) => {
    setConsultants((prev) => prev.map((c) => c.id === person.id ? { ...c, consent: "Consent Sent" } : c));
    notify(`Consent request sent to ${person.name}`);
  };

  const submitCandidate = (person, job = jobs[0]) => {
    setSubmissions((prev) => [{ id: `SUB-${8830 + prev.length}`, consultant: person.name, job: job.title, company: job.company, score: 91, status: "Submitted", submitted: "Just now", vendor: job.company } , ...prev]);
    setConsultants((prev) => prev.map((c) => c.id === person.id ? { ...c, consent: "Submitted" } : c));
    notify(`${person.name} submitted for ${job.title}`);
    setDrawer(null);
  };

  const markRead = (id) => {
    setInbox((prev) => prev.map((m) => m.id === id ? { ...m, unread: false } : m));
  };

  const page = routes[path];
  return <>
    <AppShell path={path} navigate={navigate} mobileNav={mobileNav} setMobileNav={setMobileNav} onAdd={() => setModal("add-jd")}>
      {page === "dashboard" && <Dashboard navigate={navigate} jobs={jobs} consultants={consultants} submissions={submissions} setDrawer={setDrawer} />}
      {page === "jds" && <JDRegister jobs={jobs} navigate={navigate} setModal={setModal} setDrawer={setDrawer} />}
      {page === "jd-detail" && <JDDetail jobs={jobs} consultants={consultants} navigate={navigate} setDrawer={setDrawer} notify={notify} />}
      {page === "bench" && <Bench consultants={consultants} setModal={setModal} setDrawer={setDrawer} navigate={navigate} sendConsent={sendConsent} />}
      {page === "skills" && <Skills consultants={consultants} navigate={navigate} />}
      {page === "consent" && <Consent consultants={consultants} sendConsent={sendConsent} setDrawer={setDrawer} navigate={navigate} />}
      {page === "submissions" && <Submissions submissions={submissions} setDrawer={setDrawer} navigate={navigate} />}
      {page === "inbox" && <InboxPage inbox={inbox} markRead={markRead} navigate={navigate} setModal={setModal} />}
    </AppShell>
    {modal === "add-jd" && <AddJDModal close={() => setModal(null)} save={addJob} />}
    {modal === "add-consultant" && <AddConsultantModal close={() => setModal(null)} save={addConsultant} />}
    {modal === "compose" && <ComposeModal close={() => setModal(null)} notify={notify} />}
    {drawer?.type === "consultant" && <ConsultantDrawer consultant={drawer.item} close={() => setDrawer(null)} submit={submitCandidate} sendConsent={sendConsent} />}
    {drawer?.type === "job" && <JobDrawer job={drawer.item} close={() => setDrawer(null)} navigate={navigate} />}
    {drawer?.type === "message" && <MessageDrawer message={drawer.item} close={() => setDrawer(null)} markRead={markRead} />}
    {toast && <div className={`toast ${toast.tone}`}><CheckCircle2 size={18}/>{toast.message}<button onClick={() => setToast(null)}><X size={14}/></button></div>}
  </>;
}

function AppShell({ path, navigate, mobileNav, setMobileNav, children, onAdd }) {
  const nav = [
    ["Dashboard", "/", LayoutDashboard, ""],
    ["JDs", "/jds", FileText, "19"],
    ["Bench", "/bench", Users, "47"],
    ["Skill Coverage", "/skills", Activity, ""],
    ["Consent", "/consent", ShieldCheck, "14"],
    ["Submissions", "/submissions", Send, "5"],
    ["Inbox", "/inbox", Inbox, "23"]
  ];
  return <div className="app">
    <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
      <div className="brand"><div className="brandMark">T</div><div><strong>TEKISHO</strong><span>Bench Sales</span></div></div>
      <button className="newJd" onClick={onAdd}><Plus size={17}/> New JD</button>
      <div className="navLabel">WORKSPACE</div>
      <nav>{nav.map(([label,to,Icon,count]) => <button key={to} className={path === to || (to === "/jds" && path === "/jd/1") ? "active" : ""} onClick={() => navigate(to)}><Icon size={18}/><span>{label}</span>{count && <em>{count}</em>}</button>)}</nav>
      <div className="sidebarBottom"><button onClick={() => navigate("/skills")}><Settings size={18}/> Preferences</button><div className="userMini"><div className="avatar">P</div><div><strong>Priya Sharma</strong><span>Recruiter</span></div><MoreHorizontal size={17}/></div></div>
    </aside>
    {mobileNav && <div className="scrim" onClick={() => setMobileNav(false)}/>} 
    <div className="mainArea">
      <header className="topbar"><button className="mobileMenu" onClick={() => setMobileNav(true)}><Menu size={20}/></button><div className="breadcrumbs">Bench Sales <ChevronRight size={14}/> <strong>{pageTitle(path)}</strong></div><div className="topActions"><label className="globalSearch"><Search size={17}/><input placeholder="Search jobs, candidates, vendors..."/><kbd>⌘ K</kbd></label><button className="iconBtn" onClick={() => navigate("/inbox")}><Bell size={19}/><i/></button><div className="topProfile"><div className="avatar">P</div><div><strong>Priya</strong><span>Recruiter</span></div><ChevronDown size={15}/></div></div></header>
      <main className="content">{children}</main>
    </div>
  </div>;
}

function pageTitle(path) { return ({ "/": "Dashboard", "/jds": "Job Descriptions", "/jd/1": "JD Details", "/bench": "Bench Inventory", "/skills": "Skill Coverage", "/consent": "Consent", "/submissions": "Submissions", "/inbox": "Inbox" })[path] || "Dashboard"; }

function PageHeader({ eyebrow, title, subtitle, actions }) { return <div className="pageHeader"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div><div className="pageActions">{actions}</div></div>; }

function Dashboard({ navigate, jobs, consultants, submissions, setDrawer }) {
  const ready = consultants.filter(c => c.consent === "Ready to Submit").slice(0, 4);
  return <div>
    <PageHeader eyebrow="TODAY • TUESDAY, 23 SEP 2026" title="Good morning, Priya" subtitle="Your bench-sales workspace is ready. Here is what needs attention today." actions={<><button className="secondary" onClick={() => navigate("/inbox")}><Inbox size={16}/> Open inbox</button><button className="primary" onClick={() => navigate("/jds")}><FileText size={16}/> Review JDs</button></>}/>
    <div className="metricGrid">{[
      ["JDs received", "7", "+3 vs yesterday", FileText, "/jds"],
      ["Shortlisted", "22", "6 ready to send", Users, "/bench"],
      ["Consent pending", "14", "5 need attention", ShieldCheck, "/consent"],
      ["Ready to submit", "5", "2 added today", Send, "/submissions"],
      ["Active submissions", "12", "3 interviews", BriefcaseBusiness, "/submissions"]
    ].map(([label,value,meta,Icon,to]) => <button className="metricCard" key={label} onClick={() => navigate(to)}><div className="metricIcon"><Icon size={19}/></div><div><span>{label}</span><strong>{value}</strong><small>{meta}</small></div><ArrowRight size={17}/></button>)}</div>
    <div className="dashboardGrid">
      <section className="card attention"><CardTitle icon={Zap} title="Needs your attention" subtitle="Actions that can move candidates forward today" action={<button className="textBtn" onClick={() => navigate("/consent")}>View all <ArrowRight size={14}/></button>}/>
        {[
          ["Consent requests", "5 candidates have been waiting for more than 6 hours", "Review consent", "/consent", ShieldCheck],
          ["No-match JDs", "3 open roles currently have no eligible bench candidates", "Review JDs", "/jds", CircleAlert],
          ["Submission queue", "5 candidates have consent and are ready for vendor submission", "Open queue", "/submissions", Send]
        ].map(([a,b,c,to,Icon]) => <div className="attentionRow" key={a}><div className="roundIcon"><Icon size={17}/></div><div><strong>{a}</strong><p>{b}</p></div><button onClick={() => navigate(to)}>{c}<ArrowRight size={14}/></button></div>)}
      </section>
      <section className="card pipeline"><CardTitle icon={Activity} title="Workflow pipeline" subtitle="Live frontend state"/><div className="pipelineBar">{[["Bench",47],["Matched",22],["Consent",14],["RTR",8],["Submitted",5]].map(([x,n],i)=><div key={x} style={{"--w": `${Math.max(18, n/47*100)}%`}}><span>{x}</span><strong>{n}</strong><i/></div>)}</div><div className="pipelineFoot"><span><i className="dot blue"/> Active</span><span><i className="dot light"/> Waiting</span><span>Updates instantly in this demo</span></div></section>
    </div>
    <div className="dashboardGrid lower">
      <section className="card"><CardTitle icon={Users} title="Ready to submit" subtitle="Consent is complete. Review before sending." action={<button className="textBtn" onClick={() => navigate("/submissions")}>Open submissions <ArrowRight size={14}/></button>}/><div className="miniList">{ready.map(c => <div className="miniRow" key={c.id}><div className="avatar soft">{initials(c.name)}</div><div><strong>{c.name}</strong><span>{c.skills.slice(0,3).join(" · ")}</span></div><span className="status ready">Ready</span><button className="smallBtn" onClick={() => setDrawer({type:"consultant",item:c})}>Review</button></div>)}</div></section>
      <section className="card"><CardTitle icon={FileText} title="Latest JDs" subtitle="Most recently received requirements" action={<button className="textBtn" onClick={() => navigate("/jds")}>All JDs <ArrowRight size={14}/></button>}/><div className="miniList">{jobs.slice(0,4).map(j => <div className="miniRow" key={j.id}><div className="fileIcon"><FileText size={16}/></div><div><strong>{j.title}</strong><span>{j.company} · {j.posted}</span></div><span className={`quality ${j.quality >= 85 ? "good" : "mid"}`}>{j.quality}%</span><button className="smallBtn" onClick={() => setDrawer({type:"job",item:j})}>View</button></div>)}</div></section>
    </div>
    <div className="quickStrip"><span><Sparkles size={16}/> AI matching is explainable</span><span>Skills 40%</span><span>Experience 25%</span><span>Domain 15%</span><span>Visa 10%</span><span>Location 10%</span><button onClick={() => navigate("/skills")}>View matching logic <ArrowRight size={14}/></button></div>
  </div>;
}

function JDRegister({ jobs, navigate, setModal, setDrawer }) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("All");
  const [source, setSource] = useState("All");
  const filtered = jobs.filter(j => (!query || `${j.title} ${j.company} ${j.location}`.toLowerCase().includes(query.toLowerCase())) && (state === "All" || j.state === state) && (source === "All" || j.source === source));
  return <div><PageHeader eyebrow="REQUIREMENTS" title="Job descriptions" subtitle={`${filtered.length} of ${jobs.length} active requirements in your workspace.`} actions={<><button className="secondary" onClick={() => exportCsv(filtered)}><Download size={16}/> Export</button><button className="primary" onClick={() => setModal("add-jd")}><Plus size={16}/> Add JD</button></>}/>
    <section className="card tableCard"><div className="toolbar"><label className="searchField"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title, company or location..."/></label><div className="filterGroup"><select value={state} onChange={e=>setState(e.target.value)}><option>All</option><option>Ready to Submit</option><option>Consent In</option><option>Consent Sent</option><option>Held Below Floor</option><option>No Match on Bench</option></select><select value={source} onChange={e=>setSource(e.target.value)}><option>All</option><option>Email</option><option>Portal</option></select><button className="filterBtn"><Filter size={16}/> Filters</button></div></div><div className="tableScroll"><table><thead><tr><th>Requirement</th><th>Company</th><th>Location</th><th>Quality</th><th>Bench match</th><th>Status</th><th>Received</th><th></th></tr></thead><tbody>{filtered.map(j => <tr key={j.id}><td><button className="tableLink" onClick={() => setDrawer({type:"job",item:j})}><strong>{j.title}</strong><span>{j.id} · {j.mode}</span></button></td><td>{j.company}</td><td>{j.location}</td><td><span className={`quality ${j.quality >= 85 ? "good" : "mid"}`}>{j.quality}%</span></td><td><strong>{j.shortlist}</strong> candidates</td><td><Status text={j.state}/></td><td>{j.posted}</td><td><button className="iconBtn compact" onClick={() => setDrawer({type:"job",item:j})}><MoreHorizontal size={17}/></button></td></tr>)}</tbody></table></div>{!filtered.length && <EmptyState text="No job descriptions match these filters."/>}<div className="tableFooter"><span>Showing {filtered.length} requirements</span><span className="pagination"><button><ChevronLeft size={15}/></button><b>1</b><button><ChevronRight size={15}/></button></span></div></section>
  </div>;
}

function JDDetail({ jobs, consultants, navigate, setDrawer, notify }) {
  const job = jobs[0];
  const matches = consultants.filter(c => c.skills.some(s => job.skills.includes(s))).slice(0,6);
  return <div><button className="backBtn" onClick={() => navigate("/jds")}><ArrowLeft size={16}/> Back to job descriptions</button><PageHeader eyebrow={`${job.id} • RECEIVED ${job.posted.toUpperCase()}`} title={job.title} subtitle={`${job.company} · ${job.location} · ${job.mode}`} actions={<><Status text={job.state}/><button className="secondary" onClick={() => notify("JD edit mode opened") }><Edit3 size={16}/> Edit</button><button className="primary" onClick={() => navigate("/bench")}><Users size={16}/> View matches</button></>}/>
    <div className="detailGrid"><section className="card"><CardTitle icon={FileText} title="Requirement summary" subtitle="Structured fields extracted from the JD"/><div className="fieldGrid">{[["Skills",job.skills.join(", ")],["Experience",job.exp],["Authorization",job.visa],["Work mode",job.mode],["Location",job.location],["Source",job.source],["JD quality",`${job.quality}%`],["Received",job.posted]].map(([a,b])=><div className="field" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div><div className="aiExplain"><Sparkles size={18}/><div><strong>Why this JD is actionable</strong><p>Required skills and hard filters are complete. The frontend demo applies the documented weighting: Skills 40%, Experience 25%, Domain 15%, Visa 10%, Location 10%.</p></div></div></section><section className="card"><CardTitle icon={SlidersHorizontal} title="Matching controls" subtitle="Rules used before candidates reach the shortlist"/><div className="ruleList">{[["Hard filters","Visa, location, work mode and availability"],["Internal threshold","80% minimum match"],["External threshold","90% minimum match"],["Consent gate","Required before submission"],["RTR gate","Required before vendor submission"]].map(([a,b])=><div className="rule" key={a}><CheckCircle2 size={17}/><div><strong>{a}</strong><span>{b}</span></div></div>)}</div><button className="wideBtn" onClick={() => navigate("/skills")}><Sparkles size={16}/> View matching logic</button></section></div>
    <section className="card"><CardTitle icon={Users} title="Shortlisted consultants" subtitle={`${matches.length} candidates currently qualify for this requirement`} action={<button className="textBtn" onClick={() => navigate("/bench")}>Open full bench <ArrowRight size={14}/></button>}/><div className="matchGrid">{matches.map((c,i)=><button className="matchCard" key={c.id} onClick={() => setDrawer({type:"consultant",item:c})}><div className="matchTop"><div className="avatar soft">{initials(c.name)}</div><strong>{c.name}</strong><span className="score">{Math.max(84,94-i*2)}%</span></div><span>{c.location} · {c.years} yrs · {c.visa}</span><div className="tagLine">{c.skills.slice(0,4).map(s=><em key={s}>{s}</em>)}</div><div className="matchFoot"><Status text={c.consent}/><ArrowRight size={15}/></div></button>)}</div></section>
  </div>;
}

function Bench({ consultants, setModal, setDrawer, navigate, sendConsent }) {
  const [query,setQuery]=useState(""); const [availability,setAvailability]=useState("All"); const [type,setType]=useState("All"); const [maxAge,setMaxAge]=useState("All");
  const filtered=consultants.filter(c=>(!query||`${c.name} ${c.skills.join(" ")} ${c.location}`.toLowerCase().includes(query.toLowerCase()))&&(availability==="All"||c.availability===availability)&&(type==="All"||c.type===type)&&(maxAge==="All"||(maxAge==="30"&&c.benchAge<=30)||(maxAge==="60"&&c.benchAge<=60)));
  return <div><PageHeader eyebrow="PEOPLE • REVENUE PIPELINE" title="Bench inventory" subtitle={`${filtered.length} consultants visible · ${consultants.filter(c=>c.benchAge>30).length} over 30 days`} actions={<><button className="secondary" onClick={()=>navigate("/skills")}><Activity size={16}/> Skill coverage</button><button className="primary" onClick={()=>setModal("add-consultant")}><UserPlus size={16}/> Add consultant</button></>}/><section className="card tableCard"><div className="toolbar"><label className="searchField"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search consultants, skills, locations..."/></label><div className="filterGroup"><select value={availability} onChange={e=>setAvailability(e.target.value)}><option>All</option><option>Now</option><option>22 Sep</option><option>15 Sep</option><option>29 Sep</option></select><select value={type} onChange={e=>setType(e.target.value)}><option>All</option><option>Internal</option><option>External</option></select><select value={maxAge} onChange={e=>setMaxAge(e.target.value)}><option>All ages</option><option value="30">0–30 days</option><option value="60">0–60 days</option></select></div></div><div className="tableScroll"><table><thead><tr><th>Consultant</th><th>Primary skills</th><th>Available</th><th>Visa</th><th>Bench age</th><th>Type</th><th>Workflow</th><th></th></tr></thead><tbody>{filtered.map(c=><tr key={c.id}><td><button className="tableLink" onClick={()=>setDrawer({type:"consultant",item:c})}><strong>{c.name}</strong><span>{c.location} · {c.years} yrs</span></button></td><td><div className="tags">{c.skills.slice(0,3).map(s=><em key={s}>{s}</em>)}</div></td><td>{c.availability}</td><td><span className="visa">{c.visa}</span></td><td><span className={c.benchAge>60?"age danger":c.benchAge>30?"age warn":"age"}>{c.benchAge}d</span></td><td>{c.type}</td><td><Status text={c.consent}/></td><td><button className="rowAction" onClick={()=>setDrawer({type:"consultant",item:c})}>View <ArrowRight size={14}/></button></td></tr>)}</tbody></table></div><div className="tableFooter"><span>{filtered.length} consultants</span><button className="textBtn" onClick={()=>setModal("add-consultant")}><Plus size={14}/> Add manually</button></div></section></div>;
}

function Skills({consultants,navigate}) { const counts={}; consultants.forEach(c=>c.skills.forEach(s=>counts[s]=(counts[s]||0)+1)); const list=Object.entries(counts).sort((a,b)=>b[1]-a[1]); return <div><PageHeader eyebrow="MATCHING INTELLIGENCE" title="Skill coverage" subtitle="See where the bench is strong, thin, or exposed before new requirements arrive." actions={<button className="primary" onClick={()=>navigate("/bench")}><Users size={16}/> Open bench</button>}/><div className="skillSummary">{[["Java","Strong",82],["AWS","Strong",68],["Python","Healthy",56],["Snowflake","Healthy",34],["ServiceNow","Thin",18]].map(([a,b,n])=><div className="skillStat" key={a}><span>{a}</span><strong>{n}%</strong><em>{b}</em><div><i style={{width:`${n}%`}}/></div></div>)}</div><section className="card"><CardTitle icon={Activity} title="Bench skill distribution" subtitle="Counts are based on the current demo consultant inventory"/><div className="skillList">{list.map(([skill,count],i)=><div className="skillRow" key={skill}><div className="skillRank">{String(i+1).padStart(2,"0")}</div><strong>{skill}</strong><div className="bar"><i style={{width:`${Math.min(100,count/consultants.length*100)}%`}}/></div><span>{count} consultants</span><button className="textBtn" onClick={()=>navigate("/bench")}>View bench</button></div>)}</div></section><section className="card"><CardTitle icon={CircleAlert} title="Coverage watchlist" subtitle="Skills that may create sourcing pressure"/><div className="watchGrid">{[["ServiceNow","18 consultants","Consider external sourcing"],["Cypress","12 consultants","Watch new QA JDs"],["dbt","9 consultants","Good for current demand"]].map(([a,b,c])=><div className="watch" key={a}><div className="roundIcon"><CircleAlert size={17}/></div><div><strong>{a}</strong><span>{b}</span><small>{c}</small></div><ArrowRight size={16}/></div>)}</div></section></div>; }

function Consent({consultants,sendConsent,setDrawer,navigate}) { const [tab,setTab]=useState("All"); const list=consultants.filter(c=>c.consent!=="Available"&&c.consent!=="Submitted").filter(c=>tab==="All"||c.consent.includes(tab)); return <div><PageHeader eyebrow="CONTROLLED OUTREACH" title="Consent" subtitle="Consultant approval is required before RTR and vendor submission." actions={<button className="primary" onClick={()=>navigate("/submissions")}><Send size={16}/> Submission queue</button>}/><div className="tabs">{["All","Consent Sent","Awaiting Consent","Ready to Submit"].map(t=><button key={t} className={tab===t?"active":""} onClick={()=>setTab(t)}>{t}</button>)}</div><section className="card tableCard"><div className="toolbar simple"><div><strong>{list.length} consent records</strong><span> · sorted by attention needed</span></div><button className="secondary" onClick={()=>list.forEach(c=>c.consent.includes("Awaiting")&&sendConsent(c))}><RefreshCw size={15}/> Send reminders</button></div><div className="tableScroll"><table><thead><tr><th>Consultant</th><th>Current status</th><th>Bench age</th><th>Visa</th><th>Next action</th><th></th></tr></thead><tbody>{list.map(c=><tr key={c.id}><td><button className="tableLink" onClick={()=>setDrawer({type:"consultant",item:c})}><strong>{c.name}</strong><span>{c.location} · {c.years} yrs</span></button></td><td><Status text={c.consent}/></td><td>{c.benchAge} days</td><td>{c.visa}</td><td>{c.consent==="Ready to Submit"?"RTR + submission":c.consent.includes("Awaiting")?"Reminder due":"Track response"}</td><td>{c.consent.includes("Awaiting")?<button className="rowAction" onClick={()=>sendConsent(c)}>Remind <Send size={14}/></button>:<button className="rowAction" onClick={()=>setDrawer({type:"consultant",item:c})}>Review <ArrowRight size={14}/></button>}</td></tr>)}</tbody></table></div></section></div>; }

function Submissions({submissions,setDrawer,navigate}) { const [status,setStatus]=useState("All"); const filtered=submissions.filter(s=>status==="All"||s.status===status); return <div><PageHeader eyebrow="RTR • VENDOR CONTROL" title="Submissions" subtitle="Trace every candidate submission from consent through interview and placement." actions={<><button className="secondary" onClick={()=>exportCsv(filtered)}><Download size={16}/> Export</button><button className="primary" onClick={()=>navigate("/consent")}><ShieldCheck size={16}/> Check consent</button></>}/><div className="submissionStats">{[["Submitted",submissions.filter(x=>x.status==="Submitted").length],["Under review",submissions.filter(x=>x.status==="Under Review").length],["Interview",submissions.filter(x=>x.status==="Interview").length],["Rejected",submissions.filter(x=>x.status==="Rejected").length]].map(([a,n])=><button className="statPill" key={a} onClick={()=>setStatus(a==="Submitted"?"Submitted":a==="Under review"?"Under Review":a)}><span>{a}</span><strong>{n}</strong></button>)}</div><section className="card tableCard"><div className="toolbar simple"><div className="tabs inline">{["All","Submitted","Under Review","Interview","Rejected"].map(t=><button key={t} className={status===t?"active":""} onClick={()=>setStatus(t)}>{t}</button>)}</div></div><div className="tableScroll"><table><thead><tr><th>Candidate</th><th>Requirement</th><th>Match</th><th>Vendor</th><th>Submitted</th><th>Status</th><th></th></tr></thead><tbody>{filtered.map(s=><tr key={s.id}><td><strong>{s.consultant}</strong><span className="cellSub">{s.id}</span></td><td><strong>{s.job}</strong><span className="cellSub">{s.company}</span></td><td><span className="quality good">{s.score}%</span></td><td>{s.vendor}</td><td>{s.submitted}</td><td><Status text={s.status}/></td><td><button className="rowAction" onClick={()=>setDrawer({type:"submission",item:s})}>Details <ArrowRight size={14}/></button></td></tr>)}</tbody></table></div></section></div>; }

function InboxPage({inbox,markRead,navigate,setModal}) { const [query,setQuery]=useState(""); const filtered=inbox.filter(m=>!query||`${m.from} ${m.subject} ${m.preview}`.toLowerCase().includes(query.toLowerCase())); return <div><PageHeader eyebrow="COMMUNICATION" title="Inbox" subtitle={`${inbox.filter(x=>x.unread).length} unread messages connected to the staffing workflow.`} actions={<button className="primary" onClick={()=>setModal("compose")}><Mail size={16}/> Compose</button>}/><section className="inboxLayout card"><aside className="mailFolders"><button className="active"><Inbox size={17}/> All mail <b>{inbox.length}</b></button><button><Mail size={17}/> Unread <b>{inbox.filter(x=>x.unread).length}</b></button><button><ShieldCheck size={17}/> Consent</button><button><BriefcaseBusiness size={17}/> Requirements</button></aside><div className="mailMain"><div className="mailToolbar"><label className="searchField"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search inbox..."/></label><button className="iconBtn compact" onClick={()=>window.location.reload()}><RefreshCw size={16}/></button></div>{filtered.map(m=><button className={`mailRow ${m.unread?"unread":""}`} key={m.id} onClick={()=>{markRead(m.id);}}><div className="avatar soft">{initials(m.from)}</div><div><strong>{m.from}</strong><span>{m.subject}</span><p>{m.preview}</p></div><div><em>{m.tag}</em><small>{m.time}</small></div></button>)}{!filtered.length&&<EmptyState text="No messages found."/>}</div></section></div>; }

function CardTitle({icon:Icon,title,subtitle,action}) { return <div className="cardTitle"><div className="titleLead"><div className="titleIcon"><Icon size={17}/></div><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div></div>{action}</div>; }
function Status({text}) { const tone=text.toLowerCase().includes("ready")||text==="Submitted"||text==="Interview"||text==="Consent In"?"success":text.toLowerCase().includes("await")||text.includes("Sent")||text==="Under Review"?"warning":text.includes("Rejected")||text.includes("Held")||text.includes("No Match")?"danger":"neutral"; return <span className={`status ${tone}`}><i/>{text}</span>; }
function EmptyState({text}) { return <div className="empty"><Search size={22}/><strong>{text}</strong><span>Try changing the filters or search term.</span></div>; }
function initials(name){return name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();}
function exportCsv(rows){const csv=rows.map(r=>Object.values(r).map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n"); const blob=new Blob([csv],{type:"text/csv"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="benchsales-export.csv"; a.click(); URL.revokeObjectURL(url);}

function Modal({title,subtitle,children,close}){return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="modal"><div className="modalHead"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="iconBtn" onClick={close}><X size={18}/></button></div>{children}</div></div>}
function AddJDModal({close,save}){const [title,setTitle]=useState("");const [company,setCompany]=useState("");const [location,setLocation]=useState("");const [skills,setSkills]=useState("");return <Modal title="Add job description" subtitle="Create a frontend-only requirement record." close={close}><form className="form" onSubmit={e=>{e.preventDefault();save({title,company,location,mode:"Hybrid",source:"Manual",posted:"Just now",quality:100,shortlist:0,state:"Ready to Submit",skills:skills.split(",").map(s=>s.trim()).filter(Boolean),visa:"USC / GC",exp:"5+ yrs"});}}><label>Job title<input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Senior Java Developer"/></label><label>Company<input required value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company name"/></label><div className="formGrid"><label>Location<input required value={location} onChange={e=>setLocation(e.target.value)} placeholder="City, State / Remote"/></label><label>Work mode<select defaultValue="Hybrid"><option>Hybrid</option><option>Remote</option><option>Onsite</option></select></label></div><label>Required skills<input value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Java, Spring Boot, AWS"/></label><div className="formActions"><button type="button" className="secondary" onClick={close}>Cancel</button><button className="primary"><Plus size={16}/> Create JD</button></div></form></Modal>}
function AddConsultantModal({close,save}){const [name,setName]=useState("");const [location,setLocation]=useState("");const [skills,setSkills]=useState("");const [years,setYears]=useState("5");const [visa,setVisa]=useState("USC");return <Modal title="Add consultant" subtitle="Add a bench profile for matching and outreach." close={close}><form className="form" onSubmit={e=>{e.preventDefault();save({name,location,years:Number(years),skills:skills.split(",").map(s=>s.trim()).filter(Boolean),availability:"Now",visa,benchAge:0,consent:"Available",type:"Internal",rate:75});}}><label>Consultant name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"/></label><div className="formGrid"><label>Location<input required value={location} onChange={e=>setLocation(e.target.value)} placeholder="City, State / Remote"/></label><label>Experience<input type="number" min="0" value={years} onChange={e=>setYears(e.target.value)}/></label></div><div className="formGrid"><label>Visa<select value={visa} onChange={e=>setVisa(e.target.value)}><option>USC</option><option>GC</option><option>H-1B</option><option>EAD</option></select></label><label>Type<select defaultValue="Internal"><option>Internal</option><option>External</option></select></label></div><label>Skills<input required value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Java, Spring Boot, AWS"/></label><div className="formActions"><button type="button" className="secondary" onClick={close}>Cancel</button><button className="primary"><UserPlus size={16}/> Add consultant</button></div></form></Modal>}
function ComposeModal({close,notify}){return <Modal title="Compose message" subtitle="Frontend demo composer. No message is sent to an external service." close={close}><form className="form" onSubmit={e=>{e.preventDefault();close();notify("Message saved as a draft");}}><label>To<input required placeholder="vendor@example.com"/></label><label>Subject<input required placeholder="Follow-up on candidate submission"/></label><label>Message<textarea required rows="6" placeholder="Write your message..."/></label><div className="formActions"><button type="button" className="secondary" onClick={close}>Discard</button><button className="primary"><Send size={16}/> Save draft</button></div></form></Modal>}

function ConsultantDrawer({consultant:c,close,submit,sendConsent}){return <Drawer title="Consultant profile" close={close}><div className="profileHero"><div className="avatar xl">{initials(c.name)}</div><div><h2>{c.name}</h2><p>{c.location} · {c.years} years · {c.type}</p><Status text={c.consent}/></div></div><div className="drawerActions">{c.consent.includes("Awaiting")&&<button className="primary" onClick={()=>sendConsent(c)}><Send size={15}/> Send consent</button>}{c.consent.includes("Ready")&&<button className="primary" onClick={()=>submit(c)}><Send size={15}/> Submit candidate</button>}<button className="secondary"><Edit3 size={15}/> Edit profile</button></div><div className="drawerSection"><h3>Profile</h3>{[["Visa",c.visa],["Availability",c.availability],["Bench age",`${c.benchAge} days`],["Target rate",`$${c.rate}/hr`]].map(([a,b])=><div className="infoLine" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div><div className="drawerSection"><h3>Skills</h3><div className="tagLine big">{c.skills.map(s=><em key={s}>{s}</em>)}</div></div><div className="drawerSection"><h3>Workflow</h3><div className="timeline">{["Profile parsed","Matched to requirements",c.consent,"RTR required","Vendor submission"].map((x,i)=><div className={i<2||x===c.consent?"done":""} key={x}><i>{i<2||x===c.consent?<Check size={11}/>:i+1}</i><span>{x}</span></div>)}</div></div></Drawer>}
function JobDrawer({job:j,close,navigate}){return <Drawer title="Requirement" close={close}><div className="drawerJob"><div className="fileIcon large"><FileText size={22}/></div><div><h2>{j.title}</h2><p>{j.company} · {j.location}</p><Status text={j.state}/></div></div><div className="drawerActions"><button className="primary" onClick={()=>navigate("/jd/1")}><ExternalLink size={15}/> Open details</button><button className="secondary"><Edit3 size={15}/> Edit</button></div><div className="drawerSection"><h3>Requirement</h3>{[["JD ID",j.id],["Mode",j.mode],["Source",j.source],["Experience",j.exp],["Visa",j.visa],["Quality",`${j.quality}%`]].map(([a,b])=><div className="infoLine" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div><div className="drawerSection"><h3>Required skills</h3><div className="tagLine big">{j.skills.map(s=><em key={s}>{s}</em>)}</div></div></Drawer>}
function MessageDrawer({message:m,close,markRead}){return <Drawer title="Message" close={close}><div className="messageHero"><div className="avatar soft">{initials(m.from)}</div><div><h2>{m.subject}</h2><p>{m.from} · {m.time} ago</p></div></div><div className="messageBody"><p>{m.preview}</p><p>This is a frontend-only preview of the staffing communication workflow. In production this area will connect to the approved mailbox integration and preserve the message audit trail.</p></div><div className="drawerActions"><button className="primary" onClick={()=>{markRead(m.id);close();}}>Mark as read</button><button className="secondary"><Mail size={15}/> Reply</button></div></Drawer>}
function Drawer({title,close,children}){return <div className="drawerOverlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><aside className="drawer"><div className="drawerHead"><div><span>DETAIL VIEW</span><h2>{title}</h2></div><button className="iconBtn" onClick={close}><X size={18}/></button></div>{children}</aside></div>}

createRoot(document.getElementById("root")).render(<App/>);
