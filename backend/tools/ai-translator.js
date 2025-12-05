// 🔧 File: backend/tools/ai-translator.js
// 🔗 Traduce testo usando AI

function buildMockTranslation({ text, fromLang, toLang }) {
  return `[${toLang.toUpperCase()}] ${text} (traduzione simulata - configura AI reale per traduzione automatica)`;
}

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const text = params.text?.trim() || '';
    const fromLang = params.fromLang || 'auto';
    const toLang = params.toLang || 'en';
    
    if (!text) {
      throw new Error('Inserisci testo da tradurre');
    }

    if (text.length < 3) {
      throw new Error('Il testo deve essere almeno 3 caratteri');
    }

    const prompt = `Traduci il seguente testo da ${fromLang} a ${toLang}. Mantieni il tono e lo stile originale:\n\n${text}`;
    
    const payload = {
      requestId,
      userId,
      type: 'ai-translator',
      input: {
        text,
        fromLang,
        toLang,
        prompt,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-translator',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    const mockTranslated = buildMockTranslation({ text, fromLang, toLang });
    const translated = aiResult?.result?.translated || aiResult?.translated || mockTranslated;

    return {
      original: text,
      translated,
      fromLang,
      toLang,
      length: text.length,
      translatedLength: translated.length,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-translator-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};

