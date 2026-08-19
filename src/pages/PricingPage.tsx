/**
 * PricingPage — V3.4 VISUAL REWORK (V3 design system)
 *
 * Full pricing page. V3 editorial system. Sections top→bottom:
 *   HEADER. Nav         — wordmark + nav links + "Begin with your positioning" CTA
 *   1. Hero         — eyebrow "Membership" + display headline + sub + billing toggle
 *   2. Tiers        — 3-tier grid: Explorer (complimentary) / Professional $99
 *                     (recommended, teal) / Executive $199
 *   3. Comparison   — feature comparison table (rows × 3 tiers)
 *   4. Human Depth  — add-on section (Bronze / Silver / Gold packages, teal accent)
 *   5. FAQ          — short accordion
 *   6. Final CTA    — dark, inverted button
 *   7. Footer       — minimal
 *
 * Naming rules (enforced):
 *  - "Membership" not "Pricing" in section eyebrow (page route stays /pricing)
 *  - "NEXUS" always by name — never "the AI" / "the coach"
 *  - No "Platform" / "Architecture" anywhere
 *  - No "unlimited" — name a specific benefit instead
 *  - No "free" — use "complimentary" (Executive Introduction tier)
 *  - Miles are NOT a marketing feature — shown as factual mono labels, never lead
 *
 * Billing/CTA wiring preserved verbatim from legacy PricingPage: usePricingCta hook
 * + getCta/handleSelectTier + Stripe checkout. Only presentation changed.
 */
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { trackBillingView } from '@/analytics/eventTracker';
import { useAuthStore } from '@/stores/authStore';
import { initScrollReveal } from '@/lib/utils';
import { PRICING_TIERS } from '@/config/pricingData';
import type { BillingCycle, PricingCurrency } from '@/config/tiers';
import { usePricingCta } from '@/components/pricing/usePricingCta';
import { Section, Eyebrow, Button, Divider, PricingTextTable, CapabilityRow } from '@/components/ui/v3';

/* ── 3-tier membership display (landing shows 3 of the real 5 tiers) ──
 * Explorer $0 (complimentary) · Professional $99 (recommended, teal)
 * · Executive $199. Human coaching is a separate add-on layer, not shown here.
 *
 * PRICING_TIERS (from pricingData.ts) is the source of truth for the 5 real
 * tiers. We filter to the 3 landing-visible keys: explorer / professional /
 * executive. "Professional" on landing = "Pro" internal tier (display override).
 */
const VISIBLE_TIER_KEYS = ['explorer', 'professional', 'executive'] as const;

interface LandingTier {
  key: string;
  name: string;
  price: number;
  priceLabel: string;
  blurb: string;
  features: string[];
  recommended?: boolean;
}

const LANDING_TIERS: LandingTier[] = [
  {
    key: 'explorer',
    name: 'Explorer',
    price: 0,
    priceLabel: 'Complimentary',
    blurb: 'Begin the conversation. Daily NEXUS messages, the PRISM lens on us, and a baseline to grow from.',
    features: ['20 NEXUS messages / day', 'PRISM + LEAP lenses on us', 'Baseline leadership profile'],
  },
  {
    key: 'professional',
    name: 'Professional',
    price: 99,
    priceLabel: '$99/mo',
    recommended: true,
    blurb: 'NEXUS, always on. The full 11-lens catalog. Branded reports, advanced insights, peer benchmarking.',
    features: ['NEXUS messages, no cap', 'Full 11-lens catalog access', 'Branded PDF reports', '5 miles / month'],
  },
  {
    key: 'executive',
    name: 'Executive',
    price: 199,
    priceLabel: '$199/mo',
    blurb: 'The deepest layer. Priority NEXUS, quarterly consultant debriefs, full benchmarking, council eligibility.',
    features: ['Priority NEXUS responses', 'Quarterly consultant debriefs', 'Full percentile benchmarking', 'Council eligibility'],
  },
];

/* ── Feature comparison table (3 visible tiers × rows) ──
 * Rows are factual capability comparisons — no "unlimited", no marketing fluff.
 * Tier values: '—' (not included) / specific value.
 */
interface ComparisonRow {
  feature: string;
  explorer: string;
  professional: string;
  executive: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'NEXUS messages / day',     explorer: '20',         professional: 'No cap',          executive: 'No cap, priority' },
  { feature: 'Lens catalog',            explorer: 'PRISM + LEAP', professional: 'All 11 lenses',  executive: 'All 11 lenses' },
  { feature: 'Miles / month',           explorer: '2',           professional: '5',               executive: '15' },
  { feature: 'PDF readouts',             explorer: 'Plain',       professional: 'Branded',         executive: 'Branded + shareable' },
  { feature: 'Percentile benchmarking',  explorer: '—',           professional: 'Standard',       executive: 'Full' },
  { feature: 'Consultant debriefs',      explorer: '—',          professional: 'Add-on',          executive: 'Quarterly included' },
  { feature: 'Council eligibility',      explorer: '—',          professional: '—',               executive: 'Yes' },
  { feature: 'Human coaching add-on',    explorer: '—',          professional: 'Optional',        executive: 'Optional' },
];

/* ── Human Depth add-on packages (Bronze / Silver / Gold) ──
 * Separate layer from AI subscription. Teal accent (recommended = Silver).
 */
interface HumanPackage {
  name: string;
  price: string;
  sessions: string;
  blurb: string;
  recommended?: boolean;
}

const HUMAN_PACKAGES: HumanPackage[] = [
  { name: 'Bronze', price: '$199', sessions: '1 session', blurb: 'A single 60-minute debrief on one readout.' },
  { name: 'Silver', price: '$549',  sessions: '3 sessions', blurb: 'A working arc across one lens, with a senior LYC consultant.', recommended: true },
  { name: 'Gold',   price: '$1,499', sessions: '8 sessions', blurb: 'Quarterly partnership. The full human layer, sustained.' },
];

/* ── FAQ ── */
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'What is a mile?',
    a: 'Miles are the unit NEXUS uses for diagnostics. Each lens costs between one and five miles. You earn miles through conversation and receive a monthly allocation based on your membership.',
  },
  {
    q: 'Can I change membership later?',
    a: 'Yes — upgrade, downgrade, or pause at any time. Changes take effect at the next cycle.',
  },
  {
    q: 'Is the Explorer tier really complimentary?',
    a: 'Yes. Twenty NEXUS messages a day, the PRISM and LEAP lenses, and a baseline profile. No card required.',
  },
  {
    q: 'How does human coaching work alongside NEXUS?',
    a: 'Human Depth (Bronze / Silver / Gold) is a separate add-on. Book a debrief when a readout deserves a human walk-through.',
  },
  {
    q: 'What happens to my conversation history if I cancel?',
    a: 'Your thread stays yours. You can export it. NEXUS will not resume without you.',
  },
];

interface PricingPageProps {
  onUpgradeSuccess?: () => void;
}

export function PricingPage({ onUpgradeSuccess }: PricingPageProps) {
  const { user } = useAuthStore();
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [currency] = useState<PricingCurrency>('USD');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { getCta, handleSelectTier } = usePricingCta(onUpgradeSuccess);

  React.useEffect(() => { trackBillingView(user ? 'portal_nav' : 'direct_link'); }, [user]);
  useEffect(() => { initScrollReveal(); }, []);

  const onPrimaryCta = useCallback(() => {
    const cards = document.getElementById('pricing-tier-cards');
    if (cards) cards.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div style={{ background: 'var(--v3-color-cream)', color: 'var(--v3-color-ink)', minHeight: '100vh' }}>
      <SEO page="pricing" />

      {/* ════════════════ HEADER / NAV ════════════════ */}
      <Section bg="white" paddingY="sm" scope={false} style={{ borderBottom: '1px solid var(--v3-color-divider)', paddingBlock: 'var(--v3-space-5)' }}>
        <div className="v3-root" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--v3-space-4)' }}>
          <Link to="/" aria-label="NEXUS home" style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', fontWeight: 500, color: 'var(--v3-color-ink)', textDecoration: 'none', textTransform: 'uppercase' }}>
            NEXUS.
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--v3-space-6)', flexWrap: 'wrap' }}>
            <Link to="/nexus/chat" style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-ink-secondary)', textDecoration: 'none', fontWeight: 400 }}>Chat</Link>
            <Link to="/#lenses" style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-ink-secondary)', textDecoration: 'none', fontWeight: 400 }}>Lenses</Link>
          </div>
          <Button variant="primary" accent="teal" href="/nexus/chat">
            Begin with your positioning
          </Button>
        </div>
      </Section>

      {/* ════════════════ 1. HERO ════════════════ */}
      <Section bg="cream" paddingY="xl" id="membership">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <Eyebrow accent="teal" style={{ textAlign: 'center', display: 'block' }}>Membership</Eyebrow>
          <h2 className="reveal" style={{ fontFamily: 'var(--v3-font-display)', fontSize: 'var(--v3-text-displayLG)', lineHeight: 1.15, fontWeight: 400, color: 'var(--v3-color-ink)', margin: '8px 0 16px', letterSpacing: '-0.02em' }}>
            One subscription. The whole catalog.
          </h2>
          <p className="reveal" style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-bodyLG)', lineHeight: 1.6, color: 'var(--v3-color-ink-secondary)', maxWidth: 560, margin: '0 auto 32px' }}>
            Pick the depth that matches where you are. Change it whenever the work changes.
          </p>
          {/* Billing toggle */}
          <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
            <button
              onClick={() => setCycle('monthly')}
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body)',
                padding: '10px 20px',
                background: 'transparent',
                color: cycle === 'monthly' ? 'var(--v3-color-teal)' : 'var(--v3-color-ink-muted)',
                border: `1px solid ${cycle === 'monthly' ? 'var(--v3-color-teal)' : 'var(--v3-color-divider)'}`,
                borderRight: cycle === 'monthly' ? '1px solid var(--v3-color-teal)' : '1px solid var(--v3-color-divider)',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setCycle('annual')}
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body)',
                padding: '10px 20px',
                background: 'transparent',
                color: cycle === 'annual' ? 'var(--v3-color-teal)' : 'var(--v3-color-ink-muted)',
                border: `1px solid ${cycle === 'annual' ? 'var(--v3-color-teal)' : 'var(--v3-color-divider)'}`,
                borderLeft: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Annual <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 10, border: `1px solid ${cycle === 'annual' ? 'var(--v3-color-teal)' : 'var(--v3-color-ink-muted)'}`, padding: '1px 5px', color: cycle === 'annual' ? 'var(--v3-color-teal)' : 'var(--v3-color-ink-muted)' }}>SAVE 15%</span>
            </button>
          </div>
        </div>
      </Section>

      {/* ════════════════ 2. TIERS ════════════════ */}
      <Section bg="white" paddingY="lg" style={{ borderTop: '1px solid var(--v3-color-divider)', borderBottom: '1px solid var(--v3-color-divider)' }}>
        <div id="pricing-tier-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 0 }}>
          {LANDING_TIERS.map((tier, idx) => {
            const realTier = PRICING_TIERS.find(t => t.key === tier.key);
            const cta = realTier ? getCta(realTier.key as any) : { label: tier.price === 0 ? 'Begin complimentary' : `Go ${tier.name}`, href: '/nexus/chat' };
            const isRec = !!tier.recommended;
            const showLeftBorder = idx > 0;
            return (
              <div
                key={tier.key}
                className="reveal"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 'var(--v3-space-8) var(--v3-space-6)',
                  minHeight: 520,
                  borderLeft: showLeftBorder ? '1px solid var(--v3-color-divider)' : isRec ? '1px solid var(--v3-color-teal)' : 'none',
                  position: 'relative',
                }}
              >
                {isRec && (
                  <div style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', textTransform: 'uppercase', color: 'var(--v3-color-teal)', fontWeight: 500, marginBottom: 'var(--v3-space-4)' }}>
                    RECOMMENDED
                  </div>
                )}
                <div style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', textTransform: 'uppercase', color: 'var(--v3-color-ink-muted)', marginBottom: isRec ? 'var(--v3-space-2)' : 'var(--v3-space-4)' }}>
                  {tier.name}
                </div>
                <h3 style={{ fontFamily: 'var(--v3-font-display)', fontSize: 'var(--v3-text-displayMD)', lineHeight: 1.2, fontWeight: 400, color: 'var(--v3-color-ink)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>{tier.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 'var(--v3-space-5)' }}>
                  <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-headingMD)', color: 'var(--v3-color-ink)', fontWeight: 500 }}>{tier.priceLabel}</span>
                </div>
                <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-ink-secondary)', lineHeight: 1.6, margin: '0 0 var(--v3-space-5)' }}>
                  {tier.blurb}
                </p>
                <div style={{ flex: 1, marginBottom: 'var(--v3-space-5)' }}>
                  {tier.features.map((f, fi) => (
                    <div key={f} style={{ paddingBlock: 'var(--v3-space-3)' }}>
                      {fi > 0 && <Divider variant="light" width="content" style={{ marginBottom: 'var(--v3-space-3)' }} />}
                      <div style={{ display: 'flex', gap: 'var(--v3-space-3)', alignItems: 'flex-start' }}>
                        <span aria-hidden="true" style={{ color: 'var(--v3-color-teal)', fontFamily: 'var(--v3-font-mono)', marginTop: 1, flexShrink: 0 }}>✓</span>
                        <span style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-ink)' }}>{f}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'auto' }}>
                  {isRec ? (
                    <Button
                      variant="primary"
                      accent="teal"
                      onClick={() => {
                        if (realTier) handleSelectTier(realTier.key as any, cycle);
                        else onPrimaryCta();
                      }}
                      style={{ width: '100%' }}
                    >
                      Go Professional
                    </Button>
                  ) : tier.price === 0 ? (
                    <Button
                      variant="ghost"
                      accent="teal"
                      onClick={() => {
                        if (realTier) handleSelectTier(realTier.key as any, cycle);
                        else onPrimaryCta();
                      }}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Start complimentary
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      accent="teal"
                      onClick={() => {
                        if (realTier) handleSelectTier(realTier.key as any, cycle);
                        else onPrimaryCta();
                      }}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Go Executive
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', textAlign: 'center', marginTop: 'var(--v3-space-7)', color: 'var(--v3-color-ink-muted)' }}>
          All tiers include the 11-lens catalog at the mile cost shown. Human coaching sold separately.
        </p>
      </Section>

      {/* ════════════════ 3. COMPARISON TABLE ════════════════ */}
      <Section bg="cream" paddingY="lg">
        <div style={{ marginBottom: 'var(--v3-space-7)' }}>
          <Eyebrow accent="teal">Full comparison</Eyebrow>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--v3-color-divider-strong)' }}>
                <th style={{ textAlign: 'left', padding: '16px 12px', fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', textTransform: 'uppercase', color: 'var(--v3-color-ink-muted)', fontWeight: 500 }}>Feature</th>
                {LANDING_TIERS.map(t => (
                  <th key={t.key} style={{ textAlign: 'left', padding: '16px 12px', fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', textTransform: 'uppercase', color: t.recommended ? 'var(--v3-color-teal)' : 'var(--v3-color-ink)', fontWeight: 500 }}>
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} style={{ borderBottom: '1px solid var(--v3-color-divider)' }}>
                  <td style={{ padding: '16px 12px', fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-ink)', fontWeight: 400 }}>{row.feature}</td>
                  <td style={{ padding: '16px 12px', fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: row.explorer === '—' ? 'var(--v3-color-ink-muted)' : 'var(--v3-color-ink-secondary)' }}>{row.explorer}</td>
                  <td style={{ padding: '16px 12px', fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: row.professional === '—' ? 'var(--v3-color-ink-muted)' : 'var(--v3-color-ink-secondary)' }}>{row.professional}</td>
                  <td style={{ padding: '16px 12px', fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: row.executive === '—' ? 'var(--v3-color-ink-muted)' : 'var(--v3-color-ink-secondary)' }}>{row.executive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ════════════════ 4. HUMAN DEPTH ADD-ONS ════════════════ */}
      <Section bg="white" paddingY="lg" style={{ borderTop: '1px solid var(--v3-color-divider)', borderBottom: '1px solid var(--v3-color-divider)' }}>
        <div style={{ marginBottom: 'var(--v3-space-8)', textAlign: 'center' }}>
          <Eyebrow accent="teal" style={{ textAlign: 'center', display: 'block' }}>Human Depth</Eyebrow>
          <h2 className="reveal" style={{ fontFamily: 'var(--v3-font-display)', fontSize: 'var(--v3-text-displayMD)', lineHeight: 1.2, fontWeight: 400, color: 'var(--v3-color-ink)', margin: '8px 0 16px', letterSpacing: '-0.01em' }}>When the readout deserves a human.</h2>
          <p className="reveal" style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-bodyLG)', color: 'var(--v3-color-ink-secondary)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            A separate add-on layer — not part of any AI membership. Book debriefs by the session or as a sustained partnership.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 0 }}>
          {HUMAN_PACKAGES.map((pkg, idx) => {
            const showLeftBorder = idx > 0;
            return (
              <div
                key={pkg.name}
                className="reveal"
                style={{
                  padding: 'var(--v3-space-7) var(--v3-space-6)',
                  borderLeft: showLeftBorder ? '1px solid var(--v3-color-divider)' : 'none',
                }}
              >
                {pkg.recommended && (
                  <div style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', textTransform: 'uppercase', color: 'var(--v3-color-teal)', fontWeight: 500, marginBottom: 'var(--v3-space-4)' }}>
                    RECOMMENDED
                  </div>
                )}
                <div style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', textTransform: 'uppercase', color: 'var(--v3-color-ink-muted)', marginBottom: pkg.recommended ? 'var(--v3-space-2)' : 'var(--v3-space-4)' }}>
                  {pkg.name}
                </div>
                <h3 style={{ fontFamily: 'var(--v3-font-display)', fontSize: 'var(--v3-text-headingLG)', lineHeight: 1.3, fontWeight: 400, color: 'var(--v3-color-ink)', margin: '0 0 4px' }}>{pkg.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 'var(--v3-space-5)' }}>
                  <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-headingMD)', color: 'var(--v3-color-ink)', fontWeight: 500 }}>{pkg.price}</span>
                  <span style={{ fontFamily: 'var(--v3-font-mono)', color: 'var(--v3-color-ink-muted)', fontSize: 'var(--v3-text-label)' }}>· {pkg.sessions}</span>
                </div>
                <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-ink-secondary)', lineHeight: 1.6, margin: '0 0 var(--v3-space-6)' }}>
                  {pkg.blurb}
                </p>
                {pkg.recommended ? (
                  <Button variant="primary" accent="teal" href="/debrief/book" style={{ width: '100%' }}>
                    Book a debrief
                  </Button>
                ) : (
                  <Button variant="ghost" accent="teal" href="/debrief/book" style={{ width: '100%', justifyContent: 'center' }}>
                    Book a debrief
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* ════════════════ 5. FAQ ════════════════ */}
      <Section bg="cream" paddingY="lg">
        <div style={{ maxWidth: 760 }}>
          <div style={{ marginBottom: 'var(--v3-space-7)' }}>
            <Eyebrow accent="teal">FAQ</Eyebrow>
            <h2 className="reveal" style={{ fontFamily: 'var(--v3-font-display)', fontSize: 'var(--v3-text-displayMD)', lineHeight: 1.2, fontWeight: 400, color: 'var(--v3-color-ink)', margin: '8px 0 0', letterSpacing: '-0.01em' }}>Questions, answered.</h2>
          </div>
          <div>
            {FAQ_ITEMS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: '1px solid var(--v3-color-divider)' }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: 'var(--v3-space-5) 0',
                      background: 'transparent',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 'var(--v3-space-4)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--v3-space-4)' }}>
                      <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', textTransform: 'uppercase', color: 'var(--v3-color-teal)', fontWeight: 500, flexShrink: 0 }}>
                        Q{i + 1}
                      </span>
                      <span style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-headingMD)', lineHeight: 1.4, color: 'var(--v3-color-ink)', fontWeight: 400 }}>{item.q}</span>
                    </div>
                    <ChevronDown
                      aria-hidden="true"
                      size={20}
                      style={{
                        color: 'var(--v3-color-ink-muted)',
                        flexShrink: 0,
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform var(--v3-dur) var(--v3-ease)',
                      }}
                    />
                  </button>
                  {open && (
                    <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-ink-secondary)', lineHeight: 1.6, margin: '0 0 var(--v3-space-5) var(--v3-space-8)', maxWidth: 600 }}>
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ════════════════ 6. FINAL CTA (dark, inverted) ════════════════ */}
      <Section bg="dark" paddingY="xl">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow accent="teal" style={{ textAlign: 'center', display: 'block' }}>Get started</Eyebrow>
          <h2 style={{ fontFamily: 'var(--v3-font-display)', fontSize: 'var(--v3-text-displayLG)', lineHeight: 1.15, margin: '8px 0 16px', color: 'var(--v3-color-paper)', fontWeight: 400, letterSpacing: '-0.02em' }}>
            Begin where you are.
          </h2>
          <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-bodyLG)', lineHeight: 1.6, color: 'var(--v3-color-paper-secondary)', margin: '0 0 32px' }}>
            No form to fill out first. The conversation is the onboarding.
          </p>
          <Button variant="primary" accent="teal" href="/nexus/chat" style={{ paddingInline: '32px' }}>
            Begin with your positioning
          </Button>
        </div>
      </Section>

      {/* ════════════════ 7. FOOTER ════════════════ */}
      <Section bg="white" paddingY="md" style={{ borderTop: '1px solid var(--v3-color-divider)', paddingBlock: 'var(--v3-space-7)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--v3-space-4)' }}>
          <Link to="/" style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', fontWeight: 500, color: 'var(--v3-color-ink)', textDecoration: 'none', textTransform: 'uppercase' }}>
            NEXUS.
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--v3-space-6)', flexWrap: 'wrap' }}>
            <Link to="/nexus/chat" style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-ink-secondary)', textDecoration: 'none', fontWeight: 400 }}>Chat</Link>
            <Link to="/#lenses" style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-ink-secondary)', textDecoration: 'none', fontWeight: 400 }}>Lenses</Link>
          </div>
          <p style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)', letterSpacing: 'var(--v3-tracking-label)', color: 'var(--v3-color-ink-muted)', margin: 0 }}>Your context stays yours.</p>
        </div>
      </Section>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .v3-container > [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          .v3-container > [style*="grid-template-columns: repeat(3"] > * {
            border-left: none !important;
            border-top: 1px solid var(--v3-color-divider);
          }
          .v3-container > [style*="grid-template-columns: repeat(3"] > *:first-child {
            border-top: none !important;
          }
          .v3-root[style*="justify-content: space-between"] {
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}

export default PricingPage;
