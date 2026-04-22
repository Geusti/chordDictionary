import { NOTES } from '../data/chords';

type NoteSelectorProps = {
  selectedNote: string;
  onSelectNote: (note: string) => void;
};

export default function NoteSelector({ selectedNote, onSelectNote }: NoteSelectorProps) {
  return (
    <nav className="bg-surface-container-low/50 sticky top-[72px] z-40 border-b border-slate-800/40 backdrop-blur-sm">
      <div className="flex overflow-x-auto hide-scrollbar px-6 py-4 gap-6 items-center">
        {NOTES.map((note) => (
          <button
            key={note}
            onClick={() => onSelectNote(note)}
            className={`flex-shrink-0 font-headline-md text-xl font-bold transition-colors ${
              selectedNote === note
                ? 'text-[#8B5CF6] border-b-2 border-[#8B5CF6] pb-1'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {note}
          </button>
        ))}
      </div>
    </nav>
  );
}
