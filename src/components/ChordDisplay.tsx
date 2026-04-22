import { useState, useRef } from 'react';
import { Lock } from 'lucide-react';
import type { ChordVariation } from '../data/chords';

type ChordDisplayProps = {
  variation: ChordVariation;
};

export default function ChordDisplay({ variation }: ChordDisplayProps) {
  const [playingButton, setPlayingButton] = useState<number | null>(null);
  
  const handlePlayAudio = (btnIndex: number) => {
    // Simulando áudio para agora
    setPlayingButton(btnIndex);
    
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      let freq = 261.63; // C4
      if (btnIndex === 2) freq = 329.63; // E4
      if (btnIndex === 3) freq = 392.00; // G4
      
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1.5);
      
      setTimeout(() => {
        setPlayingButton(null);
      }, 1500);
    } catch (e) {
      setTimeout(() => {
        setPlayingButton(null);
      }, 1000);
    }
  };

  const isLocked = variation.isLocked;

  return (
    <section 
      className={`glass-card rounded-2xl p-6 space-y-6 relative overflow-hidden ${
        isLocked ? 'opacity-80 scale-95 origin-top grayscale-[0.2]' : ''
      }`}
    >
      {!isLocked && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 blur-[60px] rounded-full z-0"></div>
      )}
      
      <div className="flex justify-between items-center relative z-10">
        <h3 className="text-xl font-semibold text-white">{variation.title}</h3>
        <span 
          className={`px-3 py-1 rounded-full text-xs font-bold border ${
            isLocked 
              ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container/40'
              : 'bg-tertiary/20 text-tertiary border-tertiary/40'
          }`}
        >
          {variation.tag}
        </span>
      </div>

      {/* Chord Image Container */}
      <div className="bg-slate-900 overflow-hidden rounded-xl border border-slate-700/50 shadow-inner relative z-10 flex flex-col">
        {/* Chord Photo */}
        <div className="w-full h-48 bg-slate-800 flex items-center justify-center">
          <img 
            src={variation.imageSrc} 
            alt={`Posição do Acorde - ${variation.title}`} 
            className={`w-full h-full object-cover ${isLocked ? 'opacity-80 mix-blend-luminosity' : ''}`}
          />
        </div>
        
        {/* Fingers Position Information */}
        <div className="bg-slate-900/90 py-4 px-4 flex flex-col gap-3 border-t border-slate-800">
          <div className="text-center text-sm text-slate-300 font-medium mb-1">POSIÇÃO DOS DEDOS:</div>
          <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></span>
              <span className="text-sm font-semibold text-slate-200">ESQUERDA: {variation.fingersLeft}</span>
            </div>
            <div className="w-px h-6 bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8C00] shadow-sm shadow-orange-500/50"></span>
              <span className="text-sm font-semibold text-slate-200">DIREITA: {variation.fingersRight}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <p className="text-on-surface-variant font-body-md text-base leading-relaxed">
          {variation.description}
        </p>

        {isLocked ? (
          <div className="flex flex-col gap-3 pt-2">
            <button className="flex items-center justify-center w-full p-4 rounded-xl bg-slate-800/80 text-slate-400 font-bold border border-slate-700/50 cursor-not-allowed">
              <span className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Desbloqueie para Ouvir
              </span>
            </button>
          </div>
        ) : (
          <div className="pt-2">
            <div className="text-center text-xs font-bold text-slate-400 tracking-widest mb-4">OUVIR SONS DO ACORDE</div>
            <div className="flex justify-center gap-6">
              {[1, 2, 3].map((num) => (
                <button 
                  key={num}
                  onClick={() => handlePlayAudio(num)}
                  className={`w-14 h-14 rounded-full border border-slate-600/50 text-white flex items-center justify-center font-bold text-xl shadow-lg transition-all duration-200 group ${
                    playingButton === num 
                      ? 'bg-[#8B5CF6] scale-95 shadow-[0_0_15px_rgba(139,92,246,0.6)]' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
