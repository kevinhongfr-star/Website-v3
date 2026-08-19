import React, { CSSProperties, ReactNode } from 'react';

export interface FeatureRowProps {
  /** Mono label/number column. Keep short — "01", "02", or an eyebrow word. */
  label: ReactNode;
  /** Title — Crimson Pro 400 / 40px or Inter semibold. */
  title: ReactNode;
  /** Description — Inter 400 / 16px 1.6. */
  description?: ReactNode;
  /** Optional right-aligned link/CTA slot (render a <Button variant="ghost"> here). */
  cta?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** If `true`, renders the title in Crimson Pro display-md (default `false` → Inter semibold 28px). */
  displayTitle?: boolean;
}

/**
 * V3 FeatureRow primitive. Text-first editorial pattern:
 *   [label/number]  [Title ...description.....................]  [→ cta]
 *
 * Split into a 3-part grid: 80px label + flexible title/description
 * column + optional CTA column. Zero cards, zero radius, thin divider
 * underneath via <Divider variant="light" width="content"> (rendered by
 * the caller when stacking rows).
 */
export const FeatureRow: React.FC<FeatureRowProps> = ({
  label,
  title,
  description,
  cta,
  className = '',
  style,
  displayTitle = false,
}) => {
  const labelStyle: CSSProperties = {
    fontFamily: 'var(--v3-font-mono)',
    fontWeight: 400,
    fontSize: 'var(--v3-text-label)',
    lineHeight: 'var(--v3-leading-label)',
    letterSpacing: 'var(--v3-tracking-label)',
    textTransform: 'uppercase',
    color: 'inherit',
    opacity: 0.75,
    width: '80px',
    minWidth: '80px',
    flexShrink: 0,
  };

  const titleStyle: CSSProperties = displayTitle
    ? {
        fontFamily: 'var(--v3-font-display)',
        fontWeight: 400,
        fontSize: 'var(--v3-text-display-md)',
        lineHeight: 'var(--v3-leading-display-md)',
        color: 'inherit',
        margin: 0,
        letterSpacing: 'var(--v3-tracking-tight)',
      }
    : {
        fontFamily: 'var(--v3-font-body)',
        fontWeight: 600,
        fontSize: 'var(--v3-text-heading-lg)',
        lineHeight: 'var(--v3-leading-heading-lg)',
        color: 'inherit',
        margin: 0,
      };

  const descStyle: CSSProperties = {
    fontFamily: 'var(--v3-font-body)',
    fontWeight: 400,
    fontSize: 'var(--v3-text-body)',
    lineHeight: 'var(--v3-leading-body)',
    color: 'inherit',
    opacity: 0.78,
    margin: 0,
    marginTop: 'var(--v3-space-4)',
    maxWidth: '62ch',
  };

  return (
    <div
      className={`v3-feature-row ${className}`.trim()}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        columnGap: 'var(--v3-space-6)',
        rowGap: 'var(--v3-space-4)',
        paddingBlock: 'var(--v3-space-7)',
        ...style,
      }}
    >
      <div style={labelStyle} aria-hidden={false}>
        {label}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={titleStyle}>{title}</h3>
        {description ? <p style={descStyle}>{description}</p> : null}
      </div>
      {cta ? (
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'flex-start',
            paddingTop: '2px',
          }}
        >
          {cta}
        </div>
      ) : null}
      <style>{`
        @media (max-width: 640px) {
          .v3-feature-row {
            flex-wrap: wrap;
            row-gap: var(--v3-space-3);
          }
        }
        .v3-root[data-bg-mode="dark"] .v3-feature-row p {
          color: var(--v3-color-paper-secondary);
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
