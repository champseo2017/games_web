import { Graphics } from 'pixi.js';

type EvolutionBranch = 'NORMAL' | 'AGU' | 'BETA' | 'GREY' | 'TYRANNO' | 'SEA' | 'NUME' | 'GOOD' | 'BAD' | null;

export const PetRenderer = {
    drawEgg: (g: Graphics) => {
        // Shape: Oval
        g.ellipse(0, 0, 40, 50);
        g.fill(0xFFFFFF);
        g.stroke({ width: 4, color: 0x000000 });

        // Digimon V-Pet Style Zig-Zag or Spots
        // Let's do spots for classic Digitama feel
        g.circle(-15, -15, 6).fill(0xDDDDDD);
        g.circle(10, 5, 8).fill(0xDDDDDD);
        g.circle(-8, 25, 5).fill(0xDDDDDD);
    },

    drawBaby1: (g: Graphics) => { // Botamon Style
        // Fuzzy Body (approximated with circle for now, maybe add bumps later)
        g.circle(0, 0, 30);
        g.fill(0x222222); // Dark Grey/Black
        g.stroke({ width: 3, color: 0x000000 });

        // Eyes: Large, Angular Yellow
        g.ellipse(-10, -5, 10, 14).fill(0xFFFF00).stroke({ width: 1, color: 0x000000 });
        g.ellipse(10, -5, 10, 14).fill(0xFFFF00).stroke({ width: 1, color: 0x000000 });

        // Slit Pupils
        g.ellipse(-10, -5, 2, 8).fill(0x000000);
        g.ellipse(10, -5, 2, 8).fill(0x000000);
    },

    drawBaby2: (g: Graphics) => { // Koromon Style
        // Body: Pink Blob
        // Ears logic first so they are behind (if we don't clear) - but here we clear before draw usually.
        // Actually simpler to draw ears then body on top if they overlap, or union. 
        // Let's draw Ears first.

        g.fill(0xFFB7C5);
        g.stroke({ width: 3, color: 0x000000 });

        // Left Ear
        g.moveTo(-20, -20);
        g.bezierCurveTo(-40, -50, -50, -40, -30, -10);
        g.fill(0xFFB7C5).stroke({ width: 3, color: 0x000000 });

        // Right Ear
        g.moveTo(20, -20);
        g.bezierCurveTo(40, -50, 50, -40, 30, -10);
        g.fill(0xFFB7C5).stroke({ width: 3, color: 0x000000 });

        // Head/Body
        g.circle(0, 0, 35);
        g.fill(0xFFB7C5);
        g.stroke({ width: 3, color: 0x000000 });

        // Eyes: Large Red/Pink circles with smaller black pupils
        g.circle(-12, -10, 10).fill(0xFF0000).stroke({ width: 1, color: 0x000000 });
        g.circle(12, -10, 10).fill(0xFF0000).stroke({ width: 1, color: 0x000000 });
        g.circle(-12, -10, 3).fill(0x000000);
        g.circle(12, -10, 3).fill(0x000000);

        // Mouth: Wiggle
        g.moveTo(-10, 15);
        g.quadraticCurveTo(0, 25, 10, 15);
        g.stroke({ width: 2, color: 0x000000 });

        // Teeth (Tiny)
        g.moveTo(-5, 15).lineTo(-2, 20).lineTo(1, 15); // Left tooth
        g.moveTo(2, 15).lineTo(5, 20).lineTo(8, 15); // Right tooth
        g.fill(0xFFFFFF);
    },

    drawChild: (g: Graphics, branch: EvolutionBranch) => {
        if (branch === 'BETA') { // Betamon Style (Amphibian/Green)
            // Dorsal Fin
            g.moveTo(0, -30);
            g.bezierCurveTo(-10, -55, 10, -55, 0, -30);
            g.fill(0x15803d).stroke({ width: 3, color: 0x000000 });

            // Body: Squat
            g.ellipse(0, 0, 45, 35);
            g.fill(0x22C55E); // Green
            g.stroke({ width: 3, color: 0x000000 });

            // Eyes
            g.circle(-15, -15, 6).fill(0x000000);
            g.circle(15, -15, 6).fill(0x000000);

            // Legs
            g.ellipse(-30, 20, 10, 15).fill(0x22C55E).stroke({ width: 3, color: 0x000000 });
            g.ellipse(30, 20, 10, 15).fill(0x22C55E).stroke({ width: 3, color: 0x000000 });

        } else { // Agumon Style (Default - Reptile/Yellow)
            // Tail
            g.moveTo(20, 10);
            g.quadraticCurveTo(50, 20, 40, 40);
            g.lineTo(20, 30);
            g.fill(0xFACC15).stroke({ width: 3, color: 0x000000 });

            // Body
            g.roundRect(-30, -40, 60, 75, 20);
            g.fill(0xFACC15);
            g.stroke({ width: 3, color: 0x000000 });

            // Snout
            g.roundRect(-15, -20, 30, 20, 8);
            g.fill(0xFACC15).stroke({ width: 3, color: 0x000000 });

            // Nostrils
            g.circle(-5, -15, 1).fill(0x000000);
            g.circle(5, -15, 1).fill(0x000000);

            // Green Eyes
            g.ellipse(-15, -35, 6, 8).fill(0x4ade80).stroke({ width: 2, color: 0x000000 });
            g.ellipse(15, -35, 6, 8).fill(0x4ade80).stroke({ width: 2, color: 0x000000 });

            // Arms
            g.ellipse(-35, 0, 10, 20).fill(0xFACC15).stroke({ width: 3, color: 0x000000 });
            g.ellipse(35, 0, 10, 20).fill(0xFACC15).stroke({ width: 3, color: 0x000000 });
        }
    },

    drawAdult: (g: Graphics, branch: EvolutionBranch) => {
        g.circle(0, 0, 60).fill(0x9CA3AF).stroke({ width: 4, color: 0x000000 }); // Base

        if (branch === 'GREY') { // Greymon (Skull Helmet)
            // Base Body Orange
            g.circle(0, 0, 60).fill(0xF97316).stroke({ width: 4, color: 0x000000 });

            // Brown Skull Helmet
            g.roundRect(-45, -65, 90, 50, 15).fill(0x5D4037).stroke({ width: 3, color: 0x000000 });

            // Horns
            g.moveTo(-35, -60).lineTo(-45, -90).lineTo(-25, -65).fill(0xFFFFFF).stroke({ width: 2, color: 0x000000 }); // Side
            g.moveTo(35, -60).lineTo(45, -90).lineTo(25, -65).fill(0xFFFFFF).stroke({ width: 2, color: 0x000000 }); // Side
            g.moveTo(0, -65).lineTo(0, -100).lineTo(15, -70).fill(0xFFFFFF).stroke({ width: 2, color: 0x000000 }); // Center Nose Horn

            // Green Eyes (Visible through helmet holes?) - simplified
            g.circle(-20, -40, 5).fill(0x00FF00);
            g.circle(20, -40, 5).fill(0x00FF00);

            // Blue Stripes (Minimal)
            g.rect(-20, 10, 40, 5).fill(0x3B82F6);
            g.rect(-25, 25, 50, 5).fill(0x3B82F6);
        }
        else if (branch === 'TYRANNO') { // Tyrannomon (Red Dino)
            g.circle(0, 0, 60).fill(0xEF4444).stroke({ width: 4, color: 0x000000 });
            // Green Fins/Spikes on back
            g.moveTo(0, -60).lineTo(-10, -80).lineTo(10, -60).fill(0x22C55E).stroke({ width: 2, color: 0x000000 });
        }
        else if (branch === 'SEA') { // Seadramon (Serpent)
            g.ellipse(0, 0, 40, 80).fill(0x3B82F6).stroke({ width: 4, color: 0x000000 }); // Long body
            // Yellow Face Plate
            g.moveTo(0, -40).lineTo(-20, -80).lineTo(20, -80).fill(0xFACC15).stroke({ width: 2, color: 0x000000 });
        }
        else if (branch === 'NUME') { // Numemon (Slug)
            g.clear(); // Clear base
            // Green Sludge Body
            g.moveTo(-50, 50);
            g.bezierCurveTo(-40, -40, 40, -40, 50, 50);
            g.lineTo(50, 50);
            g.quadraticCurveTo(0, 70, -50, 50);
            g.fill(0x22C55E).stroke({ width: 4, color: 0x000000 });

            // Eye Stalks
            g.rect(-25, -50, 10, 40).fill(0x22C55E).stroke({ width: 3, color: 0x000000 });
            g.rect(15, -50, 10, 40).fill(0x22C55E).stroke({ width: 3, color: 0x000000 });

            // Red Eyes
            g.circle(-20, -55, 10).fill(0xEF4444).stroke({ width: 2, color: 0x000000 });
            g.circle(20, -55, 10).fill(0xEF4444).stroke({ width: 2, color: 0x000000 });

            // Tongue
            g.ellipse(0, 20, 15, 25).fill(0xFF69B4).stroke({ width: 2, color: 0x000000 });
        }
    }
};
