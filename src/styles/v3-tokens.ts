/**
 * LYC v3.0 Red Brief — Design Token TS Mirror
 *
 * Mirror of src/styles/v3-tokens.css. Consumed by primitives that need
 * runtime access to token values (e.g. feature-number counters,
 * dynamic accent switching). For CSS/layout purposes the primitives
 * prefer the CSS custom properties.
 *
 * Keep names identical (kebab → camel) to the CSS variables so a grep
 * for `--v3-color-fuchsia` finds the TS equivalent.
 */

export const v3Tokens = {
  colors: {
    fuchsia:        '#C108AB',
    fuchsiaSoft:    'rgba(193, 8, 171, 0.12)',
    teal:           '#00897B',
    tealSoft:       'rgba(0, 137, 123, 0.12)',

    cream: '#FAFAFA',
    dark:  '#0A0A0A',
    white: '#FFFFFF',

    ink:         '#1A1A1A',
    inkSecondary:'#666666',
    inkMuted:    '#999999',
    paper:           '#FAFAFA',
    paperSecondary:  'rgba(250, 250, 250, 0.65)',
    paperMuted:      'rgba(250, 250, 250, 0.4)',

    divider:            'rgba(0, 0, 0, 0.08)',
    dividerStrong:      'rgba(0, 0, 0, 0.15)',
    dividerDark:        'rgba(255, 255, 255, 0.12)',
    dividerDarkStrong:  'rgba(255, 255, 255, 0.2)',

    success: '#10B981',
    warning: '#F59E0B',
    error:   '#EF4444',
  } as const,

  fonts: {
    display: "'Crimson Pro', 'Iowan Old Style', 'Apple Garamond', Baskerville, 'Times New Roman', serif",
    body:    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono:    "'IBM Plex Mono', 'SF Mono', ui-monospace, Menlo, Consolas, monospace",
  } as const,

  weights: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  } as const,

  text: {
    displayXL: { size: '72px', leading: 1.1 },
    displayLG: { size: '56px', leading: 1.15 },
    displayMD: { size: '40px', leading: 1.2 },
    headingLG: { size: '28px', leading: 1.3 },
    headingMD: { size: '20px', leading: 1.4 },
    bodyLG:    { size: '18px', leading: 1.6 },
    body:      { size: '16px', leading: 1.6 },
    bodySM:    { size: '14px', leading: 1.5 },
    label:     { size: '12px', leading: 1.4 },
  } as const,

  tracking: {
    tight: '-0.02em',
    normal:'0em',
    label:  '0.08em',
  } as const,

  space: {
    1:  '4px',
    2:  '8px',
    3:  '12px',
    4:  '16px',
    5:  '24px',
    6:  '32px',
    7:  '48px',
    8:  '64px',
    9:  '96px',
    10: '128px',
    11: '160px',
  } as const,

  layout: {
    contentMaxW:  '1200px',
    gutterDesktop:'40px',
    gutterMobile: '20px',
  } as const,

  motion: {
    durFast: '120ms',
    dur:     '200ms',
    durSlow: '320ms',
    ease:    'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  } as const,
};

export type V3BgMode = 'cream' | 'dark' | 'white';
export type V3Accent = 'fuchsia' | 'teal' | 'ink';
export type V3SectionPaddingY = 'sm' | 'md' | 'lg' | 'xl';
export type V3DividerVariant = 'light' | 'strong';
export type V3DividerWidth = 'full' | 'content';
export type V3ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type V3ButtonAccent = 'fuchsia' | 'teal';

export const sectionPaddingMap: Record<V3SectionPaddingY, string> = {
  sm: 'var(--v3-space-7)',
  md: 'var(--v3-space-9)',   // 96px default
  lg: 'var(--v3-space-10)',  // 128px
  xl: 'var(--v3-space-11)',  // 160px
};
