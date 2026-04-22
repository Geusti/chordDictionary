import { BookOpen, Piano, BookText, Library } from 'lucide-react';

export default function BottomNav() {
  return (
    <footer className="bg-[#0F172A]/95 backdrop-blur-xl text-[#8B5CF6] font-['Lexend'] text-[10px] uppercase tracking-widest font-semibold border-t border-slate-800/50 rounded-t-lg shadow-[0_-4px_20px_rgba(0,0,0,0.4)] fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe z-50">
      <div className="flex flex-col items-center justify-center text-[#8B5CF6] bg-[#8B5CF6]/10 rounded-xl px-4 py-2 cursor-pointer transition-transform active:scale-95">
        <BookOpen className="w-6 h-6 mb-1" />
        <span>Dictionary</span>
      </div>
      <div className="flex flex-col items-center justify-center text-slate-500 hover:text-white cursor-pointer transition-all active:scale-95">
        <Piano className="w-6 h-6 mb-1" />
        <span>Practice</span>
      </div>
      <div className="flex flex-col items-center justify-center text-slate-500 hover:text-white cursor-pointer transition-all active:scale-95">
        <BookText className="w-6 h-6 mb-1" />
        <span>Theory</span>
      </div>
      <div className="flex flex-col items-center justify-center text-slate-500 hover:text-white cursor-pointer transition-all active:scale-95">
        <Library className="w-6 h-6 mb-1" />
        <span>Library</span>
      </div>
    </footer>
  );
}
