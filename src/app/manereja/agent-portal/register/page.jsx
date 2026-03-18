'use client';
import { useState, useEffect, useRef, useCallback } from "react";

// ── CONFIG ────────────────────────────────────────────────────────────────────
const BASE = `${process.env.NEXT_PUBLIC_SERVER}/auth`;

const api = async (path, opts = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');

  .font-outfit  { font-family: 'Outfit', 'Helvetica Neue', sans-serif; }
  .font-display { font-family: 'DM Serif Display', Georgia, serif; }

  @keyframes spin      { to { transform: rotate(360deg); } }
  @keyframes fadeSlide { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp   { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes popIn     { from { transform: scale(0.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  .animate-slideUp  { animation: slideUp  0.38s cubic-bezier(0.22,1,0.36,1) both; }
  .animate-fadeSlide { animation: fadeSlide 0.4s ease both; }
  .animate-popIn    { animation: popIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }
  .animate-spin     { animation: spin 0.8s linear infinite; }

  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #F7F6F3 inset !important;
    -webkit-text-fill-color: #2C2925 !important;
  }

  textarea:focus { outline: none; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #D4CFC9; border-radius: 2px; }
`;

// ═══════════════════════════════════════════════════════════════════════════
//  PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════

const Spinner = ({ size = 18, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" strokeDasharray="40 20" />
  </svg>
);

// ── Animated slide wrapper ────────────────────────────────────────────────────
const Slide = ({ children }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  return (
    <div
      className="transition-all duration-[380ms]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  );
};

// ── Step dots progress ────────────────────────────────────────────────────────
const StepDots = ({ current, total }) => (
  <div className="flex gap-1.5 justify-center mb-7">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="h-1.5 rounded-full transition-all duration-300"
        style={{
          width: i === current ? 22 : 6,
          background: i <= current ? "#5C7A6B" : "#E8E5DF",
        }}
      />
    ))}
  </div>
);

// ── Field ─────────────────────────────────────────────────────────────────────
const Field = ({ label, value, onChange, type = "text", placeholder = "", error, icon, suffix }) => {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? "border-[#C0533A]" : focused ? "border-[#5C7A6B]" : "border-[#E8E5DF]";

  return (
    <div className="mb-4">
      {label && (
        <div className="text-[10.5px] font-bold text-[#6B6560] uppercase tracking-[0.5px] mb-1.5 font-outfit">
          {label}
        </div>
      )}
      <div className={`relative flex items-center bg-[#F7F6F3] border-[1.5px] rounded-xl transition-colors duration-150 ${borderColor}`}>
        {icon && (
          <span className="pl-3 text-[15px] opacity-40 flex-shrink-0 select-none">{icon}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent border-none outline-none text-[#2C2925] font-outfit
            text-[13.5px] py-2.5 min-w-0
            ${icon ? "pl-2" : "pl-3"}
            ${suffix ? "pr-1" : "pr-3"}
            placeholder:text-[#A09A94]`}
        />
        {suffix && <div className="pr-3 flex-shrink-0">{suffix}</div>}
      </div>
      {error && (
        <div className="text-xs text-[#C0533A] mt-1 font-medium font-outfit animate-fadeSlide">
          ⚠ {error}
        </div>
      )}
    </div>
  );
};

// ── OTP Input ─────────────────────────────────────────────────────────────────
const OtpInput = ({ onComplete, error, onClear }) => {
  const inputs = useRef([]);
  const [vals, setVals] = useState(Array(6).fill(""));

  const update = (idx, val) => {
    const digit = val.replace(/\D/, "").slice(-1);
    const next = [...vals]; next[idx] = digit; setVals(next);
    if (digit && idx < 5) inputs.current[idx + 1]?.focus();
    if (next.every(v => v)) onComplete(next.join(""));
  };
  const onKey = (idx, e) => {
    if (e.key === "Backspace") {
      const next = [...vals]; next[idx] = ""; setVals(next);
      onClear?.();
      if (!vals[idx] && idx > 0) inputs.current[idx - 1]?.focus();
    }
  };
  const onPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = Array(6).fill(""); pasted.split("").forEach((c, i) => next[i] = c);
    setVals(next);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
    if (pasted.length === 6) onComplete(pasted);
  };

  return (
    <div>
      <div className="flex gap-2 sm:gap-3 justify-center">
        {vals.map((v, i) => (
          <input
            key={i}
            ref={el => inputs.current[i] = el}
            type="text" inputMode="numeric" maxLength={1} value={v}
            onChange={e => update(i, e.target.value)}
            onKeyDown={e => onKey(i, e)}
            onPaste={onPaste}
            className={`w-10 text-center text-xl font-black font-outfit border-[1.5px] rounded-xl
              outline-none transition-all duration-150 touch-manipulation
              ${error
                ? "border-[#C0533A] bg-[#FBF0ED] text-[#C0533A]"
                : v
                ? "border-[#5C7A6B] bg-[#EEF3F0] text-[#2C2925]"
                : "border-[#E8E5DF] bg-[#F7F6F3] text-[#2C2925]"
              }`}
            style={{ height: "3.25rem", caretColor: "#5C7A6B" }}
          />
        ))}
      </div>
      {error && (
        <div className="text-center text-xs text-[#C0533A] font-medium mt-3 font-outfit animate-fadeSlide">
          ⚠ {error}
        </div>
      )}
    </div>
  );
};

// ── Benefit row ───────────────────────────────────────────────────────────────
const Benefit = ({ icon, title, desc, delay }) => (
  <div
    className="flex gap-3.5 py-3.5 border-b border-[#F0EDE8] last:border-b-0 animate-fadeSlide"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-10 h-10 rounded-xl bg-[#EEF3F0] flex items-center justify-center text-lg flex-shrink-0">
      {icon}
    </div>
    <div>
      <div className="font-bold text-[13.5px] text-[#2C2925] mb-0.5 font-outfit">{title}</div>
      <div className="text-[12px] text-[#A09A94] leading-snug font-outfit">{desc}</div>
    </div>
  </div>
);

// ── Primary Button ────────────────────────────────────────────────────────────
const PrimaryBtn = ({ children, onClick, disabled, loading, fullWidth = true }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`${fullWidth ? "w-full" : ""} flex items-center justify-center gap-2
      py-3.5 rounded-xl text-[14px] font-bold font-outfit tracking-[-0.1px]
      transition-all duration-150 touch-manipulation active:scale-[0.98]
      ${disabled || loading
        ? "bg-[#A09A94] text-white cursor-not-allowed"
        : "bg-[#5C7A6B] text-white cursor-pointer hover:bg-[#4A6558] shadow-[0_4px_14px_rgba(92,122,107,0.35)]"
      }`}
  >
    {loading ? <><Spinner /> Please wait…</> : children}
  </button>
);

// ── Back button ───────────────────────────────────────────────────────────────
const BackBtn = ({ onClick, label = "Back" }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 text-[#6B6560] text-[13px] font-semibold font-outfit
      mb-5 bg-transparent border-none cursor-pointer hover:text-[#5C7A6B] transition-colors
      touch-manipulation active:scale-95 p-0"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
    {label}
  </button>
);

// ── Section label ─────────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <div className="text-[10.5px] font-bold text-[#A09A94] uppercase tracking-[0.5px] mb-3 font-outfit">
    {children}
  </div>
);

// ── Divider ───────────────────────────────────────────────────────────────────
const Divider = () => <div className="h-px bg-[#F0EDE8] my-5" />;

// ── Error banner ──────────────────────────────────────────────────────────────
const ErrorBanner = ({ msg }) => msg ? (
  <div className="flex items-start gap-2 bg-[#FBF0ED] border border-[#E8C5BC] rounded-xl
    px-4 py-3 text-sm text-[#C0533A] font-medium font-outfit mb-4 animate-fadeSlide">
    <span className="flex-shrink-0">⚠</span> {msg}
  </div>
) : null;

// ── Eye toggle button ─────────────────────────────────────────────────────────
const EyeBtn = ({ show, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="bg-transparent border-none cursor-pointer text-base text-[#A09A94]
      hover:text-[#6B6560] transition-colors touch-manipulation p-0"
  >
    {show ? "🙈" : "👁️"}
  </button>
);

// ── Shell ─────────────────────────────────────────────────────────────────────
const Shell = ({ children, onLoginClick, showLogin = true }) => (
  <>
    <style>{GLOBAL}</style>
    <div
      className="min-h-screen bg-[#F7F6F3] font-outfit flex flex-col"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 85%, #E8F0EC 0%, transparent 45%), " +
          "radial-gradient(circle at 85% 15%, #EDF2EE 0%, transparent 45%)",
      }}
    >
      <div className="flex-1 flex flex-col px-4 pt-safe pb-10 sm:items-center sm:justify-center sm:py-12">

        {/* Top bar */}
        <div className="flex items-center justify-between w-full max-w-sm sm:max-w-[480px] mx-auto mb-6 mt-4 sm:mt-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#2C2925] rounded-[9px] flex items-center justify-center text-base flex-shrink-0">
              📣
            </div>
            <div>
              <div className="font-extrabold text-[13px] text-[#2C2925] tracking-tight leading-none mb-0.5">Manereja</div>
              <div className="text-[11px] text-[#A09A94]">Agent Programme</div>
            </div>
          </div>
          {showLogin && (
            <button
              onClick={onLoginClick}
              className="text-[12.5px] font-semibold text-[#6B6560] font-outfit
                border-[1.5px] border-[#E8E5DF] rounded-lg px-3.5 py-1.5
                hover:border-[#5C7A6B] hover:text-[#5C7A6B] transition-colors touch-manipulation
                bg-transparent cursor-pointer"
            >
              Sign in
            </button>
          )}
        </div>

        {/* Card */}
        <div className="w-full max-w-sm sm:max-w-[480px] mx-auto">
          <div className="bg-white border border-[#E8E5DF] rounded-2xl sm:rounded-3xl
            shadow-[0_2px_24px_rgba(44,41,37,0.07),0_1px_4px_rgba(44,41,37,0.04)]
            p-6 sm:p-8">
            {children}
          </div>
        </div>

        <div className="text-center mt-5 text-[11px] text-[#A09A94] font-outfit">
          By registering you agree to the Manereja Agent Terms &amp; Conditions.
        </div>
      </div>
    </div>
  </>
);

// ═══════════════════════════════════════════════════════════════════════════
//  STAGE 1 — WELCOME
// ═══════════════════════════════════════════════════════════════════════════
const WelcomeStage = ({ onStart, onLogin }) => (
  <Slide>
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-[#2C2925] rounded-2xl flex items-center justify-center
        text-3xl mx-auto mb-5 shadow-[0_4px_20px_rgba(44,41,37,0.18)]">
        🤝
      </div>

      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
        bg-[#EEF5F1] text-[#4A7A5A] text-[11px] font-bold tracking-[0.3px] mb-4 font-outfit">
        Commission Agent Programme
      </span>

      <h1 className="font-display text-[28px] sm:text-[32px] text-[#2C2925] leading-tight
        tracking-[-0.5px] mb-3">
        Earn by referring<br />businesses to Manereja
      </h1>
      <p className="text-[13.5px] text-[#6B6560] leading-relaxed max-w-sm mx-auto font-outfit">
        Join our agent programme — earn a percentage of every subscription
        payment from businesses you refer. Monthly payouts, real-time tracking.
      </p>
    </div>

    {/* Benefits */}
    <div className="mb-7">
      <Benefit delay={80}  icon="💰" title="Earn on every payment"   desc="Get your commission automatically logged for each subscription payment your referral makes." />
      <Benefit delay={130} icon="📊" title="Real-time dashboard"      desc="Track your referrals, active subscribers, and pending commissions from one place." />
      <Benefit delay={180} icon="📅" title="Monthly settlement"       desc="Commissions are calculated and paid out at end of each month, with a full ledger history." />
      <Benefit delay={230} icon="🔗" title="Flexible commission rates" desc="Commission rates from 10% to 40% — set at registration based on your agreement." />
    </div>

    <PrimaryBtn onClick={onStart}>Register as an Agent →</PrimaryBtn>

    <div className="text-center mt-4 text-[13px] text-[#A09A94] font-outfit">
      Already registered?{" "}
      <button
        onClick={onLogin}
        className="text-[#5C7A6B] font-bold bg-transparent border-none cursor-pointer
          font-outfit text-[13px] hover:underline touch-manipulation"
      >
        Sign in
      </button>
    </div>
  </Slide>
);

// ═══════════════════════════════════════════════════════════════════════════
//  STAGE 2 — REGISTRATION FORM
// ═══════════════════════════════════════════════════════════════════════════
const validate = (form) => {
  const errs = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errs.name = "Enter your full name (2+ characters)";
  if (!form.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
    errs.email = "Enter a valid email address";
  if (!form.phone.trim())
    errs.phone = "Enter your phone number";
  if (!form.password || form.password.length < 8)
    errs.password = "Password must be at least 8 characters";
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password))
    errs.password = "Needs uppercase, lowercase & a number";
  if (form.password !== form.confirm)
    errs.confirm = "Passwords do not match";
  if (!form.agreed)
    errs.agreed = "You must accept the terms to continue";
  return errs;
};

const FormStage = ({ onSuccess, onBack }) => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", region: "",
    password: "", confirm: "", commissionRate: 0.10,
    notes: "", agreed: false,
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);
  const [showCf, setShowCf]   = useState(false);
  const [apiError, setApiError] = useState("");

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setApiError(""); setLoading(true);
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
    } catch (e) { setApiError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <Slide>
      <BackBtn onClick={onBack} />
      <StepDots current={1} total={3} />

      <h2 className="font-display text-2xl sm:text-[26px] text-[#2C2925] mb-1.5 tracking-[-0.4px]">
        Create your agent account
      </h2>
      <p className="text-[13px] text-[#A09A94] mb-6 leading-relaxed font-outfit">
        Fill in your details to get started. We'll send a verification code to your email.
      </p>

      <ErrorBanner msg={apiError} />

      <SectionLabel>Personal Details</SectionLabel>
      <Field label="Full Name *"       value={form.name}   onChange={set("name")}   placeholder="Juma Mwangi"         icon="👤" error={errors.name} />
      <Field label="Email Address *"   type="email" value={form.email}  onChange={set("email")}  placeholder="juma@example.com"    icon="✉️" error={errors.email} />
      <Field label="Phone Number *"    type="tel"   value={form.phone}  onChange={set("phone")}  placeholder="+255 6xx xxx xxx"    icon="📱" error={errors.phone} />
      <Field label="Region"                         value={form.region} onChange={set("region")} placeholder="e.g. Dar es Salaam…" icon="📍" />

      <Divider />

      {/* Commission Rate */}
      <SectionLabel>Commission Rate</SectionLabel>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {[0.10].map(r => {
          const sel = form.commissionRate === r;
          return (
            <button key={r} type="button" onClick={() => set("commissionRate")(r)}
              className={`py-2.5 rounded-xl text-[13px] font-bold font-outfit border-[1.5px]
                transition-all duration-150 touch-manipulation
                ${sel
                  ? "border-[#5C7A6B] bg-[#EEF3F0] text-[#5C7A6B]"
                  : "border-[#E8E5DF] bg-white text-[#6B6560] hover:border-[#5C7A6B]"
                }`}
            >
              {(r * 100).toFixed(0)}%
            </button>
          );
        })}
      </div>
      <div className="text-[11.5px] text-[#A09A94] mb-5 font-outfit">
        This is the commission you earn per paid subscription you refer.
      </div>

      <Divider />

      <SectionLabel>Security</SectionLabel>
      <Field
        label="Password *" type={showPw ? "text" : "password"}
        value={form.password} onChange={set("password")}
        placeholder="Min 8 chars, uppercase & number"
        icon="🔒" error={errors.password}
        suffix={<EyeBtn show={showPw} onToggle={() => setShowPw(v => !v)} />}
      />
      <Field
        label="Confirm Password *" type={showCf ? "text" : "password"}
        value={form.confirm} onChange={set("confirm")}
        placeholder="Re-enter your password"
        icon="🔒" error={errors.confirm}
        suffix={<EyeBtn show={showCf} onToggle={() => setShowCf(v => !v)} />}
      />

      {/* Notes */}
      <div className="mb-5">
        <div className="text-[10.5px] font-bold text-[#6B6560] uppercase tracking-[0.5px] mb-1.5 font-outfit">
          Notes (optional)
        </div>
        <textarea
          value={form.notes}
          onChange={e => set("notes")(e.target.value)}
          rows={2}
          placeholder="Any additional info for the team…"
          className="w-full px-3 py-2.5 bg-[#F7F6F3] border-[1.5px] border-[#E8E5DF]
            rounded-xl text-[13px] text-[#2C2925] font-outfit resize-y
            focus:border-[#5C7A6B] transition-colors placeholder:text-[#A09A94]"
        />
      </div>

      {/* Terms checkbox */}
      <label className="flex gap-3 cursor-pointer mb-1 items-start">
        <div
          onClick={() => set("agreed")(!form.agreed)}
          className={`w-5 h-5 flex-shrink-0 rounded-md border-[1.5px] flex items-center
            justify-center mt-0.5 transition-all duration-150 cursor-pointer
            ${form.agreed
              ? "bg-[#5C7A6B] border-[#5C7A6B]"
              : "bg-white border-[#E8E5DF] hover:border-[#5C7A6B]"
            }`}
        >
          {form.agreed && <span className="text-white text-xs font-black leading-none">✓</span>}
        </div>
        <span className="text-[12.5px] text-[#6B6560] leading-relaxed font-outfit select-none">
          I agree to Manereja's{" "}
          <span className="text-[#5C7A6B] font-bold">Agent Terms &amp; Conditions</span>
          {" "}and confirm I'm authorised to refer businesses to the platform.
        </span>
      </label>
      {errors.agreed && (
        <div className="text-xs text-[#C0533A] font-medium mb-3 font-outfit">⚠ {errors.agreed}</div>
      )}
      <div className="mt-4">
        <PrimaryBtn onClick={submit} loading={loading}>Register &amp; Send OTP →</PrimaryBtn>
      </div>
    </Slide>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
//  STAGE 3 — OTP VERIFICATION
// ═══════════════════════════════════════════════════════════════════════════
const OTP_SECONDS = 120;

const OtpStage = ({ agentId, email, onVerified }) => {
  const [otp, setOtp]             = useState("");
  const [otpError, setOtpError]   = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resentOk, setResentOk]   = useState(false);
  const [countdown, setCountdown] = useState(OTP_SECONDS);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const verify = useCallback(async (code) => {
    if (!code || code.length < 6) return;
    setVerifying(true); setOtpError("");
    try {
      await api("/agents/verify-otp", {
        method: "POST",
        body: JSON.stringify({ agentId, otp: code }),
      });
      onVerified();
    } catch (e) {
      setOtpError(e.message || "Invalid or expired code. Please try again.");
    } finally { setVerifying(false); }
  }, [agentId]);

  const resend = async () => {
    if (resending || countdown > 0) return;
    setResending(true); setResentOk(false); setOtpError("");
    try {
      await api("/agents/resend-otp", {
        method: "POST", body: JSON.stringify({ agentId }),
      });
      setResentOk(true); setCountdown(OTP_SECONDS);
    } catch (e) {
      setOtpError(e.message || "Failed to resend. Try again.");
    } finally { setResending(false); }
  };

  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  return (
    <Slide>
      <StepDots current={2} total={3} />

      <div className="text-center mb-7">
        <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#5C7A6B] to-[#4A6558]
          flex items-center justify-center text-3xl mx-auto mb-5
          shadow-[0_8px_24px_rgba(92,122,107,0.3)]"
          style={{ width: 72, height: 72 }}>
          ✉️
        </div>
        <h2 className="font-display text-2xl text-[#2C2925] mb-2.5 tracking-[-0.4px]">
          Check your inbox
        </h2>
        <p className="text-[13.5px] text-[#6B6560] leading-relaxed max-w-xs mx-auto font-outfit">
          We sent a 6-digit verification code to{" "}
          <strong className="text-[#2C2925] font-bold">{email}</strong>
        </p>
      </div>

      <div className="mb-6">
        <OtpInput
          onComplete={(code) => { setOtp(code); verify(code); }}
          onClear={() => setOtp("")}
          error={otpError}
        />
      </div>

      {/* Verify button */}
      <button
        onClick={() => verify(otp)}
        disabled={verifying || otp.length < 6}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
          text-[14px] font-bold font-outfit border-[1.5px] transition-all duration-200
          touch-manipulation mb-5 active:scale-[0.98]
          ${otp.length === 6 && !verifying
            ? "bg-[#5C7A6B] text-white border-[#5C7A6B] cursor-pointer shadow-[0_4px_14px_rgba(92,122,107,0.35)]"
            : "bg-[#F7F6F3] text-[#A09A94] border-[#E8E5DF] cursor-not-allowed"
          }`}
      >
        {verifying
          ? <><Spinner color="#5C7A6B" /> Verifying…</>
          : "Verify &amp; Activate Account"}
      </button>

      <div className="h-px bg-[#F0EDE8] mb-5" />

      <div className="text-center">
        <div className="text-[13px] text-[#A09A94] mb-3 font-outfit">
          Didn't receive the code?
        </div>
        {countdown > 0 ? (
          <span className="text-[13px] text-[#6B6560] font-semibold font-outfit">
            Resend available in{" "}
            <span className="font-mono text-[#5C7A6B] font-black">{mm}:{ss}</span>
          </span>
        ) : (
          <button
            onClick={resend}
            disabled={resending}
            className="inline-flex items-center gap-1.5 px-6 py-2.5
              border-[1.5px] border-[#5C7A6B] rounded-xl text-[13.5px] font-bold
              text-[#5C7A6B] font-outfit cursor-pointer hover:bg-[#EEF3F0]
              transition-colors touch-manipulation bg-transparent"
          >
            {resending ? <><Spinner color="#5C7A6B" size={14} /> Sending…</> : "↺ Resend code"}
          </button>
        )}
        {resentOk && (
          <div className="mt-3 px-4 py-2.5 bg-[#EEF5F1] border border-[#B8DABC]
            rounded-xl text-xs text-[#4A7A5A] font-medium font-outfit">
            ✅ New code sent — check your inbox (and spam folder).
          </div>
        )}
      </div>

      {/* Spam tip */}
      <div className="mt-6 p-3.5 bg-[#F7F6F3] border border-[#E8E5DF] rounded-xl
        flex gap-2.5 items-start">
        <span className="text-base flex-shrink-0">ℹ️</span>
        <span className="text-[12px] text-[#A09A94] leading-relaxed font-outfit">
          Check your spam or junk folder if you don't see it within a minute.
          The code is valid for <strong className="text-[#6B6560]">10 minutes</strong>.
        </span>
      </div>
    </Slide>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
//  STAGE 4 — SUCCESS
// ═══════════════════════════════════════════════════════════════════════════
const SuccessStage = ({ email, onGoToPortal }) => (
  <Slide>
    <StepDots current={3} total={3} />

    <div className="text-center py-3">
      <div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4A7A5A] to-[#3D6B4F]
          flex items-center justify-center mx-auto mb-6
          shadow-[0_8px_28px_rgba(74,122,90,0.3)] animate-popIn"
      >
        <span className="text-white text-4xl font-black leading-none">✓</span>
      </div>

      <h2 className="font-display text-[28px] text-[#2C2925] mb-2.5 tracking-[-0.5px]">
        You're in! 🎉
      </h2>
      <p className="text-[13.5px] text-[#6B6560] leading-relaxed mb-6 max-w-xs mx-auto font-outfit">
        Your email <strong className="text-[#2C2925]">{email}</strong> is verified
        and your agent account is now active.
      </p>

      {/* What's next */}
      <div className="bg-[#EEF3F0] border border-[#5C7A6B]/20 rounded-2xl p-5 text-left mb-7">
        <div className="text-[10.5px] font-bold text-[#5C7A6B] uppercase tracking-[0.5px] mb-4 font-outfit">
          What happens next
        </div>
        {[
          ["🔍", "Your application is reviewed by our team (24h)"],
          ["📧", "You'll receive your confirmed commission rate via email"],
          ["🔗", "Start sharing your referral link to earn commissions"],
          ["💰", "Track everything in your agent dashboard"],
        ].map(([icon, text], i) => (
          <div key={i} className={`flex gap-2.5 text-[13px] text-[#2C2925] font-outfit leading-snug ${i < 3 ? "mb-3" : ""}`}>
            <span className="text-base">{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <PrimaryBtn onClick={onGoToPortal}>Go to Agent Portal →</PrimaryBtn>
    </div>
  </Slide>
);

// ═══════════════════════════════════════════════════════════════════════════
//  ROOT — STAGE ROUTER
// ═══════════════════════════════════════════════════════════════════════════
export default function AgentRegister() {
  const [stage, setStage]     = useState("welcome");
  const [agentId, setAgentId] = useState("");
  const [email, setEmail]     = useState("");

  const goToLogin  = () => { if (typeof window !== "undefined") window.location.href = "/manereja/agent-portal"; };
  const goToPortal = () => { if (typeof window !== "undefined") window.location.href = "/manereja/agent-portal"; };

  return (
    <Shell onLoginClick={goToLogin} showLogin={stage !== "success"}>
      {stage === "welcome" && (
        <WelcomeStage onStart={() => setStage("form")} onLogin={goToLogin} />
      )}
      {stage === "form" && (
        <FormStage
          onBack={() => setStage("welcome")}
          onSuccess={({ agentId: id, email: em }) => { setAgentId(id); setEmail(em); setStage("otp"); }}
        />
      )}
      {stage === "otp" && (
        <OtpStage agentId={agentId} email={email} onVerified={() => setStage("success")} />
      )}
      {stage === "success" && (
        <SuccessStage email={email} onGoToPortal={goToPortal} />
      )}
    </Shell>
  );
}