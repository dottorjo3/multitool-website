// 🔧 File: backend/tools/lorem-ipsum.js
// 🔗 Farm Ready — Genera lorem ipsum personalizzato

const DEFAULT_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
  'Sed posuere consectetur est at lobortis. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
  'Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
];

function generateLorem(paragraphs, sentencesPerParagraph) {
  const output = [];
  for (let i = 0; i < paragraphs; i += 1) {
    const base = DEFAULT_PARAGRAPHS[i % DEFAULT_PARAGRAPHS.length];
    if (sentencesPerParagraph >= 3) {
      output.push(base);
    } else {
      const sentences = base.split('.').filter(Boolean);
      output.push(sentences.slice(0, Math.max(1, sentencesPerParagraph)).join('. ').concat('.'));
    }
  }
  return output.join('\n\n');
}

module.exports = {
  async run({ params }) {
    const paragraphs = Math.min(Math.max(Number(params?.paragraphs) || 3, 1), 10);
    const sentences = Math.min(Math.max(Number(params?.sentences) || 3, 1), 5);

    return {
      paragraphs,
      sentences,
      output: generateLorem(paragraphs, sentences),
    };
  },
};


