// 🔧 File: backend/tools/ai-writer.js
// 🔗 Genera testi originali utilizzando l'AI Farm (mock/local/farm)

function buildPrompt({ topic, tone, temperature }) {
  const toneLabel = tone || 'balanced';
  return `Write a ${toneLabel} article about "${topic}". Keep the structure with intro, body and conclusion.`;
}

function buildMockResponse({ topic, tone }) {
  const safeTone = tone || 'balanced';
  return [
    `## ${topic.charAt(0).toUpperCase()}${topic.slice(1)}`,
    '',
    `**Tone:** ${safeTone}`,
    '',
    `1. *Opening*: ${topic} è un argomento caldo e tutti vogliono capirne l'essenza.`,
    '2. *Key Insight*: anche senza AI reale possiamo fornire spunti solidi e organizzati.',
    '3. *Takeaway*: personalizza questo testo dopo aver collegato il vero modello AI.',
  ].join('\n');
}

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const topic = params.topic?.trim();
    const tone = params.tone?.trim() || 'balanced';
    const temperature = Number(params.temperature ?? 0.7);

    if (!topic) {
      throw new Error('Specifica un argomento su cui scrivere');
    }

    const payload = {
      requestId,
      userId,
      type: 'ai-writer',
      input: {
        topic,
        tone,
        temperature,
        prompt: buildPrompt({ topic, tone, temperature }),
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-writer',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    const mockText = buildMockResponse({ topic, tone });
    const text = aiResult?.result?.text || aiResult?.text || mockText;

    return {
      text,
      tone,
      temperature,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-writer-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};

