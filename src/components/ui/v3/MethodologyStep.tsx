/**
 * V3 · MethodologyStep — numbered "how it works" step, editorial.
 *
 * Layout:
 *   ┌──────┬────────────────────────────────────────────────────┐
 *   │  01  │  Bold step title (Crimson Pro 24-28)                │
 *   │      │  Short body description                             │
 *   └──────┴────────────────────────────────────────────────────┘
 *
 * - Large Crimson Pro serif number (56-64px, weight 300, accent-colored).
 * - Thin divider between steps (caller supplies dividers between steps,
 *   to match the "dividers only, no enclosing borders" rule, same as
 *   CapabilityRow pattern).
 *
 * Mobile: stacks — number above, title+body below.
 */
import React, { CSSProperties } from 'react';
import type { V3Accent } from '@/styles/v3-tokens';

type StepAccent = V3Accent | 'auto';

const accentText: Record<StepAccent, string> = {
  teal: 'var(--v3-color-teal)',
  fuchsia: 'var(--v3-color-fuchsia)',
  ink: 'var(--v3-color-ink)',
  auto: 'var(--v3-color-ink)',
};

export interface MethodologyStepProps {
  /** Step number string, e.g. "01" */
  number: string;
  /** Bold step title */
  title: React.ReactNode;
  /** Short body description */
  description: React.ReactNode;
  /** Accent for the serif number */
  accent?: StepAccent;
  style?: CSSProperties;
  className?: string;
}

export function MethodologyStep({
  number,
  title,
  description,
  accent = 'teal',
  style,
  className,
}: MethodologyStepProps): React.ReactElement {
  const numberColor = accentText[accent];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 120px) minmax(0, 1fr)',
        gap: 'var(--v3-space-5)',
        alignItems: 'start',
        paddingBlock: 'var(--v3-space-6)',
        ...style,
      }}
      className={className ?? 'v3-method-step'}
    >
      <div
        aria-hidden
        style={{
          fontFamily: 'var(--v3-font-display)',
          fontSize: '64px',
          lineHeight: 1,
          fontWeight: 300,
          letterSpacing: 'var(--v3-tracking-tight)',
          color: numberColor,
          userSelect: 'none',
        }}
      >
        {number}
      </div>
      <div>
        <h3
          style={{
            fontFamily: 'var(--v3-font-display)',
            fontSize: '24px',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-ink)',
            margin: '0 0 12px',
          }}
        >
          {title}
        </h3>
        <div
          style={{
            fontFamily: 'var(--v3-font-body)',
            fontSize: 'var(--v3-text-body)',
            lineHeight: 'var(--v3-leading-body)',
            fontWeight: 400,
            color: 'var(--v3-color-ink-secondary)',
          }}
        >
          {description}
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .v3-method-step {
            grid-template-columns: 1fr !important;
            gap: var(--v3-space-3) !important;
            padding-block: var(--v3-space-5) !important;
          }
        }
      `}</style>
    </div>
  );
}

export default MethodologyStep;
