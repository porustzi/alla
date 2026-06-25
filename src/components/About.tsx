import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import hero from '../../content/pages/hero.json';
import aboutSection from '../../content/pages/about.json';
import achievementsList from '../../content/achievements/achievements.json';
import { iconMap } from '../content/iconMap';

const profile = hero.profile;
const fieldMap: Record<string, string> = {
  education: profile.education,
  experience: profile.experience,
  language_level: profile.language_level,
  category: profile.category,
};

export default function About() {
  const { title, details, achievementsTitle } = aboutSection;
  const achievements = achievementsList;

  return (
    <section id="about" className="py-16 sm:py-24 bg-uk-light/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-uk-navy mb-3 sm:mb-4">{title}</h2>
          <div className="w-12 sm:w-16 h-1 bg-uk-red rounded-full mb-8 sm:mb-12" />

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-16">
            {details.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Award;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-uk-sky/10"
                >
                  <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-uk-navy/5 flex items-center justify-center">
                    <IconComponent size={20} className="text-uk-red" aria-hidden={true} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-uk-navy mb-0.5 sm:mb-1 text-sm sm:text-base">{item.label}</h3>
                    <p className="text-uk-steel text-xs sm:text-sm whitespace-pre-line">{fieldMap[item.field]}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-uk-navy mb-4 sm:mb-6">{achievementsTitle}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.list.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Award;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-uk-sky/10 hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-uk-red/5 flex items-center justify-center mb-3 sm:mb-4">
                    <IconComponent size={20} className="text-uk-red" aria-hidden={true} />
                  </div>
                  <h4 className="font-semibold text-uk-navy mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h4>
                  <p className="text-uk-steel text-xs sm:text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
