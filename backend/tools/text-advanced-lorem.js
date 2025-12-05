// 🔧 File: backend/tools/text-advanced-lorem.js
// 🔗 Genera testo Lorem Ipsum avanzato

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing',
  'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore',
  'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam',
  'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip'
];

function generateLorem(options) {
  const { type, count, startWithLorem } = options;
  const words = [];
  
  if (startWithLorem) {
    words.push('Lorem', 'ipsum');
  }
  
  for (let i = words.length; i < count; i++) {
    const word = LOREM_WORDS[i % LOREM_WORDS.length];
    words.push(i === words.length && startWithLorem ? word : word);
  }
  
  if (type === 'words') {
    return words.join(' ');
  }
  
  if (type === 'sentences') {
    const sentences = [];
    for (let i = 0; i < count; i++) {
      const sentenceWords = [];
      const sentenceLength = Math.floor(Math.random() * 10) + 5;
      for (let j = 0; j < sentenceLength; j++) {
        sentenceWords.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
      }
      sentences.push(sentenceWords.join(' ').charAt(0).toUpperCase() + sentenceWords.join(' ').slice(1) + '.');
    }
    return sentences.join(' ');
  }
  
  if (type === 'paragraphs') {
    const paragraphs = [];
    for (let i = 0; i < count; i++) {
      const sentences = [];
      const sentenceCount = Math.floor(Math.random() * 5) + 3;
      for (let j = 0; j < sentenceCount; j++) {
        const sentenceWords = [];
        const sentenceLength = Math.floor(Math.random() * 10) + 5;
        for (let k = 0; k < sentenceLength; k++) {
          sentenceWords.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
        }
        sentences.push(sentenceWords.join(' ').charAt(0).toUpperCase() + sentenceWords.join(' ').slice(1) + '.');
      }
      paragraphs.push(sentences.join(' '));
    }
    return paragraphs.join('\n\n');
  }
  
  return words.join(' ');
}

module.exports = {
  async run({ params }) {
    const type = params.type || 'words';
    const count = params.count ? parseInt(params.count, 10) : 50;
    const startWithLorem = params.startWithLorem !== 'false';
    
    if (count < 1 || count > 10000) {
      throw new Error('Il conteggio deve essere tra 1 e 10000');
    }

    const lorem = generateLorem({ type, count, startWithLorem });
    
    return {
      lorem,
      type,
      count,
      startWithLorem,
      length: lorem.length,
    };
  },
};

