// 🔧 File: backend/tools/ai-paraphraser.js
// 🔗 Riscrive frasi mantenendo il significato originale

function buildPrompt({ text, tone, language }) {
  const toneLabel = tone || 'neutral';
  const lang = language || 'it';
  return `Paraphrase the following text in a ${toneLabel} tone. Language code: ${lang}.\n\n${text}`;
}

function mockParaphrase(text, tone) {
  const prefix = tone === 'friendly'
    ? '✅ Versione amichevole:'
    : tone === 'professional'
      ? '📎 Versione professionale:'
      : '📝 Versione neutra:';

  return `${prefix} ${text.replace(/([.?!])\s+/g, '$1  ')}`;
}

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const text = (params.text || '').trim();
    const tone = params.tone || 'neutral';
    const language = params.language || 'it';
    const temperature = Number(params.temperature ?? 0.4);

    if (!text || text.length < 20) {
      throw new Error('Incolla un testo da parafrasare (almeno 20 caratteri)');
    }

    const payload = {
      requestId,
      userId,
      type: 'ai-paraphraser',
      input: {
        text,
        tone,
        language,
        temperature,
        prompt: buildPrompt({ text, tone, language }),
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-paraphraser',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    const paraphrased = aiResult?.result?.text || aiResult?.text || mockParaphrase(text, tone);

    return {
      text: paraphrased,
      tone,
      language,
      temperature,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-paraphraser-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};

