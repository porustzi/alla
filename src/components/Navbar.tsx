import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import site from '../content/site.json';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { logo, links, menuLabel } = site.navbar;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-uk-sky/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href={`#${links[0].id}`} className="text-xl font-bold text-uk-navy tracking-tight">
            {logo}<span className="text-uk-red">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm font-medium text-uk-steel hover:text-uk-navy transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden p-2 text-uk-navy"
            onClick={() => setOpen(!open)}
            aria-label={menuLabel}
          >
            {open ? <X size={24} aria-hidden={true} /> : <Menu size={24} aria-hidden={true} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-b border-uk-sky/20">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="block text-sm font-medium text-uk-steel hover:text-uk-navy transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
