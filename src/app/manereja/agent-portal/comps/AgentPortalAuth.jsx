'use client';
import { useState, useEffect, useRef, useCallback } from "react";

// ── CONFIG ────────────────────────────────────────────────────────────────────
const BASE = `${process.env.NEXT_PUBLIC_SERVER}/auth`;

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

// ── FLUTTER / MATERIAL 3 DESIGN TOKENS ───────────────────────────────────────
const M = {
  // Surface colours — Material 3 tonal surface system
  bg:            "#F6F2EE",
  surface:       "#FFFBF7",
  surfaceVar:    "#F0EBE3",
  outline:       "#C8BFB4",
  outlineSoft:   "#E8E1D9",

  // Brand — warm teal (Manereja accent)
  primary:       "#2D6A4F",
  primaryLight:  "#52B788",
  primaryCont:   "#D8F3DC",
  onPrimary:     "#FFFFFF",
  onPriCont:     "#1B4332",

  // Error
  error:         "#B3261E",
  errorCont:     "#F9DEDC",
  onErrCont:     "#410E0B",

  // Text
  onSurface:     "#1C1B1A",
  onSurfVar:     "#4E4743",
  onSurfSoft:    "#938880",

  // Elevation shadows (Flutter-style)
  elev1: "0 1px 2px rgba(0,0,0,0.10), 0 1px 3px 1px rgba(0,0,0,0.07)",
  elev2: "0 1px 2px rgba(0,0,0,0.12), 0 2px 6px 2px rgba(0,0,0,0.09)",
  elev3: "0 4px 8px 3px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.12)",

  // Typography — Nunito (warm, rounded, Flutter-ish) + DM Serif for display
  fontBody:    "'Nunito', 'Helvetica Neue', sans-serif",
  fontDisplay: "'DM Serif Display', Georgia, serif",

  // Shape tokens (Material 3 — rounded corners)
  shapeXS:  4,
  shapeSM:  8,
  shapeMD:  12,
  shapeLG:  16,
  shapeXL:  28,
  shapeFull: 9999,
};

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=DM+Serif+Display&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes ripple {
    from { transform: scale(0); opacity: 0.25; }
    to   { transform: scale(4); opacity: 0; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  @keyframes checkPop {
    0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
    60%  { transform: scale(1.2) rotate(5deg);  opacity: 1; }
    100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px ${M.surfaceVar} inset !important;
    -webkit-text-fill-color: ${M.onSurface} !important;
  }

  ::placeholder { color: ${M.onSurfSoft}; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${M.outline}; border-radius: 3px; }
`;

// ═══════════════════════════════════════════════════════════════════════════
//  MATERIAL 3 PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════

// ── Filled Button (M3) ────────────────────────────────────────────────────────
const FilledBtn = ({ children, onClick, disabled, loading, fullWidth, variant = "primary" }) => {
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  const addRipple = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y }]);
    setTimeout(() => setRipples(r => r.filter(rr => rr.id !== id)), 600);
  };

  const bg = variant === "primary" ? M.primary : M.errorCont;
  const fg = variant === "primary" ? M.onPrimary : M.onErrCont;
  const hov = variant === "primary" ? "#245A42" : "#EECFCD";

  return (
    <button
      ref={btnRef}
      onClick={(e) => { if (!disabled && !loading) { addRipple(e); onClick?.(e); } }}
      disabled={disabled || loading}
      style={{
        position: "relative", overflow: "hidden",
        width: fullWidth ? "100%" : "auto",
        padding: "14px 24px",
        background: disabled ? M.outlineSoft : bg,
        color: disabled ? M.onSurfSoft : fg,
        border: "none", borderRadius: M.shapeFull,
        fontFamily: M.fontBody, fontSize: 14, fontWeight: 700,
        letterSpacing: "0.1px", cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        transition: "background 0.2s, box-shadow 0.2s",
        boxShadow: disabled ? "none" : M.elev1,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.boxShadow = M.elev2; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = disabled ? "none" : M.elev1; }}
    >
      {ripples.map(r => (
        <span key={r.id} style={{
          position: "absolute", left: r.x, top: r.y,
          width: 10, height: 10, borderRadius: "50%",
          background: "rgba(255,255,255,0.4)",
          transform: "scale(0)", animation: "ripple 0.6s ease-out",
          pointerEvents: "none",
        }} />
      ))}
      {loading
        ? <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.75s linear infinite" }}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="48 16"/></svg> Please wait…</>
        : children}
    </button>
  );
};

// ── Text Button (M3) ──────────────────────────────────────────────────────────
const TextBtn = ({ children, onClick, color = M.primary, style = {} }) => (
  <button onClick={onClick} style={{
    background: "none", border: "none", cursor: "pointer",
    fontFamily: M.fontBody, fontSize: 13, fontWeight: 700,
    color, letterSpacing: "0.1px", padding: "4px 8px",
    borderRadius: M.shapeSM, transition: "background 0.15s",
    display: "inline-flex", alignItems: "center", gap: 4, ...style,
  }}
    onMouseEnter={e => e.currentTarget.style.background = `${color}18`}
    onMouseLeave={e => e.currentTarget.style.background = "none"}
  >{children}</button>
);

// ── M3 Outlined Text Field ─────────────────────────────────────────────────────
const TextField = ({ label, value, onChange, type = "text", placeholder = "", error, helper, trailingIcon, leadingIcon, autoFocus }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const floated = focused || hasValue;
  const borderColor = error ? M.error : focused ? M.primary : M.outline;

  return (
    <div style={{ marginBottom: error ? 6 : 18, position: "relative" }}>
      {/* Container */}
      <div style={{
        position: "relative",
        border: `${focused || error ? 2 : 1.5}px solid ${borderColor}`,
        borderRadius: M.shapeMD,
        background: M.surface,
        transition: "border-color 0.2s, border-width 0.1s",
        cursor: "text",
      }}>
        {/* Floating label */}
        <label style={{
          position: "absolute",
          left: leadingIcon ? 44 : 14,
          top: floated ? -10 : "50%",
          transform: floated ? "none" : "translateY(-50%)",
          fontSize: floated ? 11 : 14,
          fontWeight: floated ? 700 : 400,
          color: error ? M.error : focused ? M.primary : M.onSurfSoft,
          background: floated ? M.surface : "transparent",
          padding: floated ? "0 4px" : "0",
          transition: "all 0.18s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
          fontFamily: M.fontBody,
          letterSpacing: floated ? "0.4px" : "0",
          zIndex: 1,
        }}>{label}</label>

        <div style={{ display: "flex", alignItems: "center" }}>
          {leadingIcon && (
            <span style={{ padding: "0 0 0 14px", color: error ? M.error : focused ? M.primary : M.onSurfSoft, fontSize: 18, flexShrink: 0, display: "flex" }}>
              {leadingIcon}
            </span>
          )}
          <input
            autoFocus={autoFocus}
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? placeholder : ""}
            style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              padding: `${floated ? 18 : 14}px ${trailingIcon ? 0 : 14}px 10px ${leadingIcon ? 10 : 14}px`,
              fontSize: 14, color: M.onSurface,
              fontFamily: M.fontBody, fontWeight: 500,
              transition: "padding 0.18s",
            }}
          />
          {trailingIcon && (
            <span style={{ padding: "0 12px 0 8px", display: "flex", alignItems: "center", flexShrink: 0 }}>
              {trailingIcon}
            </span>
          )}
        </div>
      </div>

      {/* Helper / error text */}
      {(error || helper) && (
        <div style={{
          fontSize: 11.5, marginTop: 4, paddingLeft: 14,
          color: error ? M.error : M.onSurfSoft,
          fontFamily: M.fontBody, fontWeight: error ? 600 : 400,
          animation: error ? "fadeUp 0.2s ease" : "none",
        }}>
          {error ? `⚠ ${error}` : helper}
        </div>
      )}
    </div>
  );
};

// ── Surface Card (M3 tonal card) ──────────────────────────────────────────────
const Card = ({ children, style = {}, elev = 1 }) => (
  <div style={{
    background: M.surface,
    borderRadius: M.shapeXL,
    boxShadow: elev === 1 ? M.elev1 : elev === 2 ? M.elev2 : M.elev3,
    ...style,
  }}>{children}</div>
);

// ── Chip (status / label) ─────────────────────────────────────────────────────
const Chip = ({ label, icon, color = M.primary, bg = M.primaryCont }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "4px 12px 4px 8px", borderRadius: M.shapeFull,
    background: bg, color, fontSize: 11.5, fontWeight: 700,
    fontFamily: M.fontBody, letterSpacing: "0.2px",
  }}>
    {icon && <span style={{ fontSize: 13 }}>{icon}</span>}
    {label}
  </span>
);

// ── Progress bar ──────────────────────────────────────────────────────────────
const LinearProgress = ({ value }) => (
  <div style={{ height: 3, background: M.outlineSoft, borderRadius: 2, overflow: "hidden", marginBottom: 28 }}>
    <div style={{
      height: "100%", borderRadius: 2,
      background: `linear-gradient(90deg, ${M.primaryLight}, ${M.primary})`,
      width: `${value}%`, transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
    }} />
  </div>
);

// ── 6-digit OTP boxes ─────────────────────────────────────────────────────────
const OtpInput = ({ onComplete, error, resetKey }) => {
  const refs = useRef([]);
  const [vals, setVals] = useState(Array(6).fill(""));
  useEffect(() => { setVals(Array(6).fill("")); refs.current[0]?.focus(); }, [resetKey]);

  const update = (i, raw) => {
    const d = raw.replace(/\D/g, "").slice(-1);
    const next = [...vals]; next[i] = d; setVals(next);
    if (d && i < 5) refs.current[i + 1]?.focus();
    if (next.every(v => v)) onComplete(next.join(""));
  };
  const onKey = (i, e) => {
    if (e.key === "Backspace") {
      const next = [...vals]; next[i] = ""; setVals(next);
      if (!vals[i] && i > 0) refs.current[i - 1]?.focus();
    }
  };
  const onPaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    const next = Array(6).fill(""); digits.forEach((d, i) => next[i] = d);
    setVals(next);
    refs.current[Math.min(digits.length, 5)]?.focus();
    if (digits.length === 6) onComplete(digits.join(""));
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {vals.map((v, i) => (
          <input key={i} ref={el => refs.current[i] = el}
            type="text" inputMode="numeric" maxLength={1} value={v}
            onChange={e => update(i, e.target.value)}
            onKeyDown={e => onKey(i, e)} onPaste={onPaste}
            style={{
              width: 46, height: 56, textAlign: "center",
              fontSize: 22, fontWeight: 900, color: M.onSurface,
              border: `2px solid ${error ? M.error : v ? M.primary : M.outline}`,
              borderRadius: M.shapeMD,
              background: v ? M.primaryCont : M.surface,
              fontFamily: M.fontBody, outline: "none",
              transition: "all 0.15s", caretColor: M.primary,
            }}
          />
        ))}
      </div>
      {error && (
        <div style={{ textAlign: "center", fontSize: 12, color: M.error, marginTop: 10, fontWeight: 600, animation: "fadeUp 0.2s ease" }}>
          ⚠ {error}
        </div>
      )}
    </div>
  );
};

// ── Page shell ────────────────────────────────────────────────────────────────
const Shell = ({ children, wide = false }) => (
  <>
    <style>{GLOBAL}</style>
    <div style={{
      minHeight: "100vh",
      background: M.bg,
      backgroundImage: `
        radial-gradient(ellipse 700px 500px at 10% 0%, ${M.primaryCont}99 0%, transparent 60%),
        radial-gradient(ellipse 500px 400px at 90% 100%, ${M.primaryCont}55 0%, transparent 55%)
      `,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px 48px",
      fontFamily: M.fontBody,
    }}>
      <div style={{ width: "100%", maxWidth: wide ? 480 : 400 }}>
        {/* Top brand bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 28, animation: "slideRight 0.4s ease" }}>
          <div style={{
            width: 40, height: 40, borderRadius: M.shapeMD,
            background: M.primary, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: M.elev2,
          }}>🤝</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: M.onSurface, letterSpacing: "-0.2px" }}>Manereja</div>
            <div style={{ fontSize: 11.5, color: M.onSurfSoft, fontWeight: 500 }}>Agent Portal</div>
          </div>
        </div>
        {children}
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 11.5, color: M.onSurfSoft }}>
          Manereja · Agent Programme · Secure Portal
        </div>
      </div>
    </div>
  </>
);

// ═══════════════════════════════════════════════════════════════════════════
//  SCREEN: LOGIN
// ═══════════════════════════════════════════════════════════════════════════
const LoginScreen = ({ onLogin, onRegister, onForgot }) => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const submit = async () => {
    if (!email || !password) { setError("Please fill in both fields."); return; }
    setLoading(true); setError("");
    try {
      const d = await api("/agents/login", null, { method: "POST", body: JSON.stringify({ email, password }) });
      sessionStorage.setItem("agent_token", d.token);
      onLogin(d.token, d.agent);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const onEnter = (e) => { if (e.key === "Enter") submit(); };

  return (
    <Shell>
      <Card style={{ padding: "36px 32px", animation: "scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
        {/* Heading */}
        <div style={{ marginBottom: 28 }}>
          <Chip label="Agent Sign In" icon="🔒" />
          <h1 style={{
            fontFamily: M.fontDisplay, fontSize: 28, color: M.onSurface,
            margin: "12px 0 6px", letterSpacing: "-0.3px", lineHeight: 1.2,
          }}>Welcome back</h1>
          <p style={{ fontSize: 13.5, color: M.onSurfVar, lineHeight: 1.6 }}>
            Sign in to manage your referrals and track commission earnings.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            background: M.errorCont, border: `1px solid ${M.error}33`,
            borderRadius: M.shapeMD, padding: "11px 14px",
            fontSize: 13, color: M.onErrCont, fontWeight: 600,
            marginBottom: 18, animation: "fadeUp 0.2s ease",
            display: "flex", alignItems: "flex-start", gap: 8,
          }}>
            <span style={{ flexShrink: 0 }}>⚠️</span> {error}
          </div>
        )}

        <TextField
          label="Email address" type="email" value={email} onChange={setEmail}
          placeholder="you@example.com" autoFocus
          leadingIcon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>}
        />
        <TextField
          label="Password" type={showPw ? "text" : "password"} value={password}
          onChange={setPassword}
          leadingIcon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
          trailingIcon={
            <button type="button" onClick={() => setShowPw(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: M.onSurfSoft, borderRadius: M.shapeSM, display: "flex" }}>
              {showPw
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
            </button>
          }
        />

        {/* Forgot password */}
        <div style={{ textAlign: "right", marginTop: -10, marginBottom: 22 }}>
          <TextBtn onClick={onForgot} color={M.primary} style={{ fontSize: 12.5 }}>
            Forgot password?
          </TextBtn>
        </div>

        <FilledBtn onClick={submit} loading={loading} fullWidth>Sign in →</FilledBtn>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
          <div style={{ flex: 1, height: 1, background: M.outlineSoft }} />
          <span style={{ fontSize: 12, color: M.onSurfSoft, fontWeight: 600 }}>or</span>
          <div style={{ flex: 1, height: 1, background: M.outlineSoft }} />
        </div>

        {/* Register CTA */}
        <div style={{
          background: M.primaryCont, borderRadius: M.shapeLG,
          padding: "16px 18px",
          border: `1px solid ${M.primary}22`,
        }}>
          <div style={{ fontWeight: 800, fontSize: 13.5, color: M.onPriCont, marginBottom: 5 }}>
            New to the Agent Programme?
          </div>
          <div style={{ fontSize: 12.5, color: M.onSurfVar, lineHeight: 1.6, marginBottom: 12 }}>
            Register, verify your email, and start earning commissions from businesses you refer.
          </div>
          <FilledBtn onClick={onRegister} style={{ background: M.onPriCont }}>
            Register as Agent →
          </FilledBtn>
        </div>
      </Card>
    </Shell>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
//  SCREEN: FORGOT PASSWORD — step 1: enter email
// ═══════════════════════════════════════════════════════════════════════════
const ForgotEmail = ({ onBack, onSent }) => {
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const submit = async () => {
    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true); setError("");
    try {
      await api("/agents/forgot-password", null, {
        method: "POST",
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      onSent(email.trim().toLowerCase());
    } catch (e) {
      // Always advance — don't leak whether email exists
      onSent(email.trim().toLowerCase());
    } finally { setLoading(false); }
  };

  return (
    <Shell>
      <Card style={{ padding: "36px 32px", animation: "scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <LinearProgress value={33} />

        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          color: M.onSurfVar, fontSize: 13, fontWeight: 600,
          fontFamily: M.fontBody, marginBottom: 22, padding: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Sign in
        </button>

        {/* Icon */}
        <div style={{
          width: 60, height: 60, borderRadius: M.shapeXL,
          background: `linear-gradient(135deg, ${M.primaryLight}, ${M.primary})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, marginBottom: 20, boxShadow: M.elev2,
        }}>🔑</div>

        <h2 style={{ fontFamily: M.fontDisplay, fontSize: 26, color: M.onSurface, margin: "0 0 8px", letterSpacing: "-0.3px" }}>
          Reset your password
        </h2>
        <p style={{ fontSize: 13.5, color: M.onSurfVar, lineHeight: 1.65, marginBottom: 26 }}>
          Enter the email linked to your agent account. We'll send a 6-digit reset code.
        </p>

        {error && (
          <div style={{ background: M.errorCont, borderRadius: M.shapeMD, padding: "11px 14px", fontSize: 13, color: M.onErrCont, fontWeight: 600, marginBottom: 16 }}>
            ⚠ {error}
          </div>
        )}

        <TextField
          label="Email address" type="email" value={email} onChange={setEmail}
          placeholder="you@example.com" autoFocus
          leadingIcon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>}
        />

        <div style={{ marginTop: 4 }}>
          <FilledBtn onClick={submit} loading={loading} fullWidth>
            Send Reset Code →
          </FilledBtn>
        </div>

        <div style={{
          marginTop: 18, padding: "11px 14px",
          background: M.surfaceVar, borderRadius: M.shapeMD,
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 15, flexShrink: 0 }}>ℹ️</span>
          <span style={{ fontSize: 12, color: M.onSurfSoft, lineHeight: 1.55 }}>
            If an agent account exists for this email, a code will be sent. Check spam if needed.
          </span>
        </div>
      </Card>
    </Shell>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
//  SCREEN: FORGOT PASSWORD — step 2: enter OTP
// ═══════════════════════════════════════════════════════════════════════════
const ForgotOtp = ({ email, onVerified, onBack }) => {
  const [otpKey, setOtpKey]       = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resentOk, setResentOk]   = useState(false);
  const [otpError, setOtpError]   = useState("");
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const verify = useCallback(async (otp) => {
    setVerifying(true); setOtpError("");
    try {
      await api("/agents/verify-reset-otp", null, {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });
      onVerified(otp);
    } catch (e) {
      setOtpError(e.message || "Invalid or expired code. Try again.");
    } finally { setVerifying(false); }
  }, [email]);

  const resend = async () => {
    if (resending || countdown > 0) return;
    setResending(true); setResentOk(false); setOtpError("");
    try {
      await api("/agents/forgot-password", null, {
        method: "POST", body: JSON.stringify({ email }),
      });
      setResentOk(true); setCountdown(120); setOtpKey(k => k + 1);
    } catch { setOtpError("Failed to resend."); }
    finally { setResending(false); }
  };

  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  return (
    <Shell>
      <Card style={{ padding: "36px 32px", animation: "scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <LinearProgress value={66} />

        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          color: M.onSurfVar, fontSize: 13, fontWeight: 600,
          fontFamily: M.fontBody, marginBottom: 22, padding: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Change email
        </button>

        {/* Animated envelope */}
        <div style={{
          width: 68, height: 68, borderRadius: "50%",
          background: `linear-gradient(135deg, ${M.primaryLight}, ${M.primary})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, marginBottom: 18, boxShadow: M.elev3,
        }}>✉️</div>

        <h2 style={{ fontFamily: M.fontDisplay, fontSize: 24, color: M.onSurface, margin: "0 0 8px" }}>
          Check your inbox
        </h2>
        <p style={{ fontSize: 13.5, color: M.onSurfVar, lineHeight: 1.65, marginBottom: 26 }}>
          We sent a 6-digit code to <strong style={{ color: M.onSurface }}>{email}</strong>
        </p>

        <div style={{ marginBottom: 24 }}>
          <OtpInput onComplete={verify} error={otpError} resetKey={otpKey} />
        </div>

        <FilledBtn
          fullWidth
          loading={verifying}
          onClick={() => {}}
          disabled={verifying}
        >
          Verify Code
        </FilledBtn>

        <div style={{ height: 1, background: M.outlineSoft, margin: "20px 0" }} />

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: M.onSurfSoft, marginBottom: 10 }}>Didn't get the code?</div>
          {countdown > 0 ? (
            <span style={{ fontSize: 13, color: M.onSurfVar, fontWeight: 600 }}>
              Resend in{" "}
              <span style={{ fontFamily: "monospace", color: M.primary, fontWeight: 900 }}>{mm}:{ss}</span>
            </span>
          ) : (
            <TextBtn onClick={resend} color={M.primary}>
              {resending
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.75s linear infinite" }}><circle cx="12" cy="12" r="10" stroke={M.primary} strokeWidth="3" strokeDasharray="48 16"/></svg> Sending…</>
                : "↺ Resend code"}
            </TextBtn>
          )}
          {resentOk && (
            <div style={{
              marginTop: 10, padding: "9px 12px",
              background: M.primaryCont, borderRadius: M.shapeMD,
              fontSize: 12, color: M.onPriCont, fontWeight: 600,
            }}>
              ✅ New code sent — check inbox and spam.
            </div>
          )}
        </div>
      </Card>
    </Shell>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
//  SCREEN: FORGOT PASSWORD — step 3: set new password
// ═══════════════════════════════════════════════════════════════════════════
const ForgotNewPassword = ({ email, otp, onDone }) => {
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [showCf, setShowCf]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState({});
  const [apiError, setApiError]   = useState("");

  // Live password strength
  const strength = (() => {
    let s = 0;
    if (password.length >= 8)            s++;
    if (/[A-Z]/.test(password))          s++;
    if (/[a-z]/.test(password))          s++;
    if (/\d/.test(password))             s++;
    if (/[^A-Za-z0-9]/.test(password))  s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"][strength];
  const strengthColor = ["", M.error, "#E67C00", "#C9A800", M.primaryLight, M.primary][strength];

  const submit = async () => {
    const e = {};
    if (password.length < 8) e.password = "Minimum 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) e.password = "Needs uppercase, lowercase & a number";
    if (password !== confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true); setApiError("");
    try {
      await api("/agents/reset-password", null, {
        method: "POST",
        body: JSON.stringify({ email, otp, newPassword: password }),
      });
      onDone();
    } catch (err) { setApiError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <Shell>
      <Card style={{ padding: "36px 32px", animation: "scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <LinearProgress value={100} />

        <div style={{
          width: 60, height: 60, borderRadius: M.shapeXL,
          background: `linear-gradient(135deg, ${M.primaryLight}, ${M.primary})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, marginBottom: 18, boxShadow: M.elev2,
        }}>🛡️</div>

        <h2 style={{ fontFamily: M.fontDisplay, fontSize: 24, color: M.onSurface, margin: "0 0 8px" }}>
          Create new password
        </h2>
        <p style={{ fontSize: 13.5, color: M.onSurfVar, lineHeight: 1.6, marginBottom: 24 }}>
          Choose a strong password for <strong style={{ color: M.onSurface }}>{email}</strong>
        </p>

        {apiError && (
          <div style={{ background: M.errorCont, borderRadius: M.shapeMD, padding: "11px 14px", fontSize: 13, color: M.onErrCont, fontWeight: 600, marginBottom: 16 }}>
            ⚠ {apiError}
          </div>
        )}

        <TextField
          label="New password" type={showPw ? "text" : "password"}
          value={password} onChange={setPassword} error={errors.password}
          leadingIcon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
          trailingIcon={
            <button type="button" onClick={() => setShowPw(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: M.onSurfSoft, borderRadius: M.shapeSM, display: "flex" }}>
              {showPw
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
            </button>
          }
        />

        {/* Strength meter */}
        {password.length > 0 && (
          <div style={{ marginTop: -10, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
              {[1, 2, 3, 4, 5].map(n => (
                <div key={n} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: n <= strength ? strengthColor : M.outlineSoft,
                  transition: "background 0.25s",
                }} />
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: strengthColor, fontWeight: 700 }}>
              {strengthLabel}
            </div>
          </div>
        )}

        <TextField
          label="Confirm password" type={showCf ? "text" : "password"}
          value={confirm} onChange={setConfirm} error={errors.confirm}
          leadingIcon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
          trailingIcon={
            <button type="button" onClick={() => setShowCf(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: M.onSurfSoft, borderRadius: M.shapeSM, display: "flex" }}>
              {showCf
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
            </button>
          }
        />

        <FilledBtn onClick={submit} loading={loading} fullWidth>
          Set New Password →
        </FilledBtn>
      </Card>
    </Shell>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
//  SCREEN: RESET SUCCESS
// ═══════════════════════════════════════════════════════════════════════════
const ResetSuccess = ({ onGoLogin }) => (
  <Shell>
    <Card style={{ padding: "40px 32px", textAlign: "center", animation: "scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
      {/* Animated checkmark */}
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: `linear-gradient(135deg, ${M.primaryLight}, ${M.primary})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 22px", boxShadow: M.elev3,
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" }}>
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>

      <Chip label="Password Reset" icon="✅" />

      <h2 style={{
        fontFamily: M.fontDisplay, fontSize: 28, color: M.onSurface,
        margin: "14px 0 8px", letterSpacing: "-0.3px",
      }}>All done!</h2>

      <p style={{ fontSize: 14, color: M.onSurfVar, lineHeight: 1.7, marginBottom: 28, maxWidth: 300, marginInline: "auto" }}>
        Your password has been reset successfully. Sign in with your new credentials.
      </p>

      <FilledBtn onClick={onGoLogin} fullWidth>
        Sign in to Portal →
      </FilledBtn>
    </Card>
  </Shell>
);

// ═══════════════════════════════════════════════════════════════════════════
//  ROOT — EXPORTS JUST THE AUTH SECTION  (drop into your existing portal root)
// ═══════════════════════════════════════════════════════════════════════════
//
//  authStage: "login" | "forgot-email" | "forgot-otp" | "forgot-pw" | "forgot-done"
//
//  Plug into your existing AgentPortal root like so:
//
//    if (authStage === "login")       return <LoginScreen onLogin={...} onRegister={...} onForgot={...} />;
//    if (authStage === "forgot-email") return <ForgotEmail onBack={...} onSent={...} />;
//    if (authStage === "forgot-otp")   return <ForgotOtp email={...} onVerified={...} onBack={...} />;
//    if (authStage === "forgot-pw")    return <ForgotNewPassword email={...} otp={...} onDone={...} />;
//    if (authStage === "forgot-done")  return <ResetSuccess onGoLogin={...} />;

export default function AgentPortalAuth() {
  const [stage, setStage]         = useState("login");
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp]   = useState("");

  // Simulate login for preview
  const [authed, setAuthed] = useState(false);
  if (authed) return (
    <Shell>
      <Card style={{ padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontFamily: M.fontDisplay, fontSize: 24, color: M.onSurface, marginBottom: 8 }}>Signed in!</h2>
        <p style={{ color: M.onSurfVar, marginBottom: 20 }}>You're authenticated. The portal dashboard would load here.</p>
        <TextBtn onClick={() => { setAuthed(false); setStage("login"); }} color={M.primary}>← Back to auth screens</TextBtn>
      </Card>
    </Shell>
  );

  if (stage === "login") return (
    <LoginScreen
      onLogin={() => setAuthed(true)}
      onRegister={() => alert("Register flow — plug in your existing RegWelcome screen here")}
      onForgot={() => setStage("forgot-email")}
    />
  );
  if (stage === "forgot-email") return (
    <ForgotEmail
      onBack={() => setStage("login")}
      onSent={(email) => { setResetEmail(email); setStage("forgot-otp"); }}
    />
  );
  if (stage === "forgot-otp") return (
    <ForgotOtp
      email={resetEmail}
      onBack={() => setStage("forgot-email")}
      onVerified={(otp) => { setResetOtp(otp); setStage("forgot-pw"); }}
    />
  );
  if (stage === "forgot-pw") return (
    <ForgotNewPassword
      email={resetEmail}
      otp={resetOtp}
      onDone={() => setStage("forgot-done")}
    />
  );
  if (stage === "forgot-done") return (
    <ResetSuccess onGoLogin={() => setStage("login")} />
  );
}

// ── Named exports (for use in AgentPortal root) ───────────────────────────────
export { LoginScreen, ForgotEmail, ForgotOtp, ForgotNewPassword, ResetSuccess };