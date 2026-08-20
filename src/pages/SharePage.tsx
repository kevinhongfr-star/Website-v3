
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getShareCard, type ShareCard, type ShareCardType } from '../services/shareCardService';
import type { SharedAssessmentPayload } from '../services/assessmentShareService';
import { SEO } from '@/components/seo/SEO';

interface Teaser {
  eyebrow: string;
  name: string;
  headline: string;
  headlineSub?: string;
  metric?: { label: string; value: string };
  insights: string[];
}

const DIMENSION_LABELS: Record<string, string> = {
  strategic_orientation: 'Strategic Orientation',
  cross_border_adaptability: 'Cross-border Adaptability',
  stakeholder_influence: 'Stakeholder Influence',
  experience: 'Experience',
  skills: 'Skills',
  fit: 'Fit',
};

function humanizeKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function topDimension(
  scores: Record<string, number> | undefined
): { label: string; score: number } | null {
  if (!scores) return null;
  const entries = Object.entries(scores).filter(
    ([, v]) => typeof v === 'number' && !Number.isNaN(v)
  );
  if (entries.length === 0) return null;
  entries.sort((a, b) => b[1] - a[1]);
  const [key, score] = entries[0];
  return { label: DIMENSION_LABELS[key] || humanizeKey(key), score };
}

function buildTeaserFromCard(card: ShareCard): Teaser {
  const data = card.data || {};

  switch (card.type as ShareCardType) {
    case 'trident': {
      const top = topDimension(data.dimension_scores);
      const insights: string[] = [];
      if (data.verdict) insights.push(String(data.verdict));
      if (top) insights.push(`Leading dimension: ${top.label} (${top.score}/100).`);
      return {
        eyebrow: 'Match Scorecard',
        name: data.candidate_name || 'Candidate',
        headline: data.verdict || 'Strong Primary',
        headlineSub: data.role || 'Assessed for Executive Role',
        metric:
          typeof data.composite_score === 'number'
            ? { label: 'Composite Score', value: `${data.composite_score}/100` }
            : undefined,
        insights: insights.slice(0, 2),
      };
    }

    case 'progress': {
      const dims = [
        { old: data.strategic_old, new: data.strategic_new, label: 'Strategic Orientation' },
        { old: data.adaptability_old, new: data.adaptability_new, label: 'Cross-border Adaptability' },
        { old: data.influence_old, new: data.influence_new, label: 'Stakeholder Influence' },
      ].filter(
        (d) => typeof d.old === 'number' && typeof d.new === 'number'
      ) as { old: number; new: number; label: string }[];
      const topGain = dims
        .map((d) => ({ ...d, delta: d.new - d.old }))
        .sort((a, b) => b.delta - a.delta)[0];
      const insights: string[] = [];
      if (topGain && topGain.delta > 0) {
        insights.push(`+${topGain.delta} pts in ${topGain.label}.`);
      }
      insights.push('Cross-border readiness strengthened over the quarter.');
      return {
        eyebrow: 'Quarterly Progress',
        name: data.name || 'Executive',
        headline: `${data.readiness_old || 'Developing'} → ${data.readiness_new || 'Advanced'}`,
        headlineSub: 'Cross-border readiness, 3-month change',
        metric: undefined,
        insights: insights.slice(0, 2),
      };
    }

    case 'assessment':
    default: {
      const insights: string[] = [];
      if (Array.isArray(data.keyFindings)) {
        for (const f of data.keyFindings) {
          if (typeof f === 'string' && f.trim()) insights.push(f.trim());
          if (insights.length >= 2) break;
        }
      }
      if (insights.length === 0) {
        const top = topDimension(data.dimension_scores);
        if (top) insights.push(`Strongest dimension: ${top.label} (${top.score}/100).`);
      }
      const readiness = data.cross_border_readiness;
      const hasReadiness =
        readiness && (readiness.label || typeof readiness.score === 'number');
      return {
        eyebrow: 'Diagnostic',
        name: data.name || 'Executive',
        headline: data.archetype || 'Strategic Leader',
        headlineSub: data.tagline,
        metric: hasReadiness
          ? {
              label: 'Cross-border Readiness',
              value: `${readiness.label || 'Advanced'}${
                typeof readiness.score === 'number' ? ` · ${readiness.score}/100` : ''
              }`,
            }
          : undefined,
        insights: insights.slice(0, 2),
      };
    }
  }
}

function buildTeaserFromPayload(payload: SharedAssessmentPayload): Teaser {
  const insights: string[] = [];
  const dims = payload.dimensions || [];
  const sorted = [...dims].sort(
    (a, b) => (typeof b.score === 'number' ? b.score : 0) - (typeof a.score === 'number' ? a.score : 0)
  );
  if (sorted[0]) {
    insights.push(
      `Leading dimension: ${sorted[0].name} (${Math.round(sorted[0].score)}/100).`
    );
  }
  if (payload.composite_interpretation) {
    insights.push(String(payload.composite_interpretation).slice(0, 240));
  } else if (sorted[sorted.length - 1]) {
    const w = sorted[sorted.length - 1];
    insights.push(
      `Priority growth: ${w.name} (${Math.round(w.score)}/100).`
    );
  }

  const headline = payload.archetype || payload.overall_tier || 'Leadership Profile';
  const headlineSub = payload.archetype_description
    ? String(payload.archetype_description).slice(0, 180)
    : payload.assessment_name || 'Executive Diagnostic';

  return {
    eyebrow: payload.assessment_code
      ? `${payload.assessment_code} · Diagnostic Result`
      : 'Diagnostic Result',
    name: 'Shared Result',
    headline,
    headlineSub,
    metric: {
      label: payload.assessment_code ? `${payload.assessment_code} Composite Score` : 'Composite Score',
      value: `${Math.round(payload.overall_score)}/100${
        payload.overall_tier ? ` · ${payload.overall_tier}` : ''
      }`,
    },
    insights: insights.slice(0, 2),
  };
}

interface PayloadDimsRow {
  label: string;
  score: number;
  tier: string;
}
function getDimsRows(payload: SharedAssessmentPayload): PayloadDimsRow[] {
  return (payload.dimensions || []).map((d) => ({
    label: d.name,
    score: typeof d.score === 'number' ? d.score : 0,
    tier: d.tier || '',
  }));
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--v3-font-mono)',
  fontSize: '11px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: 'var(--v3-color-ink-muted)',
  fontWeight: 500,
};

function ThinDivider() {
  return <div style={{ height: '1px', background: 'var(--v3-color-divider)' }} />;
}

export function SharePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shareCard, setShareCard] = useState<ShareCard | null>(null);
  const [sharedPayload, setSharedPayload] = useState<SharedAssessmentPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    loadShareData(id);
  }, [id]);

  const loadShareData = async (publicId: string) => {
    try {
      const card = await getShareCard(publicId);
      if (card) {
        setShareCard(card);
        return;
      }

      const api = await fetch(`/api/assessments/meta?action=share&token=${encodeURIComponent(publicId)}`);
      if (api.ok) {
        const body = await api.json();
        if (body?.ok && body?.payload) {
          setSharedPayload(body.payload as SharedAssessmentPayload);
          return;
        }
        if (body?.error) {
          setError(body.error);
          return;
        }
      }

      setError('Share card not found');
    } catch (e) {
      console.error('Failed to load share card:', e);
      setError('Failed to load share card');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--v3-color-cream)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          gap: '20px',
        }}
      >
        <div
          role="status"
          aria-busy="true"
          aria-label="Preparing profile"
          style={{
            width: '40px',
            height: '40px',
            border: `3px solid var(--v3-color-divider)`,
            borderTopColor: 'var(--v3-color-fuchsia)',
            animation: 'echo-spin 1s linear infinite',
          }}
        />
        <div style={{ ...eyebrowStyle, color: 'var(--v3-color-ink-muted)' }}>Preparing profile</div>
      </div>
    );
  }

  if (error || !shareCard) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--v3-color-cream)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '420px' }}>
          <div style={{ ...eyebrowStyle, marginBottom: '12px' }}>LYC Intelligence</div>
          <h1
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--v3-color-ink)',
              margin: '0 0 8px',
            }}
          >
            Profile unavailable
          </h1>
          <p style={{ fontFamily: 'var(--v3-font-body)', fontSize: '14px', color: 'var(--v3-color-ink-secondary)', marginBottom: '24px' }}>
            {error || 'This share card may have expired or been removed.'}
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              minHeight: '44px',
              padding: '14px 24px',
              background: 'var(--v3-color-fuchsia)',
              color: 'var(--v3-color-cream)',
              border: 'none',
              fontFamily: 'var(--v3-font-mono)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              lineHeight: '20px',
              boxSizing: 'border-box',
              transition: 'opacity 200ms ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const teaser = shareCard
    ? buildTeaserFromCard(shareCard)
    : buildTeaserFromPayload(sharedPayload!);
  const seoTitle = `${teaser.headline} — ${teaser.eyebrow} | LYC Intelligence`;
  const seoDescription =
    `${teaser.eyebrow} from LYC Intelligence — ${teaser.headline}${
      teaser.metric ? ` · ${teaser.metric.label}: ${teaser.metric.value}` : ''
    }. Take your complimentary diagnostic to unlock your full report.`;
  const payloadDims = sharedPayload ? getDimsRows(sharedPayload) : [];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--v3-color-cream)', padding: '32px 16px 48px' }}>
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/share/${id}`}
        ogImage={shareCard.image_url || undefined}
      />

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          animation: 'echo-fade-in 200ms cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span
            style={{
              fontFamily: 'var(--v3-font-mono)',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--v3-color-ink)',
              fontWeight: 500,
            }}
          >
            LYC Intelligence
          </span>
        </div>

        <article
          style={{
            background: 'var(--v3-color-white)',
            border: '1px solid var(--v3-color-divider)',
            animation: 'echo-slide-in-up 300ms cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <div style={{ padding: '32px 28px 28px' }}>
            <div style={{ ...eyebrowStyle, marginBottom: '14px', color: 'var(--v3-color-fuchsia)' }}>{teaser.eyebrow}</div>
            <h1
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: 'var(--v3-text-display-md)',
                fontWeight: 700,
                lineHeight: 'var(--v3-leading-display-md)',
                color: 'var(--v3-color-ink)',
                margin: '0 0 12px',
              }}
            >
              {teaser.name}
            </h1>
            <div
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--v3-color-fuchsia)',
                lineHeight: 1.25,
              }}
            >
              {teaser.headline}
            </div>
            {teaser.headlineSub && (
              <div
                style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: '14px',
                  color: 'var(--v3-color-ink-secondary)',
                  marginTop: '10px',
                  lineHeight: 1.5,
                }}
              >
                {teaser.headlineSub}
              </div>
            )}
          </div>

          {teaser.metric && (
            <>
              <ThinDivider />
              <div
                style={{
                  padding: '20px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '12px',
                }}
              >
                <span style={eyebrowStyle}>{teaser.metric.label}</span>
                <span
                  style={{
                    fontFamily: 'var(--v3-font-display)',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'var(--v3-color-ink)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {teaser.metric.value}
                </span>
              </div>
            </>
          )}

          <ThinDivider />
          <div style={{ padding: '28px' }}>
            <div style={{ ...eyebrowStyle, marginBottom: '16px' }}>Key Insights</div>
            {teaser.insights.length > 0 ? (
              <ul
                style={{
                  listStyle: 'none',
                  margin: '0',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {teaser.insights.map((insight, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      fontFamily: 'var(--v3-font-body)',
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: 'var(--v3-color-ink-secondary)',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: '6px',
                        height: '6px',
                        background: 'var(--v3-color-fuchsia)',
                        marginTop: '9px',
                      }}
                    />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                style={{
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: '14px',
                  color: 'var(--v3-color-ink-muted)',
                  margin: '0',
                  lineHeight: 1.6,
                }}
              >
                A preview of this profile is available in the full report.
              </p>
            )}
          </div>

          {payloadDims.length > 0 && (
            <>
              <ThinDivider />
              <div style={{ padding: '28px' }}>
                <div style={{ ...eyebrowStyle, marginBottom: '16px' }}>Dimension Breakdown</div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  {payloadDims.map((d) => (
                    <div key={d.label}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          gap: '12px',
                          marginBottom: '8px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--v3-font-body)',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--v3-color-ink)',
                          }}
                        >
                          {d.label}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--v3-font-mono)',
                            fontSize: '12px',
                            color: 'var(--v3-color-ink-secondary)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {Math.round(d.score)}/100{d.tier ? ` · ${d.tier}` : ''}
                        </span>
                      </div>
                      <div
                        role="presentation"
                        style={{
                          width: '100%',
                          height: '6px',
                          background: 'var(--v3-color-divider)',
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.max(0, Math.min(100, d.score))}%`,
                            height: '100%',
                            background: 'var(--v3-color-fuchsia)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <ThinDivider />
          <div
            style={{
              padding: '20px 28px',
              background: 'var(--v3-color-cream)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: '12px',
                color: 'var(--v3-color-ink-secondary)',
                margin: '0 0 6px',
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--v3-font-mono)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: 'var(--v3-color-ink-muted)',
                  marginRight: '8px',
                }}
              >
                Privacy
              </span>
              This share was created by the original diagnostic owner and contains no
              personally identifiable information. Share links can be revoked by the owner at
              any time.
            </p>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: '12px',
                color: 'var(--v3-color-ink-secondary)',
                margin: '0',
                lineHeight: 1.6,
              }}
            >
              This is a preview. Full reports include executive narrative, archetype deep
              dive, prioritized development roadmap, and a downloadable branded PDF.
            </p>
          </div>
        </article>

        <div style={{ marginTop: '28px' }}>
          <Link
            to="/diagnostics"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              minHeight: '48px',
              padding: '16px 24px',
              background: 'var(--v3-color-fuchsia)',
              color: 'var(--v3-color-cream)',
              border: 'none',
              fontFamily: 'var(--v3-font-mono)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxSizing: 'border-box',
              transition: 'opacity 200ms ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Take this diagnostic yourself →
          </Link>
        </div>

        <div style={{ marginTop: '12px' }}>
          <Link
            to="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '48px',
              padding: '14px 24px',
              background: 'transparent',
              color: 'var(--v3-color-ink-secondary)',
              border: '1px solid var(--v3-color-divider)',
              fontFamily: 'var(--v3-font-body)',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 200ms ease, color 200ms ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--v3-color-fuchsia)';
              e.currentTarget.style.color = 'var(--v3-color-fuchsia)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--v3-color-divider)';
              e.currentTarget.style.color = 'var(--v3-color-ink-secondary)';
            }}
          >
            Sign in to unlock your full report
          </Link>
        </div>

        <footer
          style={{
            marginTop: '36px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--v3-font-mono)',
              fontSize: '11px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--v3-color-ink-muted)',
            }}
          >
            Powered by LYC Intelligence
          </div>
          <Link
            to="/nexus/chat"
            style={{
              display: 'inline-block',
              minHeight: '44px',
              padding: '12px 16px',
              fontFamily: 'var(--v3-font-body)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--v3-color-ink)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--v3-color-divider)',
              boxSizing: 'border-box',
              transition: 'border-color 200ms ease, color 200ms ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--v3-color-fuchsia)';
              e.currentTarget.style.color = 'var(--v3-color-fuchsia)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--v3-color-divider)';
              e.currentTarget.style.color = 'var(--v3-color-ink)';
            }}
          >
            Discuss your results with NEXUS →
          </Link>
          <div
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontSize: '11px',
              color: 'var(--v3-color-ink-muted)',
              marginTop: '4px',
            }}
          >
            © 2026 LYC Intelligence
          </div>
        </footer>
      </div>
    </div>
  );
}
