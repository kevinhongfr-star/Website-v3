import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import {
  validatePasswordStrength,
  passwordScoreLabel,
  passwordScoreColor,
} from '@/lib/auth/passwordPolicy';
import { Logo } from '@/components/ui/Logo';
import { Section, Eyebrow, Button, Divider } from '@/components/ui/v3';

type Mode = 'request' | 'reset';

export function ResetPasswordPage() {
  const isPasswordRecovery = useAuthStore((s) => s.isPasswordRecovery);
  const resetPassword = useAuthStore((s) => s.resetPassword);
  const updatePassword = useAuthStore((s) => s.updatePassword);

  const mode: Mode = isPasswordRecovery ? 'reset' : 'request';

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updated, setUpdated] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pwdStrength = useMemo(
    () => validatePasswordStrength(newPassword),
    [newPassword],
  );

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Email is required'); return; }

    setLoading(true);
    const result = await resetPassword(email.trim());
    setLoading(false);

    if (result.success) {
      setSent(true);
    } else {
      setError(result.error || 'Failed to send reset link');
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword) { setError('Password is required'); return; }
    if (!pwdStrength.passes) {
      setError(pwdStrength.warnings[0] || 'Please choose a stronger password');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await updatePassword(newPassword);
    setLoading(false);

    if (result.success) {
      setUpdated(true);
    } else {
      setError(result.error || 'Unable to update password');
    }
  };

  const meterColor = (score: number) => {
    if (score <= 1) return 'var(--v3-color-error)';
    if (score === 2) return '#F59E0B';
    if (score === 3) return '#10B981';
    if (score >= 4) return 'var(--v3-color-fuchsia)';
    return 'transparent';
  };

  if (mode === 'request' && sent) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--v3-color-cream)' }} className="v3-root" data-bg-mode="light">
        <Nav />
        <Divider variant="light" width="full" />
        <Center>
          <Header
            eyebrow="Check email"
            title="Check Your Email"
            subtitle="If an account exists, you'll receive a reset link shortly."
          />
          <div style={{ border: '1px solid var(--v3-color-success)', padding: '32px', textAlign: 'center' }}>
            <CheckCircle style={{ width: 48, height: 48, color: 'var(--v3-color-success)', margin: '0 auto 16px' }} />
            <p style={{ fontSize: '15px', color: 'var(--v3-color-ink)', fontFamily: 'var(--v3-font-body)', lineHeight: 1.6 }}>
              If an account exists for <strong>{email}</strong>, a reset link is on its way. The link expires in 60 minutes for security.
            </p>
            <Link to="/login" style={{ display: 'inline-block', marginTop: '20px', color: 'var(--v3-color-fuchsia)', fontSize: '14px', fontFamily: 'var(--v3-font-mono)', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Return to login →
            </Link>
          </div>
        </Center>
      </div>
    );
  }

  if (mode === 'reset' && updated) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--v3-color-cream)' }} className="v3-root" data-bg-mode="light">
        <Nav />
        <Divider variant="light" width="full" />
        <Center>
          <Header
            eyebrow="Password updated"
            title="Password Updated"
            subtitle="Your account is secured with your new password."
          />
          <div style={{ border: '1px solid var(--v3-color-success)', padding: '32px', textAlign: 'center' }}>
            <CheckCircle style={{ width: 48, height: 48, color: 'var(--v3-color-success)', margin: '0 auto 16px' }} />
            <p style={{ fontSize: '15px', color: 'var(--v3-color-ink)', fontFamily: 'var(--v3-font-body)', lineHeight: 1.6 }}>
              Your password has been updated successfully. You can now sign in with your new credentials.
            </p>
            <Link to="/login" style={{ display: 'inline-block', marginTop: '20px', color: 'var(--v3-color-fuchsia)', fontSize: '14px', fontFamily: 'var(--v3-font-mono)', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Continue to login →
            </Link>
          </div>
        </Center>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--v3-color-cream)' }} className="v3-root" data-bg-mode="light">
      <Nav />
      <Divider variant="light" width="full" />
      <Center>
        <Header
          eyebrow={mode === 'reset' ? 'Set password' : 'Reset password'}
          title={mode === 'reset' ? 'Set New Password' : 'Reset Password'}
          subtitle={
            mode === 'reset'
              ? 'Choose a strong password to secure your account'
              : 'Enter your email to receive a password reset link'
          }
        />

        {mode === 'request' ? (
          <form onSubmit={handleRequest}>
            <Field label="Email">
              <InputWithIcon icon={<Mail style={{ width: 18, height: 18, color: 'var(--v3-color-ink-muted)' }} />}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  style={inputStyle()}
                />
              </InputWithIcon>
            </Field>

            {error && <ErrorBanner>{error}</ErrorBanner>}

            <SubmitButton loading={loading} label="Send Reset Link" />
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <Field label="New Password">
              <InputWithIcon icon={<Lock style={{ width: 18, height: 18, color: 'var(--v3-color-ink-muted)' }} />}>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 12 characters"
                  autoComplete="new-password"
                  style={inputStyle()}
                />
              </InputWithIcon>
            </Field>

            <PasswordStrengthMeter strength={pwdStrength} meterColor={meterColor} />

            <Field label="Confirm New Password" style={{ marginTop: '16px' }}>
              <InputWithIcon icon={<Lock style={{ width: 18, height: 18, color: 'var(--v3-color-ink-muted)' }} />}>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  autoComplete="new-password"
                  style={inputStyle()}
                />
              </InputWithIcon>
            </Field>

            {error && <ErrorBanner>{error}</ErrorBanner>}

            <SubmitButton loading={loading} label="Update Password" />
          </form>
        )}

        {mode === 'reset' && (
          <p style={{ fontSize: '12px', color: 'var(--v3-color-ink-muted)', textAlign: 'center', marginTop: '32px', lineHeight: 1.5, fontFamily: 'var(--v3-font-mono)', letterSpacing: '0.02em' }}>
            Reset links expire after 60 minutes. If your link has expired, request a new one from the login page.
          </p>
        )}
      </Center>

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

function Nav() {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid var(--v3-color-divider)' }}>
      <Logo size="md" variant="light" />
      <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--v3-color-ink-muted)', textDecoration: 'none', fontFamily: 'var(--v3-font-body)' }}>
        <ArrowLeft style={{ width: 14, height: 14 }} /> Back to login
      </Link>
    </nav>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ maxWidth: '420px', width: '100%' }}>{children}</div>
    </div>
  );
}

function Header({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div style={{ textAlign: 'left', marginBottom: '32px' }}>
      <Eyebrow style={{ marginBottom: '16px' }}>{eyebrow}</Eyebrow>
      <h1 style={{ fontFamily: 'var(--v3-font-display)', fontSize: '32px', fontWeight: 500, color: 'var(--v3-color-ink)', margin: '0 0 8px', lineHeight: 1.1 }}>
        {title}
      </h1>
      <p style={{ fontSize: '16px', color: 'var(--v3-color-ink-secondary)', lineHeight: 1.6, fontFamily: 'var(--v3-font-body)', margin: 0 }}>
        {subtitle}
      </p>
    </div>
  );
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ marginBottom: '20px', ...style }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--v3-color-ink-secondary)', marginBottom: '8px', fontFamily: 'var(--v3-font-body)' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function InputWithIcon({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
        {icon}
      </div>
      {children}
    </div>
  );
}

function inputStyle(): React.CSSProperties {
  return {
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
  };
}

function ErrorBanner({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '14px 16px', border: '1px solid var(--v3-color-error)', color: 'var(--v3-color-error)', fontSize: '14px', marginBottom: '20px', fontFamily: 'var(--v3-font-body)', background: 'transparent' }}>
      <AlertCircle style={{ width: 18, height: 18, flexShrink: 0, marginTop: '1px' }} />
      {children}
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  if (loading) {
    return (
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
        <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />{label}...
      </button>
    );
  }

  return (
    <Button
      type="submit"
      variant="primary"
      accent="fuchsia"
      style={{ width: '100%' }}
    >
      {label}
    </Button>
  );
}

function PasswordStrengthMeter({ strength, meterColor }: { strength: ReturnType<typeof validatePasswordStrength>; meterColor: (score: number) => string }) {
  return (
    <div style={{ marginTop: '10px', marginBottom: '4px' }}>
      <div style={{ display: 'flex', height: '4px', background: 'var(--v3-color-divider)' }}>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            style={{
              width: '20%',
              background: level < strength.score ? meterColor(strength.score) : 'transparent',
              borderRight: level < 4 ? '1px solid var(--v3-color-cream)' : 'none',
              transition: 'background-color 200ms cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '6px', fontFamily: 'var(--v3-font-body)' }}>
        <span style={{ color: strength.score > 0 ? meterColor(strength.score) : 'transparent' }}>
          {strength.score > 0 ? passwordScoreLabel(strength.score) : ' '}
        </span>
        {strength.warnings.length > 0 && (
          <span style={{ color: 'var(--v3-color-error)' }}>{strength.warnings[0]}</span>
        )}
      </div>
    </div>
  );
}
