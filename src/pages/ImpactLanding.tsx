/**
 * W2-4 — IMPACT landing page.
 *
 * Hero diagnostic #3. Board effectiveness. Content verified against
 * akira_source/diagnostic_portfolio/06_scoring_engine_code/impact_config.json
 * (W2-5): 4 dimensions · 10 archetypes · 36 questions · 1-5 Likert.
 *
 * Brand: TIER B — TEAL accent.
 */
import { LandingTemplate, type LandingDimension, type LandingArchetype } from '@/components/templates/LandingTemplate';

const TEAL = '#00897B';
const TEAL_DARK = '#00695C';

// ── IMPACT DATA (verified against akira_source/impact_config.json) ──
// Full name: "Board Effectiveness Diagnostic"

const IMPACT_DIMENSIONS: LandingDimension[] = [
  {
    id: 'D1',
    name: 'Behaviour',
    short: 'Behaviour',
    description:
      'How board members conduct themselves in meetings, debate, challenge, and interact — including conflict patterns and meeting dynamics.',
  },
  {
    id: 'D2',
    name: 'Competency',
    short: 'Competency',
    description:
      'Whether the board has the right skills, composition, and domain expertise to steer the business — including whether capabilities fit the current strategic context.',
  },
  {
    id: 'D3',
    name: 'Process',
    short: 'Process',
    description:
      'Meeting rhythm, agenda design, information flow, decision cadence, and committee structures — whether governance is run on a deliberate operating system.',
  },
  {
    id: 'D4',
    name: 'Outcomes',
    short: 'Outcomes',
    description:
      'What the board actually delivers: strategic decisions, oversight value, risk management, and clear measurable outcomes rather than attendance and input.',
  },
];

// 10 archetypes per akira_source/impact_config.json. Codes assigned A1–A10.
const IMPACT_ARCHETYPES: LandingArchetype[] = [
  { code: 'A1', name: 'High-Performing Board', tagline: 'Behaviour × Process × Outcomes: sets the standard for value-adding governance.' },
  { code: 'A2', name: 'Rubber-Stamp Board', tagline: 'Behaviour low + Process strong — polished procedures, negligible strategic value.' },
  { code: 'A3', name: 'Micromanaging Board', tagline: 'Behaviour interfering with Outcomes — directors operating as shadow management.' },
  { code: 'A4', name: 'Crisis Board', tagline: 'Process collapsed + Outcomes reactive — surviving on firefighting, not governance.' },
  { code: 'A5', name: 'Competency Gap Board', tagline: 'Competency low — wrong skills, wrong composition, wrong fit for the strategic moment.' },
  { code: 'A6', name: 'Sleepwalking Board', tagline: 'Process nominal, Outcomes unmeasured — everyone arrives on time and nothing improves.' },
  { code: 'A7', name: 'Founder-Style Board', tagline: 'Behaviour founder-dominated, Competency shaped around founder context rather than institutional mandate.' },
  { code: 'A8', name: 'Political Board', tagline: 'Behaviour driven by personal and factional alignment instead of organisational outcomes.' },
  { code: 'A9', name: 'Dysfunctional Meeting Board', tagline: 'Behaviour + Process — meeting dynamics so toxic that competent members disengage.' },
  { code: 'A10', name: 'Underperforming Board', tagline: 'Across-dimensions low: requires deliberate board transformation, not incremental adjustment.' },
];

const IMPACT_METHOD_STEPS = [
  {
    mono: '01 · Board Self-Diagnostic',
    title: 'A structured governance self-view.',
    body: 'Thirty-six questions across four dimensions — Behaviour, Competency, Process, Outcomes. Board members, chairs, or company secretaries complete the diagnostic; multi-rater is available in the paid tier.',
  },
  {
    mono: '02 · Dimension Scoring',
    title: 'Four independent effectiveness verdicts.',
    body: 'Each dimension scored from Dysfunctional to High-Performing, with interpretive text grounded in real board operating patterns, not generic governance checklists.',
  },
  {
    mono: '03 · Archetype & Band',
    title: 'Your board archetype and composite band.',
    body: 'A composite 0–100 board effectiveness score, a band from Dysfunctional Board to High-Performing Board, and one of ten board archetypes with its primary intervention.',
  },
];

const IMPACT_WHO_FOR = [
  { title: 'Chairs & company secretaries', desc: 'A structured baseline read before board evaluations, AGMs, or a new chair mandate.' },
  { title: 'Directors and board members', desc: 'Individual directors who want an honest read on the board they serve, separate from institutional feedback cycles.' },
  { title: 'Investors and governance leads', desc: 'Portfolio-level governance intelligence: the first diagnostic to focus specifically on governance efficacy at the board level.' },
];

const IMPACT_DIFFERENT = [
  'Reads the board, not just individual directors. Most board instruments are 360s for individual members. IMPACT scores the board itself.',
  'Four governance-specific dimensions — Behaviour, Competency, Process, Outcomes — built on how boards actually create or destroy value.',
  'Ten archetypes of board operating patterns. From Rubber-Stamp to Sleepwalking to Crisis, each archetype carries a primary intervention.',
  'Governance grounded in real practice, not compliance checklists. A board can be fully compliant and still entirely ineffective — IMPACT measures the gap.',
];

const IMPACT_FAQ = [
  {
    q: 'What is IMPACT?',
    a: 'IMPACT (Board Effectiveness Diagnostic) is a hero diagnostic measuring whether a board actually governs effectively. Four dimensions — Behaviour, Competency, Process, Outcomes — ten archetypes, and a composite 0–100 board effectiveness score.',
  },
  {
    q: 'Who completes IMPACT?',
    a: 'The Executive Introduction tier can be completed by a chair, company secretary, or any single board member. The CPI-integrated multi-rater tier collects reads across the board, with anonymity controls appropriate for board-level reporting.',
  },
  {
    q: 'How is IMPACT different from a standard board evaluation?',
    a: 'Standard board evaluations are compliance exercises with anonymous comments and vague recommendations. This diagnostic produces a composite score across four dimensions, a board archetype, and a concrete intervention — grounded in real operating patterns, not process compliance.',
  },
  {
    q: 'Is board-level data anonymous?',
    a: 'Yes, where the respondent requests it. IMPACT results are private to your LYC Intelligence account. Multi-rater aggregation, anonymity controls, and report segmentation are configurable in the paid tier.',
  },
];

export function ImpactLanding() {
  return (
    <LandingTemplate
      code="IMPACT"
      name="IMPACT"
      fullName="Board Effectiveness Diagnostic"
      tagline="Board effectiveness across Behaviour, Competency, Process, Outcomes. Ten archetypes. A real governance read, not a compliance exercise."
      heroDescription="Is your board actually governing, or just meeting? IMPACT scores four dimensions of board effectiveness, classifies your board across ten archetypes, and delivers a concrete governance read in approximately twelve minutes."
      categoryLabel="Board Effectiveness"
      tierBadge="HERO DIAGNOSTIC"
      heroH1="Boards can be fully compliant and entirely ineffective — know the difference"
      heroEyebrow="IMPACT · BOARD EFFECTIVENESS"
      accent={TEAL}
      accentDark={TEAL_DARK}
      dimensions={IMPACT_DIMENSIONS}
      archetypes={IMPACT_ARCHETYPES}
      methodologySteps={IMPACT_METHOD_STEPS}
      whoItsFor={IMPACT_WHO_FOR}
      whatMakesDifferent={IMPACT_DIFFERENT}
      faq={IMPACT_FAQ}
      stats={[
        { num: '4', label: 'DIMENSIONS', sub: 'of board operation' },
        { num: '10', label: 'ARCHETYPES', sub: 'board operating patterns' },
        { num: '36', label: 'QUESTIONS', sub: '~12 minutes' },
      ]}
      ctaHref="/assessment/impact/take"
      ctaLabel="Start Your IMPACT Diagnostic"
      finalCtaLabel="Get Your Board Effectiveness Read"
      finalSubtext="Twelve minutes. Four dimension verdicts. One of ten board archetypes. Your complimentary baseline covers the self-diagnostic layer and composite effectiveness band."
      seoTitle="IMPACT — Board Effectiveness Diagnostic | LYC Intelligence"
      seoDescription="Board effectiveness across Behaviour, Competency, Process, Outcomes. 10 archetypes. A real governance read, not a compliance exercise. Complimentary Executive Introduction baseline."
      seoPath="/assessment/impact"
      prefix="impact"
      heroSampleValues={[0.62, 0.70, 0.55, 0.48]}
    />
  );
}

export default ImpactLanding;
