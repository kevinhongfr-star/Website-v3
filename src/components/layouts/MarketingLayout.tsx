/**
 * Phase V2 — MarketingLayout v3 (editorial minimalism).
 *
 * Chrome: MarketingNav v3 at top + v3 dark-mode MarketingFooter at bottom.
 * Pages rendered via Outlet.
 *
 * Visual:
 *  - Flex column min-height 100vh — footer pushed to bottom.
 *  - Each Outlet page owns its background (cream/dark/white per Section).
 *  - The Nav has its own v3-root scope; Footer has its own v3-root scope
 *    (dark mode, always). Outlet pages can choose v3-root via <Section>
 *    or use legacy styles (portal/backwards compatibility preserved).
 */
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import MarketingNav from '@/components/navigation/MarketingNav';
import { SkipToContent } from '@/components/a11y/SkipToContent';
import { Logo } from '@/components/ui/Logo';

function MarketingFooter(): React.ReactElement {
  const year = new Date().getFullYear();

  // 4 columns per v3.0 brief (P0 #3):
  //   Col 1: LYC reverse logo + 1-line tagline ("Executive Intelligence.")
  //   Col 2: Products — NEXUS, DEX AI, Board Brief, Match
  //   Col 3: Company — About, Advisory, Executive Search, Research
  //   Col 4: Legal — Terms, Privacy, Cookies
  // Pillar links surface under Company (firm-first IA): the three pillars
  // (Advisory / Executive Search / Research) sit alongside About.
  const columns: Array<{
    title: string;
    links: Array<{ label: string; href: string; external?: boolean; mailto?: boolean }>;
  }> = [
    {
      title: 'Products',
      links: [
        { label: 'NEXUS', href: '/nexus' },
        { label: 'DEX AI', href: '/dex' },
        { label: 'Board Brief', href: '/b2b' },
        { label: 'Match', href: '/match' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/#about' },
        { label: 'Advisory', href: '/advisory' },
        { label: 'Executive Search', href: '/search' },
        { label: 'Research', href: '/research' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms', href: '/terms' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Cookies', href: '/cookies' },
      ],
    },
  ];

  const colHeading: React.CSSProperties = {
    fontFamily: 'var(--v3-font-mono)',
    fontSize: 'var(--v3-text-label)',
    letterSpacing: 'var(--v3-tracking-label)',
    textTransform: 'uppercase',
    fontWeight: 500,
    color: 'var(--v3-color-paper-secondary)',
    margin: 0,
    marginBottom: 'var(--v3-space-5)',
  };

  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--v3-space-4)',
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--v3-font-body)',
    fontWeight: 400,
    fontSize: 'var(--v3-text-body)',
    lineHeight: 'var(--v3-leading-body)',
    color: 'var(--v3-color-paper-secondary)',
    textDecoration: 'none',
    transition: `color var(--v3-dur) var(--v3-ease)`,
  };

  return (
    <footer
      className="v3-root"
      data-bg-mode="dark"
      style={{
        background: 'var(--v3-color-dark)',
        color: 'var(--v3-color-paper)',
        borderTop: '1px solid var(--v3-color-divider-dark)',
        marginTop: 'auto',
      }}
    >
      <div
        className="v3-container"
        style={{
          paddingBlock: 'var(--v3-space-9)',
        }}
      >
        {/* Top grid — 4 columns: brand + 3 link columns */}
        <div
          style={{
            display: 'grid',
            gap: 'var(--v3-space-8)',
            gridTemplateColumns: 'minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))',
          }}
          className="marketing-footer-grid"
        >
          {/* Col 1: Brand lockup + tagline */}
          <div>
            <Link
              to="/"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                marginBottom: 'var(--v3-space-5)',
              }}
              aria-label="LYC — Home"
            >
              <Logo size="md" variant="dark" />
            </Link>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontWeight: 400,
                fontSize: 'var(--v3-text-body)',
                lineHeight: 'var(--v3-leading-body)',
                color: 'var(--v3-color-paper-secondary)',
                maxWidth: '34ch',
                margin: 0,
              }}
            >
              Executive Intelligence.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 style={colHeading}>{col.title}</h4>
              <ul style={listStyle}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.mailto ? (
                      <a
                        href={l.href}
                        style={linkStyle}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            'var(--v3-color-paper)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            'var(--v3-color-paper-secondary)';
                        }}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        to={l.href}
                        style={linkStyle}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            'var(--v3-color-paper)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            'var(--v3-color-paper-secondary)';
                        }}
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — copyright + social (text-only, not icons) */}
        <div
          style={{
            borderTop: '1px solid var(--v3-color-divider-dark)',
            marginTop: 'var(--v3-space-9)',
            paddingTop: 'var(--v3-space-5)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--v3-space-4)',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontSize: 'var(--v3-text-body-sm)',
              color: 'var(--v3-color-paper-muted)',
            }}
          >
            © {year} LYC Intelligence. All rights reserved.
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--v3-space-6)',
              flexWrap: 'wrap',
              fontFamily: 'var(--v3-font-mono)',
              fontSize: 'var(--v3-text-label)',
              letterSpacing: 'var(--v3-tracking-label)',
              textTransform: 'uppercase',
            }}
          >
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/lyc-intelligence/' },
              { label: 'WeChat', href: undefined },
            ].map((s) =>
              s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{
                    color: 'var(--v3-color-paper-muted)',
                    textDecoration: 'none',
                    transition: `color var(--v3-dur) var(--v3-ease)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      'var(--v3-color-paper)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      'var(--v3-color-paper-muted)';
                  }}
                >
                  {s.label}
                </a>
              ) : (
                <span key={s.label} style={{ color: 'var(--v3-color-paper-muted)' }}>
                  {s.label}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .marketing-footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .marketing-footer-grid {
            grid-template-columns: 1fr !important;
            gap: var(--v3-space-7) !important;
          }
        }
      `}</style>
    </footer>
  );
}

export function MarketingLayout(): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--v3-color-cream)',
      }}
      data-portal-kind="marketing"
    >
      <SkipToContent targetId="main-content" />
      <MarketingNav />
      <main
        id="main-content"
        aria-label="Main content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
}

export default MarketingLayout;
