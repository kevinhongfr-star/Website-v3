import React, { CSSProperties, ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import type { V3Accent } from '@/styles/v3-tokens';

export interface PageHeaderProps {
  /** Mono uppercase eyebrow label. */
  eyebrow?: ReactNode;
  /** Accent color for the eyebrow (default: auto). */
  eyebrowAccent?: V3Accent | 'auto';
  /** Display headline. Editorial Crimson Pro. If italicEmphasis is used,
   *  that one word is wrapped in `<em>` (italic Crimson Pro). */
  headline: ReactNode;
  /** Optional — italic-Emphasis word, rendered as one emphasized word
   *  in the headline. Kept to "one word max" per the brief rule. */
  headlineItalicWord?: string;
  /** If true, headline uses display-xl (72px / 1.1) instead of display-lg
   *  (56px / 1.15). Default true — hero style. */
  xl?: boolean;
  /** Lead paragraph — Inter 18px. */
  lead?: ReactNode;
  /** Optional CTA row: render any mix of <Button> + plain links. */
  cta?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Restrict headline max-width to narrower editorial column. Default `65ch`. */
  headlineMaxWidth?: string;
  leadMaxWidth?: string;
}

/**
 * V3 PageHeader primitive. Standard hero for interior marketing pages:
 * Eyebrow → Display headline (Crimson Pro) → Lead paragraph → CTA row.
 * Uses v3 tokens — use inside a <Section> to get .v3-root scope.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  eyebrowAccent = 'auto',
  headline,
  headlineItalicWord,
  xl = true,
  lead,
  cta,
  className = '',
  style,
  headlineMaxWidth = '20ch',
  leadMaxWidth = '60ch',
}) => {
  const headlineSize = xl
    ? {
        fontSize: 'var(--v3-text-display-xl)',
        lineHeight: 'var(--v3-leading-display-xl)',
        fontWeight: 300,
      }
    : {
        fontSize: 'var(--v3-text-display-lg)',
        lineHeight: 'var(--v3-leading-display-lg)',
        fontWeight: 300,
      };

  const headlineStyle: CSSProperties = {
    fontFamily: 'var(--v3-font-display)',
    color: 'inherit',
    margin: 0,
    letterSpacing: 'var(--v3-tracking-tight)',
    maxWidth: headlineMaxWidth,
    ...headlineSize,
  };

  const leadStyle: CSSProperties = {
    fontFamily: 'var(--v3-font-body)',
    fontWeight: 400,
    fontSize: 'var(--v3-text-body-lg)',
    lineHeight: 'var(--v3-leading-body-lg)',
    margin: 0,
    marginTop: 'var(--v3-space-6)',
    color: 'inherit',
    opacity: 0.9,
    maxWidth: leadMaxWidth,
  };

  const eyebrowWrap = eyebrow ? (
    <div style={{ marginBottom: 'var(--v3-space-5)' }}>
      <Eyebrow accent={eyebrowAccent}>{eyebrow}</Eyebrow>
    </div>
  ) : null;

  const headlineEl = (
    <h1 style={headlineStyle}>
      {headline}
      {headlineItalicWord ? (
        <>
          {' '}
          <em style={{ fontStyle: 'italic' }}>{headlineItalicWord}</em>
        </>
      ) : null}
    </h1>
  );

  const leadEl = lead ? <p style={leadStyle}>{lead}</p> : null;

  const ctaEl = cta ? (
    <div
      style={{
        marginTop: 'var(--v3-space-7)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--v3-space-5)',
        alignItems: 'center',
      }}
    >
      {cta}
    </div>
  ) : null;

  return (
    <header className={`v3-page-header ${className}`.trim()} style={style}>
      {eyebrowWrap}
      {headlineEl}
      {leadEl}
      {ctaEl}
      <style>{`
        .v3-root[data-bg-mode="dark"] .v3-page-header h1 {
          color: var(--v3-color-paper);
        }
        .v3-root[data-bg-mode="dark"] .v3-page-header p {
          color: var(--v3-color-paper-secondary);
        }
      `}</style>
    </header>
  );
};
