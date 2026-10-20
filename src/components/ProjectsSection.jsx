import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, ExternalLink, Github, X } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import ProjectArt from './ProjectArt.jsx';
import { projects } from '../data.js';

function ProjectModal({ project, index, onClose, lenisRef }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenisRef.current?.stop();
    closeButtonRef.current?.focus();
    const keyHandler = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.body.style.overflow = bodyOverflow;
      lenisRef.current?.start();
      document.removeEventListener('keydown', keyHandler);
      previouslyFocused?.focus?.();
    };
  }, [onClose, lenisRef]);

  return (
    <motion.div
      className="project-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <motion.section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        style={{ '--project-color': project.color }}
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <button ref={closeButtonRef} className="modal-close" type="button" onClick={onClose} aria-label="Close project details"><X size={19} /></button>
        <div className="modal-art"><ProjectArt index={index} color={project.color} src={project.thumbnail} alt={`${project.title} project screenshot`} className="modal-project-art" artId={`modal-${index}`} /></div>
        <div className="modal-content">
          <small className="modal-status">{project.status.toUpperCase()}</small>
          <h3 id="project-modal-title">{project.title}</h3>
          <p className="modal-category">{project.category}</p>
          <h4>Problem</h4>
          <p>{project.problem}</p>
          <h4>What it does</h4>
          <p>{project.solution}</p>
          <h4>Features</h4>
          <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          {project.note ? <><h4>{project.noteTitle}</h4><p className="project-note">{project.note}</p></> : null}
          <h4>Stack</h4>
          <div className="project-tags modal-tags">{project.fullStack.map((technology) => <span key={technology}>{technology}</span>)}</div>
          <div className="modal-actions">
            {project.live ? <a className="button button-primary button-small" href={project.live} target="_blank" rel="noopener noreferrer">Live Demo <ExternalLink size={14} /></a> : null}
            {project.source ? <a className="button button-small" href={project.source} target="_blank" rel="noopener noreferrer"><Github size={15} /> Source Code <ArrowUpRight size={14} /></a> : null}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default function ProjectsSection({ lenisRef }) {
  const [activeProject, setActiveProject] = useState(null);
  const closeModal = useCallback(() => setActiveProject(null), []);

  return (
    <section className="section-shell projects-section" id="projects">
      <SectionHeading
        number="03"
        label="Selected work"
        title="Six projects,"
        emphasis="seven small universes"
        description="Each project has its own world. Open Details for the problem, features, and honest status."
      />
      <ol className="projects-grid">
        {projects.map((project, index) => (
          <motion.li
            className="project-grid-item"
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.article
              className="project-card"
              style={{ '--project-color': project.color }}
              whileHover={{ y: -5, rotateX: -0.5 }}
              onPointerMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty('--mx', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
                event.currentTarget.style.setProperty('--my', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
              }}
              transition={{ duration: 0.28 }}
            >
              <div className="project-card-art">
                <span className="project-number">0{index + 1}</span>
                <span className="project-status"><i />{project.status.toUpperCase()}</span>
                <ProjectArt index={index} color={project.color} src={project.thumbnail} alt={`${project.title} project screenshot`} artId={`card-${index}`} />
              </div>
              <div className="project-card-content">
                <small className="project-category">{project.category}</small>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                <div className="project-card-actions">
                  {project.live ? <a className="button button-primary button-small" href={project.live} target="_blank" rel="noopener noreferrer">Live Demo <ArrowUpRight size={14} /></a> : null}
                  {project.source ? <a className="button button-small source-button" href={project.source} target="_blank" rel="noopener noreferrer">Source <Github size={14} /></a> : null}
                  <button className="button button-small details-button" onClick={() => setActiveProject(index)} type="button">Details <ArrowDownRight size={15} /></button>
                </div>
              </div>
            </motion.article>
          </motion.li>
        ))}
      </ol>
      <AnimatePresence>
        {activeProject !== null ? (
          <ProjectModal
            key={projects[activeProject].title}
            project={projects[activeProject]}
            index={activeProject}
            onClose={closeModal}
            lenisRef={lenisRef}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
