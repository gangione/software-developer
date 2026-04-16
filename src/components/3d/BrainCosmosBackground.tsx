"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  tint: "white" | "gold" | "blue";
  pulse: number;
};

type Node = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  r: number;
  hue: number;
  drift: number;
  offset: number;
  layer: number;
};

const brainShape: [number, number][] = [
  [0.14, 0.52], [0.18, 0.40], [0.24, 0.31], [0.31, 0.24], [0.40, 0.20],
  [0.49, 0.22], [0.58, 0.18], [0.67, 0.22], [0.75, 0.28], [0.81, 0.38],
  [0.84, 0.49], [0.82, 0.60], [0.77, 0.70], [0.69, 0.77], [0.59, 0.81],
  [0.49, 0.78], [0.40, 0.82], [0.30, 0.79], [0.21, 0.72], [0.16, 0.62],
  [0.13, 0.56],
  [0.26, 0.52], [0.31, 0.44], [0.39, 0.38], [0.49, 0.37], [0.58, 0.36],
  [0.66, 0.42], [0.71, 0.51], [0.69, 0.60], [0.63, 0.67], [0.55, 0.70],
  [0.47, 0.66], [0.39, 0.68], [0.31, 0.63], [0.27, 0.57],
];

const palette = {
  bgTop:       "#030014",
  bgMid:       "#0a0a2e",
  bgBottom:    "#030014",
  nebulaA:     "rgba(139, 92, 246, 0.12)",  // accent-purple
  nebulaB:     "rgba(59, 130, 246, 0.09)",   // accent-blue
  white:       "rgba(255,255,255,0.95)",
  gold:        "rgba(245, 158, 11, 0.95)",    // accent-gold
  blue:        "rgba(6, 182, 212, 0.95)",     // accent-cyan
};

export default function BrainCosmosBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const stars: Star[] = [];
    const nodes: Node[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initScene();
    };

    const initScene = () => {
      stars.length = 0;
      nodes.length = 0;

      const starCount = Math.floor((width * height) / 12000);
      for (let i = 0; i < starCount; i++) {
        const roll = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.35,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.2 + 0.03,
          tint: roll > 0.92 ? "gold" : roll > 0.75 ? "blue" : "white",
          pulse: Math.random() * Math.PI * 2,
        });
      }

      const centerX = width * 0.5;
      const centerY = height * 0.47;
      const scale = Math.min(width, height) * 0.42;

      brainShape.forEach(([px, py], index) => {
        const x = centerX + (px - 0.5) * scale + (Math.random() - 0.5) * 18;
        const y = centerY + (py - 0.5) * scale * 0.88 + (Math.random() - 0.5) * 18;
        const baseX = x + (Math.random() - 0.5) * 14;
        const baseY = y + (Math.random() - 0.5) * 14;

        nodes.push({
          x,
          y,
          baseX,
          baseY,
          r: index < 21 ? Math.random() * 3.5 + 4.2 : Math.random() * 3 + 3.2,
          hue: 220 + Math.random() * 20,
          drift: Math.random() * 0.7 + 0.2,
          offset: Math.random() * Math.PI * 2,
          layer: index < 21 ? 1 : 0.75,
        });
      });
    };

    const drawBackground = () => {
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, palette.bgTop);
      g.addColorStop(0.45, palette.bgMid);
      g.addColorStop(1, palette.bgBottom);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      const nebula1 = ctx.createRadialGradient(
        width * 0.72, height * 0.34, 0,
        width * 0.72, height * 0.34, width * 0.28
      );
      nebula1.addColorStop(0, palette.nebulaA);
      nebula1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.28, height * 0.65, 0,
        width * 0.28, height * 0.65, width * 0.32
      );
      nebula2.addColorStop(0, palette.nebulaB);
      nebula2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStars = (t: number) => {
      for (const star of stars) {
        const twinkle = 0.55 + Math.sin(t * star.speed + star.pulse) * 0.45;
        let color = palette.white;
        if (star.tint === "gold") color = palette.gold;
        if (star.tint === "blue") color = palette.blue;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * (0.85 + twinkle * 0.35), 0, Math.PI * 2);
        ctx.fillStyle = color.replace("0.95", `${(star.alpha * (0.45 + twinkle * 0.55)).toFixed(3)}`);
        ctx.shadowBlur = star.r * 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const drawHalo = (t: number) => {
      const cx = width * 0.5;
      const cy = height * 0.47;
      const rx = Math.min(width, height) * 0.23;
      const ry = rx * 0.6;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.sin(t * 0.12) * 0.08);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(90, 160, 255, 0.07)";
      ctx.lineWidth = 1.4;
      ctx.shadowBlur = 28;
      ctx.shadowColor = "rgba(59, 130, 246, 0.20)";
      ctx.stroke();
      ctx.restore();
      ctx.shadowBlur = 0;
    };

    const updateNodes = (t: number) => {
      nodes.forEach((node, i) => {
        const angle = t * node.drift + node.offset + i * 0.18;
        node.x = node.baseX + Math.cos(angle) * 9 * node.layer;
        node.y = node.baseY + Math.sin(angle * 1.2) * 7 * node.layer;
      });
    };

    const drawLinks = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 145) continue;

          const opacity = 1 - dist / 145;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2 - 8;
          ctx.quadraticCurveTo(mx, my, b.x, b.y);
          ctx.strokeStyle =
            opacity > 0.58
              ? `rgba(96, 165, 250, ${(0.18 * opacity).toFixed(3)})`
              : `rgba(59, 130, 246, ${(0.11 * opacity).toFixed(3)})`;
          ctx.lineWidth = opacity > 0.58 ? 1.05 : 0.75;
          ctx.stroke();
        }
      }
    };

    const drawNodes = (t: number) => {
      for (const node of nodes) {
        const pulse = 0.9 + Math.sin(t * 1.2 + node.offset) * 0.08;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 3.1, 0, Math.PI * 2);
        const outer = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.r * 3.1
        );
        outer.addColorStop(0, "rgba(96, 165, 250, 0.20)");
        outer.addColorStop(0.45, "rgba(59, 130, 246, 0.09)");
        outer.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = outer;
        ctx.fill();

        const inner = ctx.createRadialGradient(
          node.x - node.r * 0.2, node.y - node.r * 0.2, 0,
          node.x, node.y, node.r * 1.35
        );
        inner.addColorStop(0, "rgba(255,255,255,0.95)");
        inner.addColorStop(0.22, "rgba(191, 219, 254, 0.95)");
        inner.addColorStop(0.65, `hsla(${node.hue}, 85%, 72%, 0.92)`);
        inner.addColorStop(1, `hsla(${node.hue}, 85%, 60%, 0.18)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = inner;
        ctx.shadowBlur = node.r * 10;
        ctx.shadowColor = "rgba(59, 130, 246, 0.40)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const render = (time: number) => {
      const t = time * 0.001;
      drawBackground();
      drawStars(t);
      drawHalo(t);
      updateNodes(t);
      drawLinks();
      drawNodes(t);
      animationId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
