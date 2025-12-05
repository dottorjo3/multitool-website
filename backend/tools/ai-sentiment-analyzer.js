// 🔧 File: backend/tools/ai-sentiment-analyzer.js
// 🔗 Analizza sentiment del testo usando AI

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const text = params.text?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci testo da analizzare');
    }

    if (text.length < 10) {
      throw new Error('Il testo deve essere almeno 10 caratteri');
    }

    const payload = {
      requestId,
      userId,
      type: 'ai-sentiment-analyzer',
      input: {
        text,
        prompt: `Analyze the sentiment of the following text and return sentiment score (positive/negative/neutral) and confidence:\n\n${text}`,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-sentiment-analyzer',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    // Mock response
    const mockSentiment = {
      sentiment: 'neutral',
      score: 0.5,
      confidence: 0.7,
      positive: 0.3,
      negative: 0.2,
      neutral: 0.5,
    };

    return {
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      sentiment: aiResult?.result?.sentiment || mockSentiment.sentiment,
      score: aiResult?.result?.score || mockSentiment.score,
      confidence: aiResult?.result?.confidence || mockSentiment.confidence,
      breakdown: aiResult?.result?.breakdown || mockSentiment,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-sentiment-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};


