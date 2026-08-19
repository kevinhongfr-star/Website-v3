/**
 * Batch 5 — /debrief/book page.
 *
 * Renders the 3-step BookingFlow component full-page within MarketingLayout.
 * Proxies URL query param ?session=<slug> to BookingFlow.initialSessionSlug.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookingFlow } from '@/components/debrief/BookingFlow';
import {
  Section,
  Eyebrow,
  Divider,
} from '@/components/ui/v3';

export function BookDebriefPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSessionSlug = searchParams.get('session') ?? undefined;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--v3-color-cream)',
      }}
    >
      <Section bg="dark" paddingY="lg" scope={true}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Eyebrow accent="fuchsia">Booking Flow · Human Debrief</Eyebrow>
          <h1
            style={{
              fontFamily: 'var(--v3-font-display)',
              fontSize: 'var(--v3-text-display-md)',
              fontWeight: 300,
              lineHeight: 'var(--v3-leading-display-md)',
              letterSpacing: '-0.015em',
              margin: '12px 0 0',
              color: 'var(--v3-color-paper)',
            }}
          >
            [Emily: Booking flow page headline — placeholder]
          </h1>
          <p
            style={{
              fontFamily: 'var(--v3-font-body)',
              fontSize: 'var(--v3-text-body)',
              lineHeight: 'var(--v3-leading-body)',
              color: 'var(--v3-color-paper-secondary)',
              maxWidth: 640,
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            [Emily: Booking flow page subhead — placeholder. Three steps: pick a session, find a time, confirm. Live debriefs with certified coaches.]
          </p>
        </div>
      </Section>
      <Divider variant="light" width="full" />

      <Section bg="cream" paddingY="xl" scope={true}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {mounted ? (
            <BookingFlow
              initialSessionSlug={initialSessionSlug}
              onComplete={() => navigate('/app/bookings')}
              onClose={() => navigate('/debrief')}
            />
          ) : (
            <div
              style={{
                height: 480,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--v3-color-ink-muted)',
                fontFamily: 'var(--v3-font-body)',
                fontSize: 14,
              }}
            >
              Loading booking flow…
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}

export default BookDebriefPage;
