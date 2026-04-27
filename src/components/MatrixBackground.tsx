import React, { useEffect, useRef } from "react";

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const columns = Math.floor(width / 20);
    const drops: number[] = new Array(columns).fill(1);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*あいうえおかきくけこ";

    const draw = () => {
      if (!ctx || !canvas) return;
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, width, height);

      // Amethyst Purple glyphs
      ctx.fillStyle = "#7851A9";
      ctx.font = "14px JetBrains Mono, monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / 20);
      drops.length = newColumns;
      drops.fill(1);
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(draw, 33); // ~30 FPS for low power consumption

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20"
    />
  );
};
