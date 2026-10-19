import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CursorFX() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reducedMotion || !finePointer) return undefined;

    document.body.classList.add('has-fine-pointer');
    const dot = dotRef.current;
    const ring = ringRef.current;
    const spot = spotRef.current;
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.38, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.38, ease: 'power3.out' });
    const spotX = gsap.quickTo(spot, 'x', { duration: 0.85, ease: 'power2.out' });
    const spotY = gsap.quickTo(spot, 'y', { duration: 0.85, ease: 'power2.out' });

    const move = (event) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      spotX(event.clientX);
      spotY(event.clientY);
    };
    const hover = (event) => {
      ring.classList.toggle('is-hovering', Boolean(event.target.closest('a, button, [role="button"]')));
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', hover);
    return () => {
      document.body.classList.remove('has-fine-pointer');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', hover);
    };
  }, []);

  return (
    <>
      <div ref={spotRef} className="cursor-spot" aria-hidden="true" />
      <div className="custom-cursor" aria-hidden="true">
        <span ref={ringRef} className="cursor-ring" />
        <span ref={dotRef} className="cursor-dot" />
      </div>
    </>
  );
}
