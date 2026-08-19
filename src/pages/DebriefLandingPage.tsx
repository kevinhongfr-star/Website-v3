/**
 * W1-T3 — DebriefLandingPage.tsx
 *
 * Debrief sessions landing page at route /debrief.
 *
 * Structure:
 *  - Top nav wordmark + links
 *  - Hero: headline + subhead + CTA to booking flow
 *  - 4 session rows (CapabilityRow × 4 from SESSION_CATALOG)
 *  - "How it works": 3 MethodologySteps — Book, Meet, Action plan
 *  - Coach roster: UseCaseColumns from COACH_ROSTER
 *  - FAQ: 10 minimal accordion items
 *  - Tier-benefit callout strip (dark)
 *  - Final CTA section (dark)
 *  - UnifiedFooter
 *
 * Brand rules:
 *  - Zero radius, zero shadows, zero cards everywhere
 *  - Font trio: serif display, sans body, mono labels
 *  - One accent: fuchsia (Debrief = coaching/advisory → Tier A programmatic)
 *  - All data from sessions.ts / tiers.ts config
 */
import React, { useState } from 'react';
import {
  SESSION_CATALOG,
  COACH_ROSTER,
  type SessionType,
  COACH_TYPES,
  getComplimentaryAllocation,
} from '@/config/sessions';
import { tierDisplayName } from '@/config/tiers';
import { SEO } from '@/components/seo/SEO';
import { UnifiedFooter } from '@/components/layout/UnifiedFooter';
import { ChevronDown } from 'lucide-react';
import {
  Section,
  Eyebrow,
  Button,
  Divider,
  MethodologyStep,
  CapabilityRow,
  UseCaseColumns,
} from '@/components/ui/v3';

const DEBRIEF_FAQ = [
  {
    q: '[Emily: FAQ Q1 — placeholder. e.g. "What is a human debrief session?"]',
    a: '[Emily: FAQ A1 — placeholder. Answer describing what debrief sessions are, how they differ from diagnostics, and what outcomes participants can expect.]',
  },
  {
    q: '[Emily: FAQ Q2 — placeholder. e.g. "How do I book a session?"]',
    a: '[Emily: FAQ A2 — placeholder. Walkthrough of the booking flow: selecting session type, choosing coach, picking a time slot, confirming payment or complimentary credit.]',
  },
  {
    q: '[Emily: FAQ Q3 — placeholder. e.g. "Who are the coaches?"]',
    a: '[Emily: FAQ A3 — placeholder. Description of coach credentials, certification process, specialisations (career, executive, leadership, CPI specialists), and APAC regional expertise.]',
  },
  {
    q: '[Emily: FAQ Q4 — placeholder. e.g. "What is the cancellation policy?"]',
    a: '[Emily: FAQ A4 — placeholder. Explanation of 24-hour complimentary cancellation window, 50% charge for late cancellations within 24 hours, and 100% no-show policy.]',
  },
  {
    q: '[Emily: FAQ Q5 — placeholder. e.g. "What are complimentary sessions?"]',
    a: '[Emily: FAQ A5 — placeholder. Explanation of Executive tier complimentary 30-minute sessions (1/month) and Council tier complimentary 60-minute sessions (2/month), including billing cycle reset and no-rollover rules.]',
  },
  {
    q: '[Emily: FAQ Q6 — placeholder. e.g. "What is the CPI Deep-Dive session?"]',
    a: '[Emily: FAQ A6 — placeholder. Description of the 90-minute Council-only flagship CPI session, including bundled CPI diagnostic, pipeline health review, and China leadership context delivered by certified CPI specialists.]',
  },
  {
    q: '[Emily: FAQ Q7 — placeholder. e.g. "Can I upgrade or downgrade session lengths?"]',
    a: '[Emily: FAQ A7 — placeholder. Explanation of session upgrade paths, partial complimentary credit for longer sessions, and how tier discounts apply to upgrade pricing.]',
  },
  {
    q: '[Emily: FAQ Q8 — placeholder. e.g. "How does tier discounting work?"]',
    a: '[Emily: FAQ A8 — placeholder. Explanation of tier session discounts (Explorer 0% → Starter 10% → Pro 15% → Executive 20% → Council 25%), plus annual plan stacking bonus of +10% on top.]',
  },
  {
    q: '[Emily: FAQ Q9 — placeholder. e.g. "What happens after my session?"]',
    a: '[Emily: FAQ A9 — placeholder. Description of post-session deliverables: written action summary, prioritised next steps, any diagnostic reports bundled with the session, and follow-up booking options.]',
  },
  {
    q: '[Emily: FAQ Q10 — placeholder. e.g. "Which sessions am I eligible for?"]',
    a: '[Emily: FAQ A10 — placeholder. Eligibility overview: Explorer/Starter/Pro/Executive have access to Career 30, Executive 45, and Leadership 60 sessions. Council tier additionally unlocks the CPI Deep-Dive 90 flagship. Council-only gating is soft, not hard.]',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    mono: '01',
    title: '[Emily: Step 1 title — placeholder. "Choose your session type and time."]',
    body: '[Emily: Step 1 body — placeholder. Select the session length and coach type that match your current goal. Pick from available coach time slots in your timezone. Pay or use your complimentary allocation.]',
  },
  {
    mono: '02',
    title: '[Emily: Step 2 title — placeholder. "1:1 video session with your coach."]',
    body: '[Emily: Step 2 body — placeholder. Join a structured 1:1 video debrief. Your coach comes prepared with context from your profile and any relevant diagnostics. The session is recorded if you wish, with your consent.]',
  },
  {
    mono: '03',
    title: '[Emily: Step 3 title — placeholder. "Written action summary and next steps."]',
    body: '[Emily: Step 3 body — placeholder. Receive a written debrief document with prioritised actions within 24–72 hours, depending on session type. Book a follow-up session when you are ready for the next level of depth.]',
  },
];

const SESSION_CODES: Record<string, string> = {
  'career-30': 'S1',
  'executive-45': 'S2',
  'leadership-60': 'S3',
  'cpi-deepdive-90': 'S4',
};

export function DebriefLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const execAlloc = getComplimentaryAllocation('executive');
  const councilAlloc = getComplimentaryAllocation('council');

  const handleBookClick = (session: SessionType) => {
    console.log('[Debrief] Book session clicked:', session.slug);
  };

  const coachUseCases = COACH_ROSTER.map((coach, i) => {
    const coachTypeMeta = COACH_TYPES[coach.type];
    const code = `C0${i + 1}`;
    return {
      label: code,
      title: coach.name,
      description: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>{coach.bioPlaceholder}</div>
          <div
            style={{
              fontFamily: 'var(--v3-font-mono)',
              fontSize: 'var(--v3-text-label)',
              lineHeight: 'var(--v3-leading-label)',
              letterSpacing: 'var(--v3-tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--v3-color-fuchsia)',
            }}
          >
            {coachTypeMeta.displayName} · {coach.timezone}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {coach.canDeliver.map((ct) => (
              <span
                key={ct}
                style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--v3-color-ink-secondary)',
                  padding: '3px 8px',
                  border: '1px solid var(--v3-color-divider)',
                }}
              >
                {ct.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      ),
    };
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--v3-color-cream)',
        color: 'var(--v3-color-ink)',
      }}
    >
      <SEO
        page="debrief"
        title="[Emily: SEO title — placeholder. Debrief Sessions | LYC Intelligence]"
        description="[Emily: SEO meta description — placeholder. 1:1 human debrief sessions with certified career, executive, leadership, and CPI coaches. Tier-discounted pricing, complimentary session allocations, and APAC expertise.]"
        path="/debrief"
      />

      <style>{`
        [data-debrief-page="root"] .debrief-session-grid {
          display: flex;
          flex-direction: column;
        }
        [data-debrief-page="root"] .debrief-faq-row {
          border-bottom: 1px solid var(--v3-color-divider);
        }
        [data-debrief-page="root"] .debrief-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        [data-debrief-page="root"] .debrief-nav-wordmark {
          font-family: var(--v3-font-display);
          font-weight: 400;
          font-size: 20px;
          letter-spacing: -0.01em;
          color: var(--v3-color-ink);
        }
        [data-debrief-page="root"] .debrief-nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
          font-family: var(--v3-font-mono);
          font-size: var(--v3-text-label);
          line-height: var(--v3-leading-label);
          letter-spacing: var(--v3-tracking-label);
          text-transform: uppercase;
          color: var(--v3-color-ink-secondary);
        }
        [data-debrief-page="root"] .debrief-nav-links a {
          color: inherit;
          text-decoration: none;
        }
        [data-debrief-page="root"] .debrief-nav-links a:hover {
          color: var(--v3-color-fuchsia);
        }
        [data-debrief-page="root"] .debrief-hero-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          align-items: center;
          font-family: var(--v3-font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--v3-color-paper-muted);
          margin-top: 40px;
        }
        [data-debrief-page="root"] .debrief-hero-meta .dot {
          color: var(--v3-color-divider-dark);
        }
        [data-debrief-page="root"] .debrief-tier-callout-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
        }
        [data-debrief-page="root"] .debrief-tier-callout-col {
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-right: 1px solid var(--v3-color-divider-dark);
        }
        [data-debrief-page="root"] .debrief-tier-callout-col:last-child {
          border-right: none;
        }
        [data-debrief-page="root"] .debrief-tier-callout-mono {
          font-family: var(--v3-font-mono);
          fontSize: 14px;
          fontWeight: 700;
          color: var(--v3-color-fuchsia);
        }
        [data-debrief-page="root"] .debrief-tier-callout-title {
          font-family: var(--v3-font-display);
          fontSize: 22px;
          fontWeight: 400;
          color: var(--v3-color-paper);
          line-height: 1.25;
          margin: 0;
        }
        [data-debrief-page="root"] .debrief-tier-callout-body {
          font-family: var(--v3-font-body);
          fontSize: var(--v3-text-body);
          color: var(--v3-color-paper-secondary);
          line-height: 1.6;
          margin: 0;
        }
        [data-debrief-page="root"] .debrief-tier-callout-tag {
          margin-top: 4px;
          font-family: var(--v3-font-mono);
          fontSize: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--v3-color-fuchsia);
          fontWeight: 500;
        }
        [data-debrief-page="root"] .debrief-final-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
          margin-top: 28px;
        }
        [data-debrief-page="root"] .debrief-final-meta-item {
          font-family: var(--v3-font-mono);
          fontSize: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--v3-color-paper-muted);
        }
        [data-debrief-page="root"] .debrief-final-meta .dot {
          color: var(--v3-color-divider-dark);
        }
        [data-debrief-page="root"] .debrief-session-cost {
          font-family: var(--v3-font-mono);
          font-size: var(--v3-text-label);
          lineHeight: var(--v3-leading-label);
          letter-spacing: var(--v3-tracking-label);
          text-transform: uppercase;
          color: var(--v3-color-ink-muted);
          margin-top: 8px;
        }
        @media (max-width: 900px) {
          [data-debrief-page="root"] .debrief-nav {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
          [data-debrief-page="root"] .debrief-nav-links {
            gap: 20px;
            flex-wrap: wrap;
          }
          [data-debrief-page="root"] .debrief-tier-callout-grid {
            grid-template-columns: 1fr !important;
            gap: 24px;
          }
          [data-debrief-page="root"] .debrief-tier-callout-col {
            border-right: none !important;
            border-bottom: 1px solid var(--v3-color-divider-dark);
            padding: 0 0 24px 0;
          }
          [data-debrief-page="root"] .debrief-tier-callout-col:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>

      <main data-debrief-page="root">
        <Section bg="white" paddingY="sm" scope={true}>
          <div className="debrief-nav">
            <div className="debrief-nav-wordmark">LYC Intelligence</div>
            <nav className="debrief-nav-links" aria-label="Primary">
              <a href="#sessions">Sessions</a>
              <a href="#how-it-works">How it works</a>
              <a href="#coach-roster">Coaches</a>
              <a href="#faq">FAQ</a>
              <a href="/pricing">Pricing</a>
            </nav>
          </div>
        </Section>
        <Divider variant="light" width="full" />

        <Section bg="dark" paddingY="xl" scope={true}>
          <div style={{ position: 'relative' }}>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-40px -40px 0 -40px',
                background:
                  'radial-gradient(circle at 30% 20%, rgba(193,8,171,0.15) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ maxWidth: 720, position: 'relative' }}>
              <Eyebrow accent="fuchsia">Human Debrief Sessions</Eyebrow>
              <h2
                style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: 'var(--v3-text-display-md)',
                  lineHeight: 'var(--v3-leading-display-md)',
                  fontWeight: 300,
                  letterSpacing: '-0.015em',
                  color: 'var(--v3-color-paper)',
                  margin: '12px 0 0',
                }}
              >
                [Emily: Debrief hero headline — placeholder]
              </h2>
              <p
                style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: 'var(--v3-text-body)',
                  lineHeight: 'var(--v3-leading-body)',
                  color: 'var(--v3-color-paper-secondary)',
                  maxWidth: 620,
                  marginTop: 18,
                  marginBottom: 0,
                }}
              >
                [Emily: Debrief hero subhead — placeholder. Description of human debrief sessions, what they enable, coach certifications, tier benefits, and APAC regional focus.]
              </p>

              <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
                <Button
                  variant="primary"
                  accent="fuchsia"
                  href="/debrief/book"
                >
                  Book your session
                </Button>
                <Button
                  variant="secondary"
                  accent="fuchsia"
                  href="#sessions"
                >
                  Explore session types
                </Button>
              </div>

              <div className="debrief-hero-meta">
                <span>4 Session Types</span>
                <span className="dot">·</span>
                <span>{COACH_ROSTER.length} Certified Coaches</span>
                <span className="dot">·</span>
                <span>APAC Timezones</span>
              </div>
            </div>
          </div>
        </Section>
        <Divider variant="light" width="full" />

        <Section bg="cream" paddingY="lg" id="sessions" scope={true}>
          <div style={{ textAlign: 'left', maxWidth: 720, marginBottom: 16 }}>
            <Eyebrow accent="fuchsia">Session Catalog</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'var(--v3-text-display-md)',
                lineHeight: 'var(--v3-leading-display-md)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                color: 'var(--v3-color-ink)',
                margin: '12px 0 0',
              }}
            >
              [Emily: Session cards H2 — placeholder. e.g. "Pick the session that matches your goal."]
            </h2>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body)',
                lineHeight: 'var(--v3-leading-body)',
                color: 'var(--v3-color-ink-secondary)',
                maxWidth: 620,
                marginTop: 12,
                marginBottom: 0,
              }}
            >
              [Emily: Session cards lead paragraph — placeholder. Overview of four session types, coach specialisations, duration options, and tier pricing benefits.]
            </p>
          </div>

          <Divider variant="strong" width="full" />
          <div className="debrief-session-grid">
            {SESSION_CATALOG.map((session, i) => {
              const code = SESSION_CODES[session.slug] ?? `S${i + 1}`;
              return (
                <React.Fragment key={session.slug}>
                  <CapabilityRow
                    label={code}
                    title={
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--v3-font-body)',
                            fontWeight: 600,
                            fontSize: 'var(--v3-text-heading-lg)',
                            lineHeight: 'var(--v3-leading-heading-lg)',
                            color: 'var(--v3-color-ink)',
                          }}
                        >
                          {session.displayName}
                        </div>
                        <div className="debrief-session-cost">
                          {session.durationMinutes}min · ${session.basePriceUsd} / ¥{session.basePriceCny}
                        </div>
                      </div>
                    }
                    description={session.shortDescriptor}
                    cta={
                      <Button
                        variant="ghost"
                        accent="fuchsia"
                        href={`/debrief/book?session=${session.slug}`}
                      >
                        Details &amp; Book
                      </Button>
                    }
                  />
                  {i < SESSION_CATALOG.length - 1 && (
                    <Divider variant="light" width="full" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <Divider variant="strong" width="full" />
        </Section>
        <Divider variant="light" width="full" />

        <Section bg="white" paddingY="lg" id="how-it-works" scope={true}>
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <Eyebrow accent="fuchsia">How It Works</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'var(--v3-text-display-md)',
                lineHeight: 'var(--v3-leading-display-md)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                color: 'var(--v3-color-ink)',
                margin: '12px 0 0',
              }}
            >
              [Emily: How-it-works H2 — placeholder. e.g. "From booking to action plan in three steps."]
            </h2>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body)',
                lineHeight: 'var(--v3-leading-body)',
                color: 'var(--v3-color-ink-secondary)',
                maxWidth: 620,
                marginTop: 12,
                marginBottom: 0,
              }}
            >
              [Emily: How-it-works lead paragraph — placeholder. Summary of the three-step process: select session, meet coach, receive written action plan.]
            </p>
          </div>

          <Divider variant="strong" width="full" />
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <MethodologyStep
                number={step.mono}
                title={step.title}
                description={step.body}
                accent="fuchsia"
              />
              {i < HOW_IT_WORKS_STEPS.length - 1 && (
                <Divider variant="light" width="full" />
              )}
            </React.Fragment>
          ))}
          <Divider variant="strong" width="full" />
        </Section>
        <Divider variant="light" width="full" />

        <Section bg="cream" paddingY="lg" id="coach-roster" scope={true}>
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <Eyebrow accent="fuchsia">Coaches</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'var(--v3-text-display-md)',
                lineHeight: 'var(--v3-leading-display-md)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                color: 'var(--v3-color-ink)',
                margin: '12px 0 0',
              }}
            >
              [Emily: Coach roster H2 — placeholder. e.g. "Certified coaches, real APAC executive experience."]
            </h2>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body)',
                lineHeight: 'var(--v3-leading-body)',
                color: 'var(--v3-color-ink-secondary)',
                maxWidth: 620,
                marginTop: 12,
                marginBottom: 0,
              }}
            >
              [Emily: Coach roster lead paragraph — placeholder. Coach certifications, backgrounds, specialisations, and APAC timezone coverage.]
            </p>
          </div>

          <UseCaseColumns items={coachUseCases} labelAccent="fuchsia" />
        </Section>
        <Divider variant="light" width="full" />

        <Section bg="white" paddingY="lg" id="faq" scope={true}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <div style={{ textAlign: 'left', maxWidth: 720, marginBottom: 16 }}>
              <Eyebrow accent="fuchsia">Frequently Asked</Eyebrow>
              <h2
                style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: 'var(--v3-text-display-md)',
                  lineHeight: 'var(--v3-leading-display-md)',
                  fontWeight: 300,
                  letterSpacing: '-0.015em',
                  color: 'var(--v3-color-ink)',
                  margin: '12px 0 0',
                }}
              >
                [Emily: FAQ H2 — placeholder. e.g. "Questions about debrief sessions."]
              </h2>
              <p
                style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: 'var(--v3-text-body)',
                  lineHeight: 'var(--v3-leading-body)',
                  color: 'var(--v3-color-ink-secondary)',
                  maxWidth: 620,
                  marginTop: 12,
                  marginBottom: 0,
                }}
              >
                [Emily: FAQ lead paragraph — placeholder. Booking, pricing, coaches, cancellations, complimentary sessions, and the CPI deep-dive.]
              </p>
            </div>

            <Divider variant="strong" width="full" />
            <div>
              {DEBRIEF_FAQ.map((item, i) => {
                const open = openFaq === i;
                const qNum = `Q${i + 1}`;
                return (
                  <div key={i} className="debrief-faq-row">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        padding: '28px 0',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: 24,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 24,
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--v3-font-mono)',
                            fontWeight: 400,
                            fontSize: 'var(--v3-text-label)',
                            lineHeight: 'var(--v3-leading-label)',
                            letterSpacing: 'var(--v3-tracking-label)',
                            textTransform: 'uppercase',
                            color: 'var(--v3-color-fuchsia)',
                            width: 40,
                            minWidth: 40,
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        >
                          {qNum}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--v3-font-body)',
                            fontSize: 'var(--v3-text-heading-lg)',
                            fontWeight: 600,
                            lineHeight: 'var(--v3-leading-heading-lg)',
                            color: 'var(--v3-color-ink)',
                          }}
                        >
                          {item.q}
                        </span>
                      </div>
                      <ChevronDown
                        size={20}
                        color={open ? 'var(--v3-color-fuchsia)' : 'var(--v3-color-ink-muted)'}
                        style={{
                          flexShrink: 0,
                          marginTop: 4,
                          transition: 'transform 200ms ease',
                          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>
                    <div
                      style={{
                        maxHeight: open ? 400 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 280ms ease',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--v3-font-body)',
                          fontSize: 'var(--v3-text-body)',
                          lineHeight: 'var(--v3-leading-body)',
                          color: 'var(--v3-color-ink-secondary)',
                          padding: '0 0 28px 64px',
                          margin: 0,
                          maxWidth: '68ch',
                        }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
        <Divider variant="light" width="full" />

        <Section bg="dark" paddingY="md" scope={true}>
          <div className="debrief-tier-callout-grid">
            <div className="debrief-tier-callout-col">
              <div className="debrief-tier-callout-mono">E</div>
              <h3 className="debrief-tier-callout-title">
                {tierDisplayName('executive')} tier
              </h3>
              <p className="debrief-tier-callout-body">
                [Emily: Executive tier callout — placeholder. Includes 1 complimentary 30-min session/month]
              </p>
              {execAlloc && (
                <div className="debrief-tier-callout-tag">
                  {execAlloc.count} × {execAlloc.coversDurationMinutes}min / month · Complimentary
                </div>
              )}
            </div>
            <div className="debrief-tier-callout-col">
              <div className="debrief-tier-callout-mono">C</div>
              <h3 className="debrief-tier-callout-title">
                {tierDisplayName('council')} tier
              </h3>
              <p className="debrief-tier-callout-body">
                [Emily: Council tier callout — placeholder. Includes 2 complimentary 60-min sessions/month + CPI Deep-Dive access]
              </p>
              {councilAlloc && (
                <div className="debrief-tier-callout-tag">
                  {councilAlloc.count} × {councilAlloc.coversDurationMinutes}min / month · Complimentary
                </div>
              )}
            </div>
            <div className="debrief-tier-callout-col">
              <div className="debrief-tier-callout-mono">%</div>
              <h3 className="debrief-tier-callout-title">
                [Emily: Tier discount callout title — placeholder. e.g. "Tier pricing discounts"]
              </h3>
              <p className="debrief-tier-callout-body">
                [Emily: Tier discount callout body — placeholder. Tier session discounts scale with membership (10%→25%). Annual plan stacks +10% extra on top of tier pricing.]
              </p>
              <div className="debrief-tier-callout-tag">
                {tierDisplayName('starter')} 10% · {tierDisplayName('professional')} 15% · {tierDisplayName('executive')} 20% · {tierDisplayName('council')} 25% · +10% Annual
              </div>
            </div>
          </div>
        </Section>
        <Divider variant="light" width="full" />

        <Section bg="dark" paddingY="xl" scope={true}>
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            <Eyebrow accent="fuchsia">Ready to book?</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'var(--v3-text-display-md)',
                lineHeight: 'var(--v3-leading-display-md)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                color: 'var(--v3-color-paper)',
                margin: '12px 0 0',
              }}
            >
              [Emily: Final CTA H2 — placeholder. e.g. "Book your first debrief session."]
            </h2>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body)',
                lineHeight: 'var(--v3-leading-body)',
                color: 'var(--v3-color-paper-secondary)',
                marginTop: 20,
                maxWidth: 560,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 0,
              }}
            >
              [Emily: Final CTA subtext — placeholder. Call to action encouraging users to book their session. Mentions tier discounts, complimentary allocations, 24h cancellation policy, certified coaches, and written action plans.]
            </p>

            <div style={{ marginTop: 36 }}>
              <Button
                variant="primary"
                accent="fuchsia"
                href="/debrief/book"
              >
                Book your debrief session
              </Button>
            </div>

            <div className="debrief-final-meta">
              {[
                'Tier discounts applied',
                'Complimentary sessions',
                '24h cancellation policy',
              ].map((t, i, arr) => (
                <React.Fragment key={t}>
                  <span className="debrief-final-meta-item">{t}</span>
                  {i < arr.length - 1 && <span className="dot">·</span>}
                </React.Fragment>
              ))}
            </div>

            <a
              href="/pricing"
              style={{
                display: 'inline-block',
                marginTop: 24,
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--v3-color-paper-muted)',
                textDecoration: 'underline',
                textUnderlineOffset: 4,
              }}
            >
              [Emily: Final CTA secondary link — placeholder. e.g. "See all pricing tiers →"]
            </a>
          </div>
        </Section>

        <UnifiedFooter />
      </main>
    </div>
  );
}

export default DebriefLandingPage;
