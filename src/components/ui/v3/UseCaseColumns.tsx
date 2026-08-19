/**
 * V3 · UseCaseColumns — 2-3 column "Who it's for" block.
 *
 * Each column: mono label + Crimson Pro title + short body.
 * Thin 1px vertical dividers between columns (NOT around them).
 *
 * No cards, no icons, no enclosing borders.
 *
 * Mobile (<768px): columns stack, vertical dividers become horizontal.
 */
import React, { CSSProperties } from 'react';
import type { V3Accent } from '@/styles/v3-tokens';
import { Eyebrow } from './Eyebrow';

type UcAccent = V3Accent | 'auto';

export interface UseCase {
  label: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface UseCaseColumnsProps {
  items: readonly UseCase[];
  labelAccent?: UcAccent;
  style?: CSSProperties;
  className?: string;
}

export function UseCaseColumns({
  items,
  labelAccent = 'teal',
  style,
  className,
}: UseCaseColumnsProps): React.ReactElement {
  const cols = items.length <= 2 ? items.length : 3;
  return (
    <div
      style={{
        borderTop: '1px solid var(--v3-color-divider-strong)',
        paddingBlock: 'var(--v3-space-8)',
        ...style,
      }}
      className={className ?? 'v3-usecases'}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap: 0,
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.label + i}
            style={{
              padding: '0 var(--v3-space-6)',
              borderRight: i < items.length - 1 ? '1px solid var(--v3-color-divider)' : undefined,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--v3-space-4)',
              minHeight: '100%',
            }}
            className="v3-usecase-col"
          >
            <Eyebrow accent={labelAccent}>{item.label}</Eyebrow>
            <h3
              style={{
                fontFamily: 'var(--v3-font-display)',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: 'var(--v3-tracking-tight)',
                color: 'var(--v3-color-ink)',
                margin: 0,
                maxWidth: '20ch',
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body-sm)',
                lineHeight: 'var(--v3-leading-body-sm)',
                fontWeight: 400,
                color: 'var(--v3-color-ink-secondary)',
                margin: 0,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 767px) {
          .v3-usecases > div { grid-template-columns: 1fr !important; }
          .v3-usecase-col {
            padding: var(--v3-space-5) 0 !important;
            border-right: none !important;
            border-bottom: 1px solid var(--v3-color-divider);
          }
          .v3-usecase-col:last-child { border-bottom: none !important; }
        }
      `}</style>
    </div>
  );
}

export default UseCaseColumns;
