// Tool: Marketing Workflow Audit
// Audits marketing automation workflows for trigger accuracy, privacy and ROI.

module.exports = {
  async run({ params }) {
    const systems = Array.isArray(params?.systems) && params.systems.length > 0
      ? params.systems
      : ['HubSpot', 'Marketo'];
    const auditFrequency = params?.auditFrequency || 'quarterly';
    const privacyCompliance = Boolean(params?.privacyCompliance);

    const checklist = [
      'Mappa workflow attivi con obiettivi e segmenti.',
      'Verifica trigger, condizioni di uscita e dedupe lead.',
      'Controlla contenuti (personalizzazione, CTA, link tracking).',
      `Rivedi performance KPI (open rate, conversion, pipeline) ${auditFrequency}.`,
      privacyCompliance ? 'Assicura processi opt-in/opt-out e gestione dati personali.' : null,
      'Documenta modifiche e versioni precedenti.',
    ].filter(Boolean);

    return {
      summary: `Workflow audit su ${systems.join(', ')} con frequenza ${auditFrequency}.`,
      systems,
      auditFrequency,
      privacyCompliance,
      checklist,
      automation: [
        'Dashboard audit con punteggi e priorità fix.',
        'Template report per leadership/operations.',
        'Alert se workflow attivo senza owner o con performance scarse.',
      ],
      qaChecklist: [
        'Allinea audit con compliance e team legale.',
        'Testa campioni di email e journey per experience utente.',
        'Aggiorna documentazione post audit.',
      ],
    };
  },
};










