/**
 * LegalPages — Terms of Service, Privacy Policy, Cookie Policy (S4-T03)
 *
 * Public legal compliance pages required before production launch.
 * Content covers the key sections specified in the Legal Pages spec,
 * including GDPR + PIPL user rights, third-party processors
 * (DeepSeek, Supabase, Stripe), and PRC/Shanghai governing law.
 */
import React, { useState } from 'react';
import { ArrowLeft, FileText, Shield, Cookie, Download, Trash2, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { authFetch } from '@/utils/authFetch';
import { SEO } from '@/components/seo/SEO';
import { Section, Eyebrow, Button, Divider } from '@/components/ui/v3';

interface Section {
  heading: string;
  body: React.ReactNode;
}

function LegalLayout({ title, intro, sections, lastUpdated, actions }: {
  title: string;
  intro: string;
  sections: Section[];
  lastUpdated: string;
  actions?: React.ReactNode;
}) {
  return (
    <div style={{ background: 'var(--v3-color-white)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '96px 24px 128px' }}>
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 'var(--v3-text-label)',
            lineHeight: 'var(--v3-leading-label)',
            letterSpacing: 'var(--v3-tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--v3-color-ink-muted)',
            textDecoration: 'none',
            marginBottom: '48px',
          }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </a>

        <h1
          style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: 'var(--v3-text-display-md)',
            lineHeight: 'var(--v3-leading-display-md)',
            fontWeight: 700,
            color: 'var(--v3-color-ink)',
            margin: '0 0 16px',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 'var(--v3-text-label)',
            lineHeight: 'var(--v3-leading-label)',
            letterSpacing: 'var(--v3-tracking-label)',
            color: 'var(--v3-color-ink-muted)',
            margin: '0 0 24px',
          }}
        >
          Last updated: {lastUpdated}
        </p>

        <p
          style={{
            fontFamily: 'var(--v3-font-body)',
            fontSize: 'var(--v3-text-body)',
            lineHeight: 1.6,
            color: 'var(--v3-color-ink-secondary)',
            margin: '0 0 64px',
          }}
        >
          {intro}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {sections.map((s, i) => (
            <section key={i}>
              <div style={{ marginBottom: '16px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--v3-font-display)',
                    fontSize: 'var(--v3-text-heading-md)',
                    lineHeight: 'var(--v3-leading-heading-md)',
                    fontWeight: 700,
                    color: 'var(--v3-color-ink)',
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--v3-font-mono)',
                      fontSize: 'var(--v3-text-label)',
                      lineHeight: 'var(--v3-leading-label)',
                      letterSpacing: 'var(--v3-tracking-label)',
                      color: 'var(--v3-color-ink-muted)',
                      marginRight: '12px',
                      fontWeight: 400,
                    }}
                  >
                    {i + 1}.
                  </span>
                  {s.heading}
                </h2>
              </div>
              <Divider variant="strong" width="full" style={{ marginBottom: '20px' }} />
              <div
                style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: 'var(--v3-color-ink)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {s.body}
              </div>
            </section>
          ))}
        </div>

        {actions}

        <div
          style={{
            marginTop: '96px',
            paddingTop: '24px',
            borderTop: '1px solid var(--v3-color-divider)',
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 'var(--v3-text-label)',
            lineHeight: 'var(--v3-leading-label)',
            letterSpacing: 'var(--v3-tracking-label)',
            color: 'var(--v3-color-ink-muted)',
          }}
        >
          LYC Partners Shanghai · For questions about this policy, contact{' '}
          <a
            href="mailto:legal@lyc-intelligence.app"
            style={{
              color: 'var(--v3-color-fuchsia)',
              textDecoration: 'none',
            }}
          >
            legal@lyc-intelligence.app
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Terms of Service ──
export function TermsPage() {
  const sections: Section[] = [
    {
      heading: 'Service Description',
      body: <p>LYC Intelligence ("the Service") is an executive intelligence service operated by LYC Partners Shanghai, providing AI-powered advisory (LYC Intelligence), candidate-client matching, diagnostic tools, and coaching services for China-APAC executives and the organizations that hire them.</p>,
    },
    {
      heading: 'User Accounts',
      body: <p>You must provide accurate information when creating an account and are responsible for safeguarding your credentials. We reserve the right to suspend accounts that violate these terms or applicable law.</p>,
    },
    {
      heading: 'Miles & Payment',
      body: <p>The Service uses a miles-based system. Your "Executive Introduction" provides 5 complimentary messages. Additional miles may be purchased. Miles are non-refundable except where required by law and do not expire unless stated otherwise at purchase. Council memberships are billed as subscriptions and may be cancelled per their terms.</p>,
    },
    {
      heading: 'AI Disclaimer',
      body: <p>LYC Intelligence responses are generated by language models and constitute advisory guidance only. They are not legal, financial, or investment advice. You should consult qualified professionals before making decisions based on AI output. We do not guarantee the accuracy or completeness of AI-generated content.</p>,
    },
    {
      heading: 'Intellectual Property',
      body: <p>All service content, software, and branding are the property of LYC Partners or its licensors. You retain rights to content you submit (e.g., diagnostic answers, resumes) and grant us a license to process it solely to provide the Service.</p>,
    },
    {
      heading: 'Acceptable Use',
      body: <p>You agree not to misuse the Service, including reverse-engineering, scraping data, transmitting malware, or using the Service for unlawful purposes. Candidate and client data must be handled in compliance with applicable privacy laws.</p>,
    },
    {
      heading: 'Limitation of Liability',
      body: <p>To the maximum extent permitted by law, LYC Partners' total liability for any claim arising from the Service is limited to the amount you paid in the preceding 12 months, or the miles purchased, whichever is greater. We are not liable for indirect or consequential damages.</p>,
    },
    {
      heading: 'Governing Law & Dispute Resolution',
      body: <p>These terms are governed by the laws of the People's Republic of China (PRC). Any dispute shall first be resolved through good-faith negotiation. If unresolved within 30 days, the dispute shall be submitted to the Shanghai International Economic and Trade Arbitration Commission (SHIAC) for arbitration in Shanghai in accordance with its rules.</p>,
    },
    {
      heading: 'Changes',
      body: <p>We may update these terms. Material changes will be notified via email or in-app notice. Continued use after the effective date constitutes acceptance.</p>,
    },
  ];
  return (
    <>
      <SEO page="terms" />
      <LegalLayout
        title="Terms of Service"
        intro="These Terms govern your use of LYC Intelligence. By accessing or using the Service, you agree to be bound by these Terms."
        sections={sections}
        lastUpdated="August 4, 2026"
      />
    </>
  );
}

// ── Privacy Policy ──
export function PrivacyPage() {
  const sections: Section[] = [
    {
      heading: 'Data Controller',
      body: <p>LYC Partners Shanghai is the data controller responsible for your personal data. Contact us at <a href="mailto:privacy@lyc-intelligence.app" style={{ color: 'var(--v3-color-fuchsia)', textDecoration: 'none' }}>privacy@lyc-intelligence.app</a> for privacy inquiries.</p>,
    },
    {
      heading: 'Data We Collect',
      body: (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Account data:</strong> name, email, password (hashed), role, organization.</li>
          <li><strong>Profile data:</strong> title, company, industry, seniority, location, resume.</li>
          <li><strong>Activity data:</strong> diagnostic answers, chat history, applications, bookings.</li>
          <li><strong>Usage data:</strong> device, browser, IP address, pages visited (via cookies).</li>
        </ul>
      ),
    },
    {
      heading: 'Purpose of Processing',
      body: <p>We process your data to provide the Service (matching, advisory, diagnostics), to operate and improve the service, to communicate with you, to process payments, and to comply with legal obligations.</p>,
    },
    {
      heading: 'Third-Party Processors',
      body: (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Supabase</strong> — database, authentication, and file storage (Netherlands).</li>
          <li><strong>DeepSeek</strong> — AI language model processing for LYC Intelligence responses.</li>
          <li><strong>Stripe</strong> — payment processing (PCI-DSS compliant).</li>
          <li><strong>Vercel</strong> — application hosting and content delivery.</li>
        </ul>
      ),
    },
    {
      heading: 'Cross-Border Transfers',
      body: <p>Your data may be processed outside your country of residence, including in the EU, the United States, and the PRC. We rely on appropriate safeguards (e.g., standard contractual clauses) and comply with PRC Personal Information Protection Law (PIPL) cross-border transfer requirements where applicable.</p>,
    },
    {
      heading: 'Retention',
      body: <p>We retain personal data only as long as necessary for the purposes described or as required by law. Account data is retained while your account is active. You may request deletion; deletion is completed within 30 days, subject to legal retention obligations.</p>,
    },
    {
      heading: 'Your Rights (GDPR / PIPL)',
      body: (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>Access, correct, or delete your personal data.</li>
          <li>Restrict or object to processing.</li>
          <li>Data portability (receive your data in a structured format).</li>
          <li>Withdraw consent at any time (without affecting prior processing).</li>
          <li>Lodge a complaint with your local data protection authority.</li>
        </ul>
      ),
    },
    {
      heading: 'Data Export & Deletion',
      body: <p>To exercise your rights, contact <a href="mailto:privacy@lyc-intelligence.app" style={{ color: 'var(--v3-color-fuchsia)', textDecoration: 'none' }}>privacy@lyc-intelligence.app</a>. We will respond within 30 days. Account deletion initiates a soft delete followed by a hard delete after 30 days.</p>,
    },
    {
      heading: 'Security',
      body: <p>We use industry-standard measures including encryption in transit (TLS) and at rest, row-level security, and access controls. No method of transmission is 100% secure, but we work to protect your data.</p>,
    },
  ];
  return (
    <>
      <SEO page="privacy" />
      <LegalLayout
        title="Privacy Policy"
        intro="This Privacy Policy explains how LYC Partners Shanghai collects, uses, and protects your personal data when you use LYC Intelligence."
        sections={sections}
        lastUpdated="August 4, 2026"
        actions={<PrivacyActionsPanel />}
      />
    </>
  );
}

// ── Cookie Policy ──
export function CookiesPage() {
  const sections: Section[] = [
    {
      heading: 'What Are Cookies',
      body: <p>Cookies are small text files stored on your device when you visit a website. They help the site function and remember your preferences. We use two categories of cookies on LYC Intelligence.</p>,
    },
    {
      heading: 'Essential Cookies',
      body: <p>These are necessary for the Service to function. They enable authentication, session management, and security. Essential cookies cannot be disabled.</p>,
    },
    {
      heading: 'Analytics Cookies',
      body: <p>These help us understand how visitors use the site so we can improve it. They collect aggregated, anonymized usage data. Analytics cookies are only set after you consent via the cookie banner.</p>,
    },
    {
      heading: 'Consent',
      body: <p>On your first visit, a banner asks you to accept or reject non-essential cookies. Your choice is stored in your browser's local storage. You can change your choice at any time by clearing your browser storage or contacting us.</p>,
    },
    {
      heading: 'Managing Cookies',
      body: <p>You can also control cookies through your browser settings. Note that disabling essential cookies may prevent the Service from working correctly.</p>,
    },
    {
      heading: 'Third-Party Cookies',
      body: <p>Our third-party processors (Supabase, Stripe, Vercel) may set their own cookies as part of their services. These are governed by their respective privacy policies.</p>,
    },
  ];
  return (
    <>
      <SEO page="cookies" />
      <LegalLayout
        title="Cookie Policy"
        intro="This policy explains how LYC Intelligence uses cookies and similar technologies, and how you can control them."
        sections={sections}
        lastUpdated="August 4, 2026"
      />
    </>
  );
}

export default LegalLayout;

// ── Self-service privacy actions (data export + account deletion) ──
function PrivacyActionsPanel() {
  const user = useAuthStore(s => s.user);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleExport = async () => {
    setError(null);
    setSuccess(null);
    setExporting(true);
    try {
      const res = await authFetch('/api/user/data-export', { method: 'GET' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      const payload = await res.json();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lyc-personal-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccess('Your data export has been downloaded.');
    } catch (err: any) {
      setError(err?.message || 'Could not export your data right now.');
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async () => {
    setError(null);
    setSuccess(null);
    setDeleting(true);
    try {
      const res = await authFetch('/api/user/delete', { method: 'POST' });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
      setSuccess(body.message || 'Account deletion scheduled. Personal data will be removed within 30 days.');
      setConfirming(false);
    } catch (err: any) {
      setError(err?.message || 'Could not complete deletion request.');
    } finally {
      setDeleting(false);
    }
  };

  if (!user) {
    return (
      <div
        style={{
          marginTop: '48px',
          padding: '24px',
          border: '1px solid var(--v3-color-divider)',
          background: 'var(--v3-color-cream)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <AlertCircle style={{ width: '16px', height: '16px', color: 'var(--v3-color-ink-muted)', flexShrink: 0, marginTop: '2px' }} />
          <div
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--v3-color-ink-secondary)',
            }}
          >
            To download your personal data or request account deletion, please{' '}
            <a href="/login" style={{ color: 'var(--v3-color-fuchsia)', textDecoration: 'none', fontWeight: 500 }}>sign in</a>{' '}
            first. You may also email{' '}
            <a href="mailto:privacy@lyc-intelligence.app" style={{ color: 'var(--v3-color-fuchsia)', textDecoration: 'none' }}>privacy@lyc-intelligence.app</a>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: '48px',
        padding: '24px',
        border: '1px solid var(--v3-color-divider)',
        background: 'var(--v3-color-cream)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--v3-font-display)',
          fontSize: 'var(--v3-text-heading-md)',
          lineHeight: 'var(--v3-leading-heading-md)',
          fontWeight: 700,
          color: 'var(--v3-color-ink)',
          margin: '0 0 8px',
        }}
      >
        Exercise your rights
      </h3>
      <p
        style={{
          fontFamily: 'var(--v3-font-body)',
          fontSize: '14px',
          color: 'var(--v3-color-ink-secondary)',
          lineHeight: 1.6,
          margin: '0 0 24px',
        }}
      >
        Download a copy of your personal data (right to portability) or request account deletion.
      </p>

      {error && (
        <div
          style={{
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          <AlertCircle style={{ width: '16px', height: '16px', color: 'var(--v3-color-error)', flexShrink: 0, marginTop: '1px' }} />
          <span
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontSize: '14px',
              lineHeight: 1.5,
              color: 'var(--v3-color-error)',
            }}
          >
            {error}
          </span>
        </div>
      )}
      {success && (
        <div
          style={{
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '12px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}
        >
          <CheckCircle2 style={{ width: '16px', height: '16px', color: 'var(--v3-color-success)', flexShrink: 0, marginTop: '1px' }} />
          <span
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontSize: '14px',
              lineHeight: 1.5,
              color: 'var(--v3-color-success)',
            }}
          >
            {success}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <Button
          variant="ghost"
          accent="fuchsia"
          onClick={handleExport}
          disabled={exporting || deleting}
          style={exporting || deleting ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' } : undefined}
        >
          {exporting ? <Loader2 style={{ width: '14px', height: '14px', animation: 'spin 1s linear infinite' }} /> : <Download style={{ width: '14px', height: '14px' }} />}
          <span>Download my data</span>
        </Button>

        {!confirming ? (
          <button
            type="button"
            onClick={() => { setConfirming(true); setError(null); setSuccess(null); }}
            disabled={exporting || deleting}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 20px',
              background: 'transparent',
              border: '1px solid var(--v3-color-error)',
              color: 'var(--v3-color-error)',
              fontFamily: 'var(--v3-font-mono)',
              fontSize: 'var(--v3-text-label)',
              lineHeight: 'var(--v3-leading-label)',
              letterSpacing: 'var(--v3-tracking-label)',
              textTransform: 'uppercase',
              fontWeight: 400,
              cursor: exporting || deleting ? 'not-allowed' : 'pointer',
              opacity: exporting || deleting ? 0.5 : 1,
              borderRadius: 0,
              boxShadow: 'none',
              transition: 'background var(--v3-dur) var(--v3-ease)',
            }}
            onMouseEnter={(e) => { if (!exporting && !deleting) e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <Trash2 style={{ width: '14px', height: '14px' }} />
            Delete my account
          </button>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: '14px',
                lineHeight: 1.5,
                color: 'var(--v3-color-error)',
              }}
            >
              This schedules permanent deletion in 30 days. Confirm?
            </span>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 20px',
                background: 'var(--v3-color-error)',
                border: '1px solid var(--v3-color-error)',
                color: 'var(--v3-color-white)',
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 'var(--v3-text-label)',
                lineHeight: 'var(--v3-leading-label)',
                letterSpacing: 'var(--v3-tracking-label)',
                textTransform: 'uppercase',
                fontWeight: 400,
                cursor: deleting ? 'not-allowed' : 'pointer',
                opacity: deleting ? 0.5 : 1,
                borderRadius: 0,
                boxShadow: 'none',
                transition: 'background var(--v3-dur) var(--v3-ease)',
              }}
            >
              {deleting ? <Loader2 style={{ width: '14px', height: '14px', animation: 'spin 1s linear infinite' }} /> : <Trash2 style={{ width: '14px', height: '14px' }} />}
              Yes, delete
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={deleting}
              style={{
                padding: '14px 20px',
                background: 'transparent',
                border: '1px solid var(--v3-color-divider)',
                color: 'var(--v3-color-ink-secondary)',
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 'var(--v3-text-label)',
                lineHeight: 'var(--v3-leading-label)',
                letterSpacing: 'var(--v3-tracking-label)',
                textTransform: 'uppercase',
                fontWeight: 400,
                cursor: deleting ? 'not-allowed' : 'pointer',
                opacity: deleting ? 0.5 : 1,
                borderRadius: 0,
                boxShadow: 'none',
                transition: 'background var(--v3-dur) var(--v3-ease)',
              }}
              onMouseEnter={(e) => { if (!deleting) e.currentTarget.style.background = 'var(--v3-color-cream)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
