// 🔧 File: backend/tools/html-decode.js
// 🔗 Farm Ready — Decode entità HTML comuni

const MAP = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

const ENTITY_REGEX = new RegExp(Object.keys(MAP).join('|'), 'g');

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const decoded = text.replace(ENTITY_REGEX, (entity) => MAP[entity] || entity);
    return {
      output: decoded,
    };
  },
};


