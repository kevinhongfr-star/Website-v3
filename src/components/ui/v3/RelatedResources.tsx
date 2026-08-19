/**
 * V3 · RelatedResources — simple text link list with mono date labels.
 *
 * Each row: [mono-date] [title + excerpt] [link].
 * Thin dividers between rows. No cards, no icons, no thumbnails.
 *
 * Mobile stays the same single-column list; no stacking logic needed.
 */
import React, { CSSProperties } from 'react';
import { Divider } from './Divider';

export interface RelatedResource {
  dateLabel: string;
  title: React.ReactNode;
  excerpt?: React.ReactNode;
  href: string;
}

export interface RelatedResourcesProps {
  items: readonly RelatedResource[];
  sectionLabel?: string;
  style?: CSSProperties;
  className?: string;
}

export function RelatedResources({
  items,
  sectionLabel = 'Related Resources',
  style,
  className,
}: RelatedResourcesProps): React.ReactElement {
  return (
    <section
      style={{
        paddingBlock: 'var(--v3-space-8)',
        ...style,
      }}
      className={className}
    >
      <div
        style={{
          fontFamily: 'var(--v3-font-mono)',
          fontSize: 'var(--v3-text-label)',
          letterSpacing: 'var(--v3-tracking-label)',
          textTransform: 'uppercase',
          color: 'var(--v3-color-ink-muted)',
          fontWeight: 500,
          marginBottom: 'var(--v3-space-4)',
        }}
      >
        {sectionLabel}
      </div>
      <Divider variant="light" width="content" />
      {items.map((r) => (
        <React.Fragment key={r.href}>
          <a
            href={r.href}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 140px) minmax(0, 1fr)',
              gap: 'var(--v3-space-5)',
              alignItems: 'start',
              paddingBlock: 'var(--v3-space-5)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'background-color var(--v3-dur) var(--v3-ease)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div
              style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 'var(--v3-text-label)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--v3-color-ink-muted)',
                fontWeight: 500,
                marginTop: '2px',
              }}
            >
              {r.dateLabel}
            </div>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--v3-font-display)',
                  fontSize: '20px',
                  lineHeight: 1.25,
                  fontWeight: 400,
                  letterSpacing: 'var(--v3-tracking-tight)',
                  color: 'var(--v3-color-ink)',
                  margin: 0,
                  marginBottom: r.excerpt ? '8px' : 0,
                }}
              >
                {r.title}
              </h4>
              {r.excerpt && (
                <p
                  style={{
                    fontFamily: 'var(--v3-font-body)',
                    fontSize: 'var(--v3-text-body-sm)',
                    lineHeight: 'var(--v3-leading-body-sm)',
                    color: 'var(--v3-color-ink-secondary)',
                    margin: 0,
                    maxWidth: '60ch',
                  }}
                >
                  {r.excerpt}
                </p>
              )}
            </div>
          </a>
          <Divider variant="light" width="content" />
        </React.Fragment>
      ))}
    </section>
  );
}

export default RelatedResources;
