import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import site from '../content/site.json';

export default function Methods() {
  const { title, readMore } = site.methodsSection;
  const methodsData = site.methodsList;

  return (
    <section id="methods" className="py-24 bg-uk-light/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-uk-navy mb-4">{title}</h2>
          <div className="w-16 h-1 bg-uk-red rounded-full mb-12" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodsData.list.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-6 bg-white rounded-xl shadow-sm border border-uk-sky/10 hover:shadow-md transition-all flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-uk-red/5 flex items-center justify-center mb-4">
                  <BookOpen size={22} className="text-uk-red" aria-hidden={true} />
                </div>
                <h3 className="font-semibold text-uk-navy mb-2">{item.title}</h3>
                <p className="text-uk-steel text-sm leading-relaxed flex-1">{item.description}</p>
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
