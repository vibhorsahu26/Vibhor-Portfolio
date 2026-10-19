import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SectionHeading from './SectionHeading.jsx';
import { skills } from '../data.js';

const orbitSettings = [
  { radius: 0.28, tilt: 0.22, speed: 0.56 },
  { radius: 0.47, tilt: -0.15, speed: 0.36 },
  { radius: 0.66, tilt: 0.1, speed: 0.26 },
  { radius: 0.82, tilt: -0.22, speed: 0.18 },
];

export default function SkillsSection() {
  const systemRef = useRef(null);
  const svgRef = useRef(null);
  const nodeRefs = useRef({});
  const orbitPathsRef = useRef([]);
  const hoveredGroupRef = useRef(-1);
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    const system = systemRef.current;
    const svg = svgRef.current;
    if (!system || !svg) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 1;
    let height = 1;
    let half = 1;
    let yaw = 0;
    let pitch = 1.05;
    let targetYaw = 0;
    let targetPitch = 1.05;
    let spinAmount = reducedMotion ? 0 : 1;
    let pointerActive = false;
    const angles = {};
    skills.forEach((group, groupIndex) => {
      group.items.forEach((item, itemIndex) => {
        angles[`${groupIndex}-${itemIndex}`] = itemIndex / group.items.length * Math.PI * 2 + groupIndex * 0.6;
      });
    });

    const resize = () => {
      width = system.clientWidth;
      height = system.clientHeight;
      half = Math.min(width, height) / 2;
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    };

    const pointerMove = (event) => {
      if (reducedMotion) return;
      const bounds = system.getBoundingClientRect();
      targetYaw = ((event.clientX - bounds.left) / bounds.width - 0.5) * 1.1;
      targetPitch = 1.05 - ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.55;
      pointerActive = true;
    };

    const pointerLeave = () => { pointerActive = false; };
    const observer = new ResizeObserver(resize);
    observer.observe(system);
    resize();

    const projectPoint = (radius, tilt, angle) => {
      let x = radius * Math.cos(angle);
      let z = radius * Math.sin(angle);
      const y = x * Math.sin(tilt);
      x *= Math.cos(tilt);
      const rotatedX = x * Math.cos(yaw) + z * Math.sin(yaw);
      const rotatedZ = -x * Math.sin(yaw) + z * Math.cos(yaw);
      const rotatedY = y * Math.cos(pitch) - rotatedZ * Math.sin(pitch);
      const depth = y * Math.sin(pitch) + rotatedZ * Math.cos(pitch);
      const perspective = half * 3;
      const scale = perspective / (perspective + depth);
      return [width / 2 + rotatedX * scale, height / 2 + rotatedY * scale, scale, depth];
    };

    const tick = (time, deltaTime) => {
      const delta = Math.min(deltaTime, 50) / 1000;
      if (!reducedMotion) {
        if (!pointerActive) {
          targetYaw = Math.sin(time * 0.3) * 0.3;
          targetPitch = 1.05 + Math.sin(time * 0.2) * 0.08;
        }
        yaw += (targetYaw - yaw) * Math.min(1, delta * 4);
        pitch += (targetPitch - pitch) * Math.min(1, delta * 4);
        const targetSpin = hoveredGroupRef.current < 0 ? 1 : 0;
        spinAmount += (targetSpin - spinAmount) * Math.min(1, delta * 6);
      }

      orbitSettings.forEach((orbit, groupIndex) => {
        let path = '';
        for (let step = 0; step <= 64; step += 1) {
          const point = projectPoint(orbit.radius * half, orbit.tilt, step / 64 * Math.PI * 2);
          path += `${step === 0 ? 'M' : 'L'}${point[0].toFixed(1)} ${point[1].toFixed(1)} `;
        }
        const pathNode = orbitPathsRef.current[groupIndex];
        if (pathNode) {
          pathNode.setAttribute('d', path);
          pathNode.setAttribute('stroke-opacity', hoveredGroupRef.current === groupIndex ? '0.9' : '0.3');
        }

        skills[groupIndex].items.forEach((item, itemIndex) => {
          const key = `${groupIndex}-${itemIndex}`;
          const node = nodeRefs.current[key];
          if (!node) return;
          angles[key] += orbit.speed * delta * spinAmount;
          const point = projectPoint(orbit.radius * half, orbit.tilt, angles[key]);
          const size = Math.round(half * (0.09 + (itemIndex % 3) * 0.012));
          node.style.width = `${size}px`;
          node.style.height = `${size}px`;
          node.style.transform = `translate(${(point[0] - size / 2).toFixed(1)}px, ${(point[1] - size / 2).toFixed(1)}px) scale(${point[2].toFixed(3)})`;
          node.style.zIndex = String(50 - Math.round(point[3] / Math.max(half, 1) * 40));
          node.style.opacity = String(0.72 + 0.28 * Math.max(-1, Math.min(1, -point[3] / Math.max(half, 1))));
        });
      });
    };

    system.addEventListener('pointermove', pointerMove, { passive: true });
    system.addEventListener('pointerleave', pointerLeave);
    gsap.ticker.add(tick);

    return () => {
      observer.disconnect();
      system.removeEventListener('pointermove', pointerMove);
      system.removeEventListener('pointerleave', pointerLeave);
      gsap.ticker.remove(tick);
    };
  }, []);

  const activateSkill = (skillName, groupIndex) => {
    hoveredGroupRef.current = groupIndex;
    setActiveSkill({ name: skillName, group: skills[groupIndex].name });
  };
  const resetSkill = () => {
    hoveredGroupRef.current = -1;
    setActiveSkill(null);
  };

  return (
    <section className="section-shell" id="skills">
      <SectionHeading number="04" label="Stack" title="Technologies I" emphasis="work with" />
      <div className="skills-grid">
        <div className="skills-orbit-column" data-scroll-reveal>
          <div className="skills-orbit" ref={systemRef} role="group" aria-label="Interactive technology solar system">
            <svg className="orbit-svg" ref={svgRef} aria-hidden="true">
              {orbitSettings.map((orbit, index) => <path key={index} ref={(element) => { orbitPathsRef.current[index] = element; }} fill="none" stroke={skills[index].color} strokeWidth="1" strokeOpacity=".3" />)}
            </svg>
            <div className="orbit-sun" aria-hidden="true" />
            {skills.map((group, groupIndex) => group.items.map((skill, itemIndex) => {
              const key = `${groupIndex}-${itemIndex}`;
              const active = activeSkill?.name === skill;
              return (
                <button
                  type="button"
                  key={key}
                  ref={(element) => { nodeRefs.current[key] = element; }}
                  className={`orbit-planet ${active ? 'is-active' : ''}`}
                  style={{ '--skill-color': group.color }}
                  aria-label={`${skill}, ${group.name}`}
                  onPointerEnter={() => activateSkill(skill, groupIndex)}
                  onPointerLeave={resetSkill}
                  onFocus={() => activateSkill(skill, groupIndex)}
                  onBlur={resetSkill}
                  onClick={() => activateSkill(skill, groupIndex)}
                >
                  <span>{skill}</span>
                </button>
              );
            }))}
          </div>
          <p className="orbit-hint" aria-live="polite">{activeSkill ? `${activeSkill.name} — ${activeSkill.group}` : 'Hover or focus a planet'}</p>
        </div>
        <div className="skills-list" data-scroll-reveal>
          {skills.map((group, index) => (
            <div className="skill-group" key={group.name}>
              <h3 style={{ color: group.color }}>0{index + 1} / {group.name}</h3>
              <div className="skill-pills">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
          ))}
          <p className="skills-note">Based on the projects I have built. No made-up percentages.</p>
        </div>
      </div>
    </section>
  );
}
