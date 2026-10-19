import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { SITE } from '../data.js';
import { gsap } from 'gsap';

function WordLine({ text, accent = false }) {
  return (
    <span className={`hero-title-line ${accent ? 'hero-title-accent' : ''}`}>
      {Array.from(text).map((letter, index) => (
        <span className="hero-letter" key={`${letter}-${index}`}>
          <i>{letter}</i>
        </span>
      ))}
    </span>
  );
}

function Character() {
  const avatarRef = useRef(null);
  const headRef = useRef(null);
  const eyesRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !avatarRef.current) return undefined;

    const head = headRef.current;
    const rotateY = gsap.quickTo(head, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const rotateX = gsap.quickTo(head, 'rotationX', { duration: 0.6, ease: 'power3.out' });

    const look = (event) => {
      const bounds = avatarRef.current.getBoundingClientRect();
      const nx = gsap.utils.clamp(-1, 1, (event.clientX - (bounds.left + bounds.width / 2)) / (window.innerWidth * 0.5));
      const ny = gsap.utils.clamp(-1, 1, (event.clientY - (bounds.top + bounds.height * 0.3)) / (window.innerHeight * 0.5));
      rotateY(nx * 26);
      rotateX(-ny * 16);
    };

    const blink = () => {
      gsap.to(eyesRef.current, {
        scaleY: 0.08,
        transformOrigin: '50% 50%',
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        delay: 2 + Math.random() * 3,
        onComplete: blink,
      });
    };

    blink();
    window.addEventListener('pointermove', look, { passive: true });
    const tap = () => gsap.fromTo(head, { y: 0 }, { y: 14, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' });
    avatarRef.current.addEventListener('pointerdown', tap);

    return () => {
      window.removeEventListener('pointermove', look);
      avatarRef.current?.removeEventListener('pointerdown', tap);
      gsap.killTweensOf(eyesRef.current);
      gsap.killTweensOf(head);
    };
  }, []);

  return (
    <div className="hero-stage" id="hero-stage">
      <div className="hero-halo" />
      <div className="hero-ring" />
      <div className="hero-ring hero-ring-dashed" />
      <div className="avatar-wrap" ref={avatarRef} id="hero-avatar">
        <div className="avatar-body">
          <svg viewBox="0 0 400 260" aria-hidden="true" style={{ transform: 'translateZ(-12px)' }}>
            <rect x="168" y="0" width="64" height="90" rx="10" fill="#9b6745" />
            <path d="M0 260V205Q8 125 110 98L170 70H230L290 98Q392 125 400 205V260Z" fill="#7f9d90" />
            <path d="M108 99 150 84 160 260H80Q78 150 108 99ZM292 99 250 84 240 260H320Q322 150 292 99Z" fill="#e9ecee" />
            <path d="M165 66 200 112 235 66 252 82 200 130 148 82Z" fill="#6d8a7d" />
            <path d="M200 112V190" stroke="#e9ecee" strokeWidth="5" />
          </svg>
        </div>
        <div className="avatar-head" ref={headRef}>
          <svg viewBox="0 0 260 300" aria-hidden="true" style={{ transform: 'translateZ(-34px)' }}>
            <ellipse cx="130" cy="112" rx="102" ry="98" fill="#120d18" />
          </svg>
          <svg viewBox="0 0 260 300" aria-hidden="true" style={{ transform: 'translateZ(-8px)' }}>
            <ellipse cx="38" cy="160" rx="15" ry="24" fill="#a9724e" />
            <ellipse cx="222" cy="160" rx="15" ry="24" fill="#a9724e" />
          </svg>
          <svg className="avatar-rim" viewBox="0 0 260 300" aria-hidden="true">
            <defs>
              <radialGradient id="faceGradient" cx="35%" cy="40%" r="75%">
                <stop offset="0" stopColor="#d49a70" />
                <stop offset=".7" stopColor="#b9805a" />
                <stop offset="1" stopColor="#8a5a3c" />
              </radialGradient>
            </defs>
            <path d="M48 118Q48 56 130 52Q212 56 212 118V172Q206 256 130 268Q54 256 48 172Z" fill="url(#faceGradient)" />
          </svg>
          <svg viewBox="0 0 260 300" aria-hidden="true" style={{ transform: 'translateZ(14px)' }}>
            <path d="M130 160 122 196Q130 202 138 196" fill="none" stroke="#8a5a3c" strokeWidth="3" strokeLinecap="round" opacity=".7" />
            <path d="M104 228Q130 244 156 228" fill="none" stroke="#5a3322" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M76 124Q96 114 116 123M144 123Q164 114 184 124" fill="none" stroke="#120d18" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 260 300" aria-hidden="true" style={{ transform: 'translateZ(18px)' }}>
            <g ref={eyesRef}>
              <ellipse cx="95" cy="150" rx="18" ry="12" fill="#f1e8e0" />
              <ellipse cx="165" cy="150" rx="18" ry="12" fill="#f1e8e0" />
              <circle className="avatar-pupil" cx="95" cy="150" r="10" fill="#1a0f0c" />
              <circle className="avatar-pupil" cx="165" cy="150" r="10" fill="#1a0f0c" />
            </g>
          </svg>
          <svg viewBox="0 0 260 300" aria-hidden="true" style={{ transform: 'translateZ(34px)' }}>
            <g fill="rgba(150,91,255,.1)" stroke="#0a0a0f" strokeWidth="4.5">
              <rect x="62" y="130" width="64" height="42" rx="15" />
              <rect x="134" y="130" width="64" height="42" rx="15" />
            </g>
            <path d="M126 146Q130 142 134 146M62 144 40 140M198 144 220 140" stroke="#0a0a0f" strokeWidth="4" fill="none" />
            <path d="M72 138 92 134" stroke="#76E7F5" strokeWidth="2.5" strokeLinecap="round" opacity=".8" />
          </svg>
          <svg className="avatar-rim avatar-hair" viewBox="0 0 260 300" aria-hidden="true">
            <g fill="#17121c">
              <circle cx="52" cy="88" r="26" /><circle cx="84" cy="60" r="29" /><circle cx="122" cy="48" r="31" />
              <circle cx="160" cy="52" r="29" /><circle cx="198" cy="68" r="28" /><circle cx="214" cy="104" r="20" />
              <circle cx="46" cy="120" r="17" /><circle cx="100" cy="82" r="22" /><circle cx="150" cy="80" r="23" />
              <circle cx="184" cy="96" r="18" /><circle cx="68" cy="100" r="16" />
            </g>
          </svg>
        </div>
      </div>
      <span className="avatar-coordinate avatar-coordinate-top">28.6139° N · 77.2090° E</span>
      <span className="avatar-coordinate avatar-coordinate-bottom">◼ ELEV. 01 / DARK MATTER</span>
      <span className="avatar-hint">Move your cursor — he’s watching</span>
    </div>
  );
}

export default function Hero() {
  const titleRef = useRef(null);
  const sparksRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const sparkleLayer = sparksRef.current;
    if (!title || !sparkleLayer) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reducedMotion) return undefined;

    const letters = Array.from(title.querySelectorAll('.hero-letter'));
    const glyphs = Array.from(title.querySelectorAll('.hero-letter i'));
    const colors = ['#DCC5FF', '#76E7F5', '#B78AFF', '#fff'];
    let lastSpark = 0;
    let shimmer;

    const moveOverTitle = (event) => {
      if (finePointer) {
        letters.forEach((letter, index) => {
          const box = letter.getBoundingClientRect();
          const dx = event.clientX - (box.left + box.width / 2);
          const dy = event.clientY - (box.top + box.height / 2);
          const heat = Math.max(0, 1 - Math.hypot(dx, dy) / (box.width * 2.2));
          gsap.to(letter, {
            y: -heat * 30,
            scale: 1 + heat * 0.3,
            rotation: heat * (dx > 0 ? -8 : 8),
            duration: 0.45,
            ease: 'power3.out',
            overwrite: 'auto',
          });
          gsap.to(glyphs[index], { '--g': heat, duration: 0.45, overwrite: 'auto' });
        });
      }

      const now = performance.now();
      if (now - lastSpark > 45) {
        lastSpark = now;
        const bounds = sparkleLayer.getBoundingClientRect();
        const size = gsap.utils.random(6, 15);
        const spark = document.createElement('span');
        spark.className = 'hero-spark';
        spark.style.left = `${event.clientX - bounds.left + gsap.utils.random(-16, 16)}px`;
        spark.style.top = `${event.clientY - bounds.top + gsap.utils.random(-16, 16)}px`;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.margin = `${-size / 2}px 0 0 ${-size / 2}px`;
        spark.style.background = gsap.utils.random(colors);
        sparkleLayer.appendChild(spark);
        gsap.timeline({ onComplete: () => spark.remove() })
          .fromTo(spark, { scale: 0, rotation: 0 }, {
            scale: 1,
            rotation: gsap.utils.random(-120, 120),
            duration: 0.25,
            ease: 'back.out(3)',
          })
          .to(spark, {
            x: gsap.utils.random(-40, 40),
            y: gsap.utils.random(-120, -40),
            scale: 0,
            opacity: 0,
            duration: gsap.utils.random(0.8, 1.4),
            ease: 'power1.out',
          }, '<0.1');
      }
    };

    const leaveTitle = () => {
      letters.forEach((letter) => {
        gsap.to(letter, { y: 0, scale: 1, rotation: 0, duration: 1.3, ease: 'elastic.out(1,.4)', overwrite: 'auto' });
      });
      gsap.to(glyphs, { '--g': 0, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
    };

    title.addEventListener('pointermove', moveOverTitle);
    title.addEventListener('pointerleave', leaveTitle);

    if (finePointer) {
      shimmer = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 7 })
        .to(letters, { '--w': 1, y: -10, duration: 0.35, stagger: 0.07, ease: 'sine.out' })
        .to(letters, { '--w': 0, y: 0, duration: 0.6, stagger: 0.07, ease: 'sine.inOut' }, 0.3);
    }

    return () => {
      title.removeEventListener('pointermove', moveOverTitle);
      title.removeEventListener('pointerleave', leaveTitle);
      gsap.killTweensOf(letters);
      gsap.killTweensOf(glyphs);
      shimmer?.kill();
    };
  }, []);

  return (
    <section className="hero-shell" id="home">
      <div className="hero-copy">
        <div ref={sparksRef} className="hero-spark-layer" aria-hidden="true" />
        <p className="hero-eyebrow">SOFTWARE DEVELOPER · CS STUDENT</p>
        <h1 className="hero-title" ref={titleRef} aria-label="Vibhor Sahu">
          <WordLine text="VIBHOR" />
          <WordLine text="SAHU" accent />
        </h1>
        <p className="hero-description">
          I build digital experiences and <em>explore the engineering behind them.</em>
        </p>
        <div className="hero-actions flex flex-wrap items-center gap-3">
          <motion.a className="button button-primary magnetic-button" href="#projects" whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.98 }}>
            Explore My Work <ArrowUpRight size={16} />
          </motion.a>
          <motion.a className="button magnetic-button" href="#contact" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            Let’s Connect
          </motion.a>
        </div>
        <div className="social-links flex items-center gap-2.5">
          <motion.a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" whileHover={{ y: -4, scale: 1.05 }}>
            <Github size={19} />
          </motion.a>
          <motion.a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" whileHover={{ y: -4, scale: 1.05 }}>
            <Linkedin size={19} />
          </motion.a>
        </div>
      </div>
      <Character />
      <div className="hero-scroll-cue"><span />SCROLL</div>
    </section>
  );
}
