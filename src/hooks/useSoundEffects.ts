"use client";

import { useCallback, useRef, useEffect } from "react";

export function useSoundEffects() {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize AudioContext on user interaction if needed, 
        // but for now we'll try to init it lazily or on mount if allowed.
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
        }
    }, []);

    const playTone = useCallback((frequency: number, type: OscillatorType, duration: number, volume: number = 0.1) => {
        if (!audioContextRef.current) return;

        const ctx = audioContextRef.current;
        if (ctx.state === "suspended") {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);

        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }, []);

    const playHover = useCallback(() => {
        // High pitched short blip
        playTone(800, "sine", 0.1, 0.05);
    }, [playTone]);

    const playClick = useCallback(() => {
        // Lower pitched confirmation sound
        playTone(400, "square", 0.15, 0.05);
        setTimeout(() => playTone(600, "sine", 0.2, 0.05), 50);
    }, [playTone]);

    return { playHover, playClick };
}
