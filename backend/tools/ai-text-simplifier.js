// 🔧 File: backend/tools/ai-text-simplifier.js
// 🔗 Semplifica testo complesso per migliore leggibilità

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const text = params.text?.trim() || '';
    const readingLevel = params.readingLevel || 'simple'; // 'simple', 'intermediate', 'easy'
    
    if (!text) {
      throw new Error('Inserisci testo da semplificare');
    }

    if (text.length < 20) {
      throw new Error('Il testo deve essere almeno 20 caratteri');
    }

    const payload = {
      requestId,
      userId,
      type: 'ai-text-simplifier',
      input: {
        text,
        readingLevel,
        prompt: `Simplify the following text to ${readingLevel} reading level, making it easier to understand while preserving the main meaning:\n\n${text}`,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-text-simplifier',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    // Mock response
    const mockSimplified = text.toLowerCase().replace(/[^\w\s]/g, '').substring(0, text.length);

    return {
      original: text,
      simplified: aiResult?.result?.simplified || mockSimplified,
      originalLength: text.length,
      simplifiedLength: mockSimplified.length,
      readingLevel,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-simplifier-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};


