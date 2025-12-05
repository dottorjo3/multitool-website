// 🔧 File: backend/tools/ai-text-expander.js
// 🔗 Espande testo breve in contenuto dettagliato

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const text = params.text?.trim() || '';
    const targetLength = params.targetLength || 'medium'; // 'short', 'medium', 'long'
    
    if (!text) {
      throw new Error('Inserisci testo da espandere');
    }

    if (text.length < 10) {
      throw new Error('Il testo deve essere almeno 10 caratteri');
    }

    const lengthMap = { short: 200, medium: 500, long: 1000 };
    const targetWords = lengthMap[targetLength] || 500;

    const payload = {
      requestId,
      userId,
      type: 'ai-text-expander',
      input: {
        text,
        targetLength,
        prompt: `Expand the following text into a ${targetLength} detailed content (approximately ${targetWords} words), maintaining the original meaning:\n\n${text}`,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-text-expander',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    // Mock response
    const mockExpanded = `${text}\n\nQuesto è un'espansione del testo originale. L'espansione fornisce maggiori dettagli, spiegazioni e contesto per rendere il contenuto più completo e informativo. (Mock expansion - configura AI reale per espansione automatica)`;

    return {
      original: text,
      expanded: aiResult?.result?.expanded || mockExpanded,
      originalLength: text.length,
      expandedLength: mockExpanded.length,
      expansionRatio: (mockExpanded.length / text.length).toFixed(2),
      targetLength,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-expander-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};


