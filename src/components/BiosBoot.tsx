import { useEffect, useState } from 'react';

interface BiosBootProps {
  onComplete: () => void;
}

const BiosBoot = ({ onComplete }: BiosBootProps) => {
  const [lines, setLines] = useState<string[]>([]);

  const bootSequence = [
    'MOHAMED ESSAM BIOS v2.86 (C) 2026',
    'CPU: AMD Ryzen 9 @ 4.80GHz - OK',
    'RAM: 16384 MB - OK',
    'MOUNTING /dev/sda1 (system/portfolio) - SUCCESS',
    'LOADING ASSETS (meLogo, mtiLogo) - OK',
    'INITIALIZING WEB ENGINE... OK',
    'STARTING APPLICATION SERVER... OK',
    'PORTFOLIO OS v1.0.0 STARTED SUCCESSFULLY.',
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < bootSequence.length) {
        setLines((prev) => [...prev, bootSequence[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300); // Fades out after a tiny pause at the end
      }
    }, 110);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-emerald-400 dark:text-green-400 font-mono text-[10px] sm:text-xs p-6 sm:p-12 z-[9999] flex flex-col justify-start select-none pointer-events-none leading-relaxed">
      <div className="space-y-1">
        {lines.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>
      {lines.length < bootSequence.length && (
        <span className="w-1.5 h-3.5 bg-emerald-400 dark:bg-green-400 inline-block animate-pulse mt-1" />
      )}
    </div>
  );
};

export default BiosBoot;
