// 🔧 File: backend/tools/ai-keyword-extractor.js
// 🔗 Estrae keyword dal testo usando AI

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const text = params.text?.trim() || '';
    const maxKeywords = params.maxKeywords ? parseInt(params.maxKeywords, 10) : 10;
    
    if (!text) {
      throw new Error('Inserisci testo da analizzare');
    }

    if (text.length < 20) {
      throw new Error('Il testo deve essere almeno 20 caratteri');
    }

    const payload = {
      requestId,
      userId,
      type: 'ai-keyword-extractor',
      input: {
        text,
        maxKeywords,
        prompt: `Extract the top ${maxKeywords} most important keywords from the following text:\n\n${text}`,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-keyword-extractor',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    // Mock response
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const wordFreq = {};
    words.forEach(w => {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    });
    const mockKeywords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxKeywords)
      .map(([word, count]) => ({ word, count, relevance: count / words.length }));

    return {
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      keywords: aiResult?.result?.keywords || mockKeywords,
      count: mockKeywords.length,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-keyword-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};


