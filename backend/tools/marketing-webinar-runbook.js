// Tool: Marketing Webinar Runbook
// Provides an end-to-end runbook for webinar organization, promotion and follow-up.

module.exports = {
  async run({ params }) {
    const leadGoal = Number(params?.leadGoal) || 300;
    const platforms = Array.isArray(params?.platforms) && params.platforms.length > 0
      ? params.platforms
      : ['Zoom', 'YouTube Live'];
    const prepTimelineWeeks = Number(params?.prepTimelineWeeks) || 6;

    const timeline = [
      { phase: 'Planning', weeksBefore: prepTimelineWeeks, tasks: ['Definisci topic, speaker, agenda', 'Crea landing page e form registrazione'] },
      { phase: 'Promotion', weeksBefore: prepTimelineWeeks - 3, tasks: ['Campagne email e paid', 'Partner marketing', 'Reminder automatici'] },
      { phase: 'Dry Run', weeksBefore: 1, tasks: ['Test audio/video', 'Script Q&A', 'Backup recording'] },
      { phase: 'Live Day', weeksBefore: 0, tasks: ['Check-in speaker', 'Monitor chat/Q&A', 'CTA finale e survey'] },
      { phase: 'Follow-up', weeksBefore: -1, tasks: ['Invia registrazione', 'Segmenta lead caldi', 'Analizza KPI e report'] },
    ];

    return {
      summary: `Webinar runbook (goal ${leadGoal} lead) su piattaforme ${platforms.join(', ')}.`,
      leadGoal,
      platforms,
      prepTimelineWeeks,
      timeline,
      qaChecklist: [
        'Verifica audio/video e connessione stabile.',
        'Assicurati che CTA e tracking siano impostati.',
        'Raccogli feedback e aggiorna playbook post evento.',
      ],
      automation: [
        'Automatizza reminder e nurturing con marketing automation.',
        'Genera registrazione editata e highlight clip automatiche.',
        'Dashboard KPI: registrati, attendance, conversion, pipeline.',
      ],
    };
  },
};










