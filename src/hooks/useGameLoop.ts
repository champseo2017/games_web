import { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/useGameStore';

export const useGameLoop = (tickRate: number = 1000) => {
    const performTick = useGameStore((state) => state.performTick);
    const lastTickRef = useRef<number>(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            // Basic decay rates - move to config later

            performTick();
            lastTickRef.current = now;
        }, tickRate);

        return () => clearInterval(interval);
    }, [performTick, tickRate]);
};
