/**
 * Flagship CPI (Core Professional Insight) landing.
 * Executive self-awareness instrument. Full battery (self + 6 multi-rater).
 *
 * Brand: TIER A — Fuchsia accent.
 */
import { Section, Eyebrow, Divider, Button } from '@/components/ui/v3';
import { SEO } from '@/components/seo/SEO';
import { Link } from 'react-router-dom';


export function CpiFlagshipLanding() {
  return (
    <div style={{ background: 'var(--v3-color-white)', minHeight: '100vh', color: 'var(--v3-color-ink)' }}>
      <SEO
        title="CPI — Core Professional Insight · Executive Self-Awareness | LYC Intelligence"
        description="The flagship executive self-awareness diagnostic. Multi-rater 360° capability, 6 archetypes, 3 tiers. Understand how you operate — and how others see it."
        path="/assessment/cpi"
      />

      <style>{`
        @media (max-width: 900px) {
          .cpi-hero-grid, .cpi-four-box, .cpi-method-grid, .cpi-who-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <div className="cpi-hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: 64,
        padding: '128px 80px 96px',
        maxWidth: 1280,
        margin: '0 auto',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: "var(--v3-color-fuchsia)",
            marginBottom: 16,
          }}>
            CPI · CORE PROFESSIONAL INSIGHT · FLAGSHIP DIAGNOSTIC
          </div>

          <h1 style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: 56,
            lineHeight: 1.05,
            letterSpacing: -0.5,
            margin: 0,
            fontWeight: 500,
          }}>
            The most complete<br/>
            <span style={{ color: "var(--v3-color-fuchsia)" }}>executive self-awareness</span><br/>
            diagnostic in the suite.
          </h1>

          <p style={{
            fontFamily: 'var(--v3-font-body)',
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--v3-color-inkSecondary)',
            margin: '32px 0 48px',
            maxWidth: 560,
          }}>
            Self-ratings and up to six multi-rater respondents. Six leadership archetypes mapped against three capability dimensions. An integrated view of how you operate — and how others see the gap.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Button variant="primary" accent="fuchsia" href="/assessment/cpi/take">Start Your CPI Diagnostic</Button>
            <Button variant="ghost" accent="fuchsia" href="#methodology">Read the methodology</Button>
          </div>

          <div style={{
            marginTop: 48,
            display: 'flex',
            gap: 48,
            flexWrap: 'wrap',
          }}>
            {[
              ['6', 'ARCHETYPES'],
              ['3', 'CAPABILITY DIMS'],
              ['1 + 6', 'SELF + RATERS'],
              ['3', 'TIERS'],
            ].map(([num, label]) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: 36,
                  fontWeight: 500,
                  lineHeight: 1,
                }}>
                  {num}
                </div>
                <div style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--v3-color-inkMuted)',
                  marginTop: 6,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: sample scorecard mock */}
        <div style={{
          border: '1px solid var(--v3-color-dividerStrong)',
          background: 'var(--v3-color-paper)',
          padding: 32,
          alignSelf: 'start',
        }}>
          <div style={{
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--v3-color-inkMuted)',
            marginBottom: 8,
          }}>
            SAMPLE · EXECUTIVE INTRODUCTION TIER
          </div>
          <div style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: 22,
            fontWeight: 500,
            color: 'var(--v3-color-ink)',
            marginBottom: 24,
          }}>
            Strategist — Composite 72 / 100
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { d: 'Vision', self: 78, peers: 62 },
              { d: 'Execution', self: 58, peers: 74 },
              { d: 'Influence', self: 72, peers: 68 },
            ].map(row => (
              <div key={row.d}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 11, letterSpacing: 1, color: 'var(--v3-color-inkSecondary)' }}>
                    {row.d.toUpperCase()}
                  </span>
                  <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 11, color: 'var(--v3-color-inkMuted)' }}>
                    self {row.self} · others {row.peers}
                  </span>
                </div>
                <div style={{ height: 4, background: 'var(--v3-color-divider)', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: 0, top: -2,
                    width: 6, height: 8, background: "var(--v3-color-fuchsia)",
                    transform: `translateX(calc(${row.self}% - 3px))`,
                  }} />
                  <div style={{
                    position: 'absolute', left: 0, top: -2,
                    width: 6, height: 8, background: 'var(--v3-color-ink)',
                    transform: `translateX(calc(${row.peers}% - 3px))`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px solid var(--v3-color-divider)',
            fontFamily: 'var(--v3-font-body)',
            fontSize: 14,
            lineHeight: 1.5,
            color: 'var(--v3-color-inkSecondary)',
          }}>
            Your self-view overestimates Vision by 16 pts and underestimates Execution by 16 pts — a common Strategist pattern. Reviewers see a clear operator who undervalues delivery impact.
          </div>
        </div>
      </div>

      <Divider style={{ maxWidth: 1120, margin: '0 auto' }} />

      {/* ── FOUR PILLARS ──────────────────────────────────────────── */}
      <Section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <Eyebrow accent="fuchsia" style={{ marginBottom: 16 }}>01 · CAPABILITY FRAMEWORK</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: 40,
            lineHeight: 1.1,
            fontWeight: 500,
            margin: '0 0 56px',
            letterSpacing: -0.5,
          }}>
            Three capability dimensions.<br/>
            Six archetypes. One you.
          </h2>

          <div className="cpi-four-box" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            borderLeft: '1px solid var(--v3-color-divider)',
            borderTop: '1px solid var(--v3-color-divider)',
          }}>
            {[
              {
                t: 'Vision',
                d: 'How clearly you set direction, anticipate market movement, and translate complex context into a coherent point of view.',
              },
              {
                t: 'Execution',
                d: 'How consistently you deliver on commitments, translate strategy into operational steps, and hold yourself and others accountable.',
              },
              {
                t: 'Influence',
                d: 'How effectively you move stakeholders, align agendas, and create followership — with and without formal authority.',
              },
              {
                t: 'Self — others gap',
                d: 'The space between your self-view and multi-rater reads. The gap is where most blind spots live.',
              },
            ].map((card, i) => (
              <div key={card.t} style={{
                padding: '28px 24px',
                borderRight: '1px solid var(--v3-color-divider)',
                borderBottom: '1px solid var(--v3-color-divider)',
              }}>
                <div style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 10,
                  letterSpacing: 1.5,
                  color: 'var(--v3-color-inkMuted)',
                  marginBottom: 12,
                }}>
                  0{i + 1}
                </div>
                <h3 style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: 22,
                  fontWeight: 500,
                  margin: '0 0 8px',
                }}>
                  {card.t}
                </h3>
                <p style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: 'var(--v3-color-inkSecondary)',
                  margin: 0,
                }}>
                  {card.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider style={{ maxWidth: 1120, margin: '0 auto' }} />

      {/* ── METHODOLOGY ───────────────────────────────────────────── */}
      <Section id="methodology" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <Eyebrow accent="fuchsia" style={{ marginBottom: 16 }}>02 · DIAGNOSTIC LIFECYCLE</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: 40,
            lineHeight: 1.1,
            fontWeight: 500,
            margin: '0 0 56px',
            letterSpacing: -0.5,
          }}>
            Self-ratings, 360° multi-rater,<br/>and a report with NEXUS.
          </h2>

          <div className="cpi-method-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            borderLeft: '1px solid var(--v3-color-divider)',
            borderTop: '1px solid var(--v3-color-divider)',
          }}>
            {[
              {
                s: '01',
                t: 'Account & context',
                d: 'Sign in, confirm mandate context, accept terms. The diagnostic tailors tone to the information you share.',
              },
              {
                s: '02',
                t: 'Self-ratings + send 360° invites',
                d: 'Complete self-ratings across all three capability dimensions. Invite up to six peers, direct reports, or supervisors.',
              },
              {
                s: '03',
                t: 'Multi-rater window',
                d: 'Each diagnostic cycle allows up to 14 days for raters to respond. You can resend invites and check status at any time.',
              },
              {
                s: '04',
                t: 'Review full report + NEXUS integration',
                d: 'When raters return, generate the full CPI report. It feeds into NEXUS so follow-up is always grounded in your real profile.',
              },
            ].map(s => (
              <div key={s.s} style={{
                padding: '28px 24px 36px',
                borderRight: '1px solid var(--v3-color-divider)',
                borderBottom: '1px solid var(--v3-color-divider)',
              }}>
                <div style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 12,
                  letterSpacing: 1.5,
                  color: "var(--v3-color-fuchsia)",
                  marginBottom: 20,
                }}>
                  {s.s}
                </div>
                <h3 style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: 20,
                  fontWeight: 500,
                  margin: '0 0 12px',
                }}>
                  {s.t}
                </h3>
                <p style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'var(--v3-color-inkSecondary)',
                  margin: 0,
                }}>
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider style={{ maxWidth: 1120, margin: '0 auto' }} />

      {/* ── WHO / WHO NOT ─────────────────────────────────────────── */}
      <Section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <Eyebrow accent="fuchsia" style={{ marginBottom: 16 }}>03 · WHO CPI IS FOR</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: 40,
            lineHeight: 1.1,
            fontWeight: 500,
            margin: '0 0 56px',
            letterSpacing: -0.5,
          }}>
            For anyone leading teams,<br/>decisions, or mandates.
          </h2>

          <div className="cpi-who-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            borderLeft: '1px solid var(--v3-color-divider)',
            borderTop: '1px solid var(--v3-color-divider)',
          }}>
            <div style={{
              padding: '28px 28px 32px',
              borderRight: '1px solid var(--v3-color-divider)',
              borderBottom: '1px solid var(--v3-color-divider)',
            }}>
              <div style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 11,
                letterSpacing: 2,
                color: 'var(--v3-color-inkMuted)',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                CPI IS A GOOD FIT IF YOU
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Have direct reports, P&L accountability, or a formal leadership mandate',
                  'Want a multi-rater 360° view, not just a self-score',
                  'Preparing for a promotion, a new role, or a board seat',
                  'Working with an executive coach and need a baseline',
                  'Trust data, not vague performance feedback cycles',
                ].map(l => (
                  <li key={l} style={{
                    fontFamily: 'var(--v3-font-body)',
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: 'var(--v3-color-ink)',
                    display: 'flex',
                    gap: 12,
                  }}>
                    <span style={{ color: 'var(--v3-color-success)', flexShrink: 0 }}>+</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              padding: '28px 28px 32px',
              borderBottom: '1px solid var(--v3-color-divider)',
            }}>
              <div style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 11,
                letterSpacing: 2,
                color: 'var(--v3-color-inkMuted)',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                CPI IS NOT THE RIGHT START IF YOU
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Want a 10-minute personality-style quick read (start with LEAP)',
                  'Have no multi-rater respondents and only want self-ratings',
                  'Looking for a clinical or mental-health instrument (CPI is not one)',
                  'Avoid honest 360° feedback about blind spots',
                  'Cannot collect at least three multi-rater responses within 14 days',
                ].map(l => (
                  <li key={l} style={{
                    fontFamily: 'var(--v3-font-body)',
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: 'var(--v3-color-ink)',
                    display: 'flex',
                    gap: 12,
                  }}>
                    <span style={{ color: 'var(--v3-color-error)', flexShrink: 0 }}>−</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Divider style={{ maxWidth: 1120, margin: '0 auto' }} />

      {/* ── TIERS ─────────────────────────────────────────────────── */}
      <Section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <Eyebrow accent="fuchsia" style={{ marginBottom: 16 }}>04 · THREE TIERS</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: 40,
            lineHeight: 1.1,
            fontWeight: 500,
            margin: '0 0 56px',
            letterSpacing: -0.5,
          }}>
            Self-ratings first. Multi-rater second.<br/>Full report, always.
          </h2>

          <div className="cpi-method-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            borderLeft: '1px solid var(--v3-color-divider)',
            borderTop: '1px solid var(--v3-color-divider)',
          }}>
            {[
              {
                tier: 'TIER 1',
                name: 'Executive Introduction',
                price: 'Complimentary',
                accentColor: 'var(--v3-color-ink)',
                features: [
                  'Self-ratings only',
                  'Dimension scorecard + composite band',
                  'Primary archetype classification',
                  'NEXUS profile synced',
                ],
                cta: 'Start with Tier 1',
                ctaVariant: 'ghost' as const,
              },
              {
                tier: 'TIER 2',
                name: 'Multi-Rater',
                price: 'Paid tier',
                accentColor: 'var(--v3-color-fuchsia)',
                features: [
                  'Everything in Tier 1',
                  'Up to 6 multi-rater invites',
                  'Self vs. others gap analysis',
                  'Rater-status dashboard',
                ],
                cta: 'Upgrade to Tier 2',
                ctaVariant: 'primary' as const,
              },
              {
                tier: 'TIER 3',
                name: 'Executive Report + Coach',
                price: 'LYC Partners',
                accentColor: 'var(--v3-color-ink)',
                features: [
                  'Everything in Tier 2',
                  'Full CPI narrative report',
                  'Debrief with an accredited LYC coach',
                  'Action plan, 90-day check-in',
                ],
                cta: 'Contact LYC Partners',
                ctaVariant: 'ghost' as const,
              },
            ].map(tier => (
              <div key={tier.tier} style={{
                padding: '32px 28px',
                borderRight: '1px solid var(--v3-color-divider)',
                borderBottom: '1px solid var(--v3-color-divider)',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 11,
                  letterSpacing: 2,
                  color: tier.accentColor,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}>
                  {tier.tier}
                </div>
                <div style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: 24,
                  fontWeight: 500,
                  marginBottom: 4,
                }}>
                  {tier.name}
                </div>
                <div style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 13,
                  color: 'var(--v3-color-inkMuted)',
                  marginBottom: 24,
                }}>
                  {tier.price}
                </div>
                <ul style={{
                  margin: 0, padding: 0, listStyle: 'none',
                  display: 'flex', flexDirection: 'column', gap: 10,
                  marginBottom: 28,
                  flexGrow: 1,
                }}>
                  {tier.features.map(f => (
                    <li key={f} style={{
                      fontFamily: 'var(--v3-font-body)',
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: 'var(--v3-color-inkSecondary)',
                      display: 'flex', gap: 10,
                    }}>
                      <span style={{ color: tier.accentColor }}>→</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.ctaVariant}
                  accent={tier.accentColor === 'var(--v3-color-fuchsia)' ? 'fuchsia' : 'teal'}
                  href="/assessment/cpi/take"
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider style={{ maxWidth: 1120, margin: '0 auto' }} />

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <Section style={{ padding: '96px 24px 128px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow accent="fuchsia" style={{ marginBottom: 20 }}>READY TO START</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: 48,
            lineHeight: 1.08,
            fontWeight: 500,
            margin: '0 0 24px',
            letterSpacing: -0.5,
          }}>
            A complimentary CPI self-diagnostic.<br/>
            Ten minutes. Real insight.
          </h2>
          <p style={{
            fontFamily: 'var(--v3-font-body)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--v3-color-inkSecondary)',
            margin: '0 0 40px',
          }}>
            Tier 1 Executive Introduction covers the self-ratings dimension scorecard, primary archetype, and NEXUS profile sync. Upgrading to multi-rater adds the gap analysis that makes CPI the flagship.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" accent="fuchsia" href="/assessment/cpi/take">Start Your CPI Diagnostic</Button>
            <Button variant="ghost" accent="fuchsia" href="/instruments">Compare all instruments</Button>
          </div>
          <div style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid var(--v3-color-divider)',
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 11,
            letterSpacing: 1,
            color: 'var(--v3-color-inkMuted)',
          }}>
            CPI · CORE PROFESSIONAL INSIGHT · FLAGSHIP EXECUTIVE SELF-AWARENESS · LYC PARTNERS SHANGHAI
          </div>
        </div>
      </Section>
    </div>
  );
}

export default CpiFlagshipLanding;
