import { Application, Graphics } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { PetState, useGameStore } from '../../stores/useGameStore';
import { Environment } from './Environment';
import { PetRenderer } from './PetRenderer';

interface GameCanvasProps {
    state: PetState;
    timeOfDay: 'DAY' | 'NIGHT';
}

export const GameCanvas = ({ state, timeOfDay }: GameCanvasProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [app, setApp] = useState<Application | null>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const spriteRef = useRef<Graphics | null>(null);

    // Initialize PixiJS
    useEffect(() => {
        if (!containerRef.current) return;

        let isCancelled = false;
        let appInstance: Application | null = null;
        let resizeObserver: ResizeObserver | null = null;

        const initPixi = async () => {
            const instance = new Application();

            try {
                await instance.init({
                    backgroundAlpha: 0,
                    preference: 'webgl',
                });

                if (isCancelled) {
                    instance.destroy({ removeView: true });
                    return;
                }

                appInstance = instance;
                // Enable global interaction
                instance.stage.eventMode = 'static';
                instance.stage.hitArea = instance.screen;
                instance.stage.sortableChildren = true; // Enable z-index sorting

                if (containerRef.current) {
                    const canvas = instance.canvas;
                    // ... styles ...
                    canvas.style.position = 'absolute';
                    canvas.style.top = '0';
                    canvas.style.left = '0';
                    canvas.style.width = '100%';
                    canvas.style.height = '100%';

                    containerRef.current.appendChild(canvas);
                    setApp(instance);
                    setDimensions({ width: instance.screen.width, height: instance.screen.height });

                    // Draw Initial Sprite
                    const graphics = new Graphics();
                    graphics.circle(0, 0, 50);
                    graphics.fill(0xffff00);
                    graphics.stroke({ width: 4, color: 0x000000 });
                    graphics.x = instance.screen.width / 2;
                    graphics.y = instance.screen.height / 2;
                    graphics.zIndex = 100; // Ensure Pet is on top
                    graphics.x = instance.screen.width / 2;
                    graphics.y = instance.screen.height / 2;

                    // Enable Pet Interaction
                    graphics.eventMode = 'static';
                    graphics.cursor = 'pointer';
                    graphics.on('pointerdown', () => {
                        // console.log('[Canvas] Pet sprite hit!');
                        const success = useGameStore.getState().pet();
                        // console.log('[Canvas] Pet action success:', success);
                        if (success) {
                            // Visual bounce on click
                            graphics.scale.set(1.2);
                            setTimeout(() => graphics.scale.set(1), 100);
                        }
                    });

                    instance.stage.addChild(graphics);
                    spriteRef.current = graphics;

                    instance.ticker.add(() => {
                        if (graphics && appInstance) {
                            const floatY = Math.sin(Date.now() / 200) * 10;
                            // Reset scale smoothly if needed, but let's keep it simple for now
                            graphics.y = appInstance.screen.height / 2 + floatY;
                        }
                    });

                    // Start Resize Observer after init
                    let lastWidth = 0;
                    let lastHeight = 0;

                    resizeObserver = new ResizeObserver((entries) => {
                        for (const entry of entries) {
                            if (!appInstance || !appInstance.renderer) continue;
                            const width = Math.floor(entry.contentRect.width);
                            const height = Math.floor(entry.contentRect.height);

                            // Ignore tiny changes to break infinite loops
                            if (width === 0 || height === 0) continue;
                            if (Math.abs(width - lastWidth) < 2 && Math.abs(height - lastHeight) < 2) continue;

                            lastWidth = width;
                            lastHeight = height;

                            appInstance.renderer.resize(width, height);
                            setDimensions({ width, height });
                            if (spriteRef.current) {
                                spriteRef.current.x = width / 2;
                                spriteRef.current.y = height / 2;
                            }
                        }
                    });
                    resizeObserver.observe(containerRef.current);
                }
            } catch (e) {
                // Silently handle init errors
            }
        };

        initPixi();

        return () => {
            isCancelled = true;
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            if (appInstance) {
                try {
                    // Safe destroy with catch for Pixi v8 internal issues
                    appInstance.destroy({ removeView: true });
                } catch (e) {
                    // Ignore internal destroy errors
                }
                setApp(null);
            }
        };
    }, []);

    const stage = useGameStore((s) => s.stage);
    const branch = useGameStore((s) => s.evolutionBranch);

    // Update Face based on State & Evolution
    useEffect(() => {
        const graphics = spriteRef.current;
        if (!graphics) return;

        console.log('[GameCanvas] Redrawing. Stage:', stage, 'Branch:', branch);

        graphics.clear();

        try {
            // --- Digimon Style Rendering (via PetRenderer) ---
            if (stage === 'egg') {
                PetRenderer.drawEgg(graphics);
            } else if (stage === 'baby1') {
                PetRenderer.drawBaby1(graphics);
            } else if (stage === 'baby2') {
                PetRenderer.drawBaby2(graphics);
            } else if (stage === 'child') {
                PetRenderer.drawChild(graphics, branch);
            } else if (stage === 'adult') {
                PetRenderer.drawAdult(graphics, branch);
            } else {
                // Fallback
                graphics.circle(0, 0, 50).fill(0xFFFFFF);
            }

        } catch (err) {
            console.error('[GameCanvas] Drawing Error:', err);
            // Fallback on error
            graphics.circle(0, 0, 50).fill(0xFF0000);
        }

    }, [state, stage, branch]); // Correct dependencies

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                maxWidth: '800px',
                aspectRatio: '16 / 9',
                minHeight: '400px',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '4px solid #1f2937',
                position: 'relative',
                backgroundColor: 'black',
                zIndex: 0,
                flexShrink: 0
            }}
        >
            {app && (
                <Environment
                    app={app}
                    timeOfDay={timeOfDay}
                    petState={state}
                    width={dimensions.width}
                    height={dimensions.height}
                />
            )}
            <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#00FF00',
                padding: '4px',
                fontSize: '10px',
                pointerEvents: 'none',
                zIndex: 1000
            }}>
                V2.0 DIGIMON
            </div>
        </div>
    );
};
