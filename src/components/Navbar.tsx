import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import general from '../../content/pages/general.json';

const { navbar } = general;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-sm transition-colors ${
              isScrolled ? 'bg-uk-navy' : 'bg-uk-navy/90'
            }`}>
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className={`font-semibold text-sm transition-colors ${
              isScrolled ? 'text-uk-navy' : 'text-uk-navy/80'
            }`}>
              {navbar.logo}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navbar.links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isScrolled
                    ? 'text-uk-steel hover:text-uk-red hover:bg-uk-red/5'
                    : 'text-uk-navy/70 hover:text-uk-red'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-uk-navy hover:bg-uk-navy/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={navbar.menuLabel}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] bg-white z-40 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navbar.links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-uk-navy hover:bg-uk-navy/5 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
