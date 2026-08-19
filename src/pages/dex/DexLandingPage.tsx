/**
 * DexLandingPage — V4 · DEX AI Product Page (Tier B · research tool · teal-first)
 * URL: /dex
 *
 * GOAL: Drive discovery and link into the diagnostic flow (/dex/assess,
 * /dex/chat, /dex/credits, /dex/book). High-intent marketing page for
 * China-APAC executives.
 *
 * 7-SECTION LONG-FORM TEMPLATE (per V4 brief for research products):
 *   1. Hero — cream bg, teal accent, DEX AI visual mark lockup, big
 *      display headline, lead paragraph, dual CTAs. Thin teal divider.
 *   2. What is DEX AI — SplitSection 2-col: label + title (left) / body
 *      copy (right). 7,400+ executive mandates reference number preserved.
 *   3. How it works — numbered methodology steps (01..04), large serif
 *      numerals, thin dividers.
 *   4. Capabilities — 4-row CapabilityRow feature list with thin
 *      dividers, mono teal labels, no icons.
 *   5. Use cases — 2-3 column UseCaseColumns with thin vertical
 *      dividers: Career Strategy, Comp Benchmarking, Cross-Border.
 *   6. Pricing preview — text-first table: Executive Introduction /
 *      Miles Pack / Monthly Pro (3 tiers, miles system preserved).
 *      Thin dividers only, no cards.
 *   7. CTA — "Try the diagnostic" primary + "Book a Coaching Session"
 *      secondary. Full-width cream-or-dark editorial banner.
 *
 * ACCENT: Teal #00897B (Tier B — research product, matches DEX tier).
 * BG PHASES: cream → cream → cream → cream → cream → cream → dark CTA.
 *
 * DESIGN RULES:
 *   • Zero cards, zero radius, zero shadows everywhere
 *   • Thin dividers only (1px solid divider / divider-strong)
 *   • No icon glyphs in user copy — mono labels / DEX mark SVG only
 *   • Font trio: Crimson Pro display 300 · Inter 16/28 body · IBM Plex Mono
 *   • Section padding: 96–160 px (md / lg / xl via Section primitive)
 *   • Responsive: 2/3-col grids collapse below 900 px; use cases stack
 *     below 768 px with dividers rotated horizontal.
 *
 * COPY RULES (reskin only, NO rewrite; banned-word fixes only):
 *   • TIER 1 HARD BAN CLEAR in user-facing copy.
 *   • TIER 2: "Take the Assessment" → "Take the diagnostic" (marketing).
 *     Tier-2 "stages" → "phases" (0 hits, not applicable).
 *     Tier-2 "quiet search" → under the radar (0 hits).
 *   • "Complimentary" preserved everywhere — it avoids the Tier-1 banned
 *     word "free" (brief explicit rule: use "complimentary" / "Executive
 *     Introduction").
 *   • Original value-prop, mandate count (7,400+), tier names, CTA copy,
 *     URL targets preserved in CTAs.
 *
 * FUNCTIONALITY PRESERVED (no regression):
 *   • Hero primary CTA: /dex/chat ("Executive Introduction").
 *   • Hero secondary CTA: /dex/assess — label updated to diagnostic.
 *   • Pricing CTAs: /dex/chat, /dex/credits — preserved.
 *   • Coaching CTA: /dex/book — preserved.
 */
import React from 'react';
import { SEO } from '@/components/seo/SEO';
import {
  Section,
  Eyebrow,
  Button,
  Divider,
  SplitSection,
  MethodologyStep,
  CapabilityRow,
  UseCaseColumns,
  PricingTextTable,
  type UseCase,
} from '@/components/ui/v3';

// ── COPY DATA — DEX AI (Tier B · teal) ───────────────────────────────
const HERO = {
  eyebrow: 'DEX AI · Executive Introduction',
  headline: 'AI-powered executive advisory for China-APAC leaders.',
  lead:
    'LYC Intelligence is your always-on advisor for career strategy, compensation benchmarking, and cross-border transitions — trained on LYC Partners\u2019 placement intelligence across 7,400+ executive mandates.',
  monoTag: 'Executive Introduction · 5 Complimentary Messages',
};

const WHAT = {
  label: 'What is DEX AI',
  title: 'Placement intelligence you can ask. Available the moment you need it.',
  body: [
    'DEX AI distils LYC Partners\u2019 institutional knowledge across 7,400+ executive mandates and four China-APAC decades into a private conversation surface. You ask in plain language, it answers grounded in real placement context — compensation bands, mobility patterns, board expectations, cross-border precedent.',
    'It is not a general assistant. It is a China-APAC executive intelligence surface, built by the team that runs retained C-suite mandates across Shanghai, Singapore, Hong Kong, and every market in between. Think of it as having a senior consultant on call — one that has already seen the exact move you are contemplating.',
  ],
};

const STEPS: Array<{ number: string; title: string; description: React.ReactNode }> = [
  {
    number: '01',
    title: 'Executive Introduction',
    description:
      'Start with 5 complimentary messages. No card required, no onboarding ramp — you are in the advisory conversation in under 60 seconds.',
  },
  {
    number: '02',
    title: 'Take a baseline diagnostic (optional)',
    description:
      'Add a diagnostic readout to ground the conversation in your profile: Score Match, archetype mapping, board readiness. DEX AI answers in context, not in the abstract.',
  },
  {
    number: '03',
    title: 'Ask anything career-sensitive',
    description:
      'Compensation bands by market, next-move sequencing, cross-border transition playbooks, board positioning — all private, non-judgemental, and written down.',
  },
  {
    number: '04',
    title: 'Scale when you need to',
    description:
      'Buy miles as you go or move to a monthly plan with priority responses and 1:1 coaching access. One mile per message, always transparent pricing.',
  },
];

const CAPABILITIES: Array<{ label: string; title: React.ReactNode; description: React.ReactNode; href: string; cta: string }> = [
  {
    label: 'D01',
    title: 'Career Strategy',
    description:
      'Map your next move against LYC Partners placement data — trajectory sequencing, market fit, size-of-move precedent across 7,400+ mandates.',
    href: '/dex/chat',
    cta: 'Ask about your next move',
  },
  {
    label: 'D02',
    title: 'Compensation Benchmarking',
    description:
      'Know your market worth across China and APAC roles. Base · bonus · equity split by seniority band, market, and function — grounded in real placement data.',
    href: '/dex/chat',
    cta: 'Check your market band',
  },
  {
    label: 'D03',
    title: 'Cross-Border Transitions',
    description:
      'Manage moves between Shanghai, Singapore, and Hong Kong — visa structures, relocation precedent, sponsorship patterns, board reporting styles.',
    href: '/dex/chat',
    cta: 'Plan a cross-border move',
  },
  {
    label: 'D04',
    title: 'Confidential Advisory',
    description:
      'Private, non-judgemental guidance from a trusted partner. No PII in analytics, no chat content retained longer than your session settings allow.',
    href: '/dex/chat',
    cta: 'Start a private chat',
  },
];

const USE_CASES: readonly UseCase[] = [
  {
    label: 'Use case 01',
    title: 'A G400 executive evaluating a move to Singapore.',
    description:
      'Comp band, visa/sponsorship patterns, board expectations for expat CEO roles in the SG-listed market, sequencing the move with the current employer.',
  },
  {
    label: 'Use case 02',
    title: 'A Shanghai-based CFO approaching a Chair approach.',
    description:
      'Compensation structure for a first-time Chair in the domestic A-share market, board-readiness diagnostics to run before committing, transition playbook.',
  },
  {
    label: 'Use case 03',
    title: 'A cross-border founder/CEO weighing exit options.',
    description:
      'Private-equity backed CEO → next role sequencing, market precedent for founder transitions, compensation and incentive comparison across PE-backed structures.',
  },
];

const PRICING_TIERS: ReadonlyArray<{ label: string; accent: 'teal' | 'ink' | 'fuchsia' }> = [
  { label: 'Executive Introduction', accent: 'teal' },
  { label: 'Miles Pack', accent: 'ink' },
  { label: 'Monthly Pro', accent: 'ink' },
];

type PricingRowType = { label: string; values: readonly string[]; highlight?: boolean };
const PRICING_ROWS: readonly PricingRowType[] = [
  { label: 'Entry', values: ['Complimentary', 'Pay as you go', 'Subscription'], highlight: true },
  { label: 'Messages', values: ['5 to experience DEX AI', '1 mile per message — buy what you need', '100 mi/month + priority responses'] },
  { label: 'Coaching access', values: ['—', 'Bookable per session', 'Included'] },
  { label: 'Priority responses', values: ['—', '—', '✓'] },
];

// ── HELPERS ───────────────────────────────────────────────────────────
const COL = {
  maxWidth: '1200px',
  marginInline: 'auto',
  paddingInline: 'clamp(20px, 4vw, 40px)',
};

const H2 = {
  fontFamily: 'var(--v3-font-display)',
  fontWeight: 300,
  fontSize: 'var(--v3-text-display-md)',
  lineHeight: 'var(--v3-leading-display-md)',
  letterSpacing: 'var(--v3-tracking-tight)',
  color: 'var(--v3-color-ink)',
  margin: 0,
  maxWidth: '22ch',
} as const;

const META = {
  fontFamily: 'var(--v3-font-mono)',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'var(--v3-color-ink-muted)',
  lineHeight: 1.4,
  marginTop: '12px',
} as const;

// ── COMPONENT ─────────────────────────────────────────────────────────
export function DexLandingPage() {
  return (
    <>
      <SEO
        title="DEX AI — Executive Advisory for China-APAC | LYC Intelligence"
        description="AI-powered executive advisory for China-APAC leaders. Career strategy, compensation benchmarking, cross-border transitions — trained on 7,400+ LYC Partners placement mandates."
        path="/dex"
      />

      {/* ── 1. HERO — cream bg, teal accent, DEX AI visual mark ──── */}
      <Section bg="cream" paddingY="xl">
        <div style={{ ...COL, position: 'relative' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
              gap: 'var(--v3-space-10)',
              alignItems: 'center',
            }}
            className="v3-dex-hero-grid"
          >
            <div>
              {/* DEX AI visual mark lockup */}
              <div aria-hidden style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden style={{ flexShrink: 0 }}>
                  {/* DEX mark: nested diamonds — teal-first */}
                  <g transform="translate(20 20) rotate(45)">
                    <rect x="-14" y="-14" width="28" height="28" fill="none" stroke="var(--v3-color-teal)" strokeWidth="1" />
                    <rect x="-8" y="-8" width="16" height="16" fill="none" stroke="var(--v3-color-teal)" strokeWidth="1" opacity="0.6" />
                    <rect x="-3" y="-3" width="6" height="6" fill="var(--v3-color-teal)" opacity="0.85" />
                  </g>
                </svg>
                <div style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.24em',
                  color: 'var(--v3-color-ink-muted)',
                }}>
                  Powered by LYC · China-APAC
                </div>
              </div>

              <Eyebrow accent="teal">{HERO.eyebrow}</Eyebrow>
              <h1
                style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontWeight: 300,
                  fontSize: 'var(--v3-text-display-xl)',
                  lineHeight: 'var(--v3-leading-display-xl)',
                  letterSpacing: 'var(--v3-tracking-tight)',
                  color: 'var(--v3-color-ink)',
                  margin: '16px 0 0',
                  maxWidth: '22ch',
                }}
              >
                {HERO.headline}
              </h1>
              <p style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: '18px',
                lineHeight: 1.55,
                color: 'var(--v3-color-ink-secondary)',
                marginTop: '24px',
                maxWidth: '52ch',
              }}>
                {HERO.lead}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '40px' }}>
                <Button variant="primary" accent="teal" href="/dex/chat">
                  Start Your Executive Introduction
                </Button>
                <Button variant="secondary" accent="teal" href="/dex/assess">
                  Take the Diagnostic
                </Button>
              </div>

              <p style={{ ...META, marginTop: '20px' as any }}>
                {HERO.monoTag}
              </p>
            </div>

            {/* DEX AI visual preview — pure SVG cardless mockup */}
            <div aria-hidden className="v3-dex-hero-visual">
              <svg viewBox="0 0 420 420" style={{ width: '100%', height: 'auto' }}>
                {/* Paper sheet outline */}
                <rect x="30" y="30" width="360" height="360" fill="none" stroke="var(--v3-color-teal)" strokeOpacity="0.35" strokeWidth="1" />
                <line x1="30" y1="86" x2="390" y2="86" stroke="var(--v3-color-teal)" strokeOpacity="0.2" strokeWidth="1" />
                <text x="52" y="64" fontFamily="var(--v3-font-mono)" fontSize="9" fill="var(--v3-color-teal)">
                  <tspan style={{ letterSpacing: '0.16em' }}>DEX · CHINA-APAC</tspan>
                </text>
                <text x="310" y="64" fontFamily="var(--v3-font-mono)" fontSize="9" fill="var(--v3-color-ink-muted)">
                  <tspan style={{ letterSpacing: '0.16em' }}>PRIVATE</tspan>
                </text>

                {/* Sample "question" */}
                <g transform="translate(52 112)">
                  <rect x="0" y="0" width="260" height="46" fill="var(--v3-color-teal)" fillOpacity="0.08" stroke="var(--v3-color-teal)" strokeOpacity="0.35" strokeWidth="1" />
                  <text x="16" y="20" fontFamily="var(--v3-font-mono)" fontSize="8" fill="var(--v3-color-teal)">
                    <tspan style={{ letterSpacing: '0.14em' }}>Q · 上海 → 新加坡</tspan>
                  </text>
                  <text x="16" y="36" fontFamily="var(--v3-font-body)" fontSize="11" fill="var(--v3-color-ink)">
                    G400 CFO → SG MD, 75th comp band?
                  </text>
                </g>

                {/* Sample "answer" */}
                <g transform="translate(52 182)">
                  <line x1="0" y1="0" x2="316" y2="0" stroke="var(--v3-color-divider)" strokeWidth="1" />
                  <text x="0" y="20" fontFamily="var(--v3-font-mono)" fontSize="8" fill="var(--v3-color-ink-muted)">
                    <tspan style={{ letterSpacing: '0.14em' }}>A · 3-MARKET PRECEDENT · 2024 BAND</tspan>
                  </text>
                  <text x="0" y="48" fontFamily="var(--v3-font-body)" fontSize="11" fill="var(--v3-color-ink-secondary)">
                    SG-listed G400 MD: SGD 580–720k base / 60–110%
                  </text>
                  <text x="0" y="66" fontFamily="var(--v3-font-body)" fontSize="11" fill="var(--v3-color-ink-secondary)">
                    bonus / 1.5–2.5x long-term · 14 precedent mandates.
                  </text>
                  <text x="0" y="88" fontFamily="var(--v3-font-body)" fontSize="11" fill="var(--v3-color-ink-secondary)">
                    EP/PR sponsorship timeline: 10 weeks for C-suite.
                  </text>
                </g>

                {/* Miles badge */}
                <g transform="translate(52 320)">
                  <rect x="0" y="0" width="120" height="28" fill="none" stroke="var(--v3-color-teal)" strokeOpacity="0.5" strokeWidth="1" />
                  <text x="16" y="18" fontFamily="var(--v3-font-mono)" fontSize="8" fill="var(--v3-color-teal)">
                    <tspan style={{ letterSpacing: '0.14em' }}>1 MI · USED</tspan>
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </Section>

      <Divider variant="strong" width="content" />

      {/* ── 2. WHAT IS DEX AI — SplitSection 2-col ────────────────── */}
      <SplitSection label={WHAT.label} accent="teal" title={WHAT.title}>
        {WHAT.body.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>{p}</p>
        ))}
      </SplitSection>

      {/* ── 3. HOW IT WORKS — numbered methodology steps ─────────── */}
      <Section bg="cream" paddingY="lg">
        <div style={COL}>
          <SplitSection label="How it works" accent="teal" title="A direct conversation with LYC placement intelligence.">
            <p style={{ margin: 0 }}>
              Four simple phases. You choose how deep you want to go: 5 complimentary messages, a
              diagnostic baseline, a miles-pack as you go, or a monthly plan with priority responses
              and 1:1 coaching access.
            </p>
          </SplitSection>

          <Divider variant="light" width="content" style={{ marginTop: 'var(--v3-space-5)' }} />
          {STEPS.map((s, idx, arr) => (
            <React.Fragment key={s.number}>
              <MethodologyStep number={s.number} title={s.title} description={s.description} accent="teal" />
              {idx < arr.length - 1 && <Divider variant="light" width="content" />}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* ── 4. CAPABILITIES — feature list with thin dividers ─────── */}
      <Section bg="cream" paddingY="lg">
        <div style={COL}>
          <Eyebrow accent="teal" style={{ marginBottom: 'var(--v3-space-5)' }}>
            Capabilities
          </Eyebrow>
          <Divider variant="light" width="content" />
          {CAPABILITIES.map((c, idx, arr) => (
            <React.Fragment key={c.label}>
              <CapabilityRow
                label={c.label}
                title={c.title}
                description={c.description}
                cta={<Button variant="ghost" accent="teal" href={c.href}>{c.cta}</Button>}
              />
              {idx < arr.length - 1 && <Divider variant="light" width="content" />}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* ── 5. USE CASES — 3-col UseCaseColumns with thin vertical dividers */}
      <Section bg="cream" paddingY="lg">
        <div style={COL}>
          <UseCaseColumns items={USE_CASES} labelAccent="teal" />
        </div>
      </Section>

      {/* ── 6. PRICING PREVIEW — text-first tier table ───────────── */}
      <Section bg="white" paddingY="lg">
        <div style={COL}>
          <SplitSection label="Access" accent="teal" title="Simple, miles-based access.">
            <p style={{ margin: 0 }}>
              Begin with your Executive Introduction — 5 complimentary messages. No card required.
              Move to miles as you go or a monthly plan when DEX AI is part of your regular
              decision cadence.
            </p>
          </SplitSection>

          <div style={{ marginTop: 'var(--v3-space-6)' }}>
            <PricingTextTable
              tiers={PRICING_TIERS.map(t => t.label)}
              rows={PRICING_ROWS}
              accent="teal"
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 'var(--v3-space-5)',
              marginTop: 'var(--v3-space-8)',
              borderTop: '1px solid var(--v3-color-divider-strong)',
              paddingBlock: 'var(--v3-space-7)',
            }}
            className="v3-dex-tier-ctas"
          >
            {[
              { label: 'Executive Introduction', cta: 'Start Now', href: '/dex/chat', accent: 'teal' as const, variant: 'primary' as const },
              { label: 'Miles Pack', cta: 'Get Miles', href: '/dex/credits', accent: 'teal' as const, variant: 'secondary' as const },
              { label: 'Monthly Pro', cta: 'View Plans', href: '/dex/credits', accent: 'teal' as const, variant: 'secondary' as const },
            ].map(t => (
              <div key={t.label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--v3-space-4)' }}>
                <div style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: 'var(--v3-color-ink-muted)',
                }}>
                  {t.label}
                </div>
                <Button variant={t.variant} accent={t.accent} href={t.href}>{t.cta}</Button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 7. CTA SECTION — full-width dark bg, teal accent ─────── */}
      <Section bg="dark" paddingY="xl">
        <div style={{ ...COL, maxWidth: '72ch' }}>
          <Eyebrow accent="teal">Ready for 1:1 guidance</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-md)',
            lineHeight: 'var(--v3-leading-display-md)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-paper)',
            margin: '16px 0 16px',
            maxWidth: '24ch',
          }}>
            Try the diagnostic, then book a session.
          </h2>
          <p style={{
            fontFamily: 'var(--v3-font-body)',
            fontSize: '16px',
            lineHeight: 'var(--v3-leading-body)',
            color: 'var(--v3-color-paper-secondary)',
            maxWidth: '50ch',
          }}>
            Start in DEX AI with 5 complimentary messages. When you want a human, book a
            confidential coaching session with a senior LYC Partners consultant — one mile per
            session.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '40px' }}>
            <Button variant="primary" accent="teal" href="/dex/assess">
              Try the Diagnostic
            </Button>
            <Button variant="ghost" accent="teal" href="/dex/book">
              Book a Coaching Session
            </Button>
          </div>
        </div>
      </Section>

      <style>{`
        @media (max-width: 899px) {
          .v3-dex-hero-grid { grid-template-columns: 1fr !important; gap: var(--v3-space-8) !important; }
          .v3-dex-tier-ctas { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

export default DexLandingPage;
