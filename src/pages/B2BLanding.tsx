import React, { useEffect, useState } from 'react';
import { initScrollReveal } from '@/lib/utils';
import { ArrowRight, Users, Target, Gauge, Building2, ClipboardList, MessageSquarePlus } from 'lucide-react';
import { UnifiedFooter } from '@/components/layout/UnifiedFooter';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { SEO } from '@/components/seo/SEO';
import { EnterpriseContactForm } from '@/components/billing/EnterpriseContactForm';
import { Section, Eyebrow, Button, Divider, SplitSection, MethodologyStep, CapabilityRow, UseCaseColumns, PricingTextTable, FeatureRow } from '@/components/ui/v3';

const B2B_HERO_POSTER = 'https://www.lyc-partners.ai/images/heroes/hero-b2b-boardroom.webp';

const B2B_FEATURES = [
  {
    icon: Users,
    eyebrow: 'NEXUS FOR TEAMS',
    title: 'An intelligent front door for every recruiter',
    desc: 'Every seat on your talent team uses NEXUS — diagnostic-literate, confidential, tuned to your firm\'s search methodology. Conversations surface shortlist candidates, surface mandate risks, and draft outreach — all in one thinking partner.',
  },
  {
    icon: Target,
    eyebrow: 'MATCH ANALYSIS',
    title: 'JD-to-CV scoring, three dimensions of fit',
    desc: 'Paste one JD, add ten CVs. Get ranked verdicts, match reasoning, risk flags, and approach strategy — scored on Experience & Achievement, Skills & Expertise, and Organizational Fit. Hours of partner work in minutes.',
  },
  {
    icon: Building2,
    eyebrow: 'ENTERPRISE INSTRUMENTS',
    title: 'Diagnostics deployed at team scale',
    desc: 'Run CPI for pipeline diagnostics, SHIFT suite for leadership bench, IMPACT for board candidates — all from one portal. Aggregate analytics, comparative percentiles, progress tracking across engagements.',
  },
];

const MATCH_DIMENSIONS = [
  { code: 'D1', name: 'Experience & Achievements', desc: 'Career trajectory, scope progression, quantifiable impact, leadership breadth across contexts.' },
  { code: 'D2', name: 'Skills & Expertise', desc: 'Functional depth, technical fluency, cross-border capability, language and market fit.' },
  { code: 'D3', name: 'Organizational Fit', desc: 'Cultural alignment, stakeholder mapping, transformation readiness, board dynamics.' },
];

export function B2BLanding() {
  const [enterpriseOpen, setEnterpriseOpen] = useState(false);

  useEffect(() => {
    const observer = initScrollReveal();
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* TOP B2B BANNER */}
      <div
        style={{
          background: 'var(--v3-color-dark)',
          padding: '10px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
        className="v3-root"
        data-bg-mode="dark"
      >
        <span style={{ color: 'var(--v3-color-paper)', fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body-sm)', lineHeight: 'var(--v3-leading-body-sm)' }}>
          <span style={{ fontFamily: 'var(--v3-font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: 8, color: 'var(--v3-color-fuchsia)', fontSize: 'var(--v3-text-label)', lineHeight: 'var(--v3-leading-label)' }}>B2B · Client Portal</span>
          This page is for search-firm &amp; talent clients. Individual leaders — visit the main B2C experience.
        </span>
        <Button variant="ghost" accent="fuchsia" href="/">
          Go to B2C site
        </Button>
      </div>

      <SEO page="b2b" />

      {/* 1. HERO — NEXUS for Teams */}
      <Section bg="dark" paddingY="xl">
        <div
          className="reveal"
          style={{
            position: 'relative',
            maxWidth: '920px',
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '720px',
              height: '440px',
              background: 'radial-gradient(circle, rgba(193,8,171,0.08) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow accent="fuchsia" style={{ marginBottom: '20px', justifyContent: 'center' }}>
              FOR FIRMS · FOR SEARCH · FOR BOARDS
            </Eyebrow>
            <h1
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'clamp(34px, 5.6vw, 56px)',
                fontWeight: 300,
                color: 'var(--v3-color-paper)',
                margin: '0 auto 16px',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '820px',
              }}
            >
              NEXUS for Teams.<br />Match Analysis for the hire.
            </h1>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'clamp(15px, 1.7vw, 18px)',
                color: 'var(--v3-color-paper-secondary)',
                maxWidth: '620px',
                margin: '0 auto 44px',
                lineHeight: 1.6,
              }}
            >
              One thinking partner across every recruiter on the desk. Score candidates against any mandate with three-dimension fit, clear reasoning, and approach strategy — in minutes, not weeks.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Button variant="primary" accent="fuchsia" href="/match">
                Try Match Analysis
              </Button>
              <a
                href="/nexus"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 24px',
                  border: '1px solid var(--v3-color-divider-dark)',
                  color: 'var(--v3-color-paper)',
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 'var(--v3-text-label)',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  background: 'transparent',
                  borderRadius: 0,
                  boxShadow: 'none',
                  cursor: 'pointer',
                }}
              >
                Meet NEXUS
              </a>
            </div>
            <div
              style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 'var(--v3-text-label)',
                color: 'var(--v3-color-paper-muted)',
                letterSpacing: '0.08em',
              }}
            >
              3 DIMENSIONS · BATCH PROCESSING · CONFIDENTIAL BY DEFAULT
            </div>
          </div>
        </div>
      </Section>

      {/* 2. TRUST BAR */}
      <Section bg="white" paddingY="sm">
        <div
          className="reveal"
          style={{
            borderTop: '1px solid var(--v3-color-divider)',
            borderBottom: '1px solid var(--v3-color-divider)',
            marginInline: 'calc(var(--v3-gutter-desktop) * -1)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              textAlign: 'center',
            }}
            className="v3-trust-grid"
          >
            {[
              { v: '500+', l: 'Executive placements' },
              { v: '47', l: 'Markets covered' },
              { v: '93%', l: 'Placement retention' },
              { v: '15x', l: 'Faster shortlisting' },
            ].map((s, i) => (
              <div
                key={s.l}
                style={{
                  padding: '32px 24px',
                  borderRight: i < 3 ? '1px solid var(--v3-color-divider)' : 'none',
                }}
                className="v3-trust-cell"
              >
                <div
                  style={{
                    fontFamily: 'var(--v3-font-mono)',
                    fontSize: '32px',
                    fontWeight: 500,
                    color: 'var(--v3-color-fuchsia)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--v3-font-mono)',
                    fontSize: 'var(--v3-text-label)',
                    color: 'var(--v3-color-ink-muted)',
                    marginTop: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    lineHeight: 1.4,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .v3-trust-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .v3-trust-cell {
              border-right: none !important;
              border-bottom: 1px solid var(--v3-color-divider);
            }
            .v3-trust-cell:nth-child(1),
            .v3-trust-cell:nth-child(2) {
              border-bottom: 1px solid var(--v3-color-divider);
            }
            .v3-trust-cell:nth-child(odd) {
              border-right: 1px solid var(--v3-color-divider) !important;
            }
            .v3-trust-cell:nth-child(3),
            .v3-trust-cell:nth-child(4) {
              border-bottom: none;
            }
          }
        `}</style>
      </Section>

      {/* 3. B2B FEATURES */}
      <Section bg="cream" paddingY="lg">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Eyebrow accent="fuchsia" style={{ marginBottom: '12px', justifyContent: 'center' }}>
            Built for retained search
          </Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontSize: 'clamp(26px, 3vw, 40px)',
              fontWeight: 300,
              color: 'var(--v3-color-ink)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Move candidates through the pipe faster.<br />Back every verdict with reasoning.
          </h2>
        </div>

        <div className="reveal">
          <Divider variant="strong" width="content" />
          {B2B_FEATURES.map((f, i) => (
            <React.Fragment key={f.title}>
              <FeatureRow
                label={<span style={{ color: 'var(--v3-color-teal)' }}>{`F0${i + 1}`}</span>}
                title={
                  <div>
                    <Eyebrow accent="fuchsia" style={{ marginBottom: '8px' }}>{f.eyebrow}</Eyebrow>
                    <span
                      style={{
                        fontFamily: 'var(--v3-font-body)',
                        fontWeight: 600,
                        fontSize: 'var(--v3-text-heading-lg)',
                        lineHeight: 'var(--v3-leading-heading-lg)',
                        color: 'var(--v3-color-ink)',
                      }}
                    >
                      {f.title}
                    </span>
                  </div>
                }
                description={f.desc}
              />
              {i < B2B_FEATURES.length - 1 ? <Divider variant="light" width="content" /> : null}
            </React.Fragment>
          ))}
          <Divider variant="strong" width="content" />
        </div>
      </Section>

      {/* 4. MATCH DIMENSIONS */}
      <Section bg="white" paddingY="lg">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <Eyebrow accent="fuchsia" style={{ marginBottom: '12px', justifyContent: 'center' }}>
            Match Analysis
          </Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontSize: 'clamp(26px, 3vw, 40px)',
              fontWeight: 300,
              color: 'var(--v3-color-ink)',
              maxWidth: '640px',
              margin: '0 auto 12px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Three dimensions of fit. One consistent verdict.
          </h2>
          <p
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontSize: 'var(--v3-text-body)',
              color: 'var(--v3-color-ink-secondary)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Each candidate is ranked Strong / Good / Potential Fit with match reasons, risk flags,
            and tailored approach strategy for the first outreach call.
          </p>
        </div>

        <div className="reveal">
          <UseCaseColumns
            labelAccent="fuchsia"
            items={MATCH_DIMENSIONS.map(d => ({
              label: d.code,
              title: d.name,
              description: d.desc,
            }))}
          />
        </div>

        {/* Output block */}
        <div className="reveal" style={{ marginTop: '48px' }}>
          <Divider variant="strong" width="content" />
          <div style={{ paddingBlock: 'var(--v3-space-7)' }} className="v3-output-block">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 120px) minmax(0, 1fr)',
                gap: 'var(--v3-space-5)',
                alignItems: 'start',
              }}
            >
              <div
                aria-hidden
                style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontWeight: 400,
                  fontSize: 'var(--v3-text-label)',
                  lineHeight: 'var(--v3-leading-label)',
                  letterSpacing: 'var(--v3-tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--v3-color-fuchsia)',
                }}
              >
                Output
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--v3-font-display)',
                    fontSize: '28px',
                    fontWeight: 400,
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    color: 'var(--v3-color-ink)',
                    margin: '0 0 12px',
                  }}
                >
                  Ranked verdicts
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--v3-font-body)',
                    fontSize: 'var(--v3-text-body)',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    color: 'var(--v3-color-ink-secondary)',
                    margin: 0,
                    maxWidth: '62ch',
                  }}
                >
                  Strong Fit · Good Fit · Potential Fit. Each with match rationale, fit-gap summary, risk flags,
                  and first-call approach strategy. Export as mandate briefing for the partner review.
                </p>
              </div>
            </div>
          </div>
          <Divider variant="strong" width="content" />
        </div>

        <style>{`
          @media (max-width: 700px) {
            .v3-output-block > div {
              grid-template-columns: 1fr !important;
              gap: var(--v3-space-3) !important;
            }
          }
        `}</style>
      </Section>

      {/* 5. ENTERPRISE OFFERING */}
      <Section bg="cream" paddingY="lg">
        <div className="reveal v3-enterprise-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 'var(--v3-space-8)',
          alignItems: 'center',
        }}>
          <div>
            <Eyebrow accent="fuchsia" style={{ marginBottom: '12px' }}>
              Team deployment
            </Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'clamp(24px, 2.8vw, 40px)',
                fontWeight: 300,
                color: 'var(--v3-color-ink)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              NEXUS for Teams, shipped in a day.
            </h2>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body)',
                color: 'var(--v3-color-ink-secondary)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              Onboard every desk. Tailor system prompts to your firm's practice, mandate typology,
              and research culture. SSO. Audit logs. Org-level usage analytics. Mandate sharing
              across pods. Everything the retained search practice needs — none of the generic SaaS fluff.
            </p>
            <div>
              <Divider variant="strong" />
              {[
                'Seat-based billing — Council tier for teams',
                'SSO, SCIM, SAML, role-based access',
                'Mandate-level confidentiality controls',
                'Custom reference model onboarding',
              ].map((f, i, arr) => (
                <React.Fragment key={f}>
                  <CapabilityRow
                    label={<span style={{ color: 'var(--v3-color-teal)' }}>{String(i + 1).padStart(2, '0')}</span>}
                    title={f}
                    description={undefined}
                  />
                  {i < arr.length - 1 ? <Divider variant="light" /> : null}
                </React.Fragment>
              ))}
              <Divider variant="strong" />
            </div>
            <div style={{ marginTop: '28px' }}>
              <Button
                variant="primary"
                accent="fuchsia"
                onClick={() => setEnterpriseOpen(true)}
              >
                Talk to sales
              </Button>
              <p
                style={{
                  marginTop: '10px',
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 'var(--v3-text-label)',
                  color: 'var(--v3-color-ink-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                }}
              >
                Human follow-up · Not a bot
              </p>
            </div>
          </div>

          {/* Dark panel dialogue */}
          <div
            style={{
              background: 'var(--v3-color-dark)',
              padding: '32px',
              border: '1px solid var(--v3-color-divider-dark)',
              color: 'var(--v3-color-paper)',
              borderRadius: 0,
              boxShadow: 'none',
            }}
            className="v3-root"
            data-bg-mode="dark"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <MessageSquarePlus style={{ width: 18, height: 18, color: 'var(--v3-color-fuchsia)' }} />
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', letterSpacing: '0.08em', color: 'var(--v3-color-fuchsia)', textTransform: 'uppercase', fontWeight: 500, lineHeight: 1.4 }}>NEXUS TEAMS SAMPLE</span>
            </div>

            <Divider variant="light" />

            <div
              style={{
                padding: '20px 0',
                borderBottom: '1px solid var(--v3-color-divider-dark)',
              }}
            >
              <div style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', color: 'var(--v3-color-teal)', letterSpacing: '0.08em', marginBottom: '8px', fontWeight: 500, lineHeight: 1.4 }}>RECRUITER</div>
              <div style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-paper)', lineHeight: 1.6 }}>
                Shortlist 5 CFO candidates for Series B biotech mandate, HQ SG, US VC-backed, APAC expansion next year.
              </div>
            </div>

            <div
              style={{
                padding: '20px 0',
              }}
            >
              <div style={{ fontFamily: 'var(--v3-font-mono)', fontSize: 'var(--v3-text-label)', color: 'var(--v3-color-fuchsia)', letterSpacing: '0.08em', marginBottom: '8px', fontWeight: 500, lineHeight: 1.4 }}>NEXUS</div>
              <div style={{ fontFamily: 'var(--v3-font-body)', fontSize: 'var(--v3-text-body)', color: 'var(--v3-color-paper)', lineHeight: 1.6 }}>
                5 profiles ranked below: 1 Strong Fit (US-based CFO with biotech exit + SG family office ties),
                3 Good Fit, 1 Potential Fit flagged governance-capability gap.
                Approach strategy per profile + mandate risk summary attached.
              </div>
            </div>

            <Divider variant="light" />

            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px',
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 'var(--v3-text-label)',
                color: 'var(--v3-color-paper-muted)',
                letterSpacing: '0.08em',
              }}
            >
              <span style={{ padding: '4px 8px', border: '1px solid var(--v3-color-divider-dark)' }}>GOV</span>
              <span style={{ padding: '4px 8px', border: '1px solid var(--v3-color-divider-dark)' }}>APAC</span>
              <span style={{ padding: '4px 8px', border: '1px solid var(--v3-color-divider-dark)' }}>VERDICT</span>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .v3-enterprise-grid {
              grid-template-columns: 1fr !important;
              gap: var(--v3-space-7) !important;
            }
          }
        `}</style>
      </Section>

      {/* 6. FINAL CTA */}
      <Section bg="dark" paddingY="xl">
        <div className="reveal" style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '-120px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '720px',
              height: '480px',
              background: 'radial-gradient(circle, rgba(193,8,171,0.08) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow accent="fuchsia" style={{ marginBottom: '16px', justifyContent: 'center' }}>
              For your next mandate
            </Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 300,
                color: 'var(--v3-color-paper)',
                margin: '0 0 16px',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              Ship shortlists this week.<br />NEXUS for Teams + Match Analysis.
            </h2>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body-lg)',
                color: 'var(--v3-color-paper-secondary)',
                maxWidth: '440px',
                margin: '0 auto 36px',
                lineHeight: 1.6,
              }}
            >
              Book an Executive Introduction. Paste your next JD — walk out with a ranked shortlist.
            </p>
            <LeadCaptureForm
              type="b2b"
              source="b2b_landing_v3"
              heading="Executive Introduction — B2B"
              subheading="Paste a JD, share 5 CVs, we return ranked verdicts same day."
            />
          </div>
        </div>
      </Section>

      <UnifiedFooter />

      {/* Enterprise contact modal */}
      {enterpriseOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Talk to our team"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(10,10,10,0.72)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEnterpriseOpen(false);
          }}
        >
          <div
            className="w-full max-w-xl max-h-[92vh] overflow-y-auto"
            style={{
              boxShadow: 'none',
              borderRadius: 0,
            }}
          >
            <EnterpriseContactForm
              dismissible
              onClose={() => setEnterpriseOpen(false)}
              heading="Talk to our team"
              subheading={'Tell us about your firm and we\u2019ll design a NEXUS for Teams deployment that fits \u2014 seats, SSO, custom reference model onboarding, and a dedicated point of contact. You\u2019ll hear from a human, not a bot.'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
