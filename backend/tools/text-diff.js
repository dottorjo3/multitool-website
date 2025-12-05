// 🔧 File: backend/tools/text-diff.js
// 🔗 Mostra differenze tra due testi

const { diffLines, diffWords, diffChars } = require('diff');

module.exports = {
  async run({ params }) {
    const text1 = params.text1?.trim() || '';
    const text2 = params.text2?.trim() || '';
    const diffType = params.diffType || 'lines'; // 'lines', 'words', 'chars'
    
    if (!text1 || !text2) {
      throw new Error('Inserisci entrambi i testi da confrontare');
    }

    let diff;
    switch (diffType) {
      case 'words':
        diff = diffWords(text1, text2);
        break;
      case 'chars':
        diff = diffChars(text1, text2);
        break;
      case 'lines':
      default:
        diff = diffLines(text1, text2);
        break;
    }

    const added = diff.filter(part => part.added).length;
    const removed = diff.filter(part => part.removed).length;
    const unchanged = diff.filter(part => !part.added && !part.removed).length;
    
    return {
      text1,
      text2,
      diffType,
      diff,
      stats: {
        added,
        removed,
        unchanged,
        totalChanges: added + removed,
      },
    };
  },
};

