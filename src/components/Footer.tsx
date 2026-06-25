import general from '../../content/pages/general.json';
import heroData from '../../content/pages/hero.json';

const { footer, navbar } = general;
const { profile } = heroData;

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-uk-navy text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-uk-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">P</span>
              </div>
              <span className="font-semibold text-white text-sm">{footer.logo}</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              {profile.name} — {profile.title}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Навігація
            </h4>
            <ul className="space-y-1.5">
              {navbar.links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-white/50 hover:text-uk-red transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Контакти
            </h4>
            <p className="text-sm text-white/50">{profile.name}</p>
            <p className="text-sm text-white/50">{profile.title}</p>
            <p className="text-sm text-white/50 mt-2">{profile.language_level} | {profile.category} категорія</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {footer.rights}
          </p>
          <p className="text-xs text-white/30">{profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
