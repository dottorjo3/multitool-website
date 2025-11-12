// Tool: Support Knowledge Base Curator
// Plans knowledge base hygiene with taxonomy, review cadences and content gaps.

module.exports = {
  async run({ params }) {
    const articleCount = Number(params?.articleCount) || 250;
    const reviewCadence = params?.reviewCadence || 'monthly';
    const localization = Array.isArray(params?.localization) && params.localization.length > 0
      ? params.localization
      : ['en', 'it', 'es'];

    const curatorPlan = {
      taxonomy: [
        'Definire categorie e tagging coerente con prodotto.',
        'Mappare journey cliente per accesso rapido.',
        'Stabilire linee guida SEO e tono.',
      ],
      reviewProcess: [
        `Selezionare owner per categoria e review ${reviewCadence}.`,
        'Automatizzare reminder e tracking stato articolo.',
        'A/B test snippet KB dentro prodotto.',
      ],
      contentGapAnalysis: [
        'Analisi ticket vs articoli esistenti.',
        'Segnalazione feedback dai CSM/Support.',
        'Prioritizzazione nuove guide e video.',
      ],
    };

    return {
      summary: `Piano curator KB (articoli ${articleCount}, lingue ${localization.join(', ')}).`,
      articleCount,
      reviewCadence,
      localization,
      curatorPlan,
      automation: [
        'Dashboard stato articoli e KPI (view, deflection).',
        'Workflow approvazione e pubblicazione automatica.',
        'Traduzioni assistite e QA linguistico.',
      ],
      qaChecklist: [
        'Verificare aggiornamento dopo release prodotto.',
        'Monitorare NPS/CSAT correlato a KB.',
        'Eseguire test di usabilità periodici.',
      ],
    };
  },
};






