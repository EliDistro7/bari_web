'use client';
import { useState, useEffect, useCallback } from "react";

// ── CONFIG ────────────────────────────────────────────────────────────────────
const BASE =`${process.env.NEXT_PUBLIC_SERVER}/auth`

// ── THEME ─────────────────────────────────────────────────────────────────────
const T = {
  bg:        "#F7F6F3",
  surface:   "#FFFFFF",
  border:    "#E8E5DF",
  borderSoft:"#F0EDE8",
  text:      "#2C2925",
  textMid:   "#6B6560",
  textSoft:  "#A09A94",
  accent:    "#5C7A6B",   // sage green
  accentSoft:"#EEF3F0",
  accentHov: "#4A6558",
  danger:    "#C0533A",
  dangerSoft:"#FBF0ED",
  warn:      "#B07D3A",
  warnSoft:  "#FDF6EE",
  info:      "#3A6580",
  infoSoft:  "#EEF4F8",
  success:   "#4A7A5A",
  successSoft:"#EEF5F1",
  sidebar:   "#2C2925",
  sidebarText:"#C8C2BB",
  sidebarActive:"#F7F6F3",
  font:      "'Outfit', 'Helvetica Neue', sans-serif",
  fontDisplay:"'DM Serif Display', Georgia, serif",
};

// ── API HELPER ────────────────────────────────────────────────────────────────
const api = async (path, token, opts = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...opts,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
const Badge = ({ label, color = T.accent, bg = T.accentSoft }) => (
  <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 10px", borderRadius:20,
    background:bg, color, fontSize:11, fontWeight:600, letterSpacing:"0.3px" }}>
    {label}
  </span>
);

const statusBadge = (status) => {
  const map = {
    active:    [T.success, T.successSoft],
    trial:     [T.info,    T.infoSoft],
    expired:   [T.textSoft,"#F5F4F2"],
    cancelled: [T.danger,  T.dangerSoft],
    pending:   [T.warn,    T.warnSoft],
  };
  const [c, bg] = map[status] || [T.textMid, T.borderSoft];
  return <Badge label={status} color={c} bg={bg} />;
};

const Btn = ({ children, onClick, variant="primary", size="md", disabled=false, style={} }) => {
  const base = { border:"none", cursor: disabled ? "not-allowed" : "pointer", borderRadius:8,
    fontFamily:T.font, fontWeight:600, transition:"all 0.15s", opacity: disabled ? 0.55 : 1,
    display:"inline-flex", alignItems:"center", gap:6 };
  const sizes = { sm:{ padding:"5px 12px", fontSize:12 }, md:{ padding:"8px 18px", fontSize:13 }, lg:{ padding:"11px 24px", fontSize:14 } };
  const variants = {
    primary:  { background:T.accent, color:"#fff" },
    secondary:{ background:T.surface, color:T.text, border:`1.5px solid ${T.border}` },
    danger:   { background:T.dangerSoft, color:T.danger, border:`1.5px solid #E8C5BC` },
    ghost:    { background:"transparent", color:T.textMid },
  };
  return (
    <button style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, type="text", placeholder="", style={} }) => (
  <div style={{ marginBottom:14 }}>
    {label && <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</div>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width:"100%", padding:"9px 13px", border:`1.5px solid ${T.border}`, borderRadius:8,
        fontSize:13, color:T.text, background:T.bg, fontFamily:T.font, outline:"none", boxSizing:"border-box", ...style }} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom:14 }}>
    {label && <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</div>}
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width:"100%", padding:"9px 13px", border:`1.5px solid ${T.border}`, borderRadius:8,
        fontSize:13, color:T.text, background:T.bg, fontFamily:T.font, outline:"none" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Card = ({ children, style={} }) => (
  <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12,
    padding:24, boxShadow:"0 1px 4px rgba(44,41,37,0.06)", ...style }}>
    {children}
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(44,41,37,0.4)", zIndex:1000,
    display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
    <div style={{ background:T.surface, borderRadius:16, width:"100%", maxWidth:520,
      maxHeight:"85vh", overflow:"auto", boxShadow:"0 20px 60px rgba(44,41,37,0.2)" }}>
      <div style={{ padding:"20px 24px", borderBottom:`1px solid ${T.border}`,
        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:T.fontDisplay, fontSize:18, color:T.text }}>{title}</span>
        <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20,
          cursor:"pointer", color:T.textSoft, lineHeight:1 }}>×</button>
      </div>
      <div style={{ padding:24 }}>{children}</div>
    </div>
  </div>
);

const Toast = ({ msg, type="success", onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  const colors = { success:[T.success,T.successSoft], error:[T.danger,T.dangerSoft], info:[T.info,T.infoSoft] };
  const [c, bg] = colors[type] || colors.info;
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:2000, background:bg,
      border:`1px solid ${c}33`, borderRadius:10, padding:"12px 18px", color:c,
      fontSize:13, fontWeight:600, boxShadow:"0 4px 16px rgba(0,0,0,0.12)", maxWidth:320 }}>
      {msg}
    </div>
  );
};

const EmptyState = ({ icon, text }) => (
  <div style={{ textAlign:"center", padding:"48px 24px", color:T.textSoft }}>
    <div style={{ fontSize:32, marginBottom:12 }}>{icon}</div>
    <div style={{ fontSize:14 }}>{text}</div>
  </div>
);

const Spinner = () => (
  <div style={{ textAlign:"center", padding:40, color:T.textSoft, fontSize:13 }}>Loading…</div>
);

// ── STAT CARD ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon, accent }) => (
  <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12,
    padding:"20px 22px", boxShadow:"0 1px 4px rgba(44,41,37,0.05)" }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <div style={{ fontSize:11, fontWeight:700, color:T.textSoft, textTransform:"uppercase",
          letterSpacing:"0.5px", marginBottom:8 }}>{label}</div>
        <div style={{ fontFamily:T.fontDisplay, fontSize:30, color:T.text, lineHeight:1 }}>{value ?? "—"}</div>
        {sub && <div style={{ fontSize:12, color:T.textSoft, marginTop:6 }}>{sub}</div>}
      </div>
      <div style={{ width:40, height:40, borderRadius:10, background: accent || T.accentSoft,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{icon}</div>
    </div>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// SECTIONS
// ═════════════════════════════════════════════════════════════════════════════

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
const Dashboard = ({ token, toast }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/analytics/dashboard", token)
      .then(d => setData(d))
      .catch(e => toast(e.message, "error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!data) return <EmptyState icon="📊" text="Could not load dashboard data." />;

  const { users, subscriptions, revenue } = data;
  return (
    <div>
      <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 6px" }}>Dashboard</h1>
      <p style={{ color:T.textSoft, fontSize:13, margin:"0 0 28px" }}>Overview of your platform at a glance.</p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14, marginBottom:28 }}>
        <StatCard label="Total Users"        value={users?.total}         sub={`+${users?.newThisMonth} this month`} icon="👤" />
        <StatCard label="Active Subs"        value={subscriptions?.active} icon="✅" accent={T.successSoft} />
        <StatCard label="Trial Subs"         value={subscriptions?.trial}  icon="⏳" accent={T.infoSoft} />
        <StatCard label="Monthly Revenue"    value={`TZS ${(revenue?.monthly||0).toLocaleString()}`} icon="💰" accent={T.warnSoft} />
        <StatCard label="Expired"            value={subscriptions?.expired} icon="⚠️" accent={T.dangerSoft} />
        <StatCard label="Cancelled"          value={subscriptions?.cancelled} icon="🚫" />
      </div>

      {subscriptions?.byPackageType && (
        <Card>
          <div style={{ fontWeight:700, fontSize:14, color:T.text, marginBottom:16 }}>Subscriptions by Package Type</div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            {Object.entries(subscriptions.byPackageType).map(([type, count]) => (
              <div key={type} style={{ background:T.accentSoft, borderRadius:10, padding:"12px 20px", minWidth:120 }}>
                <div style={{ fontSize:11, color:T.textMid, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:4 }}>{type.replace("_"," ")}</div>
                <div style={{ fontFamily:T.fontDisplay, fontSize:24, color:T.accent }}>{count}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

// ── USERS ─────────────────────────────────────────────────────────────────────
const Users = ({ token, toast }) => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [emailModal, setEmailModal] = useState(null);
  const [emailForm, setEmailForm] = useState({ subject:"", message:"", type:"info" });
  const [actionLoading, setActionLoading] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit:20, ...(search && { search }) });
    api(`/users?${params}`, token)
      .then(d => { setUsers(d.users); setTotal(d.total); })
      .catch(e => toast(e.message, "error"))
      .finally(() => setLoading(false));
  }, [page, search, token]);

  useEffect(() => { load(); }, [load]);

  const suspend = async (id) => {
    setActionLoading(true);
    try {
      await api(`/users/${id}/suspend`, token, { method:"POST", body: JSON.stringify({ reason:"Suspended by admin" }) });
      toast("User suspended"); load();
    } catch(e) { toast(e.message,"error"); }
    finally { setActionLoading(false); }
  };

  const reactivate = async (id) => {
    setActionLoading(true);
    try {
      await api(`/users/${id}/reactivate`, token, { method:"POST", body:"{}" });
      toast("User reactivated"); load();
    } catch(e) { toast(e.message,"error"); }
    finally { setActionLoading(false); }
  };

  const sendEmail = async () => {
    if (!emailForm.subject || !emailForm.message) return toast("Subject and message required", "error");
    setActionLoading(true);
    try {
      await api("/email/send", token, { method:"POST", body: JSON.stringify({ userIds:[emailModal.id||emailModal._id], ...emailForm }) });
      toast("Email sent"); setEmailModal(null); setEmailForm({ subject:"", message:"", type:"info" });
    } catch(e) { toast(e.message,"error"); }
    finally { setActionLoading(false); }
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 4px" }}>Users</h1>
          <p style={{ color:T.textSoft, fontSize:13, margin:0 }}>{total} total users</p>
        </div>
      </div>

      <div style={{ marginBottom:16 }}>
        <Input placeholder="Search name, email, phone…" value={search}
          onChange={v => { setSearch(v); setPage(1); }} />
      </div>

      <Card style={{ padding:0, overflow:"hidden" }}>
        {loading ? <Spinner /> : users.length === 0 ? <EmptyState icon="👤" text="No users found." /> : (
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:T.bg, borderBottom:`1px solid ${T.border}` }}>
                {["Name","Email","Role","Subscription","Joined","Actions"].map(h => (
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700,
                    color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id||u.id} style={{ borderBottom:`1px solid ${T.borderSoft}`,
                  background: i%2===0 ? T.surface : T.bg }}>
                  <td style={{ padding:"11px 16px", color:T.text, fontWeight:600 }}>{u.name}</td>
                  <td style={{ padding:"11px 16px", color:T.textMid }}>{u.email||"—"}</td>
                  <td style={{ padding:"11px 16px" }}><Badge label={u.role} /></td>
                  <td style={{ padding:"11px 16px" }}><Badge label={u.subscriptionType} color={u.subscriptionType==="premium"?T.warn:T.textMid} bg={u.subscriptionType==="premium"?T.warnSoft:T.bg} /></td>
                  <td style={{ padding:"11px 16px", color:T.textSoft }}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td style={{ padding:"11px 16px" }}>
                    <div style={{ display:"flex", gap:6 }}>
                      <Btn size="sm" variant="secondary" onClick={() => setSelected(u)}>View</Btn>
                      <Btn size="sm" variant="ghost" onClick={() => setEmailModal(u)}>✉️</Btn>
                      {u.metadata?.suspended
                        ? <Btn size="sm" variant="ghost" onClick={() => reactivate(u._id||u.id)} disabled={actionLoading}>↩️</Btn>
                        : <Btn size="sm" variant="danger" onClick={() => suspend(u._id||u.id)} disabled={actionLoading}>Ban</Btn>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {total > 20 && (
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:16 }}>
          <Btn size="sm" variant="secondary" onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1}>← Prev</Btn>
          <span style={{ padding:"6px 14px", fontSize:13, color:T.textMid }}>Page {page} of {Math.ceil(total/20)}</span>
          <Btn size="sm" variant="secondary" onClick={() => setPage(p=>p+1)} disabled={page>=Math.ceil(total/20)}>Next →</Btn>
        </div>
      )}

      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          {[
            ["Email", selected.email],
            ["Phone", selected.phoneNumber],
            ["Role", selected.role],
            ["Subscription", selected.subscriptionType],
            ["Email Verified", selected.isEmailVerified ? "Yes" : "No"],
            ["Trial Used", selected.hasUsedTrial ? "Yes" : "No"],
            ["Joined", selected.createdAt ? new Date(selected.createdAt).toLocaleString() : "—"],
          ].map(([l,v]) => v != null && (
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0",
              borderBottom:`1px solid ${T.borderSoft}`, fontSize:13 }}>
              <span style={{ color:T.textMid, fontWeight:600 }}>{l}</span>
              <span style={{ color:T.text }}>{String(v)}</span>
            </div>
          ))}
          <div style={{ marginTop:16, display:"flex", gap:8 }}>
            <Btn onClick={() => { setEmailModal(selected); setSelected(null); }}>Send Email</Btn>
            <Btn variant="secondary" onClick={() => setSelected(null)}>Close</Btn>
          </div>
        </Modal>
      )}

      {emailModal && (
        <Modal title={`Email → ${emailModal.name}`} onClose={() => setEmailModal(null)}>
          <Input label="Subject" value={emailForm.subject} onChange={v => setEmailForm(f=>({...f,subject:v}))} />
          <Select label="Type" value={emailForm.type} onChange={v => setEmailForm(f=>({...f,type:v}))}
            options={[{value:"info",label:"Info"},{value:"warning",label:"Warning"},{value:"success",label:"Success"},{value:"danger",label:"Danger"}]} />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Message</div>
            <textarea value={emailForm.message} onChange={e => setEmailForm(f=>({...f,message:e.target.value}))}
              rows={5} style={{ width:"100%", padding:"9px 13px", border:`1.5px solid ${T.border}`,
                borderRadius:8, fontSize:13, fontFamily:T.font, color:T.text, background:T.bg,
                outline:"none", resize:"vertical", boxSizing:"border-box" }} />
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <Btn onClick={sendEmail} disabled={actionLoading}>Send Email</Btn>
            <Btn variant="secondary" onClick={() => setEmailModal(null)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── SUBSCRIPTIONS ─────────────────────────────────────────────────────────────
const Subscriptions = ({ token, toast }) => {
  const [subs, setSubs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [grantModal, setGrantModal] = useState(false);
  const [packages, setPackages] = useState([]);
  const [grantForm, setGrantForm] = useState({ userId:"", packageId:"", durationMonths:1, isTrial:false, notes:"" });
  const [actionLoading, setActionLoading] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit:30, ...(status && { status }) });
    Promise.all([
      api(`/subscriptions?${params}`, token),
      api("/packages", token),
    ]).then(([d, pkgData]) => {
      setSubs(d.subscriptions); setTotal(d.total);
      setPackages(pkgData.packages||[]);
    }).catch(e => toast(e.message,"error"))
      .finally(() => setLoading(false));
  }, [status, token]);

  useEffect(() => { load(); }, [load]);

  const cancel = async (id) => {
    if (!confirm("Cancel this subscription?")) return;
    setActionLoading(true);
    try {
      await api(`/subscriptions/${id}/cancel`, token, { method:"POST", body: JSON.stringify({ reason:"Cancelled by admin" }) });
      toast("Subscription cancelled"); load();
    } catch(e) { toast(e.message,"error"); }
    finally { setActionLoading(false); }
  };

  const renew = async (id) => {
    setActionLoading(true);
    try {
      await api(`/subscriptions/${id}/renew`, token, { method:"POST", body: JSON.stringify({ durationMonths:1 }) });
      toast("Subscription renewed"); load();
    } catch(e) { toast(e.message,"error"); }
    finally { setActionLoading(false); }
  };

  const grant = async () => {
    if (!grantForm.userId || !grantForm.packageId) return toast("User ID and package required","error");
    setActionLoading(true);
    try {
      await api("/subscriptions/grant", token, { method:"POST", body: JSON.stringify(grantForm) });
      toast("Subscription granted"); setGrantModal(false); setGrantForm({ userId:"", packageId:"", durationMonths:1, isTrial:false, notes:"" }); load();
    } catch(e) { toast(e.message,"error"); }
    finally { setActionLoading(false); }
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 4px" }}>Subscriptions</h1>
          <p style={{ color:T.textSoft, fontSize:13, margin:0 }}>{total} total subscriptions</p>
        </div>
        <Btn onClick={() => setGrantModal(true)}>+ Grant Subscription</Btn>
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        {["","active","trial","expired","cancelled"].map(s => (
          <Btn key={s} size="sm" variant={status===s?"primary":"secondary"} onClick={() => setStatus(s)}>
            {s || "All"}
          </Btn>
        ))}
      </div>

      <Card style={{ padding:0, overflow:"hidden" }}>
        {loading ? <Spinner /> : subs.length === 0 ? <EmptyState icon="📦" text="No subscriptions found." /> : (
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:T.bg, borderBottom:`1px solid ${T.border}` }}>
                {["User","Package","Status","Start","Expiry","Actions"].map(h => (
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700,
                    color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subs.map((s, i) => (
                <tr key={s._id||s.id} style={{ borderBottom:`1px solid ${T.borderSoft}`,
                  background: i%2===0 ? T.surface : T.bg }}>
                  <td style={{ padding:"11px 16px", color:T.text, fontWeight:600 }}>
                    {s.userId?.name || "—"}
                    {s.userId?.email && <div style={{ fontSize:11, color:T.textSoft }}>{s.userId.email}</div>}
                  </td>
                  <td style={{ padding:"11px 16px", color:T.textMid }}>{s.packageId?.displayName || "—"}</td>
                  <td style={{ padding:"11px 16px" }}>{statusBadge(s.status)}</td>
                  <td style={{ padding:"11px 16px", color:T.textSoft }}>{s.startDate ? new Date(s.startDate).toLocaleDateString() : "—"}</td>
                  <td style={{ padding:"11px 16px", color: new Date(s.expiryDate)<new Date() ? T.danger : T.textSoft }}>
                    {s.expiryDate ? new Date(s.expiryDate).toLocaleDateString() : "—"}
                  </td>
                  <td style={{ padding:"11px 16px" }}>
                    <div style={{ display:"flex", gap:6 }}>
                      {(s.status==="active"||s.status==="trial") && (
                        <>
                          <Btn size="sm" variant="secondary" onClick={() => renew(s._id||s.id)} disabled={actionLoading}>↺ Renew</Btn>
                          <Btn size="sm" variant="danger" onClick={() => cancel(s._id||s.id)} disabled={actionLoading}>Cancel</Btn>
                        </>
                      )}
                      {s.status==="expired" && (
                        <Btn size="sm" variant="secondary" onClick={() => renew(s._id||s.id)} disabled={actionLoading}>↺ Renew</Btn>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {grantModal && (
        <Modal title="Grant Subscription" onClose={() => setGrantModal(false)}>
          <Input label="User ID" value={grantForm.userId} onChange={v => setGrantForm(f=>({...f,userId:v}))} placeholder="MongoDB ObjectId of user" />
          <Select label="Package" value={grantForm.packageId} onChange={v => setGrantForm(f=>({...f,packageId:v}))}
            options={[{value:"",label:"Select package…"}, ...packages.map(p=>({value:p._id||p.id, label:p.displayName}))]} />
          <Input label="Duration (months)" type="number" value={grantForm.durationMonths}
            onChange={v => setGrantForm(f=>({...f,durationMonths:Number(v)}))} />
          <Input label="Notes (optional)" value={grantForm.notes} onChange={v => setGrantForm(f=>({...f,notes:v}))} />
          <label style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:T.text, marginBottom:16, cursor:"pointer" }}>
            <input type="checkbox" checked={grantForm.isTrial} onChange={e => setGrantForm(f=>({...f,isTrial:e.target.checked}))} />
            Grant as Free Trial (7 days)
          </label>
          <div style={{ display:"flex", gap:8 }}>
            <Btn onClick={grant} disabled={actionLoading}>Grant</Btn>
            <Btn variant="secondary" onClick={() => setGrantModal(false)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── PACKAGES ──────────────────────────────────────────────────────────────────
const Packages = ({ token, toast }) => {
  const [pkgs, setPkgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'create' | package object
  const [form, setForm] = useState({ name:"", displayName:"", description:"", packageType:"accounting",
    "price.amount":0, "price.billingCycle":"monthly", "price.currency":"TZS", isActive:true });
  const [actionLoading, setActionLoading] = useState(false);

  const load = () => {
    setLoading(true);
    api("/packages", token).then(d => setPkgs(d.packages||[])).catch(e=>toast(e.message,"error")).finally(()=>setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    setActionLoading(true);
    try {
      const payload = { ...form, price:{ amount:Number(form["price.amount"]), billingCycle:form["price.billingCycle"], currency:form["price.currency"] } };
      delete payload["price.amount"]; delete payload["price.billingCycle"]; delete payload["price.currency"];
      if (modal === "create") {
        await api("/packages", token, { method:"POST", body: JSON.stringify(payload) });
        toast("Package created");
      } else {
        await api(`/packages/${modal._id||modal.id}`, token, { method:"PATCH", body: JSON.stringify(payload) });
        toast("Package updated");
      }
      setModal(null); load();
    } catch(e) { toast(e.message,"error"); }
    finally { setActionLoading(false); }
  };

  const deactivate = async (id) => {
    setActionLoading(true);
    try {
      await api(`/packages/${id}`, token, { method:"DELETE" });
      toast("Package deactivated"); load();
    } catch(e) { toast(e.message,"error"); }
    finally { setActionLoading(false); }
  };

  const openEdit = (pkg) => {
    setForm({ name:pkg.name, displayName:pkg.displayName, description:pkg.description,
      packageType:pkg.packageType, "price.amount":pkg.price?.amount||0,
      "price.billingCycle":pkg.price?.billingCycle||"monthly", "price.currency":pkg.price?.currency||"TZS", isActive:pkg.isActive });
    setModal(pkg);
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 4px" }}>Packages</h1>
          <p style={{ color:T.textSoft, fontSize:13, margin:0 }}>Manage subscription packages</p>
        </div>
        <Btn onClick={() => { setForm({ name:"", displayName:"", description:"", packageType:"accounting", "price.amount":0, "price.billingCycle":"monthly", "price.currency":"TZS", isActive:true }); setModal("create"); }}>
          + New Package
        </Btn>
      </div>

      {loading ? <Spinner /> : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
          {pkgs.map(p => (
            <Card key={p._id||p.id}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, color:T.text }}>{p.displayName}</div>
                  <Badge label={p.packageType} />
                </div>
                {p.isActive ? <Badge label="Active" color={T.success} bg={T.successSoft} /> : <Badge label="Inactive" />}
              </div>
              <div style={{ fontSize:13, color:T.textMid, marginBottom:12, lineHeight:1.5 }}>{p.description}</div>
              <div style={{ fontFamily:T.fontDisplay, fontSize:22, color:T.accent, marginBottom:12 }}>
                {p.price?.currency} {(p.price?.amount||0).toLocaleString()}
                <span style={{ fontSize:13, color:T.textSoft, fontFamily:T.font }}>/{p.price?.billingCycle}</span>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <Btn size="sm" variant="secondary" onClick={() => openEdit(p)}>Edit</Btn>
                {p.isActive && <Btn size="sm" variant="danger" onClick={() => deactivate(p._id||p.id)} disabled={actionLoading}>Deactivate</Btn>}
              </div>
            </Card>
          ))}
          {pkgs.length === 0 && <EmptyState icon="📦" text="No packages yet." />}
        </div>
      )}

      {modal && (
        <Modal title={modal === "create" ? "New Package" : `Edit: ${modal.displayName}`} onClose={() => setModal(null)}>
          <Input label="Internal Name (unique)" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} placeholder="accounting_basic" />
          <Input label="Display Name" value={form.displayName} onChange={v=>setForm(f=>({...f,displayName:v}))} />
          <Select label="Package Type" value={form.packageType} onChange={v=>setForm(f=>({...f,packageType:v}))}
            options={[{value:"accounting",label:"Accounting"},{value:"task_management",label:"Task Management"},{value:"bundle",label:"Bundle"}]} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Input label="Price Amount" type="number" value={form["price.amount"]} onChange={v=>setForm(f=>({...f,"price.amount":v}))} />
            <Select label="Billing Cycle" value={form["price.billingCycle"]} onChange={v=>setForm(f=>({...f,"price.billingCycle":v}))}
              options={[{value:"monthly",label:"Monthly"},{value:"annual",label:"Annual"}]} />
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Description</div>
            <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3}
              style={{ width:"100%", padding:"9px 13px", border:`1.5px solid ${T.border}`, borderRadius:8,
                fontSize:13, fontFamily:T.font, color:T.text, background:T.bg, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <Btn onClick={save} disabled={actionLoading}>Save</Btn>
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── BROADCAST EMAIL ───────────────────────────────────────────────────────────
const EmailCenter = ({ token, toast }) => {
  const [tab, setTab] = useState("broadcast");
  const [broadcast, setBroadcast] = useState({ subject:"", title:"", message:"", segment:"all", ctaLabel:"", ctaUrl:"" });
  const [direct, setDirect] = useState({ userIds:"", subject:"", message:"", type:"info" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sendBroadcast = async () => {
    if (!broadcast.subject || !broadcast.message) return toast("Subject and message required","error");
    setLoading(true); setResult(null);
    try {
      const d = await api("/email/broadcast", token, { method:"POST", body: JSON.stringify(broadcast) });
      setResult(d); toast("Broadcast sent!");
    } catch(e) { toast(e.message,"error"); }
    finally { setLoading(false); }
  };

  const sendDirect = async () => {
    const ids = direct.userIds.split(",").map(s=>s.trim()).filter(Boolean);
    if (!ids.length || !direct.subject || !direct.message) return toast("User IDs, subject and message required","error");
    setLoading(true);
    try {
      const d = await api("/email/send", token, { method:"POST", body: JSON.stringify({ ...direct, userIds:ids }) });
      toast(d.message || "Emails sent!");
    } catch(e) { toast(e.message,"error"); }
    finally { setLoading(false); }
  };

  const sendTrialPrompt = async () => {
    setLoading(true);
    try {
      const d = await api("/email/trial-upgrade-prompt", token, { method:"POST", body:"{}" });
      toast(d.message || "Trial prompts sent!");
    } catch(e) { toast(e.message,"error"); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 6px" }}>Email Center</h1>
      <p style={{ color:T.textSoft, fontSize:13, margin:"0 0 24px" }}>Communicate with your users.</p>

      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[["broadcast","📣 Broadcast"],["direct","✉️ Direct"],["trial","⏳ Trial Nudge"]].map(([k,l]) => (
          <Btn key={k} size="sm" variant={tab===k?"primary":"secondary"} onClick={() => setTab(k)}>{l}</Btn>
        ))}
      </div>

      {tab === "broadcast" && (
        <Card style={{ maxWidth:600 }}>
          <div style={{ fontWeight:700, fontSize:15, color:T.text, marginBottom:20 }}>Broadcast to User Segment</div>
          <Select label="Segment" value={broadcast.segment} onChange={v=>setBroadcast(f=>({...f,segment:v}))}
            options={[{value:"all",label:"All Users"},{value:"free",label:"Free Plan"},{value:"premium",label:"Premium"},{value:"trial_expired",label:"Trial Expired"}]} />
          <Input label="Subject" value={broadcast.subject} onChange={v=>setBroadcast(f=>({...f,subject:v}))} />
          <Input label="Title (in email)" value={broadcast.title} onChange={v=>setBroadcast(f=>({...f,title:v}))} />
          <Input label="CTA Button Label (optional)" value={broadcast.ctaLabel} onChange={v=>setBroadcast(f=>({...f,ctaLabel:v}))} />
          <Input label="CTA URL (optional)" value={broadcast.ctaUrl} onChange={v=>setBroadcast(f=>({...f,ctaUrl:v}))} />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Message</div>
            <textarea rows={5} value={broadcast.message} onChange={e=>setBroadcast(f=>({...f,message:e.target.value}))}
              style={{ width:"100%", padding:"9px 13px", border:`1.5px solid ${T.border}`, borderRadius:8,
                fontSize:13, fontFamily:T.font, color:T.text, background:T.bg, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
          </div>
          <Btn onClick={sendBroadcast} disabled={loading}>
            {loading ? "Sending…" : "📣 Send Broadcast"}
          </Btn>
          {result && (
            <div style={{ marginTop:16, padding:"12px 14px", background:T.successSoft,
              borderRadius:8, fontSize:13, color:T.success }}>
              ✅ Sent to {result.succeeded} users · {result.failed} failed
            </div>
          )}
        </Card>
      )}

      {tab === "direct" && (
        <Card style={{ maxWidth:600 }}>
          <div style={{ fontWeight:700, fontSize:15, color:T.text, marginBottom:20 }}>Send to Specific Users</div>
          <Input label="User IDs (comma separated)" value={direct.userIds} onChange={v=>setDirect(f=>({...f,userIds:v}))}
            placeholder="60f1a2b3c4d5e6f7a8b9c0d1, …" />
          <Input label="Subject" value={direct.subject} onChange={v=>setDirect(f=>({...f,subject:v}))} />
          <Select label="Email Type" value={direct.type} onChange={v=>setDirect(f=>({...f,type:v}))}
            options={[{value:"info",label:"Info"},{value:"warning",label:"Warning"},{value:"success",label:"Success"},{value:"danger",label:"Danger"}]} />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Message</div>
            <textarea rows={5} value={direct.message} onChange={e=>setDirect(f=>({...f,message:e.target.value}))}
              style={{ width:"100%", padding:"9px 13px", border:`1.5px solid ${T.border}`, borderRadius:8,
                fontSize:13, fontFamily:T.font, color:T.text, background:T.bg, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
          </div>
          <Btn onClick={sendDirect} disabled={loading}>{loading ? "Sending…" : "✉️ Send Emails"}</Btn>
        </Card>
      )}

      {tab === "trial" && (
        <Card style={{ maxWidth:480 }}>
          <div style={{ fontWeight:700, fontSize:15, color:T.text, marginBottom:8 }}>Trial Upgrade Nudge</div>
          <p style={{ fontSize:13, color:T.textMid, margin:"0 0 20px", lineHeight:1.6 }}>
            Automatically finds all users whose free trial expires within the next 3 days
            and sends them a personalised upgrade prompt.
          </p>
          <div style={{ padding:"14px 16px", background:T.warnSoft, borderRadius:8, marginBottom:20,
            fontSize:13, color:T.warn, border:`1px solid #E8D4B0` }}>
            ⚠️ This will send emails to all qualifying trial users. Check before firing.
          </div>
          <Btn onClick={sendTrialPrompt} disabled={loading}>
            {loading ? "Sending…" : "⏳ Send Trial Nudge"}
          </Btn>
        </Card>
      )}
    </div>
  );
};

// ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
const Notifications = ({ token, toast }) => {
  const [form, setForm] = useState({ title:"", body:"", type:"featureAnnouncement", priority:"normal",
    bulletPoints:[""], actions:[], targetUserIds:"", expiresAt:"", changelogVersion:"" });
  const [loading, setLoading] = useState(false);

  const addBullet = () => setForm(f => ({ ...f, bulletPoints:[...f.bulletPoints,""] }));
  const setBullet = (i,v) => setForm(f => ({ ...f, bulletPoints:f.bulletPoints.map((b,j)=>j===i?v:b) }));
  const removeBullet = (i) => setForm(f => ({ ...f, bulletPoints:f.bulletPoints.filter((_,j)=>j!==i) }));

  const send = async () => {
    if (!form.title || !form.body) return toast("Title and body required","error");
    setLoading(true);
    try {
      const payload = { ...form, bulletPoints:form.bulletPoints.filter(b=>b.trim()),
        ...(form.targetUserIds.trim() && { targetUserIds:form.targetUserIds.split(",").map(s=>s.trim()).filter(Boolean) }),
        ...(form.expiresAt && { expiresAt: new Date(form.expiresAt).toISOString() }) };
      await api("/system-notifications", token, { method:"POST", body: JSON.stringify(payload) });
      toast("Notification sent!");
      setForm({ title:"", body:"", type:"featureAnnouncement", priority:"normal", bulletPoints:[""], actions:[], targetUserIds:"", expiresAt:"", changelogVersion:"" });
    } catch(e) { toast(e.message,"error"); }
    finally { setLoading(false); }
  };

  const TYPES = ["featureAnnouncement","appUpdate","feedbackRequest","maintenance","tip","alert"];
  const TYPE_ICONS = { featureAnnouncement:"✨", appUpdate:"🔄", feedbackRequest:"💬", maintenance:"🔧", tip:"💡", alert:"🚨" };

  return (
    <div>
      <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 6px" }}>System Notifications</h1>
      <p style={{ color:T.textSoft, fontSize:13, margin:"0 0 24px" }}>Push in-app notifications to your users.</p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, maxWidth:860 }}>
        <Card>
          <div style={{ fontWeight:700, fontSize:14, color:T.text, marginBottom:16 }}>Notification</div>

          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.5px" }}>Type</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
              {TYPES.map(t => (
                <button key={t} onClick={() => setForm(f=>({...f,type:t}))}
                  style={{ padding:"8px 6px", border:`1.5px solid ${form.type===t?T.accent:T.border}`,
                    borderRadius:8, background: form.type===t?T.accentSoft:T.surface,
                    cursor:"pointer", fontSize:12, color:T.text, fontFamily:T.font, fontWeight:600 }}>
                  {TYPE_ICONS[t]} {t.replace(/([A-Z])/g," $1").trim()}
                </button>
              ))}
            </div>
          </div>

          <Select label="Priority" value={form.priority} onChange={v=>setForm(f=>({...f,priority:v}))}
            options={[{value:"low",label:"Low"},{value:"normal",label:"Normal"},{value:"high",label:"High"},{value:"critical",label:"Critical"}]} />
          <Input label="Title *" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Body *</div>
            <textarea rows={4} value={form.body} onChange={e=>setForm(f=>({...f,body:e.target.value}))}
              style={{ width:"100%", padding:"9px 13px", border:`1.5px solid ${T.border}`, borderRadius:8,
                fontSize:13, fontFamily:T.font, color:T.text, background:T.bg, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight:700, fontSize:14, color:T.text, marginBottom:16 }}>Targeting & Options</div>
          <Input label="Target User IDs (blank = all)" value={form.targetUserIds}
            onChange={v=>setForm(f=>({...f,targetUserIds:v}))} placeholder="id1, id2, …" />
          <Input label="Expires At (optional)" type="datetime-local" value={form.expiresAt}
            onChange={v=>setForm(f=>({...f,expiresAt:v}))} />
          <Input label="Changelog Version (optional)" value={form.changelogVersion}
            onChange={v=>setForm(f=>({...f,changelogVersion:v}))} placeholder="2.4.1" />

          <div style={{ marginBottom:8 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.5px" }}>Bullet Points</div>
            {form.bulletPoints.map((b,i) => (
              <div key={i} style={{ display:"flex", gap:6, marginBottom:6, alignItems:"center" }}>
                <span style={{ color:T.textSoft }}>•</span>
                <input value={b} onChange={e=>setBullet(i,e.target.value)} placeholder={`Point ${i+1}`}
                  style={{ flex:1, padding:"7px 11px", border:`1.5px solid ${T.border}`, borderRadius:8,
                    fontSize:13, color:T.text, background:T.bg, fontFamily:T.font, outline:"none" }} />
                {form.bulletPoints.length > 1 && (
                  <button onClick={()=>removeBullet(i)} style={{ background:"none",border:"none",color:T.textSoft,cursor:"pointer",fontSize:16 }}>×</button>
                )}
              </div>
            ))}
            <Btn size="sm" variant="ghost" onClick={addBullet}>+ Add bullet</Btn>
          </div>

          <div style={{ marginTop:20 }}>
            <Btn onClick={send} disabled={loading} size="lg" style={{ width:"100%" }}>
              {loading ? "Sending…" : `${TYPE_ICONS[form.type]} Send Notification`}
            </Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ── ADMINS ────────────────────────────────────────────────────────────────────
const AdminsPanel = ({ token, toast, currentAdminRole }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"viewer" });
  const [actionLoading, setActionLoading] = useState(false);

  const load = () => {
    setLoading(true);
    api("/admins", token).then(d => setAdmins(d.admins||[])).catch(e=>toast(e.message,"error")).finally(()=>setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.name||!form.email||!form.password) return toast("All fields required","error");
    setActionLoading(true);
    try {
      await api("/admins", token, { method:"POST", body: JSON.stringify(form) });
      toast("Admin created"); setModal(null); setForm({ name:"", email:"", password:"", role:"viewer" }); load();
    } catch(e) { toast(e.message,"error"); }
    finally { setActionLoading(false); }
  };

  const suspend = async (id) => {
    setActionLoading(true);
    try {
      await api(`/admins/${id}/suspend`, token, { method:"POST", body: JSON.stringify({ reason:"Suspended by super admin" }) });
      toast("Admin suspended"); load();
    } catch(e) { toast(e.message,"error"); }
    finally { setActionLoading(false); }
  };

  const ROLES = ["viewer","support","moderator","admin","super_admin"];

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 4px" }}>Admin Team</h1>
          <p style={{ color:T.textSoft, fontSize:13, margin:0 }}>{admins.length} admins</p>
        </div>
        {["super_admin","admin"].includes(currentAdminRole) && (
          <Btn onClick={() => setModal("create")}>+ Add Admin</Btn>
        )}
      </div>

      <Card style={{ padding:0, overflow:"hidden" }}>
        {loading ? <Spinner /> : admins.length === 0 ? <EmptyState icon="👤" text="No admins found." /> : (
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:T.bg, borderBottom:`1px solid ${T.border}` }}>
                {["Name","Email","Role","Status","Joined","Actions"].map(h => (
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700,
                    color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins.map((a, i) => (
                <tr key={a._id||a.id} style={{ borderBottom:`1px solid ${T.borderSoft}`,
                  background: i%2===0 ? T.surface : T.bg }}>
                  <td style={{ padding:"11px 16px", color:T.text, fontWeight:600 }}>{a.name}</td>
                  <td style={{ padding:"11px 16px", color:T.textMid }}>{a.email}</td>
                  <td style={{ padding:"11px 16px" }}>
                    <Badge label={a.role} color={a.role==="super_admin"?T.warn:T.accent}
                      bg={a.role==="super_admin"?T.warnSoft:T.accentSoft} />
                  </td>
                  <td style={{ padding:"11px 16px" }}>
                    {a.isSuspended
                      ? <Badge label="Suspended" color={T.danger} bg={T.dangerSoft} />
                      : a.isActive
                        ? <Badge label="Active" color={T.success} bg={T.successSoft} />
                        : <Badge label="Inactive" />}
                  </td>
                  <td style={{ padding:"11px 16px", color:T.textSoft }}>
                    {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td style={{ padding:"11px 16px" }}>
                    {currentAdminRole === "super_admin" && !a.isSuspended && (
                      <Btn size="sm" variant="danger" onClick={() => suspend(a._id||a.id)} disabled={actionLoading}>Suspend</Btn>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {modal === "create" && (
        <Modal title="Add Admin" onClose={() => setModal(null)}>
          <Input label="Name" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} />
          <Input label="Email" type="email" value={form.email} onChange={v=>setForm(f=>({...f,email:v}))} />
          <Input label="Password" type="password" value={form.password} onChange={v=>setForm(f=>({...f,password:v}))} />
          <Select label="Role" value={form.role} onChange={v=>setForm(f=>({...f,role:v}))}
            options={ROLES.filter(r => r !== "super_admin").map(r => ({ value:r, label:r.replace("_"," ") }))} />
          <div style={{ display:"flex", gap:8 }}>
            <Btn onClick={create} disabled={actionLoading}>Create Admin</Btn>
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// LOGIN
// ═════════════════════════════════════════════════════════════════════════════
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const login = async () => {
    if (!email || !password) { setError("Both fields required."); return; }
    setLoading(true); setError("");
    try {
      const d = await api("/auth/login", null, { method:"POST", body: JSON.stringify({ email, password }) });
      sessionStorage.setItem("admin_token", d.token);
      onLogin(d.token, d.admin);
    } catch(e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center",
      justifyContent:"center", fontFamily:T.font,
      backgroundImage:"radial-gradient(circle at 20% 80%, #E8F0EC 0%, transparent 50%), radial-gradient(circle at 80% 20%, #EDF2EE 0%, transparent 50%)" }}>
      <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:20, padding:"40px 36px",
        width:"100%", maxWidth:400, boxShadow:"0 8px 40px rgba(44,41,37,0.1)" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:52, height:52, background:T.sidebar, borderRadius:14, margin:"0 auto 14px",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>📣</div>
          <div style={{ fontFamily:T.fontDisplay, fontSize:22, color:T.text }}>Manereja Admin</div>
          <div style={{ fontSize:13, color:T.textSoft, marginTop:4 }}>Sign in to your panel</div>
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.5px" }}>Email</div>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&login()} placeholder="admin@manereja.com"
            style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${T.border}`, borderRadius:9,
              fontSize:14, color:T.text, background:T.bg, fontFamily:T.font, outline:"none", boxSizing:"border-box" }} />
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.5px" }}>Password</div>
          <div style={{ position:"relative" }}>
            <input type={showPw?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••••"
              style={{ width:"100%", padding:"10px 40px 10px 14px", border:`1.5px solid ${T.border}`, borderRadius:9,
                fontSize:14, color:T.text, background:T.bg, fontFamily:T.font, outline:"none", boxSizing:"border-box" }} />
            <button onClick={()=>setShowPw(v=>!v)}
              style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
                background:"none", border:"none", cursor:"pointer", fontSize:16, color:T.textSoft }}>
              {showPw?"🙈":"👁️"}
            </button>
          </div>
        </div>

        {error && <div style={{ background:T.dangerSoft, border:`1px solid #E8C5BC`, borderRadius:8,
          padding:"10px 14px", fontSize:13, color:T.danger, marginBottom:14 }}>⚠️ {error}</div>}

        <button onClick={login} disabled={loading}
          style={{ width:"100%", padding:"12px", background:T.accent, color:"#fff", border:"none",
            borderRadius:10, fontSize:14, fontWeight:700, cursor: loading?"not-allowed":"pointer",
            fontFamily:T.font, opacity:loading?0.65:1, transition:"all 0.15s" }}>
          {loading ? "Signing in…" : "Sign in →"}
        </button>

        <div style={{ textAlign:"center", marginTop:16, fontSize:11, color:T.textSoft }}>
          Session persists until you close the tab or sign out.
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═════════════════════════════════════════════════════════════════════════════
const NAV = [
  { id:"dashboard",  icon:"◈",  label:"Dashboard" },
  { id:"users",      icon:"◎",  label:"Users" },
  { id:"subscriptions", icon:"◇", label:"Subscriptions" },
  { id:"packages",   icon:"⬡",  label:"Packages" },
  { id:"email",      icon:"◻",  label:"Email" },
  { id:"notifications", icon:"◉", label:"Notifications" },
  { id:"agents", icon:"🤝", label:"Agents" },
  { id:"admins",     icon:"◈",  label:"Admin Team" },
];


// ── AGENTS ────────────────────────────────────────────────────────────────────
const Agents = ({ token, toast }) => {
  const [agents, setAgents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const load = () => {
    setLoading(true);
    api("/agents", token)
      .then(d => { setAgents(d.agents || []); setTotal(d.total || 0); })
      .catch(e => toast(e.message, "error"))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, color:T.text, margin:"0 0 4px" }}>Agents</h1>
          <p style={{ color:T.textSoft, fontSize:13, margin:0 }}>{total} registered agents</p>
        </div>
      </div>

      <Card style={{ padding:0, overflow:"hidden" }}>
        {loading ? <Spinner /> : agents.length === 0 ? <EmptyState icon="🤝" text="No agents found." /> : (
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:T.bg, borderBottom:`1px solid ${T.border}` }}>
                {["Name","Email","Referrals","Total Commission","Unpaid","Actions"].map(h => (
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700,
                    color:T.textSoft, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((a, i) => (
                <tr key={a._id||a.id} style={{ borderBottom:`1px solid ${T.borderSoft}`,
                  background: i%2===0 ? T.surface : T.bg }}>
                  <td style={{ padding:"11px 16px", color:T.text, fontWeight:600 }}>{a.name}</td>
                  <td style={{ padding:"11px 16px", color:T.textMid }}>{a.email || "—"}</td>
                  <td style={{ padding:"11px 16px", color:T.text }}>{a.totalReferrals ?? 0}</td>
                  <td style={{ padding:"11px 16px", color:T.accent, fontWeight:700 }}>
                    TZS {(a.totalCommissionEarned || 0).toLocaleString()}
                  </td>
                  <td style={{ padding:"11px 16px" }}>
                    <span style={{ color: (a.unpaidCommission||0) > 0 ? T.warn : T.textSoft, fontWeight:600 }}>
                      TZS {(a.unpaidCommission || 0).toLocaleString()}
                    </span>
                  </td>
                  <td style={{ padding:"11px 16px" }}>
                    <Btn size="sm" variant="secondary" onClick={() => setSelected(a)}>View</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          {[
            ["Email",             selected.email],
            ["Phone",             selected.phone],
            ["Total Referrals",   selected.totalReferrals],
            ["Commission Rate",   selected.commissionRate ? `${(selected.commissionRate*100).toFixed(0)}%` : "30%"],
            ["Total Earned",      `TZS ${(selected.totalCommissionEarned||0).toLocaleString()}`],
            ["Unpaid",            `TZS ${(selected.unpaidCommission||0).toLocaleString()}`],
            ["Joined",            selected.createdAt ? new Date(selected.createdAt).toLocaleString() : "—"],
          ].map(([l,v]) => v != null && (
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0",
              borderBottom:`1px solid ${T.borderSoft}`, fontSize:13 }}>
              <span style={{ color:T.textMid, fontWeight:600 }}>{l}</span>
              <span style={{ color:T.text }}>{String(v)}</span>
            </div>
          ))}

          {/* Subscriptions acquired by this agent */}
          {selected.recentSubscriptions?.length > 0 && (
            <div style={{ marginTop:16 }}>
              <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:8,
                textTransform:"uppercase", letterSpacing:"0.5px" }}>Recent Referrals</div>
              {selected.recentSubscriptions.map((s, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between",
                  padding:"8px 0", borderBottom:`1px solid ${T.borderSoft}`, fontSize:12 }}>
                  <span style={{ color:T.text }}>{s.userName || s.userId}</span>
                  <span style={{ color:T.textMid }}>{s.packageName}</span>
                  <span style={{ color:T.accent, fontWeight:600 }}>
                    TZS {(s.commission||0).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop:16, display:"flex", gap:8 }}>
            <Btn variant="secondary" onClick={() => setSelected(null)}>Close</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default function AdminApp() {
 const [token, setToken] = useState(() => {
  if (typeof window === "undefined") return null;
  const t = sessionStorage.getItem("admin_token");
  return (t && t !== "null" && t !== "undefined") ? t : null;
});
  const [admin, setAdmin] = useState(null);
  const [section, setSection] = useState("dashboard");
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type="success") => setToast({ msg, type }), []);

  useEffect(() => {
    if (token && !admin) {
      api("/auth/me", token).then(d => setAdmin(d.admin)).catch(() => {
        sessionStorage.removeItem("admin_token"); setToken(null);
      });
    }
  }, [token]);

  const logout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null); setAdmin(null); setSection("dashboard");
  };

  if (!token) return <Login onLogin={(t, a) => { setToken(t); setAdmin(a); }} />;

  const sectionProps = { token, toast: showToast };

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:T.font, background:T.bg }}>
      {/* ── Sidebar ── */}
      <aside style={{ width:220, background:T.sidebar, display:"flex", flexDirection:"column",
        position:"fixed", top:0, left:0, bottom:0, zIndex:10 }}>
        <div style={{ padding:"24px 20px 16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
            <div style={{ width:34, height:34, background:"#3C3730", borderRadius:9,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>📣</div>
            <div>
              <div style={{ color:"#F7F6F3", fontWeight:700, fontSize:13 }}>Manereja</div>
              <div style={{ color:"#7A746C", fontSize:11 }}>Admin Panel</div>
            </div>
          </div>

          <nav>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setSection(n.id)}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 12px",
                  borderRadius:8, border:"none", cursor:"pointer", marginBottom:2, textAlign:"left",
                  background: section===n.id ? "rgba(247,246,243,0.12)" : "transparent",
                  color: section===n.id ? T.sidebarActive : T.sidebarText,
                  fontSize:13, fontFamily:T.font, fontWeight: section===n.id ? 600 : 400,
                  transition:"all 0.1s" }}>
                <span style={{ fontSize:14, opacity:0.7 }}>{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ marginTop:"auto", padding:"16px 20px", borderTop:"1px solid #3C3730" }}>
          {admin && (
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:12, color:"#F7F6F3", fontWeight:600, marginBottom:2 }}>{admin.name}</div>
              <div style={{ fontSize:11, color:"#7A746C" }}>{admin.role?.replace("_"," ")}</div>
            </div>
          )}
          <button onClick={logout}
            style={{ width:"100%", padding:"8px 12px", background:"transparent",
              border:"1px solid #3C3730", borderRadius:8, color:"#7A746C", fontSize:12,
              cursor:"pointer", fontFamily:T.font, transition:"all 0.1s" }}>
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ marginLeft:220, flex:1, padding:"36px 40px", minHeight:"100vh" }}>
        {section === "dashboard"     && <Dashboard  {...sectionProps} />}
        {section === "users"         && <Users       {...sectionProps} />}
        {section === "subscriptions" && <Subscriptions {...sectionProps} />}
        {section === "packages"      && <Packages    {...sectionProps} />}
        {section === "email"         && <EmailCenter {...sectionProps} />}
        {section === "agents" && <Agents {...sectionProps} />}
        {section === "notifications" && <Notifications {...sectionProps} />}
        {section === "admins"        && <AdminsPanel {...sectionProps} currentAdminRole={admin?.role} />}
      </main>

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}