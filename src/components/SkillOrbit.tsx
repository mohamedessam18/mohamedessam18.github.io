import { type Language } from '../i18n';
import meImage from '../assets/me.png';

interface SkillOrbitProps {
  language: Language;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
}

const SkillOrbit = ({ language, activeCategory, setActiveCategory }: SkillOrbitProps) => {
  const isAr = language === 'ar';

  const orbits = [
    {
      id: 'flutter',
      labelEn: 'Flutter',
      labelAr: 'فلاتر',
      moon: 'BLoC',
      color: 'rgba(16, 185, 129, 1)', // Green
      glow: 'shadow-[0_0_12px_rgba(16,185,129,0.8)]',
      border: 'border-emerald-500/20',
      duration: '15s',
      radius: '65px',
      moonRadius: '20px',
      moonDuration: '4s'
    },
    {
      id: 'web',
      labelEn: 'Web Dev',
      labelAr: 'الويب',
      moon: 'React',
      color: 'rgba(6, 182, 212, 1)', // Cyan
      glow: 'shadow-[0_0_12px_rgba(6,182,212,0.8)]',
      border: 'border-cyan-500/20',
      duration: '22s',
      radius: '100px',
      moonRadius: '22px',
      moonDuration: '5s'
    },
    {
      id: 'db',
      labelEn: 'Database',
      labelAr: 'البيانات',
      moon: 'Supabase',
      color: 'rgba(168, 85, 247, 1)', // Purple
      glow: 'shadow-[0_0_12px_rgba(168,85,247,0.8)]',
      border: 'border-purple-500/20',
      duration: '28s',
      radius: '135px',
      moonRadius: '25px',
      moonDuration: '6s'
    },
    {
      id: 'practice',
      labelEn: 'Tooling',
      labelAr: 'الأدوات',
      moon: 'Git',
      color: 'rgba(59, 130, 246, 1)', // Blue
      glow: 'shadow-[0_0_12px_rgba(59,130,246,0.8)]',
      border: 'border-blue-500/20',
      duration: '35s',
      radius: '170px',
      moonRadius: '18px',
      moonDuration: '3s'
    }
  ];

  return (
    <div className="w-full relative h-[340px] flex items-center justify-center overflow-hidden border dark:border-slate-800/60 border-slate-200/80 rounded-2xl dark:bg-black/30 bg-slate-100/30 select-none">
      
      {/* 3D Container Wrapper with perspective Tilt */}
      <div 
        className="relative w-[340px] h-[340px] flex items-center justify-center"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Core Star (Mohamed Avatar) */}
        <div 
          className="absolute z-20 w-14 h-14 rounded-full flex items-center justify-center p-0.5 border border-cyan-500/40 bg-slate-950 shadow-[0_0_20px_rgba(var(--color-primary),0.5)] cursor-pointer hover:scale-115 transition-transform duration-300"
          onClick={() => setActiveCategory(null)}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <img src={meImage} alt="Mohamed Core" className="w-full h-full object-cover" />
          </div>
          <span className="absolute inset-0 rounded-full border border-cyan-500/60 animate-ping opacity-45" />
        </div>

        {/* CSS styles injection for keyframe orbits */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes orbit-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes reverse-spin {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .orbit-perspective {
            transform: rotateX(65deg) rotateY(-10deg);
            transform-style: preserve-3d;
          }
        `}} />

        {/* Render Concentric Orbits */}
        <div className="absolute inset-0 flex items-center justify-center orbit-perspective pointer-events-none">
          {orbits.map((orb) => {
            const isActive = activeCategory === orb.id;

            return (
              <div
                key={orb.id}
                className={`absolute rounded-full border border-dashed transition-all duration-300 ${orb.border}`}
                style={{
                  width: `calc(${orb.radius} * 2)`,
                  height: `calc(${orb.radius} * 2)`,
                  transformStyle: 'preserve-3d',
                  borderColor: isActive ? orb.color : '',
                  borderWidth: isActive ? '2px' : '1px',
                  boxShadow: isActive ? `0 0 15px ${orb.color} inset` : ''
                }}
              >
                {/* Orbit Spinner */}
                <div 
                  className="absolute inset-0"
                  style={{
                    animation: `orbit-spin ${orb.duration} linear infinite`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Planet Node */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategory(isActive ? null : orb.id);
                    }}
                    className={`absolute rounded-full flex flex-col items-center justify-center pointer-events-auto cursor-pointer hover:scale-115 transition-all duration-200 ${orb.glow}`}
                    style={{
                      width: '28px',
                      height: '28px',
                      left: '50%',
                      top: '0%',
                      marginLeft: '-14px',
                      marginTop: '-14px',
                      backgroundColor: orb.color,
                      transform: 'rotateX(-65deg) rotateY(10deg)', // Cancel orbit perspective for children
                      boxShadow: isActive ? `0 0 25px ${orb.color}, 0 0 10px #fff` : `0 0 10px ${orb.color}`
                    }}
                  >
                    {/* Planet Label */}
                    <span 
                      className="absolute -bottom-5 font-mono text-[8px] font-bold px-1 py-0.5 rounded text-white bg-black/80 border border-slate-700/50 shadow whitespace-nowrap"
                      style={{
                        animation: `reverse-spin ${orb.duration} linear infinite`,
                      }}
                    >
                      {isAr ? orb.labelAr : orb.labelEn}
                    </span>

                    {/* Orbiting Moon */}
                    <div 
                      className="absolute"
                      style={{
                        width: `calc(${orb.moonRadius} * 2)`,
                        height: `calc(${orb.moonRadius} * 2)`,
                        animation: `orbit-spin ${orb.moonDuration} linear infinite`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div
                        className="absolute w-2.5 h-2.5 rounded-full bg-slate-200 border border-white/20 shadow-[0_0_4px_#fff]"
                        style={{
                          left: '50%',
                          top: '0%',
                          marginLeft: '-5px',
                          marginTop: '-5px',
                        }}
                      >
                        {/* Moon Label */}
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[6px] text-gray-400 font-black whitespace-nowrap uppercase tracking-wider">
                          {orb.moon}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Orbit Tip details */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-cyan-500/70 text-center font-bold">
        {isAr ? 'مدارات المهارات ثلاثية الأبعاد 🪐' : '3D Skills Planetarium 🪐'}
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[8px] italic text-slate-500/80 text-center">
        {isAr ? 'اضغط على كوكب لتظليل بطاقة المهارات الموافقة له' : 'Click a planet to focus and highlight its details card'}
      </div>
    </div>
  );
};

export default SkillOrbit;
