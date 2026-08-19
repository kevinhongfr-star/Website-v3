import React, { CSSProperties, ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import type { V3ButtonVariant, V3ButtonAccent } from '@/styles/v3-tokens';

interface BaseButtonProps {
  variant?: V3ButtonVariant;
  accent?: V3ButtonAccent;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /**
   * Optional href — if provided, renders an `<a>` (e.g. external links,
   * marketing CTA URLs). Otherwise renders a `<button>`.
   */
  href?: string;
  /** When true, ensures display:inline-block so button doesn't stretch. */
  inline?: boolean;
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps | 'children' | 'className' | 'style'> & {
    href?: undefined;
  };
type ButtonAsAnchor = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps | 'children' | 'className' | 'style'> & {
    href: string;
  };

export type V3ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * V3 Button primitive. Three variants, zero radius, zero shadows.
 *
 *  - `primary`   — solid accent fill, cream text, mono uppercase label.
 *  - `secondary` — text + underline, no background, Inter semibold.
 *  - `ghost`     — text only, mono label + text arrow symbol `→`.
 */
export const Button: React.FC<V3ButtonProps> = (props) => {
  const {
    variant = 'primary',
    accent = 'fuchsia',
    className = '',
    style,
    href,
    inline,
    children,
    ...rest
  } = props as BaseButtonProps & { [k: string]: unknown };

  // Shared base
  const base: CSSProperties = {
    display: inline ? 'inline-block' : 'inline-block',
    boxSizing: 'border-box',
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    background: 'transparent',
    transition: `color var(--v3-dur) var(--v3-ease), background-color var(--v3-dur) var(--v3-ease), opacity var(--v3-dur) var(--v3-ease)`,
    // Preventing default focus outline from breaking the zero-radius contract;
    // use a thin accent ring instead (accessible via keyboard).
    outline: 'none',
  };

  // Variant styles
  let variantStyle: CSSProperties;
  const fillColor =
    accent === 'fuchsia' ? 'var(--v3-color-fuchsia)' : 'var(--v3-color-teal)';
  const textOnFill = 'var(--v3-color-cream)';

  if (variant === 'primary') {
    variantStyle = {
      background: fillColor,
      color: textOnFill,
      fontFamily: 'var(--v3-font-mono)',
      fontWeight: 500,
      fontSize: 'var(--v3-text-label)',
      lineHeight: 'var(--v3-leading-label)',
      letterSpacing: 'var(--v3-tracking-label)',
      textTransform: 'uppercase',
      paddingBlock: '16px',
      paddingInline: '24px',
    };
  } else if (variant === 'secondary') {
    variantStyle = {
      background: 'transparent',
      color: 'var(--v3-color-ink)',
      fontFamily: 'var(--v3-font-body)',
      fontWeight: 600,
      fontSize: 'var(--v3-text-body)',
      lineHeight: 'var(--v3-leading-body)',
      padding: 0,
      paddingBlock: '2px',
      borderBottom: `1px solid ${
        accent === 'fuchsia' ? 'var(--v3-color-fuchsia)' : 'var(--v3-color-teal)'
      }`,
    };
  } else {
    // ghost
    variantStyle = {
      background: 'transparent',
      color: 'var(--v3-color-ink)',
      fontFamily: 'var(--v3-font-mono)',
      fontWeight: 400,
      fontSize: 'var(--v3-text-label)',
      lineHeight: 'var(--v3-leading-label)',
      letterSpacing: 'var(--v3-tracking-label)',
      textTransform: 'uppercase',
      padding: 0,
      paddingBlock: '2px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
    };
  }

  const merged: CSSProperties = { ...base, ...variantStyle, ...style };

  // Dark-mode overrides: secondary + ghost use paper color
  const darkOverrides = `
    .v3-root[data-bg-mode="dark"] .v3-btn.v3-btn--secondary,
    .v3-root[data-bg-mode="dark"] .v3-btn.v3-btn--ghost {
      color: var(--v3-color-paper) !important;
    }
    .v3-root[data-bg-mode="dark"] .v3-btn.v3-btn--secondary {
      border-bottom-color: ${
        accent === 'fuchsia' ? 'var(--v3-color-fuchsia)' : 'var(--v3-color-teal)'
      } !important;
    }
    .v3-btn:focus-visible {
      box-shadow: 0 0 0 2px ${fillColor} !important;
    }
  `;

  const classNames = `v3-btn v3-btn--${variant} v3-btn--accent-${accent} ${className}`.trim();

  if (typeof href === 'string') {
    return (
      <>
        <a
          href={href}
          className={classNames}
          style={merged}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {variant === 'ghost' ? (
            <>
              <span>{children}</span>
              <span aria-hidden="true">→</span>
            </>
          ) : (
            children
          )}
        </a>
        <style>{darkOverrides}</style>
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        className={classNames}
        style={merged}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {variant === 'ghost' ? (
          <>
            <span>{children}</span>
            <span aria-hidden="true">→</span>
          </>
        ) : (
          children
        )}
      </button>
      <style>{darkOverrides}</style>
    </>
  );
};
