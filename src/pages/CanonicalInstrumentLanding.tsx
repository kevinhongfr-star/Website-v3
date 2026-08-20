import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layers, Clock, HelpCircle, Sparkles } from 'lucide-react';
import { initScrollReveal } from '@/lib/utils';
import { ASSESSMENT_CATALOG, type AssessmentInfo } from '@/assessments/catalog';
import { SEO } from '@/components/seo/SEO';
import { getAssessmentMeta } from '@/seo/pageMetadata';

const TEAL = '#00897B';
const FUCHSIA = '#7C2D81';

export function CanonicalInstrumentLanding() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = initScrollReveal();
    return () => observer.disconnect();
  }, []);

  const key = (code || '').toUpperCase();
  const info: AssessmentInfo | undefined = ASSESSMENT_CATALOG[key];

  if (!info) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--v3-font-body)', padding: '32px', background: 'var(--v3-color-white)' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--v3-color-inkMuted)', marginBottom: '12px', textTransform: 'uppercase' }}>Instrument not found</div>
          <h1 style={{ fontFamily: 'var(--v3-font-display)', fontSize: '32px', marginBottom: '16px', color: 'var(--v3-color-ink)', fontWeight: 500 }}>This diagnostic does not exist.</h1>
          <p style={{ color: 'var(--v3-color-inkSecondary)', marginBottom: '28px', lineHeight: 1.6 }}>
            The instrument code &quot;{code}&quot; is not in the canonical catalog. Return to the diagnostic catalog to browse all 6 leadership diagnostics.
          </p>
          <a
            href="/assessment"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: TEAL, color: 'var(--v3-color-white)', textDecoration: 'none', fontFamily: 'var(--v3-font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            <ArrowLeft style={{ width: 13, height: 13 }} /> Browse diagnostics
          </a>
        </div>
      </div>
    );
  }

  const accent = info.is_cpi ? FUCHSIA : TEAL;
  const tierEyebrow = info.is_cpi
    ? 'FLAGSHIP · 199 MI'
    : info.is_shift
      ? 'SHIFT SUITE · 149 MI'
      : 'ADVISORY · 99 MI';

  const instrumentCopy: Record<string, { heroH1: string; heroEyebrow: string }> = {
    FORGE: {
      heroH1: 'Sell like a founder, scale like a system builder',
      heroEyebrow: 'FORGE · SALES LEADERSHIP STRENGTHS',
    },
    BRIDGE: {
      heroH1: 'Cross-border mandates that land in-market, not just in-deck',
      heroEyebrow: 'BRIDGE · CROSS-BORDER LEADERSHIP',
    },
    DRIVE: {
      heroH1: 'Know why you lead — and when you\'ll disengage',
      heroEyebrow: 'DRIVE · MOTIVATION PROFILE & ENGAGEMENT RISK',
    },
    QUEST: {
      heroH1: 'Performance that compounds, not just accelerates',
      heroEyebrow: 'QUEST · EXECUTIVE PERFORMANCE',
    },
    MOSAIC: {
      heroH1: 'Partnerships built on institutional trust and relationship velocity',
      heroEyebrow: 'MOSAIC · CROSS-BORDER PARTNERSHIP AGILITY',
    },
    COACH: {
      heroH1: 'The leadership skill every manager actually develops — coaching others',
      heroEyebrow: 'COACH · MANAGER-AS-COACH CAPABILITY',
    },
  };
  const copy = instrumentCopy[key];
  const heroH1 = copy?.heroH1 ?? info.name;
  const heroEyebrow = copy?.heroEyebrow ?? info.code;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--v3-color-white)', color: 'var(--v3-color-ink)' }}>
      <SEO assessment={getAssessmentMeta(
        info.code,
        info.name,
        info.b2cName,
        info.tagline,
        info.priceMiles,
        info.duration_minutes,
        info.total_questions,
      )} />

      <style>{`
        @media (max-width: 900px) {
          .canon-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--v3-color-cream)',
          color: 'var(--v3-color-ink)',
          borderBottom: '1px solid var(--v3-color-divider)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1120px', margin: '0 auto', padding: '96px 32px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <a
              href="/assessment"
              style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--v3-color-inkMuted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft style={{ width: 12, height: 12 }} /> All 6 diagnostics
            </a>
            <span style={{ color: 'var(--v3-color-dividerStrong)' }}>·</span>
            <div
              style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: accent,
              }}
            >
              {tierEyebrow}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'inline-block',
                fontFamily: 'var(--v3-font-mono)',
                fontSize: '10px',
                letterSpacing: '0.22em',
                color: 'var(--v3-color-inkMuted)',
                fontWeight: 500,
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              {heroEyebrow}
            </div>
            <h1
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 500,
                color: 'var(--v3-color-ink)',
                margin: '0 0 10px',
                lineHeight: 1.1,
                letterSpacing: '-0.015em',
                maxWidth: '780px',
              }}
            >
              {heroH1}
            </h1>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'clamp(15px, 1.7vw, 19px)',
                color: 'var(--v3-color-inkSecondary)',
                maxWidth: '620px',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {info.tagline || `${info.b2cName} — ${info.dimensions.length} dimensions, ${info.archetype_count} archetypes.`}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '24px', margin: '36px 0', flexWrap: 'wrap' }}>
            <Stat icon={HelpCircle} value={`${info.total_questions}`} label="QUESTIONS" accent={accent} />
            <Stat icon={Clock} value={`${info.duration_minutes}`} label="MINUTES" accent={accent} />
            <Stat icon={Layers} value={`${info.dimensions.length}`} label="DIMENSIONS" accent={accent} />
            <Stat icon={Sparkles} value={`${info.archetype_count}`} label="ARCHETYPES" accent={accent} />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="/nexus/chat"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 36px',
                background: accent,
                color: 'var(--v3-color-white)',
                fontFamily: 'var(--v3-font-body)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Begin with NEXUS <ArrowRight style={{ width: 15, height: 15 }} />
            </a>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: '4px',
                padding: '14px 24px',
                border: '1px solid var(--v3-color-dividerStrong)',
              }}
            >
              <span style={{ fontFamily: 'var(--v3-font-display)', fontSize: '26px', fontWeight: 500, color: accent, lineHeight: 1 }}>{info.priceMiles}</span>
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '10px', letterSpacing: '0.16em', color: 'var(--v3-color-inkMuted)', textTransform: 'uppercase', marginLeft: '4px' }}>mi · executive introduction</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL GET + SAMPLE QUESTION */}
      <section className="reveal canon-grid" style={{ background: 'var(--v3-color-white)', borderBottom: '1px solid var(--v3-color-divider)', padding: '72px 32px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.26em', color: 'var(--v3-color-inkMuted)', marginBottom: '14px' }}>
              What you&apos;ll get
            </div>
            <h2 style={{ fontFamily: 'var(--v3-font-display)', fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 500, color: 'var(--v3-color-ink)', margin: '0 0 24px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              A consulting-grade deliverable, not a survey result.
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '01', title: 'Executive summary', text: 'A one-line verdict and three key findings you can grasp in 30 seconds.' },
                { icon: '02', title: `${info.dimensions.length}-dimension scorecard`, text: 'Each dimension scored 0–100 against executive benchmarks, with progressive-reveal interpretation.' },
                { icon: '03', title: `${info.archetype_count} archetypes`, text: `Your leadership archetype identified, with defining traits and how it plays in APAC contexts.` },
                { icon: '04', title: 'Development roadmap', text: 'Prioritised actions with timelines — not generic advice, but targeted next steps.' },
                { icon: '05', title: 'NEXUS deep-dive access', text: 'Ask NEXUS to explain any finding, synthesise across diagnostics, or pressure-test a decision.' },
              ].map((item) => (
                <li key={item.icon} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '12px 0', borderTop: '1px solid var(--v3-color-divider)' }}>
                  <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '11px', color: accent, fontWeight: 600, flexShrink: 0, paddingTop: '2px' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--v3-font-display)', fontSize: '15px', fontWeight: 500, color: 'var(--v3-color-ink)', marginBottom: '3px' }}>{item.title}</div>
                    <div style={{ fontFamily: 'var(--v3-font-body)', fontSize: '13px', color: 'var(--v3-color-inkSecondary)', lineHeight: 1.55 }}>{item.text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ border: '1px solid var(--v3-color-dividerStrong)', padding: '32px 28px', background: 'var(--v3-color-paper)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--v3-color-inkMuted)' }}>Sample question</span>
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '10px', color: 'var(--v3-color-inkMuted)', letterSpacing: '0.1em' }}>~{Math.max(1, Math.round(info.duration_minutes / info.total_questions))} min · 1 of {info.total_questions}</span>
            </div>
            <div style={{ padding: '16px 18px', background: 'var(--v3-color-paperSecondary)', borderLeft: `3px solid ${accent}`, marginBottom: '20px' }}>
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '9px', color: accent, marginBottom: '6px', display: 'block' }}>Scenario</span>
              <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: '13px', color: 'var(--v3-color-inkSecondary)', lineHeight: 1.6, margin: 0 }}>
                You&apos;re six months into an APAC mandate. Headquarters is pushing for a quarterly win; your local team is asking you to protect a 3-year relationship that hasn&apos;t yet converted to revenue.
              </p>
            </div>
            <h3 style={{ fontFamily: 'var(--v3-font-display)', fontSize: '18px', fontWeight: 500, color: 'var(--v3-color-ink)', lineHeight: 1.35, margin: '0 0 20px' }}>
              How do you frame the decision back to headquarters?
            </h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {['1', '2', '3', '4', '5'].map((n, i) => (
                <div key={n} style={{ flex: 1, height: '44px', border: '1px solid var(--v3-color-dividerStrong)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--v3-font-body)', fontSize: '15px', fontWeight: 600, background: i === 3 ? accent : 'var(--v3-color-white)', color: i === 3 ? 'var(--v3-color-white)' : 'var(--v3-color-inkMuted)' }}>
                  {n}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '9px', color: 'var(--v3-color-inkMuted)' }}>Defer to short-term</span>
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '9px', color: accent }}>Protect long-term</span>
            </div>
            <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: '12px', color: 'var(--v3-color-inkSecondary)', lineHeight: 1.5, margin: '20px 0 0', borderTop: '1px solid var(--v3-color-divider)', paddingTop: '16px' }}>
              Scenario-based items replace abstract self-report. You answer in context, not in theory — the way executives actually decide.
            </p>
          </div>
        </div>
      </section>

      {/* DIMENSIONS */}
      <section className="reveal section-padding" style={{ maxWidth: '1120px', margin: '0 auto', padding: '88px 32px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div
            style={{
              fontFamily: 'var(--v3-font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.26em',
              color: 'var(--v3-color-inkMuted)',
              marginBottom: '12px',
            }}
          >
            Instrument dimensions
          </div>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 500,
              color: 'var(--v3-color-ink)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.18,
              letterSpacing: '-0.01em',
            }}
          >
            Measured on {info.dimensions.length} axes of executive capability.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 0, borderLeft: '1px solid var(--v3-color-divider)', borderTop: '1px solid var(--v3-color-divider)' }}>
          {info.dimensions.map((d, i) => (
            <div
              key={d.id}
              style={{
                background: 'var(--v3-color-white)',
                borderRight: '1px solid var(--v3-color-divider)',
                borderBottom: '1px solid var(--v3-color-divider)',
                padding: '22px 20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    background: accent,
                    color: 'var(--v3-color-white)',
                    fontFamily: 'var(--v3-font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '10px', letterSpacing: '0.18em', color: 'var(--v3-color-inkMuted)', textTransform: 'uppercase' }}>
                  D{i + 1}
                </div>
              </div>
              <h3 style={{ fontFamily: 'var(--v3-font-display)', fontSize: '16px', fontWeight: 500, color: 'var(--v3-color-ink)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                {d.name}
              </h3>
              <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: '12.5px', color: 'var(--v3-color-inkSecondary)', lineHeight: 1.55, margin: '0 0 12px' }}>
                {d.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--v3-font-mono)', fontSize: '9.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--v3-color-inkMuted)' }}>
                <span>← {d.lowLabel}</span>
                <span style={{ color: accent }}>{d.question_count}Q</span>
                <span>{d.highLabel} →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TIERS */}
      <section
        style={{ background: 'var(--v3-color-paper)', padding: '88px 32px', borderTop: '1px solid var(--v3-color-divider)', borderBottom: '1px solid var(--v3-color-divider)' }}
      >
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div
              style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.26em',
                color: 'var(--v3-color-inkMuted)',
                marginBottom: '12px',
              }}
            >
              Miles pricing
            </div>
            <h2
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 500,
                color: 'var(--v3-color-ink)',
                maxWidth: '640px',
                margin: '0 auto 10px',
                lineHeight: 1.18,
              }}
            >
              Executive Introduction. Professional Deep-Dive. Executive Advisory.
            </h2>
            <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: '14px', color: 'var(--v3-color-inkSecondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
              Spend miles on the depth that matches your current transition point. Earn miles through NEXUS engagement, or subscribe monthly.
            </p>
          </div>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 0, borderLeft: '1px solid var(--v3-color-divider)', borderTop: '1px solid var(--v3-color-divider)' }}>
            {info.pricing.map((p, idx) => {
              const highlight = idx === 1;
              return (
                <div
                  key={p.tier}
                  style={{
                    background: highlight ? 'var(--v3-color-ink)' : 'var(--v3-color-white)',
                    borderRight: '1px solid var(--v3-color-divider)',
                    borderBottom: '1px solid var(--v3-color-divider)',
                    borderLeft: highlight ? `2px solid ${accent}` : 'none',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  {highlight && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-1px',
                        right: '24px',
                        transform: 'translateY(-50%)',
                        background: accent,
                        color: 'var(--v3-color-white)',
                        fontFamily: 'var(--v3-font-mono)',
                        fontSize: '9px',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        padding: '4px 10px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Recommended
                    </div>
                  )}
                  <div style={{ marginBottom: '20px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        background: highlight ? accent : `${accent}10`,
                        color: highlight ? 'var(--v3-color-white)' : accent,
                        fontFamily: 'var(--v3-font-mono)',
                        fontSize: '10px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                      }}
                    >
                      {p.tier.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--v3-font-display)', fontSize: '22px', fontWeight: 500, color: highlight ? 'var(--v3-color-white)' : 'var(--v3-color-ink)', marginBottom: '4px' }}>
                    {p.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'var(--v3-font-display)', fontSize: '28px', fontWeight: 500, color: accent, lineHeight: 1 }}>
                      {p.miles_cost}
                    </span>
                    <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: highlight ? 'var(--v3-color-paperMuted)' : 'var(--v3-color-inkMuted)', textTransform: 'uppercase', marginLeft: '2px' }}>
                      mi · one instrument
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    {p.features.map(f => (
                      <li
                        key={f}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'flex-start',
                          fontFamily: 'var(--v3-font-body)',
                          fontSize: '12.5px',
                          lineHeight: 1.5,
                          color: highlight ? 'var(--v3-color-paperSecondary)' : 'var(--v3-color-inkSecondary)',
                        }}
                      >
                        <span style={{ width: '5px', height: '5px', marginTop: '7px', background: accent, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/nexus/chat"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '14px 18px',
                      background: highlight ? accent : 'var(--v3-color-ink)',
                      color: 'var(--v3-color-white)',
                      textDecoration: 'none',
                      fontFamily: 'var(--v3-font-body)',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.16em',
                      boxSizing: 'border-box',
                    }}
                  >
                    Unlock with NEXUS <ArrowRight style={{ width: 13, height: 13 }} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ARCHETYPES (if any) */}
      {info.archetypes.length > 0 && (
        <section className="reveal section-padding" style={{ maxWidth: '1120px', margin: '0 auto', padding: '88px 32px 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div
              style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.26em',
                color: 'var(--v3-color-inkMuted)',
                marginBottom: '12px',
              }}
            >
              Archetype library
            </div>
            <h2
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 500,
                color: 'var(--v3-color-ink)',
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: 1.18,
              }}
            >
              {info.archetype_count} executive profiles.
            </h2>
            <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: '14px', color: 'var(--v3-color-inkSecondary)', maxWidth: '520px', margin: '12px auto 0', lineHeight: 1.6 }}>
              The {info.code} instrument classifies every profile into a named archetype with development implications.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 0, borderLeft: '1px solid var(--v3-color-divider)', borderTop: '1px solid var(--v3-color-divider)' }}>
            {info.archetypes.slice(0, 12).map((a) => (
              <div
                key={a.name}
                style={{
                  background: 'var(--v3-color-white)',
                  borderRight: '1px solid var(--v3-color-divider)',
                  borderBottom: '1px solid var(--v3-color-divider)',
                  padding: '20px 18px',
                }}
              >
                <div style={{ fontFamily: 'var(--v3-font-display)', fontSize: '15px', fontWeight: 500, color: 'var(--v3-color-ink)', marginBottom: '8px' }}>
                  {a.name}
                </div>
                <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: '12px', color: 'var(--v3-color-inkSecondary)', lineHeight: 1.55, margin: '0 0 10px', minHeight: '48px' }}>
                  {a.description || a.traits?.[0] || ''}
                </p>
                {a.traits && a.traits.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {a.traits.slice(0, 2).map(t => (
                      <span
                        key={t}
                        style={{
                          fontFamily: 'var(--v3-font-mono)',
                          fontSize: '9px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '3px 8px',
                          background: `${accent}10`,
                          color: accent,
                        }}
                      >
                        {t.slice(0, 36)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section
        className="reveal"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '100px 32px',
          textAlign: 'center',
          marginTop: '48px',
          background: 'var(--v3-color-cream)',
          borderTop: '1px solid var(--v3-color-divider)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--v3-font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
              color: 'var(--v3-color-inkMuted)',
              marginBottom: '16px',
            }}
          >
            Begin with {info.code}
          </div>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 500,
              color: 'var(--v3-color-ink)',
              margin: '0 0 16px',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            One conversation with NEXUS.<br />Your {info.code} profile unlocked.
          </h2>
          <p
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontSize: '15px',
              color: 'var(--v3-color-inkSecondary)',
              maxWidth: '460px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            NEXUS surfaces the right diagnostic at the right moment. Start a conversation and let it guide you into {info.name}.
          </p>
          <a
            href="/nexus/chat"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '18px 36px',
              background: accent,
              color: 'var(--v3-color-white)',
              fontFamily: 'var(--v3-font-body)',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              textDecoration: 'none',
            }}
          >
            Chat with NEXUS <ArrowRight style={{ width: 14, height: 14 }} />
          </a>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, value, label, accent }: { icon: any; value: string; label: string; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          background: `${accent}1F`,
          color: accent,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon style={{ width: 18, height: 18 }} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--v3-font-display)', fontSize: '22px', fontWeight: 500, lineHeight: 1, color: 'var(--v3-color-ink)' }}>{value}</div>
        <div style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '9.5px', letterSpacing: '0.16em', color: 'var(--v3-color-inkMuted)', marginTop: '4px', textTransform: 'uppercase' }}>{label}</div>
      </div>
    </div>
  );
}
