import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import SectionContainer from './components/SectionContainer';
import IdentitySidebar from './components/IdentitySidebar';
import CyberNav from './components/CyberNav';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Help from './sections/Help';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import { useMotionValue, useSpring, useTransform, motion, AnimatePresence } from 'framer-motion';
import { Toaster } from './components/ui/sonner';
import ParticleBackground from './components/ParticleBackground';
import BiosBoot from './components/BiosBoot';
import Chatbot from './components/Chatbot';
import AchievementSystem, { triggerAchievement } from './components/AchievementSystem';
import DestroyMode from './components/DestroyMode';
import StickyNotes from './components/StickyNotes';
import './App.css';



function App() {
  // Persist active section in localStorage
  const [activeSection, setActiveSection] = useLocalStorage<string>('portfolio-section', 'home');
  
  // Language management with RTL support
  const { language, cycleLanguage } = useLanguage();
  
  // Theme management
  const { theme, toggleTheme, isDark } = useTheme();

  // Boot sequence state
  const [isBooting, setIsBooting] = useState(true);

  // Accent color management
  const [accentColor, setAccentColor] = useLocalStorage<string>('portfolio-accent', 'cyan');
  
  useEffect(() => {
    document.body.classList.remove('theme-emerald', 'theme-amethyst', 'theme-amber');
    if (accentColor !== 'cyan') {
      document.body.classList.add(`theme-${accentColor}`);
    }
  }, [accentColor]);

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight', 
      'b', 'a'
    ];
    let keyIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const targetKey = konamiCode[keyIndex].toLowerCase();

      if (key === targetKey) {
        keyIndex++;
        if (keyIndex === konamiCode.length) {
          triggerAchievement('hacker-code');
          
          const prevAccent = accentColor;
          setAccentColor('amber');
          
          document.body.style.animation = 'hacker-flash 1s ease-out 3';
          
          setTimeout(() => {
            document.body.style.animation = '';
            setAccentColor(prevAccent);
          }, 3000);

          keyIndex = 0;
        }
      } else {
        keyIndex = e.key === konamiCode[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [accentColor, setAccentColor]);

  // Scroll Spy to monitor active section on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'education', 'help', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [setActiveSection]);

  // Mouse Glow Motion Values and Springs
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const glowX = useSpring(mouseX, { damping: 30, stiffness: 150, mass: 0.5 });
  const glowY = useSpring(mouseY, { damping: 30, stiffness: 150, mass: 0.5 });

  const glowBg = useTransform(
    [glowX, glowY],
    ([latestX, latestY]) => `radial-gradient(600px circle at ${latestX}px ${latestY}px, var(--glow-color), transparent 80%)`
  );

  // Track Mouse Movements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <AnimatePresence>
        {isBooting && (
          <motion.div
            key="bios-boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999]"
          >
            <BiosBoot onComplete={() => setIsBooting(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-[#f8f7f4] text-slate-800'}`}>
        
        {/* Repeating glassmorphic grid background */}
        <div className="grid-bg" />

      {/* Cyber Grid mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none z-0" />

      {/* Interactive Canvas Particle Network Background */}
      <ParticleBackground />

      {/* Performant spring-based mouse-follower glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: glowBg }}
      />

      {/* Main Content Area - Continuous Scroll Bento Dashboard */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sticky Left Sidebar Dashboard (Desktop Only) */}
          <aside className="hidden lg:block lg:w-[32%] lg:sticky lg:top-24 h-fit z-20">
            <IdentitySidebar
              language={language}
              theme={theme}
              toggleTheme={toggleTheme}
              accentColor={accentColor}
              setAccentColor={setAccentColor}
              cycleLanguage={cycleLanguage}
            />
          </aside>

          {/* Main Content Feed (Scrollable) */}
          <div className="flex-1 w-full lg:w-[68%] space-y-20 sm:space-y-28">
            
            {/* Mobile/Tablet Header Sidebar Component (Collapsed inline) */}
            <div className="lg:hidden w-full">
              <IdentitySidebar
                language={language}
                theme={theme}
                toggleTheme={toggleTheme}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
                cycleLanguage={cycleLanguage}
              />
            </div>

            {/* Scrollable page sections */}
            <section id="home" className="scroll-mt-24">
              <SectionContainer>
                <Home language={language} setActiveSection={setActiveSection} />
              </SectionContainer>
            </section>

            <section id="about" className="scroll-mt-24">
              <SectionContainer>
                <About language={language} />
              </SectionContainer>
            </section>

            <section id="skills" className="scroll-mt-24">
              <SectionContainer>
                <Skills language={language} />
              </SectionContainer>
            </section>

            <section id="projects" className="scroll-mt-24">
              <SectionContainer>
                <Projects language={language} />
              </SectionContainer>
            </section>

            <section id="education" className="scroll-mt-24">
              <SectionContainer>
                <Education language={language} />
              </SectionContainer>
            </section>

            <section id="help" className="scroll-mt-24">
              <SectionContainer>
                <Help 
                  language={language} 
                  setActiveSection={setActiveSection} 
                  theme={theme}
                  toggleTheme={toggleTheme}
                  cycleLanguage={cycleLanguage}
                  accentColor={accentColor}
                  setAccentColor={setAccentColor}
                />
              </SectionContainer>
            </section>

            <section id="contact" className="scroll-mt-24">
              <SectionContainer>
                <Contact language={language} />
              </SectionContainer>
            </section>

            {/* Footer Credit at the bottom of the feed */}
            <footer className="w-full py-8 text-center text-[11px] font-mono text-slate-400 dark:text-gray-600 border-t dark:border-slate-800/40 border-slate-200/50">
              <span className="text-cyan-500/40 dark:text-cyan-700/50">©</span> Copyright 2026 Mohamed Essam
            </footer>

          </div>
        </div>
      </main>

      {/* Draggable Assistant Chatbot */}
      <Chatbot language={language} theme={theme} />

      {/* Secret achievements toaster */}
      <AchievementSystem language={language} />

      {/* Stress-relief explosion destroy overlay */}
      <DestroyMode language={language} />

      {/* Draggable Sticky Notes overlay */}
      <StickyNotes language={language} />

      {/* Toast notifications */}
      <Toaster theme={theme} />

      {/* Futuristic Cyber Nav */}
      <CyberNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        language={language}
      />
      </div>
    </>
  );
}

export default App;
