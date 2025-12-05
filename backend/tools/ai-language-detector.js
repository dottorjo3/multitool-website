// 🔧 File: backend/tools/ai-language-detector.js
// 🔗 Rileva lingua del testo usando AI

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const text = params.text?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci testo da analizzare');
    }

    if (text.length < 5) {
      throw new Error('Il testo deve essere almeno 5 caratteri');
    }

    const payload = {
      requestId,
      userId,
      type: 'ai-language-detector',
      input: {
        text,
        prompt: `Detect the language of the following text and return language code and confidence:\n\n${text}`,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-language-detector',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    // Mock response - semplice rilevamento basato su pattern
    let detectedLang = 'it';
    let confidence = 0.7;
    
    if (/^[a-zA-Z\s]+$/.test(text) && !/[àèéìòù]/.test(text)) {
      detectedLang = 'en';
      confidence = 0.8;
    } else if (/[àèéìòù]/.test(text) || /[ÀÈÉÌÒÙ]/.test(text)) {
      detectedLang = 'it';
      confidence = 0.9;
    }

    return {
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      language: aiResult?.result?.language || detectedLang,
      languageName: detectedLang === 'it' ? 'Italiano' : detectedLang === 'en' ? 'English' : 'Unknown',
      confidence: aiResult?.result?.confidence || confidence,
      alternativeLanguages: aiResult?.result?.alternatives || [],
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-language-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};


