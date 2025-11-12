// Tool: Customer Success Renewal Cadence
// Plans renewal workflows with touchpoints, playbooks and forecasting checkpoints.

module.exports = {
  async run({ params }) {
    const horizonMonths = Number(params?.horizonMonths) || 12;
    const contractTypes = Array.isArray(params?.contractTypes) && params.contractTypes.length > 0
      ? params.contractTypes
      : ['annual', 'multi-year'];
    const forecastingModel = params?.forecastingModel || 'weighted';

    const cadence = [
      { month: -6, touchpoints: ['Executive alignment', 'Health review'], assets: ['Success recap', 'Roadmap deck'] },
      { month: -3, touchpoints: ['Value realization report', 'Pricing discussion'], assets: ['ROI calculator', 'Expansion options'] },
      { month: -1, touchpoints: ['Contract finalization', 'Legal review'], assets: ['Order form', 'Counter-objection guide'] },
      { month: 0, touchpoints: ['Kickoff renewal term', 'Celebrate win'], assets: ['Welcome kit', 'Press/social plan'] },
      { month: 1, touchpoints: ['Post-renewal retro', 'Expansion next steps'], assets: ['Action plan', 'Executive summary'] },
    ];

    return {
      summary: `Renewal cadence ${horizonMonths} mesi, modello forecast ${forecastingModel}.`,
      horizonMonths,
      contractTypes,
      forecastingModel,
      cadence,
      automation: [
        'Reminder automatici via CRM e calendari.',
        'Dashboard pipeline rinnovi con categorie (Commit/Best/Worst).',
        'Template email personalizzati per fase.',
      ],
      qaChecklist: [
        'Allineare finance/legal sugli step e SLA.',
        'Aggiornare materiali in base alle offerte correnti.',
        'Misurare win rate vs prior period.',
      ],
    };
  },
};






