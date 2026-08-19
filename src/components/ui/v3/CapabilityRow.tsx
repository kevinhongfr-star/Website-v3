/**
 * V3 · CapabilityRow — mono-numbered capability row with thin dividers.
 *
 * Part of the long-form pillar template Section 3 "Capabilities / Service List".
 *
 * No cards, no icons, no enclosing borders — only thin dividers above and
 * below (caller is responsible for rendering them around the row list, the
 * same pattern as Landing's Capabilities block: Divider → FeatureRow × N →
 * Divider). Use <CapabilityRow> inside:
 *
 *   <Divider variant="light" />
 *   <CapabilityRow label="01" title="..." description="..." cta={<Link...>} />
 *   <Divider variant="light" />
 *   ...
 *
 * This component is a thin wrapper around FeatureRow that enforces the
 * editorial capability pattern (mono label + serif title + body + optional
 * cta). We don't use dividers internally so the caller controls the exact
 * divider sequence and any per-row accent overrides.
 */
import React, { CSSProperties } from 'react';
import { FeatureRow, type FeatureRowProps } from './FeatureRow';

export interface CapabilityRowProps
  extends Omit<FeatureRowProps, 'children' | 'displayTitle'> {
  style?: CSSProperties;
  className?: string;
}

export function CapabilityRow({
  style,
  className,
  ...rest
}: CapabilityRowProps): React.ReactElement {
  return (
    <div style={style} className={className}>
      <FeatureRow displayTitle={false} {...rest} />
    </div>
  );
}

export default CapabilityRow;
