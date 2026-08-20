/**
 * Phase V3 — Landing (homepage), firm-first rebuild per Valentina's v3.0 Red Brief.
 *
 * Structure (7 sections, firm-first IA):
 *   1. HERO            — Cream. Firm positioning. Editorial visual right.
 *   2. TRUST BAR       — Cream. Mono eyebrow + 4 stats (no logos).
 *   3. THREE PILLARS   — Cream. 3 equal columns, thin vertical dividers.
 *   4. PRODUCT SPOTLIGHT — NEXUS (cream) + DEX AI (dark) side-by-side.
 *   5. METHODOLOGY     — Cream. 3 numbered steps, horizontal dividers.
 *   6. PULL QUOTE      — Dark. Giant Crimson Pro italic quote + attribution.
 *   7. FINAL CTA       — Cream. Display headline + primary button → PRISM.
 *
 * Firm-first IA: LYC Intelligence (the firm) first; products (NEXUS, DEX AI)
 * featured deeper in the page (section 4), not in the hero.
 *
 * Brand rules:
 *   - Zero radius, zero shadows, zero gradients, zero cards.
 *   - Trio typography: Crimson Pro display, Inter body, IBM Plex Mono labels.
 *   - Two accents only: fuchsia (primary) + teal (secondary).
 *   - All copy uses v3 tokens — never legacy colors / fonts.
 *
 * Banned-word status (Tier-1): none.
 *   "landscape" intentionally NOT used (brief explicitly swaps it out).
 */
import React, { useEffect } from 'react';
import { trackCTA } from '@/analytics/eventTracker';
import { SEO } from '@/components/seo/SEO';
import {
  Section,
  Divider,
  Eyebrow,
  Button,
  PageHeader,
} from '@/components/ui/v3';

// ── 3 Pillars (firm-first IA) ────────────────────────────────────────────
const PILLARS = [
  {
    number: '01',
    title: 'Research & Intelligence',
    body: 'A continuous view of senior decision-makers, market motion, and compensation benchmarks — written memoranda, not decks.',
    cta: 'Explore research',
    href: '/research',
  },
  {
    number: '02',
    title: 'Advisory',
    body: 'Retained coaching, team reviews, leadership acceleration, and board effectiveness cycles. Diagnostic-first, written closeout.',
    cta: 'See programmes',
    href: '/advisory',
  },
  {
    number: '03',
    title: 'Executive Search',
    body: 'Retained mandates and under-the-radar mapping built on 20 years of APAC placements and diagnostic-led shortlisting.',
    cta: 'Learn about search',
    href: '/search',
  },
] as const;

// ── Methodology — 3 steps (full picture, not "landscape") ────────────────
const STEPS = [
  {
    number: '01',
    title: 'We map the full picture of senior decision-makers.',
    description:
      'A longlist of real executives drawn from market knowledge and 20 years of placement data — no scraped lists, no keyword dumps.',
  },
  {
    number: '02',
    title: 'We synthesize with AI-native analytical depth.',
    description:
      'Diagnostic readouts, archetype distributions, and benchmark percentiles are layered together by NEXUS into a single coherent view.',
  },
  {
    number: '03',
    title: 'You get actionable intelligence, not another report.',
    description:
      'A written memorandum with confidence bands and one clear recommendation section — something you can pass to a board verbatim.',
  },
] as const;

// ── Minimal editorial hero visual (no photo, no gradient) ───────────────
// Pure SVG: a single radial decision-surface with one fuchsia node
// highlighted. Editorial, monochrome, no icons.
function HeroVisual() {
  return (
    <svg
      viewBox="0 0 420 420"
      width="100%"
      height="auto"
      role="img"
      aria-label="Editorial decision-surface diagram — one node highlighted"
    >
      <g transform="translate(210, 210)">
        {[60, 110, 155, 195].map((r, i) => {
          const pts = [];
          for (let j = 0; j < 6; j++) {
            const angle = (Math.PI / 3) * j - Math.PI / 2;
            pts.push(`${Math.cos(angle) * r},${Math.sin(angle) * r}`);
          }
          return (
            <polygon
              key={i}
              points={pts.join(' ')}
              fill="none"
              stroke="var(--v3-color-divider)"
              strokeWidth="1"
            />
          );
        })}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          const isAccent = i === 0;
          return (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={Math.cos(angle) * 195}
              y2={Math.sin(angle) * 195}
              stroke={isAccent ? 'var(--v3-color-fuchsia)' : 'var(--v3-color-divider)'}
              strokeWidth={isAccent ? 2 : 1}
            />
          );
        })}
        <polygon
          points={(() => {
            const vals = [165, 120, 100, 130, 90, 115];
            return vals
              .map((v, i) => {
                const angle = (Math.PI / 3) * i - Math.PI / 2;
                return `${Math.cos(angle) * v},${Math.sin(angle) * v}`;
              })
              .join(' ');
          })()}
          fill="var(--v3-color-fuchsia-soft)"
          stroke="var(--v3-color-ink-muted)"
          strokeWidth="1"
        />
        <circle
          cx={Math.cos(-Math.PI / 2) * 165}
          cy={Math.sin(-Math.PI / 2) * 165}
          r="5"
          fill="var(--v3-color-fuchsia)"
        />
      </g>
    </svg>
  );
}

// ── Public Landing export ───────────────────────────────────────────────
export function Landing(): React.ReactElement {
  useEffect(() => {
    document.title = 'LYC Intelligence — Executive Intelligence';
  }, []);

  return (
    <>
      <SEO page="landing" />

      {/* ═══ 1 ─ HERO ════════════════════════════════════════════════ */}
      <Section bg="cream" paddingY="xl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'var(--v3-space-8)',
            alignItems: 'center',
          }}
          className="v3-hero-grid"
        >
          <div>
            <PageHeader
              eyebrow="Executive Intelligence"
              eyebrowAccent="fuchsia"
              headline="The leadership playbook you were given was written for a different world."
              xl
              lead="LYC Intelligence combines 20 years of executive search data with AI-native analytical depth — to give leaders the signal before the noise."
              cta={
                <>
                  <Button
                    variant="primary"
                    accent="fuchsia"
                    href="/nexus/lenses"
                    onClick={() =>
                      trackCTA({
                        location: 'hero_v3',
                        label: 'Explore the system',
                        destination: '/nexus/lenses',
                      })
                    }
                  >
                    Explore the system
                  </Button>
                  <Button
                    variant="ghost"
                    accent="fuchsia"
                    href="/nexus"
                    onClick={() =>
                      trackCTA({
                        location: 'hero_v3',
                        label: 'Meet NEXUS',
                        destination: '/nexus',
                      })
                    }
                  >
                    Meet NEXUS
                  </Button>
                </>
              }
            />
          </div>
          <div aria-hidden className="v3-hero-visual">
            <HeroVisual />
          </div>
        </div>
      </Section>

      <Divider variant="light" width="content" />

      {/* ═══ 2 ─ TRUST BAR ════════════════════════════════════════════ */}
      <Section bg="cream" paddingY="md">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--v3-space-6)',
          }}
        >
          <Eyebrow accent="ink">Trusted by leaders across 47 markets</Eyebrow>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--v3-space-5)',
            }}
            className="v3-trust-grid"
          >
            {[
              { v: '20 years', l: 'of APAC placement data' },
              { v: '93%', l: 'placement rate' },
              { v: '47 markets', l: 'covered' },
              { v: '500+', l: 'companies placed into' },
            ].map((s) => (
              <div key={s.v}>
                <div
                  style={{
                    fontFamily: 'var(--v3-font-display)',
                    fontSize: 'var(--v3-text-display-md)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                    letterSpacing: 'var(--v3-tracking-tight)',
                    color: 'var(--v3-color-ink)',
                    margin: 0,
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--v3-font-mono)',
                    fontSize: 'var(--v3-text-label)',
                    letterSpacing: 'var(--v3-tracking-label)',
                    textTransform: 'uppercase',
                    color: 'var(--v3-color-ink-muted)',
                    marginTop: '10px',
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider variant="light" width="content" />

      {/* ═══ 3 ─ THREE PILLARS ════════════════════════════════════════ */}
      <Section bg="cream" paddingY="lg">
        <div style={{ marginBottom: 'var(--v3-space-9)' }}>
          <Eyebrow accent="fuchsia">Three ways to work with us</Eyebrow>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 0,
          }}
          className="v3-pillars-grid"
        >
          {PILLARS.map((p, idx) => (
            <div
              key={p.number}
              style={{
                paddingInline: idx === 0 ? '0 var(--v3-space-7)' : idx === PILLARS.length - 1 ? 'var(--v3-space-7) 0' : 'var(--v3-space-7)',
                borderLeft: idx === 0 ? 'none' : '1px solid var(--v3-color-divider)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--v3-space-5)',
              }}
              className="v3-pillar-col"
            >
              <div
                style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 'var(--v3-text-label)',
                  letterSpacing: 'var(--v3-tracking-label)',
                  color: 'var(--v3-color-fuchsia)',
                  fontWeight: 500,
                }}
              >
                {p.number}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: 'var(--v3-text-heading-lg)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  letterSpacing: 'var(--v3-tracking-tight)',
                  color: 'var(--v3-color-ink)',
                  margin: 0,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: 'var(--v3-text-body)',
                  lineHeight: 'var(--v3-leading-body)',
                  color: 'var(--v3-color-ink-secondary)',
                  margin: 0,
                }}
              >
                {p.body}
              </p>
              <div style={{ marginTop: 'auto' }}>
                <Button
                  variant="ghost"
                  accent="fuchsia"
                  href={p.href}
                  onClick={() =>
                    trackCTA({
                      location: 'pillars_v3',
                      label: p.cta,
                      destination: p.href,
                    })
                  }
                >
                  {p.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ 4 ─ PRODUCT SPOTLIGHT (NEXUS + DEX AI, 2-up) ════════════ */}
      <Section bg="cream" paddingY="lg" scope={false}>
        <div
          className="v3-root v3-spotlight-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          }}
        >
          {/* NEXUS — cream side */}
          <div
            className="v3-root"
            data-bg-mode="cream"
            style={{
              background: 'var(--v3-color-cream)',
              color: 'var(--v3-color-ink)',
              padding: 'var(--v3-space-9) var(--v3-space-8)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--v3-space-5)' }}>
              <Eyebrow accent="fuchsia">NEXUS</Eyebrow>
              <h3
                style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: 'var(--v3-text-display-md)',
                  fontWeight: 300,
                  lineHeight: 'var(--v3-leading-display-md)',
                  letterSpacing: 'var(--v3-tracking-tight)',
                  color: 'var(--v3-color-ink)',
                  margin: 0,
                  maxWidth: '16ch',
                }}
              >
                Executive intelligence, in your pocket.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: 'var(--v3-text-body)',
                  lineHeight: 'var(--v3-leading-body)',
                  color: 'var(--v3-color-ink-secondary)',
                  margin: 0,
                  maxWidth: '46ch',
                }}
              >
                NEXUS is the AI executive coach built on 20 years of leadership data.
                It knows your role, your diagnostics, and your goals — and it speaks the language of executive leadership.
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--v3-space-3)',
                }}
              >
                {[
                  'AI coach that knows your full context',
                  '11 leadership diagnostics, one system',
                  'Human coaching when you need it',
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      fontFamily: 'var(--v3-font-body)',
                      fontSize: 'var(--v3-text-body)',
                      lineHeight: 'var(--v3-leading-body)',
                      color: 'var(--v3-color-ink)',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: '5px',
                        height: '5px',
                        marginTop: '10px',
                        background: 'var(--v3-color-fuchsia)',
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <div>
                <Button
                  variant="ghost"
                  accent="fuchsia"
                  href="/nexus"
                  onClick={() =>
                    trackCTA({
                      location: 'spotlight_nexus',
                      label: 'Try NEXUS',
                      destination: '/nexus',
                    })
                  }
                >
                  Try NEXUS
                </Button>
              </div>
            </div>
          </div>

          {/* DEX AI — dark side */}
          <div
            className="v3-root"
            data-bg-mode="dark"
            style={{
              background: 'var(--v3-color-dark)',
              color: 'var(--v3-color-paper)',
              padding: 'var(--v3-space-9) var(--v3-space-8)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--v3-space-5)' }}>
              <Eyebrow accent="fuchsia">DEX AI</Eyebrow>
              <h3
                style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: 'var(--v3-text-display-md)',
                  fontWeight: 300,
                  lineHeight: 'var(--v3-leading-display-md)',
                  letterSpacing: 'var(--v3-tracking-tight)',
                  color: 'var(--v3-color-paper)',
                  margin: 0,
                  maxWidth: '16ch',
                }}
              >
                Board-ready intelligence, on demand.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: 'var(--v3-text-body)',
                  lineHeight: 'var(--v3-leading-body)',
                  color: 'var(--v3-color-paper-secondary)',
                  margin: 0,
                  maxWidth: '46ch',
                }}
              >
                DEX AI is the research desk for boards, investment teams, and senior
                sponsors. Compensation, candidate motion, and confidential mapping — written and sourced.
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--v3-space-3)',
                }}
              >
                {[
                  'Compensation benchmarks by market',
                  'Candidate motion and succession tracking',
                  'Under-the-radar mapping',
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      fontFamily: 'var(--v3-font-body)',
                      fontSize: 'var(--v3-text-body)',
                      lineHeight: 'var(--v3-leading-body)',
                      color: 'var(--v3-color-paper)',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: '5px',
                        height: '5px',
                        marginTop: '10px',
                        background: 'var(--v3-color-fuchsia)',
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <div>
                <Button
                  variant="ghost"
                  accent="fuchsia"
                  href="/dex"
                  onClick={() =>
                    trackCTA({
                      location: 'spotlight_dex',
                      label: 'Explore DEX AI',
                      destination: '/dex',
                    })
                  }
                >
                  Explore DEX AI
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ 5 ─ METHODOLOGY / HOW IT WORKS ═══════════════════════════ */}
      <Section bg="cream" paddingY="lg">
        <div style={{ marginBottom: 'var(--v3-space-8)' }}>
          <Eyebrow accent="teal">How it works</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-md)',
              lineHeight: 'var(--v3-leading-display-md)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-ink)',
              margin: '16px 0 0',
              maxWidth: '22ch',
            }}
          >
            Built on 20 years of retained search data.
          </h2>
        </div>

        <Divider variant="light" width="content" />
        {STEPS.map((s) => (
          <React.Fragment key={s.number}>
            <div
              className="v3-step-row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 120px) minmax(0, 1fr)',
                gap: 'var(--v3-space-5)',
                alignItems: 'start',
                paddingBlock: 'var(--v3-space-6)',
              }}
            >
              <div
                aria-hidden
                style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: '64px',
                  lineHeight: 1,
                  fontWeight: 300,
                  letterSpacing: 'var(--v3-tracking-tight)',
                  color: 'var(--v3-color-teal)',
                  userSelect: 'none',
                }}
              >
                {s.number}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--v3-font-display)',
                    fontSize: '24px',
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: 'var(--v3-tracking-tight)',
                    color: 'var(--v3-color-ink)',
                    margin: '0 0 12px',
                  }}
                >
                  {s.title}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--v3-font-body)',
                    fontSize: 'var(--v3-text-body)',
                    lineHeight: 'var(--v3-leading-body)',
                    color: 'var(--v3-color-ink-secondary)',
                  }}
                >
                  {s.description}
                </div>
              </div>
            </div>
            <Divider variant="light" width="content" />
          </React.Fragment>
        ))}
      </Section>

      {/* ═══ 6 ─ PULL QUOTE (dark bg) ══════════════════════════════════ */}
      <Section bg="dark" paddingY="xl">
        <div style={{ maxWidth: '64ch', marginInline: 'auto' }}>
          <blockquote
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '48px',
              lineHeight: 1.15,
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-paper)',
              margin: 0,
              maxWidth: '28ch',
            }}
            className="v3-pullquote"
          >
            &ldquo;The best leaders don&rsquo;t have more answers. They have better questions.&rdquo;
          </blockquote>
          <div
            style={{
              fontFamily: 'var(--v3-font-mono)',
              fontSize: 'var(--v3-text-label)',
              letterSpacing: 'var(--v3-tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--v3-color-paper-muted)',
              marginTop: 'var(--v3-space-6)',
              textAlign: 'right',
            }}
          >
            — Senior Partner, Fortune 100 APAC
          </div>
        </div>
      </Section>

      {/* ═══ 7 ─ FINAL CTA ════════════════════════════════════════════ */}
      <Section bg="cream" paddingY="xl">
        <div style={{ maxWidth: '70ch', marginInline: 'auto', textAlign: 'left' }}>
          <Eyebrow accent="fuchsia">Begin</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-lg)',
              lineHeight: 'var(--v3-leading-display-lg)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-ink)',
              margin: '16px 0 16px',
              maxWidth: '18ch',
            }}
          >
            See what you&rsquo;re missing.
          </h2>
          <p
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontWeight: 400,
              fontSize: 'var(--v3-text-body-lg)',
              lineHeight: 'var(--v3-leading-body-lg)',
              color: 'var(--v3-color-ink-secondary)',
              maxWidth: '52ch',
              margin: '0 0 32px',
            }}
          >
            A 15-minute diagnostic will tell you more than a year of performance reviews.
          </p>
          <Button
            variant="primary"
            accent="fuchsia"
            href="/nexus/lenses/prism"
            onClick={() =>
              trackCTA({
                location: 'final_cta_v3',
                label: 'Begin with your positioning',
                destination: '/nexus/lenses/prism',
              })
            }
          >
            Begin with your positioning
          </Button>
        </div>
      </Section>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1023px) {
          .v3-spotlight-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .v3-hero-grid {
            grid-template-columns: 1fr !important;
            gap: var(--v3-space-6) !important;
          }
          .v3-hero-visual { order: -1; }
          .v3-trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: var(--v3-space-6) var(--v3-space-5) !important;
          }
          .v3-pillars-grid {
            grid-template-columns: 1fr !important;
          }
          .v3-pillar-col {
            padding-inline: 0 !important;
            border-left: none !important;
            border-top: 1px solid var(--v3-color-divider) !important;
            padding-top: var(--v3-space-7) !important;
            padding-bottom: var(--v3-space-7) !important;
          }
          .v3-pillar-col:first-child {
            border-top: none !important;
            padding-top: 0 !important;
          }
          .v3-step-row {
            grid-template-columns: 1fr !important;
            gap: var(--v3-space-3) !important;
          }
          .v3-pullquote {
            font-size: 36px !important;
          }
        }
      `}</style>
    </>
  );
}

export default Landing;
