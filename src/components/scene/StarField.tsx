"use client";
import { useEffect, useRef } from "react";

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number }[] = [];
        const numStars = 800;
        const speed = 2; // Warp speed

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width - canvas.width / 2,
                    y: Math.random() * canvas.height - canvas.height / 2,
                    z: Math.random() * canvas.width
                });
            }
        };

        const draw = () => {
            // Trail effect for warp speed - use white for light theme
            ctx.fillStyle = "rgba(255, 255, 255, 0.1)"; // Keep it subtle
            ctx.fillRect(0.1, 0.1, canvas.width, canvas.height); // Use float to avoid subpixel aliasing issues if any

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            stars.forEach((star) => {
                star.z -= speed;

                if (star.z <= 0) {
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                    star.z = canvas.width;
                }

                const x = (star.x / star.z) * canvas.width + cx;
                const y = (star.y / star.z) * canvas.height + cy;
                const radius = (1 - star.z / canvas.width) * 2; // Size based on distance

                const alpha = (1 - star.z / canvas.width);
                ctx.beginPath();
                // Use corporate blue for stars
                ctx.fillStyle = `rgba(0, 86, 210, ${alpha})`;
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        initStars();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
        />
    );
}
