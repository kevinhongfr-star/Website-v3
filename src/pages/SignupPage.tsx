import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle, User } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/stores/toastStore';
import { trackSignupSuccess } from '@/analytics/eventTracker';
import { reportError } from '@/analytics/errorMonitor';
import {
  validatePasswordStrength,
  passwordScoreLabel,
  passwordScoreColor,
} from '@/lib/auth/passwordPolicy';
import { captureUTMParams, captureAndStoreUTM } from '@/utils/utmTracking';
import { Logo } from '@/components/ui/Logo';
import { Section, Eyebrow, Button, Divider } from '@/components/ui/v3';

export function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pwdStrength = useMemo(
    () => validatePasswordStrength(password, { email, name }),
    [password, email, name],
  );

  useEffect(() => {
    captureUTMParams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) { setError('Email is required'); return; }
    if (!name.trim()) { setError('Name is required'); return; }
    if (!password) { setError('Password is required'); return; }
    if (!pwdStrength.passes) {
      setError(pwdStrength.warnings[0] || 'Please choose a stronger password');
      return;
    }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }

    setLoading(true);
    const result = await signUp(email.trim(), password, 'professional', name.trim());
    setLoading(false);

    if (result.success) {
      trackSignupSuccess('email', 'professional');
      toast.success('Account created successfully');
      const userId = useAuthStore.getState().user?.id;
      if (userId) {
        captureAndStoreUTM(userId).catch((e) => {
          reportError(e, { scope: 'utm:store', severity: 'warning', extra: { userId } });
        });
      }
      navigate('/platform');
    } else {
      reportError(new Error(result.error || 'Signup failed'), { scope: 'auth:signup', severity: 'warning', extra: { email: email.trim() } });
      setError(result.error || 'Failed to create account');
    }
  };

  const meterColor = (score: number) => {
    if (score <= 1) return 'var(--v3-color-error)';
    if (score === 2) return '#F59E0B';
    if (score === 3) return '#10B981';
    if (score >= 4) return 'var(--v3-color-fuchsia)';
    return 'transparent';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--v3-color-cream)' }} className="v3-root" data-bg-mode="light">
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid var(--v3-color-divider)' }}>
        <Logo size="md" variant="light" />
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/login" style={{ fontSize: '13px', color: 'var(--v3-color-ink-muted)', textDecoration: 'none', fontFamily: 'var(--v3-font-body)' }}>Already have an account? Sign in</Link>
        </div>
      </nav>

      <Divider variant="light" width="full" />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ maxWidth: '440px', width: '100%' }}>
          <div style={{ textAlign: 'left', marginBottom: '32px' }}>
            <Eyebrow style={{ marginBottom: '16px' }}>Create account</Eyebrow>
            <h1 style={{ fontFamily: 'var(--v3-font-display)', fontSize: '32px', fontWeight: 500, color: 'var(--v3-color-ink)', margin: '0 0 8px', lineHeight: 1.1 }}>
              Create Account
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--v3-color-ink-secondary)', lineHeight: 1.6, fontFamily: 'var(--v3-font-body)', margin: '0 0 4px' }}>
              Join the LYC Intelligence System
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--v3-color-ink-secondary)', marginBottom: '8px', fontFamily: 'var(--v3-font-body)' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--v3-color-ink-muted)' }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    background: 'var(--v3-color-white)',
                    border: '1px solid var(--v3-color-divider)',
                    borderRadius: 0,
                    color: 'var(--v3-color-ink)',
                    fontSize: '14px',
                    outline: 'none',
                    minHeight: '48px',
                    fontFamily: 'var(--v3-font-body)',
                    boxSizing: 'border-box',
                    transition: 'border-color 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--v3-color-ink-secondary)', marginBottom: '8px', fontFamily: 'var(--v3-font-body)' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--v3-color-ink-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    background: 'var(--v3-color-white)',
                    border: '1px solid var(--v3-color-divider)',
                    borderRadius: 0,
                    color: 'var(--v3-color-ink)',
                    fontSize: '14px',
                    outline: 'none',
                    minHeight: '48px',
                    fontFamily: 'var(--v3-font-body)',
                    boxSizing: 'border-box',
                    transition: 'border-color 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--v3-color-ink-secondary)', marginBottom: '8px', fontFamily: 'var(--v3-font-body)' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--v3-color-ink-muted)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 12 characters"
                  autoComplete="new-password"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    background: 'var(--v3-color-white)',
                    border: '1px solid var(--v3-color-divider)',
                    borderRadius: 0,
                    color: 'var(--v3-color-ink)',
                    fontSize: '14px',
                    outline: 'none',
                    minHeight: '48px',
                    fontFamily: 'var(--v3-font-body)',
                    boxSizing: 'border-box',
                    transition: 'border-color 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', height: '4px', background: 'var(--v3-color-divider)' }}>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      style={{
                        width: '20%',
                        background: level < pwdStrength.score ? meterColor(pwdStrength.score) : 'transparent',
                        borderRight: level < 4 ? '1px solid var(--v3-color-cream)' : 'none',
                        transition: 'background-color 200ms cubic-bezier(0.4,0,0.2,1)',
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '6px', fontFamily: 'var(--v3-font-body)' }}>
                  <span style={{ color: pwdStrength.score > 0 ? meterColor(pwdStrength.score) : 'transparent' }}>
                    {pwdStrength.score > 0 ? passwordScoreLabel(pwdStrength.score) : ' '}
                  </span>
                  {pwdStrength.warnings.length > 0 && (
                    <span style={{ color: 'var(--v3-color-error)' }}>{pwdStrength.warnings[0]}</span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--v3-color-ink-secondary)', marginBottom: '8px', fontFamily: 'var(--v3-font-body)' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--v3-color-ink-muted)' }} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    background: 'var(--v3-color-white)',
                    border: '1px solid var(--v3-color-divider)',
                    borderRadius: 0,
                    color: 'var(--v3-color-ink)',
                    fontSize: '14px',
                    outline: 'none',
                    minHeight: '48px',
                    fontFamily: 'var(--v3-font-body)',
                    boxSizing: 'border-box',
                    transition: 'border-color 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>
            </div>

            {error && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '14px 16px', border: '1px solid var(--v3-color-error)', color: 'var(--v3-color-error)', fontSize: '14px', marginBottom: '20px', fontFamily: 'var(--v3-font-body)', background: 'transparent' }}>
                <AlertCircle style={{ width: 18, height: 18, flexShrink: 0, marginTop: '1px' }} />
                {error}
              </div>
            )}

            {loading ? (
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: 'var(--v3-color-fuchsia)',
                  color: 'var(--v3-color-cream)',
                  border: 0,
                  borderRadius: 0,
                  fontSize: 'var(--v3-text-label)',
                  fontWeight: 500,
                  letterSpacing: 'var(--v3-tracking-label)',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--v3-font-mono)',
                  cursor: 'not-allowed',
                  opacity: 0.7,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: '48px',
                  boxSizing: 'border-box',
                }}
              >
                <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />Creating account...
              </button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                accent="fuchsia"
                style={{ width: '100%' }}
              >
                Create Account
              </Button>
            )}
          </form>

          <p style={{ fontSize: '12px', color: 'var(--v3-color-ink-muted)', textAlign: 'center', marginTop: '32px', lineHeight: 1.5, fontFamily: 'var(--v3-font-body)' }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:focus {
          border-color: var(--v3-color-fuchsia) !important;
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--v3-color-fuchsia) 20%, transparent) !important;
        }
        input::placeholder {
          color: var(--v3-color-ink-muted);
        }
      `}</style>
    </div>
  );
}
