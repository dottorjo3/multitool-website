// Tool: AI SEO Snippet Optimizer
// Optimizes titles, meta descriptions, FAQ snippets for SEO with AI prompts.

module.exports = {
  async run({ params }) {
    const locale = params?.locale || 'en-US';
    const targetLengthTitle = Number(params?.targetLengthTitle) || 60;
    const targetLengthDescription = Number(params?.targetLengthDescription) || 155;
    const includeFAQ = Boolean(params?.includeFAQ);

    const optimization = [
      `Analizza contenuto pagina e keyword principali (${locale}).`,
      `Genera title <= ${targetLengthTitle} caratteri e meta description <= ${targetLengthDescription}.`,
      'Suggerisci CTA e keyword secondarie.',
      includeFAQ ? 'Crea schema FAQ (domanda/risposta) per rich snippet.' : null,
      'Valuta readability e tone di brand.',
    ].filter(Boolean);

    return {
      summary: `SEO snippet optimizer locale ${locale}, FAQ=${includeFAQ}.`,
      locale,
      targetLengthTitle,
      targetLengthDescription,
      includeFAQ,
      optimization,
      automation: [
        'Integrazione con CMS per aggiornamento snippet automatico.',
        'Monitor CTR e ranking per misurare impatto.',
        'Programma rigenerazione snippet quando cambiano keyword.',
      ],
      qaChecklist: [
        'Verifica lunghezze e assenza di troncamenti SERP.',
        'Controlla coerenza con contenuto landing.',
        'Assicura conformità linee guida Google (no keyword stuffing).',
      ],
    };
  },
};









