import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import site from '../content/site.json';

export default function Contact() {
  const { title, emailLabel, phoneLabel, profileLabel } = site.contactSection;
  const contact = site.contactInfo;

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-uk-navy mb-4">{title}</h2>
          <div className="w-16 h-1 bg-uk-red rounded-full mb-12" />

          <div className="max-w-xl mx-auto space-y-6">
            <motion.a
              href={`mailto:${contact.email}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-uk-sky/10 hover:shadow-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-uk-navy/5 flex items-center justify-center group-hover:bg-uk-red/5 transition-colors">
                <Mail size={22} className="text-uk-red" aria-hidden={true} />
              </div>
              <div>
                <p className="text-xs text-uk-steel/60 uppercase tracking-wider font-medium">{emailLabel}</p>
                <p className="text-uk-navy font-medium">{contact.email}</p>
              </div>
            </motion.a>

            {contact.phone && (
              <motion.a
                href={`tel:${contact.phone}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-uk-sky/10 hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-uk-navy/5 flex items-center justify-center group-hover:bg-uk-red/5 transition-colors">
                  <Phone size={22} className="text-uk-red" aria-hidden={true} />
                </div>
                <div>
                  <p className="text-xs text-uk-steel/60 uppercase tracking-wider font-medium">{phoneLabel}</p>
                  <p className="text-uk-navy font-medium">{contact.phone}</p>
                </div>
              </motion.a>
            )}

            {contact.links.map((link, idx) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-uk-sky/10 hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-uk-navy/5 flex items-center justify-center group-hover:bg-uk-red/5 transition-colors">
                  <ExternalLink size={22} className="text-uk-red" aria-hidden={true} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-uk-steel/60 uppercase tracking-wider font-medium">{profileLabel}</p>
                  <p className="text-uk-navy font-medium">{link.platform}</p>
                </div>
                <ExternalLink size={16} className="text-uk-steel/40 group-hover:text-uk-red transition-colors" aria-hidden={true} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
