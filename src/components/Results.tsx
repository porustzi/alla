import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import results from '../../content/pages/results.json';
import { iconMap } from '../content/iconMap';

export default function Results() {
  const { title, description, categories, fallbackCategory, list } = results;

  return (
    <section id="results" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-uk-navy mb-3 sm:mb-4">{title}</h2>
          <div className="w-12 sm:w-16 h-1 bg-uk-red rounded-full mb-3 sm:mb-4" />
          <p className="text-uk-steel text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl">{description}</p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {list.map((item, idx) => {
              const cat = categories.find(c => c.name === item.category);
              const IconComponent = iconMap[cat?.icon || ''] || Trophy;
              const colorClass = cat?.color || fallbackCategory;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-uk-sky/10 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-uk-navy/5 flex items-center justify-center">
                      <IconComponent size={20} className="text-uk-red" aria-hidden={true} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2">
                        <h3 className="font-semibold text-uk-navy text-sm sm:text-base">{item.title}</h3>
                        <span className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colorClass}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-uk-steel text-xs sm:text-sm leading-relaxed">{item.description}</p>
                      <p className="text-[10px] sm:text-xs text-uk-steel/60 mt-1 sm:mt-2">{item.year}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
