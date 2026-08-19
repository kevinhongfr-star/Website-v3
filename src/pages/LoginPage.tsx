import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle, Shield } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { getDefaultRoute } from '@/components/auth/PostLoginRedirect';
import { trackLoginSuccess } from '@/analytics/eventTracker';
import { reportError } from '@/analytics/errorMonitor';
import { Logo } from '@/components/ui/Logo';
import { Section, Eyebrow, Button, Divider } from '@/components/ui/v3';

export function LoginPage() {
  const navigate = useNavigate();
  const { signInWithPassword } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMouseEnter = useCallback(() => {
    import('../components/dashboard/ConsultantDashboard');
    import('../components/layout/AppLayout');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    const result = await signInWithPassword(email.trim(), password);
    setLoading(false);

    if (result.success) {
      const store = useAuthStore.getState?.() || {};
      if (store.loadProfile) {
        await store.loadProfile();
      }
      const profile = useAuthStore.getState?.().profile;
      trackLoginSuccess('email', profile?.role ?? undefined);
      const target = getDefaultRoute(profile?.role);
      navigate(target);
    } else {
      reportError(new Error(result.error || 'Login failed'), { scope: 'auth:login', severity: 'warning', extra: { email: email.trim() } });
      setError(result.error || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--v3-color-cream)' }} className="v3-root" data-bg-mode="light">
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid var(--v3-color-divider)' }}>
        <Logo size="md" variant="light" />
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/" style={{ fontSize: '13px', color: 'var(--v3-color-ink-muted)', textDecoration: 'none', fontFamily: 'var(--v3-font-body)' }}>Back to site</Link>
        </div>
      </nav>

      <Divider variant="light" width="full" />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px' }}>
        <div style={{ maxWidth: '420px', width: '100%' }}>

          <div style={{ textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ width: '48px', height: '48px', border: '1px solid var(--v3-color-divider)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Shield style={{ width: 24, height: 24, color: 'var(--v3-color-fuchsia)' }} />
            </div>
            <Eyebrow style={{ marginBottom: '16px' }}>Sign in</Eyebrow>
            <h1 style={{ fontFamily: 'var(--v3-font-display)', fontSize: '32px', fontWeight: 500, color: 'var(--v3-color-ink)', margin: '0 0 8px', lineHeight: 1.1 }}>
              System Access
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--v3-color-ink-secondary)', lineHeight: 1.6, fontFamily: 'var(--v3-font-body)', margin: '0 0 4px' }}>
              Leadership Intelligence System
            </p>
            <p style={{ fontSize: '14px', color: 'var(--v3-color-ink-muted)', lineHeight: 1.6, fontFamily: 'var(--v3-font-body)', margin: 0 }}>
              Please sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} onMouseEnter={handleMouseEnter}>
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

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--v3-color-ink-secondary)', marginBottom: '8px', fontFamily: 'var(--v3-font-body)' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--v3-color-ink-muted)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
                <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />Signing in...
              </button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                accent="fuchsia"
                style={{ width: '100%' }}
              >
                Sign In
              </Button>
            )}

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center' }}>
                <Link to="/reset-password" style={{ fontSize: '13px', color: 'var(--v3-color-ink-muted)', textDecoration: 'none', fontFamily: 'var(--v3-font-body)' }}>
                  Forgot password?
                </Link>
                <span style={{ fontSize: '13px', color: 'var(--v3-color-divider)' }}>·</span>
                <Link to="/signup" style={{ fontSize: '13px', color: 'var(--v3-color-fuchsia)', textDecoration: 'none', fontFamily: 'var(--v3-font-mono)', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Create account
                </Link>
              </div>
            </div>
          </form>

          <p style={{ fontSize: '12px', color: 'var(--v3-color-ink-muted)', textAlign: 'center', marginTop: '32px', lineHeight: 1.5, fontFamily: 'var(--v3-font-mono)', letterSpacing: '0.02em' }}>
            Sign in to access LYC Intelligence.
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
