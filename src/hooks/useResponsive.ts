import { useEffect, useState } from 'react';

/**
 * Responsive breakpoints matching Tailwind CSS
 * - mobile: < 640px (default, no 'sm:' prefix)
 * - tablet: 640px - 1024px (md: breakpoint)
 * - desktop: 1024px - 1536px (lg: breakpoint)
 * - wide: 1536px - 2560px (2xl: breakpoint)
 * - ultra-wide: >= 2560px
 */
type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultraWide';

interface ResponsiveValues<T> {
  mobile: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
  ultraWide?: T;
}

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('mobile');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else if (width < 1536) {
        setBreakpoint('desktop');
      } else if (width < 2560) {
        setBreakpoint('wide');
      } else {
        setBreakpoint('ultraWide');
      }
    };

    // Initial check
    handleResize();

    // Add listener with debounce
    let timeoutId: NodeJS.Timeout;
    window.addEventListener('resize', () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = isClient && breakpoint === 'mobile';
  const isTablet = isClient && (breakpoint === 'mobile' || breakpoint === 'tablet');
  const isDesktop = isClient && breakpoint === 'desktop';
  const isWide = isClient && (breakpoint === 'wide' || breakpoint === 'ultraWide');

  /**
   * Get responsive value based on current breakpoint
   * Falls back to mobile if intermediate breakpoint not defined
   */
  const getResponsiveValue = <T,>(values: ResponsiveValues<T>): T => {
    if (!isClient) return values.mobile;

    switch (breakpoint) {
      case 'ultraWide':
        return values.ultraWide ?? values.wide ?? values.desktop ?? values.tablet ?? values.mobile;
      case 'wide':
        return values.wide ?? values.desktop ?? values.tablet ?? values.mobile;
      case 'desktop':
        return values.desktop ?? values.tablet ?? values.mobile;
      case 'tablet':
        return values.tablet ?? values.mobile;
      default:
        return values.mobile;
    }
  };

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    getResponsiveValue,
    isClient,
  };
}

export type { Breakpoint, ResponsiveValues };
