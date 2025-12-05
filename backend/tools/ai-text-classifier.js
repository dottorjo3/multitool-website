// 🔧 File: backend/tools/ai-text-classifier.js
// 🔗 Classifica testo in categorie usando AI

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const text = params.text?.trim() || '';
    const categories = params.categories?.trim() || ''; // Categorie opzionali separate da virgola
    
    if (!text) {
      throw new Error('Inserisci testo da classificare');
    }

    if (text.length < 20) {
      throw new Error('Il testo deve essere almeno 20 caratteri');
    }

    const categoryList = categories 
      ? categories.split(',').map(c => c.trim()).filter(Boolean)
      : ['technology', 'business', 'health', 'education', 'entertainment', 'sports', 'politics', 'other'];

    const payload = {
      requestId,
      userId,
      type: 'ai-text-classifier',
      input: {
        text,
        categories: categoryList,
        prompt: `Classify the following text into one of these categories: ${categoryList.join(', ')}. Return the best category and confidence:\n\n${text}`,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-text-classifier',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    // Mock response - classificazione semplice basata su keyword
    let category = 'other';
    let confidence = 0.5;
    
    const textLower = text.toLowerCase();
    if (textLower.includes('tech') || textLower.includes('code') || textLower.includes('software')) {
      category = 'technology';
      confidence = 0.7;
    } else if (textLower.includes('business') || textLower.includes('market') || textLower.includes('company')) {
      category = 'business';
      confidence = 0.7;
    }

    return {
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      category: aiResult?.result?.category || category,
      confidence: aiResult?.result?.confidence || confidence,
      allCategories: categoryList.map(cat => ({
        category: cat,
        score: cat === category ? confidence : (1 - confidence) / (categoryList.length - 1),
      })),
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-classifier-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};


