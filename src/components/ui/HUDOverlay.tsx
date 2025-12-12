"use client";

import { useResponsive } from "@/hooks/useResponsive";
import TypingHeader from "./TypingHeader";
import NavIcons from "./NavIcons";

export default function HUDOverlay() {
    const { isMobile, isTablet } = useResponsive();

    return (
        <>
            {/* Fixed UI Elements */}
            <TypingHeader />
            <NavIcons />

            {/* Decorative Corner Elements - Responsive */}
            {!isMobile && (
                <>
                    <div className="fixed top-8 right-8 w-24 h-24 sm:w-32 sm:h-32 border-t-2 border-r-2 border-neon-cyan/30 rounded-tr-3xl pointer-events-none z-30" />
                    <div className="fixed bottom-8 left-8 w-24 h-24 sm:w-32 sm:h-32 border-b-2 border-l-2 border-neon-purple/30 rounded-bl-3xl pointer-events-none z-30" />
                </>
            )}

            {/* Decorative Corners - Mobile Simplified */}
            {isMobile && (
                <>
                    <div className="fixed top-4 right-4 w-12 h-12 border-t border-r border-neon-cyan/20 rounded-tr-lg pointer-events-none z-30" />
                    <div className="fixed bottom-4 left-4 w-12 h-12 border-b border-l border-neon-purple/20 rounded-bl-lg pointer-events-none z-30" />
                </>
            )}

            {/* Scanline Overlay (Subtle) */}
            <div
                className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                    backgroundSize: "100% 2px, 3px 100%"
                }}
            />
        </>
    );
}
