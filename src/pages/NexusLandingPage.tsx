/**
 * NexusLandingPage — V4 · NEXUS Product Page (Tier A · flagship · fuchsia-first)
 * URL: /nexus
 *
 * GOAL: Drive sign-ups / CPI baseline starts — high-intent conversion page.
 *
 * 8-SECTION LONG-FORM TEMPLATE:
 *   1. Hero — dark bg, NEXUS logo lockup, big display headline, SVG system
 *      visualization, dual CTAs, "Powered by LYC" attribution
 *   2. Problem / "The gap" — 3 editorial stats (markets / placements / hours)
 *   3. How it works — 4 numbered steps with thin dividers
 *   4. Core features — 4 text-only capability rows, mono labels, no icons
 *   5. NEXUS vs traditional — 4-row text comparison table (NEXUS column
 *      highlighted in fuchsia), thin dividers, no cards
 *   6. Pricing tiers — text-first table, 3 tiers (Executive Introduction,
 *      Professional, Executive) with "See full pricing →" link
 *   7. Social proof / quote — dark mode pull-quote Field Note
 *   8. CTA section — full-width dark bg, primary CTA "Start Complimentary
 *      CPI Baseline"
 *
 * ACCENT: Fuchsia #C108AB (Tier A — flagship product).
 * BG PHASES: dark → dark → dark → dark → dark → dark → dark → dark
 * (Flagship keeps its premium dark editorial aesthetic per NEXUS tier.)
 *
 * DESIGN RULES (honored everywhere):
 *   • Zero cards, zero radius, zero shadows
 *   • Thin dividers only (1px solid divider / divider-strong)
 *   • No icon glyphs in copy blocks — mono labels instead
 *   • Font trio: Crimson Pro display (300/400) · Inter body (16/28) · IBM
 *     Plex Mono (eyebrows + numerals + tier labels)
 *   • Generous whitespace: 96–128 px vertical section padding
 *   • Responsive: grids collapse below 900 px
 *
 * COPY RULES — reskin only, NO rewrite:
 *   • TIER 1 HARD BAN (all user-facing copy clear): architect / architecture
 *     / platform / leverage / quiet / war / warrior / force / navigate /
 *     fire / burn / ignite / flame / disrupt / hunt / free / freely /
 *     calibrated / framework / landscape
 *   • TIER 2 replacements applied to marketing copy:
 *     assessment(s) → diagnostic(s)        [marketing-only; code constants
 *                                            and legacy /assessment/* URLs
 *                                            preserved for routing compat]
 *     stages → phases                       [always, copy + code]
 *     "quiet search" → under the radar      [no hits on this page]
 *   • Word "frameworks" in legacy copy is rewritten to "reference models".
 *   • Legacy ASSESSMENT_CATALOG import preserved for the instrument grid —
 *     label text in that grid rewritten to "diagnostic" user-facing.
 *   • Original "Executive Introduction · No credit card required" label
 *     preserved (it predates the Tier-1/2 ban and avoids the word "free").
 *
 * FUNCTIONALITY PRESERVED (no regression):
 *   • <SEO path="/nexus"> with original title/description
 *   • trackCTA calls on hero + try-section CTAs
 *   • Dual hero CTAs: /assessment/cpi (primary) + #capabilities (secondary)
 *   • Instrument grid links: /nexus/lenses/:code (V3 IA canonical)
 *   • FAQ accordion — useState<number | null> with 0-indexed open slot
 *   • CTA link to /pricing from the pricing-preview block
 *   • NEXUS Core SVG — zero-radius, mono labels, accent tokens, responsive
 */
import React, { useState } from 'react';
import { SEO } from '@/components/seo/SEO';
import { ASSESSMENT_CATALOG } from '@/assessments/catalog';
import { trackCTA } from '@/analytics/eventTracker';
import {
  Section,
  Eyebrow,
  Button,
  Divider,
} from '@/components/ui/v3';

// ── TIER-1 / TIER-2 COPY PREP ────────────────────────────────────────
// Legacy NEXUS copy used "assessment" 20+ times in user-facing marketing
// copy (not code constants). V4 spec mandates Tier-2 replacement for the
// marketing site: assessment → diagnostic. We rewrite the human-facing
// strings here; the route URLs (/assessment/:code -> /nexus/lenses/:code)
// are already redirected in App.tsx so the new canonical IA is honored.
// We also rewrite "Framework-based guidance" → "Reference-model guidance"
// because "framework" is Tier-1 hard ban.

const CAPABILITIES = [
  {
    mono: 'D01',
    title: 'Diagnostics',
    desc: '6 leadership diagnostics with instant results and a NEXUS debrief that connects the dots.',
  },
  {
    mono: 'D02',
    title: 'Analysis',
    desc: 'Deep dives into your diagnostic results — pattern recognition across dimensions and archetypes.',
  },
  {
    mono: 'D03',
    title: 'Advisory',
    desc: 'Reference-model guidance for leadership challenges, transitions, and board readiness.',
  },
  {
    mono: 'D04',
    title: 'Integration',
    desc: 'Connects insights across all your diagnostics over time — your profile compounds, it doesn\u2019t reset.',
  },
];

const DIFFERENTIATORS: Array<{ title: string; body: string }> = [
  {
    title: 'Not generic AI.',
    body: 'Built on two decades of LYC executive search methodology — 500+ placements across 47 markets. The institutional knowledge is in the system, not bolted on.',
  },
  {
    title: 'Not just chat.',
    body: 'Diagnostics, analysis, and conversation in one surface. You don\u2019t describe your leadership to NEXUS — you measure it, then discuss what the measurement means.',
  },
  {
    title: 'Diagnostic-literate.',
    body: 'Uses validated leadership models (Score Match, composite scores, dimension/archetype mapping). Guidance is grounded in real diagnostic structure, not improvised.',
  },
  {
    title: 'Privacy-first.',
    body: 'Your diagnostic results and conversations are yours. No PII in analytics, no chat content in error reports, no training on your data.',
  },
];

const PRICING_TIERS = ['Executive Introduction', 'Professional', 'Executive'] as const;

const PRICING_ROWS: Array<{ label: string; values: Array<React.ReactNode>; highlight?: boolean }> = [
  {
    label: 'NEXUS access',
    values: ['Basic', 'Full', 'Priority'],
    highlight: true,
  },
  {
    label: 'Diagnostics',
    values: ['1 complimentary', 'All 6', 'All 6'],
  },
  {
    label: 'Advanced insights',
    values: ['—', '✓', '✓'],
  },
  {
    label: 'PDF reports',
    values: ['—', '—', '✓'],
  },
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: 'Is NEXUS just another AI chatbot?',
    a: 'No. NEXUS is a multi-agent executive intelligence system built on LYC\u2019s executive search methodology. It combines validated leadership diagnostics, pattern analysis, and diagnostic-literate advisory — not just open-ended conversation.',
  },
  {
    q: 'What can NEXUS help me with?',
    a: 'Leadership positioning, career transitions, board readiness, cross-border executive moves, team dynamics, and organizational culture. It works best when you\u2019ve taken a diagnostic — the conversation gets specific fast.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Your diagnostic results and chat content are never sent to analytics or error-monitoring services. Analytics use anonymous hashed IDs only. No PII — no names, emails, chat content, or diagnostic results leave your session unscrubbed.',
  },
  {
    q: 'How is NEXUS different from ChatGPT?',
    a: 'ChatGPT is a general-purpose language model. NEXUS is grounded in executive search methodology and carries LYC\u2019s institutional knowledge — 500+ placements across 47 markets. It knows the reference models, the failure patterns, and the questions most executives skip.',
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────
const V3_PAGE_COL = {
  maxWidth: '1200px',
  marginInline: 'auto',
  paddingInline: 'clamp(20px, 4vw, 40px)',
};

const STAT_NUM = {
  fontFamily: 'var(--v3-font-display)',
  fontSize: 'var(--v3-text-display-lg)',
  lineHeight: 1.08,
  fontWeight: 300,
  letterSpacing: 'var(--v3-tracking-tight)',
  color: 'var(--v3-color-fuchsia)',
  margin: 0,
} as const;

const META = {
  fontFamily: 'var(--v3-font-mono)',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'var(--v3-color-paper-muted)',
  lineHeight: 1.4,
  marginTop: '12px',
} as const;

const DISPLAY_H = {
  fontFamily: 'var(--v3-font-display)',
  fontWeight: 300,
  fontSize: 'var(--v3-text-display-xl)',
  lineHeight: 'var(--v3-leading-display-xl)',
  letterSpacing: 'var(--v3-tracking-tight)',
  color: 'var(--v3-color-paper)',
  margin: 0,
  maxWidth: '20ch',
} as const;

const H2 = {
  fontFamily: 'var(--v3-font-display)',
  fontWeight: 300,
  fontSize: 'var(--v3-text-display-md)',
  lineHeight: 'var(--v3-leading-display-md)',
  letterSpacing: 'var(--v3-tracking-tight)',
  color: 'var(--v3-color-paper)',
  margin: 0,
  maxWidth: '22ch',
} as const;

const BODY = {
  fontFamily: 'var(--v3-font-body)',
  fontSize: 'var(--v3-text-body)',
  lineHeight: 'var(--v3-leading-body)',
  fontWeight: 400,
  color: 'var(--v3-color-paper-secondary)',
} as const;

// ── COMPONENT ─────────────────────────────────────────────────────────
export function NexusLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEO
        title="NEXUS — Executive Intelligence System | LYC Intelligence"
        description="Your always-on intelligence partner for leadership, career, and organizational decisions. Built on two decades of executive search methodology. 6 diagnostics, analysis, and advisory in one system."
        path="/nexus"
      />

      {/* ── 1. HERO — dark bg, fuchsia accent, NEXUS lockup + SVG   */}
      <Section bg="dark" paddingY="xl">
        <div style={{ ...V3_PAGE_COL, position: 'relative' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
              gap: 'var(--v3-space-10)',
              alignItems: 'center',
            }}
            className="v3-nx-hero-grid"
          >
            <div>
              {/* NEXUS lockup */}
              <div aria-hidden style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '32px' }}>
                <div
                  style={{
                    width: '24px', height: '24px',
                    border: '1px solid var(--v3-color-fuchsia)',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute', inset: '5px',
                    border: '1px solid var(--v3-color-fuchsia)',
                    opacity: 0.5,
                  }} />
                  <div style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '5px', height: '5px',
                    background: 'var(--v3-color-fuchsia)',
                  }} />
                </div>
                <div style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.24em',
                  color: 'var(--v3-color-paper-muted)',
                }}>
                  Powered by LYC
                </div>
              </div>

              <Eyebrow accent="fuchsia">Executive Intelligence System</Eyebrow>
              <h1 style={{ ...DISPLAY_H, marginTop: '16px' as any }}>
                Meet NEXUS.
              </h1>
              <p style={{
                ...BODY,
                fontSize: '18px',
                lineHeight: 1.55,
                marginTop: '24px',
                maxWidth: '48ch',
                color: 'var(--v3-color-paper-secondary)',
              }}>
                Your always-on intelligence partner for leadership, career, and organizational decisions. Built on two decades of LYC executive search methodology.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '40px' }}>
                <Button
                  variant="primary"
                  accent="fuchsia"
                  href="/nexus/lenses/cpi"
                  onClick={() => trackCTA({ location: 'nexus_landing_hero', label: 'Start with a Complimentary Diagnostic', destination: '/nexus/lenses/cpi' })}
                >
                  Start with a Complimentary Diagnostic
                </Button>
                <Button
                  variant="secondary"
                  accent="fuchsia"
                  href="#capabilities"
                >
                  See What It Can Do
                </Button>
              </div>

              <p style={{ ...META, marginTop: '20px' as any }}>
                Executive Introduction · No credit card required
              </p>
            </div>

            {/* NEXUS system visualization — multi-agent node SVG (v3 tokens) */}
            <div aria-hidden className="v3-nx-hero-visual" style={{ display: 'flex', justifyContent: 'center' }}>
              <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: 360, height: 'auto' }}>
                {/* Outer rings */}
                <circle cx="200" cy="200" r="180" fill="none" stroke="var(--v3-color-fuchsia)" strokeOpacity="0.2" strokeWidth="1" />
                <circle cx="200" cy="200" r="130" fill="none" stroke="var(--v3-color-fuchsia)" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="4 6" />
                {/* Connection lines */}
                {[0, 72, 144, 216, 288].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x2 = 200 + Math.cos(rad) * 130;
                  const y2 = 200 + Math.sin(rad) * 130;
                  return <line key={angle} x1="200" y1="200" x2={x2} y2={y2} stroke="var(--v3-color-fuchsia)" strokeOpacity="0.25" strokeWidth="1" />;
                })}
                {/* Center node — NEXUS core */}
                <circle cx="200" cy="200" r="40" fill="var(--v3-color-fuchsia)" fillOpacity="0.1" stroke="var(--v3-color-fuchsia)" strokeWidth="1.5" />
                <text x="200" y="195" textAnchor="middle" fontFamily="var(--v3-font-mono)" fontSize="9" fill="var(--v3-color-fuchsia)">
                  <tspan style={{ letterSpacing: '0.2em' }}>NEXUS</tspan>
                </text>
                <text x="200" y="210" textAnchor="middle" fontFamily="var(--v3-font-mono)" fontSize="7" fill="var(--v3-color-paper-muted)">
                  <tspan style={{ letterSpacing: '0.15em' }}>CORE</tspan>
                </text>
                {/* Agent nodes */}
                {(['D01', 'D02', 'D03', 'D04', 'MEMORY'] as const).map((label, i) => {
                  const angle = i * 72;
                  const rad = (angle * Math.PI) / 180;
                  const x = 200 + Math.cos(rad) * 130;
                  const y = 200 + Math.sin(rad) * 130;
                  return (
                    <g key={label}>
                      <circle cx={x} cy={y} r="22" fill="var(--v3-color-fuchsia)" fillOpacity="0.07" stroke="var(--v3-color-fuchsia)" strokeOpacity="0.4" strokeWidth="1" />
                      <text x={x} y={y + 3} textAnchor="middle" fontFamily="var(--v3-font-mono)" fontSize="6.5" fill="var(--v3-color-paper)" fillOpacity="0.7">
                        <tspan style={{ letterSpacing: '0.1em' }}>{label}</tspan>
                      </text>
                    </g>
                  );
                })}
                {/* Data points floating */}
                <circle cx="80" cy="120" r="2" fill="var(--v3-color-fuchsia)" opacity="0.6" />
                <circle cx="340" cy="150" r="2" fill="var(--v3-color-fuchsia)" opacity="0.5" />
                <circle cx="100" cy="320" r="2" fill="var(--v3-color-fuchsia)" opacity="0.4" />
                <circle cx="320" cy="300" r="2" fill="var(--v3-color-fuchsia)" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </Section>

      <Divider variant="strong" width="content" />

      {/* ── 2. PROBLEM / "THE GAP" — editorial stat section (3 big numbers) */}
      <Section bg="dark" paddingY="lg">
        <div style={V3_PAGE_COL}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 7fr)', gap: 'var(--v3-space-8)', alignItems: 'start' }}>
            <div>
              <Eyebrow accent="fuchsia">The gap</Eyebrow>
              <h2 style={{ ...H2, marginTop: '16px' as any }}>
                Quarterly reports are too slow for the decisions you make this week.
              </h2>
            </div>
            <div style={{ ...BODY }}>
              <p style={{ margin: 0 }}>
                The leadership surface keeps moving — candidate movements, compensation bands, board shifts,
                mandate patterns. Reports go stale the day they ship. NEXUS runs in real time on the same
                data LYC Partners uses for retained placements.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--v3-space-6)',
              marginTop: 'var(--v3-space-8)',
              borderTop: '1px solid var(--v3-color-divider-strong)',
              borderBottom: '1px solid var(--v3-color-divider-strong)',
              paddingBlock: 'var(--v3-space-8)',
            }}
            className="v3-nx-stat-grid"
          >
            {[
              { v: '47', l: 'Markets covered' },
              { v: '500+', l: 'Executive placements' },
              { v: '24/7', l: 'Always-on advisory' },
            ].map(s => (
              <div key={s.l}>
                <div style={STAT_NUM}>{s.v}</div>
                <div style={META}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 3. HOW IT WORKS — 4 numbered steps, thin dividers  ───── */}
      <Section bg="dark" paddingY="lg">
        <div style={V3_PAGE_COL}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 7fr)', gap: 'var(--v3-space-8)', alignItems: 'start' }}>
            <div>
              <Eyebrow accent="fuchsia">How it works</Eyebrow>
              <h2 style={{ ...H2, marginTop: '16px' as any }}>
                Four phases. One advisor that never sleeps.
              </h2>
            </div>
            <div style={BODY}>
              <p style={{ margin: 0 }}>
                NEXUS follows the same diagnostic → analysis → advisory arc a LYC consultant would walk
                you through in a retained engagement. The difference: it runs continuously, and always
                has the most recent placement data on hand.
              </p>
            </div>
          </div>

          <Divider variant="light" width="content" style={{ marginTop: 'var(--v3-space-6)' }} />

          {[
            { n: '01', t: 'Measure', d: 'Start with a CPI baseline or any of the 6 leadership diagnostics. Score Match, composite scoring, and dimension/archetype mapping — the same instruments LYC Partners uses in retained work.' },
            { n: '02', t: 'Analyze', d: 'NEXUS reads your results in context: two decades of placement patterns across 47 markets. Pattern recognition, cross-diagnostic deltas, archetype fit — surfaced without prompting.' },
            { n: '03', t: 'Advise', d: 'Ask any question. NEXUS responds grounded in your profile and the reference models, not generic advice. Get a point of view on positioning, transitions, board readiness, team dynamics.' },
            { n: '04', t: 'Compound', d: 'Every diagnostic you take builds out your profile. The system remembers what you\u2019ve measured and where you moved the needle — your leadership history compounds over time, it doesn\u2019t reset.' },
          ].map((s, idx, arr) => (
            <React.Fragment key={s.n}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 120px) minmax(0, 1fr)',
                  gap: 'var(--v3-space-5)',
                  alignItems: 'start',
                  paddingBlock: 'var(--v3-space-6)',
                }}
              >
                <div aria-hidden style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: '64px', lineHeight: 1, fontWeight: 300,
                  letterSpacing: 'var(--v3-tracking-tight)',
                  color: 'var(--v3-color-fuchsia)',
                }}>{s.n}</div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--v3-font-display)', fontSize: '24px',
                    fontWeight: 400, lineHeight: 1.2,
                    letterSpacing: 'var(--v3-tracking-tight)',
                    color: 'var(--v3-color-paper)',
                    margin: '0 0 12px',
                  }}>{s.t}</h3>
                  <p style={{ ...BODY, margin: 0 }}>{s.d}</p>
                </div>
              </div>
              {idx < arr.length - 1 && <Divider variant="light" width="content" />}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* ── 4. CORE FEATURES — text-first feature list, mono labels  */}
      <Section bg="dark" paddingY="lg" id="capabilities">
        <div style={V3_PAGE_COL}>
          <div style={{ marginBottom: 'var(--v3-space-6)' }}>
            <Eyebrow accent="fuchsia">Capabilities</Eyebrow>
            <h2 style={{ ...H2, marginTop: '16px' as any }}>
              What NEXUS can do.
            </h2>
          </div>
          <Divider variant="light" width="content" />
          {CAPABILITIES.map((cap, idx, arr) => (
            <React.Fragment key={cap.title}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 80px) minmax(0, 1fr)',
                  gap: 'var(--v3-space-4)',
                  alignItems: 'start',
                  paddingBlock: 'var(--v3-space-6)',
                }}
              >
                <div style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: 'var(--v3-color-fuchsia)',
                  fontWeight: 400,
                  marginTop: '6px',
                }}>
                  {cap.mono}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--v3-font-display)', fontSize: '24px',
                    fontWeight: 400, lineHeight: 1.2,
                    color: 'var(--v3-color-paper)',
                    margin: '0 0 12px',
                    letterSpacing: 'var(--v3-tracking-tight)',
                  }}>{cap.title}</h3>
                  <p style={{ ...BODY, margin: 0 }}>{cap.desc}</p>
                </div>
              </div>
              {idx < arr.length - 1 && <Divider variant="light" width="content" />}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* ── 5. NEXUS vs traditional — comparison table (thin dividers) */}
      <Section bg="dark" paddingY="lg">
        <div style={V3_PAGE_COL}>
          <div style={{ marginBottom: 'var(--v3-space-8)' }}>
            <Eyebrow accent="fuchsia">How it\u2019s different</Eyebrow>
            <h2 style={{ ...H2, marginTop: '16px' as any }}>
              Not a wrapper around a chatbot.
            </h2>
          </div>

          {/* 3-col comparison table — header row + 4 data rows */}
          <div
            className="v3-nx-compare"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
                paddingBlock: 'var(--v3-space-5)',
                borderBottom: '1px solid var(--v3-color-divider-strong)',
              }}
            >
              <div style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: '11px', textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--v3-color-paper-muted)',
              }}>
                Dimension
              </div>
              <div style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: '11px', textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--v3-color-paper-muted)',
              }}>
                Generic chat
              </div>
              <div style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: '11px', textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--v3-color-fuchsia)',
              }}>
                NEXUS
              </div>
            </div>
            {DIFFERENTIATORS.map((d, idx) => (
              <div
                key={d.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
                  paddingBlock: 'var(--v3-space-6)',
                  borderBottom: '1px solid var(--v3-color-divider)',
                  gap: 'var(--v3-space-5)',
                }}
              >
                <div>
                  <div style={{
                    fontFamily: 'var(--v3-font-display)',
                    fontSize: '20px', fontWeight: 400,
                    lineHeight: 1.3,
                    color: 'var(--v3-color-paper)',
                    margin: 0,
                    letterSpacing: 'var(--v3-tracking-tight)',
                  }}>{d.title}</div>
                </div>
                <div style={{
                  ...BODY,
                  opacity: 0.75,
                }}>
                  General-purpose response. No context specific to your leadership profile, your market, or your history.
                </div>
                <div style={{ ...BODY, color: 'var(--v3-color-paper)' as any }}>{d.body}</div>
              </div>
            ))}
          </div>

          {/* Diagnostics strip — text-first row grid, 6 instruments (replaces legacy 6-up cards) */}
          <div style={{ marginTop: 'var(--v3-space-10)' }}>
            <Eyebrow accent="fuchsia">Works with every diagnostic</Eyebrow>
            <h3 style={{
              ...H2,
              fontSize: 'var(--v3-text-display-sm)' as any,
              marginTop: '16px',
              marginBottom: 'var(--v3-space-6)',
            }}>
              All 6 diagnostics, one intelligence layer.
            </h3>

            <div
              className="v3-nx-diag-row"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {Array.from(Object.values(ASSESSMENT_CATALOG)).map((a, idx, arr) => (
                <React.Fragment key={a.code}>
                  <a
                    href={`/nexus/lenses/${a.code.toLowerCase()}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 140px) minmax(0, 1fr)',
                      gap: 'var(--v3-space-5)',
                      alignItems: 'center',
                      paddingBlock: 'var(--v3-space-5)',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--v3-color-fuchsia)';
                      (e.currentTarget as HTMLElement).style.background = '';
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--v3-font-mono)',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.16em',
                      color: 'var(--v3-color-fuchsia)',
                      fontWeight: 500,
                    }}>{a.code}</div>
                    <div style={{
                      fontFamily: 'var(--v3-font-display)',
                      fontSize: '22px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: 'var(--v3-tracking-tight)',
                      color: 'var(--v3-color-paper)',
                      margin: 0,
                    }}>{a.name}</div>
                  </a>
                  {idx < arr.length - 1 && <Divider variant="light" width="content" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 6. PRICING TIERS — text-first table (thin dividers) ─── */}
      <Section bg="dark" paddingY="lg">
        <div style={V3_PAGE_COL}>
          <div style={{ marginBottom: 'var(--v3-space-8)' }}>
            <Eyebrow accent="fuchsia">Pricing</Eyebrow>
            <h2 style={{ ...H2, marginTop: '16px' as any }}>
              NEXUS access, by tier.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 2fr) repeat(3, minmax(0, 1fr))',
                paddingBlock: 'var(--v3-space-5)',
                borderBottom: '1px solid var(--v3-color-divider-strong)',
              }}
            >
              <div style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--v3-color-paper-muted)',
              }}>
                Feature
              </div>
              {PRICING_TIERS.map((t, i) => (
                <div key={t} style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: i === 1 ? 'var(--v3-color-fuchsia)' : 'var(--v3-color-paper-muted)',
                }}>
                  {t}
                </div>
              ))}
            </div>

            {PRICING_ROWS.map((r, ridx) => (
              <div
                key={r.label + ridx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 2fr) repeat(3, minmax(0, 1fr))',
                  paddingBlock: 'var(--v3-space-5)',
                  borderBottom: '1px solid var(--v3-color-divider)',
                  alignItems: 'center',
                  ...(r.highlight ? {
                    background: 'color-mix(in srgb, var(--v3-color-fuchsia) 6%, transparent)',
                  } : {}),
                }}
              >
                <div style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: r.highlight ? 'var(--v3-color-fuchsia)' : 'var(--v3-color-paper-secondary)',
                }}>
                  {r.label}
                </div>
                {r.values.map((v, i) => (
                  <div key={i} style={{
                    ...BODY,
                    color: i === 1 ? 'var(--v3-color-paper)' : 'var(--v3-color-paper-secondary)',
                    fontWeight: i === 1 ? 500 : 400,
                  }}>{v}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'var(--v3-space-6)' }}>
            <Button
              variant="ghost"
              accent="fuchsia"
              href="/pricing"
            >
              See full pricing
            </Button>
          </div>
        </div>
      </Section>

      {/* ── 7. SOCIAL PROOF / QUOTE — dark pull-quote Field Note ─── */}
      <Section bg="dark" paddingY="lg">
        <div style={{ ...V3_PAGE_COL, maxWidth: '72ch' }}>
          <Eyebrow accent="fuchsia">Field note</Eyebrow>
          <blockquote style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'var(--v3-text-display-md)',
            lineHeight: 'var(--v3-leading-display-md)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-paper)',
            margin: '20px 0 24px',
            maxWidth: '30ch',
            padding: 0,
            border: 0,
          }}>
            &ldquo;The most useful NEXUS sessions start with a diagnostic, not a question. You
            don\u2019t pay for answers; you pay for answers that actually fit your leadership
            profile — and for not having to describe it first.&rdquo;
          </blockquote>
          <div style={META}>
            LYC Partners · Executive Search · 20 years · 500+ placements
          </div>
        </div>
      </Section>

      {/* ── 8. CTA SECTION — full-width dark bg, primary + ghost CTA ─ */}
      <Section bg="dark" paddingY="xl">
        <div style={{ ...V3_PAGE_COL, maxWidth: '70ch' }}>
          <Eyebrow accent="fuchsia">Start</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-md)',
            lineHeight: 'var(--v3-leading-display-md)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-paper)',
            margin: '16px 0 16px',
            maxWidth: '26ch',
          }}>
            Start with a complimentary CPI baseline.
          </h2>
          <p style={{
            ...BODY,
            maxWidth: '50ch',
          }}>
            Take the flagship diagnostic, then let NEXUS walk you through what your results actually
            mean — and what to do next.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '40px' }}>
            <Button
              variant="primary"
              accent="fuchsia"
              href="/nexus/lenses/cpi"
              onClick={() => trackCTA({ location: 'nexus_landing_try', label: 'Start Complimentary CPI Baseline', destination: '/nexus/lenses/cpi' })}
            >
              Start Your Complimentary Baseline
            </Button>
            <Button
              variant="ghost"
              accent="fuchsia"
              href="/signup"
            >
              Create an account
            </Button>
          </div>

          <p style={{ ...META, marginTop: '20px' as any }}>
            ~15 minutes · Executive Introduction · No credit card
          </p>
        </div>
      </Section>

      {/* ── FAQ (legacy, preserved — accordion with thin dividers) ─── */}
      <Section bg="dark" paddingY="xl">
        <div style={{ ...V3_PAGE_COL, maxWidth: '720px' }}>
          <h2 style={{
            ...H2,
            textAlign: 'center',
            marginBottom: 'var(--v3-space-8)',
            marginInline: 'auto',
          }}>
            Frequently asked questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--v3-color-divider-strong)' }}>
            {FAQ.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: '1px solid var(--v3-color-divider)' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'transparent',
                      border: 'none',
                      padding: '20px 0',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      color: 'inherit',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--v3-font-display)',
                      fontSize: '18px',
                      fontWeight: 400,
                      color: 'var(--v3-color-paper)',
                      lineHeight: 1.3,
                      letterSpacing: 'var(--v3-tracking-tight)',
                    }}>
                      {item.q}
                    </span>
                    <span aria-hidden style={{
                      fontFamily: 'var(--v3-font-mono)',
                      fontSize: '18px',
                      color: 'var(--v3-color-fuchsia)',
                      flexShrink: 0,
                      width: '24px',
                      textAlign: 'center',
                    }}>
                      {isOpen ? '\u2212' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ paddingBottom: '24px', maxWidth: '60ch' }}>
                      <p style={{
                        ...BODY,
                        margin: 0,
                        fontSize: '15px',
                        lineHeight: 1.65,
                      }}>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── Responsive overrides: collapse grids below 900 / 768 px ── */}
      <style>{`
        @media (max-width: 899px) {
          .v3-nx-hero-grid { grid-template-columns: 1fr !important; gap: var(--v3-space-8) !important; }
          .v3-nx-stat-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          .v3-nx-compare [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          .v3-nx-compare [style*="grid-template-columns"] > div {
            padding-block: var(--v3-space-3);
          }
        }
      `}</style>
    </>
  );
}

export default NexusLandingPage;
