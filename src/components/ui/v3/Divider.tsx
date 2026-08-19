import React, { CSSProperties } from 'react';
import type { V3DividerVariant, V3DividerWidth } from '@/styles/v3-tokens';

export interface DividerProps {
  /** Opacity intensity. `light` = 8% default; `strong` = 15% */
  variant?: V3DividerVariant;
  /** `full` = edge-to-edge across container; `content` = within 1200px max-w */
  width?: V3DividerWidth;
  className?: string;
  style?: CSSProperties;
  /**
   * `auto` (default): picks the right color scheme from the nearest
   * `.v3-root[data-bg-mode="dark"]` ancestor. `light` / `dark`: pick a
   * specific color scheme explicitly.
   */
  scheme?: 'auto' | 'light' | 'dark';
}

/**
 * V3 Divider primitive. Thin rule line — editorial, zero thickness
 * beyond hairline (1px), zero radius. No cards, no shadows.
 */
export const Divider: React.FC<DividerProps> = ({
  variant = 'light',
  width = 'full',
  className = '',
  style,
  scheme = 'auto',
}) => {
  // Light-mode colors
  const lightColor =
    variant === 'strong'
      ? 'var(--v3-color-divider-strong)'
      : 'var(--v3-color-divider)';
  // Dark-mode colors
  const darkColor =
    variant === 'strong'
      ? 'var(--v3-color-divider-dark-strong)'
      : 'var(--v3-color-divider-dark)';

  const ruleStyle: CSSProperties = {
    border: 0,
    margin: 0,
    height: '1px',
    width: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    // Default to auto: light, overridden by [data-bg-mode="dark"] selector below.
    background: scheme === 'dark' ? darkColor : lightColor,
    ...style,
  };

  const innerWrapClass = width === 'content' ? 'v3-container' : '';

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`v3-divider v3-divider--${variant} v3-divider--w-${width} ${className}`.trim()}
    >
      {width === 'content' ? (
        <div className={innerWrapClass}>
          <hr style={ruleStyle} />
        </div>
      ) : (
        <hr style={ruleStyle} />
      )}
      <style>{`
        .v3-root[data-bg-mode="dark"] .v3-divider hr {
          background: ${scheme === 'light' ? lightColor : darkColor} !important;
        }
      `}</style>
    </div>
  );
};
