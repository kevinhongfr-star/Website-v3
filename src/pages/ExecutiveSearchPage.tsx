/**
 * Phase V3 — Pillar 3: Executive Search.
 *
 * Long-form 8-section pillar template, teal accent, credibility-driven,
 * data-light, relationship-focused.
 *
 * URLs: /search (new marketing pillar route under MarketingLayout).
 *
 * Copy faithful to existing LYC executive-search positioning:
 * under-the-radar senior matches, 500+ placements across 47 markets,
 * 20 years of APAC executive search, LYC Partners retained mandate model,
 * match surface + CPI/IMPACT candidate readouts.
 *
 * Banned-words: Tier-1 clear. Tier-2: copy says "diagnostic(s)" where the
 * marketing label would otherwise read "assessment"; code constants and
 * route paths untouched.
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
  SplitSection,
  CapabilityRow,
  MethodologyStep,
  UseCaseColumns,
  PricingTextTable,
  RelatedResources,
} from '@/components/ui/v3';

const CAPABILITIES = [
  {
    label: '01',
    title: 'Retained search',
    description:
      'A single retained mandate for a named role, typically C-suite, board member, or country/regional head. Research, longlist, shortlist, referencing, offer and close. One point of contact from kickoff to day 30.',
    href: '/match',
    cta: 'Explore the match surface',
  },
  {
    label: '02',
    title: 'Under-the-radar mapping',
    description:
      'A discrete executive surface map for a role you are not yet ready to open. Confidential, non-approach: deliverable is a written shortlist of real candidates with diagnostic fit signals and tenure bands.',
    href: '/nexus/chat',
    cta: 'Start a mapping brief',
  },
  {
    label: '03',
    title: 'Succession mapping',
    description:
      'A 6- or 12-month succession exercise for one or more named roles. Internal bench and external candidates side-by-side. Diagnostic-based side-by-side comparison with a Chair-ready closeout readout.',
    href: '/nexus/lenses/cpi',
    cta: 'CPI for succession',
  },
  {
    label: '04',
    title: 'Board appointments',
    description:
      'NED and committee chair mandates. Reference-heavy, governance-focused, with IMPACT diagnostics on every final shortlist candidate alongside the standard biographic submission.',
    href: '/nexus/lenses/impact',
    cta: 'See IMPACT for boards',
  },
] as const;

const STEPS = [
  {
    number: '01',
    title: 'Define the mandate',
    description:
      'A kickoff meeting with the Chair, Hiring Sponsor, and — where appropriate — the Nominating & Governance Committee lead. Output: a one-page mandate brief with role scope, search committee, and calendar.',
  },
  {
    number: '02',
    title: 'Research and longlist',
    description:
      'A 2–3 week research phase producing a longlist of 40–70 real executives drawn from market knowledge and 20 years of placement data. No scraped lists, no LinkedIn keyword dumps.',
  },
  {
    number: '03',
    title: 'Shortlist, referencing, diagnostics',
    description:
      'A shortlist of 5–7 candidates, each with a written profile, an IMPACT or CPI diagnostic readout, and referencing that goes beyond the three supplied names.',
  },
  {
    number: '04',
    title: 'Close and onboarding support',
    description:
      'Offer, negotiation, and close. A mandatory 30-day check-in and a day-90 readout for the incoming executive and the hiring committee. No close fee becomes due before day 30.',
  },
] as const;

const USE_CASES = [
  {
    label: '01 · C-SUITE HIRE',
    title: 'First-time Country Head, China',
    description:
      'A US-headquartered company entering mainland China. A Country Head role that sits between the APAC CEO and the China entity board. Under-the-radar mapping first, retained mandate after.',
  },
  {
    label: '02 · BOARD',
    title: 'Independent director, fintech sponsor',
    description:
      'A regulated fintech seeking a second independent director with specific regional regulatory and risk committee experience. IMPACT diagnostic, regulatory reference, and NomCo readout.',
  },
  {
    label: '03 · PORTFOLIO',
    title: 'Portfolio CFO, Series D',
    description:
      'A growth-equity portfolio company replacing a founding CFO ahead of international expansion. Four-month window, CFO CPI bench against two reference companies in the sector.',
  },
] as const;

const PRICING_TIERS = ['Mapping exercise', 'Retained mandate', 'Succession retainer'] as const;
const PRICING_ROWS = [
  {
    label: 'Engagement type',
    values: ['Discrete mapping', 'Single retained search', '6 or 12 months'] as const,
  },
  {
    label: 'Longlist deliverable',
    values: [true, true, true] as const,
  },
  {
    label: 'Approach and shortlist',
    values: [false, true, true] as const,
  },
  {
    label: 'Diagnostic readouts for shortlist',
    values: [false, true, true] as const,
  },
  {
    label: 'Referencing and regulatory checks',
    values: [false, true, true] as const,
  },
  {
    label: 'Day-30 and day-90 onboarding check-in',
    values: [false, true, true] as const,
  },
] as const;

const RELATED = [
  {
    dateLabel: 'AUG 2026',
    title: 'Country Head Mandates in APAC: Lessons from 87 engagements',
    excerpt:
      'The two mandate-structure decisions that most consistently predict a successful close inside the original timeline.',
    href: '/search/country-head-mandates',
  },
  {
    dateLabel: 'MAY 2026',
    title: 'Under-the-radar Maps: What they are, what they are not',
    excerpt:
      'A guide to buying an executive surface map. When to commission one, what a good one contains, and how to avoid a thinly-veiled longlist sell.',
    href: '/search/under-the-radar-maps',
  },
  {
    dateLabel: 'MAR 2026',
    title: 'Board Mandates: NomCo-facing readouts',
    excerpt:
      'The three sections that belong in every shortlist submission to a Nominating & Governance Committee, and the three items that do not.',
    href: '/search/board-mandate-readouts',
  },
] as const;

// Insert: Credibility bar (4 stats) — executive search pillar is credibility-
// driven, so a "Track record" inline stats block sits between section 3 and
// section 4 (no cards, pure editorial: big serif numbers + mono labels).
function TrackRecordBar() {
  const STATS = [
    { v: '500+', l: 'Senior placements' },
    { v: '47', l: 'Markets covered' },
    { v: '20yr', l: 'LYC Partners heritage' },
    { v: '93%', l: 'In-role retention at 24 months' },
  ] as const;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--v3-space-5)',
        borderTop: '1px solid var(--v3-color-divider)',
        borderBottom: '1px solid var(--v3-color-divider)',
        paddingBlock: 'var(--v3-space-8)',
      }}
      className="v3-search-stats"
    >
      {STATS.map((s) => (
        <div key={s.l}>
          <div
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontSize: 'var(--v3-text-display-md)',
              lineHeight: 1.1,
              fontWeight: 300,
              color: 'var(--v3-color-teal)',
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
      <style>{`
        @media (max-width: 767px) {
          .v3-search-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

export function ExecutiveSearchPage(): React.ReactElement {
  useEffect(() => {
    document.title = 'Executive Search — LYC Intelligence';
  }, []);

  return (
    <>
      <SEO page="default" />

      {/* ── 1. Page Hero (teal accent, cream bg) ───────────────── */}
      <Section bg="cream" paddingY="xl">
        <PageHeader
          eyebrow="Pillar 03 · Executive Search"
          eyebrowAccent="teal"
          headline="Under-the-radar senior matches. 500+ placements across 47 markets."
          xl={false}
          lead="Retained mandates for C-suite, board, and country-level roles across APAC. Diagnostic-backed shortlists, structured referencing, and a day-90 onboarding check-in on every placement."
          cta={
            <>
              <Button
                variant="primary"
                accent="teal"
                href="/match"
                onClick={() =>
                  trackCTA({
                    location: 'search_hero',
                    label: 'Explore match surface',
                    destination: '/match',
                  })
                }
              >
                Explore the match surface
              </Button>
              <Button
                variant="secondary"
                accent="teal"
                href="/debrief/book"
                onClick={() =>
                  trackCTA({
                    location: 'search_hero',
                    label: 'Discuss a mandate',
                    destination: '/debrief/book',
                  })
                }
              >
                Discuss a mandate
              </Button>
            </>
          }
        />
      </Section>
      <Divider variant="strong" width="content" />

      <div
        className="v3-root"
        style={{ background: 'var(--v3-color-cream)', color: 'var(--v3-color-ink)' }}
      >
        {/* ── 2. Overview — "What it is" (SplitSection 2-col) ───── */}
        <SplitSection
          label="Overview"
          accent="teal"
          title="Retained search, not contingency. Relationship-led, diagnostic-backed."
        >
          <p style={{ margin: 0 }}>
            Executive Search at LYC is run as a retained practice. Every mandate has a single
            named consultant lead, a single point of contact, and a written scope document
            before any work starts. We do not run contingency mandates.
          </p>
          <p style={{ margin: 0 }}>
            Shortlisted candidates are supported by IMPACT or CPI diagnostic readouts where
            appropriate, and referencing always extends beyond the three supplied names. The
            close fee only becomes due after day 30 of the successful candidate joining.
          </p>
        </SplitSection>

        {/* ── 3. Capabilities / Service List ──────────────────────── */}
        <div style={{ paddingBlock: 'var(--v3-space-9)' }}>
          <Eyebrow accent="teal" style={{ marginBottom: 'var(--v3-space-5)' }}>
            Capabilities
          </Eyebrow>
          <Divider variant="light" width="content" />
          {CAPABILITIES.map((c) => (
            <React.Fragment key={c.label}>
              <CapabilityRow
                label={c.label}
                title={c.title}
                description={c.description}
                cta={
                  <Button
                    variant="ghost"
                    accent="teal"
                    href={c.href}
                    onClick={() =>
                      trackCTA({
                        location: 'search_capability',
                        label: c.cta,
                        destination: c.href,
                        context_id: c.label,
                      })
                    }
                  >
                    {c.cta}
                  </Button>
                }
              />
              <Divider variant="light" width="content" />
            </React.Fragment>
          ))}
        </div>

        {/* ── Insert: Track record bar ──────────────────────────── */}
        <TrackRecordBar />

        {/* ── 4. How it works / Methodology ──────────────────────── */}
        <div style={{ paddingBlock: 'var(--v3-space-9)' }}>
          <SplitSection
            label="How a mandate runs"
            accent="teal"
            title="Four phases. One consultant lead from kickoff to day-90."
          >
            <p style={{ margin: 0 }}>
              Search timelines vary — a board mandate typically runs longer than a G400 CFO
              replacement. Regardless of length, every mandate follows the same four phases
              and the same written deliverable sequence.
            </p>
          </SplitSection>
          <Divider variant="light" width="content" />
          {STEPS.map((s) => (
            <React.Fragment key={s.number}>
              <MethodologyStep
                number={s.number}
                title={s.title}
                description={s.description}
                accent="teal"
              />
              <Divider variant="light" width="content" />
            </React.Fragment>
          ))}
        </div>

        {/* ── 5. Who it's for / Use cases ────────────────────────── */}
        <UseCaseColumns items={USE_CASES} labelAccent="teal" />

        {/* ── 6. Pricing / Tiers (text-first comparison) ────────── */}
        <div style={{ paddingBlock: 'var(--v3-space-9)' }}>
          <SplitSection
            label="Mandate types"
            accent="teal"
            title="Three ways to engage a search mandate."
          >
            <p style={{ margin: 0 }}>
              A one-off mapping brief, a retained mandate for a single role, or a 6–12 month
              succession retainer across multiple named roles. Fees and success terms are
              written into the mandate brief at the start of each engagement.
            </p>
          </SplitSection>
          <div style={{ marginTop: 'var(--v3-space-6)' }}>
            <PricingTextTable tiers={PRICING_TIERS} rows={PRICING_ROWS} accent="teal" />
          </div>
        </div>

        {/* ── 7. Related Resources ──────────────────────────────── */}
        <RelatedResources items={RELATED} sectionLabel="Mandate guides" />
      </div>

      {/* ── 8. CTA Section (full-width dark bg, teal accent) ─── */}
      <Section bg="dark" paddingY="xl">
        <div style={{ maxWidth: '70ch', marginInline: 'auto', textAlign: 'left' }}>
          <Eyebrow accent="auto">Start a discussion</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-md)',
              lineHeight: 'var(--v3-leading-display-md)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-paper)',
              margin: '16px 0 16px',
              maxWidth: '26ch',
            }}
          >
            Talk us through the role. We&rsquo;ll come back with a one-page mandate brief.
          </h2>
          <p
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontWeight: 400,
              fontSize: 'var(--v3-text-body-lg)',
              lineHeight: 'var(--v3-leading-body-lg)',
              color: 'var(--v3-color-paper-secondary)',
              maxWidth: '52ch',
              margin: '0 0 32px',
            }}
          >
            Most clients start with a 30-minute call, followed by a written mandate scope
            note within two business days. No fees are due before the brief is signed.
          </p>
          <div style={{ display: 'flex', gap: 'var(--v3-space-5)', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              accent="teal"
              href="/debrief/book"
              onClick={() =>
                trackCTA({
                  location: 'search_cta',
                  label: 'Book a mandate call',
                  destination: '/debrief/book',
                })
              }
            >
              Book a mandate call
            </Button>
            <Button
              variant="secondary"
              accent="teal"
              href="/match"
              onClick={() =>
                trackCTA({
                  location: 'search_cta',
                  label: 'Browse the match surface',
                  destination: '/match',
                })
              }
            >
              Browse the match surface
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

export default ExecutiveSearchPage;
