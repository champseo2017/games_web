
import { Application, Container, Graphics, Texture } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { THEMES } from '../../config/themeConfig';
import { PetState, useGameStore } from '../../stores/useGameStore';

interface EnvironmentProps {
    app: Application;
    timeOfDay: 'DAY' | 'NIGHT';
    petState: PetState;
    width: number;
    height: number;
}

export const Environment = ({ app, timeOfDay, petState, width, height }: EnvironmentProps) => {
    const skyRef = useRef<Graphics | null>(null);
    const groundRef = useRef<Graphics | null>(null);
    const rainRef = useRef<Container | null>(null);
    const snowRef = useRef<Container | null>(null);
    const wasteContainerRef = useRef<Container | null>(null);
    const emoteContainerRef = useRef<Container | null>(null);
    const lightOverlayRef = useRef<Graphics | null>(null);

    // Init Layers
    useEffect(() => {
        const sky = new Graphics();
        const ground = new Graphics();
        const wasteContainer = new Container();
        const emoteContainer = new Container();
        const lightOverlay = new Graphics();

        // Layer Ordering - Explicit Z-Index
        sky.zIndex = -20;
        ground.zIndex = -10;
        wasteContainer.zIndex = 50;
        emoteContainer.zIndex = 200;
        lightOverlay.zIndex = 300;

        sky.eventMode = 'none';
        ground.eventMode = 'none';
        lightOverlay.eventMode = 'none';
        emoteContainer.eventMode = 'none';

        // Explicitly prevent hits on children for decorative layers
        sky.interactiveChildren = false;
        ground.interactiveChildren = false;
        lightOverlay.interactiveChildren = false;
        emoteContainer.interactiveChildren = false;

        app.stage.addChild(sky);
        app.stage.addChild(ground);
        app.stage.addChild(wasteContainer);
        app.stage.addChild(lightOverlay);
        app.stage.addChild(emoteContainer);

        skyRef.current = sky;
        groundRef.current = ground;
        wasteContainerRef.current = wasteContainer;
        emoteContainerRef.current = emoteContainer;
        lightOverlayRef.current = lightOverlay;

        // Weather Containers
        const rainFn = createRainSystem(app);
        const snowFn = createSnowSystem(app);

        rainRef.current = rainFn.container;
        snowRef.current = snowFn.container;

        const tick = () => {
            rainFn.update();
            snowFn.update();
        };
        app.ticker.add(tick);

        return () => {
            sky.destroy();
            ground.destroy();
            wasteContainer.destroy();
            emoteContainer.destroy();
            lightOverlay.destroy();
            rainFn.container.destroy();
            snowFn.container.destroy();
            if (app.ticker) {
                try {
                    app.ticker.remove(tick);
                } catch (e) {
                    console.warn('[Environment] Failed to remove ticker:', e);
                }
            }
        };
    }, [app]);

    // Update Visuals (Themes & Weather)
    useEffect(() => {
        const sky = skyRef.current;
        const ground = groundRef.current;
        const rain = rainRef.current;
        const snow = snowRef.current;

        if (!sky || !ground || !rain || !snow || !app.renderer) return;

        let theme = THEMES[timeOfDay];
        if (petState === 'DEAD') theme = THEMES.DEAD;
        else if (petState === 'SICK') theme = THEMES.SICK;

        // Draw Sky Gradient
        sky.clear();
        try {
            const gradientTexture = createGradientTexture(theme.scenery.sky[0], theme.scenery.sky[1], height || 600);
            sky.rect(0, 0, width, height);
            sky.fill({ texture: gradientTexture });
        } catch (e) {
            sky.rect(0, 0, width, height);
            sky.fill(theme.background);
        }

        // Draw Ground
        ground.clear();
        ground.rect(0, height * 0.75, width, height * 0.25);
        ground.fill(theme.scenery.ground);

        // Toggle Weather
        rain.visible = theme.weather === 'RAIN';
        snow.visible = theme.weather === 'SNOW';

    }, [timeOfDay, petState, width, height]);

    // Reactive Content (Wastes & Emotes & Lights)
    useEffect(() => {
        const wasteContainer = wasteContainerRef.current;
        const emoteContainer = emoteContainerRef.current;
        const lightOverlay = lightOverlayRef.current;
        if (!wasteContainer || !emoteContainer || !lightOverlay) return;

        // Subscribe to store
        const unsub = useGameStore.subscribe((state) => {
            // Update Lights
            lightOverlay.clear();
            if (!state.isLightsOn) {
                lightOverlay.rect(0, 0, width, height);
                lightOverlay.fill({ color: 0x000033, alpha: 0.5 });
            }

            // Update Wastes
            wasteContainer.removeChildren().forEach(c => c.destroy());
            state.wastes.forEach(w => {
                const g = new Graphics();
                // Draw a simple poop shape
                g.moveTo(-15, 10);
                g.quadraticCurveTo(0, -20, 15, 10);
                g.fill(0x6b4226); // Brown
                g.stroke({ width: 2, color: 0x000000 });
                g.x = w.x * (width / 800);
                g.y = w.y * (height / 600);

                // Interaction for waste
                g.eventMode = 'static';
                g.cursor = 'pointer';
                g.on('pointerdown', () => state.disposeWaste(w.id));

                wasteContainer.addChild(g);
            });

            // Update Emotes (Transient)
            // Emote container will be handled by trigger logic usually, 
            // but here we can just clear and redraw based on store array
            emoteContainer.removeChildren().forEach(c => c.destroy());
            state.emotes.forEach(e => {
                const g = new Graphics();
                if (e.type === 'HEART') {
                    g.moveTo(0, 0);
                    g.bezierCurveTo(-15, -15, -30, 10, 0, 25);
                    g.bezierCurveTo(30, 10, 15, -15, 0, 0);
                    g.fill(0xff0000);
                } else if (e.type === 'SWEAT') {
                    g.ellipse(0, 0, 8, 15);
                    g.fill(0x00ccff);
                }
                g.stroke({ width: 2, color: 0x000000 });
                g.x = e.x * (width / 800);
                g.y = e.y * (height / 600);

                // Add simple floating animation
                const startTime = Date.now();
                const ticker = () => {
                    if (g.destroyed) return;
                    const elapsed = Date.now() - startTime;
                    g.y -= 1;
                    g.alpha = 1 - (elapsed / 2000);
                };
                app.ticker.add(ticker);
                g.on('destroyed', () => app.ticker.remove(ticker));

                emoteContainer.addChild(g);
            });
        });

        return () => unsub();
    }, [app, width, height]);

    return null;
};

// --- Helpers ---

// Create a linear gradient texture using HTML5 Canvas (Pixi best practice for simple gradients)
const createGradientTexture = (color1: number, color2: number, height: number) => {
    // Safety check for height
    if (height <= 0) height = 1;

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return Texture.WHITE;

    const grd = ctx.createLinearGradient(0, 0, 0, height);
    grd.addColorStop(0, '#' + color1.toString(16).padStart(6, '0'));
    grd.addColorStop(1, '#' + color2.toString(16).padStart(6, '0'));

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1, height);

    return Texture.from(canvas);
};


const createRainSystem = (app: Application) => {
    const container = new Container();
    container.visible = false;
    app.stage.addChild(container);

    const drops: Graphics[] = [];
    const count = 100;

    for (let i = 0; i < count; i++) {
        const drop = new Graphics();
        drop.rect(0, 0, 2, 10);
        drop.fill(0xAAAAFF);

        // Initial pos
        drop.x = 0; drop.y = 0;

        container.addChild(drop);
        drops.push(drop);
    }

    const update = () => {
        if (!container.visible || !app.screen) return;
        const { width, height } = app.screen;
        drops.forEach(d => {
            d.y += 10 + Math.random() * 5;
            if (d.y > height) {
                d.y = -10;
                d.x = Math.random() * width;
            }
        });
    };

    return { container, update };
};

const createSnowSystem = (app: Application) => {
    const container = new Container();
    container.visible = false;
    app.stage.addChild(container);

    const flakes: { g: Graphics, speed: number, offset: number }[] = [];
    const count = 50;

    for (let i = 0; i < count; i++) {
        const fake = new Graphics();
        fake.circle(0, 0, 3);
        fake.fill(0xFFFFFF);

        // Initial
        fake.x = 0; fake.y = 0;

        container.addChild(fake);
        flakes.push({ g: fake, speed: 1 + Math.random(), offset: Math.random() * 100 });
    }

    const update = () => {
        if (!container.visible || !app.screen) return;
        const { width, height } = app.screen;
        flakes.forEach(f => {
            f.g.y += f.speed;
            f.g.x += Math.sin((f.g.y + f.offset) / 50) * 0.5; // Sway
            if (f.g.y > height) {
                f.g.y = -10;
                f.g.x = Math.random() * width;
            }
        });
    };

    return { container, update };
};
