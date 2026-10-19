import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';

const chips = ['Web development', 'Backend', 'C++ & DSA', 'Open source', 'Hackathons'];

export default function AboutSection() {
  return (
    <section className="section-shell" id="about">
      <div className="about-grid">
        <div>
          <SectionHeading number="01" label="About" title="The person" emphasis="behind" />
          <p className="section-lead about-paragraph" data-scroll-reveal>
            I’m a computer science student interested in building meaningful software, exploring new technologies, and turning ideas into working products.
          </p>
          <p className="section-lead about-paragraph" data-scroll-reveal>
            My work spans React and JavaScript on the front end, Node.js, MongoDB, and Python on the back end, and C++ with data structures and algorithms for problem-solving. I enjoy practical projects, hackathons, and open source.
          </p>
          <div className="about-chips" data-scroll-reveal>
            {chips.map((chip) => <span key={chip}>{chip}</span>)}
          </div>
        </div>
        <motion.div
          className="portrait-wrap"
          data-scroll-reveal
          initial={{ opacity: 0, y: 28, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="portrait-frame">
            <img src="/portrait.jpg" alt="Portrait of Vibhor Sahu" width="380" height="483" loading="lazy" />
          </div>
          <div className="portrait-tag">
            <span>VIBHOR SAHU</span>
            <small>Software Developer · CS Student</small>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
