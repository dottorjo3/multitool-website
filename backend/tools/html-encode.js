// 🔧 File: backend/tools/html-encode.js
// 🔗 Farm Ready — Encode entità HTML

const MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function encodeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => MAP[char]);
}

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    return {
      output: encodeHtml(text),
    };
  },
};


