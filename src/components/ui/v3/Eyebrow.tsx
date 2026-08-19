import React, { CSSProperties, ReactNode } from 'react';
import type { V3Accent } from '@/styles/v3-tokens';

export interface EyebrowProps {
  /** Accent color. Defaults to fuchsia in light mode, paper-secondary in dark mode when 'auto'. */
  accent?: V3Accent | 'auto';
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** If true, does not uppercase-ify the children (default: true). */
  uppercase?: boolean;
}

/**
 * V3 Eyebrow primitive.
 * Mono uppercase label, 12px / 1.4, +0.08em tracking.
 * Color defaults to fuchsia on light and paper-secondary on dark.
 */
export const Eyebrow: React.FC<EyebrowProps> = ({
  accent = 'auto',
  children,
  className = '',
  style,
  uppercase = true,
}) => {
  const base: CSSProperties = {
    fontFamily: 'var(--v3-font-mono)',
    fontWeight: 400,
    fontSize: 'var(--v3-text-label)',
    lineHeight: 'var(--v3-leading-label)',
    letterSpacing: 'var(--v3-tracking-label)',
    textTransform: uppercase ? 'uppercase' : 'none',
    margin: 0,
    padding: 0,
  };

  // Light-mode explicit accent colors. Dark-mode overrides via <style>
  // that keys off the parent `.v3-root[data-bg-mode="dark"]`.
  const accentColor =
    accent === 'fuchsia'
      ? 'var(--v3-color-fuchsia)'
      : accent === 'teal'
      ? 'var(--v3-color-teal)'
      : accent === 'ink'
      ? 'var(--v3-color-ink-muted)'
      : /* auto default (light mode): fuchsia */ 'var(--v3-color-fuchsia)';

  return (
    <p
      className={`v3-eyebrow ${className}`.trim()}
      style={{ ...base, color: accentColor, ...style }}
    >
      {children}
      <style>{`
        /* auto → on dark bg use paper-secondary instead of fuchsia */
        .v3-root[data-bg-mode="dark"] .v3-eyebrow:not([data-accent]) {
          color: var(--v3-color-paper-secondary) !important;
        }
        .v3-root[data-bg-mode="dark"] .v3-eyebrow[data-accent="ink"] {
          color: var(--v3-color-paper-muted) !important;
        }
      `}</style>
      {accent !== 'auto' ? <span data-accent={accent} style={{ display: 'none' }} /> : null}
    </p>
  );
};
