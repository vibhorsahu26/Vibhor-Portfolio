import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Academics', 'academics'],
  ['Projects', 'projects'],
  ['Skills', 'skills'],
  ['Journey', 'journey'],
  ['Contact', 'contact'],
];

function Mark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-[18px] w-[18px] animate-[spin_12s_linear_infinite]">
      <path d="M16 1 19 13 31 16 19 19 16 31 13 19 1 16 13 13Z" fill="#B78AFF" />
    </svg>
  );
}

export default function Navbar({ activeSection, scrolled, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const clickLink = (event, id) => {
    setMenuOpen(false);
    onNavigate(event, id);
  };

  return (
    <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Main navigation">
      <a className="brand flex shrink-0 items-center gap-2.5" href="#home" onClick={(event) => clickLink(event, 'home')} aria-label="Vibhor — home">
        <Mark />
        <span>VIBHOR</span>
      </a>
      <div id="mobile-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        {links.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? 'is-active' : ''}
            onClick={(event) => clickLink(event, id)}
          >
            {label}
          </a>
        ))}
      </div>
      <button
        className="nav-mobile-toggle"
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
        <span>{menuOpen ? 'Close' : 'Menu'}</span>
      </button>
    </nav>
  );
}
