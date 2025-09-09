import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, Shield, AlertCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/context/language';

interface PasswordProtectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  sessionKey?: string; // For remembering authentication in session
  maxAttempts?: number;
  lockoutDuration?: number; // in minutes
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({
  children,
  title = "Protected Content",
  description = "This content is confidential and requires authentication to access.",
  sessionKey = "default-protected-content",
  maxAttempts = 3,
  lockoutDuration = 15
}) => {
const {language}= useLanguage();
title = language === 'en' ? "Protected Content" : "Yaliyolindwa";
description = language === 'en' ? "This content is confidential and requires authentication":'Nyaraka hizi zina taarifa siri na zinahitaji uthibitisho wa kufungua.';


  const [inputPassword, setInputPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Get password from environment (in real app, this would be passed from server)
  const protectedPassword = process.env.NEXT_PUBLIC_CHURCH_PASSWORD;

  // Check if already authenticated in this session
  useEffect(() => {
    const authStatus = sessionStorage.getItem(`auth-${sessionKey}`);
    const lockoutData = localStorage.getItem(`lockout-${sessionKey}`);
    
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }

    if (lockoutData) {
      const { endTime, attemptCount } = JSON.parse(lockoutData);
      const now = Date.now();
      
      if (now < endTime) {
        setIsLocked(true);
        setLockoutEndTime(endTime);
        setAttempts(attemptCount);
      } else {
        localStorage.removeItem(`lockout-${sessionKey}`);
        setAttempts(0);
      }
    }
  }, [sessionKey]);

  // Update countdown timer
  useEffect(() => {
    if (isLocked && lockoutEndTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, lockoutEndTime - now);
        setTimeRemaining(Math.ceil(remaining / 1000));

        if (remaining <= 0) {
          setIsLocked(false);
          setLockoutEndTime(null);
          setAttempts(0);
          setError('');
          localStorage.removeItem(`lockout-${sessionKey}`);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLocked, lockoutEndTime, sessionKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) return;

    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (inputPassword === protectedPassword) {
      setIsAuthenticated(true);
      setError('');
      setAttempts(0);
      sessionStorage.setItem(`auth-${sessionKey}`, 'authenticated');
      localStorage.removeItem(`lockout-${sessionKey}`);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setInputPassword('');
      
      if (newAttempts >= maxAttempts) {
        const lockoutEnd = Date.now() + (lockoutDuration * 60 * 1000);
        setIsLocked(true);
        setLockoutEndTime(lockoutEnd);
        setError(`Too many failed attempts. Access locked for ${lockoutDuration} minutes.`);
        
        localStorage.setItem(`lockout-${sessionKey}`, JSON.stringify({
          endTime: lockoutEnd,
          attemptCount: newAttempts
        }));
      } else {
        setError(`Incorrect password. ${maxAttempts - newAttempts} attempts remaining.`);
      }
    }

    setIsLoading(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    }}>
        <div className='h-16'></div>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Floating Security Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 animate-float opacity-20">
          <Shield className="w-8 h-8 text-blue-400" />
        </div>
        <div className="absolute top-40 right-32 animate-float opacity-20" style={{ animationDelay: '1s' }}>
          <Lock className="w-6 h-6 text-purple-400" />
        </div>
        <div className="absolute bottom-40 left-32 animate-float opacity-20" style={{ animationDelay: '2s' }}>
          <Shield className="w-7 h-7 text-indigo-400" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float opacity-20" style={{ animationDelay: '3s' }}>
          <Lock className="w-5 h-5 text-cyan-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Main Protection Card */}
          <div className="glass-effect rounded-2xl p-8 shadow-2xl border border-white/10" style={{
            background: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(20px)'
          }}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, var(--blue-600), var(--purple-600))'
              }}>
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
              <p className="text-gray-300 text-sm">{description}</p>
            </div>

            {/* Lockout Message */}
            {isLocked && (
              <div className="mb-6 p-4 rounded-xl border" style={{
                background: 'rgba(245, 158, 11, 0.1)',
                borderColor: 'rgba(245, 158, 11, 0.3)'
              }}>
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-amber-400 mr-2" />
                  <span className="text-amber-400 font-semibold">{language==="en" ? "Access Locked" : "Umezuiliwa kuingia"}</span>
                </div>
             <p className="text-amber-200 text-sm mb-2">
  {language === 'en'
    ? `Too many failed attempts. Please wait ${formatTime(timeRemaining)} before trying again.`
    : `Umekosea mara nyingi. Tafadhali subiri ${formatTime(timeRemaining)} kabla ya kujaribu tena.`}
</p>

              </div>
            )}

            {/* Error Message */}
            {error && !isLocked && (
              <div className="mb-6 p-4 rounded-xl border" style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.3)'
              }}>
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                  <span className="text-red-200 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Access Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    disabled={isLocked || isLoading}
                    className="w-full px-4 py-3 pr-12 rounded-xl border text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'rgba(15, 23, 42, 0.5)',
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                    }}
                    placeholder="Enter your password"
                    required
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(102, 126, 234, 0.8)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLocked}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLocked || isLoading || !inputPassword.trim()}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {language==='en' ? 'Verifying...' :'Inathibitisha...'}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Lock className="w-5 h-5 mr-2" />
                    {language ==='en' ? 'Access Content':'Fungua Nyaraka'}
                  </div>
                )}
              </button>
            </form>

            {/* Attempt Counter */}
            {attempts > 0 && !isLocked && (
              <div className="mt-4 text-center">
                <div className="flex justify-center space-x-1">
                  {Array.from({ length: maxAttempts }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index < attempts ? 'bg-red-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {attempts} of {maxAttempts} attempts used
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                {language==='en' ? 'Protected content requires valid credentials':'Ingiza password kufungua'}.    
              </p>
            </div>
          </div>

          {/* Additional Security Notice */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full border text-sm" style={{
              background: 'rgba(30, 41, 59, 0.3)',
              borderColor: 'rgba(102, 126, 234, 0.2)',
              color: '#94a3b8'
            }}>
              <Shield className="w-4 h-4 mr-2 text-green-400" />
              {language ==='en' ? 'Content secured with enterprise-grade protection':'Nyaraka zinalindwa kwa kinga ya hali ya juu'}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PasswordProtection;