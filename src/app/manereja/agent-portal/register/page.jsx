'use client';
import { useState, useEffect, useRef, useCallback } from "react";

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
  accentDark:   "#4A6558",
  danger:       "#C0533A",
  dangerSoft:   "#FBF0ED",
  warn:         "#B07D3A",
  warnSoft:     "#FDF6EE",
  success:      "#4A7A5A",
  successSoft:  "#EEF5F1",
  info:         "#3A6580",
  infoSoft:     "#EEF4F8",
  sidebar:      "#2C2925",

  font:         "'Outfit', 'Helvetica Neue', sans-serif",
  fontDisplay:  "'DM Serif Display', Georgia, serif",
};

// ── STAGES ────────────────────────────────────────────────────────────────────
// 1. welcome    — hero landing with benefits
// 2. form       — registration form
// 3. otp        — 6-digit email OTP
// 4. success    — confirmation + go to portal

// ── API HELPER ────────────────────────────────────────────────────────────────
const api = async (path, opts = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// ── MICRO COMPONENTS ──────────────────────────────────────────────────────────
const Spinner = ({ size = 18, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    style={{ animation: "spin 0.8s linear infinite" }}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" strokeDasharray="40 20" />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </svg>
);

const Pill = ({ children, color = T.accent, bg = T.accentSoft }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "3px 11px", borderRadius: 20, background: bg, color,
    fontSize: 11, fontWeight: 700, letterSpacing: "0.3px",
  }}>{children}</span>
);

const FieldError = ({ msg }) => msg ? (
  <div style={{ fontSize: 11.5, color: T.danger, marginTop: 4, fontWeight: 500 }}>
    ⚠ {msg}
  </div>
) : null;

// ── ANIMATED WRAPPER ──────────────────────────────────────────────────────────
// CSS-only fade+slide animation per stage
const Slide = ({ children, direction = "up" }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const from = direction === "up" ? "translateY(18px)" : "translateY(-18px)";
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : from,
      transition: "opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1)",
    }}>
      {children}
    </div>
  );
};

// ── FIELD ─────────────────────────────────────────────────────────────────────
const Field = ({ label, value, onChange, type = "text", placeholder = "", error, icon, suffix, style = {} }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textMid, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </div>
      )}
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 15, opacity: 0.5 }}>
            {icon}
          </div>
        )}
        <input
          type={type} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: "100%", padding: icon ? "10px 13px 10px 38px" : "10px 13px",
            border: `1.5px solid ${error ? T.danger : focused ? T.accent : T.border}`,
            borderRadius: 9, fontSize: 13.5, color: T.text, background: T.bg,
            fontFamily: T.font, outline: "none", boxSizing: "border-box",
            transition: "border-color 0.15s",
            paddingRight: suffix ? 44 : 13,
            ...style,
          }}
        />
        {suffix && (
          <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
            {suffix}
          </div>
        )}
      </div>
      <FieldError msg={error} />
    </div>
  );
};

// ── RATE PICKER ───────────────────────────────────────────────────────────────
const RatePicker = ({ value, onChange }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: T.textMid, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
      Commission Rate
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
      {[0.10].map(r => {
        const sel = value === r;
        return (
          <button key={r} type="button" onClick={() => onChange(r)}
            style={{
              padding: "9px 0", border: `1.5px solid ${sel ? T.accent : T.border}`,
              borderRadius: 9, background: sel ? T.accentSoft : T.surface,
              cursor: "pointer", fontSize: 13, fontWeight: 700,
              color: sel ? T.accent : T.textMid, fontFamily: T.font,
              transition: "all 0.15s",
            }}>
            {(r * 100).toFixed(0)}%
          </button>
        );
      })}
    </div>
    <div style={{ fontSize: 11.5, color: T.textSoft, marginTop: 6 }}>
      This is the commission you earn per paid subscription you refer.
    </div>
  </div>
);

// ── OTP BOX ROW ───────────────────────────────────────────────────────────────
const OtpInput = ({ onComplete, error, onClear }) => {
  const inputs = useRef([]);
  const [vals, setVals] = useState(["", "", "", "", "", ""]);

  const update = (idx, val) => {
    // Allow only digits
    const digit = val.replace(/\D/, "").slice(-1);
    const next = [...vals];
    next[idx] = digit;
    setVals(next);
    if (digit && idx < 5) inputs.current[idx + 1]?.focus();
    if (next.every(v => v) && next.join("").length === 6) onComplete(next.join(""));
  };

  const onKey = (idx, e) => {
    if (e.key === "Backspace" && !vals[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
    if (e.key === "Backspace") {
      const next = [...vals];
      next[idx] = "";
      setVals(next);
      onClear?.();
    }
  };

  const onPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((c, i) => { next[i] = c; });
    setVals(next);
    const lastIdx = Math.min(pasted.length, 5);
    inputs.current[lastIdx]?.focus();
    if (pasted.length === 6) onComplete(pasted);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {vals.map((v, i) => (
          <input
            key={i}
            ref={el => inputs.current[i] = el}
            type="text" inputMode="numeric" maxLength={1}
            value={v}
            onChange={e => update(i, e.target.value)}
            onKeyDown={e => onKey(i, e)}
            onPaste={onPaste}
            style={{
              width: 48, height: 58, textAlign: "center",
              fontSize: 22, fontWeight: 800, color: T.text,
              border: `1.5px solid ${error ? T.danger : v ? T.accent : T.border}`,
              borderRadius: 10, background: v ? T.accentSoft : T.bg,
              fontFamily: T.font, outline: "none",
              transition: "border-color 0.15s, background 0.15s",
              caretColor: T.accent,
            }}
          />
        ))}
      </div>
      {error && (
        <div style={{ textAlign: "center", fontSize: 12, color: T.danger, marginTop: 10, fontWeight: 500 }}>
          ⚠ {error}
        </div>
      )}
    </div>
  );
};

// ── BENEFIT ROW ───────────────────────────────────────────────────────────────
const Benefit = ({ icon, title, desc, delay }) => (
  <div style={{
    display: "flex", gap: 14, padding: "14px 0",
    borderBottom: `1px solid ${T.borderSoft}`,
    animation: `fadeSlide 0.4s ease both`,
    animationDelay: `${delay}ms`,
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: 10, background: T.accentSoft,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 18, flexShrink: 0,
    }}>{icon}</div>
    <div>
      <div style={{ fontWeight: 700, fontSize: 13.5, color: T.text, marginBottom: 3 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: T.textSoft, lineHeight: 1.55 }}>{desc}</div>
    </div>
  </div>
);

// ── PROGRESS BAR ─────────────────────────────────────────────────────────────
const StepDots = ({ current, total }) => (
  <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 28 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        height: 6, borderRadius: 3,
        width: i === current ? 22 : 6,
        background: i <= current ? T.accent : T.border,
        transition: "all 0.25s ease",
      }} />
    ))}
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// STAGE 1 — WELCOME / HERO
// ═════════════════════════════════════════════════════════════════════════════
const WelcomeStage = ({ onStart, onLogin }) => (
  <Slide>
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      <div style={{
        width: 64, height: 64, background: T.sidebar, borderRadius: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, margin: "0 auto 20px", boxShadow: "0 4px 20px rgba(44,41,37,0.18)",
      }}>🤝</div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
        <Pill color={T.success} bg={T.successSoft}>Commission Agent Programme</Pill>
      </div>

      <h1 style={{
        fontFamily: T.fontDisplay, fontSize: 30, color: T.text,
        margin: "0 0 12px", lineHeight: 1.2, letterSpacing: "-0.5px",
      }}>
        Earn by referring<br />businesses to Manereja
      </h1>
      <p style={{ fontSize: 14, color: T.textMid, margin: 0, lineHeight: 1.65, maxWidth: 360, marginInline: "auto" }}>
        Join our agent programme — earn a percentage of every subscription
        payment from businesses you refer. Monthly payouts, real-time tracking.
      </p>
    </div>

    {/* Benefits */}
    <div style={{ marginBottom: 28 }}>
      <Benefit delay={80}  icon="💰" title="Earn on every payment" desc="Get your commission automatically logged for each subscription payment your referral makes." />
      <Benefit delay={130} icon="📊" title="Real-time dashboard" desc="Track your referrals, active subscribers, and pending commissions from one place." />
      <Benefit delay={180} icon="📅" title="Monthly settlement" desc="Commissions are calculated and paid out at end of each month, with a full ledger history." />
      <Benefit delay={230} icon="🔗" title="Flexible commission rates" desc="Commission rates from 10% to 40% — set at registration based on your agreement." />
    </div>

    <button
      onClick={onStart}
      style={{
        width: "100%", padding: "13px 0", background: T.accent, color: "#fff",
        border: "none", borderRadius: 12, fontSize: 14.5, fontWeight: 700,
        cursor: "pointer", fontFamily: T.font, letterSpacing: "-0.1px",
        boxShadow: `0 4px 14px ${T.accent}55`, transition: "all 0.15s",
      }}
    >
      Register as an Agent →
    </button>

    <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: T.textSoft }}>
      Already registered?{" "}
      <button onClick={onLogin} style={{ background: "none", border: "none", color: T.accent, fontWeight: 700, cursor: "pointer", fontFamily: T.font, fontSize: 13 }}>
        Sign in
      </button>
    </div>
  </Slide>
);

// ═════════════════════════════════════════════════════════════════════════════
// STAGE 2 — REGISTRATION FORM
// ═════════════════════════════════════════════════════════════════════════════
const validate = (form) => {
  const errs = {};
  if (!form.name.trim() || form.name.trim().length < 2) errs.name = "Enter your full name (2+ characters)";
  if (!form.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) errs.email = "Enter a valid email address";
  if (!form.phone.trim()) errs.phone = "Enter your phone number";
  if (!form.password || form.password.length < 8) errs.password = "Password must be at least 8 characters";
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) errs.password = "Needs uppercase, lowercase & a number";
  if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
  if (!form.agreed) errs.agreed = "You must accept the terms to continue";
  return errs;
};

const FormStage = ({ onSuccess, onBack }) => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", region: "",
    password: "", confirm: "", commissionRate: 0.10,
    notes: "", agreed: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState("");

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setApiError("");
    setLoading(true);
    try {
      const d = await api("/agents/register", {
        method: "POST",
        body: JSON.stringify({
          name:           form.name.trim(),
          email:          form.email.trim().toLowerCase(),
          phone:          form.phone.trim(),
          region:         form.region.trim(),
          password:       form.password,
          commissionRate: form.commissionRate,
          notes:          form.notes.trim(),
        }),
      });
      onSuccess({ agentId: d.agentId, email: form.email.trim().toLowerCase() });
    } catch (e) {
      setApiError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Slide>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMid, fontSize: 13, fontFamily: T.font, display: "flex", alignItems: "center", gap: 5, marginBottom: 20, padding: 0 }}>
        ← Back
      </button>

      <StepDots current={1} total={3} />

      <h2 style={{ fontFamily: T.fontDisplay, fontSize: 24, color: T.text, margin: "0 0 6px", letterSpacing: "-0.4px" }}>
        Create your agent account
      </h2>
      <p style={{ fontSize: 13, color: T.textSoft, margin: "0 0 24px", lineHeight: 1.55 }}>
        Fill in your details to get started. We'll send a verification code to your email.
      </p>

      {apiError && (
        <div style={{
          background: T.dangerSoft, border: `1px solid #E8C5BC`, borderRadius: 9,
          padding: "11px 14px", fontSize: 13, color: T.danger, marginBottom: 16, fontWeight: 500,
        }}>
          ⚠ {apiError}
        </div>
      )}

      {/* Personal */}
      <div style={{ fontSize: 11, fontWeight: 700, color: T.textSoft, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Personal Details</div>

      <Field label="Full Name *" value={form.name} onChange={set("name")} placeholder="Juma Mwangi" icon="👤" error={errors.name} />
      <Field label="Email Address *" type="email" value={form.email} onChange={set("email")} placeholder="juma@example.com" icon="✉️" error={errors.email} />
      <Field label="Phone Number *" type="tel" value={form.phone} onChange={set("phone")} placeholder="+255 6xx xxx xxx" icon="📱" error={errors.phone} />
      <Field label="Region" value={form.region} onChange={set("region")} placeholder="e.g. Dar es Salaam, Arusha…" icon="📍" />

      <div style={{ height: 1, background: T.borderSoft, margin: "8px 0 20px" }} />

      {/* Commission */}
      <div style={{ fontSize: 11, fontWeight: 700, color: T.textSoft, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Commission</div>
      <RatePicker value={form.commissionRate} onChange={set("commissionRate")} />

      <div style={{ height: 1, background: T.borderSoft, margin: "8px 0 20px" }} />

      {/* Password */}
      <div style={{ fontSize: 11, fontWeight: 700, color: T.textSoft, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Security</div>

      <Field
        label="Password *" type={showPw ? "text" : "password"}
        value={form.password} onChange={set("password")}
        placeholder="Min 8 chars, uppercase & number"
        icon="🔒" error={errors.password}
        suffix={
          <button type="button" onClick={() => setShowPw(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: T.textSoft, padding: 0 }}>
            {showPw ? "🙈" : "👁️"}
          </button>
        }
      />
      <Field
        label="Confirm Password *" type={showConfirm ? "text" : "password"}
        value={form.confirm} onChange={set("confirm")}
        placeholder="Re-enter your password"
        icon="🔒" error={errors.confirm}
        suffix={
          <button type="button" onClick={() => setShowConfirm(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: T.textSoft, padding: 0 }}>
            {showConfirm ? "🙈" : "👁️"}
          </button>
        }
      />

      {/* Notes */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textMid, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Notes (optional)</div>
        <textarea value={form.notes} onChange={e => set("notes")(e.target.value)} rows={2} placeholder="Any additional info for the team…"
          style={{ width: "100%", padding: "10px 13px", border: `1.5px solid ${T.border}`, borderRadius: 9, fontSize: 13, fontFamily: T.font, color: T.text, background: T.bg, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
      </div>

      {/* Terms */}
      <label style={{ display: "flex", gap: 12, cursor: "pointer", marginBottom: errors.agreed ? 4 : 20, alignItems: "flex-start" }}>
        <div
          onClick={() => set("agreed")(!form.agreed)}
          style={{
            width: 20, height: 20, flexShrink: 0, borderRadius: 5, marginTop: 1,
            border: `1.5px solid ${form.agreed ? T.accent : T.border}`,
            background: form.agreed ? T.accent : T.surface,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.15s",
          }}>
          {form.agreed && <span style={{ color: "#fff", fontSize: 12, fontWeight: 800, lineHeight: 1 }}>✓</span>}
        </div>
        <span style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.55, userSelect: "none" }}>
          I agree to Manereja's{" "}
          <span style={{ color: T.accent, fontWeight: 700 }}>Agent Terms & Conditions</span>
          {" "}and confirm I'm authorised to refer businesses to the platform.
        </span>
      </label>
      <FieldError msg={errors.agreed} />
      {errors.agreed && <div style={{ marginBottom: 14 }} />}

      <button
        onClick={submit} disabled={loading}
        style={{
          width: "100%", padding: "13px 0", background: loading ? T.textSoft : T.accent,
          color: "#fff", border: "none", borderRadius: 12, fontSize: 14.5,
          fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
          fontFamily: T.font, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "background 0.15s",
        }}
      >
        {loading ? <><Spinner /> Registering…</> : "Register & Send OTP →"}
      </button>
    </Slide>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// STAGE 3 — OTP VERIFICATION
// ═════════════════════════════════════════════════════════════════════════════
const OTP_SECONDS = 120;

const OtpStage = ({ agentId, email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resentOk, setResentOk] = useState(false);
  const [countdown, setCountdown] = useState(OTP_SECONDS);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const verify = useCallback(async (code) => {
    if (!code || code.length < 6) return;
    setVerifying(true);
    setOtpError("");
    try {
      await api("/agents/verify-otp", {
        method: "POST",
        body: JSON.stringify({ agentId, otp: code }),
      });
      onVerified();
    } catch (e) {
      setOtpError(e.message || "Invalid or expired code. Please try again.");
    } finally {
      setVerifying(false);
    }
  }, [agentId]);

  const resend = async () => {
    if (resending || countdown > 0) return;
    setResending(true);
    setResentOk(false);
    setOtpError("");
    try {
      await api("/agents/resend-otp", {
        method: "POST",
        body: JSON.stringify({ agentId }),
      });
      setResentOk(true);
      setCountdown(OTP_SECONDS);
    } catch (e) {
      setOtpError(e.message || "Failed to resend. Try again.");
    } finally {
      setResending(false);
    }
  };

  const mins = String(Math.floor(countdown / 60)).padStart(2, "0");
  const secs = String(countdown % 60).padStart(2, "0");

  return (
    <Slide>
      <StepDots current={2} total={3} />

      {/* Icon */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 30, margin: "0 auto 20px",
          boxShadow: `0 8px 24px ${T.accent}44`,
        }}>✉️</div>

        <h2 style={{ fontFamily: T.fontDisplay, fontSize: 24, color: T.text, margin: "0 0 10px", letterSpacing: "-0.4px" }}>
          Check your inbox
        </h2>
        <p style={{ fontSize: 13.5, color: T.textMid, margin: 0, lineHeight: 1.6, maxWidth: 340, marginInline: "auto" }}>
          We sent a 6-digit verification code to{" "}
          <strong style={{ color: T.text }}>{email}</strong>
        </p>
      </div>

      {/* OTP boxes */}
      <div style={{ marginBottom: 24 }}>
        <OtpInput
          onComplete={(code) => { setOtp(code); verify(code); }}
          onClear={() => setOtp("")}
          error={otpError}
        />
      </div>

      {/* Verify button */}
      <button
        onClick={() => verify(otp)} disabled={verifying || otp.length < 6}
        style={{
          width: "100%", padding: "13px 0",
          background: otp.length === 6 ? T.accent : T.bg,
          color: otp.length === 6 ? "#fff" : T.textSoft,
          border: `1.5px solid ${otp.length === 6 ? T.accent : T.border}`,
          borderRadius: 12, fontSize: 14.5, fontWeight: 700,
          cursor: otp.length === 6 && !verifying ? "pointer" : "not-allowed",
          fontFamily: T.font, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "all 0.2s", marginBottom: 20,
        }}
      >
        {verifying ? <><Spinner color={T.accent} /> Verifying…</> : "Verify & Activate Account"}
      </button>

      <div style={{ height: 1, background: T.borderSoft, marginBottom: 20 }} />

      {/* Resend */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 13, color: T.textSoft, marginBottom: 12 }}>
          Didn't receive the code?
        </div>

        {countdown > 0 ? (
          <div style={{ fontSize: 13, color: T.textMid, fontWeight: 600 }}>
            Resend available in{" "}
            <span style={{ color: T.accent, fontFamily: "monospace" }}>{mins}:{secs}</span>
          </div>
        ) : (
          <button
            onClick={resend} disabled={resending}
            style={{
              background: "none", border: `1.5px solid ${T.accent}`,
              borderRadius: 10, padding: "9px 24px", color: T.accent,
              fontSize: 13.5, fontWeight: 700, cursor: resending ? "not-allowed" : "pointer",
              fontFamily: T.font, display: "inline-flex", alignItems: "center", gap: 7,
            }}
          >
            {resending ? <><Spinner color={T.accent} size={14} /> Sending…</> : "↺ Resend code"}
          </button>
        )}

        {resentOk && (
          <div style={{
            marginTop: 12, padding: "10px 14px", background: T.successSoft,
            border: `1px solid #B8DABC`, borderRadius: 8, fontSize: 12.5, color: T.success, fontWeight: 500,
          }}>
            ✅ New code sent — check your inbox (and spam folder).
          </div>
        )}
      </div>

      {/* Spam tip */}
      <div style={{
        marginTop: 24, padding: "12px 14px", background: T.bg,
        border: `1px solid ${T.border}`, borderRadius: 10,
        display: "flex", gap: 10, alignItems: "flex-start",
      }}>
        <span style={{ fontSize: 15, flexShrink: 0 }}>ℹ️</span>
        <span style={{ fontSize: 12.5, color: T.textSoft, lineHeight: 1.55 }}>
          Check your spam or junk folder if you don't see it within a minute.
          The code is valid for <strong>10 minutes</strong>.
        </span>
      </div>
    </Slide>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// STAGE 4 — SUCCESS
// ═════════════════════════════════════════════════════════════════════════════
const SuccessStage = ({ email, onGoToPortal }) => (
  <Slide>
    <StepDots current={3} total={3} />

    <div style={{ textAlign: "center", padding: "12px 0 32px" }}>
      {/* Checkmark animation */}
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: `linear-gradient(135deg, ${T.success}, #3D6B4F)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 22px",
        boxShadow: `0 8px 28px ${T.success}44`,
        animation: "popIn 0.5s cubic-bezier(0.22,1,0.36,1) both",
      }}>
        <span style={{ fontSize: 34, color: "#fff" }}>✓</span>
      </div>
      <style>{`@keyframes popIn { from { transform: scale(0.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>

      <h2 style={{ fontFamily: T.fontDisplay, fontSize: 26, color: T.text, margin: "0 0 10px", letterSpacing: "-0.5px" }}>
        You're in! 🎉
      </h2>
      <p style={{ fontSize: 13.5, color: T.textMid, lineHeight: 1.65, margin: "0 0 24px", maxWidth: 340, marginInline: "auto" }}>
        Your email <strong style={{ color: T.text }}>{email}</strong> is verified
        and your agent account is now active.
      </p>

      {/* What's next */}
      <div style={{ background: T.accentSoft, border: `1px solid ${T.accent}33`, borderRadius: 12, padding: "18px 20px", textAlign: "left", marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>What happens next</div>
        {[
          ["🔍", "Your application is reviewed by our team (24h)"],
          ["📧", "You'll receive your confirmed commission rate via email"],
          ["🔗", "Start sharing your referral link to earn commissions"],
          ["💰", "Track everything in your agent dashboard"],
        ].map(([icon, text], i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 3 ? 10 : 0, fontSize: 13, color: T.text, lineHeight: 1.5 }}>
            <span style={{ fontSize: 15 }}>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onGoToPortal}
        style={{
          width: "100%", padding: "13px 0", background: T.accent, color: "#fff",
          border: "none", borderRadius: 12, fontSize: 14.5, fontWeight: 700,
          cursor: "pointer", fontFamily: T.font,
          boxShadow: `0 4px 14px ${T.accent}55`,
        }}
      >
        Go to Agent Portal →
      </button>
    </div>
  </Slide>
);

// ═════════════════════════════════════════════════════════════════════════════
// ROOT — STAGE ROUTER
// ═════════════════════════════════════════════════════════════════════════════
export default function AgentRegister() {
  const [stage, setStage]     = useState("welcome"); // welcome | form | otp | success
  const [agentId, setAgentId] = useState("");
  const [email, setEmail]     = useState("");

  const goToLogin = () => {
    if (typeof window !== "undefined") window.location.href = "/manereja/agent-portal";
  };
  const goToPortal = () => {
    if (typeof window !== "undefined") window.location.href = "/manereja/agent-portal";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: ${T.font}; background: ${T.bg}; }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{
        minHeight: "100vh", background: T.bg, display: "flex",
        alignItems: "flex-start", justifyContent: "center",
        padding: "0 16px 48px",
        backgroundImage: `
          radial-gradient(circle at 15% 85%, #E8F0EC 0%, transparent 45%),
          radial-gradient(circle at 85% 15%, #EDF2EE 0%, transparent 45%)
        `,
      }}>
        <div style={{ width: "100%", maxWidth: 480, paddingTop: 40 }}>

          {/* ── Top bar ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, background: T.sidebar, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📣</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: T.text, letterSpacing: "-0.2px" }}>Manereja</div>
                <div style={{ fontSize: 11, color: T.textSoft }}>Agent Programme</div>
              </div>
            </div>
            {stage !== "success" && (
              <button onClick={goToLogin} style={{ background: "none", border: `1.5px solid ${T.border}`, borderRadius: 8, padding: "6px 14px", fontSize: 12.5, color: T.textMid, cursor: "pointer", fontFamily: T.font, fontWeight: 600 }}>
                Sign in
              </button>
            )}
          </div>

          {/* ── Card ── */}
          <div style={{
            background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18,
            padding: "32px 32px",
            boxShadow: "0 2px 24px rgba(44,41,37,0.07), 0 1px 4px rgba(44,41,37,0.04)",
          }}>
            {stage === "welcome" && (
              <WelcomeStage
                onStart={() => setStage("form")}
                onLogin={goToLogin}
              />
            )}

            {stage === "form" && (
              <FormStage
                onBack={() => setStage("welcome")}
                onSuccess={({ agentId: id, email: em }) => {
                  setAgentId(id);
                  setEmail(em);
                  setStage("otp");
                }}
              />
            )}

            {stage === "otp" && (
              <OtpStage
                agentId={agentId}
                email={email}
                onVerified={() => setStage("success")}
              />
            )}

            {stage === "success" && (
              <SuccessStage
                email={email}
                onGoToPortal={goToPortal}
              />
            )}
          </div>

          {/* ── Footer ── */}
          <div style={{ textAlign: "center", marginTop: 20, fontSize: 11.5, color: T.textSoft }}>
            By registering you agree to the Manereja Agent Terms &amp; Conditions.
          </div>
        </div>
      </div>
    </>
  );
}