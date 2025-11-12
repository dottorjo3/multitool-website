// Tool: Data Retention Planner
// Builds a retention and deletion policy with timelines, storage tiers and compliance.

module.exports = {
  async run({ params }) {
    const dataCategories = Array.isArray(params?.dataCategories) && params.dataCategories.length > 0
      ? params.dataCategories
      : ['customer-data', 'product-usage', 'logs'];
    const retentionYears = Number(params?.retentionYears) || 3;
    const storageTiers = Array.isArray(params?.storageTiers) && params.storageTiers.length > 0
      ? params.storageTiers
      : ['hot', 'warm', 'cold', 'archive'];

    const policies = dataCategories.map((category) => ({
      category,
      retention: `${retentionYears} anni (personalizzabile)`,
      storage: storageTiers,
      deletionProcess: ['Automatic job', 'Approval workflow', 'Audit log'],
      complianceChecks: ['Data subject request', 'Legal hold', 'Policy review annuale'],
    }));

    return {
      summary: `Retention planner (${dataCategories.length} categorie, durata ${retentionYears} anni).`,
      dataCategories,
      retentionYears,
      storageTiers,
      policies,
      automation: [
        'Job schedulati per move/delete con logging.',
        'Dashboard compliance per monitorare scadenze.',
        'Alert per dataset prossimi alla scadenza.',
      ],
      qaChecklist: [
        'Validare policy con legale/compliance.',
        'Aggiornare runbook in caso di nuove normative.',
        'Testare restore post-deletion per garantire integrità.',
      ],
    };
  },
};






