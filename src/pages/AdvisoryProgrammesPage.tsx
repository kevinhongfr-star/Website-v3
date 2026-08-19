/**
 * Phase V3 — Pillar 2: Advisory / Programmes.
 *
 * Long-form 8-section pillar template, fuchsia accent, human/quote-driven.
 * Focus: coaching, team reviews, leadership acceleration, board effectiveness.
 *
 * URLs: /advisory (new marketing pillar route under MarketingLayout).
 *
 * Copy faithful to existing LYC positioning: retained programmes,
 * diagnostic-led team reviews, board effectiveness readouts, DEB debrief
 * programme, 1:1 executive coach pairings, quarterly cycle cadence.
 *
 * Banned-words: Tier-1 free (no architecture/platform/leverage etc.).
 * Tier-2: marketing copy uses "diagnostic(s)" labels; route/code paths
 * that read "assessment" are untouched (not user-facing copy for display).
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
    title: '1:1 Executive Coaching',
    description:
      'A single coach paired to one executive for a 6- or 12-month programme. Diagnostic-based coaching plan: each session is tied to a dimension from the CPI, IMPACT, or LEAP readout rather than open-ended conversation.',
    href: '/debrief',
    cta: 'Programme structure',
  },
  {
    label: '02',
    title: 'Team Reviews & Offsites',
    description:
      'A full-team diagnostic pass plus a structured offsite, typically two days. Outputs: a written team heatmap, a shared team priorities document, and a 90-day action plan with named owners.',
    href: '/debrief/book',
    cta: 'Book an offsite scoping call',
  },
  {
    label: '03',
    title: 'Board Effectiveness Reviews',
    description:
      'A confidential board effectiveness cycle using IMPACT diagnostics plus structured director interviews. Readouts delivered directly to the Chair, typically alongside the annual board evaluation cycle.',
    href: '/nexus/lenses/impact',
    cta: 'See IMPACT',
  },
  {
    label: '04',
    title: 'Leadership Acceleration Programmes',
    description:
      'A retained 6-month programme for a named senior cohort — high-potentials, China country leadership, first-time GMs. Mix of group workshops, individual coaching, and periodic benchmark readouts.',
    href: '/pricing',
    cta: 'Professional tier',
  },
] as const;

const STEPS = [
  {
    number: '01',
    title: 'Scope the cohort and the outcome',
    description:
      'Every engagement starts with two questions: who is the cohort, and what decision or outcome do you need the programme to support? No scoping decks — a 30-minute call and a short written note.',
  },
  {
    number: '02',
    title: 'Diagnostic baseline',
    description:
      'Each participant in the cohort completes the relevant diagnostic(s) before the first session. Results are shared individually with each participant, plus with the programme lead only in aggregate.',
  },
  {
    number: '03',
    title: 'Kickoff and cadence',
    description:
      'A single kickoff session sets the plan, the cadence (typically bi-weekly 1:1, monthly group), and the programme milestone dates. No long contracts — all work sits inside a defined end date.',
  },
  {
    number: '04',
    title: 'Midpoint check and closeout memorandum',
    description:
      'At the midpoint we share a written status note with the programme sponsor. At closeout we share a full readout: what moved, what didn\'t, and recommended next-phase work (if any).',
  },
] as const;

const USE_CASES = [
  {
    label: '01 · NEW CEO',
    title: 'First 100 days for an external-hire CEO',
    description:
      'A 100-day programme for a CEO hired from outside. Focus areas: stakeholder reading, board communication calibration, and transition pacing for the incumbent leadership team.',
  },
  {
    label: '02 · PE OWNER',
    title: 'Portfolio management team review',
    description:
      'A portfolio company team review 60 days after close. Output: a written team heatmap and a prioritised list of where to invest and where to move quickly.',
  },
  {
    label: '03 · CHAIR',
    title: 'Annual board effectiveness review',
    description:
      'A structured board cycle alongside the annual evaluation. IMPACT diagnostics for the board and committee chairs plus confidential director interviews.',
  },
] as const;

const PRICING_TIERS = [
  'Introductory session',
  'Retained programme',
  'Board / advisory retainer',
] as const;
const PRICING_ROWS = [
  {
    label: 'Duration',
    values: ['90 minutes', '6 or 12 months', '12 months rolling'] as const,
  },
  {
    label: 'Diagnostic baseline',
    values: ['CPI only', true, true] as const,
  },
  {
    label: 'Individual coaching',
    values: [false, true, true] as const,
  },
  {
    label: 'Team or cohort sessions',
    values: [false, 'Optional', true] as const,
  },
  {
    label: 'Chair or board-level readout',
    values: [false, false, true] as const,
  },
  {
    label: 'Debrief intelligence (DEX)',
    values: [false, true, true] as const,
  },
] as const;

const RELATED = [
  {
    dateLabel: 'AUG 2026',
    title: 'Board Effectiveness Reviews: A short guide for Chairs',
    excerpt:
      'When to run a review alongside the annual cycle, how to structure the readout, and what Chair-level actions typically follow.',
    href: '/advisory/board-effectiveness-guide',
  },
  {
    dateLabel: 'JUN 2026',
    title: '100-day Programmes for External-hire CEOs',
    excerpt:
      'The four dimensions we monitor most closely in the first 90 days, and the two warning signals that predict a need for a mid-cycle reset.',
    href: '/advisory/100-day-ceo-playbook',
  },
  {
    dateLabel: 'FEB 2026',
    title: 'Team Reviews Post-close: Lessons from 38 portfolio programmes',
    excerpt:
      'What we learned running 38 portfolio team reviews in the first 90 days after close. Where sponsors usually want more detail, and where they typically move too fast.',
    href: '/advisory/portfolio-team-reviews',
  },
] as const;

// Pull-quote for section 2/3 (Advisory is quote-driven per brief).
// Italic Crimson Pro, pure editorial — no quote box, no avatar card.
function PullQuote() {
  return (
    <Section bg="dark" paddingY="lg">
      <div style={{ maxWidth: '64ch', marginInline: 'auto' }}>
        <Eyebrow accent="auto">Field note</Eyebrow>
        <blockquote
          style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'var(--v3-text-display-lg)',
            lineHeight: 'var(--v3-leading-display-lg)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-paper)',
            margin: '20px 0 32px',
            maxWidth: '28ch',
          }}
        >
          &ldquo;The best coaching engagements are short, written down, and tied to something the
          board already cares about. Everything else is a conversation.&rdquo;
        </blockquote>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 'var(--v3-space-4)',
            alignItems: 'center',
            maxWidth: '40ch',
          }}
        >
          <span aria-hidden style={{
            width: '32px',
            height: '1px',
            background: 'var(--v3-color-fuchsia)',
          }} />
          <div>
            <div
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body-sm)',
                fontWeight: 500,
                color: 'var(--v3-color-paper)',
              }}
            >
              Senior Advisory Lead
            </div>
            <div
              style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 'var(--v3-text-label)',
                letterSpacing: 'var(--v3-tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--v3-color-paper-muted)',
                marginTop: '2px',
              }}
            >
              LYC Intelligence · Advisory Practice
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function AdvisoryProgrammesPage(): React.ReactElement {
  useEffect(() => {
    document.title = 'Advisory & Programmes — LYC Intelligence';
  }, []);

  return (
    <>
      <SEO page="default" />

      {/* ── 1. Page Hero (Tier B — fuchsia accent, cream bg) ─────── */}
      <Section bg="cream" paddingY="xl">
        <PageHeader
          eyebrow="Pillar 02 · Advisory"
          eyebrowAccent="fuchsia"
          headline="Decision-grade counsel. Written memoranda, not slide decks."
          xl={false}
          lead="Coaching, team reviews, leadership acceleration programmes and board effectiveness cycles. Advisory work is retained, diagnostic-based, and documented end-to-end."
          cta={
            <>
              <Button
                variant="primary"
                accent="fuchsia"
                href="/debrief/book"
                onClick={() =>
                  trackCTA({
                    location: 'advisory_hero',
                    label: 'Book a scoping call',
                    destination: '/debrief/book',
                  })
                }
              >
                Book a scoping call
              </Button>
              <Button
                variant="secondary"
                accent="fuchsia"
                href="/pricing"
                onClick={() =>
                  trackCTA({
                    location: 'advisory_hero',
                    label: 'Advisory tiers',
                    destination: '/pricing',
                  })
                }
              >
                Advisory tiers
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
          label="What we do"
          accent="fuchsia"
          title="Retained advisory for named executives, teams, and boards."
        >
          <p style={{ margin: 0 }}>
            Advisory engagements fall into four buckets: 1:1 executive coaching for a named
            individual, a team review for a management team or portfolio company, a retained
            leadership acceleration programme for a cohort, and a board effectiveness review
            for a Chair.
          </p>
          <p style={{ margin: 0 }}>
            Every engagement is diagnostic-first: the first thing that happens is a baseline
            readout. Every engagement has a written closeout. There are no rolling monthly
            contracts without a defined scope and end date.
          </p>
        </SplitSection>
      </div>

      {/* ── Insert: Dark pull-quote (quote-driven style per brief) ── */}
      <PullQuote />

      <div
        className="v3-root"
        style={{ background: 'var(--v3-color-cream)', color: 'var(--v3-color-ink)' }}
      >
        {/* ── 3. Capabilities / Service List ──────────────────────── */}
        <div style={{ paddingBlock: 'var(--v3-space-9)' }}>
          <Eyebrow accent="fuchsia" style={{ marginBottom: 'var(--v3-space-5)' }}>
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
                    accent="fuchsia"
                    href={c.href}
                    onClick={() =>
                      trackCTA({
                        location: 'advisory_capability',
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
          label="How an engagement runs"
          accent="fuchsia"
          title="Four phases, no surprises."
        >
          <p style={{ margin: 0 }}>
            Advisory engagements follow the same structure regardless of cohort size or
            seniority. This is deliberate — it means the programme sponsor always knows what
            is happening when, and what the next written output will be.
          </p>
        </SplitSection>
        <Divider variant="light" width="content" />
        {STEPS.map((s) => (
          <React.Fragment key={s.number}>
            <MethodologyStep
              number={s.number}
              title={s.title}
              description={s.description}
              accent="fuchsia"
            />
            <Divider variant="light" width="content" />
          </React.Fragment>
        ))}

        {/* ── 5. Who it's for / Use cases ────────────────────────── */}
        <UseCaseColumns items={USE_CASES} labelAccent="fuchsia" />

        {/* ── 6. Pricing / Tiers (text-first comparison) ────────── */}
        <div style={{ paddingBlock: 'var(--v3-space-9)' }}>
          <SplitSection
            label="Engagement tiers"
            accent="fuchsia"
            title="Three ways to buy advisory work."
          >
            <p style={{ margin: 0 }}>
              Scope is fixed per engagement. An introductory scoping session, a retained
              programme for an individual, team or cohort, and a board-level retainer for
              Chairs or Nominating & Governance Committee leads.
            </p>
          </SplitSection>
          <div style={{ marginTop: 'var(--v3-space-6)' }}>
            <PricingTextTable tiers={PRICING_TIERS} rows={PRICING_ROWS} accent="fuchsia" />
          </div>
        </div>

        {/* ── 7. Related Resources ──────────────────────────────── */}
        <RelatedResources items={RELATED} sectionLabel="Guides & field notes" />
      </div>

      {/* ── 8. CTA Section (full-width, dark bg, fuchsia accent) ─ */}
      <Section bg="dark" paddingY="xl">
        <div style={{ maxWidth: '70ch', marginInline: 'auto', textAlign: 'left' }}>
          <Eyebrow accent="auto">Start</Eyebrow>
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
            A 30-minute scoping call is always the first step.
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
            Book one, describe the cohort and the outcome, and we&rsquo;ll respond with a
            written scope note within two business days.
          </p>
          <div style={{ display: 'flex', gap: 'var(--v3-space-5)', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              accent="fuchsia"
              href="/debrief/book"
              onClick={() =>
                trackCTA({
                  location: 'advisory_cta',
                  label: 'Book a scoping call',
                  destination: '/debrief/book',
                })
              }
            >
              Book a scoping call
            </Button>
            <Button
              variant="secondary"
              accent="fuchsia"
              href="/pricing"
              onClick={() =>
                trackCTA({
                  location: 'advisory_cta',
                  label: 'Advisory tiers',
                  destination: '/pricing',
                })
              }
            >
              Advisory tiers
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

export default AdvisoryProgrammesPage;
