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
      education: 'Education',
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
      highlights: [
        { title: 'Flutter & Dart', description: 'Specialized in mobile app development' },
        { title: 'C++ & Linux', description: 'Systems programming basics' },
        { title: 'Teamwork', description: 'Collaborative development' },
        { title: 'Problem Solving', description: 'Analytical thinking' }
      ],
      stats: {
        projectsVal: '6+',
        projectsLbl: 'Projects Completed',
        languagesVal: '3',
        languagesLbl: 'Languages Spoken',
        experienceVal: '1+',
        experienceLbl: 'Year Internship/Exp',
        coursesVal: '36',
        coursesLbl: 'CS Courses Done',
      }
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
      additionalText2: 'Web, Flutter, databases, data structures, and deployment knowledge shaped through university work and personal projects.',
      categories: {
        flutter: {
          title: 'Flutter Skills',
          summary: 'Dart, widgets, state management, architecture, backend integration, testing, and deployment.',
          items: [
            'Dart, OOP, mixins, interfaces, null safety',
            'Future, async/await, and Streams',
            'Functional collection methods: map, where, fold',
            'Rows, Columns, Stack, Container, Flex, responsive UI',
            'Material, Cupertino, CustomPainter, Canvas',
            'Provider, Riverpod, BLoC, GetX, Signals',
            'Clean Architecture, MVVM, Repository Pattern',
            'REST APIs with Dio/http and JSON serialization',
            'SQLite, Hive, Isar, Firebase, Supabase',
            'Animations, Platform Channels, packages, profiling',
            'CI/CD, app store releases, unit and widget testing'
          ]
        },
        web: {
          title: 'Web Skills',
          summary: 'Frontend foundations and React experience for modern web interfaces.',
          items: [
            'HTML',
            'CSS',
            'JavaScript',
            'Experience with React'
          ]
        },
        db: {
          title: 'Database and Structures',
          summary: 'Strong CS fundamentals for data modeling and efficient problem solving.',
          items: [
            'Database systems and data modeling',
            'Data structures using C++',
            'Data structures using Dart',
            'Algorithms and problem solving'
          ]
        },
        practice: {
          title: 'Development Practice',
          summary: 'The supporting workflow skills that keep projects maintainable.',
          items: [
            'Git and GitHub project workflow',
            'Debugging and performance profiling',
            'Testing business logic and UI behavior',
            'Clean, maintainable software development'
          ]
        }
      }
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
      ctaTitle: "Have a project in mind? Let's discuss how I can help.",
      getInTouch: "Get In Touch",
    },
    // Projects Section
    projects: {
      title: 'Projects',
      viewOnGitHub: 'View All Projects on GitHub',
      cyberTaskManager: {
        title: 'Cyber Task Manager',
        description: 'A comprehensive task management application built with Flutter, featuring task creation, categorization, and progress tracking.',
        categories: { all: 'All', work: 'Work', personal: 'Personal', security: 'Security' },
        tasks: {
          audit: 'Review Security Logs',
          plugins: 'Update Flutter Plugins',
          refactor: 'Refactor State Management',
          tests: 'Write Integration Tests'
        },
        progress: 'Overall Progress',
        addTask: 'Add New Task',
      },
      numericalAnalysisCalc: {
        title: 'Numerical Analysis Calc',
        description: 'A clean calculator workspace for numerical analysis methods, root-finding algorithms, linear algebra methods, iteration tables, saved examples, history, and graph output.',
        equation: 'Equation',
        calculate: 'Calculate',
        iteration: 'Iter',
        value: 'Value',
        error: 'Error',
        method: 'Newton-Raphson Solver',
      },
      expenseTracker: {
        title: 'Expense Tracker',
        description: 'A personal finance management app that helps users track expenses, set budgets, and visualize spending patterns.',
        balance: 'Total Balance',
        income: 'Income',
        expense: 'Expense',
        transactions: {
          groceries: 'Grocery Store',
          coffee: 'Coffee Shop',
          saas: 'GitHub Copilot',
          salary: 'Freelance Design'
        },
        budget: 'Monthly Budget'
      },
      quranAyahGenerator: {
        title: 'Quran Ayah Generator',
        description: 'A multilingual Quran experience where users generate random ayahs, hear a random reciter, save loved ayahs, replay favorites, generate again, and translate ayahs into Arabic, English, Spanish, or Indonesian.',
        generate: 'Generate Ayah',
        reciter: 'Reciter',
        play: 'Play Recitation',
        pause: 'Pause Recitation',
        favorite: 'Add to Favorites',
        ayahText1: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        ayahTranslation1: 'It is You we worship and You we ask for help.',
        ayahText2: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
        ayahTranslation2: 'And say, "My Lord, increase me in knowledge."',
        ayahText3: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        ayahTranslation3: 'Indeed, with hardship [will be] ease.',
      },
      bankSystem: {
        title: 'Bank System',
        description: 'A banking system project with a live frontend and a Visual Studio desktop project, focused on account and transaction workflows with a fintech-style presentation.',
        balance: 'Card Balance',
        cardHolder: 'Card Holder',
        transfer: 'Quick Transfer',
        transactions: 'Recent Transactions',
        send: 'Send Money',
        rent: 'Apartment Rent',
        salary: 'Monthly Salary',
        invest: 'Stock Investment'
      },
      librarySystem: {
        title: 'Library System',
        description: 'A digital library management system for organizing books, tracking loans, and managing user accounts.',
        search: 'Search Books...',
        status: 'Loan Status',
        available: 'Available',
        borrowed: 'Borrowed',
        return: 'Return',
        borrow: 'Borrow',
        book1: 'Clean Code: A Handbook',
        book2: 'Flutter in Action',
        book3: 'Introduction to Algorithms',
        book4: 'Design Patterns Elements'
      }
    },
    // Contact Section
    contact: {
      title: 'Contact',
      cta: 'Feel free to reach out for freelance projects or collaboration.',
      name: 'Name',
      email: 'Email',
      message: 'Your Message',
      submit: 'Submit',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      emailLabel: 'Email',
      downloadCV: 'Download CV',
      success: "Thank you! I'll get back to you soon.",
      error: "Something went wrong. Please try again.",
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
      education: 'التعليم',
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
      highlights: [
        { title: 'Flutter & Dart', description: 'متخصص في تطوير تطبيقات الجوال' },
        { title: 'C++ & Linux', description: 'أساسيات برمجة الأنظمة' },
        { title: 'العمل الجماعي', description: 'التطوير التعاوني المشترك' },
        { title: 'حل المشكلات', description: 'التفكير التحليلي والمنطقي' }
      ],
      stats: {
        projectsVal: '6+',
        projectsLbl: 'مشاريع مكتملة',
        languagesVal: '3',
        languagesLbl: 'لغات تواصل',
        experienceVal: '1+',
        experienceLbl: 'سنة خبرة/تدريب',
        coursesVal: '36',
        coursesLbl: 'مقررات علوم حاسب',
      }
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
      additionalText2: 'معرفة بالويب، الـ Flutter، قواعد البيانات، هياكل البيانات، ومفاهيم النشر التي تشكلت من خلال المشاريع الجامعية والشخصية.',
      categories: {
        flutter: {
          title: 'مهارات Flutter',
          summary: 'تتضمن لغة Dart، والـ widgets، وإدارة الحالة، والمعمارية، والربط بالخلفية، والاختبار، والنشر.',
          items: [
            'لغة Dart، البرمجة كائنية التوجه OOP، الـ mixins، الواجهات، الأمان ضد القيم الفارغة null safety',
            'برمجة الـ Future والـ async/await والمجاري Streams',
            'طرق المجموعات الوظيفية: map، where، fold',
            'الـ Rows، Columns، Stack، Container، Flex والـ UI المتجاوب',
            'مكتبات Material، Cupertino، والـ CustomPainter والـ Canvas',
            'إدارة الحالة باستخدام Provider، Riverpod، BLoC، GetX، Signals',
            'المعمارية النظيفة Clean Architecture، MVVM، ونمط المستودع Repository Pattern',
            'ربط REST APIs باستخدام Dio/http والتسلسل JSON',
            'قواعد البيانات SQLite، Hive، Isar والربط مع Firebase، Supabase',
            'التحريكات، Platform Channels، الحزم وتوصيف الأداء',
            'أدوات CI/CD، وإصدارات المتاجر، واختبارات الوحدة والـ widgets'
          ]
        },
        web: {
          title: 'مهارات الويب',
          summary: 'أساسيات الواجهة الأمامية وخبرة في مكتبة React لبناء واجهات ويب حديثة.',
          items: [
            'HTML',
            'CSS',
            'JavaScript',
            'خبرة في مكتبة React'
          ]
        },
        db: {
          title: 'قواعد البيانات وبنى المعطيات',
          summary: 'أساسيات قوية في علوم الحاسب لنمذجة البيانات وحل المشكلات بكفاءة.',
          items: [
            'أنظمة قواعد البيانات ونمذجة البيانات',
            'بنى البيانات باستخدام لغة C++',
            'بنى البيانات باستخدام لغة Dart',
            'الخوارزميات وحل المشكلات'
          ]
        },
        practice: {
          title: 'ممارسات التطوير والعمليات',
          summary: 'مهارات سير العمل الداعمة التي تحافظ على سهولة صيانة المشاريع.',
          items: [
            'سير العمل والمشاريع باستخدام Git و GitHub',
            'تنقيح الأخطاء وفحص الأداء وتحليله',
            'اختبار منطق الأعمال وسلوك واجهة المستخدم',
            'تطوير البرمجيات النظيفة وسهلة الصيانة'
          ]
        }
      }
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
      ctaTitle: 'هل لديك مشروع في الحسبان؟ دعنا نناقش كيف يمكنني المساعدة.',
      getInTouch: 'تواصل معي',
    },
    // Projects Section
    projects: {
      title: 'المشاريع',
      viewOnGitHub: 'عرض جميع المشاريع على GitHub',
      cyberTaskManager: {
        title: 'مدير المهام السيبراني',
        description: 'تطبيق شامل لإدارة المهام مبني باستخدام Flutter، يتميز بإنشاء المهام وتصنيفها وتتبع التقدم.',
        categories: { all: 'الكل', work: 'العمل', personal: 'شخصي', security: 'الأمان' },
        tasks: {
          audit: 'مراجعة سجلات الأمان',
          plugins: 'تحديث إضافات Flutter',
          refactor: 'إعادة بناء إدارة الحالة',
          tests: 'كتابة اختبارات التكامل'
        },
        progress: 'التقدم العام',
        addTask: 'إضافة مهمة جديدة',
      },
      numericalAnalysisCalc: {
        title: 'حاسبة التحليل العددي',
        description: 'مساحة عمل نظيفة للحاسبة لطرق التحليل العددي، وخوارزميات إيجاد الجذور، وطرق الجبر الخطي، وجداول التكرار، والأمثلة المحفوظة، والسجل، ومخرجات الرسوم البيانية.',
        equation: 'المعادلة',
        calculate: 'احسب',
        iteration: 'تكرار',
        value: 'القيمة',
        error: 'الخطأ',
        method: 'محلل نيوتن-رافسون',
      },
      expenseTracker: {
        title: 'متتبع المصروفات',
        description: 'تطبيق ويب للتمويل الشخصي يعتمد أولاً على التخزين المحلي لإدارة الدخل والمصروفات مع سير عمل متعدد الصفحات، وتخزين مستمر، وطرق عرض تركز على التحليلات، وواجهة مستخدم مصقولة للتكنولوجيا المالية.',
        balance: 'الرصيد الإجمالي',
        income: 'الدخل',
        expense: 'المصروفات',
        transactions: {
          groceries: 'متجر البقالة',
          coffee: 'مقهى',
          saas: 'اشتراك Copilot',
          salary: 'تصميم حر'
        },
        budget: 'الميزانية الشهرية'
      },
      quranAyahGenerator: {
        title: 'مولد آيات القرآن',
        description: 'تجربة قرآنية متعددة اللغات حيث يقوم المستخدمون بتوليد آيات عشوائية، والاستماع إلى قارئ عشوائي، وحفظ الآيات المفضلة، وإعادة تشغيل المفضلة، والتوليد مجدداً، وترجمة الآيات إلى العربية، الإنجليزية، الإسبانية، أو الإندونيسية.',
        generate: 'توليد آية',
        reciter: 'القارئ',
        play: 'تشغيل التلاوة',
        pause: 'إيقاف التلاوة',
        favorite: 'إضافة للمفضلة',
        ayahText1: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        ayahTranslation1: 'إياك نعبد وإياك نستعين.',
        ayahText2: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
        ayahTranslation2: 'وقل رب زدني علماً.',
        ayahText3: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        ayahTranslation3: 'إن مع العسر يسراً.',
      },
      bankSystem: {
        title: 'النظام المصرفي',
        description: 'مشروع نظام مصرفي مع واجهة أمامية حية ومشروع مكتب في Visual Studio، يركز على سير عمل الحسابات والمعاملات مع عرض بأسلوب التكنولوجيا المالية.',
        balance: 'رصيد البطاقة',
        cardHolder: 'صاحب البطاقة',
        transfer: 'تحويل سريع',
        transactions: 'المعاملات الأخيرة',
        send: 'إرسال الأموال',
        rent: 'إيجار الشقة',
        salary: 'الراتب الشهري',
        invest: 'استثمار الأسهم'
      },
      librarySystem: {
        title: 'نظام المكتبة',
        description: 'نظام إدارة مكتبة رقمي لتنظيم الكتب وتتبع الإعارات وإدارة حسابات المستخدمين.',
        search: 'البحث عن كتب...',
        status: 'حالة الإعارة',
        available: 'متاح',
        borrowed: 'مستعار',
        return: 'إرجاع',
        borrow: 'استعارة',
        book1: 'الكود النظيف: دليل مبسط',
        book2: 'Flutter في العمل',
        book3: 'مقدمة في الخوارزميات',
        book4: 'أنماط التصميم البرمجي'
      }
    },
    // Contact Section
    contact: {
      title: 'تواصل',
      cta: 'لا تتردد في التواصل للمشاريع الحرة أو التعاون.',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'رسالتك',
      submit: 'إرسال',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      emailLabel: 'البريد الإلكتروني',
      downloadCV: 'تحميل السيرة الذاتية',
      success: 'شكراً لك! سأتواصل معك قريباً.',
      error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
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
      education: 'Educación',
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
      highlights: [
        { title: 'Flutter & Dart', description: 'Especializado en desarrollo móvil' },
        { title: 'C++ & Linux', description: 'Bases de programación de sistemas' },
        { title: 'Trabajo en Equipo', description: 'Desarrollo colaborativo' },
        { title: 'Resolución de Problemas', description: 'Pensamiento analítico' }
      ],
      stats: {
        projectsVal: '6+',
        projectsLbl: 'Proyectos Completados',
        languagesVal: '3',
        languagesLbl: 'Idiomas Hablados',
        experienceVal: '1+',
        experienceLbl: 'Año de Prácticas/Exp',
        coursesVal: '36',
        coursesLbl: 'Cursos de CS',
      }
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
      additionalText2: 'Conocimientos de Web, Flutter, bases de datos, estructuras de datos y despliegue desarrollados a través de proyectos universitarios y personales.',
      categories: {
        flutter: {
          title: 'Habilidades de Flutter',
          summary: 'Dart, widgets, gestión de estados, arquitectura, integración backend, pruebas y despliegue.',
          items: [
            'Dart, OOP, mixins, interfaces, seguridad nula null safety',
            'Programación asíncrona con Future, async/await y Streams',
            'Métodos funcionales de colección: map, where, fold',
            'Rows, Columns, Stack, Container, Flex, interfaces responsivas',
            'Material, Cupertino, CustomPainter, Canvas',
            'Provider, Riverpod, BLoC, GetX, Signals',
            'Arquitectura Limpia, MVVM, Patrón de Repositorio',
            'REST APIs con Dio/http y serialización JSON',
            'SQLite, Hive, Isar, Firebase, Supabase',
            'Animaciones, Platform Channels, paquetes, perfilado',
            'CI/CD, lanzamientos en tiendas, pruebas de unidad y widgets'
          ]
        },
        web: {
          title: 'Habilidades Web',
          summary: 'Fundamentos de frontend y experiencia con React para interfaces web modernas.',
          items: [
            'HTML',
            'CSS',
            'JavaScript',
            'Experiencia con React'
          ]
        },
        db: {
          title: 'Bases de Datos y Estructuras',
          summary: 'Sólidos fundamentos de ciencias de la computación para modelado de datos y resolución eficiente de problemas.',
          items: [
            'Sistemas de bases de datos y modelado de datos',
            'Estructuras de datos usando C++',
            'Estructuras de datos usando Dart',
            'Algoritmos y resolución de problemas'
          ]
        },
        practice: {
          title: 'Práctica de Desarrollo',
          summary: 'Habilidades de flujo de trabajo de soporte que mantienen los proyectos legibles.',
          items: [
            'Flujo de trabajo de proyectos Git y GitHub',
            'Depuración y perfilado de rendimiento',
            'Prueba de lógica de negocio y comportamiento de UI',
            'Desarrollo de software limpio y mantenible'
          ]
        }
      }
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
      ctaTitle: '¿Tienes un proyecto en mente? Hablemos de cómo puedo ayudarte.',
      getInTouch: 'Ponte en Contacto',
    },
    // Projects Section
    projects: {
      title: 'Proyectos',
      viewOnGitHub: 'Ver todos en GitHub',
      cyberTaskManager: {
        title: 'Cyber Task Manager',
        description: 'Una aplicación integral de gestión de tareas construida con Flutter, con creación de tareas, categorización y seguimiento de progreso.',
        categories: { all: 'Todo', work: 'Trabajo', personal: 'Personal', security: 'Seguridad' },
        tasks: {
          audit: 'Revisar Logs de Seguridad',
          plugins: 'Actualizar Plugins Flutter',
          refactor: 'Refactorizar Estado',
          tests: 'Escribir Pruebas Integradas'
        },
        progress: 'Progreso General',
        addTask: 'Añadir Nueva Tarea',
      },
      numericalAnalysisCalc: {
        title: 'Calculadora de Análisis Numérico',
        description: 'Un espacio de trabajo de calculadora para métodos de análisis numérico, algoritmos de búsqueda de raíces, métodos de álgebra lineal, tablas de iteración, ejemplos guardados, historial y salida de gráficos.',
        equation: 'Ecuación',
        calculate: 'Calcular',
        iteration: 'Iter',
        value: 'Valor',
        error: 'Error',
        method: 'Método Newton-Raphson',
      },
      expenseTracker: {
        title: 'Gestor de Gastos',
        description: 'Una aplicación web de finanzas personales local-first para gestionar ingresos y gastos con flujos de trabajo de varias páginas, almacenamiento persistente, vistas de análisis y una interfaz de usuario de tecnología financiera.',
        balance: 'Balance Total',
        income: 'Ingresos',
        expense: 'Gastos',
        transactions: {
          groceries: 'Supermercado',
          coffee: 'Cafetería',
          saas: 'GitHub Copilot',
          salary: 'Diseño Freelance'
        },
        budget: 'Presupuesto Mensual'
      },
      quranAyahGenerator: {
        title: 'Generador de Aleyas del Corán',
        description: 'Una experiencia coránica multilingüe donde los usuarios generan aleyas aleatorias, escuchan a un recitador aleatorio, guardan aleyas favoritas, reproducen favoritos, generan de nuevo y traducen aleyas al árabe, inglés, español o indonesio.',
        generate: 'Generar Aleya',
        reciter: 'Recitador',
        play: 'Reproducir Recitación',
        pause: 'Pausar Recitación',
        favorite: 'Añadir a Favoritos',
        ayahText1: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        ayahTranslation1: 'Solo a Ti te adoramos y solo a Ti te pedimos ayuda.',
        ayahText2: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
        ayahTranslation2: 'Y di: "¡Señor mío! Acrecienta mi conocimiento."',
        ayahText3: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        ayahTranslation3: 'Porque, ciertamente, con la dificultad hay facilidad.',
      },
      bankSystem: {
        title: 'Sistema Bancario',
        description: 'Un proyecto de sistema bancario con una interfaz frontend en vivo y un proyecto de escritorio de Visual Studio, centrado en flujos de trabajo de cuentas y transacciones con una presentación de estilo fintech.',
        balance: 'Balance de Tarjeta',
        cardHolder: 'Titular de Tarjeta',
        transfer: 'Transferencia Rápida',
        transactions: 'Transacciones Recientes',
        send: 'Enviar Dinero',
        rent: 'Alquiler Departamento',
        salary: 'Salario Mensual',
        invest: 'Inversión en Bolsa'
      },
      librarySystem: {
        title: 'Sistema de Biblioteca',
        description: 'Un sistema de gestión de biblioteca digital para organizar libros, rastrear préstamos y gestionar cuentas de usuarios.',
        search: 'Buscar Libros...',
        status: 'Estado de Préstamo',
        available: 'Disponible',
        borrowed: 'Prestado',
        return: 'Devolver',
        borrow: 'Prestar',
        book1: 'Código Limpio: Manual',
        book2: 'Flutter en Acción',
        book3: 'Introducción a Algoritmos',
        book4: 'Patrones de Diseño'
      }
    },
    // Contact Section
    contact: {
      title: 'Contacto',
      cta: 'No dudes en contactarme para proyectos freelance o colaboración.',
      name: 'Nombre',
      email: 'Correo Electrónico',
      message: 'Tu Mensaje',
      submit: 'Enviar',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      emailLabel: 'Correo Electrónico',
      downloadCV: 'Descargar CV',
      success: '¡Gracias! Me pondré en contacto contigo pronto.',
      error: 'Algo salió mal. Por favor, inténtelo de nuevo.',
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
