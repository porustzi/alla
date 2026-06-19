import site from '../content/site.json';

export default function Footer() {
  const { logo, rights } = site.footer;

  return (
    <footer className="bg-uk-navy text-uk-light py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-uk-sky">
            {logo}<span className="text-uk-red">.</span>
          </p>
          <p className="text-sm text-uk-sky/60">
            &copy; {new Date().getFullYear()} — {rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
