import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PetStats {
    hunger: number; // 0-100
    fun: number;    // 0-100
    energy: number; // 0-100
}

interface DecayRates {
    hunger: number;
    fun: number;
    energy: number;
    energySleep: number;
}

interface GameState {
    stats: PetStats;
    stage: 'egg' | 'baby' | 'adult';
    isSleeping: boolean;
    lastInteract: number;
    birthDate: number;

    // Actions
    updateStats: (partial: Partial<PetStats>) => void;
    setStage: (stage: 'egg' | 'baby' | 'adult') => void;
    toggleSleep: () => void;
    registerInteraction: () => void;
    performTick: (decayRates: DecayRates) => void;
    applyOfflineProgress: (seconds: number, decayRates: DecayRates) => void;
}

const DEFAULT_STATS: PetStats = { hunger: 50, fun: 50, energy: 100 };

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            stats: DEFAULT_STATS,
            stage: 'egg',
            isSleeping: false,
            lastInteract: Date.now(),
            birthDate: Date.now(),

            updateStats: (partial) =>
                set((state) => ({
                    stats: {
                        ...state.stats,
                        ...partial,
                        // Clamp values
                        hunger: Math.max(0, Math.min(100, partial.hunger ?? state.stats.hunger)),
                        fun: Math.max(0, Math.min(100, partial.fun ?? state.stats.fun)),
                        energy: Math.max(0, Math.min(100, partial.energy ?? state.stats.energy)),
                    },
                })),

            setStage: (stage) => set({ stage }),

            toggleSleep: () => set((state) => ({ isSleeping: !state.isSleeping })),

            registerInteraction: () => set({ lastInteract: Date.now() }),

            performTick: (decayRates) => set((state) => {
                if (state.stage === 'egg') return state; // Egg doesn't decay

                let { hunger, fun, energy } = state.stats;

                if (state.isSleeping) {
                    energy = Math.min(100, energy + Math.abs(decayRates.energySleep));
                    hunger = Math.max(0, hunger - (decayRates.hunger / 2)); // Slower hunger decay when sleeping
                } else {
                    hunger = Math.max(0, hunger - decayRates.hunger);
                    fun = Math.max(0, fun - decayRates.fun);
                    energy = Math.max(0, energy - decayRates.energy);
                }

                // Auto-wake if full energy? For now, stick to basic logic.

                return {
                    stats: { hunger, fun, energy }
                };
            }),

            applyOfflineProgress: (seconds, decayRates) => set((state) => {
                if (seconds <= 0 || state.stage === 'egg') return state;

                // Simple bulk decay for now
                // We assume 'seconds' is roughly equal to 'ticks' if 1 tick = 1 sec
                // Adjust logic based on TICK_RATE in App.tsx later

                let { hunger, fun, energy } = state.stats;

                if (state.isSleeping) {
                    energy = Math.min(100, energy + (seconds * Math.abs(decayRates.energySleep)));
                    hunger = Math.max(0, hunger - (seconds * (decayRates.hunger / 2)));
                } else {
                    const factor = 1; // Normal decay
                    hunger = Math.max(0, hunger - (seconds * decayRates.hunger * factor));
                    fun = Math.max(0, fun - (seconds * decayRates.fun * factor));
                    energy = Math.max(0, energy - (seconds * decayRates.energy * factor));
                }

                return {
                    stats: { hunger, fun, energy },
                    lastInteract: Date.now() // Catch up time
                };
            })
        }),
        {
            name: 'pixel-pet-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);
