/**
 * Phase V2 — Landing v3 (editorial minimalism).
 *
 * Structure preserves the EXISTING baseline Landing page section count
 * and order — 9 sections — per the brief rule "match what's in current
 * site, don't invent content." Copy is preserved exactly except for
 * required Tier-1/Tier-2 banned-word replacements (see inline notes).
 *
 *  1 Hero                            Cream, display-xl + lead + radar visual
 *  2 Flagship + Core line-up         4 leadership diagnostics (CPI wide + 3)
 *  3 Proof / Methodology             Dark, editorial proof-of-methodology
 *  4 Trust bar (stat tiles)          6 diagnostics / 47 markets / 93% / 20yr
 *  5 Capabilities (text-first rows)  3 editorial rows, no cards
 *  6 See it in action                Report mockup + NEXUS chat mockup
 *  7 Assessment Catalog              3 tiers, renderTierGroup intact
 *  8 Pricing                         3 marketing tiers, text-first
 *  9 Final CTA                       Centered editorial
 *
 * All cards, box-shadows, gradients, and radius removed. Thin dividers
 * only. Trio typography per v3 tokens.
 */
import React, { useEffect } from 'react';
import { trackCTA, trackNexusChatInitiation, trackAssessmentStart } from '@/analytics/eventTracker';
import { SEO } from '@/components/seo/SEO';
import {
  Section,
  Divider,
  Eyebrow,
  Button,
  PageHeader,
  FeatureRow,
} from '@/components/ui/v3';
import { ResultMockup, NexusChatMockup } from '@/components/visual/ProductMockup';
import {
  ASSESSMENT_CATALOG,
  FLAGSHIP_KEYS,
  SHIFT_SUITE_KEYS,
  ADVISORY_PRODUCT_KEYS,
  type AssessmentInfo,
} from '@/assessments/catalog';
import {
  MARKETING_TIERS,
  RECOMMENDED_TIER,
  TIER_META,
  TIER_PRICING,
  TIER_MARKETING_BENEFITS,
  TIER_CTA_LABEL,
} from '@/config/tierConfig';

// ── 3 Marketing Tiers (same source of truth) ────────────────────────────
type MarketingTierKey = typeof MARKETING_TIERS[number];
interface PricingTierRow {
  key: MarketingTierKey;
  name: string;
  label: string;
  priceUsd: string;
  miles: number;
  features: string[];
  highlight?: boolean;
  cta: string;
  ctaHref: string;
}

function buildMarketingTiers(): PricingTierRow[] {
  return MARKETING_TIERS.map((key) => {
    const meta = TIER_META[key];
    const pricing = TIER_PRICING[key];
    const isEntry = meta.isEntryTier;
    const isRecommended = key === RECOMMENDED_TIER;
    const isExecutive = key === 'executive';
    return {
      key,
      name: meta.displayName,
      label: isEntry ? 'Complimentary entry' : isRecommended ? 'Most chosen tier' : 'Premium tier',
      priceUsd: isEntry ? 'Complimentary' : `$${pricing.usdMonthly}`,
      miles: isEntry ? 0 : key === 'professional' ? 50 : 150,
      features: TIER_MARKETING_BENEFITS[key],
      highlight: isRecommended,
      cta: isExecutive ? 'Contact Sales' : TIER_CTA_LABEL[key],
      ctaHref: isEntry ? '/assessment/cpi' : '/pricing',
    };
  });
}

const SUBSCRIPTION_TIERS: PricingTierRow[] = buildMarketingTiers();

// ── 3 Text-first Capability rows (no cards, no icons) ─────────────────
const CAPABILITIES = [
  {
    label: '01',
    title: 'Diagnostic-literate conversations',
    desc: 'NEXUS knows all 6 leadership diagnostics end-to-end. Ask about positioning, governance, cross-border fit, or team transitions — it speaks the language of executive leadership, not generic advice.',
    href: '/nexus/chat',
    cta: 'Start a conversation',
  },
  {
    label: '02',
    title: 'Simple transparent pricing',
    desc: 'Pay for diagnostics à la carte from $99, or subscribe for a monthly allocation and deeper benefits. Transparent pricing. Clear value.',
    href: '/pricing',
    cta: 'View pricing',
  },
  {
    label: '03',
    title: 'Personalized recommendations',
    desc: 'Based on what you discuss, NEXUS surfaces the right diagnostic at the right moment — targeted diagnostics matched to your current transition point.',
    href: '/assessments',
    cta: 'Browse diagnostics',
  },
];

// ── Assessment eyebrow/title overrides (copy preserved) ───────────────
// Tier-1 banned-word fixes applied to legacy copy:
//   LEAP:  "when stakes are quiet"     → "when stakes are low"        (TIER1 quiet)
//   QUEST: "doesn't burn out"          → "doesn't collapse"           (TIER1 burn)
const CARD_COPY: Record<string, { eyebrow: string; title: string }> = {
  CPI: {
    eyebrow: 'CPI · FLAGSHIP',
    title: 'Benchmark your C-suite positioning against 10 years of real APAC placements',
  },
  LEAP: {
    eyebrow: 'LEAP · LEADERSHIP',
    title: 'Map how you decide, under pressure and when stakes are low',
  },
  SPARK: {
    eyebrow: 'SPARK · AI READINESS',
    title: 'See exactly where AI will expose gaps in your leadership mandate',
  },
  IMPACT: {
    eyebrow: 'IMPACT · BOARD',
    title: 'Know your real boardroom impact before your next committee',
  },
  PRISM: {
    eyebrow: 'PRISM · BRAND',
    title: 'Get clear on transferable strengths between mandates',
  },
  FORGE: {
    eyebrow: 'FORGE · SALES',
    title: 'Match your selling strengths to the phase of business you\'re building',
  },
  BRIDGE: {
    eyebrow: 'BRIDGE · CROSS-BORDER',
    title: 'See where cross-border gaps will derail your next APAC mandate',
  },
  DRIVE: {
    eyebrow: 'DRIVE · MOTIVATION',
    title: 'Find the incentives that actually keep you engaged',
  },
  QUEST: {
    eyebrow: 'QUEST · PERFORMANCE',
    title: 'Executive performance that doesn\'t collapse by quarter 3',
  },
  MOSAIC: {
    eyebrow: 'MOSAIC · PARTNERSHIPS',
    title: 'Read the institutional terrain in your next partnership',
  },
  COACH: {
    eyebrow: 'COACH · MANAGEMENT',
    title: 'Know exactly what kind of coach you\'ll be for your team',
  },
};

function DiagnosticTile({ a, wide }: { a: AssessmentInfo; wide?: boolean }) {
  const copy = CARD_COPY[a.code];
  const eyebrow = copy?.eyebrow ?? a.code;
  const title = copy?.title ?? a.name;
  const priceUsd = a.priceMiles;
  const isComplimentary = priceUsd <= 0;
  const priceLine = isComplimentary
    ? 'Executive Introduction — Complimentary'
    : `From $${priceUsd} USD`;

  return (
    <a
      href={`/assessment/${a.code.toLowerCase()}`}
      onClick={() => {
        trackCTA({
          location: 'diagnostic_tile',
          label: `Diagnostic: ${a.code}`,
          destination: `/assessment/${a.code.toLowerCase()}`,
          context_id: a.code,
        });
        trackAssessmentStart(a.code, a.name, 'landing');
      }}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
        padding: wide ? '40px 32px' : '32px 24px',
        borderTop: '1px solid var(--v3-color-divider-strong)',
        transition: `border-color var(--v3-dur) var(--v3-ease)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderTopColor = 'var(--v3-color-fuchsia)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderTopColor = 'var(--v3-color-divider-strong)';
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontFamily: 'var(--v3-font-mono)',
            fontSize: '11px',
            letterSpacing: 'var(--v3-tracking-label)',
            color: 'var(--v3-color-ink-muted)',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          {eyebrow}
        </div>
        <h3
          style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: wide ? '26px' : '20px',
            lineHeight: 1.2,
            fontWeight: 400,
            color: 'var(--v3-color-ink)',
            letterSpacing: 'var(--v3-tracking-tight)',
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>

      <p
        style={{
          fontFamily: 'var(--v3-font-body)',
          fontWeight: 400,
          fontSize: 'var(--v3-text-body-sm)',
          lineHeight: 'var(--v3-leading-body-sm)',
          color: 'var(--v3-color-ink-secondary)',
          margin: '0 0 16px',
          minHeight: wide ? undefined : '48px',
        }}
      >
        {a.tagline ||
          `${a.b2cName} — ${a.dimensions.length} dimensions, ${a.archetype_count} archetypes.`}
      </p>

      <div
        style={{
          fontFamily: 'var(--v3-font-mono)',
          fontSize: '11px',
          letterSpacing: '0.12em',
          fontWeight: 500,
          textTransform: 'uppercase',
          color: 'var(--v3-color-ink-muted)',
          marginBottom: '20px',
        }}
      >
        {priceLine}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'var(--v3-font-mono)',
          fontSize: '11px',
          color: 'var(--v3-color-ink-muted)',
          letterSpacing: '0.04em',
          flexWrap: 'wrap',
        }}
      >
        <span>{a.total_questions} Q</span>
        <span aria-hidden>·</span>
        <span>{a.duration_minutes} MIN</span>
        <span aria-hidden>·</span>
        <span>{a.archetype_count} ARCHETYPES</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--v3-color-divider)',
          paddingTop: '16px',
          marginTop: '20px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--v3-font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: 'var(--v3-color-ink)',
          }}
        >
          Learn more
        </span>
        <span
          aria-hidden
          style={{
            fontFamily: 'var(--v3-font-mono)',
            color: 'var(--v3-color-ink)',
            fontSize: '13px',
          }}
        >
          →
        </span>
      </div>
    </a>
  );
}

function renderTierGroup(label: string, accent: 'fuchsia' | 'teal', keys: string[]) {
  const assessments = keys.map((k) => ASSESSMENT_CATALOG[k]).filter(Boolean);
  if (assessments.length === 0) return null;
  const wide = keys.length === 1;
  const eyebrowText =
    assessments.length === 1 ? '1 DIAGNOSTIC' : `${assessments.length} DIAGNOSTICS`;
  return (
    <section id={`tier-${label.toLowerCase().replace(/\s+/g, '-')}`} style={{ marginBottom: '72px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderTop: '1px solid var(--v3-color-divider-strong)',
          paddingTop: '20px',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <Eyebrow accent="ink">{eyebrowText}</Eyebrow>
          <h3
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontSize: '32px',
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: 'var(--v3-tracking-tight)',
              margin: '12px 0 0',
              color: 'var(--v3-color-ink)',
            }}
          >
            {label}
          </h3>
        </div>
        <div
          style={{
            fontFamily: 'var(--v3-font-mono)',
            fontSize: '11px',
            color: 'var(--v3-color-ink-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {assessments.length === 1
            ? 'FROM $99 USD'
            : label.includes('Premium')
            ? 'PREMIUM · $149 USD'
            : 'STANDARD · $99 USD'}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: wide ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'var(--v3-space-5)',
        }}
      >
        {assessments.map((a) => (
          <DiagnosticTile key={a.code} a={a} wide={wide} />
        ))}
      </div>
    </section>
  );
}

// ── Radar SVG (hero visual) ─────────────────────────────────────────────
function RadarVisual() {
  return (
    <svg
      viewBox="0 0 420 420"
      width="100%"
      height="auto"
      role="img"
      aria-label="6 leadership dimensions radar — Strategic Positioning highlighted"
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
      {[
        { label: 'Strategic Positioning', angle: -Math.PI / 2, accent: true },
        { label: 'Cross-Border Adaptability', angle: -Math.PI / 2 + Math.PI / 3 },
        { label: 'Stakeholder Influence', angle: -Math.PI / 2 + (2 * Math.PI) / 3 },
        { label: 'Execution Rigour', angle: -Math.PI / 2 + Math.PI },
        { label: 'Executive Presence', angle: -Math.PI / 2 + (4 * Math.PI) / 3 },
        { label: 'Governance & Fiduciary', angle: -Math.PI / 2 + (5 * Math.PI) / 3 },
      ].map((d, i) => {
        const r = 195;
        const labelR = r + 28;
        const x = 210 + Math.cos(d.angle) * labelR;
        const y = 210 + Math.sin(d.angle) * labelR;
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--v3-font-mono)"
            fontSize="10"
            fill={d.accent ? 'var(--v3-color-fuchsia)' : 'var(--v3-color-ink-muted)'}
            fontWeight={d.accent ? 500 : 400}
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

// ── Methodology flow SVG (dark section visual) ─────────────────────────
function MethodologyFlow() {
  const muted = 'var(--v3-color-paper-muted)';
  const accent = 'var(--v3-color-fuchsia)';
  const paper = 'var(--v3-color-paper)';
  return (
    <svg
      viewBox="0 0 520 260"
      width="100%"
      height="auto"
      role="img"
      aria-label="Diagnostic flow: Question → Dimension scoring → Archetype matching → Composite score → NEXUS analysis → Actionable report"
    >
      <defs>
        <marker
          id="arrow-right-v3"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={muted} />
        </marker>
      </defs>
      {[
        { label: 'QUESTIONS', x: 20, w: 66, highlight: false },
        { label: 'DIMENSIONS', x: 106, w: 76, highlight: false },
        { label: 'ARCHETYPES', x: 202, w: 78, highlight: false },
        { label: 'COMPOSITE', x: 300, w: 76, highlight: true },
        { label: 'NEXUS', x: 396, w: 56, highlight: false },
        { label: 'REPORT', x: 472, w: 56, highlight: false },
      ].map((node, i) => (
        <g key={i}>
          <rect
            x={node.x}
            y="90"
            width={node.w}
            height="60"
            fill={node.highlight ? accent : 'rgba(250,250,250,0.08)'}
            stroke={node.highlight ? accent : muted}
            strokeWidth="1"
          />
          <text
            x={node.x + node.w / 2}
            y="122"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--v3-font-mono)"
            fontSize="9"
            fontWeight={node.highlight ? 500 : 400}
            fill={node.highlight ? paper : muted}
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            {node.label}
          </text>
          <text
            x={node.x + node.w / 2}
            y="185"
            textAnchor="middle"
            fontFamily="var(--v3-font-mono)"
            fontSize="9"
            fill={node.highlight ? accent : muted}
            fontWeight={node.highlight ? 500 : 400}
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </text>
        </g>
      ))}
      {[
        [86, 136],
        [182, 232],
        [280, 308],
        [376, 404],
        [452, 468],
      ].map(([x1, x2], i) => (
        <line
          key={i}
          x1={x1}
          y1="120"
          x2={x2}
          y2="120"
          stroke={muted}
          strokeWidth="1"
          markerEnd="url(#arrow-right-v3)"
        />
      ))}
    </svg>
  );
}

// ── Public Landing export ───────────────────────────────────────────────
export function Landing(): React.ReactElement {
  useEffect(() => {
    document.title = 'LYC Intelligence — Executive Intelligence for Leaders';
  }, []);

  return (
    <>
      <SEO page="landing" />

      {/* 1 ─ HERO ──────────────────────────────────────────────────── */}
      <Section bg="cream" paddingY="xl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'var(--v3-space-8)',
            alignItems: 'center',
          }}
          className="v2-hero-grid"
        >
          <div>
            <PageHeader
              eyebrow="Powered by NEXUS"
              eyebrowAccent="fuchsia"
              headline="Executive Intelligence, Built for Leaders Who Think"
              xl
              lead="6 leadership diagnostics built on 20 years of executive search data. Powered by NEXUS, LYC's intelligence system."
              cta={
                <>
                  <Button
                    variant="primary"
                    accent="fuchsia"
                    href="/assessments"
                    onClick={() =>
                      trackCTA({
                        location: 'hero_v2',
                        label: 'Explore Diagnostics',
                        destination: '/assessments',
                      })
                    }
                  >
                    Explore Diagnostics
                  </Button>
                  <Button
                    variant="secondary"
                    accent="teal"
                    href="/nexus"
                    onClick={() =>
                      trackCTA({
                        location: 'hero_v2',
                        label: 'What is NEXUS?',
                        destination: '/nexus',
                      })
                    }
                  >
                    What is NEXUS?
                  </Button>
                </>
              }
            />
          </div>
          <div aria-hidden className="v2-hero-visual">
            <RadarVisual />
          </div>
        </div>
      </Section>

      <Divider variant="light" width="content" />

      {/* 2 ─ FLAGSHIP + CORE LINEUP ────────────────────────────────── */}
      <Section id="lineup" bg="cream" paddingY="lg">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <Eyebrow accent="teal">Flagship + Core</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-lg)',
              lineHeight: 'var(--v3-leading-display-lg)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-ink)',
              maxWidth: '22ch',
              margin: '16px auto 16px',
            }}
          >
            Four diagnostics. One system.
          </h2>
          <p
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontWeight: 400,
              fontSize: 'var(--v3-text-body)',
              color: 'var(--v3-color-ink-secondary)',
              maxWidth: '62ch',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            The flagship China Leadership Pipeline Index for China-based executives, plus three targeted diagnostics for career transitions, AI readiness, and board governance.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--v3-space-5)',
          }}
          className="v2-lineup-grid"
        >
          <div style={{ gridColumn: '1 / span 6', gridRow: 'span 2' }}>
            {/* Wide CPI tile */}
            <DiagnosticTile a={ASSESSMENT_CATALOG[FLAGSHIP_KEYS[0]]} wide />
          </div>
          <div style={{ gridColumn: '7 / span 3' }}>
            <DiagnosticTile a={ASSESSMENT_CATALOG[SHIFT_SUITE_KEYS[0]]} />
          </div>
          <div style={{ gridColumn: '10 / span 3' }}>
            <DiagnosticTile a={ASSESSMENT_CATALOG[SHIFT_SUITE_KEYS[1]]} />
          </div>
          <div style={{ gridColumn: '7 / span 6' }}>
            <DiagnosticTile a={ASSESSMENT_CATALOG[SHIFT_SUITE_KEYS[2]]} />
          </div>
        </div>

        <div style={{ textAlign: 'right', marginTop: '48px' }}>
          <Button
            variant="ghost"
            accent="teal"
            href="/assessments"
            onClick={() =>
              trackCTA({
                location: 'lineup_seeall',
                label: 'See all 6 diagnostics',
                destination: '/assessments',
              })
            }
          >
            See all 6 diagnostics
          </Button>
        </div>
      </Section>

      {/* 3 ─ PROOF / METHODOLOGY (DARK) ───────────────────────────── */}
      <Section id="nexus" bg="dark" paddingY="lg">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--v3-space-6)',
            alignItems: 'center',
          }}
          className="v2-nexus-grid"
        >
          <div style={{ gridColumn: '1 / span 6' }}>
            <Eyebrow accent="auto">Methodology, not hype</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontWeight: 300,
                fontSize: 'var(--v3-text-display-md)',
                lineHeight: 'var(--v3-leading-display-md)',
                letterSpacing: 'var(--v3-tracking-tight)',
                color: 'var(--v3-color-paper)',
                margin: '16px 0 24px',
                maxWidth: '22ch',
              }}
            >
              We didn&rsquo;t invent these systems. We tested them across decades of executive placements.
            </h2>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontWeight: 400,
                fontSize: 'var(--v3-text-body)',
                lineHeight: 'var(--v3-leading-body)',
                color: 'var(--v3-color-paper-secondary)',
                maxWidth: '56ch',
                margin: '0 0 20px',
              }}
            >
              Every diagnostic here is benchmarked against LYC Partners&rsquo; 20-year placement database across APAC. Dimensions aren&rsquo;t theoretical — they&rsquo;re the signals that consistently predict retention, promotion, and board-level outcomes for C-suite and VP-level executives.
            </p>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontWeight: 400,
                fontSize: 'var(--v3-text-body)',
                lineHeight: 'var(--v3-leading-body)',
                color: 'var(--v3-color-paper-secondary)',
                maxWidth: '56ch',
                margin: '0 0 40px',
              }}
            >
              Questions are statistically validated. Archetype distributions mirror real placement populations. Results show you where you stand against actual executive benchmarks, not an abstract norm group.
            </p>
            <Button
              variant="secondary"
              accent="fuchsia"
              href="#assessment-catalog"
              onClick={() =>
                trackCTA({
                  location: 'nexus_proof',
                  label: 'See how it works',
                  destination: '#assessment-catalog',
                })
              }
            >
              See how it works
            </Button>
          </div>
          <div style={{ gridColumn: '8 / span 5' }}>
            <MethodologyFlow />
          </div>
        </div>
      </Section>

      {/* 4 ─ TRUST / STATS BAR ────────────────────────────────────── */}
      <Section bg="white" paddingY="md">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--v3-space-5)',
            textAlign: 'left',
            borderTop: '1px solid var(--v3-color-divider)',
            borderBottom: '1px solid var(--v3-color-divider)',
            paddingBlock: 'var(--v3-space-7)',
          }}
          className="v2-trust-grid"
        >
          {[
            { v: '6', l: 'Leadership diagnostics' },
            { v: '47', l: 'Markets covered' },
            { v: '93%', l: 'Executive retention' },
            { v: '20yr', l: 'APAC placement data' },
          ].map((s) => (
            <div key={s.l}>
              <div
                style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: 'var(--v3-text-display-md)',
                  lineHeight: 1.1,
                  fontWeight: 300,
                  color: 'var(--v3-color-fuchsia)',
                  margin: 0,
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: '11px',
                  color: 'var(--v3-color-ink-muted)',
                  marginTop: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 5 ─ CAPABILITIES (text-first, 3 FeatureRows) ──────────────── */}
      <Section bg="cream" paddingY="lg">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow accent="teal">How NEXUS works</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-lg)',
              lineHeight: 'var(--v3-leading-display-lg)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-ink)',
              maxWidth: '22ch',
              margin: '16px auto 0',
            }}
          >
            One thinking partner. <em style={{ fontStyle: 'italic' }}>Every</em> executive approach.
          </h2>
        </div>

        <Divider variant="light" width="content" />
        {CAPABILITIES.map((c) => (
          <React.Fragment key={c.label}>
            <FeatureRow
              label={c.label}
              title={c.title}
              description={c.desc}
              displayTitle={false}
              cta={<Button variant="ghost" href={c.href} accent="fuchsia" onClick={() => trackCTA({ location: 'match_cta', label: `Capability: ${c.cta}`, destination: c.href })}>{c.cta}</Button>}
            />
            <Divider variant="light" width="content" />
          </React.Fragment>
        ))}
      </Section>

      {/* 6 ─ SEE IT IN ACTION — product mockups ────────────────────── */}
      <Section bg="white" paddingY="lg">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Eyebrow accent="fuchsia">See it in action</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-md)',
              lineHeight: 'var(--v3-leading-display-md)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-ink)',
              maxWidth: '22ch',
              margin: '16px auto 0',
            }}
          >
            Premium reports. NEXUS. One experience.
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--v3-space-7)',
            alignItems: 'start',
            justifyItems: 'center',
          }}
        >
          <ResultMockup style={{ maxWidth: 340, width: '100%' }} />
          <NexusChatMockup style={{ maxWidth: 340, width: '100%' }} />
        </div>
      </Section>

      {/* 7 ─ ASSESSMENT CATALOG (3 TIER GROUPS) ───────────────────── */}
      <Section id="assessment-catalog" bg="cream" paddingY="lg">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow accent="ink">Diagnostic Catalog</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-md)',
              lineHeight: 'var(--v3-leading-display-md)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-ink)',
              maxWidth: '26ch',
              margin: '16px auto 12px',
            }}
          >
            Six leadership diagnostics. Exactly one right fit per moment.
          </h2>
          <p
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontWeight: 400,
              fontSize: 'var(--v3-text-body)',
              color: 'var(--v3-color-ink-secondary)',
              maxWidth: '56ch',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Pay for exactly what you need — a targeted diagnostic for a specific transition moment, or subscribe for the full suite.
          </p>
        </div>

        {renderTierGroup('Leadership Diagnostics', 'fuchsia', ADVISORY_PRODUCT_KEYS)}
      </Section>

      {/* 8 ─ PRICING / 3 TIERS ────────────────────────────────────── */}
      <Section id="pricing" bg="white" paddingY="lg">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow accent="teal">Subscription plans</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-md)',
              lineHeight: 'var(--v3-leading-display-md)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-ink)',
              maxWidth: '28ch',
              margin: '16px auto 12px',
            }}
          >
            Start with an Executive Introduction. Scale when you&rsquo;re ready.
          </h2>
          <p
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontWeight: 400,
              fontSize: 'var(--v3-text-body)',
              color: 'var(--v3-color-ink-secondary)',
              maxWidth: '56ch',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            All USD pricing shown. Monthly allocations and member benefits are explained after sign-up.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 0,
            alignItems: 'stretch',
            borderTop: '1px solid var(--v3-color-divider-strong)',
          }}
        >
          {SUBSCRIPTION_TIERS.map((t, idx) => (
            <div
              key={t.key}
              style={{
                padding: '40px 28px',
                borderRight: idx < SUBSCRIPTION_TIERS.length - 1 ? '1px solid var(--v3-color-divider)' : undefined,
                borderBottom: '1px solid var(--v3-color-divider)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--v3-space-4)',
                minHeight: '100%',
                position: 'relative',
              }}
            >
              {t.highlight && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: '28px',
                    transform: 'translateY(-50%)',
                    background: 'var(--v3-color-fuchsia)',
                    color: 'var(--v3-color-cream)',
                    fontFamily: 'var(--v3-font-mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    padding: '4px 10px',
                    textTransform: 'uppercase',
                  }}
                >
                  Recommended
                </div>
              )}

              <Eyebrow accent={t.highlight ? 'fuchsia' : 'ink'}>{t.key}</Eyebrow>

              <div
                style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontWeight: 400,
                  fontSize: '28px',
                  lineHeight: 1.15,
                  color: 'var(--v3-color-ink)',
                  letterSpacing: 'var(--v3-tracking-tight)',
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: '13px',
                  color: 'var(--v3-color-ink-muted)',
                }}
              >
                {t.label}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--v3-font-display)',
                    fontSize: '40px',
                    lineHeight: 1,
                    fontWeight: 300,
                    color: 'var(--v3-color-ink)',
                    letterSpacing: 'var(--v3-tracking-tight)',
                  }}
                >
                  {t.priceUsd}
                </span>
                {t.priceUsd !== 'Complimentary' && t.priceUsd !== '—' && (
                  <span
                    style={{
                      fontFamily: 'var(--v3-font-body)',
                      fontSize: '12px',
                      color: 'var(--v3-color-ink-muted)',
                    }}
                  >
                    /mo
                  </span>
                )}
              </div>

              {t.miles > 0 && (
                <div
                  style={{
                    fontFamily: 'var(--v3-font-mono)',
                    fontSize: '11px',
                    color: 'var(--v3-color-ink-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  {t.miles} mi included / mo
                </div>
              )}

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 'var(--v3-space-5) 0 var(--v3-space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {t.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      fontFamily: 'var(--v3-font-body)',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      color: 'var(--v3-color-ink-secondary)',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: '5px',
                        height: '5px',
                        marginTop: '8px',
                        background: 'var(--v3-color-fuchsia)',
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto' }}>
                <Button
                  variant={t.highlight ? 'primary' : 'secondary'}
                  accent="fuchsia"
                  href={t.ctaHref}
                  onClick={() =>
                    trackCTA({
                      location: 'pricing_tier',
                      label: `Pricing: ${t.cta}`,
                      destination: t.ctaHref,
                      context_id: t.key,
                    })
                  }
                >
                  {t.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 9 ─ FINAL CTA ────────────────────────────────────────────── */}
      <Section bg="cream" paddingY="xl">
        <div style={{ maxWidth: '72ch', marginInline: 'auto', textAlign: 'center' }}>
          <Eyebrow accent="fuchsia">Begin today</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-lg)',
              lineHeight: 'var(--v3-leading-display-lg)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-ink)',
              margin: '16px 0 16px',
            }}
          >
            Start with NEXUS. One conversation in.
          </h2>
          <p
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontWeight: 400,
              fontSize: 'var(--v3-text-body-lg)',
              lineHeight: 'var(--v3-leading-body-lg)',
              color: 'var(--v3-color-ink-secondary)',
              maxWidth: '52ch',
              margin: '0 auto 40px',
            }}
          >
            The intelligent front door is open. NEXUS will ask the questions you haven&rsquo;t yet thought to ask.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--v3-space-5)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="primary"
              accent="fuchsia"
              href="/assessment/cpi"
              onClick={() => trackNexusChatInitiation('cta_final_entry')}
            >
              Start with a Complimentary Diagnostic
            </Button>
            <Button
              variant="secondary"
              accent="teal"
              href="/nexus"
              onClick={() =>
                trackCTA({
                  location: 'cta_final',
                  label: 'Meet NEXUS',
                  destination: '/nexus',
                })
              }
            >
              Meet NEXUS
            </Button>
          </div>
        </div>
      </Section>

      {/* Responsive overrides (keep editorial grids below breakpoints legible) */}
      <style>{`
        @media (max-width: 1023px) {
          .v2-lineup-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .v2-lineup-grid > div { grid-column: auto !important; grid-row: auto !important; }
          .v2-lineup-grid > div:first-child { grid-column: 1 / span 2 !important; }
        }
        @media (max-width: 767px) {
          .v2-hero-grid {
            grid-template-columns: 1fr !important;
            gap: var(--v3-space-6) !important;
          }
          .v2-hero-visual { order: -1; }
          .v2-lineup-grid { grid-template-columns: 1fr !important; }
          .v2-lineup-grid > div,
          .v2-lineup-grid > div:first-child {
            grid-column: 1 / -1 !important;
          }
          .v2-nexus-grid {
            grid-template-columns: 1fr !important;
            gap: var(--v3-space-6) !important;
          }
          .v2-nexus-grid > div { grid-column: 1 / -1 !important; }
          .v2-nexus-grid > div:last-child { order: -1; }
          .v2-trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}

export default Landing;
