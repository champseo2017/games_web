export interface Theme {
    background: number; // Fallback / Main color
    scenery: {
        sky: [number, number]; // [Top, Bottom] Gradient colors
        ground: number;
    };
    weather: 'CLEAR' | 'RAIN' | 'SNOW';
}

export const THEMES: Record<string, Theme> = {
    DAY: {
        background: 0x87CEEB,
        scenery: {
            sky: [0x4FC3F7, 0xB3E5FC], // Light Blue -> Pale Blue
            ground: 0x90EE90,          // Light Green
        },
        weather: 'CLEAR',
    },
    NIGHT: {
        background: 0x191970,
        scenery: {
            sky: [0x0D47A1, 0x4527A0], // Deep Blue -> Deep Purple
            ground: 0x263238,          // Dark Blue Grey
        },
        weather: 'CLEAR',
    },
    SICK: {
        background: 0x808000,
        scenery: {
            sky: [0x827717, 0xAFB42B], // Olive -> Lime Mud
            ground: 0x33691E,          // Dark Olive
        },
        weather: 'RAIN', // Sick pets feel gloomy
    },
    DEAD: {
        background: 0x2F4F4F,
        scenery: {
            sky: [0x212121, 0x424242], // Grey -> Dark Grey
            ground: 0x000000,          // Black
        },
        weather: 'SNOW', // Cold and lifeless
    },
} as const;

export type ThemeType = keyof typeof THEMES;
