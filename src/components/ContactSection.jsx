import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { SITE } from '../data.js';

export function ProfilesSection() {
  return (
    <section className="section-shell" id="profiles">
      <SectionHeading number="06" label="Milestones & profiles" title="Proof," emphasis="in public" />
      <div className="milestones-grid">
        <motion.div className="milestone-card" data-scroll-reveal whileHover={{ y: -5 }}>
          <b>3</b><span>projects deployed live on Vercel — UdyamSetu, GramMausam, JanSaadhan.</span><small>PROJECT MILESTONE</small>
        </motion.div>
        <motion.div className="milestone-card" data-scroll-reveal whileHover={{ y: -5 }}>
          <b>5</b><span>projects built and showcased, including prototypes still in development.</span><small>PROJECTS</small>
        </motion.div>
        <motion.a className="milestone-card" data-scroll-reveal href={SITE.github} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }}>
          <b>GH <ArrowUpRight size={24} /></b><span>Source code, experiments, and open-source work.</span><small>GITHUB</small>
        </motion.a>
        <motion.a className="milestone-card" data-scroll-reveal href={SITE.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }}>
          <b>in <ArrowUpRight size={24} /></b><span>Professional profile and background.</span><small>LINKEDIN</small>
        </motion.a>
      </div>
    </section>
  );
}

export default function ContactSection() {
  return (
    <section className="section-shell contact-section" id="contact">
      <div className="contact-orb" aria-hidden="true" />
      <SectionHeading number="07" label="Contact" title="Have something" emphasis="interesting" description="Let’s build something meaningful." />
      <div className="contact-actions" data-scroll-reveal>
        <motion.a className="button button-primary magnetic-button" href={SITE.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.02 }}>
          <Linkedin size={16} /> Message on LinkedIn <ArrowUpRight size={15} />
        </motion.a>
        <motion.a className="button magnetic-button" href={SITE.github} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.02 }}>
          <Github size={16} /> GitHub <ArrowUpRight size={15} />
        </motion.a>
      </div>
    </section>
  );
}
