import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import BackgroundFX from './components/BackgroundFX.jsx';
import CursorFX from './components/CursorFX.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import AboutSection from './components/AboutSection.jsx';
import { AcademicsSection, JourneySection } from './components/TimelineSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ContactSection, { ProfilesSection } from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

 gsap.registerPlugin(ScrollTrigger);

function StarMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 1 19 13 31 16 19 19 16 31 13 19 1 16 13 13Z" fill="#965BFF" />
    </svg>
  );
}

function Marquee() {
  const words = ['REACT', 'C++', 'NODE.JS', 'JAVASCRIPT', 'DSA', 'PYTHON'];
  return (
    <div className="marquee-shell" aria-hidden="true">
      <div className="marquee-track">
        {[...words, ...words].map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}
      </div>
    </div>
  );
}

export default function App() {
  const rootRef = useRef(null);
  const lenisRef = useRef(null);
  const [curtainVisible, setCurtainVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const onNavigate = useCallback((event, id) => {
    event?.preventDefault?.();
    const target = document.getElementById(id);
    if (!target) return;
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -10, duration: 1.25 });
    } else {
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis;
    let introTimeline;
    let cancelled = false;
    let scrollContext;

    if (!reducedMotion) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      lenis.__gsapRaf = raf;
    }

    const anchorHandler = (event) => {
      if (event.defaultPrevented) return;
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      if (window.location.hash !== href) window.history.pushState(null, '', href);
      if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: -10, duration: 1.25 });
      else target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    };

    const updateScrolled = () => setScrolled(window.scrollY > 40);
    document.addEventListener('click', anchorHandler);
    window.addEventListener('scroll', updateScrolled, { passive: true });
    updateScrolled();

    scrollContext = gsap.context(() => {
      if (!reducedMotion) {
        gsap.timeline({
          scrollTrigger: { trigger: '.hero-shell', start: 'top top', end: 'bottom top', scrub: 0.8 },
        })
          .to('.hero-stage', { scale: 0.62, x: '18%', yPercent: -8, opacity: 0.25, ease: 'none' }, 0)
          .to('.hero-copy', { y: -140, opacity: 0, ease: 'none' }, 0);

        gsap.to('.marquee-track', {
          xPercent: -45,
          ease: 'none',
          scrollTrigger: { trigger: '.marquee-shell', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        });

        gsap.utils.toArray('[data-scroll-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 38,
            opacity: 0,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          });
        });

        gsap.utils.toArray('.timeline').forEach((timeline) => {
          const line = timeline.querySelector('.timeline-progress');
          if (line) {
            gsap.to(line, {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: { trigger: timeline, start: 'top 60%', end: 'bottom 60%', scrub: 0.5 },
            });
          }
        });

        gsap.to('.portrait-frame img', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: '.portrait-frame', start: 'top bottom', end: 'bottom top', scrub: true },
        });

        gsap.timeline({
          scrollTrigger: { trigger: '.contact-section', start: 'top 70%', end: 'center center', scrub: true },
        }).fromTo('.contact-orb', { scale: 0.45, opacity: 0.4 }, { scale: 1, opacity: 1, ease: 'none' });
      } else {
        gsap.set('[data-scroll-reveal]', { clearProps: 'all' });
        gsap.set('.timeline-progress', { scaleY: 1 });
      }

      const navSections = gsap.utils.toArray('main > section[id]');
      navSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (trigger) => {
            if (!trigger.isActive) return;
            const sectionId = section.id === 'profiles' ? 'journey' : section.id;
            setActiveSection(sectionId);
          },
        });
      });

      if (!reducedMotion) {
        const firstTitleLine = gsap.utils.toArray('.hero-title-line:not(.hero-title-accent) .hero-letter');
        const accentTitleLine = gsap.utils.toArray('.hero-title-accent .hero-letter');
        introTimeline = gsap.timeline({
          defaults: { ease: 'power4.out' },
          paused: true,
          onComplete: () => {
            setCurtainVisible(false);
            gsap.set('.hero-title-line', { overflow: 'visible' });
            ScrollTrigger.refresh();
          },
        });
        introTimeline
          .to('.intro-curtain', { yPercent: -100, duration: 0.95, delay: 0.18, ease: 'power4.inOut' })
          .from('.hero-halo', { opacity: 0, scale: 0.4, duration: 2.1 }, '-=0.5')
          .from('.hero-ring', { opacity: 0, scale: 0.6, duration: 1.6, stagger: 0.2 }, '<')
          .from('.avatar-wrap', { opacity: 0, scale: 0.75, filter: 'brightness(0) blur(14px)', duration: 1.8 }, '-=1.8')
          .from('.hero-eyebrow', { opacity: 0, x: -30, duration: 0.8 }, '-=1.2')
          .from(firstTitleLine, { yPercent: 120, rotationX: -90, opacity: 0, stagger: 0.05, duration: 1 }, '-=0.9')
          .from(accentTitleLine, { yPercent: 120, rotationX: -90, opacity: 0, stagger: 0.06, duration: 1 }, '-=0.75')
          .from('.hero-description', { y: 24, opacity: 0, duration: 0.9 }, '-=0.5')
          .from('.hero-actions .button, .social-links a', { y: 24, opacity: 0, stagger: 0.08, duration: 0.8 }, '-=0.6')
          .from('.hero-scroll-cue, .avatar-coordinate, .avatar-hint', { opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.4');
      } else {
        setCurtainVisible(false);
      }
    }, root);

    const fontReady = document.fonts?.ready ?? Promise.resolve();
    Promise.resolve(fontReady).then(() => {
      if (!cancelled) {
        if (introTimeline) introTimeline.play(0);
        else setCurtainVisible(false);
      }
    });

    const refreshOnLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshOnLoad);

    return () => {
      cancelled = true;
      document.removeEventListener('click', anchorHandler);
      window.removeEventListener('scroll', updateScrolled);
      window.removeEventListener('load', refreshOnLoad);
      introTimeline?.kill();
      scrollContext?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (lenis) {
        gsap.ticker.remove(lenis.__gsapRaf);
        lenis.destroy();
      }
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="app-shell" ref={rootRef}>
      <BackgroundFX />
      <CursorFX />
      {curtainVisible ? (
        <div className="intro-curtain" aria-label="Loading portfolio">
          <div className="intro-content"><StarMark /><p>DARK MATTER</p></div>
        </div>
      ) : null}
      <Navbar activeSection={activeSection} scrolled={scrolled} onNavigate={onNavigate} />
      <main className="relative z-[3]">
        <Hero />
        <Marquee />
        <AboutSection />
        <AcademicsSection />
        <ProjectsSection lenisRef={lenisRef} />
        <SkillsSection />
        <JourneySection />
        <ProfilesSection />
        <ContactSection />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
