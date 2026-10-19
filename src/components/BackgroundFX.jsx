import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BackgroundFX() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let mouseX = -1000;
    let mouseY = -1000;
    let visible = !document.hidden;
    let particles = [];

    const makeParticles = () => {
      const count = width < 700 ? 36 : 80;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.35 + 0.35,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    };

    const moveMouse = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const visibilityChange = () => {
      visible = !document.hidden;
    };

    const draw = () => {
      if (!visible) return;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.hypot(dx, dy);
        if (distance < 150 && distance > 0) {
          const force = (150 - distance) / 150;
          particle.x += (dx / distance) * force * 1.6;
          particle.y += (dy / distance) * force * 1.6;
        }
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -5) particle.x = width + 5;
        if (particle.x > width + 5) particle.x = -5;
        if (particle.y < -5) particle.y = height + 5;
        if (particle.y > height + 5) particle.y = -5;

        const glow = distance < 150 ? Math.max(0, 1 - distance / 150) : 0;
        context.beginPath();
        context.fillStyle = `rgba(183, 138, 255, ${0.26 + glow * 0.5})`;
        context.shadowBlur = glow ? 12 : 0;
        context.shadowColor = '#965BFF';
        context.arc(particle.x, particle.y, particle.radius + glow * 0.6, 0, Math.PI * 2);
        context.fill();
      });
      context.shadowBlur = 0;
    };

    resize();
    gsap.ticker.add(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', moveMouse, { passive: true });
    document.addEventListener('visibilitychange', visibilityChange);

    return () => {
      gsap.ticker.remove(draw);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', moveMouse);
      document.removeEventListener('visibilitychange', visibilityChange);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="background-particles" aria-hidden="true" />
      <div className="background-grain" aria-hidden="true" />
    </>
  );
}
