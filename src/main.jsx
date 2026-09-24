import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, FileText, Home,
  LayoutDashboard, Mail, PaperPlane, Search, Users, CheckCircle2, BarChart3,
  Plus, Download, MoreVertical, ArrowRight, Info, Clock, MapPin, BriefcaseBusiness,
  ShieldCheck, Code2, Database, CalendarDays, UserRound, Send, CircleAlert
} from "lucide-react";
import "./styles.css";

const navy="#0f2b56", navy2="#173d73", ink="#14346b", pale="#f4f8fd", line="#dce8f5", chip="#edf4fc";

const menu=[
  ["Today",Home,"/"],["JDs",FileText,"/jds"],["Bench",Users,"/bench"],["Consent",CheckCircle2,"/consent"],["Submissions",PaperPlane,"/submissions"],["Inbox",Mail,"/inbox"]
];

const jobs=[
  {id:1,title:"Senior Java Developer",company:"Zenith Technologies",location:"Charlotte, NC",source:"Email",age:"14 min ago",quality:"0.82",bench:"14 → 6",consent:"2 in · 3 waiting",state:"Consent In"},
  {id:2,title:"Data Engineer (Snowflake)",company:"Apex Partners",location:"Remote",source:"Portal",age:"41 min ago",quality:"0.91",bench:"9 → 4",consent:"1 in · 3 waiting",state:"Consent In"},
  {id:3,title:"ServiceNow Admin",company:"Nexus IT",location:"Austin, TX",source:"Email",age:"1 hr ago",quality:"0.74",bench:"11 → 3",consent:"3 waiting",state:"Consent Sent"},
  {id:4,title:".NET Core Developer",company:"Zenith Technologies",location:"Dallas, TX",source:"Email",age:"3 hr ago",quality:"0.88",bench:"6 → 2",consent:"1 in · 1 waiting",state:"Consent In"},
  {id:5,title:"Salesforce Admin",company:"Meridian Global",location:"Remote",source:"Portal",age:"5 hr ago",quality:"0.69",bench:"—",consent:"Held",state:"Held Below Floor"},
  {id:6,title:"QA Automation (Selenium)",company:"Apex Partners",location:"Tampa, FL",source:"Email",age:"9 hr ago",quality:"0.93",bench:"11 → 5",consent:"1 in · 2 waiting",state:"Consent In"},
  {id:7,title:"Senior Data Scientist",company:"Helix Direct",location:"Boston, MA",source:"Email",age:"19 hr ago",quality:"0.90",bench:"4 → 2",consent:"2 waiting",state:"Consent Sent"},
  {id:8,title:"React Developer",company:"Nexus IT",location:"Remote",source:"Portal",age:"2 days ago",quality:"0.85",bench:"47 → 0",consent:"0 above the match floor",state:"No Match on Bench"}
];

const consultants=[
  {name:"Ramesh Kulkarni",meta:"Charlotte, NC · 11 yrs",skills:"Java, Spring Boot, AWS",available:"Now",auth:"GC",age:"18 d",consent:"3 this week",state:"Ready to Submit"},
  {name:"Sofia Mendes",meta:"Remote · 9 yrs",skills:"Java, Kafka, Kubernetes",available:"22 Sep",auth:"USC",age:"9 d",consent:"2 this week",state:"Ready to Submit"},
  {name:"Ajay Verma",meta:"Dallas, TX · 8 yrs",skills:"Java, Spring, Oracle",available:"Now",auth:"GC",age:"41 d",consent:"4 this week",state:"Awaiting Consent"},
  {name:"Daniel Okonkwo",meta:"Austin, TX · 7 yrs",skills:"ServiceNow, ITSM, ITIL",available:"Now",auth:"H-1B",age:"62 d",consent:"1 this week",state:"Interview Set"},
  {name:"Meera Iyer",meta:"Remote · 6 yrs",skills:"Snowflake, dbt, Python",available:"Now",auth:"USC",age:"5 d",consent:"2 this week",state:"Ready to Submit"},
  {name:"Nadia Haddad",meta:"Tampa, FL · 8 yrs",skills:"Selenium, Cypress",available:"15 Sep",auth:"GC",age:"71 d",consent:"5 this week",state:"Ready to Submit"},
  {name:"Vikram Rao",meta:"Charlotte, NC · 10 yrs",skills:"Java, Spring Boot, Kafka",available:"Now",auth:"GC",age:"12 d",consent:"3 this week",state:"Available"}
];

const matched=[
  ["Ramesh Kulkarni","0.94","consented 06:40 · 8 of 9 skills · interviewed 3 Sep","WORTH SENDING"],
  ["Sofia Mendes","0.89","consented 07:12 · 7 of 9 skills · interviewed 28 Aug","WORTH SENDING"],
  ["Vikram Rao","0.88","declined 05:02 · stays on the bench for every other JD","WORTH SENDING"],
  ["Ajay Verma","0.86","sent 02:34 · Kafka now evidenced on a project","NOT SURE YET"],
  ["Priya Nair","0.85","sent 02:28 · available 29 Sep · wants 2 weeks lead","NOT SURE YET"],
  ["Arjun Das","0.85","reminded in 2h · two skills claimed on profile only","NOT SURE YET"]
];

const consent=[
  ["Ramesh Kulkarni","02:24","CONSENTED","Replied 06:40","signed RTR attached"],
  ["Meera Iyer","02:24","CONSENTED","Replied 05:58","rate confirmed at $72/hr"],
  ["Vikram Rao","02:24","DECLINED","Replied 05:02","already in another interview loop"],
  ["Ajay Verma","02:24","AWAITING · 7h","Reminder queued","fires automatically at 24h"],
  ["Arjun Das","02:24","AWAITING · 7h","Reminder due in 2h","Send reminder now"],
  ["Deepa Menon","Yesterday","AWAITING · 31h","Reminder sent once","no reply after two attempts"],
  ["Nadia Haddad","02:24","CONSENTED","Replied 08:02","availability re-confirmed"]
];

const submissions=[
  ["Ramesh Kulkarni","Senior Java Developer — Zenith","consent 06:40"],
  ["Sofia Mendes","Senior Java Developer — Zenith","consent 07:12"],
  ["Meera Iyer","Data Engineer — Apex Partners","consent 05:58"],
  ["Tobias Lang",".NET Core Developer — Zenith","consent 07:31"],
  ["Nadia Haddad","QA Automation — Apex Partners","consent 08:02"]
];

function Badge({children, tone="blue"}){return <span className={"badge "+tone}>{children}</span>}
function Shell({title, children, page, onNav, subtitle}) {
  const count={JDs:19,Bench:47,Consent:14,Submissions:5,Inbox:23};
  return <div className="shell">
    <div className="topband"><div>{title}</div><span>{String(page).padStart(2,"0")} / 07</span></div>
    <div className="label">TYPE 2 • FORMAL, DECENT</div>
    <div className="window">
      <aside>
        <div className="brand">TEKISHO<div>Bench Sales</div></div>
        <nav>
          {menu.map(([name,Icon,path])=><button key={name} className={(pageMap[path]===page)?"active":""} onClick={()=>onNav(path)}><Icon size={20}/><span>{name}</span>{count[name]&&<em>{count[name]}</em>}</button>)}
        </nav>
        <div className="asideFoot">People<div>Process Smarter</div></div>
      </aside>
      <main>
        <Header subtitle={subtitle}/>
        {children}
      </main>
    </div>
    <div className="footer">TEKISHO • Bench Sales • TYPE 2 • FORMAL, DECENT</div>
  </div>
}
function Header(){return <div className="header">
  <div className="search"><Search size={16}/><span>Search candidates, jobs, skills, or anything...</span></div>
  <div className="profile"><Bell size={20}/><div className="avatar">P</div><div><strong>Priya</strong><small>Recruiter</small></div><ChevronDown size={16}/><small className="date">Tuesday, 23 Sep 2026</small></div>
</div>}

function Dashboard({nav}) {
 return <Shell title="Bench Sales Dashboard" page={1} onNav={nav}>
   <div className="heroTitle"><Home size={30}/><div><h1>Good Morning, Priya</h1><p>Let's make it a productive day!</p></div></div>
   <div className="kpis">{[
    ["JDs Received","7","in the last 24 hours",FileText],["Shortlisted","22","AI matched candidates",Users],
    ["Consent","14","pending / resolved",CheckCircle2],["Ready to Submit","5","candidates with consent",PaperPlane],["Nobody to Send","3","open roles with no-matches",CircleAlert]
   ].map(([a,b,c,I])=><div className="kpi" key={a}><div className="iconCircle"><I size={22}/></div><div><small>{a}</small><strong>{b}</strong><span>{c}</span></div><ArrowRight className="karr" size={20}/></div>)}</div>
   <section className="panel ready"><div className="panelHead"><div><Users size={24}/><div><h2>Ready to Submit</h2><p>5 candidates have given consent. Your only decision today.</p></div></div><button className="softBtn">WAITING FOR YOU <ArrowRight size={15}/></button></div>
     <div className="candidateCards">{submissions.map(([n,jd,cs])=><div className="candidateCard" key={n}><div className="initial">{n.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><b>{n}</b><span>{jd}</span><button onClick={()=>nav("/submissions")}>Review <ArrowRight size={14}/></button></div>)}</div>
   </section>
   <div className="twoCols"><section className="panel"><div className="panelHead"><div><FileText size={22}/><div><h2>JDs Received in the Last 24 Hours</h2><p>7 new job descriptions parsed and processed</p></div></div><button className="linkBtn" onClick={()=>nav("/jds")}>View all JDs <ArrowRight size={14}/></button></div><Table rows={jobs.slice(0,4)} columns={["#","Job Title","Company","Skills","Location","Posted"]}/></section>
   <section className="panel"><div className="panelHead"><div><Users size={22}/><div><h2>Nobody to Send (3)</h2><p>Open roles with no-matches</p></div></div><button className="linkBtn">View all <ArrowRight size={14}/></button></div>{["ServiceNow Admin","Senior Data Scientist","React Developer"].map((x,i)=><div className="noSend" key={x}><div className="miniIcon"><Users size={18}/></div><b>{x}</b><div className="ring">{[47,12,8][i]}<small>/ 0</small></div></div>)}</section></div>
 </Shell>
}

function Table({rows,columns}){return <div className="tableWrap"><table><thead><tr>{columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((r,ri)=><tr key={ri}>{columns.map((c,ci)=><td key={c}>{ci===1?<><b>{r.title}</b><small>{r.company}</small></>:c==="Skills"?<div className="tags"><span>Java</span><span>Spring</span><span>AWS</span></div>:r[c.toLowerCase().replaceAll(" ","")]||r[c.toLowerCase()]||r[ci]||"—"}</td>)}</tr>)}</tbody></table></div>}

function JDs({nav}) {
 const [tab,setTab]=useState("Ready to Submit (5)");
 return <Shell title="JDs | Job Description Register" page={2} onNav={nav}>
   <div className="pageHeader"><div><FileText size={28}/><div><h1>JDs</h1><p>The register for all job descriptions</p></div></div><button className="primary">+ Add JD</button></div>
   <div className="filters"><span>FILTERS</span>{["All States","Ready to Submit (5)","Awaiting Consent (14)","Held Below the Floor (1)","No Match on Bench (3)"].map(x=><button key={x} className={tab===x?"selected":""} onClick={()=>setTab(x)}>{x}</button>)}<button className="dateBtn"><CalendarDays size={16}/> Last 24 hours <ChevronDown size={14}/></button></div>
   <section className="panel big"><div className="panelHead"><div><h2>JD Register</h2><p>19 open · 1 held for missing fields · 3 with nobody on the bench to send</p></div><div><button className="lightBtn"><Download size={15}/> Export</button></div></div><div className="tableWrap"><table className="wide"><thead><tr><th>#</th><th>Job Title</th><th>Company</th><th>Source</th><th>JD Quality</th><th>Bench → Shortlist</th><th>Consent</th><th>State</th><th>Actions</th></tr></thead><tbody>{jobs.map((j,i)=><tr key={j.id}><td>{i+1}</td><td><b>{j.title}</b><small>{j.company}</small></td><td>{j.location}</td><td>{j.source}<small>{j.age}</small></td><td>{j.quality}</td><td>{j.bench}</td><td>{j.consent}</td><td><Badge tone="blue">{j.state}</Badge></td><td><button className="rowBtn" onClick={()=>nav("/jd/1")}>View <ArrowRight size={14}/></button> <MoreVertical size={16}/></td></tr>)}</tbody></table></div><div className="pager">Showing 1–8 of 19 JDs <span>‹ <b>1</b> 2 3 ›</span></div></section>
 </Shell>
}

function JDDetail({nav}) {
 return <Shell title="JD Detail | Matched Consultants" page={3} onNav={nav}>
   <div className="back" onClick={()=>nav("/jds")}><ChevronLeft size={16}/> Back to JDs</div>
   <div className="detailHeader"><div className="titleIcon"><FileText size={28}/></div><div><h1>Senior Java Developer — Charlotte, NC</h1><p>Zenith Technologies · JD ID: REQ-4482 · Received 14 min ago</p></div><div className="detailActions"><Badge>Active</Badge><Badge>Ready to Submit</Badge><button className="primary">Actions⌄</button></div></div>
   <div className="twoCols detail"><section className="panel"><div className="panelHead"><div><h2>JD Details</h2><p>What it read, and filtered on</p></div><Badge>Auto Parsed</Badge></div>{[
    ["SUMMARY","Nobody approved this summary. Every condition below was applied to the whole bench with no human in the path."],
    ["SKILLS","Java 8+, Spring Boot, Kafka, AWS, PostgreSQL"],
    ["EXPERIENCE","8+ years"],
    ["LOCATION","Charlotte, NC — hybrid 3 days"],
    ["AUTHORIZATION","USC or Green Card only"],
    ["AVAILABILITY","Within 2 weeks"],
    ["BILL RATE","Not stated in the JD"],
    ["HOW","47 on bench → hard conditions → 33 → match floor 0.85 → 8 → 6 consent requests sent"]
   ].map(([l,v])=><div className="detailRow" key={l}><b>{l}</b><span>{v}</span></div>)}</section>
   <section className="panel"><div className="panelHead"><div><h2>Shortlisted Candidates</h2><p>How sure we are, and where they stand</p></div><Badge>3 Worth Sending · 3 Not Sure Yet</Badge></div>{matched.map(m=><div className="matchRow" key={m[0]}><strong>{m[1]}</strong><div><b>{m[0]}</b><small>{m[2]}</small></div><Badge tone={m[3]==="WORTH SENDING"?"blue":"soft"}>{m[3]}</Badge><button className={m[3]==="WORTH SENDING"?"rowBtn":"lightBtn"} onClick={()=>nav("/submissions")}>{m[3]==="WORTH SENDING"?"Review":"Request mock"} <ArrowRight size={14}/></button></div>)}<div className="infoBox"><Info size={18}/><span>The band says how sure we are for this JD; it gates nothing. A recruiter may submit a NOT SURE YET and the reason is recorded.</span></div></section></div>
 </Shell>
}

function Bench({nav}) {
 return <Shell title="Bench | Consultant Inventory" page={4} onNav={nav}>
  <div className="pageHeader"><div><Users size={28}/><div><h1>Bench</h1><p>Available consultants and their bench details</p></div></div><div><button className="darkBtn" onClick={()=>nav("/skill")}>Skill coverage</button><button className="primary">+ Add Consultant</button></div></div>
  <div className="filters"><span>FILTERS</span>{["Availability: All⌄","Skills: Any⌄","Over 30 days (11)","Stale resume (4)","Availability date passed (3)","No consent reply (2)"].map(x=><button key={x}>{x}</button>)}</div>
  <section className="panel big"><div className="panelHead"><div><h2>Consultant Inventory</h2><p>47 consultants · 11 over 30 days · 5 over 60 · 2 over 90 · 3 availability dates have already passed</p></div><button className="softBtn">SHORTLISTED AUTOMATICALLY AGAINST EVERY NEW JD</button></div><div className="tableWrap"><table className="wide"><thead><tr><th></th><th>Consultant</th><th>Primary Skills</th><th>Available</th><th>Auth</th><th>Bench Age</th><th>Consent Requests</th><th>State</th><th>Action</th></tr></thead><tbody>{consultants.map((c,i)=><tr key={c.name}><td>□</td><td><b>{c.name}</b><small>{c.meta}</small></td><td>{c.skills}</td><td>{c.available}</td><td><Badge>{c.auth}</Badge></td><td>{c.age}</td><td>{c.consent}</td><td><Badge>{c.state}</Badge></td><td><button className="rowBtn" onClick={()=>nav("/jd/1")}>View <ArrowRight size={14}/></button> <MoreVertical size={16}/></td></tr>)}</tbody></table></div><div className="pager">Showing 1–7 of 47 consultants <span>‹ <b>1</b> 2 3 4 5 6 7 ›</span></div></section>
 </Shell>
}

function Skill({nav}) {
 const skills=[["Gen AI / LLM",3,2,"short by 1","Three vendors asking, two people, neither consented yet."],["Kafka",4,0,"short by 4","Nobody has it. Four JDs we cannot answer at all."],["ServiceNow",2,1,"short by 1","Daniel is our only one, and he is already interviewing."],["Java / Spring Boot",6,14,"covered","Deep. Six JDs, fourteen people, all authorised."],["Snowflake / dbt",2,5,"covered","Comfortable."],["Selenium / Cypress",1,4,"covered","Covered, but three of the four are over 60 days on bench."]];
 return <Shell title="Skill Coverage" page={5} onNav={nav}><div className="back" onClick={()=>nav("/bench")}><ChevronLeft size={16}/> Back to Bench</div><div className="pageHeader"><div><BarChart3 size={30}/><div><h1>Skill coverage</h1><p>What came in this week against who we have</p><small>15–19 September · 23 JDs · 47 consultants on bench · counted from the JD text and bench record, not typed</small></div></div><Badge>DERIVED, NEVER MAINTAINED</Badge></div><section className="panel big skillTable"><table><thead><tr><th>Skill</th><th>JDs this week</th><th>On bench, available</th><th>Shortfall</th><th>What it means</th></tr></thead><tbody>{skills.map(s=><tr key={s[0]}><td><b>{s[0]}</b></td><td><div className="bar"><i style={{width:(s[1]/6)*100+"%"}}/></div>{s[1]}</td><td><div className="bar gray"><i style={{width:(Math.min(s[2],14)/14)*100+"%"}}/></div>{s[2]}</td><td><Badge tone="soft">{s[3]}</Badge></td><td>{s[4]}</td></tr>)}</tbody></table><div className="infoBox"><Info size={18}/><span><b>This is the only screen in the product that is not about work in flight.</b><br/>Everything else answers “what do I do next”. This answers “what should we be hiring for”.</span></div></section></Shell>
}

function Consent({nav}) {
 return <Shell title="Consent | Consent Requests" page={6} onNav={nav}><div className="pageHeader"><div><Users size={30}/><div><h1>Consent</h1><p>Consultant consent requests and status</p></div></div></div><div className="filters"><span>FILTERS</span>{["All JDs","Consented (5)","Awaiting (14)","Declined (3)","Reminder due (4)","Open over 24h (1)"].map(x=><button className={x.startsWith("Awaiting")?"selected":""} key={x}>{x}</button>)}</div><section className="panel big"><div className="panelHead"><div><h2>Every consent request</h2></div><div className="infoPill"><Info size={15}/>A consent is a timestamped fact, not a status somebody sets.</div></div><div className="tableWrap"><table className="wide"><thead><tr><th>Consultant / JD</th><th>Sent</th><th>Status</th><th>Last action</th><th>Next</th><th>Action</th></tr></thead><tbody>{consent.map((r,i)=><tr key={r[0]}><td><b>{r[0]}</b><small>→ Senior Java Developer, Zenith</small></td><td>{r[1]}</td><td><Badge tone={r[2].startsWith("CONSENT")?"green":r[2].startsWith("DECLINED")?"red":"amber"}>{r[2]}</Badge></td><td>{r[3]}<small>{r[4]}</small></td><td>{r[2].startsWith("AWAITING")?"Send reminder now":"—"}</td><td>{r[2].startsWith("AWAITING")?<button className="lightBtn">Send Reminder</button>:<button className="linkBtn" onClick={()=>nav("/submissions")}>Review →</button>}</td></tr>)}</tbody></table></div><div className="infoBox"><Info size={18}/><span>Reminders fire on their own at 24 hours. After a second unanswered attempt the row turns red and asks for a person.</span></div></section></Shell>
}

function Submissions({nav}) {
 return <Shell title="Submissions | Vendor Submission Workflow" page={7} onNav={nav}><div className="pageHeader"><div><PaperPlane size={30}/><div><h1>Submissions</h1><p>Ready to submit and in flight with vendors</p></div></div><Badge tone="amber">THE ONE HUMAN DECISION</Badge></div><div className="submissionGrid"><section className="panel sideList"><div className="panelHead"><div><h2>Ready to Submit</h2></div><b>{submissions.length}</b></div>{submissions.map((s,i)=><div className={"subItem "+(i===0?"selectedItem":"")} key={s[0]}><div className="initial">{s[0].split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><b>{s[0]}</b><small>{s[1]}</small><small>{s[2]}</small></div></div>)}<div className="infoBox"><Info size={16}/><span>Everything in this list assembled itself overnight. Nothing here has left the building.</span></div></section><section><div className="panel submitCard"><div className="personHead"><div className="initial large">RK</div><div><h2>Ramesh Kulkarni</h2><p>Senior Java Developer — Zenith · 11 yrs · Green Card · Available now</p></div><Badge>READY TO SUBMIT</Badge></div><div className="panelHead"><div><h2>Submission Details</h2><p>Assembled automatically · review before you press</p></div></div>{[
 ["CONSULTANT","Ramesh Kulkarni · 11 yrs · Green Card · Available now"],
 ["JOB DESCRIPTION","Senior Java Developer — Charlotte, NC · Zenith Technologies · 12 months"],
 ["CONSENT","Received 06:40 today · signed RTR on file · IP and timestamp recorded"],
 ["RESUME","v4 — Zenith template applied · contact details masked"],
 ["RATE","$74/hr C2C, confirmed with the consultant."],
 ["AVAILABILITY","Immediate · re-confirmed by the consultant in the consent reply"],
 ["COMPLIANCE","Work authorization verified · no duplicate submission to this vendor in 90 days"]
].map(x=><div className="detailLine" key={x[0]}><b>{x[0]}</b><span>{x[1]}</span></div>)}<div className="buttonRow"><button className="primary bigBtn">Submit Ramesh Kulkarni to Zenith</button><button className="lightBtn">Edit the rate</button><button className="lightBtn">Hold — ask the consultant</button></div></div><section className="panel"><div className="panelHead"><div><Users size={22}/><div><h2>Already with Vendors</h2><p>This press is the one human decision in the flow</p></div></div></div><Table rows={jobs.slice(0,3)} columns={["#","Job Title","Company"]}/></section></section></div></Shell>
}

const pageMap={"/":1,"/jds":2,"/jd/1":3,"/bench":4,"/skill":5,"/consent":6,"/submissions":7};

function App(){
 const [path,setPath]=useState(window.location.pathname||"/");
 const nav=p=>{window.history.pushState({}, "", p);setPath(p)};
 React.useEffect(()=>{const f=()=>setPath(window.location.pathname);window.addEventListener("popstate",f);return()=>window.removeEventListener("popstate",f)},[]);
 if(path==="/jds") return <JDs nav={nav}/>;
 if(path==="/jd/1") return <JDDetail nav={nav}/>;
 if(path==="/bench") return <Bench nav={nav}/>;
 if(path==="/skill") return <Skill nav={nav}/>;
 if(path==="/consent") return <Consent nav={nav}/>;
 if(path==="/submissions") return <Submissions nav={nav}/>;
 return <Dashboard nav={nav}/>;
}

createRoot(document.getElementById("root")).render(<App />);
