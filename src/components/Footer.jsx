import { Github, Linkedin } from 'lucide-react';
import { SITE } from '../data.js';

export default function Footer({ onNavigate }) {
  const navigate = (event, id) => onNavigate(event, id);
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Vibhor Sahu</span>
      <nav aria-label="Footer navigation">
        <a href="#about" onClick={(event) => navigate(event, 'about')}>About</a>
        <a href="#projects" onClick={(event) => navigate(event, 'projects')}>Projects</a>
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={15} /></a>
        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a>
      </nav>
      <em>Made in the dark, for the light.</em>
    </footer>
  );
}
