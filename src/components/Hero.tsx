import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import profile from '../content/about/profile.json';
import hero from '../content/sections/hero.json';

export default function Hero() {
  const { badge, primaryButton, secondaryButton } = hero;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-uk-navy/5 via-white to-uk-red/5 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-uk-navy/5 text-uk-steel text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-uk-red animate-pulse" />
            {badge}
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-uk-navy leading-tight mb-6">
            {profile.name}
          </h1>
          <p className="text-xl sm:text-2xl text-uk-steel font-light mb-4">
            {profile.title}
          </p>
          <p className="max-w-2xl mx-auto text-lg text-uk-steel/80 italic leading-relaxed mb-10">
            &ldquo;{profile.credo}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-uk-navy text-white rounded-lg hover:bg-uk-navy/90 transition-colors font-medium"
            >
              {primaryButton}
              <ArrowDown size={18} aria-hidden={true} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-uk-navy/20 text-uk-navy rounded-lg hover:border-uk-navy/40 transition-colors font-medium"
            >
              {secondaryButton}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
