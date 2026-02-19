import { useEffect, useRef, useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  Smartphone,
  ExternalLink,
  Send,
  ChevronDown,
  Menu,
  X,
  Wrench,
  Bug,
  Layers,
  Zap,
  Shield,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Matrix Rain Background Component
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-matrix/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-mono text-matrix font-bold text-lg">
            &lt;ME/&gt;
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-matrix transition-colors duration-300 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/mohamedessam18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-matrix transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-matrix"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-300">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-matrix transition-colors duration-300 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Mohamed Essam';
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MatrixRain />
      
      <div className="relative z-10 text-center px-4">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full border border-matrix/30 bg-matrix/5 text-matrix text-sm font-mono">
            Available for freelance work
          </span>
        </div>

        <p className="text-gray-400 text-lg mb-4 font-mono">Hi, I'm</p>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-mono">
          <span className="text-white">{displayText}</span>
          <span className={`text-matrix ${isTypingComplete ? 'animate-pulse' : ''}`}>_</span>
        </h1>

        <div 
          className={`transition-all duration-700 ${
            isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-2xl md:text-3xl text-matrix mb-8 font-mono">
            Flutter Developer
          </p>
          
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Software Developer Student specializing in mobile application development.
            I help clients turn their ideas into clean, functional Flutter mobile applications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="btn-primary flex items-center gap-2">
              <Send className="w-4 h-4" />
              Get In Touch
            </a>
            <a href="#projects" className="btn-outline flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              View Projects
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-matrix/50" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-matrix/10 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-matrix/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
};

// About Section
const AboutSection = () => {
  const stats = [
    { value: '3+', label: 'Years Coding' },
    { value: '10+', label: 'Projects' },
    { value: '100%', label: 'Commitment' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-6 h-6 text-matrix" />
              <span className="text-matrix font-mono text-sm">about.me</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              About <span className="text-matrix">Me</span>
            </h2>

            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                I am <span className="text-white font-semibold">Mohamed Essam</span>, a motivated 
                Software Developer student with a strong interest in mobile application development, 
                especially using <span className="text-matrix">Flutter</span>. I enjoy turning ideas 
                into real applications and continuously improving my technical and problem-solving skills.
              </p>
              
              <p>
                I have experience working with <span className="text-white">C++</span> and{' '}
                <span className="text-white">Dart</span>, and I'm familiar with mobile app development 
                concepts, as well as <span className="text-white">Kali Linux</span>. Through my personal 
                projects, I've learned how to build features from scratch, debug issues, and write 
                cleaner, more efficient code.
              </p>
              
              <p>
                Beyond technical skills, I value <span className="text-matrix">teamwork</span>,{' '}
                <span className="text-matrix">emotional intelligence</span>, and clear communication. 
                I believe that good software is built not only with strong code, but also with 
                collaboration and understanding between team members.
              </p>
              
              <p>
                My current goal is to start my career as a <span className="text-white font-semibold">Flutter Developer</span>, 
                where I can contribute, learn from experienced developers, and grow into a professional 
                who delivers high-quality mobile applications.
              </p>

              <div className="pt-4 border-t border-dark-300">
                <p className="text-matrix font-medium">
                  I help clients turn their ideas into clean, functional Flutter mobile applications.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Visual */}
          <div className="space-y-8">
            {/* Terminal Window */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="ml-4 text-xs text-gray-500 font-mono">status.sh</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-gray-500 mb-2">$ ./get_status.sh</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-matrix">→</span>
                    <span className="text-gray-400">Status:</span>
                    <span className="text-matrix">Available for work</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-matrix">→</span>
                    <span className="text-gray-400">Focus:</span>
                    <span className="text-white">Flutter Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-matrix">→</span>
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white">Remote / Worldwide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-matrix">→</span>
                    <span className="text-gray-400">Experience:</span>
                    <span className="text-white">Student Level</span>
                  </div>
                </div>
                <div className="text-matrix mt-4 animate-pulse">_</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-lg border border-dark-300 bg-dark-100/50 card-hover"
                >
                  <div className="text-3xl md:text-4xl font-bold text-matrix mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section - What I Can Help You With
const ServicesSection = () => {
  const services = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Build Flutter Apps from Scratch',
      description: 'Transform your ideas into fully functional mobile applications using Flutter and Dart.',
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'UI Design to Flutter Code',
      description: 'Convert your Figma or Adobe XD designs into responsive, pixel-perfect Flutter applications.',
    },
    {
      icon: <Bug className="w-6 h-6" />,
      title: 'Bug Fixes & Improvements',
      description: 'Debug issues and optimize existing Flutter applications for better performance.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Add New Features',
      description: 'Extend your Flutter app with new functionality, API integrations, and enhancements.',
    },
  ];

  return (
    <section id="services" className="py-24 relative hex-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Wrench className="w-6 h-6 text-matrix" />
            <span className="text-matrix font-mono text-sm">services.offered</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What I Can <span className="text-matrix">Help You With</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Freelance Flutter development services tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-6 rounded-lg border border-dark-300 bg-dark-100/50 card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-matrix/10 text-matrix group-hover:bg-matrix group-hover:text-black transition-all duration-300">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-matrix transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            <Send className="w-4 h-4" />
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Core Skills',
      icon: <Code2 className="w-5 h-5" />,
      skills: ['Flutter', 'Dart', 'Mobile Application Development'],
    },
    {
      title: 'Supporting Skills',
      icon: <Cpu className="w-5 h-5" />,
      skills: ['C++', 'Software Development', 'Problem Solving'],
    },
    {
      title: 'Soft Skills',
      icon: <Globe className="w-5 h-5" />,
      skills: ['Communication (English)', 'Teamwork', 'Emotional Intelligence'],
    },
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Cpu className="w-6 h-6 text-matrix" />
            <span className="text-matrix font-mono text-sm">technical.arsenal</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-matrix">Skills</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            My toolkit for building modern, scalable mobile applications
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg border border-dark-300 bg-dark-100/50 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-matrix/10 text-matrix">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Knowledge */}
        <div className="mt-12 p-8 rounded-lg border border-dark-300 bg-dark-100/30">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-matrix" />
            <Lock className="w-4 h-4 text-matrix" />
          </div>
          <p className="text-center text-gray-400 text-sm">
            Also familiar with <span className="text-white">security concepts</span> and{' '}
            <span className="text-white">Linux environments</span> (Kali Linux)
          </p>
        </div>

        {/* Tools & Technologies */}
        <div className="mt-8">
          <h3 className="text-center text-gray-500 mb-6 font-mono text-sm">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Git', 'GitHub', 'Firebase', 'REST APIs', 'VS Code', 'Android Studio', 'UI/UX Design', 'State Management'].map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 rounded-full border border-dark-300 text-gray-500 text-sm hover:border-matrix hover:text-matrix transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      title: 'E-Commerce Flutter App',
      description: 'A full-featured e-commerce mobile application with product catalog, shopping cart, user authentication, and payment integration. Built with clean architecture principles.',
      tech: ['Flutter', 'Dart', 'Firebase'],
      status: 'Personal Project – Under Development',
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: 'Task Manager App',
      description: 'A productivity application for managing daily tasks with features like reminders, categories, priority levels, and progress tracking. Focuses on clean UI and smooth UX.',
      tech: ['Flutter', 'Dart', 'Local Storage'],
      status: 'Personal Project – Active',
      icon: <Terminal className="w-6 h-6" />,
    },
    {
      title: 'Secure Notes App',
      description: 'A privacy-focused notes application with encryption, biometric authentication, and secure local storage. Demonstrates security best practices in mobile development.',
      tech: ['Flutter', 'Dart', 'Encryption'],
      status: 'Personal Project – Under Development',
      icon: <Lock className="w-6 h-6" />,
    },
  ];

  return (
    <section id="projects" className="py-24 relative hex-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-matrix" />
            <span className="text-matrix font-mono text-sm">featured.builds</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-matrix">Projects</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my Flutter projects. More projects will be added as I continue building.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group p-6 rounded-lg border border-dark-300 bg-dark-100/50 card-hover relative overflow-hidden"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-400">
                  {project.status}
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-matrix/10 text-matrix group-hover:bg-matrix group-hover:text-black transition-all duration-300">
                  {project.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-matrix transition-colors pr-24">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 rounded-full bg-dark-200 text-gray-400 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-dark-300 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Flutter Project</span>
                <span className="text-matrix text-xs font-mono">Can be updated later</span>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-lg border border-matrix/30 bg-matrix/5">
            <Github className="w-12 h-12 text-matrix" />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-white mb-1">
                Explore My Code
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Check out my GitHub for all my projects and contributions
              </p>
            </div>
            <a 
              href="https://github.com/mohamedessam18"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <Github className="w-4 h-4" />
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// GitHub Stats Section
const GitHubSection = () => {
  return (
    <section className="py-24 relative grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Github className="w-12 h-12 text-matrix mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Commit <span className="text-matrix">History</span>
          </h2>
          <p className="text-gray-400">
            My coding journey visualized
          </p>
        </div>

        {/* Contribution Graph Simulation */}
        <div className="p-6 rounded-lg border border-dark-300 bg-dark-100/50 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {Array.from({ length: 52 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const intensity = Math.random();
                  let bgClass = 'bg-dark-300';
                  if (intensity > 0.8) bgClass = 'bg-matrix';
                  else if (intensity > 0.6) bgClass = 'bg-matrix/70';
                  else if (intensity > 0.4) bgClass = 'bg-matrix/50';
                  else if (intensity > 0.2) bgClass = 'bg-matrix/30';
                  
                  return (
                    <div 
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm ${bgClass} transition-all duration-300 hover:scale-125`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-dark-300" />
              <div className="w-3 h-3 rounded-sm bg-matrix/30" />
              <div className="w-3 h-3 rounded-sm bg-matrix/50" />
              <div className="w-3 h-3 rounded-sm bg-matrix/70" />
              <div className="w-3 h-3 rounded-sm bg-matrix" />
            </div>
            <span>More</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="https://github.com/mohamedessam18"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Explore My Code
          </a>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/mohamedessam18',
      icon: <Github className="w-5 h-5" />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohammedessam2',
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: 'Email',
      url: 'mailto:mohvmedesam@gmail.com',
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Send className="w-6 h-6 text-matrix" />
            <span className="text-matrix font-mono text-sm">initiate.contact</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-matrix">Touch</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Feel free to reach out for freelance projects or collaboration.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div>
            <div className="terminal-window mb-8">
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="ml-4 text-xs text-gray-500 font-mono">contact.info</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-gray-500 mb-4">$ cat contact_details.txt</div>
                <div className="space-y-4">
                  <div>
                    <span className="text-matrix">name:</span>
                    <span className="text-white ml-2">Mohamed Essam</span>
                  </div>
                  <div>
                    <span className="text-matrix">role:</span>
                    <span className="text-white ml-2">Flutter Developer</span>
                  </div>
                  <div>
                    <span className="text-matrix">email:</span>
                    <a href="mailto:mohvmedesam@gmail.com" className="text-white ml-2 hover:text-matrix transition-colors">
                      mohvmedesam@gmail.com
                    </a>
                  </div>
                  <div>
                    <span className="text-matrix">availability:</span>
                    <span className="text-matrix ml-2">Open for freelance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-lg border border-dark-300 bg-dark-100/50 text-gray-400 hover:text-matrix hover:border-matrix transition-all duration-300"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Links */}
            <div className="mt-8 space-y-3">
              <a 
                href="https://github.com/mohamedessam18"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-dark-300 bg-dark-100/30 text-gray-400 hover:text-matrix hover:border-matrix transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">github.com/mohamedessam18</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/mohammedessam2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-dark-300 bg-dark-100/30 text-gray-400 hover:text-matrix hover:border-matrix transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">linkedin.com/in/mohammedessam2</span>
              </a>
              <a 
                href="mailto:mohvmedesam@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg border border-dark-300 bg-dark-100/30 text-gray-400 hover:text-matrix hover:border-matrix transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">mohvmedesam@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="p-8 rounded-lg border border-dark-300 bg-dark-100/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">
                  <span className="text-matrix">$</span> name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">
                  <span className="text-matrix">$</span> email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">
                  <span className="text-matrix">$</span> message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="form-input resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-8 border-t border-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-matrix font-bold">&lt;ME/&gt;</span>
            <span className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Mohamed Essam. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/mohamedessam18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-matrix transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mohammedessam2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-matrix transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:mohvmedesam@gmail.com"
              className="text-gray-500 hover:text-matrix transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600 font-mono">
            Built with React + Tailwind CSS + ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <ServicesSection />
        <div className="section-divider" />
        <SkillsSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <GitHubSection />
        <div className="section-divider" />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
