import { GAME_CONFIG } from '@config/gameConfig';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type PetState = 'IDLE' | 'SLEEPING' | 'EATING' | 'PLAYING' | 'SICK' | 'DEAD';

interface PetStats {
    hunger: number; // 0-100
    fun: number;    // 0-100
    energy: number; // 0-100
    hygiene: number; // 0-100
}

interface GameState {
    stats: PetStats;
    stage: 'egg' | 'baby1' | 'baby2' | 'child' | 'adult';
    state: PetState;
    lastInteract: number;
    birthDate: number;
    lastPetTime: number; // For petting cooldown
    age: number; // Total seconds of life
    careMistakes: number;
    evolutionBranch: 'NORMAL' | 'AGU' | 'BETA' | 'GREY' | 'TYRANNO' | 'SEA' | 'NUME' | 'GOOD' | 'BAD' | null;

    // Actions
    updateStats: (partial: Partial<PetStats>) => void;
    setStage: (stage: 'egg' | 'baby1' | 'baby2' | 'child' | 'adult') => void;
    transitionTo: (newState: PetState) => void;
    registerInteraction: () => void;
    performTick: () => void;
    applyOfflineProgress: (seconds: number) => void;

    clean: () => void;
    heal: () => void;
    pet: () => boolean; // Returns true if pet action was successful
    evolve: () => void;

    // Environment
    timeOfDay: 'DAY' | 'NIGHT';
    isLightsOn: boolean;
    toggleTime: () => void;
    toggleLights: () => void;

    // Waste Management
    wastes: { id: string; x: number; y: number }[];
    addWaste: () => void;
    disposeWaste: (id: string) => void;

    // Emotes
    emotes: { id: string; type: 'HEART' | 'SWEAT'; x: number; y: number }[];
    triggerEmote: (type: 'HEART' | 'SWEAT') => void;
    removeEmote: (id: string) => void;
}

const DEFAULT_STATS: PetStats = { hunger: 50, fun: 50, energy: 100, hygiene: 100 };

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            stats: DEFAULT_STATS,
            stage: 'egg',
            state: 'IDLE',
            lastInteract: Date.now(),
            birthDate: Date.now(),
            lastPetTime: 0,
            age: 0,
            careMistakes: 0,
            evolutionBranch: null,
            wastes: [],
            emotes: [],
            isLightsOn: true,

            updateStats: (partial) =>
                set((state) => {
                    const newStats = { ...state.stats, ...partial };
                    Object.keys(newStats).forEach((k) => {
                        const key = k as keyof PetStats;
                        newStats[key] = Math.max(GAME_CONFIG.CAPS.min, Math.min(GAME_CONFIG.CAPS.max, newStats[key]));
                    });
                    return { stats: newStats };
                }),

            setStage: (stage) => set({ stage }),

            transitionTo: (newState) => {
                const current = get().state;
                if (current === newState || current === 'DEAD') return;

                if (current === 'SLEEPING' && newState !== 'IDLE') {
                    console.warn(`Cannot transition from SLEEPING to ${newState} directly.`);
                    return;
                }
                if (current === 'SICK' && newState !== 'IDLE' && newState !== 'DEAD') {
                    console.warn(`Cannot do ${newState} while SICK.`);
                    return;
                }

                set({ state: newState });
            },

            registerInteraction: () => set({ lastInteract: Date.now() }),

            clean: () => set((state) => ({
                stats: { ...state.stats, hygiene: 100 },
                state: state.state === 'SICK' ? state.state : 'IDLE',
                wastes: [] // Clear all wastes on clean
            })),

            heal: () => set((state) => {
                if (state.state !== 'SICK') return {};
                return { state: 'IDLE', stats: { ...state.stats, energy: Math.max(10, state.stats.energy) } };
            }),

            pet: () => {
                const state = get();
                // console.log('[Store] pet action called, current state:', state.state);
                if (state.state === 'DEAD' || state.state === 'SLEEPING') return false;

                const now = Date.now();
                if (now - state.lastPetTime < 2000) return false; // 2s cooldown

                state.updateStats({ fun: state.stats.fun + 5 });
                set({ lastPetTime: now, lastInteract: now });
                state.triggerEmote('HEART');
                return true;
            },

            evolve: () => set((state) => {
                const currentStage = state.stage;
                let nextStage: GameState['stage'] = currentStage;
                let evolutionBranch: GameState['evolutionBranch'] = state.evolutionBranch;

                console.log('[Store] evolve called. Current:', currentStage, 'Mistakes:', state.careMistakes);

                // --- Evolution Logic (Digimon Style) ---
                if (currentStage === 'egg') {
                    nextStage = 'baby1'; // Fresh
                } else if (currentStage === 'baby1') {
                    nextStage = 'baby2'; // In-Training
                } else if (currentStage === 'baby2') {
                    nextStage = 'child'; // Rookie
                } else if (currentStage === 'child') {
                    nextStage = 'adult'; // Champion
                }

                if (nextStage !== currentStage) {
                    const mistakes = state.careMistakes;

                    // --- Branching Logic ---
                    if (nextStage === 'child') {
                        // Baby2 -> Child
                        if (mistakes <= 3) evolutionBranch = 'AGU'; // Good Care
                        else evolutionBranch = 'BETA'; // Bad Care
                    } else if (nextStage === 'adult') {
                        // Child -> Adult
                        if (evolutionBranch === 'AGU') {
                            if (mistakes <= 3) evolutionBranch = 'GREY'; // Best
                            else evolutionBranch = 'TYRANNO'; // Wild
                        } else if (evolutionBranch === 'BETA') {
                            if (mistakes <= 3) evolutionBranch = 'SEA'; // Elegant
                            else evolutionBranch = 'NUME'; // Fail/Trash
                        } else {
                            // Fallback if branch lost
                            evolutionBranch = 'NUME';
                        }
                    }

                    console.log('[Store] Evolving to:', nextStage, 'Branch:', evolutionBranch);
                    // Reset care mistakes on evolution? Optional. Let's reset for fresh evaluation per stage.
                    return { stage: nextStage, evolutionBranch, careMistakes: 0 };
                }
                console.warn('[Store] No evolution transition defined for:', currentStage);
                return {};
            }),

            performTick: () => set((state) => {
                // console.log('Tick:', state.state, state.stats);
                if (state.state === 'DEAD') return state;

                // --- Age Logic ---
                const newAge = state.age + 1;
                let shouldEvolve = false;
                // Thresholds: 
                // Egg -> Baby1 (60s / 1m)
                // Baby1 -> Baby2 (300s / 5m)
                // Baby2 -> Child (900s / 15m)
                // Child -> Adult (3600s / 1h)
                if (state.stage === 'egg' && newAge >= 60) shouldEvolve = true;
                else if (state.stage === 'baby1' && newAge >= 300) shouldEvolve = true;
                else if (state.stage === 'baby2' && newAge >= 900) shouldEvolve = true;
                else if (state.stage === 'child' && newAge >= 3600) shouldEvolve = true;

                if (shouldEvolve) {
                    // Trigger evolution in next render cycle or immediately
                    get().evolve();
                    return { age: newAge };
                }

                // --- Care Mistake Logic ---
                let newMistakes = state.careMistakes;
                if (state.stats.hunger <= 0 || state.stats.hygiene <= 0) {
                    // Only punish once per tick? Or maybe debounce? 
                    // For now, let's just say if it hits 0, it adds a mistake, but we need to track if we already added it.
                    // Simple approach: random chance to add mistake if critical to avoid spamming
                    if (Math.random() < 0.1) newMistakes += 1;
                }

                if (state.stage === 'egg') return { age: newAge };

                let { hunger, fun, energy, hygiene } = state.stats;
                let newState: PetState = state.state;
                const rates = GAME_CONFIG.DECAY_RATES;

                if (newState === 'SLEEPING') {
                    energy += rates.energySleep;
                    hunger -= rates.hunger * 0.5;
                } else {
                    hunger -= rates.hunger;
                    fun -= rates.fun;
                    // Energy decay is slower if lights are off
                    energy -= state.isLightsOn ? rates.energy : rates.energy * 0.5;
                    hygiene -= rates.hygiene;
                }

                energy = Math.min(100, Math.max(0, energy));
                hunger = Math.max(0, hunger);
                fun = Math.max(0, fun);
                hygiene = Math.max(0, hygiene);

                // Waste generation logic
                const newWastes = [...state.wastes];
                if (hygiene < 50 && Math.random() < 0.05 && newWastes.length < 5) {
                    newWastes.push({
                        id: Math.random().toString(36).substr(2, 9),
                        x: 100 + Math.random() * 600,
                        y: 300 + Math.random() * 200
                    });
                }

                if (hunger <= 0 || energy <= 0) {
                    newState = 'DEAD' as PetState;
                    console.log('UseGameStore: Death condition met', { hunger, energy, newState });
                }

                if (newState !== 'DEAD' && newState !== 'SICK' && hygiene < GAME_CONFIG.THRESHOLDS.sickness) {
                    if (Math.random() < GAME_CONFIG.THRESHOLDS.sicknessChance) {
                        newState = 'SICK';
                    }
                }

                if (newState === 'DEAD') {
                    console.log('UseGameStore: Transitioning to DEAD', { hunger, energy });
                }

                return {
                    state: newState,
                    stats: { hunger, fun, energy, hygiene },
                    wastes: newWastes,
                    age: newAge,
                    careMistakes: newMistakes
                };
            }),

            applyOfflineProgress: (seconds) => set((state) => {
                if (seconds <= 0 || state.stage === 'egg' || state.state === 'DEAD') return state;

                const ticks = seconds;
                let { hunger, fun, energy, hygiene } = state.stats;
                const rates = GAME_CONFIG.DECAY_RATES;

                if (state.state === 'SLEEPING') {
                    energy += ticks * rates.energySleep;
                    hunger -= ticks * (rates.hunger * 0.5);
                } else {
                    hunger -= ticks * rates.hunger;
                    fun -= ticks * rates.fun;
                    energy -= ticks * (state.isLightsOn ? rates.energy : rates.energy * 0.5);
                    hygiene -= ticks * rates.hygiene;
                }

                energy = Math.min(100, Math.max(0, energy));
                hunger = Math.max(0, hunger);
                fun = Math.max(0, fun);
                hygiene = Math.max(0, hygiene);

                let newState: PetState = state.state;
                if (hunger <= 0 || energy <= 0) {
                    newState = 'DEAD';
                }

                return {
                    state: newState,
                    stats: { hunger, fun, energy, hygiene },
                    lastInteract: Date.now()
                };
            }),

            // Environment
            timeOfDay: 'DAY',
            toggleTime: () => set((state) => ({
                timeOfDay: state.timeOfDay === 'DAY' ? 'NIGHT' : 'DAY'
            })),
            toggleLights: () => set((state) => ({
                isLightsOn: !state.isLightsOn
            })),

            // Waste Management
            addWaste: () => set((state) => ({
                wastes: [...state.wastes, {
                    id: Math.random().toString(36).substr(2, 9),
                    x: 100 + Math.random() * 600,
                    y: 300 + Math.random() * 200
                }]
            })),
            disposeWaste: (id) => set((state) => ({
                wastes: state.wastes.filter(w => w.id !== id),
                stats: { ...state.stats, hygiene: Math.min(100, state.stats.hygiene + 5) }
            })),

            // Emotes
            triggerEmote: (type) => set((state) => {
                const id = Math.random().toString(36).substr(2, 9);
                // Position emote above pet (approx center)
                const x = 400 + (Math.random() * 40 - 20);
                const y = 250;

                // Auto remove after 2s
                setTimeout(() => {
                    get().removeEmote(id);
                }, 2000);

                return {
                    emotes: [...state.emotes, { id, type, x, y }]
                };
            }),
            removeEmote: (id) => set((state) => ({
                emotes: state.emotes.filter(e => e.id !== id)
            })),
        }),
        {
            name: 'pixel-pet-storage',
            storage: createJSONStorage(() => localStorage),
            migrate: (persistedState: any) => {
                if (persistedState && persistedState.age === undefined) {
                    persistedState.age = 0;
                    persistedState.careMistakes = 0;
                    persistedState.evolutionBranch = null;
                }
                return persistedState;
            }
        },
    ),
);
