// 🔧 File: backend/tools/ai-grammar-checker.js
// 🔗 Controlla e corregge grammatica usando AI

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const text = params.text?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci testo da controllare');
    }

    if (text.length < 10) {
      throw new Error('Il testo deve essere almeno 10 caratteri');
    }

    const payload = {
      requestId,
      userId,
      type: 'ai-grammar-checker',
      input: {
        text,
        prompt: `Check and fix grammar, spelling, and style errors in the following text. Return the corrected text and list of corrections:\n\n${text}`,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-grammar-checker',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    // Mock response
    const mockCorrected = text; // In real implementation, AI would fix errors
    const mockCorrections = [];

    return {
      original: text,
      corrected: aiResult?.result?.corrected || mockCorrected,
      corrections: aiResult?.result?.corrections || mockCorrections,
      errorsFound: mockCorrections.length,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-grammar-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};


