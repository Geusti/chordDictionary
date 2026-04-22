import { useState } from 'react';
import Header from '../components/Header';
import NoteSelector from '../components/NoteSelector';
import HeroSection from '../components/HeroSection';
import ChordDisplay from '../components/ChordDisplay';
import BottomNav from '../components/BottomNav';
import { chordsData } from '../data/chords';

export default function Dictionary() {
  const [selectedNote, setSelectedNote] = useState('C');
  const currentData = chordsData[selectedNote];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24">
      <Header />
      
      <NoteSelector 
        selectedNote={selectedNote} 
        onSelectNote={setSelectedNote} 
      />

      <main className="max-w-md mx-auto px-6 pt-12 space-y-16">
        {currentData ? (
          <>
            <HeroSection 
              title={currentData.heroTitle}
              subtitle={currentData.heroSubtitle}
              tag={currentData.heroTag}
            />
            
            {currentData.variations.map((variation) => (
              <ChordDisplay key={variation.id} variation={variation} />
            ))}
          </>
        ) : (
          <div className="text-center text-slate-400 py-20">
            <h2 className="text-2xl font-bold text-white mb-2">Em breve...</h2>
            <p>Os acordes para a nota {selectedNote} ainda estão sendo adicionados ao dicionário.</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
