'use client';

import { useState } from "react";

const TYPES = ["featureAnnouncement", "appUpdate", "feedbackRequest", "maintenance", "tip", "alert"];
const PRIORITIES = ["low", "normal", "high", "critical"];

const TYPE_META = {
  featureAnnouncement: { icon: "✨", color: "#6EE7B7", label: "Feature" },
  appUpdate:           { icon: "🔄", color: "#93C5FD", label: "Update" },
  feedbackRequest:     { icon: "💬", color: "#FDE68A", label: "Feedback" },
  maintenance:         { icon: "🔧", color: "#FCA5A5", label: "Maintenance" },
  tip:                 { icon: "💡", color: "#C4B5FD", label: "Tip" },
  alert:               { icon: "🚨", color: "#FB923C", label: "Alert" },
};

const PRIORITY_META = {
  low:      { color: "#6B7280", bg: "#F3F4F6" },
  normal:   { color: "#3B82F6", bg: "#EFF6FF" },
  high:     { color: "#F59E0B", bg: "#FFFBEB" },
  critical: { color: "#EF4444", bg: "#FEF2F2" },
};

const BASE_URL = "http://192.168.100.189:5000"; // change this

export default function NotificationCreator({ authToken }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    type: "featureAnnouncement",
    priority: "normal",
    bulletPoints: [""],
    actions: [],
    feedbackQuestion: "",
    imageUrl: "",
    targetUserIds: "",
    expiresAt: "",
    changelogVersion: "",
  });

  const [newAction, setNewAction] = useState({ label: "", deepLink: "", isPrimary: true });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState(false);
  const [activeSection, setActiveSection] = useState("content");

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const addBullet = () => set("bulletPoints", [...form.bulletPoints, ""]);
  const setBullet = (i, v) => set("bulletPoints", form.bulletPoints.map((b, j) => j === i ? v : b));
  const removeBullet = (i) => set("bulletPoints", form.bulletPoints.filter((_, j) => j !== i));

  const addAction = () => {
    if (!newAction.label.trim()) return;
    set("actions", [...form.actions, { ...newAction }]);
    setNewAction({ label: "", deepLink: "", isPrimary: false });
  };
  const removeAction = (i) => set("actions", form.actions.filter((_, j) => j !== i));

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.body.trim()) {
      setStatus("error");
      setErrorMsg("Title and body are required.");
      return;
    }
    setStatus("loading");
    try {
      const payload = {
        title: form.title,
        body: form.body,
        type: form.type,
        priority: form.priority,
        bulletPoints: form.bulletPoints.filter(b => b.trim()),
        actions: form.actions,
        ...(form.feedbackQuestion && { feedbackQuestion: form.feedbackQuestion }),
        ...(form.imageUrl && { imageUrl: form.imageUrl }),
        ...(form.changelogVersion && { changelogVersion: form.changelogVersion }),
        ...(form.expiresAt && { expiresAt: new Date(form.expiresAt).toISOString() }),
        ...(form.targetUserIds.trim() && {
          targetUserIds: form.targetUserIds.split(",").map(s => s.trim()).filter(Boolean),
        }),
      };

      const token = authToken;
      const res = await fetch(`${BASE_URL}/api/system-notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error((await res.json()).message ?? "Server error");
      setStatus("success");
      setTimeout(() => setStatus(null), 3000);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e.message);
    }
  };

  const typeMeta = TYPE_META[form.type];
  const priMeta = PRIORITY_META[form.priority];

  return (
    <div style={styles.root}>
      {/* ── Background grid ── */}
      <div style={styles.gridBg} />

      {/* ── Header ── */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoMark}>📣</div>
          <div>
            <div style={styles.headerTitle}>Notification Studio</div>
            <div style={styles.headerSub}>Broadcast to your users</div>
          </div>
        </div>
        <div style={styles.headerRight}>
          <button style={{ ...styles.pill, background: preview ? "#111" : "transparent", color: preview ? "#fff" : "#888" }}
            onClick={() => setPreview(p => !p)}>
            {preview ? "← Edit" : "Preview →"}
          </button>
        </div>
      </header>

      <div style={styles.workspace}>
        {!preview ? (
          <div style={styles.editor}>
            {/* ── Section nav ── */}
            <div style={styles.sectionNav}>
              {["content", "targeting", "extras"].map(s => (
                <button key={s} style={{ ...styles.sectionBtn, ...(activeSection === s ? styles.sectionBtnActive : {}) }}
                  onClick={() => setActiveSection(s)}>
                  {s === "content" ? "✍️ Content" : s === "targeting" ? "🎯 Targeting" : "⚙️ Extras"}
                </button>
              ))}
            </div>

            {activeSection === "content" && (
              <div style={styles.section}>
                {/* Type */}
                <label style={styles.label}>Notification Type</label>
                <div style={styles.typeGrid}>
                  {TYPES.map(t => {
                    const m = TYPE_META[t];
                    const active = form.type === t;
                    return (
                      <button key={t} onClick={() => set("type", t)}
                        style={{ ...styles.typeBtn, ...(active ? { borderColor: m.color, background: m.color + "18" } : {}) }}>
                        <span style={{ fontSize: 18 }}>{m.icon}</span>
                        <span style={{ fontSize: 11, color: active ? "#111" : "#666", fontWeight: 600 }}>{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Priority */}
                <label style={styles.label}>Priority</label>
                <div style={styles.priRow}>
                  {PRIORITIES.map(p => {
                    const m = PRIORITY_META[p];
                    const active = form.priority === p;
                    return (
                      <button key={p} onClick={() => set("priority", p)}
                        style={{ ...styles.priBtn, background: active ? m.bg : "#F9FAFB", color: active ? m.color : "#9CA3AF", border: `1.5px solid ${active ? m.color : "#E5E7EB"}`, fontWeight: active ? 700 : 500 }}>
                        {p.toUpperCase()}
                      </button>
                    );
                  })}
                </div>

                {/* Title */}
                <label style={styles.label}>Title <Required /></label>
                <input style={styles.input} placeholder="🎉 Something exciting..." value={form.title}
                  onChange={e => set("title", e.target.value)} />

                {/* Body */}
                <label style={styles.label}>Body <Required /></label>
                <textarea style={{ ...styles.input, height: 90, resize: "vertical" }}
                  placeholder="Describe the update in a clear, friendly way..."
                  value={form.body} onChange={e => set("body", e.target.value)} />

                {/* Bullet points */}
                <label style={styles.label}>Bullet Points <span style={styles.optional}>(optional)</span></label>
                {form.bulletPoints.map((b, i) => (
                  <div key={i} style={styles.bulletRow}>
                    <span style={styles.bulletDot}>•</span>
                    <input style={{ ...styles.input, flex: 1, marginBottom: 0 }}
                      placeholder={`Point ${i + 1}...`} value={b}
                      onChange={e => setBullet(i, e.target.value)} />
                    {form.bulletPoints.length > 1 && (
                      <button style={styles.removeBtn} onClick={() => removeBullet(i)}>✕</button>
                    )}
                  </div>
                ))}
                <button style={styles.addBtn} onClick={addBullet}>+ Add bullet</button>

                {/* Actions */}
                <label style={styles.label}>CTA Buttons <span style={styles.optional}>(optional)</span></label>
                {form.actions.map((a, i) => (
                  <div key={i} style={styles.actionChip}>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{a.isPrimary ? "★ " : ""}{a.label}</span>
                    {a.deepLink && <span style={styles.deepLinkText}>{a.deepLink}</span>}
                    <button style={styles.removeBtn} onClick={() => removeAction(i)}>✕</button>
                  </div>
                ))}
                <div style={styles.actionBuilder}>
                  <input style={{ ...styles.input, flex: 1, marginBottom: 0 }} placeholder='Button label e.g. "Try it now"'
                    value={newAction.label} onChange={e => setNewAction(a => ({ ...a, label: e.target.value }))} />
                  <input style={{ ...styles.input, flex: 1, marginBottom: 0 }} placeholder="Deep link e.g. /inventory"
                    value={newAction.deepLink} onChange={e => setNewAction(a => ({ ...a, deepLink: e.target.value }))} />
                  <label style={styles.checkLabel}>
                    <input type="checkbox" checked={newAction.isPrimary}
                      onChange={e => setNewAction(a => ({ ...a, isPrimary: e.target.checked }))} />
                    Primary
                  </label>
                  <button style={styles.addBtn} onClick={addAction}>Add</button>
                </div>
              </div>
            )}

            {activeSection === "targeting" && (
              <div style={styles.section}>
                <label style={styles.label}>Target User IDs <span style={styles.optional}>(leave blank to broadcast to all)</span></label>
                <textarea style={{ ...styles.input, height: 80, fontFamily: "monospace", fontSize: 12 }}
                  placeholder="userId1, userId2, userId3..."
                  value={form.targetUserIds} onChange={e => set("targetUserIds", e.target.value)} />
                <div style={styles.hint}>Separate multiple IDs with commas. Empty = broadcast to everyone.</div>

                <label style={styles.label}>Expires At <span style={styles.optional}>(optional)</span></label>
                <input type="datetime-local" style={styles.input} value={form.expiresAt}
                  onChange={e => set("expiresAt", e.target.value)} />
                <div style={styles.hint}>Leave blank for no expiry.</div>
              </div>
            )}

            {activeSection === "extras" && (
              <div style={styles.section}>
                <label style={styles.label}>Image URL <span style={styles.optional}>(optional)</span></label>
                <input style={styles.input} placeholder="https://..." value={form.imageUrl}
                  onChange={e => set("imageUrl", e.target.value)} />

                <label style={styles.label}>Changelog Version <span style={styles.optional}>(optional)</span></label>
                <input style={styles.input} placeholder="e.g. 2.4.1" value={form.changelogVersion}
                  onChange={e => set("changelogVersion", e.target.value)} />

                <label style={styles.label}>Feedback Question <span style={styles.optional}>(optional — triggers 1-5 rating)</span></label>
                <input style={styles.input} placeholder="e.g. How useful was this feature?" value={form.feedbackQuestion}
                  onChange={e => set("feedbackQuestion", e.target.value)} />
              </div>
            )}

            {/* ── Submit ── */}
            <div style={styles.submitRow}>
              {status === "error" && <div style={styles.errorBanner}>⚠️ {errorMsg}</div>}
              {status === "success" && <div style={styles.successBanner}>✅ Notification sent to {form.targetUserIds.trim() ? "targeted users" : "all users"}!</div>}
              <button style={{ ...styles.submitBtn, opacity: status === "loading" ? 0.6 : 1 }}
                disabled={status === "loading"} onClick={handleSubmit}>
                {status === "loading" ? "Sending…" : `${typeMeta.icon} Send Notification`}
              </button>
            </div>
          </div>
        ) : (
          /* ── PREVIEW ── */
          <div style={styles.previewPane}>
            <div style={styles.previewLabel}>NOTIFICATION PREVIEW</div>
            <div style={styles.phoneFrame}>
              <div style={styles.phoneNotch} />
              <div style={styles.notifCard}>
                <div style={styles.notifHeader}>
                  <div style={{ ...styles.notifTypeBadge, background: typeMeta.color + "28", color: "#111" }}>
                    {typeMeta.icon} {typeMeta.label}
                  </div>
                  <div style={{ ...styles.priTag, background: priMeta.bg, color: priMeta.color }}>
                    {form.priority.toUpperCase()}
                  </div>
                </div>
                <div style={styles.notifTitle}>{form.title || "Your notification title"}</div>
                <div style={styles.notifBody}>{form.body || "Your notification body text will appear here."}</div>
                {form.bulletPoints.some(b => b.trim()) && (
                  <ul style={styles.notifBullets}>
                    {form.bulletPoints.filter(b => b.trim()).map((b, i) => (
                      <li key={i} style={styles.notifBullet}>{b}</li>
                    ))}
                  </ul>
                )}
                {form.actions.length > 0 && (
                  <div style={styles.notifActions}>
                    {form.actions.map((a, i) => (
                      <div key={i} style={{ ...styles.notifActionBtn, ...(a.isPrimary ? styles.notifActionBtnPrimary : {}) }}>
                        {a.label}
                      </div>
                    ))}
                  </div>
                )}
                <div style={styles.notifTs}>Just now</div>
              </div>
            </div>
            <div style={styles.jsonPreviewBox}>
              <div style={styles.jsonLabel}>JSON PAYLOAD</div>
              <pre style={styles.jsonPre}>{JSON.stringify({
                title: form.title,
                body: form.body,
                type: form.type,
                priority: form.priority,
                bulletPoints: form.bulletPoints.filter(b => b.trim()),
                actions: form.actions,
                ...(form.feedbackQuestion && { feedbackQuestion: form.feedbackQuestion }),
                ...(form.changelogVersion && { changelogVersion: form.changelogVersion }),
              }, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Required = () => <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>;

const styles = {
  root: { minHeight: "100vh", background: "#FAFAFA", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", position: "relative", overflow: "hidden" },
  gridBg: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.35, pointerEvents: "none" },
  header: { position: "sticky", top: 0, zIndex: 10, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E5E7EB", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  logoMark: { width: 40, height: 40, borderRadius: 10, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  headerTitle: { fontWeight: 800, fontSize: 17, color: "#111", letterSpacing: "-0.4px" },
  headerSub: { fontSize: 11, color: "#9CA3AF", fontWeight: 500 },
  headerRight: { display: "flex", gap: 8 },
  pill: { padding: "7px 16px", borderRadius: 20, border: "1.5px solid #E5E7EB", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" },
  workspace: { maxWidth: 720, margin: "0 auto", padding: "28px 20px 60px" },
  editor: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" },
  sectionNav: { display: "flex", borderBottom: "1px solid #F3F4F6", background: "#FAFAFA" },
  sectionBtn: { flex: 1, padding: "13px 0", border: "none", background: "transparent", fontSize: 13, fontWeight: 600, color: "#9CA3AF", cursor: "pointer", transition: "all 0.15s", borderBottom: "2px solid transparent" },
  sectionBtnActive: { color: "#111", borderBottom: "2px solid #111", background: "#fff" },
  section: { padding: "24px 28px" },
  label: { display: "block", fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8, marginTop: 20 },
  optional: { textTransform: "none", fontWeight: 400, color: "#9CA3AF", letterSpacing: 0, fontSize: 11 },
  input: { width: "100%", padding: "10px 13px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#111", background: "#FAFAFA", outline: "none", boxSizing: "border-box", marginBottom: 8, fontFamily: "inherit", transition: "border-color 0.15s" },
  typeGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 },
  typeBtn: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "12px 8px", border: "1.5px solid #E5E7EB", borderRadius: 12, cursor: "pointer", background: "#fff", transition: "all 0.15s" },
  priRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  priBtn: { padding: "7px 16px", borderRadius: 8, fontSize: 11, cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.5px" },
  bulletRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
  bulletDot: { color: "#9CA3AF", fontSize: 18, lineHeight: 1 },
  removeBtn: { background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", fontSize: 14, padding: "0 4px" },
  addBtn: { background: "none", border: "1.5px dashed #D1D5DB", borderRadius: 8, padding: "7px 14px", fontSize: 12, color: "#6B7280", cursor: "pointer", fontWeight: 600, marginTop: 4 },
  actionChip: { display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#F3F4F6", borderRadius: 8, marginBottom: 6, fontSize: 13 },
  deepLinkText: { fontSize: 11, color: "#9CA3AF", fontFamily: "monospace" },
  actionBuilder: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginTop: 8 },
  checkLabel: { display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#6B7280", fontWeight: 600, cursor: "pointer" },
  hint: { fontSize: 11, color: "#9CA3AF", marginTop: -4, marginBottom: 4 },
  submitRow: { padding: "20px 28px", borderTop: "1px solid #F3F4F6", display: "flex", flexDirection: "column", gap: 10 },
  submitBtn: { width: "100%", padding: "14px", background: "#111", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: "-0.2px", transition: "opacity 0.15s" },
  errorBanner: { background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#EF4444" },
  successBanner: { background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#16A34A" },
  // Preview
  previewPane: { display: "flex", flexDirection: "column", alignItems: "center", gap: 24 },
  previewLabel: { fontSize: 10, fontWeight: 800, letterSpacing: "2px", color: "#9CA3AF" },
  phoneFrame: { width: 320, background: "#111", borderRadius: 36, padding: "20px 16px 28px", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" },
  phoneNotch: { width: 80, height: 8, background: "#333", borderRadius: 4, margin: "0 auto 16px" },
  notifCard: { background: "#fff", borderRadius: 16, padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" },
  notifHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  notifTypeBadge: { padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 },
  priTag: { padding: "3px 8px", borderRadius: 6, fontSize: 10, fontWeight: 800, letterSpacing: "0.5px" },
  notifTitle: { fontSize: 15, fontWeight: 800, color: "#111", letterSpacing: "-0.3px", marginBottom: 6 },
  notifBody: { fontSize: 13, color: "#6B7280", lineHeight: 1.5, marginBottom: 10 },
  notifBullets: { paddingLeft: 16, margin: "0 0 10px" },
  notifBullet: { fontSize: 12, color: "#374151", marginBottom: 4 },
  notifActions: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 },
  notifActionBtn: { padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151", border: "none" },
  notifActionBtnPrimary: { background: "#111", color: "#fff" },
  notifTs: { fontSize: 10, color: "#9CA3AF" },
  jsonPreviewBox: { width: "100%", maxWidth: 640, background: "#111", borderRadius: 12, overflow: "hidden" },
  jsonLabel: { padding: "10px 16px 0", fontSize: 9, color: "#6B7280", fontWeight: 800, letterSpacing: "2px" },
  jsonPre: { padding: "12px 16px 16px", margin: 0, fontSize: 12, color: "#A3E635", fontFamily: "monospace", overflowX: "auto", lineHeight: 1.6 },
};