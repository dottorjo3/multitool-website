// 🔧 File: backend/tools/ai-code-generator.js
// 🔗 Genera codice usando AI

function buildMockCode({ description, language, style }) {
  const commentStyle = style === 'commented' 
    ? '// This function implements: ' + description + '\n  // ' + language + ' code\n'
    : style === 'minimal' 
    ? ''
    : '// ' + description + '\n';
    
  return `${commentStyle}function solution() {\n  // TODO: Implement logic based on: ${description}\n  return null;\n}`;
}

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const description = params.description?.trim() || '';
    const language = params.language || 'javascript';
    const style = params.style || 'clean'; // 'clean', 'commented', 'minimal'
    
    if (!description) {
      throw new Error('Descrivi cosa vuoi che il codice faccia');
    }

    if (description.length < 10) {
      throw new Error('La descrizione deve essere più dettagliata (almeno 10 caratteri)');
    }

    const styleInstructions = {
      clean: 'Scrivi codice pulito e ben strutturato',
      commented: 'Aggiungi commenti dettagliati',
      minimal: 'Scrivi codice minimale e conciso',
    };
    
    const prompt = `Genera codice ${language} che: ${description}\n\n${styleInstructions[style]}. Restituisci solo il codice senza spiegazioni aggiuntive.`;
    
    const payload = {
      requestId,
      userId,
      type: 'ai-code-generator',
      input: {
        description,
        language,
        style,
        prompt,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-code-generator',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    const mockCode = buildMockCode({ description, language, style });
    const code = aiResult?.result?.code || aiResult?.code || mockCode;

    return {
      description,
      language,
      style,
      code,
      estimatedLines: code.split('\n').length,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-codegen-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};

