import React, { CSSProperties, ReactNode } from 'react';
import {
  type V3BgMode,
  type V3SectionPaddingY,
  sectionPaddingMap,
} from '@/styles/v3-tokens';

export interface SectionProps {
  /** Background mode. `cream` = light page default; `dark` = dark section; `white` = pure white */
  bg?: V3BgMode;
  /** Vertical padding. md = 96px, lg = 128px, xl = 160px, sm = 48px */
  paddingY?: V3SectionPaddingY;
  children?: ReactNode;
  id?: string;
  /** Optional custom className merged into the section */
  className?: string;
  /** Optional style passthrough */
  style?: CSSProperties;
  /**
   * When `true` (default) this Section opens a `.v3-root` scope so v3
   * tokens are active for its descendants. Nesting multiple Section
   * components inside a single already-scoped parent is safe (the CSS
   * tokens are idempotent), but you can disable to flatten the DOM.
   */
  scope?: boolean;
}

/**
 * V3 Section primitive.
 * - Applies background mode and vertical padding.
 * - Centers an editorial 1200px max-width column with 40/20px gutters.
 * - Wraps content in `.v3-root` to activate v3 tokens / zero radius /
 *   zero shadows / Inter body baseline + fuchsia::cream selection.
 */
export const Section: React.FC<SectionProps> = ({
  bg = 'cream',
  paddingY = 'md',
  children,
  id,
  className = '',
  style,
  scope = true,
}) => {
  const rootClasses = [
    'v3-section',
    `v3-section--bg-${bg}`,
    `v3-section--py-${paddingY}`,
    scope ? 'v3-root' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const bgStyle: CSSProperties =
    bg === 'dark'
      ? { background: 'var(--v3-color-dark)', color: 'var(--v3-color-paper)' }
      : bg === 'white'
      ? { background: 'var(--v3-color-white)' }
      : { background: 'var(--v3-color-cream)' };

  const sectionStyle: CSSProperties = {
    paddingBlock: sectionPaddingMap[paddingY],
    ...bgStyle,
    ...style,
  };

  return (
    <section
      id={id}
      className={rootClasses}
      style={sectionStyle}
      data-bg-mode={bg}
    >
      <div className="v3-container">{children}</div>
      <style>{`
        .v3-section[data-bg-mode="dark"] ::selection {
          background: var(--v3-color-fuchsia);
          color: var(--v3-color-paper);
        }
      `}</style>
    </section>
  );
};
