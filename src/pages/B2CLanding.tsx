/**
 * B2CLanding — V3 FULL RESKIN (V1 data + functionality preserved)
 *
 * Editorial 8 sections top→bottom:
 *   1. Header       — How it works / Lenses / Membership · CTA "Begin with your positioning"
 *   2. Hero         — cream bg, "The leadership playbook you were given was written for a different world."
 *   3. Recognition   — dark, credibility marks
 *   4. How it works — 3 numbered MethodologySteps (01/02/03), thin dividers between
 *   5. Lenses       — 11 lenses, flagship dark callout (CPI), featured entry (PRISM)
 *   6. Membership   — 3 tiers: Explorer / Professional $99 (recommended) / Executive $199
 *   7. Final CTA    — dark, inverted
 *   8. Footer       — minimal, brand + "Your context stays yours."
 *
 * Naming rules (enforced):
 *  - "Membership" not "Pricing" everywhere (nav link + eyebrow aligned)
 *  - "Lenses" not "Diagnostics" (featured mid-conversation, not gated intake)
 *  - "NEXUS" always by name — never "the AI" / "the coach"
 *  - No "Platform" anywhere (hard ban). No "Architecture" / "architect".
 *  - Miles are NOT a marketing feature — shown as factual mono labels, never lead.
 *
 * Canon data (locked): 11 lenses, 4-Pillar structure, mile costs from
 * canon/index.json + src/config/miles.ts. 3 landing tiers from tiers.ts.
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initScrollReveal } from '@/lib/utils';
import {
  Section,
  Eyebrow,
  Button,
  Divider,
  MethodologyStep,
  PricingTextTable,
} from '@/components/ui/v3';

/* ── Canon lens data (11 total — from canon/index.json + miles.ts) ──
 * Descriptors are the canon "descriptor" field. Mile costs are canon-locked.
 * Pillar roles: flagship = dark callout / featured; related = standard cell.
 */
interface Lens {
  code: string;
  descriptor: string;
  pillar: string;
  pillarRole: 'flagship' | 'related';
  miles: number;
  featured?: boolean; // PRISM = featured entry lens
}

const PILLARS = [
  { id: 'P1', name: 'Talent Pipeline' },
  { id: 'P2', name: 'Cross-Border Effectiveness' },
  { id: 'P3', name: 'Strategic Impact' },
  { id: 'P4', name: 'AI-Augmented Leadership' },
];

const LENSES: Lens[] = [
  // P1
  { code: 'CPI',    descriptor: 'China Leadership Pipeline Index',     pillar: 'P1', pillarRole: 'flagship', miles: 5 },
  { code: 'LEAP',   descriptor: 'competitive positioning',             pillar: 'P1', pillarRole: 'related',  miles: 1 },
  { code: 'COACH',  descriptor: 'executive coaching fit',               pillar: 'P1', pillarRole: 'related',  miles: 2 },
  { code: 'QUEST',  descriptor: 'strategic market positioning',         pillar: 'P1', pillarRole: 'related',  miles: 2 },
  // P2
  { code: 'BRIDGE', descriptor: 'cross-cultural relational intelligence', pillar: 'P2', pillarRole: 'flagship', miles: 3 },
  { code: 'DRIVE',  descriptor: 'motivational alignment',              pillar: 'P2', pillarRole: 'related',  miles: 2 },
  { code: 'MOSAIC', descriptor: 'institutional trust & relationship velocity', pillar: 'P2', pillarRole: 'related', miles: 3 },
  // P3
  { code: 'IMPACT', descriptor: 'board & stakeholder impact',          pillar: 'P3', pillarRole: 'flagship', miles: 2 },
  { code: 'PRISM',  descriptor: 'professional branding',               pillar: 'P3', pillarRole: 'related',  miles: 2, featured: true },
  // P4
  { code: 'SPARK',  descriptor: 'AI leadership readiness',            pillar: 'P4', pillarRole: 'flagship', miles: 3 },
  { code: 'FORGE',  descriptor: 'sales excellence capability',         pillar: 'P4', pillarRole: 'related',  miles: 3 },
];

/* ── 3-tier membership display (landing shows 3 of the real 5 tiers) ──
 * Explorer $0 · Professional $99 (recommended, = internal "professional"/"Pro" tier)
 * · Executive $199. Human coaching is a separate add-on layer, not shown here.
 */
const TIERS = [
  {
    name: 'Explorer',
    price: 0,
    priceLabel: 'Complimentary',
    blurb: 'Begin the conversation. Daily NEXUS messages, the PRISM lens on us, and a baseline to grow from.',
    features: ['20 NEXUS messages / day', 'PRISM + LEAP lenses on us', 'Baseline leadership profile'],
  },
  {
    name: 'Professional',
    price: 99,
    priceLabel: '$99/mo',
    recommended: true,
    blurb: 'NEXUS, always on. The full 11-lens catalog. Branded reports, advanced insights, peer benchmarking.',
    features: ['NEXUS messages, no cap', 'Full 11-lens catalog access', 'Branded PDF reports', '5 miles / month'],
  },
  {
    name: 'Executive',
    price: 199,
    priceLabel: '$199/mo',
    blurb: 'Priority NEXUS responses, executive workshops, and a deeper mile allowance for the work that matters most.',
    features: ['Everything in Professional', 'Priority NEXUS responses', 'Quarterly executive workshops', '10 miles / month'],
  },
];

const PRICING_ROWS = [
  { label: 'Access', values: ['Basic', 'Full', 'Priority'] },
  { label: 'NEXUS messages/day', values: ['20 / day', 'Unlimited', 'Priority'] },
  { label: 'Lens catalog', values: ['PRISM + LEAP only', 'All 11 lenses', 'All 11 lenses'] },
  { label: 'Branded PDF reports', values: ['—', '✓', '✓'] },
  { label: 'Miles / month', values: ['—', '5 miles', '10 miles'] },
  { label: 'Executive workshops', values: ['—', '—', 'Quarterly'] },
];

export function B2CLanding() {
  useEffect(() => {
    const observer = initScrollReveal();
    return () => observer.disconnect();
  }, []);

  const otherLenses = LENSES.filter(l => l.code !== 'CPI');

  return (
    <>
      {/* ════════════════ 1. HEADER ════════════════ */}
      <Section bg="white" paddingY="sm" scope={true} style={{ paddingBlock: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--v3-color-divider)',
        }}>
          <Link to="/" style={{
            textDecoration: 'none',
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 'var(--v3-text-label)',
            letterSpacing: 'var(--v3-tracking-label)',
            color: 'var(--v3-color-ink)',
            display: 'inline-block',
          }} aria-label="NEXUS home">
            NEXUS.
          </Link>
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }} className="b2c-nav-links">
            <Button variant="ghost" accent="teal" href="#how-it-works">How it works</Button>
            <Button variant="ghost" accent="teal" href="#lenses">Lenses</Button>
            <Button variant="ghost" accent="teal" href="#membership">Membership</Button>
          </div>
          <Button variant="primary" accent="teal" href="/nexus/chat">Begin with your positioning</Button>
        </div>
      </Section>

      {/* ════════════════ 2. HERO ════════════════ */}
      <Section bg="cream" paddingY="xl">
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow accent="teal">For Senior Leaders</Eyebrow>
          <h1 className="reveal" style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-xl)',
            lineHeight: 'var(--v3-leading-display-xl)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-ink)',
            margin: '16px auto 24px',
            maxWidth: '18ch',
          }}>
            The leadership playbook you were given was written for a different world.
          </h1>
          <p className="reveal" style={{
            fontFamily: 'var(--v3-font-body)',
            fontWeight: 400,
            fontSize: 'var(--v3-text-body-lg)',
            lineHeight: 'var(--v3-leading-body-lg)',
            color: 'var(--v3-color-ink-secondary)',
            maxWidth: '60ch',
            margin: '0 auto 40px',
          }}>
            NEXUS asks the questions most executives skip. Lenses reveal where you actually stand.
            One private thread, eleven lenses, a trajectory you can shape.
          </p>
          <div className="reveal" style={{
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <Button variant="primary" accent="teal" href="/nexus/chat">Begin with your positioning</Button>
            <Button variant="secondary" accent="teal" href="#lenses">Explore the lenses</Button>
          </div>
        </div>

        <div style={{ marginTop: '64px' }}>
          <Divider variant="strong" width="content" />
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 'var(--v3-text-label)',
            lineHeight: 'var(--v3-leading-label)',
            letterSpacing: 'var(--v3-tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--v3-color-ink-muted)',
          }}>
            11 LENSES · 4 PILLARS · ONE THREAD
          </span>
        </div>
      </Section>

      {/* ════════════════ 3. RECOGNITION / TRUST (dark) ════════════════ */}
      <Section bg="dark" paddingY="md">
        <div style={{ textAlign: 'center' }}>
          <Eyebrow accent="teal">Recognition</Eyebrow>
          <h2 className="reveal" style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-md)',
            lineHeight: 'var(--v3-leading-display-md)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-paper)',
            maxWidth: '20ch',
            margin: '16px auto 48px',
          }}>
            Trusted by leaders across global executive markets.
          </h2>
        </div>

        <div className="reveal b2c-trust-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--v3-color-divider-dark)',
          borderBottom: '1px solid var(--v3-color-divider-dark)',
        }}>
          {['Fortune 500', 'Cross-border', 'C-suite', 'Sovereign funds'].map((mark, i, arr) => (
            <div key={mark} style={{
              padding: '32px 16px',
              textAlign: 'center',
              borderRight: i < arr.length - 1 ? '1px solid var(--v3-color-divider-dark)' : 'none',
              fontFamily: 'var(--v3-font-mono)',
              fontSize: 'var(--v3-text-body-sm)',
              letterSpacing: 'var(--v3-tracking-label)',
              color: 'var(--v3-color-paper-muted)',
              textTransform: 'uppercase',
            }}>{mark}</div>
          ))}
        </div>
      </Section>

      {/* ════════════════ 4. HOW IT WORKS (3 numbered steps, rule lines between) ════════════════ */}
      <Section bg="cream" paddingY="lg" id="how-it-works">
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Eyebrow accent="teal">How it works</Eyebrow>
          <h2 className="reveal" style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-lg)',
            lineHeight: 'var(--v3-leading-display-lg)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-ink)',
            margin: '16px 0 16px',
          }}>
            Three movements. One continuous thread.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'var(--v3-font-body)',
            fontWeight: 400,
            fontSize: 'var(--v3-text-body-lg)',
            lineHeight: 'var(--v3-leading-body-lg)',
            color: 'var(--v3-color-ink-secondary)',
            maxWidth: '560px',
            margin: '0 0 32px',
          }}>
            No intake form first. No locked gates. Start wherever you want, and NEXUS meets you there.
          </p>

          <Divider variant="light" width="full" />
          <MethodologyStep
            number="01"
            accent="teal"
            title="Start the conversation"
            description="Open NEXUS chat and say what is on your mind — a decision, a friction, a question you have been avoiding. The thread begins immediately."
          />
          <Divider variant="light" width="full" />
          <MethodologyStep
            number="02"
            accent="teal"
            title="Add a lens when it sharpens things"
            description="NEXUS proposes a lens when it would make the conversation clearer. You opt in deliberately — each lens is a focused diagnostic, not a form to fill out."
          />
          <Divider variant="light" width="full" />
          <MethodologyStep
            number="03"
            accent="teal"
            title="Carry the thread forward"
            description="Insights, milestones, and the next lens all live in one private place. Your context compounds across every conversation."
          />
          <Divider variant="light" width="full" />
        </div>
      </Section>

      {/* ════════════════ 5. LENSES (11 lenses + flagship dark callout) ════════════════ */}
      <Section
        bg="white"
        paddingY="lg"
        id="lenses"
        style={{
          borderTop: '1px solid var(--v3-color-divider)',
          borderBottom: '1px solid var(--v3-color-divider)',
        }}
      >
        <div>
          <Eyebrow accent="teal">Lenses</Eyebrow>
          <h2 className="reveal" style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-lg)',
            lineHeight: 'var(--v3-leading-display-lg)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-ink)',
            margin: '16px 0 16px',
          }}>
            Eleven lenses across four pillars.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'var(--v3-font-body)',
            fontWeight: 400,
            fontSize: 'var(--v3-text-body-lg)',
            lineHeight: 'var(--v3-leading-body-lg)',
            color: 'var(--v3-color-ink-secondary)',
            maxWidth: '600px',
            margin: '0 0 48px',
          }}>
            Each lens is a focused diagnostic NEXUS may propose mid-conversation. PRISM is where most leaders begin.
            CPI is the flagship — reserved for the deepest organizational work.
          </p>

          {/* Pillar legend */}
          <div className="reveal" style={{
            display: 'inline-flex',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '32px',
          }}>
            {PILLARS.map(p => (
              <div key={p.id} style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 'var(--v3-text-label)',
                lineHeight: 'var(--v3-leading-label)',
                letterSpacing: 'var(--v3-tracking-label)',
                color: 'var(--v3-color-ink-secondary)',
              }}>
                <span style={{
                  width: '4px',
                  height: '4px',
                  display: 'inline-block',
                  background: 'var(--v3-color-teal)',
                }} />
                {p.id} · {p.name}
              </div>
            ))}
          </div>

          {/* CPI flagship — dark system callout (full width) */}
          {(() => {
            const cpi = LENSES.find(l => l.code === 'CPI')!;
            const pillarName = PILLARS.find(p => p.id === cpi.pillar)!.name;
            return (
              <Link to="/nexus/chat" className="reveal" style={{
                textDecoration: 'none',
                display: 'block',
                marginBottom: '32px',
                color: 'inherit',
              }}>
                <div style={{
                  background: 'var(--v3-color-dark)',
                  borderTop: '1px solid var(--v3-color-divider-dark-strong)',
                  borderBottom: '1px solid var(--v3-color-divider-dark-strong)',
                  padding: '32px 40px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '32px',
                  flexWrap: 'wrap',
                  boxShadow: 'none',
                  borderRadius: 0,
                }}>
                  <div style={{ flex: '0 0 auto' }}>
                    <div style={{
                      fontFamily: 'var(--v3-font-mono)',
                      fontSize: 'var(--v3-text-label)',
                      lineHeight: 'var(--v3-leading-label)',
                      letterSpacing: 'var(--v3-tracking-label)',
                      textTransform: 'uppercase',
                      color: 'var(--v3-color-paper-muted)',
                      marginBottom: '8px',
                    }}>FLAGSHIP · {pillarName}</div>
                    <h3 style={{
                      fontFamily: 'var(--v3-font-display)',
                      fontWeight: 300,
                      fontSize: 'var(--v3-text-display-md)',
                      lineHeight: 'var(--v3-leading-display-md)',
                      letterSpacing: 'var(--v3-tracking-tight)',
                      color: 'var(--v3-color-paper)',
                      margin: 0,
                    }}>{cpi.code}</h3>
                  </div>
                  <div style={{
                    flex: '1 1 320px',
                    minWidth: '220px',
                  }}>
                    <p style={{
                      fontFamily: 'var(--v3-font-body)',
                      fontWeight: 400,
                      fontSize: 'var(--v3-text-body)',
                      lineHeight: 'var(--v3-leading-body)',
                      color: 'var(--v3-color-paper-secondary)',
                      margin: 0,
                    }}>
                      {cpi.descriptor} — the deepest lens in the catalog. Six dimensions, six archetypes, built for organizational pipeline work. NEXUS brings it in only when the stakes warrant it.
                    </p>
                  </div>
                  <div style={{
                    flex: '0 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    alignItems: 'flex-end',
                  }}>
                    <div style={{
                      fontFamily: 'var(--v3-font-mono)',
                      fontSize: 'var(--v3-text-label)',
                      lineHeight: 'var(--v3-leading-label)',
                      letterSpacing: 'var(--v3-tracking-label)',
                      textTransform: 'uppercase',
                      color: 'var(--v3-color-paper)',
                    }}>
                      {cpi.miles} miles
                    </div>
                    <Button variant="ghost" accent="teal" href="/nexus/chat" style={{ color: 'var(--v3-color-paper)' }}>
                      Take CPI diagnostic
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })()}

          {/* 10 remaining lenses — 3-col text-only grid with dividers */}
          <div className="reveal b2c-lenses-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 0,
            borderTop: '1px solid var(--v3-color-divider)',
            borderLeft: '1px solid var(--v3-color-divider)',
          }}>
            {otherLenses.map((lens, idx) => {
              const featured = lens.featured;
              return (
                <Link key={lens.code} to="/nexus/chat" style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  padding: '32px',
                  borderRight: '1px solid var(--v3-color-divider)',
                  borderBottom: '1px solid var(--v3-color-divider)',
                  position: 'relative',
                  background: featured ? 'var(--v3-color-paper)' : 'transparent',
                  boxShadow: 'none',
                  borderRadius: 0,
                }}>
                  {featured && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      background: 'var(--v3-color-teal)',
                    }} />
                  )}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    paddingLeft: featured ? '8px' : 0,
                  }}>
                    <span style={{
                      fontFamily: 'var(--v3-font-mono)',
                      fontSize: 'var(--v3-text-label)',
                      lineHeight: 'var(--v3-leading-label)',
                      letterSpacing: 'var(--v3-tracking-label)',
                      color: 'var(--v3-color-ink-muted)',
                    }}>{lens.pillar}</span>
                    {featured && (
                      <span style={{
                        fontFamily: 'var(--v3-font-mono)',
                        fontSize: 'var(--v3-text-label)',
                        lineHeight: 'var(--v3-leading-label)',
                        letterSpacing: 'var(--v3-tracking-label)',
                        textTransform: 'uppercase',
                        color: 'var(--v3-color-teal)',
                      }}>ENTRY</span>
                    )}
                  </div>
                  <div style={{ paddingLeft: featured ? '8px' : 0 }}>
                    <h3 style={{
                      fontFamily: 'var(--v3-font-display)',
                      fontWeight: 400,
                      fontSize: 'var(--v3-text-heading-md)',
                      lineHeight: 'var(--v3-leading-heading-md)',
                      letterSpacing: 'var(--v3-tracking-tight)',
                      color: 'var(--v3-color-ink)',
                      margin: '0 0 8px',
                    }}>{lens.code}</h3>
                    <p style={{
                      fontFamily: 'var(--v3-font-body)',
                      fontWeight: 400,
                      fontSize: 'var(--v3-text-body-sm)',
                      lineHeight: 'var(--v3-leading-body-sm)',
                      color: 'var(--v3-color-ink-secondary)',
                      margin: '0 0 16px',
                      minHeight: '48px',
                    }}>
                      {lens.descriptor}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <span style={{
                        fontFamily: 'var(--v3-font-mono)',
                        fontSize: 'var(--v3-text-label)',
                        lineHeight: 'var(--v3-leading-label)',
                        letterSpacing: 'var(--v3-tracking-label)',
                        color: 'var(--v3-color-ink)',
                      }}>
                        {lens.miles} {lens.miles === 1 ? 'mile' : 'miles'}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div style={{ marginTop: '40px' }}>
            <Button variant="ghost" accent="teal" href="/nexus/chat">Explore all lenses</Button>
          </div>
        </div>
      </Section>

      {/* ════════════════ 6. MEMBERSHIP (3 tiers — eyebrow "Membership", not "Pricing") ════════════════ */}
      <Section bg="cream" paddingY="lg" id="membership">
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <Eyebrow accent="teal">Membership</Eyebrow>
          <h2 className="reveal" style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-lg)',
            lineHeight: 'var(--v3-leading-display-lg)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-ink)',
            margin: '16px 0 16px',
          }}>
            One subscription. The whole catalog.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'var(--v3-font-body)',
            fontWeight: 400,
            fontSize: 'var(--v3-text-body-lg)',
            lineHeight: 'var(--v3-leading-body-lg)',
            color: 'var(--v3-color-ink-secondary)',
            maxWidth: '560px',
            margin: '0 0 48px',
          }}>
            Three tiers on this page. Human coaching is a separate add-on layer when you want a person in the room.
          </p>

          <div className="reveal" style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2fr) repeat(3, minmax(0, 1fr))',
              gap: '0',
              borderTop: '1px solid var(--v3-color-divider-strong)',
              borderBottom: '1px solid var(--v3-color-divider-strong)',
            }}>
              {/* Tier header row */}
              <div style={{
                padding: '24px',
                borderRight: '1px solid var(--v3-color-divider)',
                borderBottom: '1px solid var(--v3-color-divider)',
              }}>
                <span style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 'var(--v3-text-label)',
                  lineHeight: 'var(--v3-leading-label)',
                  letterSpacing: 'var(--v3-tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--v3-color-ink-muted)',
                  fontWeight: 500,
                }}>TIER</span>
              </div>
              {TIERS.map((tier, i) => (
                <div key={tier.name} style={{
                  padding: '24px',
                  borderRight: i < TIERS.length - 1 ? '1px solid var(--v3-color-divider)' : 'none',
                  borderBottom: '1px solid var(--v3-color-divider)',
                  position: 'relative',
                }}>
                  <div style={{
                    fontFamily: 'var(--v3-font-mono)',
                    fontSize: 'var(--v3-text-label)',
                    lineHeight: 'var(--v3-leading-label)',
                    letterSpacing: 'var(--v3-tracking-label)',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: i === 1 ? 'var(--v3-color-teal)' : 'var(--v3-color-ink)',
                    marginBottom: '16px',
                  }}>
                    {tier.name}
                    {tier.recommended && (
                      <div style={{
                        display: 'block',
                        color: 'var(--v3-color-teal)',
                        marginTop: '4px',
                      }}>
                        RECOMMENDED
                      </div>
                    )}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{
                      fontFamily: 'var(--v3-font-display)',
                      fontSize: '36px',
                      fontWeight: 300,
                      lineHeight: 1.1,
                      letterSpacing: 'var(--v3-tracking-tight)',
                      color: 'var(--v3-color-ink)',
                    }}>
                      {tier.price === 0 ? 'Complimentary' : `$${tier.price}`}
                    </span>
                    {tier.price !== 0 && (
                      <span style={{
                        fontFamily: 'var(--v3-font-mono)',
                        fontSize: 'var(--v3-text-body-sm)',
                        color: 'var(--v3-color-ink-muted)',
                        marginLeft: '4px',
                      }}>/mo</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Blurb row */}
              <div style={{
                padding: '24px',
                borderRight: '1px solid var(--v3-color-divider)',
                borderBottom: '1px solid var(--v3-color-divider)',
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 'var(--v3-text-label)',
                lineHeight: 'var(--v3-leading-label)',
                letterSpacing: 'var(--v3-tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--v3-color-ink-muted)',
                fontWeight: 500,
              }}>OVERVIEW</div>
              {TIERS.map((tier, i) => (
                <div key={'blurb-' + tier.name} style={{
                  padding: '24px',
                  borderRight: i < TIERS.length - 1 ? '1px solid var(--v3-color-divider)' : 'none',
                  borderBottom: '1px solid var(--v3-color-divider)',
                }}>
                  <p style={{
                    fontFamily: 'var(--v3-font-body)',
                    fontWeight: 400,
                    fontSize: 'var(--v3-text-body-sm)',
                    lineHeight: 'var(--v3-leading-body-sm)',
                    color: 'var(--v3-color-ink-secondary)',
                    margin: 0,
                  }}>
                    {tier.blurb}
                  </p>
                </div>
              ))}

              {/* Features rows via PricingTextTable pattern */}
              <div style={{ display: 'contents' }}>
                {PRICING_ROWS.map((row) => (
                  <React.Fragment key={row.label}>
                    <div style={{
                      padding: '24px',
                      borderRight: '1px solid var(--v3-color-divider)',
                      borderBottom: '1px solid var(--v3-color-divider)',
                      fontFamily: 'var(--v3-font-body)',
                      fontSize: 'var(--v3-text-body-sm)',
                      lineHeight: 'var(--v3-leading-body-sm)',
                      fontWeight: 400,
                      color: 'var(--v3-color-ink-secondary)',
                    }}>
                      {row.label}
                    </div>
                    {row.values.map((v, i) => (
                      <div key={i} style={{
                        padding: '24px',
                        borderRight: i < row.values.length - 1 ? '1px solid var(--v3-color-divider)' : 'none',
                        borderBottom: '1px solid var(--v3-color-divider)',
                        fontFamily: 'var(--v3-font-body)',
                        fontSize: 'var(--v3-text-body-sm)',
                        lineHeight: 1.5,
                        fontWeight: 400,
                        color: 'var(--v3-color-ink)',
                      }}>
                        {v === '—' || v === '✓' ? (
                          <span style={{
                            fontFamily: 'var(--v3-font-mono)',
                            color: v === '✓' ? 'var(--v3-color-teal)' : 'var(--v3-color-ink-muted)',
                          }}>{v}</span>
                        ) : v}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>

              {/* CTA row */}
              <div style={{
                padding: '24px',
                borderRight: '1px solid var(--v3-color-divider)',
              }}>
                <span style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 'var(--v3-text-label)',
                  lineHeight: 'var(--v3-leading-label)',
                  letterSpacing: 'var(--v3-tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--v3-color-ink-muted)',
                  fontWeight: 500,
                }}>ACTION</span>
              </div>
              {TIERS.map((tier, i) => (
                <div key={'cta-' + tier.name} style={{
                  padding: '24px',
                  borderRight: i < TIERS.length - 1 ? '1px solid var(--v3-color-divider)' : 'none',
                }}>
                  <Button
                    variant={tier.recommended ? 'primary' : 'secondary'}
                    accent="teal"
                    href="/nexus/chat"
                    inline
                  >
                    {tier.price === 0 ? 'Start complimentary' : `Choose ${tier.name}`}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <p style={{
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 'var(--v3-text-label)',
            lineHeight: 'var(--v3-leading-label)',
            letterSpacing: 'var(--v3-tracking-label)',
            color: 'var(--v3-color-ink-muted)',
            textAlign: 'center',
            margin: 0,
          }}>
            Human coaching · Bronze / Silver / Gold — added separately, never bundled
          </p>
        </div>
      </Section>

      {/* ════════════════ 7. FINAL CTA (dark, inverted) ════════════════ */}
      <Section bg="dark" paddingY="xl">
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          {/* Editorial ornament — CSS circle + cross (no icon library) */}
          <div aria-hidden="true" style={{
            width: '28px',
            height: '28px',
            margin: '0 auto 16px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid var(--v3-color-paper)',
              borderRadius: 0,
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: 'var(--v3-color-paper)',
            }} />
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'var(--v3-color-paper)',
            }} />
          </div>
          <Eyebrow accent="teal">Begin</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-lg)',
            lineHeight: 'var(--v3-leading-display-lg)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-paper)',
            margin: '16px 0 16px',
          }}>
            Open the thread. See where it leads.
          </h2>
          <p style={{
            fontFamily: 'var(--v3-font-body)',
            fontWeight: 400,
            fontSize: 'var(--v3-text-body-lg)',
            lineHeight: 'var(--v3-leading-body-lg)',
            color: 'var(--v3-color-paper-secondary)',
            margin: '0 0 32px',
          }}>
            Start wherever you want. No form to fill out first.
          </p>
          <Button variant="primary" accent="teal" href="/nexus/chat">Begin with your positioning</Button>
        </div>
      </Section>

      {/* ════════════════ 8. FOOTER (minimal) ════════════════ */}
      <Section
        bg="white"
        paddingY="md"
        style={{
          borderTop: '1px solid var(--v3-color-divider)',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <Link to="/" style={{
            textDecoration: 'none',
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 'var(--v3-text-label)',
            letterSpacing: 'var(--v3-tracking-label)',
            color: 'var(--v3-color-ink)',
            display: 'inline-block',
          }}>
            NEXUS.
          </Link>
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <Button variant="ghost" accent="teal" href="/nexus/chat">Chat</Button>
            <Button variant="ghost" accent="teal" href="#lenses">Lenses</Button>
            <Button variant="ghost" accent="teal" href="#membership">Membership</Button>
          </div>
          <span style={{
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 'var(--v3-text-label)',
            lineHeight: 'var(--v3-leading-label)',
            letterSpacing: 'var(--v3-tracking-label)',
            color: 'var(--v3-color-ink-muted)',
          }}>
            Your context stays yours.
          </span>
        </div>
      </Section>

      <style>{`
        @media (max-width: 900px) {
          .b2c-nav-links {
            order: 3;
            width: 100%;
            justify-content: flex-start;
            gap: 16px;
          }
          .b2c-trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .b2c-trust-grid > div:nth-child(-n+2) {
            border-bottom: 1px solid var(--v3-color-divider-dark);
          }
          .b2c-trust-grid > div:nth-child(2n) {
            border-right: none !important;
          }
          .b2c-lenses-grid {
            grid-template-columns: 1fr !important;
            border-left: none !important;
          }
          .b2c-lenses-grid > a {
            border-left: 1px solid var(--v3-color-divider);
          }
        }
      `}</style>
    </>
  );
}

export default B2CLanding;
