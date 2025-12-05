// 🔧 File: backend/tools/text-extract-emoji.js
// 🔗 Estrae emoji da un testo

// Regex per emoji (supporta Unicode emoji)
const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]/gu;

module.exports = {
  async run({ params }) {
    const text = params.input?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci il testo da cui estrarre gli emoji');
    }

    const emojis = [];
    const seen = new Set();
    const frequency = {};
    let match;

    while ((match = EMOJI_REGEX.exec(text)) !== null) {
      const emoji = match[0];
      if (!seen.has(emoji)) {
        seen.add(emoji);
        emojis.push({
          emoji,
          position: match.index,
        });
      }
      frequency[emoji] = (frequency[emoji] || 0) + 1;
    }

    // Ordina per frequenza
    const sortedByFreq = Object.entries(frequency)
      .map(([emoji, count]) => ({ emoji, count }))
      .sort((a, b) => b.count - a.count);

    return {
      count: emojis.length,
      uniqueCount: seen.size,
      emojis: emojis.map(e => e.emoji),
      emojisWithPosition: emojis,
      frequency: sortedByFreq,
    };
  },
};

