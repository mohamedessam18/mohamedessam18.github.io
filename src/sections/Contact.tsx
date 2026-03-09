import { useState, type FormEvent, type ChangeEvent } from 'react';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import { Github, Linkedin, Mail, Send, User, AtSign } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactProps {
  language: Language;
}

interface FormData {
  name: string;
  email: string;
}

const Contact = ({ language }: ContactProps) => {
  const t = (key: string) => getTranslation(language, key);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('contact_messages').insert([
      {
        name: formData.name,
        email: formData.email,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      alert('Something went wrong. Please try again.');
      return;
    }

    setSubmitted(true);
    setFormData({ name: '', email: '' });

    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactLinks = [
    {
      name: t('contact.github') as string,
      url: 'https://github.com/mohamedessam18',
      icon: Github,
      darkColor: 'dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-500',
      lightColor: 'light:text-slate-600 light:hover:text-slate-800 light:hover:border-slate-400',
    },
    {
      name: t('contact.linkedin') as string,
      url: 'https://www.linkedin.com/in/mohammedessam2',
      icon: Linkedin,
      darkColor: 'dark:text-gray-400 dark:hover:text-blue-400 dark:hover:border-blue-500',
      lightColor: 'light:text-slate-600 light:hover:text-blue-600 light:hover:border-blue-400',
    },
    {
      name: t('contact.emailLabel') as string,
      url: 'mailto:mohvmedesam@gmail.com',
      icon: Mail,
      darkColor: 'dark:text-gray-400 dark:hover:text-green-400 dark:hover:border-green-500',
      lightColor: 'light:text-slate-600 light:hover:text-emerald-600 light:hover:border-emerald-400',
    },
  ];

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-8 text-center
          dark:text-white light:text-slate-800">
          <span className="dark:text-cyan-400 light:text-cyan-600">&lt;</span>
          {t('contact.title') as string}
          <span className="dark:text-cyan-400 light:text-cyan-600">/&gt;</span>
        </h2>

        {/* CTA Text */}
        <p className="text-center mb-8 dark:text-gray-400 light:text-slate-600">
          {t('contact.cta') as string}
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg border mb-8
            dark:bg-gray-900/50 dark:border-gray-700/50
            light:bg-white/70 light:border-slate-300/50 light:shadow-sm"
        >
          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-gray-500 light:text-slate-400"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.name') as string}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all
                  dark:bg-black/50 dark:border dark:border-gray-700 dark:text-white dark:placeholder-gray-500
                  dark:focus:border-cyan-500 dark:focus:ring-1 dark:focus:ring-cyan-500
                  light:bg-slate-50 light:border light:border-slate-300 light:text-slate-800 light:placeholder-slate-400
                  light:focus:border-cyan-500 light:focus:ring-1 light:focus:ring-cyan-500"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <AtSign
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-gray-500 light:text-slate-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.email') as string}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all
                  dark:bg-black/50 dark:border dark:border-gray-700 dark:text-white dark:placeholder-gray-500
                  dark:focus:border-cyan-500 dark:focus:ring-1 dark:focus:ring-cyan-500
                  light:bg-slate-50 light:border light:border-slate-300 light:text-slate-800 light:placeholder-slate-400
                  light:focus:border-cyan-500 light:focus:ring-1 light:focus:ring-cyan-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                dark:bg-cyan-500/10 dark:border dark:border-cyan-500/50 dark:text-cyan-400 
                dark:hover:bg-cyan-500/20 dark:hover:border-cyan-400 dark:hover:shadow-lg dark:hover:shadow-cyan-500/20
                light:bg-cyan-600/10 light:border light:border-cyan-500/40 light:text-cyan-700
                light:hover:bg-cyan-600/20 light:hover:border-cyan-500/60 light:hover:shadow-md light:hover:shadow-cyan-500/10"
            >
              {isSubmitting ? (
                <span className="animate-pulse">{t('contact.submit') as string}...</span>
              ) : (
                <>
                  {t('contact.submit') as string}
                  <Send size={18} />
                </>
              )}
            </button>

            {/* Success Message */}
            {submitted && (
              <p className="text-center text-sm animate-pulse dark:text-green-400 light:text-emerald-600">
                Thank you! I&apos;ll get back to you soon.
              </p>
            )}
          </div>
        </form>

        {/* Contact Links */}
        <div className="grid grid-cols-3 gap-4">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all duration-300
                dark:bg-gray-900/30 dark:border-gray-700/50 dark:hover:bg-gray-800/50
                light:bg-white/50 light:border-slate-300/50 light:hover:bg-slate-100/70
                ${link.darkColor} ${link.lightColor}`}
            >
              <link.icon size={24} />
              <span className="text-xs font-mono">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Email Display */}
        <div className="mt-8 text-center">
          <a
            href="mailto:mohvmedesam@gmail.com"
            className="inline-flex items-center gap-2 font-mono transition-colors
              dark:text-cyan-400 dark:hover:text-cyan-300
              light:text-cyan-700 light:hover:text-cyan-800"
          >
            <Mail size={16} />
            mohvmedesam@gmail.com
          </a>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/mohamed%20essam.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono transition-all duration-300
              dark:bg-cyan-500/10 dark:border dark:border-cyan-500/50 dark:text-cyan-400 
              dark:hover:bg-cyan-500/20 dark:hover:border-cyan-400 dark:hover:shadow-lg dark:hover:shadow-cyan-500/20
              light:bg-cyan-600/10 light:border light:border-cyan-500/40 light:text-cyan-700
              light:hover:bg-cyan-600/20 light:hover:border-cyan-500/60 light:hover:shadow-md light:hover:shadow-cyan-500/10"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;