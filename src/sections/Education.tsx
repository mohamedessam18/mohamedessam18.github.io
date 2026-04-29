import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import {
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Layers,
  School,
} from 'lucide-react';

interface EducationProps {
  language: Language;
}

interface CourseLevel {
  level: string;
  courses: string[];
}

interface ExperienceItem {
  role: string;
  organization: string;
  type: string;
  date: string;
  highlights: string[];
}

interface EducationContent {
  universityLabel: string;
  universityName: string;
  summary: string;
  degreeLabel: string;
  degree: string;
  dateLabel: string;
  focusTitle: string;
  focusText: string;
  experienceTitle: string;
  coursesSuffix: string;
  experience: ExperienceItem;
  courseLevels: CourseLevel[];
}

const sharedCourseCodes = [
  ['English Language I (BS111)', 'Introduction to Computer Science (CS111)', 'Introduction to Programming (CS112)', 'Linear Algebra I (BS151)', 'Mathematical Analysis I (BS153)', 'Physics (BS141)', 'Applied Electronics (BS161)', 'Computer Skills (CS131)', 'Linear Algebra II (BS152)', 'Mathematical Analysis II (BS154)', 'Structured Programming (CS 113)', 'Technical Report Writing (BS 114)'],
  ['Discrete Mathematics (BS 251)', 'Logic Design (CS 221)', 'Object Oriented Programming I (CS 213)', 'Principles of Management (BS 231)', 'Probabilities & Statistics (BS253)', 'Professional Ethics & Legal Aspects (BS 221)', 'Algorithms and Data Structures (CS 231)', 'Data Communication & Protocols (CS241)', 'File Organization & Processing (CS232)', 'Modeling and Simulation (IS 241)', 'Object Oriented Programming II (CS 214)', 'Theory of Computation (CS 212)'],
  ['Computer Architecture (CS 321)', 'Computer Networks I (CS 341)', 'Database Systems I (IS 323)', 'Multimedia (CS 371)', 'Operating Systems I (CS 351)', 'Software Engineering I (CS 331)', 'Database Systems II (IS 324)', 'Analysis and Design of Information Systems I (IS 312)', 'Communication Technology (CS 363)', 'Internet Technologies (CS 362)', 'Logic Programming (CS 311)', 'Numerical Analysis (BS 351)'],
];

const educationContent: Record<Language, EducationContent> = {
  en: {
    universityLabel: 'University',
    universityName: 'Modern University For Technology and Information',
    summary: 'Computer Science student building a foundation across programming, mathematics, systems, databases, networks, and software engineering.',
    degreeLabel: 'Degree',
    degree: 'Computer Science',
    dateLabel: 'Date',
    focusTitle: 'Academic Focus',
    focusText: 'The coursework connects programming, computer systems, math, algorithms, databases, communication, and software engineering into one practical CS track.',
    experienceTitle: 'Experience',
    coursesSuffix: 'Courses',
    experience: {
      role: 'Cross-Platform Mobile App Developer Trainee',
      organization: 'Digital Egypt Pioneers Initiative (DEPI)',
      type: 'Scholarship Program Internship',
      date: 'December 2025 - May 2026',
      highlights: [
        'Mastered Dart fundamentals and advanced Flutter framework concepts for responsive Android and iOS apps.',
        'Integrated Firebase Authentication, Firestore, and Realtime Database for live sync, user management, and backend functionality.',
        'Designed intuitive UIs using UX/UI best practices, Material Design, and custom Flutter widgets.',
        'Applied state management solutions to keep clean architecture and stable responsiveness under changing data loads.',
        'Used Git and GitHub for version control, collaborative branching, code reviews, and release management.',
        'Wrote functional documentation and unit tests to validate business logic and improve maintainability.',
        'Led the capstone project from ideation and architecture to implementation and Google Play/App Store deployment.',
      ],
    },
    courseLevels: sharedCourseCodes.map((courses, index) => ({ level: `Level ${index + 1}`, courses })),
  },
  ar: {
    universityLabel: 'الجامعة',
    universityName: 'الجامعة الحديثة للتكنولوجيا والمعلومات',
    summary: 'طالب علوم حاسب يبني أساسا قويا في البرمجة والرياضيات والأنظمة وقواعد البيانات والشبكات وهندسة البرمجيات.',
    degreeLabel: 'الدرجة',
    degree: 'علوم الحاسب',
    dateLabel: 'الفترة',
    focusTitle: 'التركيز الأكاديمي',
    focusText: 'تربط المواد بين البرمجة وأنظمة الحاسب والرياضيات والخوارزميات وقواعد البيانات والاتصالات وهندسة البرمجيات داخل مسار عملي في علوم الحاسب.',
    experienceTitle: 'الخبرات',
    coursesSuffix: 'المقررات',
    experience: {
      role: 'متدرب تطوير تطبيقات موبايل متعددة المنصات',
      organization: 'مبادرة رواد مصر الرقمية (DEPI)',
      type: 'تدريب ضمن برنامج منحة',
      date: 'ديسمبر 2025 - مايو 2026',
      highlights: [
        'إتقان أساسيات Dart ومفاهيم Flutter المتقدمة لبناء تطبيقات Android و iOS متجاوبة.',
        'دمج Firebase Authentication و Firestore و Realtime Database للمزامنة المباشرة وإدارة المستخدمين ووظائف الخلفية.',
        'تصميم واجهات استخدام واضحة باستخدام أفضل ممارسات UX/UI و Material Design و widgets مخصصة.',
        'تطبيق حلول إدارة الحالة للحفاظ على بنية نظيفة واستجابة مستقرة مع اختلاف أحمال البيانات.',
        'استخدام Git و GitHub لإدارة الإصدارات والتفرعات التعاونية ومراجعة الكود وإدارة الإطلاقات.',
        'كتابة توثيق وظيفي واختبارات وحدات للتحقق من منطق الأعمال وتحسين قابلية الصيانة.',
        'قيادة مشروع التخرج من الفكرة والبنية إلى التنفيذ والنشر على Google Play و App Store.',
      ],
    },
    courseLevels: sharedCourseCodes.map((courses, index) => ({ level: `المستوى ${index + 1}`, courses })),
  },
  es: {
    universityLabel: 'Universidad',
    universityName: 'Universidad Moderna de Tecnologia e Informacion',
    summary: 'Estudiante de Ciencias de la Computacion construyendo una base en programacion, matematicas, sistemas, bases de datos, redes e ingenieria de software.',
    degreeLabel: 'Titulo',
    degree: 'Ciencias de la Computacion',
    dateLabel: 'Fecha',
    focusTitle: 'Enfoque Academico',
    focusText: 'El plan de estudios conecta programacion, sistemas informaticos, matematicas, algoritmos, bases de datos, comunicacion e ingenieria de software en una ruta practica de CS.',
    experienceTitle: 'Experiencia',
    coursesSuffix: 'Cursos',
    experience: {
      role: 'Aprendiz de Desarrollo de Apps Moviles Multiplataforma',
      organization: 'Digital Egypt Pioneers Initiative (DEPI)',
      type: 'Pasantia del Programa de Beca',
      date: 'Diciembre 2025 - Mayo 2026',
      highlights: [
        'Domine fundamentos de Dart y conceptos avanzados de Flutter para apps Android e iOS responsivas.',
        'Integre Firebase Authentication, Firestore y Realtime Database para sincronizacion en vivo, usuarios y backend.',
        'Disene interfaces intuitivas usando buenas practicas UX/UI, Material Design y widgets personalizados.',
        'Aplique gestion de estado para mantener arquitectura limpia y respuesta estable con diferentes cargas de datos.',
        'Use Git y GitHub para versiones, ramas colaborativas, revision de codigo y gestion de releases.',
        'Escribi documentacion funcional y pruebas unitarias para validar la logica de negocio y mejorar mantenimiento.',
        'Lidere el proyecto capstone desde la idea y arquitectura hasta implementacion y despliegue en Google Play/App Store.',
      ],
    },
    courseLevels: sharedCourseCodes.map((courses, index) => ({ level: `Nivel ${index + 1}`, courses })),
  },
};

const Education = ({ language }: EducationProps) => {
  const t = (key: string) => getTranslation(language, key);
  const content = educationContent[language];

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-12 text-center dark:text-white light:text-slate-800">
          <span className="dark:text-cyan-400 light:text-cyan-600">&lt;</span>
          {t('education.title') as string}
          <span className="dark:text-cyan-400 light:text-cyan-600">/&gt;</span>
        </h2>

        <div className="grid lg:grid-cols-[0.95fr_1.4fr] gap-6">
          <section className="space-y-6">
            <div className="p-6 rounded-lg border dark:bg-cyan-500/10 dark:border-cyan-500/30 light:bg-cyan-50/70 light:border-cyan-300/40">
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border font-mono dark:bg-black/40 dark:border-cyan-500/30 light:bg-white/80 light:border-cyan-300/50">
                  <div className="text-center leading-none">
                    <div className="text-2xl font-black dark:text-cyan-400 light:text-blue-700">MTI</div>
                    <div className="mt-1 h-1 w-10 mx-auto rounded-full dark:bg-emerald-400 light:bg-emerald-600" />
                  </div>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-2 text-sm font-mono dark:text-cyan-400 light:text-cyan-700">
                    <School size={16} />
                    {content.universityLabel}
                  </p>
                  <h3 className="text-2xl font-mono font-bold dark:text-white light:text-slate-800">
                    {content.universityName}
                  </h3>
                  <p className="mt-2 text-sm dark:text-gray-400 light:text-slate-600">{content.summary}</p>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded border dark:bg-black/30 dark:border-gray-700/50 light:bg-white/60 light:border-slate-300/50">
                  <GraduationCap size={20} className="mb-3 dark:text-green-400 light:text-emerald-600" />
                  <p className="text-xs font-mono uppercase dark:text-gray-500 light:text-slate-500">{content.degreeLabel}</p>
                  <p className="mt-1 font-mono dark:text-gray-200 light:text-slate-800">{content.degree}</p>
                </div>

                <div className="p-4 rounded border dark:bg-black/30 dark:border-gray-700/50 light:bg-white/60 light:border-slate-300/50">
                  <Calendar size={20} className="mb-3 dark:text-purple-400 light:text-violet-600" />
                  <p className="text-xs font-mono uppercase dark:text-gray-500 light:text-slate-500">{content.dateLabel}</p>
                  <p className="mt-1 font-mono dark:text-gray-200 light:text-slate-800">2023 - 2027</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded border dark:bg-black/30 dark:border-gray-700/50 light:bg-white/60 light:border-slate-300/50">
                <p className="flex items-center gap-2 text-sm font-mono font-bold dark:text-gray-300 light:text-slate-700">
                  <Layers size={18} className="dark:text-cyan-400 light:text-cyan-700" />
                  {content.focusTitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed dark:text-gray-400 light:text-slate-600">{content.focusText}</p>
              </div>
            </div>

            <div className="p-6 rounded-lg border dark:bg-green-500/10 dark:border-green-500/30 light:bg-emerald-50/70 light:border-emerald-300/40">
              <p className="flex items-center gap-2 text-sm font-mono font-bold dark:text-green-400 light:text-emerald-700">
                <BriefcaseBusiness size={18} />
                {content.experienceTitle}
              </p>
              <h3 className="mt-4 font-mono text-xl font-bold dark:text-white light:text-slate-800">{content.experience.role}</h3>
              <p className="mt-1 text-sm font-mono dark:text-cyan-400 light:text-cyan-700">{content.experience.organization}</p>
              <p className="mt-1 text-xs font-mono uppercase dark:text-gray-500 light:text-slate-500">{content.experience.type}</p>
              <p className="mt-3 flex items-center gap-2 text-sm dark:text-gray-400 light:text-slate-600">
                <Calendar size={16} className="dark:text-purple-400 light:text-violet-600" />
                {content.experience.date}
              </p>
              <div className="mt-4 space-y-2">
                {content.experience.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2 text-sm leading-relaxed dark:text-gray-400 light:text-slate-600">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 dark:text-green-400 light:text-emerald-600" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            {content.courseLevels.map((level) => (
              <div
                key={level.level}
                className="p-5 rounded-lg border transition-all duration-300 dark:bg-gray-900/50 dark:border-gray-700/50 dark:hover:border-cyan-500/40 light:bg-white/70 light:border-slate-300/50 light:hover:border-cyan-400/60 light:shadow-sm"
              >
                <h3 className="mb-4 flex items-center gap-2 font-mono text-lg font-bold dark:text-cyan-400 light:text-cyan-700">
                  <BookOpen size={20} />
                  {level.level} {content.coursesSuffix}
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {level.courses.map((course) => (
                    <div key={course} className="rounded px-3 py-2 text-sm dark:bg-black/30 dark:text-gray-300 light:bg-slate-50 light:text-slate-700">
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Education;
