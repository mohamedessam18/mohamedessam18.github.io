import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Briefcase, HelpCircle, Coffee, Settings, Send } from 'lucide-react';
import { type Language } from '../i18n';
import meImage from '../assets/me.png';
import { triggerAchievement } from './AchievementSystem';

interface ChatbotProps {
  language: Language;
  theme: 'dark' | 'light';
}

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  isCode?: boolean;
}

const Chatbot = ({ language, theme }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [customAvatar, setCustomAvatar] = useState<string[] | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load API Key and Custom Avatar from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini-api-key') || '';
    setApiKey(savedKey);

    const loadAvatar = () => {
      const saved = localStorage.getItem('custom-avatar-pixels');
      if (saved) {
        try {
          setCustomAvatar(JSON.parse(saved));
        } catch (_) {}
      }
    };
    loadAvatar();

    const handleSync = (e: Event) => {
      const { grid } = (e as CustomEvent).detail;
      setCustomAvatar(grid);
    };
    window.addEventListener('avatar-synced', handleSync as EventListener);
    return () => window.removeEventListener('avatar-synced', handleSync as EventListener);
  }, []);

  // Initialize chatbot welcome message
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: language === 'ar'
          ? 'مرحباً! أنا مساعد محمد الذكي 🤖. يمكنك كتابة أي سؤال عن مهاراتي ومشاريعي، أو الضغط على الإعدادات ⚙️ وتفعيل الذكاء الاصطناعي الحي عبر Gemini!'
          : 'Hi! I am Mohamed\'s smart assistant 🤖. Ask me anything about my projects, skills, or click settings ⚙️ to enable live Gemini AI!'
      }
    ]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const RenderAvatar = ({ sizeClass }: { sizeClass: string }) => {
    if (customAvatar && customAvatar.length === 64) {
      return (
        <div className={`grid grid-cols-8 gap-[0.2px] bg-slate-900 overflow-hidden shrink-0 rounded-full ${sizeClass}`}>
          {customAvatar.map((color, idx) => (
            <div key={idx} style={{ backgroundColor: color }} className="w-full h-full" />
          ))}
        </div>
      );
    }
    return (
      <div className={`relative overflow-hidden rounded-full shrink-0 ${sizeClass}`}>
        <img src={meImage} alt="Mohamed Clone" className="object-cover w-full h-full" />
      </div>
    );
  };

  const saveApiKey = (key: string) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    localStorage.setItem('gemini-api-key', trimmed);
    setShowSettings(false);

    // Trigger theme/designer achievement just to reward interaction!
    triggerAchievement('theme-designer');
  };

  const getSmartLocalResponse = (query: string): { reply: string; isCode?: boolean } => {
    const q = query.toLowerCase();
    const isAr = language === 'ar';

    // 1. Hiring / Availability
    if (q.includes('work') || q.includes('job') || q.includes('hire') || q.includes('وظي') || q.includes('شغل') || q.includes('توظيف') || q.includes('عمل')) {
      return {
        reply: isAr
          ? 'نعم! محمد متاح حالياً لفرص تدريب أو عمل كـ Flutter Mobile Developer (في القاهرة أو عن بعد). يمكنك تحميل سيرته الذاتية المعدلة من الصفحة الرئيسية أو استخدام نموذج التواصل!'
          : 'Yes! Mohamed is actively looking for Flutter Developer internships or junior roles (Cairo or Remote). You can download his tailored resume from the Home card or drop a message via the Contact page!'
      };
    }

    // 2. Flutter / Dart
    if (q.includes('flutter') || q.includes('dart') || q.includes('فلاتر') || q.includes('دارت') || q.includes('موبايل') || q.includes('mobile')) {
      return {
        reply: isAr
          ? 'محمد يتخصص في فلاتر وتطوير تطبيقات الجوال الهجينة (Android/iOS). يتقن أنظمة إدارة الحالة BLoC و Riverpod و بنية MVVM النظيفة.'
          : 'Mohamed specializes in Flutter cross-platform mobile apps. He is experienced in State Management (BLoC, Riverpod), MVVM patterns, and Clean Architecture integrations.'
      };
    }

    // 3. Skills / Stack
    if (q.includes('skill') || q.includes('stack') || q.includes('مهار') || q.includes('تقني') || q.includes('لغات') || q.includes('lang')) {
      return {
        reply: isAr
          ? 'مهارات محمد تشمل:\n- برمجة الموبايل: Flutter & Dart\n- برمجة الأنظمة: C++ & OOP\n- الويب: HTML, CSS, JavaScript, React\n- قواعد البيانات: Supabase, Firebase, SQLite, Hive'
          : 'Mohamed\'s core stack:\n- Mobile: Flutter & Dart (BLoC, Riverpod)\n- Systems: C++ (OOP, Data Structures)\n- Web: HTML, CSS, JavaScript, React\n- Databases: Supabase, Firebase, SQLite'
      };
    }

    // 4. University / Studies
    if (q.includes('stud') || q.includes('univers') || q.includes('جامع') || q.includes('درست') || q.includes('تعليم') || q.includes('كلية')) {
      return {
        reply: isAr
          ? 'يدرس محمد علوم الحاسب في جامعة MTI بالمعادي (القاهرة) من 2023 إلى 2027، وحصل على تقدير امتياز في السنتين الأولى والثانية.'
          : 'Mohamed is pursuing his Computer Science degree at MTI University (Cairo) from 2023 to 2027, maintaining top grades in OOP, structures, and algorithms.'
      };
    }

    // 5. Projects
    if (q.includes('project') || q.includes('عملت') || q.includes('مشاريع') || q.includes('تطبيقات') || q.includes('app')) {
      return {
        reply: isAr
          ? 'أبرز مشاريع محمد:\n1. موقع البورتفوليو هذا (نظام تشغيل iPhone وتطبيقات محاكاة)\n2. متعقب المصاريف الشخصية بالويب\n3. مولد الآيات القرآنية بـ React\n4. نظام البنك ونظام إدارة المكتبة بـ C++'
          : 'Featured projects:\n1. This Portfolio (iOS Mock OS & simulation apps)\n2. Expense Tracker web widget\n3. Quran Ayah generator\n4. Bank and Library database utilities in C++'
      };
    }

    // 6. Code sample
    if (q.includes('code') || q.includes('كود') || q.includes('برمجة')) {
      return {
        isCode: true,
        reply: `// Flutter BLoC State Management Pattern
class UserBloc extends Bloc<UserEvent, UserState> {
  final UserRepository repository;
  UserBloc(this.repository) : super(UserLoading()) {
    on<FetchUser>((event, emit) async {
      try {
        final user = await repository.getUser();
        emit(UserLoaded(user));
      } catch (_) {
        emit(UserError("Sync Failed"));
      }
    });
  }
}`
      };
    }

    // 7. Coffee
    if (q.includes('coffee') || q.includes('قهوة') || q.includes('شاي') || q.includes('tea')) {
      return {
        reply: isAr
          ? 'الكود الخاص بمحمد يتم تغذيته بالكامل بالكافيين! ☕ مستويات استهلاك القهوة الحالية: حرجة وممتازة للتطوير!'
          : 'Mohamed\'s compiler is fueled 100% by caffeine! ☕ Coffee level: Critical for production deployment.'
      };
    }

    // 8. Joke
    if (q.includes('joke') || q.includes('نكت') || q.includes('ضحك')) {
      return {
        reply: isAr
          ? 'لماذا يكره المبرمجون الطبيعة؟ لأنها مليئة بالـ Bugs! 🐛😂'
          : 'Why do programmers wear glasses? Because they cannot C#! 🤓'
      };
    }

    // 9. Contact
    if (q.includes('contact') || q.includes('تواصل') || q.includes('ايميل') || q.includes('رقم') || q.includes('تلفون') || q.includes('email')) {
      return {
        reply: isAr
          ? 'يمكنك التواصل مع محمد عبر نموذج الاتصال في الموقع، أو مراسلته على LinkedIn، أو تصفح مشاريعه على GitHub.'
          : 'You can contact Mohamed by filling out the form on the Contact section, or send a message directly on LinkedIn or GitHub!'
      };
    }

    // Default Fallback
    return {
      reply: isAr
        ? 'أنا أعمل حالياً في وضع البحث الذكي المحلّي (Offline). لتفعيل الذكاء الاصطناعي الحي والدردشة الطليقة، اضغط على الإعدادات ⚙️ وأدخل مفتاح Gemini API الخاص بك! أو اسألني عن دراسة محمد، مهاراته، وماريعه.'
        : 'I am running in Offline Smart Mode. To unlock my full AI brain and chat freely, click settings ⚙️ and insert your Gemini API Key! Or ask me about Mohamed\'s studies, skills, and projects.'
    };
  };

  const handleMessageSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query || isTyping) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInputVal('');
    setIsTyping(true);

    // If API Key is present, query Google Gemini API
    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are a virtual AI assistant representing Mohamed Essam on his software portfolio website.
                             Mohamed's biography summary:
                             - Flutter mobile developer & CS student at MTI University, Cairo (2023-2027).
                             - Stack: Dart/Flutter, BLoC, Riverpod, clean architecture, MVVM.
                             - Languages: Arabic (native), English (fluent).
                             - Core projects: iOS simulated OS portfolio, Expense Tracker, Quran Ayah Generator, C++ bank & library utilities.
                             - Available for internships and job offers (Remote or Cairo).
                             Respond in a concise, friendly software developer tone. Match user's query language (${language === 'ar' ? 'Arabic' : 'English'}).
                             User question: "${query}"`
                    }
                  ]
                }
              ]
            })
          }
        );

        const data = await response.json();
        const replyText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          (language === 'ar' ? 'عذراً، تعذر معالجة الرد. يرجى المحاولة لاحقاً.' : 'Sorry, could not process response. Try again.');

        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: 'bot', text: replyText }]);
      } catch (err) {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text:
              language === 'ar'
                ? 'فشل الاتصال بـ Gemini. يرجى التحقق من مفتاح الـ API المضاف.'
                : 'Failed connecting to Gemini. Please check your API key validity.'
          }
        ]);
      }
    } else {
      // Local keyword matcher logic
      setTimeout(() => {
        setIsTyping(false);
        const data = getSmartLocalResponse(query);
        setMessages((prev) => [...prev, { sender: 'bot', text: data.reply, isCode: data.isCode }]);
      }, 700);
    }
  };

  const handleOptionClick = (label: string) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { sender: 'user', text: label }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const data = getSmartLocalResponse(label);
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply, isCode: data.isCode }]);
    }, 600);
  };

  const options = [
    { labelAr: 'هل تبحث عن عمل؟', labelEn: 'Are you hiring?', icon: Briefcase },
    { labelAr: 'ما هي مهاراتك؟', labelEn: 'What is your stack?', icon: HelpCircle },
    { labelAr: 'وريني عينة كود', labelEn: 'Show code sample', icon: Code },
    { labelAr: 'هل تشرب القهوة؟', labelEn: 'Addicted to coffee?', icon: Coffee },
  ];

  const isAr = language === 'ar';

  return (
    <div className="fixed z-50 bottom-24 right-6 md:bottom-20 select-none">
      
      {/* Draggable Chat bubble avatar button */}
      <motion.div
        drag
        dragConstraints={{ top: -500, bottom: 20, left: -1000, right: 20 }}
        dragElastic={0.1}
        dragMomentum={false}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        className="absolute bottom-0 right-0"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative transition-transform hover:scale-105 border dark:border-cyan-500/30 border-slate-300 dark:bg-black/90 bg-white"
          style={{ 
            boxShadow: '0 0 15px rgba(var(--color-primary), 0.3)',
            borderColor: 'rgba(var(--color-primary), 0.3)'
          }}
          aria-label="Open virtual assistant chatbot"
        >
          <RenderAvatar sizeClass="w-11 h-11" />
          <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 dark:border-black border-white rounded-full animate-pulse" />
        </button>
      </motion.div>

      {/* Floating Chat window dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: -70, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 150, damping: 18 }}
            className="absolute bottom-0 right-0 w-[300px] sm:w-[330px] h-[410px] rounded-2xl border dark:border-cyan-500/20 border-slate-300 bg-white/95 dark:bg-black/95 shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-slate-100 dark:bg-slate-900/60 p-3 px-4 flex items-center justify-between border-b dark:border-gray-800/40 border-slate-200">
              <div className="flex items-center gap-2">
                <RenderAvatar sizeClass="w-8 h-8" />
                <div className="text-left rtl:text-right">
                  <span className="font-mono text-xs font-bold block dark:text-white text-slate-800 leading-tight">
                    {isAr ? 'مساعد محمد' : 'Mohamed\'s Assistant'}
                  </span>
                  <span className="text-[8px] font-mono text-emerald-500 block leading-none mt-0.5 uppercase tracking-widest animate-pulse font-black">
                    {apiKey ? 'GEMINI LIVE' : 'OFFLINE SMART'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-1 rounded text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors ${showSettings ? 'bg-cyan-500/10 text-cyan-400' : ''}`}
                  title="Gemini Settings"
                >
                  <Settings size={14} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1 rounded text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                  aria-label="Close Chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content Switcher: Settings Panel or Chat Box */}
            <div className="flex-1 relative flex flex-col justify-between min-h-0">
              <AnimatePresence mode="wait">
                {showSettings ? (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 p-4 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between"
                  >
                    <div className="space-y-2.5 text-left rtl:text-right">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-bold block">
                        {isAr ? 'ربط مفتاح الذكاء الاصطناعي' : 'Gemini AI Configuration'}
                      </span>
                      <p className="font-mono text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {isAr 
                          ? 'لتجربة المساعد بالذكاء الاصطناعي الفعلي المباشر، يرجى إدخال مفتاح Gemini API الخاص بك. يتم حفظ المفتاح محلياً في متصفحك فقط.'
                          : 'To experience the chatbot with real, unbounded LLM capabilities, paste your Gemini API key below. Key stays saved local-only.'}
                      </p>
                      <input
                        type="password"
                        placeholder="AIzaSy..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full bg-white dark:bg-black border dark:border-slate-800 border-slate-300 rounded-xl px-3 py-1.5 font-mono text-[10px] sm:text-xs outline-none focus:border-cyan-500/50 text-slate-800 dark:text-white"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => saveApiKey(apiKey)}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-black py-1.5 px-3 rounded-xl text-[9px] uppercase transition-all"
                      >
                        {isAr ? 'حفظ المفتاح' : 'Save Key'}
                      </button>
                      <button
                        onClick={() => { saveApiKey(''); }}
                        className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-bold py-1.5 px-3 rounded-xl text-[9px] uppercase transition-all"
                      >
                        {isAr ? 'حذف' : 'Remove'}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col justify-between min-h-0">
                    
                    {/* Chat Messages */}
                    <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 scrollable-container select-text text-xs leading-relaxed max-h-[220px]">
                      {messages.map((msg, idx) => (
                        <div 
                          key={idx} 
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[85%] p-3 rounded-2xl font-mono whitespace-pre-wrap ${
                              msg.sender === 'user'
                                ? 'bg-slate-200 text-slate-900 dark:bg-cyan-500/10 dark:text-cyan-400 border dark:border-cyan-500/20'
                                : 'bg-slate-100 text-slate-700 dark:bg-slate-900/60 dark:text-slate-300 border dark:border-gray-800/60'
                            }`}
                          >
                            {msg.isCode ? (
                              <pre className={`font-mono text-[9px] text-emerald-400 overflow-x-auto p-1.5 rounded whitespace-pre scrollable-container ${theme === 'dark' ? 'bg-black/60' : 'bg-slate-950/90'}`}>
                                <code>{msg.text}</code>
                              </pre>
                            ) : (
                              msg.text
                            )}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="p-2 px-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/40 text-slate-400 font-mono text-[9px] italic animate-pulse">
                            thinking...
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick options panel (hides when typing) */}
                    {!isTyping && messages.length <= 2 && (
                      <div className="p-2 border-t dark:border-gray-800/40 border-slate-200/60 bg-slate-50/50 dark:bg-black/20 shrink-0">
                        <div className="grid grid-cols-2 gap-1.5">
                          {options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleOptionClick(isAr ? opt.labelAr : opt.labelEn)}
                              className="flex items-center gap-1.5 p-1.5 rounded-xl border dark:border-cyan-500/20 border-slate-200/80 bg-white dark:bg-slate-950 font-mono text-[9px] text-left rtl:text-right font-bold transition-all duration-300 hover:bg-cyan-500/5 text-slate-700 dark:text-cyan-400 dark:hover:bg-cyan-500/10"
                            >
                              <opt.icon size={10} className="shrink-0" />
                              <span className="truncate">{isAr ? opt.labelAr : opt.labelEn}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Free-text submit input */}
                    <form 
                      onSubmit={handleMessageSubmit}
                      className="p-2 bg-slate-50 dark:bg-slate-900/40 border-t dark:border-gray-800/40 border-slate-200/80 flex items-center gap-1.5 shrink-0"
                    >
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder={isAr ? 'اكتب سؤالك هنا...' : 'Ask a question...'}
                        className="flex-1 bg-white dark:bg-black border dark:border-slate-800 border-slate-300 rounded-xl px-3 py-1.5 font-mono text-[10px] sm:text-xs outline-none focus:border-cyan-500/50 text-slate-800 dark:text-white"
                      />
                      <button 
                        type="submit"
                        disabled={isTyping}
                        className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-black font-black p-2 rounded-xl flex items-center justify-center transition-all active:scale-95 shrink-0"
                      >
                        <Send size={12} />
                      </button>
                    </form>

                  </div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
