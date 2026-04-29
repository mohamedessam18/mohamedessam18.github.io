import { useLocalStorage } from './hooks/useLocalStorage';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import SectionContainer from './components/SectionContainer';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Help from './sections/Help';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import './App.css';

function App() {
  // Persist active section in localStorage
  const [activeSection, setActiveSection] = useLocalStorage<string>('portfolio-section', 'home');
  
  // Language management with RTL support
  const { language, cycleLanguage } = useLanguage();
  
  // Theme management
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-[#f8f7f4]'}`}>
      {/* Main Content Area - Single Section View */}
      {/* Add bottom padding to account for fixed bottom navbar */}
      <main className="relative min-h-screen pb-24 md:pb-20">
        {/* Home Section */}
        <SectionContainer isActive={activeSection === 'home'}>
          <Home language={language} setActiveSection={setActiveSection} />
        </SectionContainer>

        {/* About Section */}
        <SectionContainer isActive={activeSection === 'about'}>
          {activeSection === 'about' && <About language={language} />}
        </SectionContainer>

        {/* Skills Section */}
        <SectionContainer isActive={activeSection === 'skills'}>
          {activeSection === 'skills' && <Skills language={language} />}
        </SectionContainer>

        {/* Education Section */}
        <SectionContainer isActive={activeSection === 'education'}>
          {activeSection === 'education' && <Education language={language} />}
        </SectionContainer>

        {/* Help Section */}
        <SectionContainer isActive={activeSection === 'help'}>
          {activeSection === 'help' && <Help language={language} setActiveSection={setActiveSection} />}
        </SectionContainer>

        {/* Projects Section */}
        <SectionContainer isActive={activeSection === 'projects'}>
          {activeSection === 'projects' && <Projects language={language} />}
        </SectionContainer>

        {/* Contact Section */}
        <SectionContainer isActive={activeSection === 'contact'}>
          {activeSection === 'contact' && <Contact language={language} />}
        </SectionContainer>
      </main>

      {/* Fixed Bottom Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        language={language}
        cycleLanguage={cycleLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Subtle Footer Credit - Above navbar */}
      <footer className="fixed bottom-[72px] md:bottom-16 left-0 right-0 py-1 text-center text-[10px] font-mono pointer-events-none z-40
        dark:text-gray-700 light:text-slate-400">
        <span className="dark:text-cyan-700/50 light:text-cyan-500/40">©</span> Copyright 2026 Mohamed Essam
      </footer>
    </div>
  );
}

export default App;
