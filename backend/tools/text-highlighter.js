// 🔧 File: backend/tools/text-highlighter.js
// 🔗 Evidenzia parole/frasi nel testo

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const keywords = params.keywords?.trim() || '';
    const highlightType = params.highlightType || 'mark'; // 'mark', 'bold', 'italic', 'underline'
    
    if (!input) {
      throw new Error('Inserisci il testo da evidenziare');
    }

    if (!keywords) {
      throw new Error('Inserisci le parole/frasi da evidenziare');
    }

    const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean);
    if (keywordList.length === 0) {
      throw new Error('Inserisci almeno una parola da evidenziare');
    }

    let highlighted = input;
    const caseSensitive = params.caseSensitive === 'true';
    
    keywordList.forEach(keyword => {
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      
      switch (highlightType) {
        case 'bold':
          highlighted = highlighted.replace(regex, '**$&**');
          break;
        case 'italic':
          highlighted = highlighted.replace(regex, '*$&*');
          break;
        case 'underline':
          highlighted = highlighted.replace(regex, '__$&__');
          break;
        case 'mark':
        default:
          highlighted = highlighted.replace(regex, '==$&==');
          break;
      }
    });
    
    return {
      original: input,
      highlighted,
      keywords: keywordList,
      highlightType,
      matches: keywordList.length,
    };
  },
};

