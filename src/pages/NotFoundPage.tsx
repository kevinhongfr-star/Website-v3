/**
 * Phase 17 / P2-1 — Branded 404 — on-brand, useful links, never drops traffic.
 *
 * Visual contract with LYC brand rollout:
 *   - Accent fuchsia for primary CTA / accent bar
 *   - Display headings: var(--v3-font-display) serif
 *   - Body copy: var(--v3-font-body) Inter
 *   - Zero radius everywhere (no rounded corners)
 *   - No drop-shadow chrome — flat premium
 *   - Tone: warm + deterministic (not cutesy) — this is for executives
 */
import React from 'react';
import { ArrowRight, Compass, Home, Search } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/v3';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--v3-color-cream)',
        display: 'flex',
        alignItems: 'stretch',
        fontFamily: 'var(--v3-font-body)',
        color: 'var(--v3-color-ink)',
      }}
    >
      <SEO title="Page Not Found — LYC Intelligence" description="The page you're looking for doesn't exist. Explore LYC Intelligence diagnostics and NEXUS." path="/404" />

      <div
        style={{
          width: 'clamp(220px, 32vw, 440px)',
          background: 'var(--v3-color-dark)',
          color: 'var(--v3-color-paper)',
          padding: 'clamp(32px, 6vw, 72px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '3px solid var(--v3-color-fuchsia)',
        }}
      >
        <div>
          <div
            aria-hidden
            style={{
              display: 'inline-block',
              height: 6,
              width: 96,
              background: 'var(--v3-color-fuchsia)',
              marginBottom: 40,
            }}
          />
          <div
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontSize: 'clamp(72px, 12vw, 160px)',
              lineHeight: 0.92,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            404
          </div>
          <p
            style={{
              fontFamily: 'var(--v3-font-mono)',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--v3-color-paper-muted)',
              marginTop: 32,
              marginBottom: 0,
              fontWeight: 500,
            }}
          >
            Route not in market
          </p>
        </div>

        <div
          style={{
            opacity: 0.72,
            fontSize: 12,
            letterSpacing: '0.02em',
            fontFamily: 'var(--v3-font-mono)',
          }}
        >
          <div style={{ marginBottom: 8 }}>LYC Intelligence</div>
          <div>lyc-intelligence.app</div>
        </div>
      </div>

      <main
        style={{
          flex: 1,
          padding: 'clamp(32px, 6vw, 88px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: 0,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            lineHeight: 1.15,
            fontWeight: 700,
            margin: 0,
            color: 'var(--v3-color-ink)',
            maxWidth: 640,
          }}
        >
          The page you were looking for doesn&rsquo;t trade here anymore.
        </h1>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: 'var(--v3-color-ink-secondary)',
            maxWidth: 560,
            marginTop: 24,
            marginBottom: 48,
            fontFamily: 'var(--v3-font-body)',
          }}
        >
          The link may be out of date, mis-typed, or the page may have moved during our
          portal re-organisation. We don&rsquo;t want to lose you — try one of the paths below.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 56 }}>
          <Button
            variant="primary"
            accent="fuchsia"
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <Home size={16} />
            Return home
          </Button>
          <Button
            variant="ghost"
            accent="fuchsia"
            href="/nexus/chat"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1px solid var(--v3-color-divider-strong)', padding: '14px 22px' }}
          >
            <Compass size={16} />
            Ask NEXUS where to go
          </Button>
        </div>

        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--v3-color-ink-muted)',
              marginBottom: 16,
              fontFamily: 'var(--v3-font-mono)',
            }}
          >
            Popular routes
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              maxWidth: 720,
              border: '1px solid var(--v3-color-divider)',
            }}
          >
            {[
              { href: '/pricing',                  label: 'Pricing & Tiers',          sub: 'Executive Introduction → Council' },
              { href: '/diagnostic/prism',         label: 'PRISM Transition Diagnostic', sub: 'Career transition clarity' },
              { href: '/diagnostics',              label: 'All 6 Leadership Diagnostics', sub: 'Browse the full catalog' },
              { href: '/nexus',                    label: 'NEXUS',                    sub: 'Conversational leadership advisor' },
            ].map((r, i) => (
              <a
                key={r.href}
                href={r.href}
                style={{
                  padding: '20px 24px',
                  textDecoration: 'none',
                  color: 'var(--v3-color-ink)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'background 120ms ease',
                  borderTop: i > 1 ? '1px solid var(--v3-color-divider)' : undefined,
                  borderLeft: i % 2 === 1 ? '1px solid var(--v3-color-divider)' : undefined,
                  background: 'transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--v3-color-white)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 15, fontWeight: 600, fontFamily: 'var(--v3-font-body)' }}>
                  <Search size={15} />
                  <span>{r.label}</span>
                  <ArrowRight size={14} style={{ marginLeft: 'auto', color: 'var(--v3-color-fuchsia)' }} />
                </div>
                <div style={{ fontSize: 13, color: 'var(--v3-color-ink-secondary)', fontFamily: 'var(--v3-font-body)' }}>{r.sub}</div>
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 64,
            fontSize: 12,
            color: 'var(--v3-color-ink-muted)',
            fontFamily: 'var(--v3-font-mono)',
          }}
        >
          HTTP 404 · NotFoundRoute · if you believe this is a system error, contact{' '}
          <a
            href="mailto:ops@lyc-intelligence.app"
            style={{ color: 'var(--v3-color-fuchsia)', textDecoration: 'none' }}
          >
            ops@lyc-intelligence.app
          </a>
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          [data-404-root] { flex-direction: column !important; }
          [data-404-accent] { width: 100% !important; border-right: none !important; border-bottom: 3px solid var(--v3-color-fuchsia); }
        }
      `}</style>
    </div>
  );
}
