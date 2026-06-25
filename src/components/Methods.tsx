import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import methods from '../../content/pages/methods.json';

export default function Methods() {
  const { title, readMore, list } = methods;

  return (
    <section id="methods" className="py-16 sm:py-24 bg-uk-light/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-uk-navy mb-3 sm:mb-4">{title}</h2>
          <div className="w-12 sm:w-16 h-1 bg-uk-red rounded-full mb-8 sm:mb-12" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {list.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-uk-sky/10 hover:shadow-md transition-all flex flex-col"
              >
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-uk-red/5 flex items-center justify-center mb-3 sm:mb-4">
                  <BookOpen size={20} className="text-uk-red" aria-hidden={true} />
                </div>
                <h3 className="font-semibold text-uk-navy mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h3>
                <p className="text-uk-steel text-xs sm:text-sm leading-relaxed flex-1">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-uk-red font-medium mt-4 hover:underline"
                  >
                    <ExternalLink size={14} aria-hidden={true} />
                    {readMore}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
