import { motion } from 'framer-motion';
import type { Language } from '../i18n';

interface SkillRadarProps {
  language: Language;
}

interface RadarData {
  axis: string;
  value: number; // Percentage from 0 to 1
  label: string;
}

const SkillRadar = ({ language }: SkillRadarProps) => {
  const radarData: RadarData[] = [
    { axis: 'mobile', value: 0.95, label: language === 'ar' ? 'تطوير الجوال (Flutter)' : 'Mobile Dev (Flutter)' },
    { axis: 'web', value: 0.80, label: language === 'ar' ? 'تطوير الويب (React)' : 'Web Dev (React)' },
    { axis: 'backend', value: 0.85, label: language === 'ar' ? 'قواعد البيانات (Supabase)' : 'Backend & DBs' },
    { axis: 'oop', value: 0.90, label: language === 'ar' ? 'المنطق والـ OOP' : 'OOP & Logic' },
    { axis: 'systems', value: 0.75, label: language === 'ar' ? 'الأنظمة والـ C++' : 'Systems & C++' },
    { axis: 'git', value: 0.85, label: language === 'ar' ? 'إدارة الشيفرة (Git)' : 'Git & Tooling' },
  ];

  const size = 300;
  const center = size / 2;
  const r = size * 0.35; // Maximum radius

  // Calculate coordinates for a given axis, value (0-1)
  const getCoordinates = (index: number, val: number) => {
    const angle = (index * 2 * Math.PI) / 6 - Math.PI / 2;
    const x = center + r * val * Math.cos(angle);
    const y = center + r * val * Math.sin(angle);
    return { x, y };
  };

  // Concentric levels (webs)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Draw web polygon paths
  const getWebPath = (levelVal: number) => {
    const points = radarData.map((_, idx) => {
      const { x, y } = getCoordinates(idx, levelVal);
      return `${x},${y}`;
    });
    return points.join(' ') + ' ' + points[0];
  };

  // Active data polygon points
  const dataPoints = radarData.map((d, idx) => {
    const { x, y } = getCoordinates(idx, d.value);
    return `${x},${y}`;
  }).join(' ');

  // Get active accent color (Hex) for hover/active points
  const getAccentHex = () => {
    const body = document.body;
    if (body.classList.contains('theme-emerald')) return '#10b981';
    if (body.classList.contains('theme-amethyst')) return '#a855f7';
    if (body.classList.contains('theme-amber')) return '#f59e0b';
    return '#06b6d4'; // Default Cyan
  };

  const accentColor = getAccentHex();

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full select-none">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="max-w-[280px] sm:max-w-[320px] filter drop-shadow-[0_0_15px_rgba(var(--color-primary),0.15)]"
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity={0.4} />
            <stop offset="100%" stopColor={accentColor} stopOpacity={0.05} />
          </radialGradient>
        </defs>

        {/* Concentric grid lines */}
        {levels.map((level, idx) => (
          <polygon
            key={idx}
            points={getWebPath(level)}
            className="fill-none stroke-slate-300/30 dark:stroke-slate-800/40"
            strokeWidth="0.8"
          />
        ))}

        {/* Axis lines */}
        {radarData.map((_, idx) => {
          const outer = getCoordinates(idx, 1);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              className="stroke-slate-300/20 dark:stroke-slate-800/30"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Glowing Data Area */}
        <motion.polygon
          points={dataPoints}
          className="stroke-[1.5] cursor-pointer"
          style={{
            stroke: accentColor,
            fill: 'url(#radarGlow)',
          }}
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.2 }}
        />

        {/* Axis Labels */}
        {radarData.map((d, idx) => {
          const pos = getCoordinates(idx, 1.25);
          // Small adjustments for label alignment
          const textAnchor =
            pos.x > center + 10 ? 'start' : pos.x < center - 10 ? 'end' : 'middle';
          const dy = pos.y > center + 10 ? '0.6em' : pos.y < center - 10 ? '-0.2em' : '0.2em';

          return (
            <text
              key={idx}
              x={pos.x}
              y={pos.y}
              dy={dy}
              textAnchor={textAnchor}
              className="font-mono text-[9px] font-bold fill-slate-600 dark:fill-gray-400"
            >
              {d.label}
            </text>
          );
        })}

        {/* Core center dot */}
        <circle cx={center} cy={center} r={3} style={{ fill: accentColor }} className="opacity-80" />
      </svg>
    </div>
  );
};

export default SkillRadar;
