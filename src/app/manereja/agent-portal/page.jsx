'use client';
import { useState, useEffect, useCallback, useRef } from "react";
import { LoginScreen, ForgotEmail, ForgotOtp, ForgotNewPassword, ResetSuccess } from './comps/AgentPortalAuth';

// ── CONFIG ────────────────────────────────────────────────────────────────────
const BASE = `${process.env.NEXT_PUBLIC_SERVER}/auth`;

// ── THEME ─────────────────────────────────────────────────────────────────────
const T = {
  bg:           "#F7F6F3",
  surface:      "#FFFFFF",
  border:       "#E8E5DF",
  borderSoft:   "#F0EDE8",
  text:         "#2C2925",
  textMid:      "#6B6560",
  textSoft:     "#A09A94",
  accent:       "#5C7A6B",
  accentSoft:   "#EEF3F0",
  accentHov:    "#4A6558",
  danger:       "#C0533A",
  dangerSoft:   "#FBF0ED",
  warn:         "#B07D3A",
  warnSoft:     "#FDF6EE",
  info:         "#3A6580",
  infoSoft:     "#EEF4F8",
  success:      "#4A7A5A",
  successSoft:  "#EEF5F1",
  sidebar:      "#2C2925",
  sidebarText:  "#C8C2BB",
  sidebarActive:"#F7F6F3",
  font:         "'Outfit', 'Helvetica Neue', sans-serif",
  fontDisplay:  "'DM Serif Display', Georgia, serif",
};

// ── API ───────────────────────────────────────────────────────────────────────
const api = async (path, token, opts = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...opts,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// ── GLOBAL CSS ────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  @keyframes spin   { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes popIn  { from { transform:scale(0.5); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes slideIn { from { opacity:0; transform:translateX(18px); } to { opacity:1; transform:translateX(0); } }
`;

// ═════════════════════════════════════════════════════════════════════════════
//  SHARED PRIMITIVES (used by both auth screens + portal)
// ═════════════════════════════════════════════════════════════════════════════

const Badge = ({ label, color = T.accent, bg = T.accentSoft }) => (
  <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 10px", borderRadius:20, background:bg, color, fontSize:11, fontWeight:600, letterSpacing:"0.3px" }}>{label}</span>
);

const statusBadge = (status) => {
  const map = { active:[T.success,T.successSoft], trial:[T.info,T.infoSoft], expired:[T.textSoft,"#F5F4F2"], cancelled:[T.danger,T.dangerSoft], pending:[T.warn,T.warnSoft] };
  const [c, bg] = map[status] || [T.textMid, T.borderSoft];
  return <Badge label={status} color={c} bg={bg} />;
};

const Btn = ({ children, onClick, variant="primary", size="md", disabled=false, style={} }) => {
  const sizes  = { sm:{padding:"5px 12px",fontSize:12}, md:{padding:"8px 18px",fontSize:13}, lg:{padding:"11px 24px",fontSize:14} };
  const vars   = { primary:{background:T.accent,color:"#fff"}, secondary:{background:T.surface,color:T.text,border:`1.5px solid ${T.border}`}, danger:{background:T.dangerSoft,color:T.danger,border:`1.5px solid #E8C5BC`}, ghost:{background:"transparent",color:T.textMid} };
  return (
    <button style={{ border:"none", cursor:disabled?"not-allowed":"pointer", borderRadius:8, fontFamily:T.font, fontWeight:600, transition:"all 0.15s", opacity:disabled?0.55:1, display:"inline-flex", alignItems:"center", gap:6, ...sizes[size], ...vars[variant], ...style }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

const PortalInput = ({ label, value, onChange, type="text", placeholder="", style={} }) => (
  <div style={{ marginBottom:14 }}>
    {label && <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</div>}
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{ width:"100%", padding:"9px 13px", border:`1.5px solid ${T.border}`, borderRadius:8, fontSize:13, color:T.text, background:T.bg, fontFamily:T.font, outline:"none", boxSizing:"border-box", ...style }} />
  </div>
);

const Card = ({ children, style={} }) => (
  <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:24, boxShadow:"0 1px 4px rgba(44,41,37,0.06)", ...style }}>{children}</div>
);

const Modal = ({ title, children, onClose }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(44,41,37,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
    <div style={{ background:T.surface, borderRadius:16, width:"100%", maxWidth:520, maxHeight:"85vh", overflow:"auto", boxShadow:"0 20px 60px rgba(44,41,37,0.2)" }}>
      <div style={{ padding:"20px 24px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:T.fontDisplay, fontSize:18, color:T.text }}>{title}</span>
        <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:T.textSoft, lineHeight:1 }}>×</button>
      </div>
      <div style={{ padding:24 }}>{children}</div>
    </div>
  </div>
);

const Toast = ({ msg, type="success", onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t); }, []);
  const cols = { success:[T.success,T.successSoft], error:[T.danger,T.dangerSoft], info:[T.info,T.infoSoft] };
  const [c, bg] = cols[type] || cols.info;
  return <div style={{ position:"fixed", bottom:24, right:24, zIndex:2000, background:bg, border:`1px solid ${c}33`, borderRadius:10, padding:"12px 18px", color:c, fontSize:13, fontWeight:600, boxShadow:"0 4px 16px rgba(0,0,0,0.12)", maxWidth:320 }}>{msg}</div>;
};

const EmptyState = ({ icon, text }) => (
  <div style={{ textAlign:"center", padding:"48px 24px", color:T.textSoft }}>
    <div style={{ fontSize:32, marginBottom:12 }}>{icon}</div>
    <div style={{ fontSize:14 }}>{text}</div>
  </div>
);

const PageSpinner = () => <div style={{ textAlign:"center", padding:40, color:T.textSoft, fontSize:13 }}>Loading…</div>;

const StatCard = ({ label, value, sub, icon, accent }) => (
  <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"20px 22px", boxShadow:"0 1px 4px rgba(44,41,37,0.05)" }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <div style={{ fontSize:11, fontWeight:700, color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:8 }}>{label}</div>
        <div style={{ fontFamily:T.fontDisplay, fontSize:28, color:T.text, lineHeight:1 }}>{value ?? "—"}</div>
        {sub && <div style={{ fontSize:12, color:T.textSoft, marginTop:6 }}>{sub}</div>}
      </div>
      <div style={{ width:40, height:40, borderRadius:10, background:accent||T.accentSoft, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{icon}</div>
    </div>
  </div>
);

// ── Inline btn spinner ────────────────────────────────────────────────────────
const BtnSpinner = ({ color="#fff" }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ animation:"spin 0.7s linear infinite", flexShrink:0 }}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" strokeDasharray="40 20"/>
  </svg>
);

// ── Auth field with icon + error + suffix ─────────────────────────────────────
const AuthField = ({ label, value, onChange, type="text", placeholder="", error, icon, suffix }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom:14 }}>
      {label && <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</div>}
      <div style={{ position:"relative" }}>
        {icon && <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14, opacity:0.45, pointerEvents:"none" }}>{icon}</div>}
        <input type={type} value={value} onChange={e=>onChange(e.target.value)}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          placeholder={placeholder}
          style={{ width:"100%", padding:`9px ${suffix?"42px":"13px"} 9px ${icon?"36px":"13px"}`, border:`1.5px solid ${error?T.danger:focused?T.accent:T.border}`, borderRadius:8, fontSize:13, color:T.text, background:T.bg, fontFamily:T.font, outline:"none", boxSizing:"border-box", transition:"border-color 0.15s" }} />
        {suffix && <div style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)" }}>{suffix}</div>}
      </div>
      {error && <div style={{ fontSize:11.5, color:T.danger, marginTop:4, fontWeight:500 }}>⚠ {error}</div>}
    </div>
  );
};

// ── 6-box OTP input ───────────────────────────────────────────────────────────
const OtpBoxes = ({ onComplete, error, resetKey }) => {
  const refs = useRef([]);
  const [vals, setVals] = useState(["","","","","",""]);
  useEffect(() => { setVals(["","","","","",""]); refs.current[0]?.focus(); }, [resetKey]);

  const update = (i, raw) => {
    const d = raw.replace(/\D/g,"").slice(-1);
    const next = [...vals]; next[i] = d; setVals(next);
    if (d && i < 5) refs.current[i+1]?.focus();
    if (next.every(v=>v)) onComplete(next.join(""));
  };
  const onKey = (i, e) => {
    if (e.key === "Backspace") {
      const next = [...vals]; next[i] = ""; setVals(next);
      if (!vals[i] && i > 0) refs.current[i-1]?.focus();
    }
  };
  const onPaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6).split("");
    const next = ["","","","","",""]; digits.forEach((d,i)=>{ next[i]=d; }); setVals(next);
    refs.current[Math.min(digits.length,5)]?.focus();
    if (digits.length===6) onComplete(digits.join(""));
  };
  return (
    <div>
      <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
        {vals.map((v,i) => (
          <input key={i} ref={el=>refs.current[i]=el} type="text" inputMode="numeric" maxLength={1} value={v}
            onChange={e=>update(i,e.target.value)} onKeyDown={e=>onKey(i,e)} onPaste={onPaste}
            style={{ width:46, height:56, textAlign:"center", fontSize:22, fontWeight:800, color:T.text, border:`1.5px solid ${error?T.danger:v?T.accent:T.border}`, borderRadius:9, background:v?T.accentSoft:T.bg, fontFamily:T.font, outline:"none", transition:"border-color 0.15s, background 0.15s", caretColor:T.accent }} />
        ))}
      </div>
      {error && <div style={{ textAlign:"center", fontSize:12, color:T.danger, marginTop:10, fontWeight:500 }}>⚠ {error}</div>}
    </div>
  );
};

// ── Step dots ─────────────────────────────────────────────────────────────────
const StepDots = ({ current, total }) => (
  <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:24 }}>
    {Array.from({length:total}).map((_,i) => (
      <div key={i} style={{ height:5, borderRadius:3, width:i===current?20:5, background:i<=current?T.accent:T.border, transition:"all 0.25s" }} />
    ))}
  </div>
);

// ── Rate picker ───────────────────────────────────────────────────────────────
const RatePicker = ({ value, onChange, error }) => (
  <div style={{ marginBottom:14 }}>
    <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.5px" }}>Commission Rate</div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7 }}>
      {[0.10].map(r => {
        const sel = value===r;
        return (
          <button key={r} type="button" onClick={()=>onChange(r)}
            style={{ padding:"9px 0", border:`1.5px solid ${sel?T.accent:T.border}`, borderRadius:8, background:sel?T.accentSoft:T.surface, cursor:"pointer", fontSize:13, fontWeight:700, color:sel?T.accent:T.textMid, fontFamily:T.font, transition:"all 0.15s" }}>
            {(r*100).toFixed(0)}%
          </button>
        );
      })}
    </div>
    <div style={{ fontSize:11, color:T.textSoft, marginTop:5 }}>% you earn per subscription payment referred.</div>
    {error && <div style={{ fontSize:11.5, color:T.danger, marginTop:4, fontWeight:500 }}>⚠ {error}</div>}
  </div>
);

// ── Benefit row ───────────────────────────────────────────────────────────────
const BenRow = ({ icon, title, desc, delay=0 }) => (
  <div style={{ display:"flex", gap:12, padding:"11px 0", borderBottom:`1px solid ${T.borderSoft}`, animation:"fadeUp 0.4s ease both", animationDelay:`${delay}ms` }}>
    <div style={{ width:36, height:36, borderRadius:9, background:T.accentSoft, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{icon}</div>
    <div>
      <div style={{ fontWeight:700, fontSize:13, color:T.text, marginBottom:2 }}>{title}</div>
      <div style={{ fontSize:12, color:T.textSoft, lineHeight:1.55 }}>{desc}</div>
    </div>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
//  AUTH SHELL  — shared wrapper for all unauthenticated screens
// ═════════════════════════════════════════════════════════════════════════════
const AuthShell = ({ children, wide=false }) => (
  <>
    <style>{GLOBAL_CSS}</style>
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"0 16px 60px", fontFamily:T.font, backgroundImage:"radial-gradient(circle at 15% 85%, #E8F0EC 0%, transparent 45%), radial-gradient(circle at 85% 15%, #EDF2EE 0%, transparent 45%)" }}>
      <div style={{ width:"100%", maxWidth:wide?520:400, paddingTop:40 }}>
        {/* Top bar */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:30 }}>
          <div style={{ width:34, height:34, background:T.sidebar, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🤝</div>
          <div>
            <div style={{ fontWeight:800, fontSize:13, color:T.text, letterSpacing:"-0.2px" }}>Manereja</div>
            <div style={{ fontSize:11, color:T.textSoft }}>Agent Portal</div>
          </div>
        </div>
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:18, padding:"30px 32px", boxShadow:"0 2px 24px rgba(44,41,37,0.07)" }}>
          {children}
        </div>
        <div style={{ textAlign:"center", marginTop:16, fontSize:11, color:T.textSoft }}>Manereja · Agent Programme</div>
      </div>
    </div>
  </>
);

// ── Slide-in animation wrapper ────────────────────────────────────────────────
const Slide = ({ children }) => {
  const [v, setV] = useState(false);
  useEffect(() => { requestAnimationFrame(()=>setV(true)); }, []);
  return (
    <div style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(14px)", transition:"opacity 0.34s ease, transform 0.34s cubic-bezier(0.22,1,0.36,1)" }}>
      {children}
    </div>
  );
};



// ═════════════════════════════════════════════════════════════════════════════
//  SCREEN 2 — REG WELCOME  (benefits hero)
// ═════════════════════════════════════════════════════════════════════════════
const RegWelcome = ({ onBack, onStart }) => (
  <AuthShell wide>
    <Slide>
      <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:T.textMid, fontSize:13, fontFamily:T.font, display:"flex", alignItems:"center", gap:5, marginBottom:18, padding:0 }}>
        ← Back to Sign in
      </button>
      <div style={{ textAlign:"center", marginBottom:26 }}>
        <div style={{ width:58, height:58, background:T.sidebar, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:25, margin:"0 auto 14px", boxShadow:`0 4px 18px rgba(44,41,37,0.2)` }}>🤝</div>
        <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 12px", borderRadius:20, background:T.successSoft, color:T.success, fontSize:11, fontWeight:700, letterSpacing:"0.3px", marginBottom:12 }}>
          Commission Agent Programme
        </span>
        <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 10px", letterSpacing:"-0.4px", lineHeight:1.2 }}>
          Earn by referring<br/>businesses to Manereja
        </h1>
        <p style={{ fontSize:13.5, color:T.textMid, margin:0, lineHeight:1.65, maxWidth:380, marginInline:"auto" }}>
          Join our agent programme — earn a percentage of every subscription payment from businesses you refer. Monthly payouts, real-time tracking.
        </p>
      </div>

      <BenRow delay={60}  icon="💰" title="Earn on every payment"  desc="Commission automatically logged for each confirmed subscription payment your referral makes." />
      <BenRow delay={110} icon="📊" title="Real-time dashboard"    desc="Track referrals, active subscribers, and pending commissions in one place." />
      <BenRow delay={160} icon="📅" title="Monthly settlement"     desc="Commissions calculated and paid out at month end, with a full ledger history." />
      <BenRow delay={210} icon="🏷️" title="Flexible rates"         desc="Rates from 10% to 40% — set at registration based on your agreement with Manereja." />

      <button onClick={onStart}
        style={{ width:"100%", marginTop:22, padding:"13px 0", background:T.accent, color:"#fff", border:"none", borderRadius:12, fontSize:14.5, fontWeight:700, cursor:"pointer", fontFamily:T.font, boxShadow:`0 4px 14px ${T.accent}44` }}>
        Register Now →
      </button>
    </Slide>
  </AuthShell>
);

// ═════════════════════════════════════════════════════════════════════════════
//  SCREEN 3 — REG FORM
// ═════════════════════════════════════════════════════════════════════════════
const validateReg = (f) => {
  const e = {};
  if (!f.name.trim() || f.name.trim().length < 2) e.name = "Enter your full name (2+ characters)";
  if (!f.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(f.email)) e.email = "Enter a valid email address";
  if (!f.phone.trim()) e.phone = "Enter your phone number";
  if (!f.password || f.password.length < 8) e.password = "Password must be at least 8 characters";
  else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(f.password)) e.password = "Needs uppercase, lowercase & a number";
  if (f.password !== f.confirm) e.confirm = "Passwords do not match";
  if (!f.agreed) e.agreed = "You must accept the terms to continue";
  return e;
};

const RegForm = ({ onBack, onSuccess }) => {
  const [form, setForm] = useState({ name:"", email:"", phone:"", region:"", password:"", confirm:"", commissionRate:0.10, notes:"", agreed:false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const set = k => v => setForm(f=>({...f,[k]:v}));

  const submit = async () => {
    const errs = validateReg(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setApiError(""); setLoading(true);
    try {
      const d = await api("/agents/register", null, {
        method:"POST",
        body: JSON.stringify({ name:form.name.trim(), email:form.email.trim().toLowerCase(), phone:form.phone.trim(), region:form.region.trim(), password:form.password, commissionRate:form.commissionRate, notes:form.notes.trim() }),
      });
      onSuccess({ agentId:d.agentId, email:form.email.trim().toLowerCase() });
    } catch(e) { setApiError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <AuthShell wide>
      <Slide>
        <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:T.textMid, fontSize:13, fontFamily:T.font, display:"flex", alignItems:"center", gap:5, marginBottom:16, padding:0 }}>← Back</button>
        <StepDots current={0} total={3} />

        <h2 style={{ fontFamily:T.fontDisplay, fontSize:22, color:T.text, margin:"0 0 5px", letterSpacing:"-0.3px" }}>Create your agent account</h2>
        <p style={{ fontSize:13, color:T.textSoft, margin:"0 0 20px", lineHeight:1.5 }}>Fill in your details. We'll send a verification code to your email.</p>

        {apiError && (
          <div style={{ background:T.dangerSoft, border:`1px solid #E8C5BC`, borderRadius:8, padding:"10px 14px", fontSize:13, color:T.danger, marginBottom:16, fontWeight:500 }}>
            ⚠ {apiError}
          </div>
        )}

        {/* Personal */}
        <div style={{ fontSize:10.5, fontWeight:700, color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:10 }}>Personal Details</div>
        <AuthField label="Full Name *"   value={form.name}   onChange={set("name")}   placeholder="Juma Mwangi"        icon="👤" error={errors.name} />
        <AuthField label="Email *"       type="email" value={form.email}  onChange={set("email")}  placeholder="juma@example.com"   icon="✉️" error={errors.email} />
        <AuthField label="Phone *"       value={form.phone}  onChange={set("phone")}  placeholder="+255 6xx xxx xxx"   icon="📱" error={errors.phone} />
        <AuthField label="Region"        value={form.region} onChange={set("region")} placeholder="e.g. Dar es Salaam" icon="📍" />

        <div style={{ height:1, background:T.borderSoft, margin:"4px 0 16px" }} />

        {/* Commission */}
        <div style={{ fontSize:10.5, fontWeight:700, color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:10 }}>Commission</div>
        <RatePicker value={form.commissionRate} onChange={set("commissionRate")} />

        <div style={{ height:1, background:T.borderSoft, margin:"4px 0 16px" }} />

        {/* Password */}
        <div style={{ fontSize:10.5, fontWeight:700, color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:10 }}>Security</div>
        <AuthField label="Password *" type={showPw?"text":"password"} value={form.password} onChange={set("password")} placeholder="Min 8 chars, uppercase & number" icon="🔒" error={errors.password}
          suffix={<button type="button" onClick={()=>setShowPw(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:15, color:T.textSoft, padding:0 }}>{showPw?"🙈":"👁️"}</button>} />
        <AuthField label="Confirm Password *" type={showCf?"text":"password"} value={form.confirm} onChange={set("confirm")} placeholder="Re-enter password" icon="🔒" error={errors.confirm}
          suffix={<button type="button" onClick={()=>setShowCf(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:15, color:T.textSoft, padding:0 }}>{showCf?"🙈":"👁️"}</button>} />

        {/* Notes */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Notes (optional)</div>
          <textarea value={form.notes} onChange={e=>set("notes")(e.target.value)} rows={2} placeholder="Any additional info for the team…"
            style={{ width:"100%", padding:"9px 13px", border:`1.5px solid ${T.border}`, borderRadius:8, fontSize:13, fontFamily:T.font, color:T.text, background:T.bg, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
        </div>

        {/* Terms */}
        <div style={{ display:"flex", gap:11, cursor:"pointer", marginBottom:errors.agreed?4:16, alignItems:"flex-start" }} onClick={()=>set("agreed")(!form.agreed)}>
          <div style={{ width:20, height:20, flexShrink:0, borderRadius:5, marginTop:1, border:`1.5px solid ${form.agreed?T.accent:T.border}`, background:form.agreed?T.accent:T.surface, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
            {form.agreed && <span style={{ color:"#fff", fontSize:12, fontWeight:800, lineHeight:1 }}>✓</span>}
          </div>
          <span style={{ fontSize:12.5, color:T.textMid, lineHeight:1.55, userSelect:"none" }}>
            I agree to Manereja's <span style={{ color:T.accent, fontWeight:700 }}>Agent Terms & Conditions</span> and confirm I'm authorised to refer businesses to the platform.
          </span>
        </div>
        {errors.agreed && <div style={{ fontSize:11.5, color:T.danger, marginBottom:12, fontWeight:500 }}>⚠ {errors.agreed}</div>}

        <button onClick={submit} disabled={loading}
          style={{ width:"100%", padding:"12px", background:loading?T.textSoft:T.accent, color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:T.font, display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"background 0.15s" }}>
          {loading ? <><BtnSpinner />Registering…</> : "Register & Send OTP →"}
        </button>
      </Slide>
    </AuthShell>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  SCREEN 4 — OTP VERIFICATION
// ═════════════════════════════════════════════════════════════════════════════
const RegOtp = ({ agentId, email, onVerified }) => {
  const [otpKey,    setOtpKey]    = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resentOk,  setResentOk]  = useState(false);
  const [otpError,  setOtpError]  = useState("");
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(()=>setCountdown(c=>c-1), 1000);
    return ()=>clearTimeout(t);
  }, [countdown]);

  const verify = useCallback(async (otp) => {
    setVerifying(true); setOtpError("");
    try {
      await api("/agents/verify-otp", null, { method:"POST", body:JSON.stringify({ agentId, otp }) });
      onVerified();
    } catch(e) { setOtpError(e.message || "Invalid or expired code. Please try again."); }
    finally { setVerifying(false); }
  }, [agentId]);

  const resend = async () => {
    if (resending || countdown > 0) return;
    setResending(true); setResentOk(false); setOtpError("");
    try {
      await api("/agents/resend-otp", null, { method:"POST", body:JSON.stringify({ agentId }) });
      setResentOk(true); setCountdown(120); setOtpKey(k=>k+1);
    } catch(e) { setOtpError(e.message || "Failed to resend."); }
    finally { setResending(false); }
  };

  const mm = String(Math.floor(countdown/60)).padStart(2,"0");
  const ss = String(countdown%60).padStart(2,"0");

  return (
    <AuthShell>
      <Slide>
        <StepDots current={1} total={3} />

        <div style={{ textAlign:"center", marginBottom:22 }}>
          <div style={{ width:68, height:68, borderRadius:"50%", background:`linear-gradient(135deg, ${T.accent}, ${T.accentHov})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 16px", boxShadow:`0 8px 24px ${T.accent}44` }}>✉️</div>
          <h2 style={{ fontFamily:T.fontDisplay, fontSize:22, color:T.text, margin:"0 0 8px", letterSpacing:"-0.3px" }}>Check your inbox</h2>
          <p style={{ fontSize:13, color:T.textMid, margin:0, lineHeight:1.6 }}>
            We sent a 6-digit code to<br/>
            <strong style={{ color:T.text }}>{email}</strong>
          </p>
        </div>

        <div style={{ marginBottom:20 }}>
          <OtpBoxes onComplete={verify} error={otpError} resetKey={otpKey} />
        </div>

        <button
          style={{ width:"100%", padding:"11px", background:T.accent, color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, fontFamily:T.font, display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:18, opacity:verifying?0.7:1, cursor:verifying?"not-allowed":"pointer" }}
          disabled={verifying}>
          {verifying ? <><BtnSpinner />Verifying…</> : "Verify & Activate Account"}
        </button>

        <div style={{ height:1, background:T.borderSoft, marginBottom:18 }} />

        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:13, color:T.textSoft, marginBottom:10 }}>Didn't receive the code?</div>
          {countdown > 0 ? (
            <div style={{ fontSize:13, color:T.textMid, fontWeight:600 }}>
              Resend in <span style={{ color:T.accent, fontFamily:"monospace" }}>{mm}:{ss}</span>
            </div>
          ) : (
            <button onClick={resend} disabled={resending}
              style={{ background:"none", border:`1.5px solid ${T.accent}`, borderRadius:9, padding:"8px 22px", color:T.accent, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:T.font, display:"inline-flex", alignItems:"center", gap:7 }}>
              {resending ? <><BtnSpinner color={T.accent} />Sending…</> : "↺ Resend code"}
            </button>
          )}
          {resentOk && (
            <div style={{ marginTop:10, padding:"9px 12px", background:T.successSoft, border:`1px solid #B8DABC`, borderRadius:8, fontSize:12, color:T.success, fontWeight:500 }}>
              ✅ New code sent — check your inbox (and spam folder).
            </div>
          )}
        </div>

        <div style={{ marginTop:18, padding:"11px 13px", background:T.bg, border:`1px solid ${T.border}`, borderRadius:9, display:"flex", gap:9, alignItems:"flex-start" }}>
          <span style={{ fontSize:14, flexShrink:0 }}>ℹ️</span>
          <span style={{ fontSize:12, color:T.textSoft, lineHeight:1.55 }}>
            Check spam/junk if you don't see it. Code is valid for <strong>10 minutes</strong>.
          </span>
        </div>
      </Slide>
    </AuthShell>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  SCREEN 5 — REG SUCCESS
// ═════════════════════════════════════════════════════════════════════════════
const RegSuccess = ({ email, onGoLogin }) => (
  <AuthShell>
    <Slide>
      <StepDots current={2} total={3} />
      <div style={{ textAlign:"center", paddingBottom:8 }}>
        <div style={{ width:74, height:74, borderRadius:"50%", background:`linear-gradient(135deg, ${T.success}, #3D6B4F)`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", boxShadow:`0 8px 28px ${T.success}44`, animation:"popIn 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
          <span style={{ fontSize:30, color:"#fff" }}>✓</span>
        </div>
        <h2 style={{ fontFamily:T.fontDisplay, fontSize:24, color:T.text, margin:"0 0 8px", letterSpacing:"-0.4px" }}>You're in! 🎉</h2>
        <p style={{ fontSize:13.5, color:T.textMid, lineHeight:1.65, margin:"0 0 20px" }}>
          <strong style={{ color:T.text }}>{email}</strong> is verified.<br/>Your agent account is now active.
        </p>
        <div style={{ background:T.accentSoft, border:`1px solid ${T.accent}22`, borderRadius:12, padding:"15px 18px", textAlign:"left", marginBottom:22 }}>
          <div style={{ fontSize:11, fontWeight:700, color:T.accent, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:10 }}>What happens next</div>
          {[["🔍","Application reviewed by our team (within 24h)"],["📧","Confirmed commission rate sent to your email"],["🔗","Start sharing your referral link"],["💰","Track everything in your agent dashboard"]].map(([icon,text],i) => (
            <div key={i} style={{ display:"flex", gap:9, marginBottom:i<3?8:0, fontSize:13, color:T.text, lineHeight:1.5 }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
        <button onClick={onGoLogin}
          style={{ width:"100%", padding:"12px", background:T.accent, color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:T.font, boxShadow:`0 4px 14px ${T.accent}44` }}>
          Sign in to Portal →
        </button>
      </div>
    </Slide>
  </AuthShell>
);

// ═════════════════════════════════════════════════════════════════════════════
//  PERIOD HELPERS
// ═════════════════════════════════════════════════════════════════════════════
const toPeriod = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}`;
const periodLabel = (period) => {
  const [y,m] = period.split("-");
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m-1]} ${y}`;
};

// ═════════════════════════════════════════════════════════════════════════════
//  PORTAL SECTIONS  (unchanged from original)
// ═════════════════════════════════════════════════════════════════════════════
const NAV = [
  { id:"overview",    icon:"◈", label:"Overview" },
  { id:"subscribers", icon:"◎", label:"My Subscribers" },
  { id:"commissions", icon:"◇", label:"Commissions" },
  { id:"profile",     icon:"◉", label:"My Profile" },
];

const Overview = ({ agent, token, toast }) => {
  const [stats, setStats] = useState(null);
  const [ledger, setLedger] = useState(null);
  const [loading, setLoading] = useState(true);
  const period = toPeriod();

  useEffect(() => {
    if (!agent?._id) return;
    Promise.all([
      api(`/agents/${agent._id}`, token),
      api(`/agents/${agent._id}/commissions/ledger?period=${period}`, token),
    ])
      .then(([a, l]) => { setStats(a.agent||agent); setLedger(l); })
      .catch(e => toast(e.message,"error"))
      .finally(() => setLoading(false));
  }, [agent?._id]);

  if (loading) return <PageSpinner />;
  const netOwed=ledger?.netOwed??0, totalDue=ledger?.totalDue??0, totalPaidThisMonth=ledger?.totalPaid??0;

  return (
    <div>
      <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 4px" }}>Welcome back, {agent?.name?.split(" ")[0]} 👋</h1>
      <p style={{ color:T.textSoft, fontSize:13, margin:"0 0 28px" }}>Here's a snapshot of your performance this month — {periodLabel(period)}.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:14, marginBottom:28 }}>
        <StatCard label="Total Referrals"   value={stats?.totalReferrals??0}                                              icon="📋" />
        <StatCard label="Lifetime Earned"   value={`TZS ${(stats?.totalCommissionEarned??0).toLocaleString()}`}           icon="💰" accent={T.warnSoft} />
        <StatCard label="This Month Due"    value={`TZS ${totalDue.toLocaleString()}`}                                    icon="📅" accent={T.infoSoft} />
        <StatCard label="This Month Unpaid" value={`TZS ${netOwed.toLocaleString()}`}                                     icon="⏳" accent={netOwed>0?T.dangerSoft:T.successSoft} />
        <StatCard label="Commission Rate"   value={`${((stats?.commissionRate??0.10)*100).toFixed(0)}%`}                  icon="🏷️" accent={T.accentSoft} />
      </div>
      <Card>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontWeight:700, fontSize:14, color:T.text }}>Commission entries — {periodLabel(period)}</div>
          {totalPaidThisMonth>0 && <Badge label={`TZS ${totalPaidThisMonth.toLocaleString()} paid`} color={T.success} bg={T.successSoft} />}
        </div>
        {!ledger?.entries?.length ? <EmptyState icon="📭" text="No commission entries for this month yet." /> : (
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead><tr style={{ background:T.bg, borderBottom:`1px solid ${T.border}` }}>{["Customer","Package","Payment","Your Commission","Status"].map(h=><th key={h} style={{ padding:"9px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>)}</tr></thead>
            <tbody>
              {ledger.entries.map((e,i) => (
                <tr key={e._id} style={{ borderBottom:`1px solid ${T.borderSoft}`, background:i%2===0?T.surface:T.bg }}>
                  <td style={{ padding:"10px 14px", color:T.text, fontWeight:600 }}>{e.userId?.name||"—"}{e.userId?.email&&<div style={{ fontSize:11, color:T.textSoft }}>{e.userId.email}</div>}</td>
                  <td style={{ padding:"10px 14px", color:T.textMid }}>{e.packageId?.displayName||"—"}</td>
                  <td style={{ padding:"10px 14px", color:T.text }}>TZS {(e.paymentAmount||0).toLocaleString()}</td>
                  <td style={{ padding:"10px 14px", color:T.accent, fontWeight:700 }}>TZS {(e.commissionDue||0).toLocaleString()}</td>
                  <td style={{ padding:"10px 14px" }}>{e.isPaid?<Badge label="Paid" color={T.success} bg={T.successSoft}/>:<Badge label="Pending" color={T.warn} bg={T.warnSoft}/>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

const Subscribers = ({ agent, token, toast }) => {
  const [subs, setSubs]                 = useState([]);
  const [loading, setLoading]           = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected]         = useState(null);

  const load = useCallback(() => {
    if (!agent?._id) return;
    setLoading(true);
    api(`/agents/${agent._id}/subscriptions${statusFilter?`?status=${statusFilter}`:""}`, token)
      .then(d=>setSubs(d.subscriptions||[]))
      .catch(e=>toast(e.message,"error"))
      .finally(()=>setLoading(false));
  }, [agent?._id, statusFilter, token]);

  useEffect(()=>{load();},[load]);

  const counts = { active:0, trial:0, expired:0, cancelled:0 };
  subs.forEach(s=>{ if(counts[s.status]!==undefined) counts[s.status]++; });

  return (
    <div>
      <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 6px" }}>My Subscribers</h1>
      <p style={{ color:T.textSoft, fontSize:13, margin:"0 0 24px" }}>All businesses you've referred to Manereja.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:12, marginBottom:24 }}>
        {[["Active",T.success,T.successSoft],["Trial",T.info,T.infoSoft],["Expired",T.textSoft,T.bg],["Cancelled",T.danger,T.dangerSoft]].map(([l,c,bg])=>(
          <div key={l} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 18px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:6 }}>{l}</div>
            <div style={{ fontFamily:T.fontDisplay, fontSize:24, color:c }}>{counts[l.toLowerCase()]}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        {["","active","trial","expired","cancelled"].map(s=>(
          <Btn key={s} size="sm" variant={statusFilter===s?"primary":"secondary"} onClick={()=>setStatusFilter(s)}>{s||"All"}</Btn>
        ))}
      </div>
      <Card style={{ padding:0, overflow:"hidden" }}>
        {loading?<PageSpinner/>:subs.length===0?<EmptyState icon="👤" text="No subscribers found for this filter."/>:(
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead><tr style={{ background:T.bg, borderBottom:`1px solid ${T.border}` }}>{["Customer","Package","Status","Start","Expiry","Total Paid","Actions"].map(h=><th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>)}</tr></thead>
            <tbody>
              {subs.map((s,i)=>{
                const soon=s.expiryDate&&!["expired","cancelled"].includes(s.status)&&(new Date(s.expiryDate)-new Date())<7*86400000;
                return (
                  <tr key={s._id||s.id} style={{ borderBottom:`1px solid ${T.borderSoft}`, background:i%2===0?T.surface:T.bg }}>
                    <td style={{ padding:"11px 16px", color:T.text, fontWeight:600 }}>{s.userId?.name||"—"}{s.userId?.email&&<div style={{ fontSize:11, color:T.textSoft }}>{s.userId.email}</div>}</td>
                    <td style={{ padding:"11px 16px", color:T.textMid }}>{s.packageId?.displayName||"—"}</td>
                    <td style={{ padding:"11px 16px" }}>{statusBadge(s.status)}</td>
                    <td style={{ padding:"11px 16px", color:T.textSoft }}>{s.startDate?new Date(s.startDate).toLocaleDateString():"—"}</td>
                    <td style={{ padding:"11px 16px" }}><span style={{ color:new Date(s.expiryDate)<new Date()?T.danger:soon?T.warn:T.textSoft, fontWeight:soon?600:400 }}>{s.expiryDate?new Date(s.expiryDate).toLocaleDateString():"—"}{soon&&<span style={{ fontSize:10, marginLeft:4 }}>⚠️ soon</span>}</span></td>
                    <td style={{ padding:"11px 16px", color:T.accent, fontWeight:600 }}>TZS {(s.totalPaid||0).toLocaleString()}</td>
                    <td style={{ padding:"11px 16px" }}><Btn size="sm" variant="secondary" onClick={()=>setSelected(s)}>Details</Btn></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
      {selected&&(
        <Modal title={selected.userId?.name||"Subscriber Details"} onClose={()=>setSelected(null)}>
          {[["Email",selected.userId?.email||"—"],["Package",selected.packageId?.displayName||"—"],["Status",selected.status],["Start Date",selected.startDate?new Date(selected.startDate).toLocaleDateString():"—"],["Expiry Date",selected.expiryDate?new Date(selected.expiryDate).toLocaleDateString():"—"],["Is Trial",selected.isTrial?"Yes":"No"],["Total Paid",`TZS ${(selected.totalPaid||0).toLocaleString()}`],["Last Payment",selected.lastPaymentDate?new Date(selected.lastPaymentDate).toLocaleDateString():"—"],["Your Rate",`${((selected.acquiredBy?.commissionRate??0.10)*100).toFixed(0)}%`],["Your Earnings",`TZS ${((selected.totalPaid||0)*(selected.acquiredBy?.commissionRate??0.10)).toLocaleString()}`]].map(([l,v])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${T.borderSoft}`, fontSize:13 }}>
              <span style={{ color:T.textMid, fontWeight:600 }}>{l}</span><span style={{ color:T.text }}>{String(v)}</span>
            </div>
          ))}
          <div style={{ marginTop:16 }}><Btn variant="secondary" onClick={()=>setSelected(null)}>Close</Btn></div>
        </Modal>
      )}
    </div>
  );
};

const Commissions = ({ agent, token, toast }) => {
  const periods = Array.from({length:6},(_,i)=>{ const d=new Date(); d.setMonth(d.getMonth()-i); return toPeriod(d); });
  const [period, setPeriod] = useState(periods[0]);
  const [ledger, setLedger] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(()=>{
    if(!agent?._id) return;
    setLoading(true);
    api(`/agents/${agent._id}/commissions/ledger?period=${period}`,token)
      .then(d=>setLedger(d)).catch(e=>toast(e.message,"error")).finally(()=>setLoading(false));
  },[agent?._id,period,token]);

  useEffect(()=>{load();},[load]);

  const totalDue=ledger?.totalDue??0, totalPaid=ledger?.totalPaid??0, netOwed=ledger?.netOwed??0, entries=ledger?.entries??[];

  return (
    <div>
      <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 6px" }}>Commissions</h1>
      <p style={{ color:T.textSoft, fontSize:13, margin:"0 0 20px" }}>Your commission ledger — one entry per payment confirmed.</p>
      <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
        {periods.map(p=><Btn key={p} size="sm" variant={period===p?"primary":"secondary"} onClick={()=>setPeriod(p)}>{periodLabel(p)}</Btn>)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:14, marginBottom:24 }}>
        <StatCard label="Total Due"  value={`TZS ${totalDue.toLocaleString()}`}  icon="📋" accent={T.infoSoft} />
        <StatCard label="Total Paid" value={`TZS ${totalPaid.toLocaleString()}`} icon="✅" accent={T.successSoft} />
        <StatCard label="Still Owed" value={`TZS ${netOwed.toLocaleString()}`}   icon="⏳" accent={netOwed>0?T.warnSoft:T.successSoft} />
        <StatCard label="Entries"    value={entries.length}                       icon="📄" />
      </div>
      {netOwed>0&&<div style={{ background:T.warnSoft, border:`1px solid #E8D4B0`, borderRadius:10, padding:"12px 18px", marginBottom:20, fontSize:13, color:T.warn, fontWeight:600 }}>⏳ TZS {netOwed.toLocaleString()} pending for {periodLabel(period)}. Manereja pays out at end of month.</div>}
      {netOwed===0&&totalDue>0&&<div style={{ background:T.successSoft, border:`1px solid #B8DABC`, borderRadius:10, padding:"12px 18px", marginBottom:20, fontSize:13, color:T.success, fontWeight:600 }}>✅ All commissions for {periodLabel(period)} have been paid out.</div>}
      <Card style={{ padding:0, overflow:"hidden" }}>
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${T.border}`, fontWeight:700, fontSize:14, color:T.text }}>Ledger — {periodLabel(period)}</div>
        {loading?<PageSpinner/>:entries.length===0?<EmptyState icon="📭" text="No commission entries for this period."/>:(
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead><tr style={{ background:T.bg, borderBottom:`1px solid ${T.border}` }}>{["Date","Customer","Package","Payment","Rate","Commission","Status"].map(h=><th key={h} style={{ padding:"9px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>)}</tr></thead>
            <tbody>
              {entries.map((e,i)=>(
                <tr key={e._id} style={{ borderBottom:`1px solid ${T.borderSoft}`, background:i%2===0?T.surface:T.bg }}>
                  <td style={{ padding:"10px 14px", color:T.textSoft, whiteSpace:"nowrap" }}>{e.createdAt?new Date(e.createdAt).toLocaleDateString():"—"}</td>
                  <td style={{ padding:"10px 14px", color:T.text, fontWeight:600 }}>{e.userId?.name||"—"}{e.userId?.email&&<div style={{ fontSize:11, color:T.textSoft }}>{e.userId.email}</div>}</td>
                  <td style={{ padding:"10px 14px", color:T.textMid }}>{e.packageId?.displayName||"—"}</td>
                  <td style={{ padding:"10px 14px", color:T.text }}>TZS {(e.paymentAmount||0).toLocaleString()}</td>
                  <td style={{ padding:"10px 14px", color:T.textMid }}>{((e.commissionRate||0)*100).toFixed(0)}%</td>
                  <td style={{ padding:"10px 14px", color:T.accent, fontWeight:700 }}>TZS {(e.commissionDue||0).toLocaleString()}</td>
                  <td style={{ padding:"10px 14px" }}>{e.isPaid?(<div><Badge label="Paid" color={T.success} bg={T.successSoft}/>{e.paidAt&&<div style={{ fontSize:10, color:T.textSoft, marginTop:3 }}>{new Date(e.paidAt).toLocaleDateString()}</div>}</div>):<Badge label="Pending" color={T.warn} bg={T.warnSoft}/>}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background:T.bg, borderTop:`2px solid ${T.border}` }}>
                <td colSpan={5} style={{ padding:"11px 14px", fontWeight:700, fontSize:13, color:T.text }}>Total</td>
                <td style={{ padding:"11px 14px", color:T.accent, fontWeight:700, fontSize:14 }}>TZS {totalDue.toLocaleString()}</td>
                <td style={{ padding:"11px 14px" }}><span style={{ fontSize:12, color:T.textMid }}>{entries.filter(e=>e.isPaid).length}/{entries.length} paid</span></td>
              </tr>
            </tfoot>
          </table>
        )}
      </Card>
    </div>
  );
};

const Profile = ({ agent, token, toast, onAgentUpdate }) => {
  const [form, setForm]     = useState({ name:"", email:"", phone:"", region:"", notes:"" });
  const [pwForm, setPwForm] = useState({ currentPassword:"", newPassword:"", confirmPassword:"" });
  const [loading, setLoading]     = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(()=>{ if(agent) setForm({ name:agent.name||"", email:agent.email||"", phone:agent.phone||"", region:agent.region||"", notes:agent.notes||"" }); },[agent]);

  const saveProfile = async () => {
    setLoading(true);
    try {
      const d = await api(`/agents/${agent._id}`,token,{ method:"PATCH", body:JSON.stringify({ name:form.name, phone:form.phone, region:form.region, notes:form.notes }) });
      toast("Profile updated"); if(onAgentUpdate) onAgentUpdate(d.agent);
    } catch(e){ toast(e.message,"error"); } finally{ setLoading(false); }
  };

  const changePassword = async () => {
    if(pwForm.newPassword!==pwForm.confirmPassword) return toast("Passwords don't match","error");
    if(pwForm.newPassword.length<6) return toast("Min 6 characters","error");
    setPwLoading(true);
    try {
      await api(`/agents/${agent._id}/change-password`,token,{ method:"POST", body:JSON.stringify({ currentPassword:pwForm.currentPassword, newPassword:pwForm.newPassword }) });
      toast("Password changed"); setPwForm({ currentPassword:"", newPassword:"", confirmPassword:"" });
    } catch(e){ toast(e.message,"error"); } finally{ setPwLoading(false); }
  };

  return (
    <div>
      <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 6px" }}>My Profile</h1>
      <p style={{ color:T.textSoft, fontSize:13, margin:"0 0 28px" }}>Manage your agent account details.</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, maxWidth:860 }}>
        <Card>
          <div style={{ fontWeight:700, fontSize:14, color:T.text, marginBottom:20 }}>Account Details</div>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24, padding:"14px 16px", background:T.accentSoft, borderRadius:10 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:"#fff" }}>🤝</div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:T.text }}>{agent?.name}</div>
              <div style={{ fontSize:12, color:T.textMid }}>Commission Agent · {((agent?.commissionRate??0.10)*100).toFixed(0)}% rate</div>
            </div>
          </div>
          <PortalInput label="Full Name" value={form.name}   onChange={v=>setForm(f=>({...f,name:v}))} />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Email</div>
            <div style={{ padding:"9px 13px", background:T.bg, border:`1.5px solid ${T.border}`, borderRadius:8, fontSize:13, color:T.textMid }}>{form.email} <span style={{ fontSize:11, color:T.textSoft }}>(cannot change)</span></div>
          </div>
          <PortalInput label="Phone"  value={form.phone}  onChange={v=>setForm(f=>({...f,phone:v}))}  placeholder="+255 6xx xxx xxx" />
          <PortalInput label="Region" value={form.region} onChange={v=>setForm(f=>({...f,region:v}))} placeholder="e.g. Dar es Salaam" />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Notes</div>
            <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} rows={3}
              style={{ width:"100%", padding:"9px 13px", border:`1.5px solid ${T.border}`, borderRadius:8, fontSize:13, fontFamily:T.font, color:T.text, background:T.bg, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
          </div>
          <Btn onClick={saveProfile} disabled={loading}>{loading?"Saving…":"Save Changes"}</Btn>
        </Card>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <Card>
            <div style={{ fontWeight:700, fontSize:14, color:T.text, marginBottom:16 }}>Your Stats</div>
            {[["Total Referrals",agent?.totalReferrals??0],["Lifetime Earned",`TZS ${(agent?.totalCommissionEarned??0).toLocaleString()}`],["Commission Rate",`${((agent?.commissionRate??0.10)*100).toFixed(0)}%`],["Region",agent?.region||"—"],["Member Since",agent?.createdAt?new Date(agent.createdAt).toLocaleDateString():"—"]].map(([l,v])=>(
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${T.borderSoft}`, fontSize:13 }}>
                <span style={{ color:T.textMid, fontWeight:600 }}>{l}</span><span style={{ color:T.text, fontWeight:500 }}>{String(v)}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontWeight:700, fontSize:14, color:T.text, marginBottom:16 }}>Change Password</div>
            <PortalInput label="Current Password" type="password" value={pwForm.currentPassword} onChange={v=>setPwForm(f=>({...f,currentPassword:v}))} />
            <PortalInput label="New Password"     type="password" value={pwForm.newPassword}     onChange={v=>setPwForm(f=>({...f,newPassword:v}))} />
            <PortalInput label="Confirm New"      type="password" value={pwForm.confirmPassword} onChange={v=>setPwForm(f=>({...f,confirmPassword:v}))} />
            <Btn onClick={changePassword} disabled={pwLoading} variant="secondary">{pwLoading?"Updating…":"Update Password"}</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  ROOT — STAGE ROUTER
// ═════════════════════════════════════════════════════════════════════════════
// authStage: "login" | "reg-welcome" | "reg-form" | "reg-otp" | "reg-success"

export default function AgentPortal() {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return null;
    const t = sessionStorage.getItem("agent_token");
    return t && t !== "null" && t !== "undefined" ? t : null;
  });
  const [agent, setAgent]         = useState(null);
  const [section, setSection]     = useState("overview");
  const [toast, setToast]         = useState(null);
  const [authStage, setAuthStage] = useState("login");
  const [regData, setRegData]     = useState({ agentId:"", email:"" });
  const [resetEmail, setResetEmail] = useState("");
const [resetOtp,   setResetOtp]   = useState("");

  const showToast = useCallback((msg, type="success") => setToast({ msg, type }), []);

  useEffect(() => {
    if (token && !agent) {
      api("/agents/me", token)
        .then(d => setAgent(d.agent))
        .catch(() => { sessionStorage.removeItem("agent_token"); setToken(null); });
    }
  }, [token]);

  const logout = () => {
    sessionStorage.removeItem("agent_token");
    setToken(null); setAgent(null); setSection("overview"); setAuthStage("login");
  };

  // ── Unauthenticated — route through auth stages ───────────────────────────
  if (!token) {
    if (authStage === "login") return (
     <LoginScreen
  onLogin={(t, a) => { setToken(t); setAgent(a); }}
  onRegister={() => setAuthStage("reg-welcome")}
  onForgot={() => setAuthStage("forgot-email")}
/>
    );
    if (authStage === "reg-welcome") return (
      <RegWelcome
        onBack={() => setAuthStage("login")}
        onStart={() => setAuthStage("reg-form")}
      />
    );
    if (authStage === "reg-form") return (
      <RegForm
        onBack={() => setAuthStage("reg-welcome")}
        onSuccess={({ agentId, email }) => { setRegData({ agentId, email }); setAuthStage("reg-otp"); }}
      />
    );
    if (authStage === "reg-otp") return (
      <RegOtp
        agentId={regData.agentId}
        email={regData.email}
        onVerified={() => setAuthStage("reg-success")}
      />
    );
    if (authStage === "reg-success") return (
      <RegSuccess
        email={regData.email}
        onGoLogin={() => setAuthStage("login")}
      />
    );

    if (authStage === "forgot-email") return (
  <ForgotEmail
    onBack={() => setAuthStage("login")}
    onSent={(email) => { setResetEmail(email); setAuthStage("forgot-otp"); }}
  />
);
if (authStage === "forgot-otp") return (
  <ForgotOtp
    email={resetEmail}
    onBack={() => setAuthStage("forgot-email")}
    onVerified={(otp) => { setResetOtp(otp); setAuthStage("forgot-pw"); }}
  />
);
if (authStage === "forgot-pw") return (
  <ForgotNewPassword
    email={resetEmail}
    otp={resetOtp}
    onDone={() => setAuthStage("forgot-done")}
  />
);
if (authStage === "forgot-done") return (
  <ResetSuccess onGoLogin={() => setAuthStage("login")} />
);
  }

  // ── Authenticated — portal ────────────────────────────────────────────────
  const sectionProps = { agent, token, toast: showToast };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ display:"flex", minHeight:"100vh", fontFamily:T.font, background:T.bg }}>
        {/* Sidebar */}
        <aside style={{ width:220, background:T.sidebar, display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, bottom:0, zIndex:10 }}>
          <div style={{ padding:"24px 20px 16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
              <div style={{ width:34, height:34, background:"#3C3730", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🤝</div>
              <div>
                <div style={{ color:"#F7F6F3", fontWeight:700, fontSize:13 }}>Manereja</div>
                <div style={{ color:"#7A746C", fontSize:11 }}>Agent Portal</div>
              </div>
            </div>
            {agent && (
              <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:10, padding:"10px 12px", marginBottom:20 }}>
                <div style={{ fontSize:12, color:"#F7F6F3", fontWeight:600, marginBottom:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{agent.name}</div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:11, color:"#7A746C" }}>{agent.region||"Agent"}</span>
                  <span style={{ fontSize:10, background:T.accent, color:"#fff", borderRadius:4, padding:"1px 6px", fontWeight:700 }}>{((agent.commissionRate??0.10)*100).toFixed(0)}%</span>
                </div>
              </div>
            )}
            <nav>
              {NAV.map(n => (
                <button key={n.id} onClick={()=>setSection(n.id)}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:8, border:"none", cursor:"pointer", marginBottom:2, textAlign:"left", background:section===n.id?"rgba(247,246,243,0.12)":"transparent", color:section===n.id?T.sidebarActive:T.sidebarText, fontSize:13, fontFamily:T.font, fontWeight:section===n.id?600:400, transition:"all 0.1s" }}>
                  <span style={{ fontSize:14, opacity:0.7 }}>{n.icon}</span>{n.label}
                </button>
              ))}
            </nav>
          </div>
          <div style={{ marginTop:"auto", padding:"16px 20px", borderTop:"1px solid #3C3730" }}>
            {agent && (
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:11, color:"#7A746C", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.5px" }}>Lifetime earned</div>
                <div style={{ fontFamily:T.fontDisplay, fontSize:18, color:T.accentSoft }}>TZS {(agent.totalCommissionEarned??0).toLocaleString()}</div>
                <div style={{ fontSize:11, color:"#7A746C", marginTop:4 }}>{agent.totalReferrals??0} referrals total</div>
              </div>
            )}
            <button onClick={logout}
              style={{ width:"100%", padding:"8px 12px", background:"transparent", border:"1px solid #3C3730", borderRadius:8, color:"#7A746C", fontSize:12, cursor:"pointer", fontFamily:T.font }}>
              Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ marginLeft:220, flex:1, padding:"36px 40px", minHeight:"100vh" }}>
          {section==="overview"    && <Overview    {...sectionProps} />}
          {section==="subscribers" && <Subscribers {...sectionProps} />}
          {section==="commissions" && <Commissions {...sectionProps} />}
          {section==="profile"     && <Profile     {...sectionProps} onAgentUpdate={setAgent} />}
        </main>

        {toast && <Toast msg={toast.msg} type={toast.type} onDone={()=>setToast(null)} />}
      </div>
    </>
  );
}