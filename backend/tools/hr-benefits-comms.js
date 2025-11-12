// Tool: HR Benefits Communication Planner
// Creates a communication plan for benefits programs with segments, channels and timeline.

module.exports = {
  async run({ params }) {
    const benefitsPrograms = Array.isArray(params?.benefitsPrograms) && params.benefitsPrograms.length > 0
      ? params.benefitsPrograms
      : ['Healthcare', 'Wellness stipend', 'Learning & development'];
    const employeeSegments = Array.isArray(params?.employeeSegments) && params.employeeSegments.length > 0
      ? params.employeeSegments
      : ['New hires', 'Remote', 'Managers'];
    const campaignLengthWeeks = Number(params?.campaignLengthWeeks) || 6;

    const communications = benefitsPrograms.map((program) => ({
      program,
      keyMessages: ['Cos’è', 'Perché importa', 'Come usarlo', 'Deadline'],
      channels: ['Email serie', 'Intranet', 'Town hall', 'Slack AMA'],
      timeline: [
        { week: 0, action: 'Annuncio lancio' },
        { week: 2, action: 'Reminder con storie di successo' },
        { week: campaignLengthWeeks, action: 'Follow-up survey & FAQ aggiornate' },
      ],
    }));

    return {
      summary: `Benefits comms plan (${benefitsPrograms.length} programmi, durata ${campaignLengthWeeks} settimane).`,
      benefitsPrograms,
      employeeSegments,
      campaignLengthWeeks,
      communications,
      automation: [
        'Sequenze email personalizzate per segmento.',
        'Dashboard engagement (open rate, click, partecipazione).',
        'FAQ dinamiche e chatbot interno.',
      ],
      qaChecklist: [
        'Verificare compliance con normative locali.',
        'Legare comunicazione a HRIS per targeting corretto.',
        'Raccogliere feedback e iterare messaggi.',
      ],
    };
  },
};

