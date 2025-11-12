// Tool: AI FAQ Generator
// Creates structured FAQ content from product information.

module.exports = {
  async run({ params }) {
    const productName = params?.productName || 'Prodotto';
    const faqCount = Number(params?.faqCount) || 8;
    const tone = params?.tone || 'helpful';

    const prompts = Array.from({ length: faqCount }).map((_, index) => ({
      id: `faq_${index + 1}`,
      instruction: [
        `You are a support specialist for ${productName}.`,
        `Generate question ${index + 1} with answer.`,
        `Tone: ${tone}.`,
        'Structure output JSON with fields question, shortAnswer, detailedAnswer, tags.',
      ].join(' '),
    }));

    return {
      summary: `FAQ generator per ${productName} (${faqCount} domande).`,
      productName,
      faqCount,
      tone,
      prompts,
      publishingTips: [
        'Ordina le FAQ per categoria e priorità.',
        'Aggiungi link a documentazione correlata.',
        'Aggiorna in base ai ticket reali riportati dal supporto.',
      ],
      automation: [
        'Integra con CMS knowledge base (Zendesk, Help Scout, Freshdesk).',
        'Schedula rigenerazioni mensili per mantenere FAQ aggiornate.',
      ],
    };
  },
};










