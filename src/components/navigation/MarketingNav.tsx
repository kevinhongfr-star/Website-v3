/**
 * Phase V2 — MarketingNav v3 (editorial minimalism).
 *
 * Preserves EXACTLY the existing IA and functionality:
 *   - 4 firm-first top-level nav links (Research & Intelligence / Advisory /
 *     Executive Search / Pricing) per v3.0 firm-first IA.
 *   - Tier-aware auth block: authenticated users → My Portal + tier badge
 *     + Sign out; guests → Sign in link + primary Begin CTA.
 *   - Mobile: full-screen overlay, cream/dark bg, large serif menu items,
 *     thin dividers between links, CTA at bottom. Toggle is text + line
 *     symbol (text-label button instead of hamburger glyph).
 *
 * Visual:
 *   - Left: LYC wordmark image (official, size md, links to /).
 *   - Text links: no underline default; underline on hover (thin 1px accent).
 *   - Far right: primary CTA (fuchsia) using v3 Button (mono uppercase).
 *   - Sticky: yes; on scroll → cream/white 90% opacity + backdrop blur +
 *     hairline bottom divider.
 */
import React, { useState, useEffect, CSSProperties } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { getDefaultPortalRoute } from '@/services/portalClassification';
import { trackCTA, setTrackingUser } from '@/analytics/eventTracker';
import { Logo } from '@/components/ui/Logo';
import { useTier } from '@/components/tier/TierProvider';
import { Button } from '@/components/ui/v3';

const NAV_ITEMS = [
  { href: '/research', label: 'Research & Intelligence' },
  { href: '/advisory', label: 'Advisory' },
  { href: '/search', label: 'Executive Search' },
  { href: '/pricing', label: 'Pricing' },
];

export function MarketingNav(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signOut } = useAuthStore();
  const { displayName: tierName, isEntryTier } = useTier();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Close mobile nav on route change
    setMobileOpen(false);
  }, [location.pathname]);

  const handlePortalEntry = () => {
    if (user) {
      trackCTA({ location: 'nav_marketing', label: 'My Portal', destination: getDefaultPortalRoute(profile?.role) });
      navigate(getDefaultPortalRoute(profile?.role), { replace: true });
      return;
    }
    trackCTA({ location: 'nav_marketing', label: 'Meet NEXUS (guest entry)', destination: '/nexus' });
    navigate('/nexus');
  };

  const handleSignOut = async () => {
    setTrackingUser(null);
    await signOut();
    navigate('/', { replace: true });
  };

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + '/');

  const linkBase: CSSProperties = {
    position: 'relative',
    fontSize: 'var(--v3-text-body-sm)',
    fontFamily: 'var(--v3-font-body)',
    fontWeight: 500,
    lineHeight: 1,
    color: 'var(--v3-color-ink)',
    textDecoration: 'none',
    padding: '6px 0',
    transition: `color var(--v3-dur) var(--v3-ease)`,
  };

  const hoverUnderline: CSSProperties = {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '1px',
    background: 'var(--v3-color-fuchsia)',
    transformOrigin: 'left',
    transform: 'scaleX(0)',
    transition: `transform var(--v3-dur) var(--v3-ease-out)`,
  };

  return (
    <header
      className="v3-root"
      data-bg-mode="cream"
      style={{
        background: scrolled ? 'rgba(250, 250, 250, 0.9)' : 'var(--v3-color-cream)',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: `1px solid ${
          scrolled ? 'var(--v3-color-divider)' : 'transparent'
        }`,
        transition: `border-color var(--v3-dur) var(--v3-ease), background var(--v3-dur) var(--v3-ease)`,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="v3-container"
        style={{
          paddingBlock: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => trackCTA({ location: 'nav_marketing', label: 'Logo → Home', destination: '/' })}
          aria-label="LYC — Home"
        >
          <Logo size="md" variant="light" />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '36px',
          }}
          className="md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => trackCTA({ location: 'nav_marketing', label: item.label, destination: item.href })}
              style={{
                ...linkBase,
                color: isActive(item.href) ? 'var(--v3-color-fuchsia)' : linkBase.color,
              }}
              className="v3-nav-link"
            >
              {item.label}
              <span
                aria-hidden
                style={{
                  ...hoverUnderline,
                  transform: isActive(item.href) ? 'scaleX(1)' : undefined,
                }}
              />
            </Link>
          ))}

          {/* Auth-aware slot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '8px' }}>
            {user ? (
              <>
                {!isEntryTier && (
                  <span
                    style={{
                      fontFamily: 'var(--v3-font-mono)',
                      fontSize: 'var(--v3-text-label)',
                      letterSpacing: 'var(--v3-tracking-label)',
                      textTransform: 'uppercase',
                      color: 'var(--v3-color-fuchsia)',
                      fontWeight: 500,
                    }}
                  >
                    {tierName}
                  </span>
                )}
                <button
                  onClick={handlePortalEntry}
                  style={{
                    fontFamily: 'var(--v3-font-body)',
                    fontWeight: 500,
                    fontSize: 'var(--v3-text-body-sm)',
                    color: 'var(--v3-color-ink)',
                    background: 'transparent',
                    border: 0,
                    padding: '6px 0',
                    cursor: 'pointer',
                  }}
                  className="v3-nav-link"
                >
                  My Portal
                </button>
                <button
                  onClick={handleSignOut}
                  style={{
                    fontFamily: 'var(--v3-font-body)',
                    fontWeight: 400,
                    fontSize: 'var(--v3-text-body-sm)',
                    color: 'var(--v3-color-ink-muted)',
                    background: 'transparent',
                    border: 0,
                    cursor: 'pointer',
                    padding: '6px 0',
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => trackCTA({ location: 'nav_marketing', label: 'Sign in', destination: '/login' })}
                  style={{
                    ...linkBase,
                    color: 'var(--v3-color-ink-secondary)',
                  }}
                  className="v3-nav-link"
                >
                  Sign in
                </Link>
                <Button
                  variant="primary"
                  accent="fuchsia"
                  onClick={() => {
                    trackCTA({ location: 'nav_marketing', label: 'Begin', destination: '/nexus/lenses/prism' });
                    navigate('/nexus/lenses/prism');
                  }}
                >
                  Begin →
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile toggle — text + line symbol, not hamburger icon */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="v3-mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'transparent',
            border: 0,
            padding: '8px 4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            color: 'var(--v3-color-ink)',
            fontFamily: 'var(--v3-font-mono)',
            fontSize: 'var(--v3-text-label)',
            letterSpacing: 'var(--v3-tracking-label)',
            textTransform: 'uppercase',
          }}
        >
          <span>{mobileOpen ? 'Close' : 'Menu'}</span>
          <span
            aria-hidden
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '4px',
              width: '22px',
            }}
          >
            {mobileOpen ? (
              <>
                <span
                  style={{
                    display: 'block',
                    height: '1px',
                    background: 'currentColor',
                    transform: 'translateY(2.5px) rotate(45deg)',
                    transformOrigin: 'center',
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    height: '1px',
                    background: 'currentColor',
                    transform: 'translateY(-2.5px) rotate(-45deg)',
                    transformOrigin: 'center',
                  }}
                />
              </>
            ) : (
              <>
                <span style={{ display: 'block', height: '1px', background: 'currentColor' }} />
                <span style={{ display: 'block', height: '1px', background: 'currentColor' }} />
              </>
            )}
          </span>
        </button>
      </div>

      {/* Mobile panel — full-screen overlay, cream bg, large serif menu items */}
      {mobileOpen && (
        <div
          id="v3-mobile-nav"
          className="md:hidden v3-root"
          data-bg-mode="dark"
          style={{
            background: 'var(--v3-color-dark)',
            color: 'var(--v3-color-paper)',
            padding: '32px 24px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            borderTop: '1px solid var(--v3-color-divider-dark)',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <React.Fragment key={item.href}>
              <Link
                to={item.href}
                onClick={() => {
                  trackCTA({
                    location: 'nav_marketing',
                    label: `${item.label} (mobile)`,
                    destination: item.href,
                  });
                  setMobileOpen(false);
                }}
                style={{
                  padding: '24px 0',
                  fontFamily: 'var(--v3-font-display)',
                  fontWeight: 300,
                  fontSize: '32px',
                  lineHeight: 1.1,
                  color: isActive(item.href)
                    ? 'var(--v3-color-fuchsia)'
                    : 'var(--v3-color-paper)',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
              <div
                aria-hidden
                style={{
                  height: '1px',
                  background: 'var(--v3-color-divider-dark)',
                }}
              />
            </React.Fragment>
          ))}

          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {user ? (
              <>
                {!isEntryTier && (
                  <span
                    style={{
                      fontFamily: 'var(--v3-font-mono)',
                      fontSize: 'var(--v3-text-label)',
                      letterSpacing: 'var(--v3-tracking-label)',
                      textTransform: 'uppercase',
                      color: 'var(--v3-color-fuchsia)',
                      fontWeight: 500,
                    }}
                  >
                    {tierName} tier
                  </span>
                )}
                <Button
                  variant="primary"
                  accent="fuchsia"
                  onClick={() => {
                    setMobileOpen(false);
                    handlePortalEntry();
                  }}
                >
                  My Portal
                </Button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  style={{
                    padding: '14px',
                    background: 'transparent',
                    color: 'var(--v3-color-paper-secondary)',
                    border: '1px solid var(--v3-color-divider-dark-strong)',
                    fontFamily: 'var(--v3-font-body)',
                    fontSize: 'var(--v3-text-body)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => {
                    setMobileOpen(false);
                    trackCTA({
                      location: 'nav_marketing',
                      label: 'Sign in (mobile)',
                      destination: '/login',
                    });
                  }}
                  style={{
                    padding: '14px 0',
                    fontFamily: 'var(--v3-font-body)',
                    fontWeight: 500,
                    color: 'var(--v3-color-paper)',
                    textDecoration: 'none',
                    fontSize: 'var(--v3-text-body-lg)',
                  }}
                >
                  Sign in
                </Link>
                <Button
                  variant="primary"
                  accent="fuchsia"
                  onClick={() => {
                    setMobileOpen(false);
                    trackCTA({
                      location: 'nav_marketing',
                      label: 'Begin (mobile)',
                      destination: '/nexus/lenses/prism',
                    });
                    navigate('/nexus/lenses/prism');
                  }}
                >
                  Begin →
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Underline hover for desktop links */}
      <style>{`
        .v3-nav-link:hover .v3-nav-hoverline,
        .v3-nav-link:hover span[aria-hidden] {
          transform: scaleX(1) !important;
          transform-origin: left !important;
        }
        .v3-nav-link:hover {
          color: var(--v3-color-fuchsia) !important;
        }
        .v3-nav-link {
          display: inline-block;
        }
        .v3-nav-link::after {
          content: "";
          display: block;
          height: 1px;
          background: var(--v3-color-fuchsia);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform var(--v3-dur) var(--v3-ease-out);
          margin-top: 2px;
        }
        .v3-nav-link:hover::after {
          transform: scaleX(1);
        }
      `}</style>
    </header>
  );
}

export default MarketingNav;
