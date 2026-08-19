/**
 * V3 · PricingTextTable — text-first tier comparison.
 *
 * Rows: feature label (left) + 2-3 tier columns (right).
 * Thin horizontal dividers between rows. Mono labels for tier names.
 * No cards, no radius, no shadows. No enclosing borders on the outside
 * (only inner horizontal dividers plus a top thin divider above the header
 * row and a bottom divider below the last row — so the entire block is
 * framed by two thin lines with dividers between rows).
 */
import React, { CSSProperties } from 'react';

export interface PricingTextTableProps {
  tiers: readonly string[];
  rows: ReadonlyArray<{
    label: string;
    values: readonly (React.ReactNode | boolean)[];
  }>;
  accent?: 'teal' | 'fuchsia';
  style?: CSSProperties;
  className?: string;
}

function renderCell(v: React.ReactNode | boolean): React.ReactNode {
  if (typeof v === 'boolean') {
    return v ? (
      <span style={{ fontFamily: 'var(--v3-font-mono)', color: 'var(--v3-color-teal)' }}>
        ✓
      </span>
    ) : (
      <span
        style={{
          fontFamily: 'var(--v3-font-mono)',
          color: 'var(--v3-color-ink-muted)',
        }}
      >
        —
      </span>
    );
  }
  return v;
}

export function PricingTextTable({
  tiers,
  rows,
  accent = 'teal',
  style,
  className,
}: PricingTextTableProps): React.ReactElement {
  const colCount = tiers.length + 1;
  return (
    <div
      style={{
        borderTop: '1px solid var(--v3-color-divider-strong)',
        borderBottom: '1px solid var(--v3-color-divider-strong)',
        ...style,
      }}
      className={className ?? 'v3-price-table'}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `minmax(0, 2fr) repeat(${tiers.length}, minmax(0, 1fr))`,
          gap: 'var(--v3-space-4)',
          alignItems: 'start',
        }}
      >
        {/* Header row */}
        <div
          style={{
            paddingBlock: 'var(--v3-space-5)',
            borderBottom: '1px solid var(--v3-color-divider)',
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 'var(--v3-text-label)',
            letterSpacing: 'var(--v3-tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--v3-color-ink-muted)',
            fontWeight: 500,
          }}
        >
          Feature
        </div>
        {tiers.map((t, i) => (
          <div
            key={t}
            style={{
              paddingBlock: 'var(--v3-space-5)',
              borderBottom: '1px solid var(--v3-color-divider)',
              fontFamily: 'var(--v3-font-mono)',
              fontSize: 'var(--v3-text-label)',
              letterSpacing: 'var(--v3-tracking-label)',
              textTransform: 'uppercase',
              fontWeight: 500,
              color: i === 1 ? `var(--v3-color-${accent})` : 'var(--v3-color-ink)',
            }}
          >
            {t}
          </div>
        ))}

        {/* Body rows */}
        {rows.map((row) => {
          const cellCount = colCount;
          const cells: React.ReactNode[] = [];
          cells.push(
            <div
              key="label"
              style={{
                paddingBlock: 'var(--v3-space-4)',
                borderBottom: '1px solid var(--v3-color-divider)',
                fontFamily: 'var(--v3-font-body)',
                fontSize: 'var(--v3-text-body-sm)',
                lineHeight: 'var(--v3-leading-body-sm)',
                fontWeight: 400,
                color: 'var(--v3-color-ink-secondary)',
              }}
            >
              {row.label}
            </div>,
          );
          for (let i = 0; i < tiers.length; i++) {
            const v = row.values[i];
            cells.push(
              <div
                key={i}
                style={{
                  paddingBlock: 'var(--v3-space-4)',
                  borderBottom: '1px solid var(--v3-color-divider)',
                  fontFamily: 'var(--v3-font-body)',
                  fontSize: 'var(--v3-text-body-sm)',
                  lineHeight: 1.5,
                  fontWeight: 400,
                  color: 'var(--v3-color-ink)',
                }}
              >
                {renderCell(v)}
              </div>,
            );
          }
          // Suppress unused warning for colCount if ever no tiers:
          void cellCount;
          return cells;
        })}
      </div>
    </div>
  );
}

export default PricingTextTable;
