// 🔧 File: backend/tools/text-extract-hashtags.js
// 🔗 Estrae hashtag (#tag) da un testo

const HASHTAG_REGEX = /#[\w\u00C0-\u017F]+/g;

module.exports = {
  async run({ params }) {
    const text = params.input?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci il testo da cui estrarre gli hashtag');
    }

    const hashtags = [];
    const seen = new Set();
    let match;

    while ((match = HASHTAG_REGEX.exec(text)) !== null) {
      const hashtag = match[0];
      if (!seen.has(hashtag.toLowerCase())) {
        seen.add(hashtag.toLowerCase());
        hashtags.push({
          hashtag,
          position: match.index,
        });
      }
    }

    return {
      count: hashtags.length,
      hashtags: hashtags.map(h => h.hashtag),
      hashtagsWithPosition: hashtags,
    };
  },
};

