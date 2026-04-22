const fs = require('fs');

const scaleNotes = {
  'C': ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
  'D': ['D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B', 'C', 'C#'],
  'E': ['E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'D#'],
  'F': ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E'],
  'G': ['G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#'],
  'A': ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#'],
  'B': ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#']
};

const templates = [
  { id: 'maj7', suffix: 'maj7', tag: 'Paz / Leveza', intervals: [0, 4, 7, 11], desc: 'Transmite um sentimento de paz, leveza e resolução.' },
  { id: 'add9', suffix: 'add9', tag: 'Esperança', intervals: [0, 4, 7, 2], desc: 'Transmite um sentimento de esperança, com uma sonoridade suave e moderna.' },
  { id: 'maj9', suffix: 'maj9', tag: 'Profundidade', intervals: [0, 4, 7, 11, 2], desc: 'Transmite profundidade e uma emoção refinada.' },
  { id: '6', suffix: '6', tag: 'Nostálgico', intervals: [0, 4, 7, 9], desc: 'Traz um sentimento leve, nostálgico e clássico.' },
  { id: 'm7', suffix: 'm7', tag: 'Melancolia', intervals: [0, 3, 7, 10], desc: 'Transmite uma tristeza suave e melancolia.' },
  { id: 'm9', suffix: 'm9', tag: 'Introspectivo', intervals: [0, 3, 7, 10, 2], desc: 'Carrega uma tristeza profunda e um tom introspectivo.' },
  { id: '7', suffix: '7', tag: 'Tensão', intervals: [0, 4, 7, 10], desc: 'Cria um sentimento de tensão e expectativa.' },
  { id: '7-9', suffix: '7(9)', tag: 'Groove', intervals: [0, 4, 7, 10, 2], desc: 'Traz uma tensão sofisticada, muito usada para groove.' },
  { id: 'maj7-sharp11', suffix: 'maj7(#11)', tag: 'Misterioso', intervals: [0, 4, 7, 11, 6], desc: 'Soa moderno, misterioso e flutuante.' },
  { id: 'sus2', suffix: 'sus2', tag: 'Aberto', intervals: [0, 2, 7], desc: 'Transmite um sentimento aberto, leve e indeciso.' },
  { id: 'sus4', suffix: 'sus4', tag: 'Preparação', intervals: [0, 5, 7], desc: 'Cria uma sensação de expectativa e preparação.' },
  { id: 'maj7-9', suffix: 'maj7(9)', tag: 'Elegante', intervals: [0, 4, 7, 11, 2], desc: 'Transmite uma emoção rica e um som muito elegante.' }
];

const data = {};

for (const root of Object.keys(scaleNotes)) {
  const notes = scaleNotes[root];
  
  const variations = templates.map(t => {
    const chordNotes = t.intervals.map(i => notes[i % 12]);
    const rightHand = chordNotes.slice(1).join(' - ');
    const noteString = chordNotes.join(', ').replace(/, ([^,]*)$/, ' e $1');

    return `      {
        id: '${root.toLowerCase()}${t.id}',
        title: '${root}${t.suffix}',
        tag: '${t.tag}',
        imageSrc: '/images/sddefault.jpg',
        fingersLeft: '${root}',
        fingersRight: '${rightHand}',
        description: 'Formado pelas notas ${noteString}. ${t.desc}',
        isLocked: false,
      }`;
  });

  data[root] = `  ${root}: {
    id: '${root}',
    heroTitle: 'Acordes de ${root}',
    heroSubtitle: '"Explore as diferentes texturas e emoções partindo da nota ${root}"',
    heroTag: 'DICIONÁRIO',
    variations: [
${variations.join(',\n')}
    ]
  }`;
}

const fileContent = `export type ChordVariation = {
  id: string;
  title: string;
  tag: string;
  imageSrc: string;
  fingersLeft: string;
  fingersRight: string;
  description: string;
  isLocked?: boolean;
};

export type NoteData = {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTag: string;
  variations: ChordVariation[];
};

export const chordsData: Record<string, NoteData> = {
${Object.values(data).join(',\n')}
};

export const NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
`;

fs.writeFileSync('src/data/chords.ts', fileContent);
console.log('Successfully generated chords.ts');
