import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import { Github, Linkedin, Mail, Send, User, AtSign, Instagram, MessageCircle, MessageSquare, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface ContactProps {
  language: Language;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 15 } 
  }
} as const;

const Contact = ({ language }: ContactProps) => {
  const t = (key: string) => getTranslation(language, key);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('contact_messages').insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      toast.error(t('contact.error') as string);
      return;
    }

    toast.success(t('contact.success') as string);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactLinks = [
    {
      name: t('contact.github') as string,
      url: 'https://github.com/mohamedessam18',
      icon: Github,
      darkColor: 'dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-500',
      lightColor: 'text-slate-600 hover:text-slate-800 hover:border-slate-400',
    },
    {
      name: t('contact.linkedin') as string,
      url: 'https://www.linkedin.com/in/mohammedessam2',
      icon: Linkedin,
      darkColor: 'dark:text-gray-400 dark:hover:text-blue-400 dark:hover:border-blue-500',
      lightColor: 'text-slate-600 hover:text-blue-600 hover:border-blue-400',
    },
    {
      name: t('contact.emailLabel') as string,
      url: 'mailto:mohvmedesam@gmail.com',
      icon: Mail,
      darkColor: 'dark:text-gray-400 dark:hover:text-green-400 dark:hover:border-green-500',
      lightColor: 'text-slate-600 hover:text-emerald-600 hover:border-emerald-400',
    },
    {
      name: 'Telegram',
      url: 'https://t.me/mohvmedesam20',
      icon: MessageCircle,
      darkColor: 'dark:text-gray-400 dark:hover:text-sky-400 dark:hover:border-sky-500',
      lightColor: 'text-slate-600 hover:text-sky-600 hover:border-sky-400',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/mohvmedesam20',
      icon: Instagram,
      darkColor: 'dark:text-gray-400 dark:hover:text-pink-400 dark:hover:border-pink-500',
      lightColor: 'text-slate-600 hover:text-pink-600 hover:border-pink-400',
    },
  ];

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto"
      >
        {/* Section Title */}
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-mono font-bold mb-8 text-center
          text-slate-800 dark:text-white">
          <span className="text-cyan-600 dark:text-cyan-400">&lt;</span>
          {t('contact.title') as string}
          <span className="text-cyan-600 dark:text-cyan-400">/&gt;</span>
        </motion.h2>

        {/* CTA Text */}
        <motion.p variants={itemVariants} className="text-center mb-8 text-slate-600 dark:text-gray-400">
          {t('contact.cta') as string}
        </motion.p>

        {/* Contact Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="p-6 rounded-lg border mb-8
            dark:bg-gray-900/50 dark:border-gray-700/50
            bg-white/70 border-slate-300/50 shadow-sm"
        >
          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <User
                size={18}
                className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.name') as string}
                required
                className="w-full ps-10 pe-4 py-3 rounded-lg outline-none transition-all
                  dark:bg-black/50 dark:border dark:border-gray-700 dark:text-white dark:placeholder-gray-500
                  dark:focus:border-cyan-500 dark:focus:ring-1 dark:focus:ring-cyan-500
                  bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400
                  focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <AtSign
                size={18}
                className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.email') as string}
                required
                className="w-full ps-10 pe-4 py-3 rounded-lg outline-none transition-all
                  dark:bg-black/50 dark:border dark:border-gray-700 dark:text-white dark:placeholder-gray-500
                  dark:focus:border-cyan-500 dark:focus:ring-1 dark:focus:ring-cyan-500
                  bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400
                  focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Message Textarea */}
            <div className="relative">
              <MessageSquare
                size={18}
                className="absolute start-3 top-4 text-slate-400 dark:text-gray-500"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.message') as string}
                required
                rows={4}
                className="w-full ps-10 pe-4 py-3 rounded-lg outline-none transition-all resize-none
                  dark:bg-black/50 dark:border dark:border-gray-700 dark:text-white dark:placeholder-gray-500
                  dark:focus:border-cyan-500 dark:focus:ring-1 dark:focus:ring-cyan-500
                  bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400
                  focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
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
                bg-cyan-600/10 border border-cyan-500/40 text-cyan-700
                hover:bg-cyan-600/20 hover:border-cyan-500/60 hover:shadow-md hover:shadow-cyan-500/10"
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


          </div>
        </motion.form>

        {/* Contact Links */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all duration-300
                dark:bg-gray-900/30 dark:border-gray-700/50 dark:hover:bg-gray-800/50
                bg-white/50 border-slate-300/50 hover:bg-slate-100/70
                ${link.darkColor} ${link.lightColor}`}
            >
              <link.icon size={24} />
              <span className="text-xs font-mono">{link.name}</span>
            </a>
          ))}
        </motion.div>

        {/* Email Display */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <a
            href="mailto:mohvmedesam@gmail.com"
            className="inline-flex items-center gap-2 font-mono transition-colors
              dark:text-cyan-400 dark:hover:text-cyan-300
              text-cyan-700 hover:text-cyan-800"
          >
            <Mail size={16} />
            mohvmedesam@gmail.com
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 text-center">
          <a
            href="/mohamed%20essam.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono transition-all duration-300
              dark:bg-cyan-500/10 dark:border dark:border-cyan-500/50 dark:text-cyan-400 
              dark:hover:bg-cyan-500/20 dark:hover:border-cyan-400 dark:hover:shadow-lg dark:hover:shadow-cyan-500/20
              bg-cyan-600/10 border border-cyan-500/40 text-cyan-700
              hover:bg-cyan-600/20 hover:border-cyan-500/60 hover:shadow-md hover:shadow-cyan-500/10"
          >
            <Download size={18} />
            {t('contact.downloadCV') as string}
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
