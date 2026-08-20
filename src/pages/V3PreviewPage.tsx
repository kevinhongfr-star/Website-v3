import React from 'react';
import {
  Section,
  Divider,
  Eyebrow,
  Button,
  PageHeader,
  FeatureRow,
} from '@/components/ui/v3';

/**
 * /v3-preview — internal review page.
 * Demonstrates all v3 V1 primitives across light, white, and dark section
 * backgrounds. Not linked from nav; not indexed; accessible at /v3-preview.
 */
export const V3PreviewPage: React.FC = () => {
  return (
    <main>
      {/* ── Editorial hero: cream bg ──────────────────────────────── */}
      <Section bg="cream" paddingY="lg">
        <PageHeader
          eyebrow="v3.0 Red Brief · Phase V1"
          headline="Editorial Minimalism"
          headlineItalicWord="Foundation"
          xl
          lead="Typography-first design tokens, zero radius, zero shadows,
            zero gradients. Two accent colors, thin dividers, generous
            whitespace — a preview of the shared primitives that every
            marketing page from Phase V2 onwards will build on."
          cta={
            <>
              <Button href="#palette" variant="primary" accent="fuchsia">
                Explore tokens
              </Button>
              <Button href="#primitives" variant="secondary" accent="teal">
                Primitives
              </Button>
              <Button href="#dark-mode" variant="ghost">
                Jump to dark
              </Button>
            </>
          }
        />
      </Section>

      <Divider variant="light" width="content" />

      {/* ── Palette + tokens: white bg ────────────────────────────── */}
      <Section id="palette" bg="white" paddingY="md">
        <Eyebrow accent="teal">1 · Color System</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-lg)',
            lineHeight: 'var(--v3-leading-display-lg)',
            margin: 'var(--v3-space-5) 0 0',
            letterSpacing: 'var(--v3-tracking-tight)',
            color: 'var(--v3-color-ink)',
            maxWidth: '22ch',
          }}
        >
          Two accents. <em>Editorial</em> neutrals.
        </h2>

        <div
          style={{
            marginTop: 'var(--v3-space-8)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--v3-space-5)',
          }}
        >
          {[
            { name: 'fuchsia',       css: 'var(--v3-color-fuchsia)',       fg: 'var(--v3-color-cream)' },
            { name: 'fuchsia-soft',  css: 'var(--v3-color-fuchsia-soft)',  fg: 'var(--v3-color-ink)' },
            { name: 'teal',          css: 'var(--v3-color-teal)',          fg: 'var(--v3-color-cream)' },
            { name: 'teal-soft',     css: 'var(--v3-color-teal-soft)',     fg: 'var(--v3-color-ink)' },
            { name: 'cream',         css: 'var(--v3-color-cream)',         fg: 'var(--v3-color-ink)' },
            { name: 'white',         css: 'var(--v3-color-white)',         fg: 'var(--v3-color-ink)' },
            { name: 'dark',          css: 'var(--v3-color-dark)',          fg: 'var(--v3-color-paper)' },
            { name: 'ink',           css: 'var(--v3-color-ink)',           fg: 'var(--v3-color-cream)' },
            { name: 'ink-secondary', css: 'var(--v3-color-ink-secondary)', fg: 'var(--v3-color-cream)' },
            { name: 'ink-muted',     css: 'var(--v3-color-ink-muted)',     fg: 'var(--v3-color-cream)' },
            { name: 'success',       css: 'var(--v3-color-success)',       fg: 'var(--v3-color-cream)' },
            { name: 'warning',       css: 'var(--v3-color-warning)',       fg: 'var(--v3-color-ink)' },
            { name: 'error',         css: 'var(--v3-color-error)',         fg: 'var(--v3-color-cream)' },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                borderTop: '1px solid var(--v3-color-divider-strong)',
                paddingTop: 'var(--v3-space-4)',
              }}
            >
              <div
                aria-label={`color swatch ${c.name}`}
                style={{
                  width: '100%',
                  height: '120px',
                  background: c.css,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  padding: 'var(--v3-space-3) var(--v3-space-4)',
                  color: c.fg,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--v3-font-mono)',
                    fontSize: 'var(--v3-text-label)',
                    letterSpacing: 'var(--v3-tracking-label)',
                    textTransform: 'uppercase',
                  }}
                >
                  {c.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider variant="strong" width="content" />

      {/* ── Type scale: cream bg ──────────────────────────────────── */}
      <Section bg="cream" paddingY="md">
        <Eyebrow accent="fuchsia">2 · Typography</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-lg)',
            lineHeight: 'var(--v3-leading-display-lg)',
            margin: 'var(--v3-space-5) 0 var(--v3-space-8)',
            letterSpacing: 'var(--v3-tracking-tight)',
            maxWidth: '20ch',
          }}
        >
          Crimson Pro + Inter. <em>Mono</em> for labels.
        </h2>

        <div
          style={{
            display: 'grid',
            gap: 'var(--v3-space-7)',
            paddingTop: 'var(--v3-space-5)',
            borderTop: '1px solid var(--v3-color-divider)',
          }}
        >
          {[
            ['display-xl', '72 / 1.1', 'Crimson Pro 300', 'var(--v3-text-display-xl)', 1.1, 'var(--v3-font-display)', 300],
            ['display-lg', '56 / 1.15', 'Crimson Pro 300', 'var(--v3-text-display-lg)', 1.15, 'var(--v3-font-display)', 300],
            ['display-md', '40 / 1.2',  'Crimson Pro 400', 'var(--v3-text-display-md)', 1.2,  'var(--v3-font-display)', 400],
            ['heading-lg', '28 / 1.3',  'Inter 500',        'var(--v3-text-heading-lg)', 1.3,  'var(--v3-font-body)',    500],
            ['heading-md', '20 / 1.4',  'Inter 500',        'var(--v3-text-heading-md)', 1.4,  'var(--v3-font-body)',    500],
            ['body-lg',    '18 / 1.6',  'Inter 400',        'var(--v3-text-body-lg)',    1.6,  'var(--v3-font-body)',    400],
            ['body',       '16 / 1.6',  'Inter 400',        'var(--v3-text-body)',       1.6,  'var(--v3-font-body)',    400],
            ['body-sm',    '14 / 1.5',  'Inter 400',        'var(--v3-text-body-sm)',    1.5,  'var(--v3-font-body)',    400],
          ].map(([token, spec, face, size, lh, family, weight]) => (
            <div
              key={token as string}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                columnGap: 'var(--v3-space-6)',
                alignItems: 'baseline',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--v3-font-mono)',
                  fontSize: 'var(--v3-text-label)',
                  letterSpacing: 'var(--v3-tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--v3-color-ink-muted)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <span>{token}</span>
                <span style={{ opacity: 0.8, textTransform: 'none', letterSpacing: 0 }}>
                  {spec} · {face}
                </span>
              </div>
              <p
                style={{
                  fontFamily: family as string,
                  fontWeight: weight as number,
                  fontSize: size as string,
                  lineHeight: lh as number,
                  letterSpacing:
                    (token as string).startsWith('display')
                      ? 'var(--v3-tracking-tight)'
                      : undefined,
                  margin: 0,
                  color: 'var(--v3-color-ink)',
                }}
              >
                Senior leadership deserves a sharper signal.
              </p>
            </div>
          ))}

          {/* Label row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr',
              columnGap: 'var(--v3-space-6)',
              alignItems: 'baseline',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--v3-font-mono)',
                fontSize: 'var(--v3-text-label)',
                letterSpacing: 'var(--v3-tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--v3-color-ink-muted)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span>label</span>
              <span style={{ opacity: 0.8, textTransform: 'none', letterSpacing: 0 }}>
                12 / 1.4 · IBM Plex Mono 400
              </span>
            </div>
            <Eyebrow>Eyebrow · mono uppercase · +0.08em tracking</Eyebrow>
          </div>
        </div>
      </Section>

      <Divider variant="light" width="content" />

      {/* ── Primitives: white bg ──────────────────────────────────── */}
      <Section id="primitives" bg="white" paddingY="md">
        <Eyebrow accent="teal">3 · Shared Primitives</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--v3-font-display)',
            fontWeight: 300,
            fontSize: 'var(--v3-text-display-md)',
            lineHeight: 'var(--v3-leading-display-md)',
            margin: 'var(--v3-space-5) 0 var(--v3-space-8)',
            letterSpacing: 'var(--v3-tracking-tight)',
            maxWidth: '24ch',
          }}
        >
          Six primitives. No cards.
        </h2>

        {/* Section + Divider demo is self-evident (this page uses both).
            Showcase Eyebrow accents. */}
        <div
          style={{
            paddingBlock: 'var(--v3-space-6)',
            borderTop: '1px solid var(--v3-color-divider)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--v3-space-6)',
          }}
        >
          <Eyebrow accent="fuchsia">Eyebrow / Fuchsia</Eyebrow>
          <Eyebrow accent="teal">Eyebrow / Teal</Eyebrow>
          <Eyebrow accent="ink">Eyebrow / Ink</Eyebrow>
          <Eyebrow accent="auto">Eyebrow / Auto (defaults)</Eyebrow>
        </div>

        {/* Buttons */}
        <div
          style={{
            paddingBlock: 'var(--v3-space-7)',
            borderTop: '1px solid var(--v3-color-divider)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--v3-font-mono)',
              fontWeight: 400,
              fontSize: 'var(--v3-text-label)',
              letterSpacing: 'var(--v3-tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--v3-color-ink-muted)',
              margin: 0,
              marginBottom: 'var(--v3-space-6)',
            }}
          >
            Button · 3 variants × fuchsia / teal
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--v3-space-6)',
              alignItems: 'center',
            }}
          >
            <Button variant="primary" accent="fuchsia">Primary · Fuchsia</Button>
            <Button variant="primary" accent="teal">Primary · Teal</Button>
            <Button variant="secondary" accent="fuchsia">Secondary · Fuchsia</Button>
            <Button variant="secondary" accent="teal">Secondary · Teal</Button>
            <Button variant="ghost" accent="fuchsia">Ghost · Fuchsia</Button>
            <Button variant="ghost" accent="teal">Ghost · Teal</Button>
          </div>
        </div>

        {/* Divider variants */}
        <div
          style={{
            paddingBlock: 'var(--v3-space-7)',
            borderTop: '1px solid var(--v3-color-divider)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--v3-font-mono)',
              fontWeight: 400,
              fontSize: 'var(--v3-text-label)',
              letterSpacing: 'var(--v3-tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--v3-color-ink-muted)',
              margin: 0,
              marginBottom: 'var(--v3-space-5)',
            }}
          >
            Divider · 2 variants × 2 widths
          </h3>
          <div style={{ display: 'grid', gap: 'var(--v3-space-5)' }}>
            <div>
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v3-color-ink-muted)' }}>
                light · full
              </span>
              <Divider variant="light" width="full" />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v3-color-ink-muted)' }}>
                strong · full
              </span>
              <Divider variant="strong" width="full" />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v3-color-ink-muted)' }}>
                light · content
              </span>
              <Divider variant="light" width="content" />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--v3-font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v3-color-ink-muted)' }}>
                strong · content
              </span>
              <Divider variant="strong" width="content" />
            </div>
          </div>
        </div>

        {/* FeatureRow samples */}
        <div
          style={{
            paddingBlock: 'var(--v3-space-7)',
            borderTop: '1px solid var(--v3-color-divider)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--v3-font-mono)',
              fontWeight: 400,
              fontSize: 'var(--v3-text-label)',
              letterSpacing: 'var(--v3-tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--v3-color-ink-muted)',
              margin: 0,
              marginBottom: 'var(--v3-space-5)',
            }}
          >
            FeatureRow · text-first editorial pattern
          </h3>
          <Divider variant="light" width="content" />
          <FeatureRow
            label="01"
            title="Research & Intelligence"
            description="A continuous view of your executive surface: market motion,
              compensation benchmarks, candidate movements and company shifts
              that move faster than quarterly reports."
            displayTitle={false}
            cta={<Button variant="ghost">Learn more</Button>}
          />
          <Divider variant="light" width="content" />
          <FeatureRow
            label="02"
            title="Advisory"
            description="Decision-grade counsel for CEO, Board and founder
              transitions. Written memoranda, not slide decks."
            cta={<Button variant="ghost">Capabilities</Button>}
          />
          <Divider variant="light" width="content" />
          <FeatureRow
            label="03"
            title="Executive Search"
            description="Under-the-radar senior matches — 500+ placements across
              47 markets."
            cta={<Button variant="ghost" accent="teal">Explore</Button>}
          />
          <Divider variant="light" width="content" />
        </div>
      </Section>

      <Divider variant="strong" width="content" />

      {/* ── Dark-mode section ─────────────────────────────────────── */}
      <Section id="dark-mode" bg="dark" paddingY="lg">
        <PageHeader
          eyebrow="4 · Dark Section"
          eyebrowAccent="auto"
          headline="Paper on Ink."
          headlineItalicWord="Deep"
          xl={false}
          lead="Dark-mode variants of every primitive inherit their tokens from
            the same editorial root: cream text on #0A0A0A, fuchsia for
            selection, thin dividers. No purples, no gradients."
          cta={
            <>
              <Button variant="primary" accent="fuchsia">
                Primary on dark
              </Button>
              <Button variant="secondary" accent="teal">
                Secondary on dark
              </Button>
              <Button variant="ghost">Ghost on dark</Button>
            </>
          }
        />
      </Section>

      <Section bg="dark" paddingY="md" scope={false}>
        {/* scope=false so we inherit the dark v3-root set by the
            Section above? Actually Section is scoped. This Section has
            bg=dark, scope not passed (defaults true) => also v3-root,
            so children are fine. Keep all 3 dark eyebrow accent modes,
            divider, and feature rows in one section. */}
      </Section>

      {/* Re-open dark section to demonstrate feature rows + divider */}
      <Section bg="dark" paddingY="md">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--v3-space-6)', marginBottom: 'var(--v3-space-5)' }}>
          <Eyebrow accent="fuchsia">Fuchsia / dark</Eyebrow>
          <Eyebrow accent="teal">Teal / dark</Eyebrow>
          <Eyebrow accent="ink">Ink / dark → muted-paper</Eyebrow>
          <Eyebrow accent="auto">Auto / dark → paper-sec</Eyebrow>
        </div>

        <Divider variant="light" width="content" scheme="dark" />
        <FeatureRow
          label="A1"
          title="NEXUS Workspace"
          description="Individual executive intelligence. A single surface for
            your diagnostic readouts, milestones and matching."
        />
        <Divider variant="light" width="content" scheme="dark" />
        <FeatureRow
          label="A2"
          title="DEX AI"
          description="Debrief intelligence. Pre-brief, capture, deliver."
        />
        <Divider variant="strong" width="content" scheme="dark" />
      </Section>

      <Section bg="dark" paddingY="md">
        <PageHeader
          eyebrow="5 · Section padding"
          headline="Breathing room."
          xl={false}
          lead="Section vertical padding: sm = 48, md = 96, lg = 128, xl = 160 pixels.
            Editorial columns never exceed 1200px wide, 40px gutters on desktop
            collapsing to 20px on mobile."
        />
      </Section>

      <Divider variant="strong" width="full" />

      <Section bg="cream" paddingY="lg">
        <div style={{ textAlign: 'center', maxWidth: '64ch', marginInline: 'auto' }}>
          <Eyebrow accent="fuchsia">End of preview</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontWeight: 300,
              fontSize: 'var(--v3-text-display-md)',
              lineHeight: 'var(--v3-leading-display-md)',
              margin: 'var(--v3-space-5) 0 var(--v3-space-5)',
              letterSpacing: 'var(--v3-tracking-tight)',
              color: 'var(--v3-color-ink)',
            }}
          >
            Ready to build on.
          </h2>
          <p
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontWeight: 400,
              fontSize: 'var(--v3-text-body-lg)',
              lineHeight: 'var(--v3-leading-body-lg)',
              color: 'var(--v3-color-ink-secondary)',
              margin: 0,
            }}
          >
            Phase V1 foundation: tokens + six primitives, demonstrated in
            light and dark, zero radius, zero shadows, zero gradients.
          </p>
        </div>
      </Section>
    </main>
  );
};

export default V3PreviewPage;
