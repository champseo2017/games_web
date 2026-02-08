export const GAME_CONFIG = {
    TICK_RATE: 1000, // ms

    DECAY_RATES: {
        hunger: 2,      // -2 per tick
        fun: 2,         // -2 per tick
        energy: 1,      // -1 per tick (awake)
        energySleep: 5, // +5 per tick (sleeping)
        hygiene: 0.5,   // -0.5 per tick
    },

    THRESHOLDS: {
        sickness: 30, // Hygiene < 30 -> Chance to get sick
        starving: 20, // Hunger < 20 -> Warning
        sicknessChance: 0.1, // 10% chance per tick if hygiene is low
    },

    CAPS: {
        min: 0,
        max: 100,
    }
} as const;
