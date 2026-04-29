// Internationalization configuration
// Supports: English (en), Arabic (ar), Spanish (es)

export type Language = 'en' | 'ar' | 'es';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      education: 'Education / Experience',
      help: 'Help',
      projects: 'Projects',
      contact: 'Contact',
    },
    // Hero Section
    hero: {
      greeting: 'Hello, I am',
      name: 'Mohamed Essam',
      title: 'Flutter Developer | Software Developer Student',
      subtitle: 'Mobile Application Development using Flutter',
      ctaProjects: 'Explore My Projects',
      ctaHelp: 'What I Can Help You With',
    },
    // About Section
    about: {
      title: 'About Me',
      paragraph1: 'I am Mohamed Essam, a motivated Software Developer student specializing in Flutter mobile application development. I enjoy transforming ideas into functional applications and continuously improving my technical and problem-solving skills.',
      paragraph2: 'I have experience with Dart and C++, understand mobile development concepts, and have basic familiarity with Linux and security environments. Through personal projects, I\'ve learned how to build features from scratch, debug effectively, and write clean, maintainable code.',
      paragraph3: 'Beyond technical skills, I value clear communication, teamwork, and professionalism. My current goal is to start my career as a Flutter Developer, where I can contribute, learn from experienced developers, and grow into a professional who delivers high-quality mobile applications.',
      closing: 'I help clients turn their ideas into clean, functional Flutter mobile applications.',
    },
    // Skills Section
    skills: {
      title: 'Skills',
      coreSkills: 'Core Skills',
      supportingSkills: 'Supporting Skills',
      softSkills: 'Soft Skills',
      additional: 'Additional Knowledge',
      core: ['Flutter', 'Dart', 'Mobile Application Development'],
      supporting: ['C++', 'Software Development', 'Problem Solving'],
      soft: ['English Communication', 'Teamwork', 'Emotional Intelligence'],
      additionalText: 'Basic knowledge of security concepts and Linux environments',
    },
    education: {
      title: 'Education / Experience',
    },
    // Help Section
    help: {
      title: 'What I Can Help You With',
      services: [
        'Building Flutter mobile apps from scratch',
        'Converting UI designs into responsive Flutter apps',
        'Fixing bugs and optimizing existing Flutter applications',
        'Adding new features to Flutter projects',
      ],
    },
    // Projects Section
    projects: {
      title: 'Projects',
      viewOnGitHub: 'View on GitHub',
      items: [
        {
          title: 'Cyber Task Manager',
          description: 'A comprehensive task management application built with Flutter, featuring task creation, categorization, and progress tracking.',
        },
        {
          title: 'Expense Tracker',
          description: 'A personal finance management app that helps users track expenses, set budgets, and visualize spending patterns.',
        },
        {
          title: 'Library System',
          description: 'A digital library management system for organizing books, tracking loans, and managing user accounts.',
        },
      ],
    },
    // Contact Section
    contact: {
      title: 'Contact',
      cta: 'Feel free to reach out for freelance projects or collaboration.',
      name: 'Name',
      email: 'Email',
      submit: 'Submit',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      emailLabel: 'Email',
    },
    // Language
    language: {
      en: 'En',
      ar: 'Ar',
      es: 'Sp',
    },
  },
  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      about: 'عني',
      skills: 'المهارات',
      education: 'التعليم / الخبرات',
      help: 'المساعدة',
      projects: 'المشاريع',
      contact: 'تواصل',
    },
    // Hero Section
    hero: {
      greeting: 'مرحباً، أنا',
      name: 'محمد عصام',
      title: 'مطور Flutter | طالب تطوير برمجيات',
      subtitle: 'تطوير تطبيقات الجوال باستخدام Flutter',
      ctaProjects: 'استكشف مشاريعي',
      ctaHelp: 'بماذا يمكنني مساعدتك',
    },
    // About Section
    about: {
      title: 'عني',
      paragraph1: 'أنا محمد عصام، طالب تطوير برمجيات متحمس متخصص في تطوير تطبيقات الجوال باستخدام Flutter. أستمتع بتحويل الأفكار إلى تطبيقات وظيفية وتحسين مهاراتي التقنية وحل المشكلات باستمرار.',
      paragraph2: 'لدي خبرة مع Dart و C++، وأفهم مفاهيم تطوير الجوال، ولدي معرفة أساسية بأنظمة Linux وبيئات الأمان. من خلال المشاريع الشخصية، تعلمت كيفية بناء الميزات من الصفر، وإصلاح الأخطاء بفعالية، وكتابة كود نظيف وقابل للصيانة.',
      paragraph3: 'بجانب المهارات التقنية، أقدر التواصل الواضح والعمل الجماعي والاحترافية. هدفي الحالي هو بدء مسيرتي المهنية كمطور Flutter، حيث يمكنني المساهمة والتعلم من المطورين ذوي الخبرة والنمو لأصبح محترفاً يقدم تطبيقات جوال عالية الجودة.',
      closing: 'أساعد العملاء على تحويل أفكارهم إلى تطبيقات Flutter نظيفة ووظيفية.',
    },
    // Skills Section
    skills: {
      title: 'المهارات',
      coreSkills: 'المهارات الأساسية',
      supportingSkills: 'المهارات الداعمة',
      softSkills: 'المهارات الشخصية',
      additional: 'معرفة إضافية',
      core: ['Flutter', 'Dart', 'تطوير تطبيقات الجوال'],
      supporting: ['C++', 'تطوير البرمجيات', 'حل المشكلات'],
      soft: ['التواصل بالإنجليزية', 'العمل الجماعي', 'الذكاء العاطفي'],
      additionalText: 'معرفة أساسية بمفاهيم الأمان وأنظمة Linux',
    },
    education: {
      title: 'التعليم / الخبرات',
    },
    // Help Section
    help: {
      title: 'بماذا يمكنني مساعدتك',
      services: [
        'بناء تطبيقات Flutter من الصفر',
        'تحويل تصاميم UI إلى تطبيقات Flutter متجاوبة',
        'إصلاح الأخطاء وتحسين تطبيقات Flutter الحالية',
        'إضافة ميزات جديدة إلى مشاريع Flutter',
      ],
    },
    // Projects Section
    projects: {
      title: 'المشاريع',
      viewOnGitHub: 'عرض على GitHub',
      items: [
        {
          title: 'مدير المهام السيبراني',
          description: 'تطبيق شامل لإدارة المهام مبني باستخدام Flutter، يتميز بإنشاء المهام وتصنيفها وتتبع التقدم.',
        },
        {
          title: 'متتبع المصروفات',
          description: 'تطبيق لإدارة الشؤون المالية الشخصية يساعد المستخدمين على تتبع المصروفات وتحديد الميزانيات وتصور أنماط الإنفاق.',
        },
        {
          title: 'نظام المكتبة',
          description: 'نظام إدارة مكتبة رقمي لتنظيم الكتب وتتبع الإعارات وإدارة حسابات المستخدمين.',
        },
      ],
    },
    // Contact Section
    contact: {
      title: 'تواصل',
      cta: 'لا تتردد في التواصل للمشاريع الحرة أو التعاون.',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      submit: 'إرسال',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      emailLabel: 'البريد الإلكتروني',
    },
    // Language
    language: {
      en: 'En',
      ar: 'Ar',
      es: 'Sp',
    },
  },
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      about: 'Sobre Mí',
      skills: 'Habilidades',
      education: 'Educación / Experiencia',
      help: 'Ayuda',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    // Hero Section
    hero: {
      greeting: 'Hola, soy',
      name: 'Mohamed Essam',
      title: 'Desarrollador Flutter | Estudiante de Desarrollo de Software',
      subtitle: 'Desarrollo de Aplicaciones Móviles con Flutter',
      ctaProjects: 'Explora Mis Proyectos',
      ctaHelp: 'Con Qué Puedo Ayudarte',
    },
    // About Section
    about: {
      title: 'Sobre Mí',
      paragraph1: 'Soy Mohamed Essam, un estudiante motivado de Desarrollo de Software especializado en desarrollo de aplicaciones móviles con Flutter. Disfruto transformando ideas en aplicaciones funcionales y mejorando continuamente mis habilidades técnicas y de resolución de problemas.',
      paragraph2: 'Tengo experiencia con Dart y C++, entiendo los conceptos de desarrollo móvil y tengo familiaridad básica con Linux y entornos de seguridad. A través de proyectos personales, he aprendido a construir características desde cero, depurar efectivamente y escribir código limpio y mantenible.',
      paragraph3: 'Más allá de las habilidades técnicas, valoro la comunicación clara, el trabajo en equipo y el profesionalismo. Mi objetivo actual es comenzar mi carrera como Desarrollador Flutter, donde pueda contribuir, aprender de desarrolladores experimentados y crecer como un profesional que entrega aplicaciones móviles de alta calidad.',
      closing: 'Ayudo a los clientes a convertir sus ideas en aplicaciones Flutter limpias y funcionales.',
    },
    // Skills Section
    skills: {
      title: 'Habilidades',
      coreSkills: 'Habilidades Principales',
      supportingSkills: 'Habilidades de Apoyo',
      softSkills: 'Habilidades Blandas',
      additional: 'Conocimiento Adicional',
      core: ['Flutter', 'Dart', 'Desarrollo de Aplicaciones Móviles'],
      supporting: ['C++', 'Desarrollo de Software', 'Resolución de Problemas'],
      soft: ['Comunicación en Inglés', 'Trabajo en Equipo', 'Inteligencia Emocional'],
      additionalText: 'Conocimiento básico de conceptos de seguridad y entornos Linux',
    },
    education: {
      title: 'Educación / Experiencia',
    },
    // Help Section
    help: {
      title: 'Con Qué Puedo Ayudarte',
      services: [
        'Construir aplicaciones Flutter desde cero',
        'Convertir diseños de UI en aplicaciones Flutter responsivas',
        'Corregir errores y optimizar aplicaciones Flutter existentes',
        'Agregar nuevas características a proyectos Flutter',
      ],
    },
    // Projects Section
    projects: {
      title: 'Proyectos',
      viewOnGitHub: 'Ver en GitHub',
      items: [
        {
          title: 'Cyber Task Manager',
          description: 'Una aplicación integral de gestión de tareas construida con Flutter, con creación de tareas, categorización y seguimiento de progreso.',
        },
        {
          title: 'Expense Tracker',
          description: 'Una aplicación de gestión de finanzas personales que ayuda a los usuarios a rastrear gastos, establecer presupuestos y visualizar patrones de gasto.',
        },
        {
          title: 'Library System',
          description: 'Un sistema de gestión de biblioteca digital para organizar libros, rastrear préstamos y gestionar cuentas de usuarios.',
        },
      ],
    },
    // Contact Section
    contact: {
      title: 'Contacto',
      cta: 'No dudes en contactarme para proyectos freelance o colaboración.',
      name: 'Nombre',
      email: 'Correo Electrónico',
      submit: 'Enviar',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      emailLabel: 'Correo Electrónico',
    },
    // Language
    language: {
      en: 'En',
      ar: 'Ar',
      es: 'Sp',
    },
  },
};

// Language order for cycling
export const languageCycle: Language[] = ['en', 'ar', 'es'];

// Get next language in cycle
export const getNextLanguage = (current: Language): Language => {
  const currentIndex = languageCycle.indexOf(current);
  const nextIndex = (currentIndex + 1) % languageCycle.length;
  return languageCycle[nextIndex];
};

// Get translation for a key path
export const getTranslation = (lang: Language, keyPath: string): string | string[] => {
  const keys = keyPath.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[lang];
  
  for (const key of keys) {
    if (value === undefined) return keyPath;
    value = value[key];
  }
  
  return value !== undefined ? value : keyPath;
};
