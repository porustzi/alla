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

        <div className="flex justify-center mt-6 mb-4 px-4">
          <div className="relative overflow-hidden rounded-full md:rounded-full rounded-xl w-full md:w-auto max-w-xs md:max-w-none mx-auto px-5 py-3 md:py-2.5 bg-white shadow-lg">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-4 -right-3 w-16 h-16 bg-rose-300/50 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-3 w-12 h-12 bg-rose-400/40 rounded-full blur-lg" />
              <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-rose-200/30 rounded-full blur-md" />
            </div>
            <a
              href="https://krvtsv.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block text-center text-rose-600 font-bold text-[11px] md:text-[10px] uppercase tracking-widest whitespace-nowrap hover:text-rose-500 hover:scale-105 transition-all duration-200"
            >
              KRVTSV CORP
            </a>
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
