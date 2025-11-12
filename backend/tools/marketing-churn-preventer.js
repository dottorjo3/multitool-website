// Tool: Marketing Churn Preventer
// Builds churn prevention flows based on signals, campaigns and offers.

module.exports = {
  async run({ params }) {
    const warningSignals = Array.isArray(params?.warningSignals) && params.warningSignals.length > 0
      ? params.warningSignals
      : ['usage-drop', 'support-tickets', 'payment-issues'];
    const offerTypes = Array.isArray(params?.offerTypes) && params.offerTypes.length > 0
      ? params.offerTypes
      : ['discount', 'success-session', 'feature-highlight'];
    const monitoringCadence = params?.monitoringCadence || 'weekly';

    const strategy = [
      `Rileva segnali: ${warningSignals.join(', ')} con soglie definite.`,
      'Segmenta clienti per valore, settore, piani.',
      `Disegna campagne personalizzate con offerte: ${offerTypes.join(', ')}.`,
      `Monitora risultati ${monitoringCadence} e iterare.`,
      'Allinea team CS e Sales per follow-up manuali.',
    ];

    return {
      summary: `Churn preventer con segnali ${warningSignals.join(', ')} e offerte ${offerTypes.join(', ')}.`,
      warningSignals,
      offerTypes,
      monitoringCadence,
      strategy,
      automation: [
        'Dashboard churn signals + alert Slack/Email.',
        'Triggered journeys in marketing automation.',
        'Feedback loop per aggiornare scoring churn.',
      ],
      qaChecklist: [
        'Validare soglie segnali con storico churn.',
        'Testare offerte su sample A/B per misurarne efficacia.',
        'Documentare riattivazioni e ragioni churn per miglioramenti futuri.',
      ],
    };
  },
};










