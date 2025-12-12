'use client';

import React, { createContext, useContext } from 'react';
import { useResponsive, type Breakpoint } from './useResponsive';

/**
 * 3D Scene responsive configuration
 * Defines camera positions, animations, and detail levels per breakpoint
 */
export interface Scene3DConfig {
  // Camera settings for hero section
  hero: {
    position: [number, number, number];
    fov: number;
    lookAt: [number, number, number];
  };
  // Camera settings for skills section
  skills: {
    position: [number, number, number];
    fov: number;
    lookAt: [number, number, number];
  };
  // Camera settings for projects section
  projects: {
    position: [number, number, number];
    fov: number;
    lookAt: [number, number, number];
  };
  // Camera settings for contact section
  contact: {
    position: [number, number, number];
    fov: number;
    lookAt: [number, number, number];
  };
  // Performance settings
  performance: {
    dpr: number; // Device pixel ratio
    geometryDetail: 'low' | 'medium' | 'high'; // Polygon count reduction
    particleCount: number; // Number of particles in background
    bloomIntensity: number;
    postProcessing: boolean; // Enable/disable post-processing effects
  };
  // Scroll settings
  scroll: {
    pages: number; // Number of scroll pages
    damping: number;
  };
  // Background object visibility settings (planets, sun)
  background: {
    sunScale: number; // Scale of the sun (1.0 = default)
    earthOrbitRadius: number; // Radius of earth orbit (default 2.8)
    earthScale: number; // Scale of earth
    earthVisibility: number; // Opacity/visibility (0-1)
  };
}

const scene3DConfigs: Record<Breakpoint, Scene3DConfig> = {
  mobile: {
    hero: {
      position: [0, 0, 12], // Closer camera
      fov: 60, // Wider FOV for mobile
      lookAt: [0, 0, 0],
    },
    skills: {
      position: [0, 0, 8], // Very close-up
      fov: 55,
      lookAt: [0, 0, 0],
    },
    projects: {
      position: [0, 0, 20],
      fov: 50,
      lookAt: [0, 0, 0],
    },
    contact: {
      position: [0, 3, 15],
      fov: 50,
      lookAt: [0, 5, 0],
    },
    performance: {
      dpr: 1, // Lower DPR for mobile = faster rendering
      geometryDetail: 'low',
      particleCount: 30, // Fewer particles
      bloomIntensity: 1.2,
      postProcessing: false, // Disable heavy effects on mobile
    },
    scroll: {
      pages: 5,
      damping: 0.3,
    },
    background: {
      sunScale: 1.2, // Increased sun size for visibility on mobile
      earthOrbitRadius: 4.5, // Increased orbit radius for mobile (was 2.8)
      earthScale: 0.35, // Larger earth for mobile visibility
      earthVisibility: 1.0,
    },
  },
  tablet: {
    hero: {
      position: [0, 1, 14],
      fov: 55,
      lookAt: [0, 0, 0],
    },
    skills: {
      position: [0, 0, 10],
      fov: 50,
      lookAt: [0, 0, 0],
    },
    projects: {
      position: [0, -3, 25],
      fov: 45,
      lookAt: [0, 0, 0],
    },
    contact: {
      position: [0, 5, 18],
      fov: 48,
      lookAt: [0, 8, 0],
    },
    performance: {
      dpr: 1.2,
      geometryDetail: 'medium',
      particleCount: 50,
      bloomIntensity: 1.5,
      postProcessing: true,
    },
    scroll: {
      pages: 5,
      damping: 0.25,
    },
    background: {
      sunScale: 1.1, // Slightly increased for tablet
      earthOrbitRadius: 3.5, // Increased orbit radius for tablet visibility
      earthScale: 0.3,
      earthVisibility: 1.0,
    },
  },
  desktop: {
    hero: {
      position: [0, 3, 18],
      fov: 50,
      lookAt: [0, 0, 0],
    },
    skills: {
      position: [0, 0, 6],
      fov: 50,
      lookAt: [0, 0, 0],
    },
    projects: {
      position: [0, -5, 30],
      fov: 40,
      lookAt: [0, 0, 0],
    },
    contact: {
      position: [0, 5, 20],
      fov: 50,
      lookAt: [0, 10, 20],
    },
    performance: {
      dpr: 1.5,
      geometryDetail: 'high',
      particleCount: 80,
      bloomIntensity: 2.0,
      postProcessing: true,
    },
    scroll: {
      pages: 5,
      damping: 0.2,
    },
    background: {
      sunScale: 1.0, // Default sun scale
      earthOrbitRadius: 2.8, // Default orbit radius
      earthScale: 0.25,
      earthVisibility: 1.0,
    },
  },
  wide: {
    hero: {
      position: [0, 3, 20],
      fov: 45,
      lookAt: [0, 0, 0],
    },
    skills: {
      position: [0, 0, 8],
      fov: 45,
      lookAt: [0, 0, 0],
    },
    projects: {
      position: [0, -8, 35],
      fov: 35,
      lookAt: [0, 0, 0],
    },
    contact: {
      position: [0, 8, 25],
      fov: 45,
      lookAt: [0, 12, 20],
    },
    performance: {
      dpr: 2,
      geometryDetail: 'high',
      particleCount: 120,
      bloomIntensity: 2.5,
      postProcessing: true,
    },
    scroll: {
      pages: 5,
      damping: 0.2,
    },
    background: {
      sunScale: 1.0,
      earthOrbitRadius: 2.8,
      earthScale: 0.25,
      earthVisibility: 1.0,
    },
  },
  ultraWide: {
    hero: {
      position: [0, 4, 25],
      fov: 40,
      lookAt: [0, 0, 0],
    },
    skills: {
      position: [0, 0, 10],
      fov: 40,
      lookAt: [0, 0, 0],
    },
    projects: {
      position: [0, -10, 40],
      fov: 30,
      lookAt: [0, 0, 0],
    },
    contact: {
      position: [0, 10, 30],
      fov: 40,
      lookAt: [0, 15, 25],
    },
    performance: {
      dpr: 2,
      geometryDetail: 'high',
      particleCount: 150,
      bloomIntensity: 3,
      postProcessing: true,
    },
    scroll: {
      pages: 5,
      damping: 0.15,
    },
    background: {
      sunScale: 1.0,
      earthOrbitRadius: 2.8,
      earthScale: 0.25,
      earthVisibility: 1.0,
    },
  },
};

interface Scene3DContextType {
  config: Scene3DConfig;
  breakpoint: Breakpoint;
}

const Scene3DContext = createContext<Scene3DContextType | undefined>(undefined);

export const Scene3DProvider = ({ children }: { children: React.ReactNode }) => {
  const { breakpoint } = useResponsive();
  const config = scene3DConfigs[breakpoint as Breakpoint] || scene3DConfigs.mobile;

  return (
    <Scene3DContext.Provider value={{ config, breakpoint: breakpoint as Breakpoint }}>
      {children}
    </Scene3DContext.Provider>
  );
}

export function useScene3D() {
  const context = useContext(Scene3DContext);
  if (!context) {
    throw new Error('useScene3D must be used within Scene3DProvider');
  }
  return context;
}
