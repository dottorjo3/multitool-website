// 🔧 File: backend/tools/ai-question-generator.js
// 🔗 Genera domande da contenuto testuale

module.exports = {
  async run({ params, requestId, userId, helpers }) {
    const text = params.text?.trim() || '';
    const numQuestions = params.numQuestions ? parseInt(params.numQuestions, 10) : 5;
    const questionType = params.questionType || 'multiple'; // 'multiple', 'open', 'yesno'
    
    if (!text) {
      throw new Error('Inserisci testo da cui generare domande');
    }

    if (text.length < 50) {
      throw new Error('Il testo deve essere almeno 50 caratteri');
    }

    if (numQuestions < 1 || numQuestions > 20) {
      throw new Error('Numero domande deve essere tra 1 e 20');
    }

    const payload = {
      requestId,
      userId,
      type: 'ai-question-generator',
      input: {
        text,
        numQuestions,
        questionType,
        prompt: `Generate ${numQuestions} ${questionType} questions based on the following text:\n\n${text}`,
      },
    };

    let aiResult = null;

    if (helpers?.dispatchJob) {
      try {
        aiResult = await helpers.dispatchJob({
          toolId: 'ai-question-generator',
          params: payload,
        });
      } catch (error) {
        aiResult = { error: error.message };
      }
    }

    // Mock response
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const mockQuestions = sentences.slice(0, numQuestions).map((s, i) => ({
      question: `Domanda ${i + 1}: ${s.trim().substring(0, 50)}?`,
      type: questionType,
      answer: s.trim(),
    }));

    return {
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      questions: aiResult?.result?.questions || mockQuestions,
      count: mockQuestions.length,
      questionType,
      provider: aiResult?.provider || 'mock',
      model: aiResult?.model || 'mock-question-v1',
      warnings: aiResult?.error ? [aiResult.error] : [],
    };
  },
};


