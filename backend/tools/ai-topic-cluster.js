// Tool: AI Topic Cluster Planner
// Groups content into thematic clusters with summaries and linking strategy.

module.exports = {
  async run({ params }) {
    const contentSources = Array.isArray(params?.contentSources) && params.contentSources.length > 0
      ? params.contentSources
      : ['blog', 'support', 'docs'];
    const clusterCount = Number(params?.clusterCount) || 10;
    const summarizer = params?.summarizer || 'gpt-4o';

    const pipeline = [
      `Ingesta contenuti da ${contentSources.join(', ')} e pulisci testo.`,
      `Genera embedding e applica clustering (K-Means, HDBSCAN) per ${clusterCount} topic.`,
      `Per ogni cluster, crea summary e keywords usando ${summarizer}.`,
      'Suggerisci internal linking (pillar → cluster → subtopic).',
      'Aggiorna knowledge base con nuove categorie e priorità contenuti.',
    ];

    return {
      summary: `Topic clustering ${clusterCount} cluster con summarizer ${summarizer}.`,
      contentSources,
      clusterCount,
      summarizer,
      pipeline,
      tooling: [
        'LangChain / LlamaIndex',
        'scikit-learn / BERTopic',
        'Pinecone / Milvus per vector store',
      ],
      qaChecklist: [
        'Valida cluster manualmente per coerenza.',
        'Controlla contenuti duplicati o fuori tema.',
        'Misura impatto su SEO/engagement dopo implementazione.',
      ],
    };
  },
};










