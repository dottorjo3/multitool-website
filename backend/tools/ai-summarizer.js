// 🔧 File: backend/tools/ai-summarizer.js
// 🔗 Riassume testi lunghi tramite AI Farm (mock/local/farm)

const MAX_LENGTH = 6000;

function sanitizeText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function buildPrompt({ content, length, focus }) {
  const lengthLabel = length || 'medium';
  const focusLabel = focus ? `Focus on ${focus}.` : '';
  return `Summarize the following content in ${lengthLabel} length. ${focusLabel}\n\n${content}`;
}

function buildMockSummary({ content, length }) {
  const sentences = sanitizeText(content)
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, length === 'short' ? 2 : length === 'long' ? 4 : 3);

  if (!sentences.length) {
    sentences.push('Contenuto troppo breve per creare un riassunto realistico.');
  }

  return `${sentences.join('. ')}. (Mock summary)`;
}

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const content = sanitizeText(params.content || '');
    const length = params.length || 'medium';
    const focus = params.focus?.trim() || '';

    if (content.length < 40) {
      throw new Error('Il testo è troppo breve per un riassunto significativo');
    }

    if (content.length > MAX_LENGTH) {
      throw new Error(`Il testo supera il limite massimo di ${MAX_LENGTH} caratteri`);
    }

    const payload = {
      requestId,
      userId,
      type: 'ai-summarizer',
      input: {
        content,
        length,
        focus,
        prompt: buildPrompt({ content, length, focus }),
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-summarizer',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    const summary = aiResult?.result?.summary || aiResult?.summary || buildMockSummary({ content, length });

    return {
      summary,
      length,
      focus,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-summarizer-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
      originalCharacters: content.length,
    };
  },
};

