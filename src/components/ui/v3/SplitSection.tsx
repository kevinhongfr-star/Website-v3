/**
 * V3 · SplitSection — 2-column editorial "What it is".
 *
 * Layout (desktop):
 *   Left: mono section label (eyebrow) + Crimson Pro section title.
 *   Right: Inter 16px body copy (2-3 paragraphs, accepts ReactNode).
 *   Thin 1px teal (or accent) divider on top of the block, per template.
 *
 * Mobile (<900px): stacks — title above, body below.
 *
 * Zero radius, zero shadows, zero enclosing borders.
 */
import React, { CSSProperties } from 'react';
import type { V3Accent } from '@/styles/v3-tokens';
import { Eyebrow } from './Eyebrow';

export type SplitSectionAccent = V3Accent | 'auto';

export interface SplitSectionProps {
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
  accent?: SplitSectionAccent;
  id?: string;
  style?: CSSProperties;
  className?: string;
}

export function SplitSection({
  label,
  title,
  children,
  accent = 'ink',
  id,
  style,
  className,
}: SplitSectionProps): React.ReactElement {
  return (
    <section
      id={id}
      className={className}
      style={{
        borderTop: '1px solid var(--v3-color-divider-strong)',
        paddingBlock: 'var(--v3-space-9)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 7fr)',
        gap: 'var(--v3-space-8)',
        ...style,
      }}
    >
      <div className="v3-split-left">
        <Eyebrow accent={accent}>{label}</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-md)',
            lineHeight: 'var(--v3-leading-display-md)',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-ink)',
            margin: '16px 0 0',
            maxWidth: '18ch',
          }}
          className="v3-split-title"
        >
          {title}
        </h2>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--v3-space-5)',
          color: 'var(--v3-color-ink-secondary)',
          fontFamily: 'var(--v3-font-body)',
          fontSize: 'var(--v3-text-body)',
          lineHeight: 'var(--v3-leading-body)',
          fontWeight: 400,
        }}
        className="v3-split-body"
      >
        {children}
      </div>
      <style>{`
        @media (max-width: 900px) {
          section:has(.v3-split-left),
          .v3-split-left { }
          section.v3-split-section,
          [class*="SplitSection"] > section,
          section:has(> .v3-split-left) {
            grid-template-columns: 1fr !important;
            gap: var(--v3-space-6) !important;
            padding-block: var(--v3-space-8) !important;
          }
          .v3-split-title { max-width: 28ch !important; }
        }
      `}</style>
    </section>
  );
}

export default SplitSection;
