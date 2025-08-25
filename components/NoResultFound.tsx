"use client";
import { SearchX } from "lucide-react";
import { useEffect, useRef } from "react";

export default function NoResultFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas();
    const wave = {
      y: canvas.height / 2,
      length: 0.01,
      amplitude: 20,
      speed: 0.05,
    };
    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"; 
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = wave.y + Math.sin(x * wave.length + time) * wave.amplitude;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      time += wave.speed;
      requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);
  return (
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-[200px] grid place-content-center"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ pointerEvents: "none" }}
        />
        <div className="relative z-10 text-center space-y-3">
          <SearchX className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
          <p className="text-sm font-medium text-gray-600">No Results Found</p>
          <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
        </div>
      </div>
  );
}