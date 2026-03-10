'use client';

import { useState, useEffect } from "react";
import NotificationCreator from "./NotificationCreator"; // adjust path if needed

const BASE_URL = "http://192.168.100.189:5000"; // keep in sync with NotificationCreator

export default function AdminAuthWrapper() {
  const [token, setToken]     = useState(null);
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus]   = useState(null); // null | 'loading' | 'error'
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = useState(false);

  // Restore token from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setStatus("error");
      setErrorMsg("Email and password are required.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Login failed");
      const t = data.token ?? data.accessToken ?? data.data?.token;
      if (!t) throw new Error("No token in response");
      sessionStorage.setItem("admin_token", t);
      setToken(t);
      setStatus(null);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e.message);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setEmail("");
    setPassword("");
  };

  // ── Authenticated: render the real app with injected token ──
  if (token) {
    return (
      <div style={s.root}>
        <div style={s.logoutBar}>
          <span style={s.loggedInTag}>🔐 Admin session active</span>
          <button style={s.logoutBtn} onClick={handleLogout}>Sign out</button>
        </div>
        {/* Pass token as prop so NotificationCreator can use it instead of its hardcoded one */}
        <NotificationCreator authToken={token} />
      </div>
    );
  }

  // ── Unauthenticated: login screen ──
  return (
    <div style={s.root}>
      <div style={s.gridBg} />

      <div style={s.centerWrap}>
        <div style={s.card}>
          {/* Logo */}
          <div style={s.logoRow}>
            <div style={s.logoMark}>📣</div>
            <div>
              <div style={s.appName}>Notification Studio</div>
              <div style={s.appSub}>Admin access only</div>
            </div>
          </div>

          <div style={s.divider} />

          <div style={s.fieldGroup}>
            <label style={s.label}>Email</label>
            <input
              style={s.input}
              type="email"
              placeholder="admin@yourapp.com"
              value={email}
              autoComplete="email"
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div style={s.fieldGroup}>
            <label style={s.label}>Password</label>
            <div style={s.passwordWrap}>
              <input
                style={{ ...s.input, paddingRight: 44 }}
                type={visible ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
              />
              <button style={s.eyeBtn} onClick={() => setVisible(v => !v)}>
                {visible ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {status === "error" && (
            <div style={s.errorBanner}>⚠️ {errorMsg}</div>
          )}

          <button
            style={{ ...s.submitBtn, opacity: status === "loading" ? 0.65 : 1 }}
            disabled={status === "loading"}
            onClick={handleLogin}
          >
            {status === "loading" ? "Signing in…" : "Sign in →"}
          </button>

          <div style={s.footer}>
            Session persists until you close the tab or sign out.
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  root: {
    minHeight: "100vh",
    background: "#FAFAFA",
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    position: "relative",
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
    backgroundSize: "32px 32px",
    opacity: 0.35,
    pointerEvents: "none",
  },
  centerWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "24px 16px",
    position: "relative",
  },
  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 20,
    padding: "36px 32px",
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
  },
  appName: {
    fontWeight: 800,
    fontSize: 18,
    color: "#111",
    letterSpacing: "-0.4px",
  },
  appSub: { fontSize: 12, color: "#9CA3AF", fontWeight: 500 },
  divider: {
    height: 1,
    background: "#F3F4F6",
    marginBottom: 24,
  },
  fieldGroup: { marginBottom: 16 },
  label: {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    color: "#374151",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "10px 13px",
    border: "1.5px solid #E5E7EB",
    borderRadius: 10,
    fontSize: 14,
    color: "#111",
    background: "#FAFAFA",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  },
  passwordWrap: { position: "relative" },
  eyeBtn: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    padding: 0,
    lineHeight: 1,
  },
  errorBanner: {
    background: "#FEF2F2",
    border: "1px solid #FCA5A5",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    color: "#EF4444",
    marginBottom: 14,
  },
  submitBtn: {
    width: "100%",
    padding: "13px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "-0.2px",
    transition: "opacity 0.15s",
    marginTop: 4,
  },
  footer: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 11,
    color: "#9CA3AF",
  },
  // Logged-in bar
  logoutBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 28px",
    background: "#F0FDF4",
    borderBottom: "1px solid #BBF7D0",
  },
  loggedInTag: { fontSize: 12, fontWeight: 600, color: "#16A34A" },
  logoutBtn: {
    background: "none",
    border: "1.5px solid #BBF7D0",
    borderRadius: 8,
    padding: "5px 12px",
    fontSize: 12,
    fontWeight: 600,
    color: "#16A34A",
    cursor: "pointer",
  },
};