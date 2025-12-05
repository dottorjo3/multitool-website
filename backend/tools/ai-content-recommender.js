// 🔧 File: backend/tools/ai-content-recommender.js
// 🔗 Ottiene raccomandazioni contenuti basate su AI

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const topic = params.topic?.trim() || '';
    const contentType = params.contentType || 'article'; // 'article', 'video', 'post', 'tutorial'
    const numRecommendations = params.numRecommendations ? parseInt(params.numRecommendations, 10) : 5;
    
    if (!topic) {
      throw new Error('Inserisci un argomento per le raccomandazioni');
    }

    if (numRecommendations < 1 || numRecommendations > 10) {
      throw new Error('Numero raccomandazioni deve essere tra 1 e 10');
    }

    const payload = {
      requestId,
      userId,
      type: 'ai-content-recommender',
      input: {
        topic,
        contentType,
        numRecommendations,
        prompt: `Recommend ${numRecommendations} ${contentType} topics related to "${topic}"`,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-content-recommender',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    // Mock response
    const mockRecommendations = Array.from({ length: numRecommendations }, (_, i) => ({
      title: `${topic} - Recommendation ${i + 1}`,
      type: contentType,
      relevance: (1 - i * 0.1).toFixed(2),
      description: `This ${contentType} covers aspects of ${topic} from perspective ${i + 1}`,
    }));

    return {
      topic,
      contentType,
      recommendations: aiResult?.result?.recommendations || mockRecommendations,
      count: mockRecommendations.length,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-recommender-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};


