import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pin } from 'lucide-react';
import { type Language } from '../i18n';

interface Note {
  id: number;
  textEn: string;
  textAr: string;
  x: number;
  y: number;
  color: string; // custom rotation or color
}

const DEFAULT_NOTES: Note[] = [
  {
    id: 1,
    textEn: "Availability: Open to Flutter Developer intern & junior roles! Cairo or Remote. 🚀",
    textAr: "التوافر: متاح لعروض التدريب والتوظيف كـ Flutter Developer! في القاهرة أو عن بُعد. 🚀",
    x: 80,
    y: 120,
    color: 'from-amber-200/90 to-yellow-300/80 dark:from-yellow-950/80 dark:to-amber-900/70 border-yellow-500/30 text-yellow-900 dark:text-yellow-100',
  },
  {
    id: 2,
    textEn: "Dev Rule #1: If it works, do NOT touch it! Even if it is held together by comments. 🤫",
    textAr: "القاعدة البرمجية #1: إذا كان الكود يعمل، لا تلمسه أبداً! حتى لو كان يعمل بالمعجزة. 🤫",
    x: 180,
    y: 350,
    color: 'from-cyan-200/90 to-blue-300/80 dark:from-cyan-950/80 dark:to-blue-900/70 border-cyan-500/30 text-cyan-900 dark:text-cyan-100',
  },
  {
    id: 3,
    textEn: "Caffeine Status: 3 cups consumed today. App compiler running at peak performance. ☕",
    textAr: "حالة الكافيين: تم استهلاك 3 أكواب قهوة اليوم. المترجم يعمل بكفاءة قصوى. ☕",
    x: 500,
    y: 200,
    color: 'from-purple-200/90 to-fuchsia-300/80 dark:from-purple-950/80 dark:to-fuchsia-900/70 border-purple-500/30 text-purple-900 dark:text-purple-100',
  },
];

interface StickyNotesProps {
  language: Language;
}

const StickyNotes = ({ language }: StickyNotesProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [notes, setNotes] = useState<Note[]>(DEFAULT_NOTES);

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const { show } = (e as CustomEvent).detail;
      setIsVisible(show);
    };

    window.addEventListener('sticky-notes-toggle', handleToggle);
    return () => {
      window.removeEventListener('sticky-notes-toggle', handleToggle);
    };
  }, []);

  const closeNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    // Only spawn note if double clicking the background overlay
    if ((e.target as HTMLElement).classList.contains('notes-overlay-layer')) {
      const id = Date.now();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left - 100;
      const y = e.clientY - rect.top - 80;
      
      const newNote: Note = {
        id,
        textEn: "Double-click to edit! Drag me anywhere on the page.",
        textAr: "انقر مرتين لتعديل النص! اسحبني لأي مكان في الصفحة.",
        x: Math.max(20, Math.min(x, window.innerWidth - 240)),
        y: Math.max(20, Math.min(y, window.innerHeight - 200)),
        color: 'from-emerald-200/90 to-green-300/80 dark:from-emerald-950/80 dark:to-green-900/70 border-emerald-500/30 text-emerald-900 dark:text-emerald-100',
      };
      setNotes([...notes, newNote]);
    }
  };

  const updateNoteText = (id: number, text: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, textEn: text, textAr: text }
          : note
      )
    );
  };

  const isAr = language === 'ar';

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          onDoubleClick={handleDoubleClick}
          className="fixed inset-0 z-[9990] pointer-events-none notes-overlay-layer"
        >
          {/* Draggable Note cards */}
          {notes.map((note) => {
            return (
              <motion.div
                key={note.id}
                drag
                dragMomentum={true}
                dragElastic={0.05}
                initial={{ opacity: 0, scale: 0.8, x: note.x, y: note.y }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute w-52 sm:w-56 p-4 rounded-2xl border shadow-xl pointer-events-auto cursor-grab active:cursor-grabbing bg-gradient-to-br select-text`}
                style={{
                  x: note.x,
                  y: note.y,
                }}
              >
                {/* Note pin decoration */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-red-500/60 dark:text-red-400/40 select-none">
                  <Pin size={14} className="rotate-12" />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => closeNote(note.id)}
                  className="absolute top-2 right-2 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors"
                  aria-label="Delete note"
                >
                  <X size={12} />
                </button>

                {/* Text Content */}
                <textarea
                  value={isAr ? note.textAr : note.textEn}
                  onChange={(e) => updateNoteText(note.id, e.target.value)}
                  className="w-full bg-transparent border-none outline-none resize-none font-mono text-[10px] sm:text-xs leading-relaxed focus:ring-0 p-0 text-center font-bold mt-2"
                  rows={4}
                  style={{ color: 'inherit' }}
                />
              </motion.div>
            );
          })}

          {/* Draggable indicator tip */}
          {notes.length === 0 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 p-2 px-4 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[9px] text-center shadow-lg pointer-events-auto">
              {isAr ? 'انقر نقراً مزدوجاً على الشاشة لإضافة ملاحظة لاصقة جديدة 📌' : 'Double click anywhere on screen to spawn a sticky note 📌'}
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default StickyNotes;
export const toggleStickyNotes = (show: boolean) => {
  const event = new CustomEvent('sticky-notes-toggle', { detail: { show } });
  window.dispatchEvent(event);
};
