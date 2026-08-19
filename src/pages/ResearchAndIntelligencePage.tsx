/**
 * Phase V3 — Pillar 1: Research & Intelligence.
 *
 * Long-form 8-section pillar template, teal-first accent (Tier B,
 * research/data product). Heavy typography, data-tables feel,
 * monochrome editorial layout.
 *
 * URLs: /research (new marketing pillar route under MarketingLayout).
 *
 * All copy faithful to existing LYC Intelligence positioning:
 * references to diagnostics, NEXUS, benchmarks, 47 markets, 20-year
 * APAC placement data. No invented markets or numbers.
 *
 * Banned-word status: No Tier-1 words. Tier-2 label "assessment(s)" is
 * avoided on user-facing lines; internal catalog constants keep their
 * identifiers (they're not copy).
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
    title: 'Leadership diagnostics',
    description:
      'Six validated leadership instruments — Flagship CPI, LEAP, SPARK, IMPACT, PRISM, plus the full Advisory suite — scored against a 20-year APAC placement population. Each readout uses real executive benchmarks, not an abstract norm group.',
    href: '/nexus/lenses',
    cta: 'Browse diagnostics',
  },
  {
    label: '02',
    title: 'Compensation and seniority benchmarks',
    description:
      'Cross-border compensation bands for C-suite, business unit head, and VP roles across 47 markets. Figures drawn from actual placements and verified annual comp cycles.',
    href: '/pricing',
    cta: 'Request a benchmark readout',
  },
  {
    label: '03',
    title: 'Company movements and succession watch',
    description:
      'A continuous view of confirmed board appointments, C-suite rotations, and PE-backed leadership transitions in APAC. Updated in-week, not quarterly.',
    href: '/nexus/chat',
    cta: 'Ask NEXUS',
  },
  {
    label: '04',
    title: 'Archetype and candidate motion data',
    description:
      'Distribution, overlap, and transition patterns across the 11 diagnostic archetypes. Understand how a typical COO archetype moves from G400 to Series C, or how board-ready IMPACT profiles shift between mandates.',
    href: '/match',
    cta: 'Open match surface',
  },
] as const;

const STEPS = [
  {
    number: '01',
    title: 'Frame the question',
    description:
      'Every research engagement starts with a single precise question. NEXUS walks you through framing: geography, seniority band, industry, and the decision you need the research to support.',
  },
  {
    number: '02',
    title: 'Diagnostic inputs',
    description:
      'If the question involves a person or team, we pull the relevant diagnostic readouts. Archetype, percentile benchmarks, derailment signals — all already structured, all comparable.',
  },
  {
    number: '03',
    title: 'Market cross-reference',
    description:
      'We cross-reference the diagnostic layer against the placement database: comparable roles, comparable companies, comparable timelines. Outliers are flagged explicitly.',
  },
  {
    number: '04',
    title: 'Written readout',
    description:
      'A written memorandum, not a deck. Findings, confidence bands, and one clear recommendation section. Sent as a document you can pass to a board or committee verbatim.',
  },
] as const;

const USE_CASES = [
  {
    label: '01 · CEO IN-THE-WINGS',
    title: 'Assessing a successor against your actual bench',
    description:
      'Before a CEO transition, run the bench through the CPI and IMPACT diagnostics. Compare against a reference set of recent first-time CEO placements in your sector.',
  },
  {
    label: '02 · COMP COMMITTEE',
    title: 'Compensation ranges for a newly created role',
    description:
      'A Chief AI Officer, a Chief China Officer, a combined CFO-COO. Get the base/variable/long-term comp band for the role before you go to the headhunter.',
  },
  {
    label: '03 · GROWTH EQUITY',
    title: 'Management readiness ahead of a minority cheque',
    description:
      'Run the founding team through SPARK and LEAP. Get a written view on where AI exposure gaps and decision-style risks will be visible to the next stage investor.',
  },
] as const;

const PRICING_TIERS = ['Executive Introduction', 'Professional', 'Executive Advisory'] as const;
const PRICING_ROWS = [
  {
    label: 'Full diagnostic library',
    values: ['CPI only', true, true] as const,
  },
  {
    label: 'Archetype percentile benchmarks',
    values: [false, true, true] as const,
  },
  {
    label: 'Compensation benchmarks (role × market)',
    values: [false, true, true] as const,
  },
  {
    label: 'Written market memoranda',
    values: [false, 'On request', true] as const,
  },
  {
    label: 'Dedicated research lead',
    values: [false, false, true] as const,
  },
  {
    label: 'Monthly movement digest',
    values: [false, 'Email', 'Slack + email'] as const,
  },
] as const;

const RELATED = [
  {
    dateLabel: 'JUL 2026',
    title: 'China CEO Transitions H1 2026',
    excerpt:
      'A readout of 114 confirmed C-suite appointments in mainland China, split by sector, sponsor type, and internal vs. external hire ratio.',
    href: '/reports/china-ceo-h1-2026',
  },
  {
    dateLabel: 'MAY 2026',
    title: 'Chief AI Officer: Archetype Distribution',
    excerpt:
      'The 3 COO-adjacent archetypes that over-index in first-wave CAIO appointments, and why some CTO transitions into the role fail inside quarter 3.',
    href: '/reports/caio-archetypes-2026',
  },
  {
    dateLabel: 'APR 2026',
    title: 'Board Compensation in SGX-listed Companies',
    excerpt:
      'Non-executive director retainer, committee chair retainer, and equity mix across the SGX Mainboard mid- and large-cap sample.',
    href: '/reports/sgx-board-comp-2026',
  },
] as const;

export function ResearchAndIntelligencePage(): React.ReactElement {
  useEffect(() => {
    document.title = 'Research & Intelligence — LYC Intelligence';
  }, []);

  return (
    <>
      <SEO page="default" />

      {/* ── 1. Page Hero (Tier B — teal-first, cream, divider after) ── */}
      <Section bg="cream" paddingY="xl">
        <PageHeader
          eyebrow="Pillar 01 · Research"
          eyebrowAccent="teal"
          headline="A continuous view of the executive surface."
          xl={false}
          lead="Market motion, compensation benchmarks, candidate movements, and company shifts that move faster than quarterly reports. Built on 20 years of LYC Partners placement data across APAC."
          cta={
            <>
              <Button
                variant="primary"
                accent="teal"
                href="/nexus/lenses"
                onClick={() =>
                  trackCTA({
                    location: 'research_hero',
                    label: 'Browse diagnostics',
                    destination: '/nexus/lenses',
                  })
                }
              >
                Browse diagnostics
              </Button>
              <Button
                variant="secondary"
                accent="teal"
                href="/nexus/chat"
                onClick={() =>
                  trackCTA({
                    location: 'research_hero',
                    label: 'Ask a research question',
                    destination: '/nexus/chat',
                  })
                }
              >
                Ask a research question
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
        {/* ── 2. Overview — "What it is" (SplitSection 2-col) ─────── */}
        <SplitSection
          label="Overview"
          accent="teal"
          title="Decision-grade research, not press-research."
        >
          <p style={{ margin: 0 }}>
            Research & Intelligence at LYC is a private research desk built for executives,
            boards, and investment teams. We use the same instruments and data that underpin
            the diagnostic suite — Flagship CPI, PRISM, SPARK, IMPACT, and the Advisory
            readouts — plus a 20-year placement database across 47 APAC markets.
          </p>
          <p style={{ margin: 0 }}>
            Deliverables are written memoranda or structured benchmark tables. No decks. No
            generic industry summaries. Every finding includes explicit confidence bands and,
            where the data is thin, a line that says so.
          </p>
          <p style={{ margin: 0 }}>
            You use this pillar when you need an answer that is too specific for a public
            report and too high-stakes to infer from a press release.
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
                        location: 'research_capability',
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

        {/* ── 4. How it works / Methodology ──────────────────────── */}
        <SplitSection
          label="How it works"
          accent="teal"
          title="Four phases, start to signed-off recommendation."
        >
          <p style={{ margin: 0 }}>
            The process is deliberately short. Research engagements typically run 3–10
            business days from kickoff to final readout. Every phase has a written output.
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

        {/* ── 5. Who it's for / Use cases ────────────────────────── */}
        <UseCaseColumns items={USE_CASES} labelAccent="teal" />

        {/* ── 6. Pricing / Tiers (text-first comparison) ────────── */}
        <div style={{ paddingBlock: 'var(--v3-space-9)' }}>
          <SplitSection
            label="Engagement tiers"
            accent="teal"
            title="Three ways to buy research."
          >
            <p style={{ margin: 0 }}>
              Tiers align with the subscription model. Entry is a single diagnostic readout.
              Professional adds the research desk on request. Executive Advisory is a
              retained relationship with a dedicated lead.
            </p>
          </SplitSection>
          <div style={{ marginTop: 'var(--v3-space-6)' }}>
            <PricingTextTable tiers={PRICING_TIERS} rows={PRICING_ROWS} accent="teal" />
          </div>
        </div>

        {/* ── 7. Related Resources ──────────────────────────────── */}
        <RelatedResources items={RELATED} sectionLabel="Recent research notes" />
      </div>

      {/* ── 8. CTA Section (full-width, cream bg, teal accent button) ─ */}
      <Section bg="cream" paddingY="xl">
        <div style={{ maxWidth: '70ch', marginInline: 'auto', textAlign: 'left' }}>
          <Eyebrow accent="teal">Engage</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-md)',
              lineHeight: 'var(--v3-leading-display-md)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-ink)',
              margin: '16px 0 16px',
              maxWidth: '26ch',
            }}
          >
            Bring your question. We&rsquo;ll give you the readout you can take to the board.
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
            Start with NEXUS or book a scoping call — both routes lead to the same research
            desk.
          </p>
          <div style={{ display: 'flex', gap: 'var(--v3-space-5)', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              accent="teal"
              href="/nexus/chat"
              onClick={() =>
                trackCTA({
                  location: 'research_cta',
                  label: 'Ask your question',
                  destination: '/nexus/chat',
                })
              }
            >
              Ask your question
            </Button>
            <Button
              variant="secondary"
              accent="teal"
              href="/debrief/book"
              onClick={() =>
                trackCTA({
                  location: 'research_cta',
                  label: 'Book a scoping call',
                  destination: '/debrief/book',
                })
              }
            >
              Book a scoping call
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

export default ResearchAndIntelligencePage;
