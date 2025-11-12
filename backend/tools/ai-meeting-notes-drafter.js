// Tool: AI Meeting Notes Drafter
// Generates a plan for drafting meeting notes from transcripts or recordings.

module.exports = {
  async run({ params }) {
    const meetingType = params?.meetingType || 'product sync';
    const durationMinutes = Number(params?.durationMinutes) || 45;
    const attendees = Number(params?.attendees) || 6;
    const includeActionItems = Boolean(params?.includeActionItems);

    const template = {
      header: ['Data', 'Partecipanti', 'Obiettivo', 'Sintesi'],
      sections: [
        'Agenda',
        'Discussione principale',
        'Decisioni prese',
        'Action items',
        'Follow-up / proximo incontro',
      ],
    };

    const pipeline = [
      'Trascrivi meeting (Whisper, Google Speech-to-Text).',
      'Rimuovi filler words e note personali.',
      'Raggruppa interventi per topic usando clustering o tagging manuale.',
      'Genera sintesi bullet per ciascun topic.',
      includeActionItems ? 'Estrai action items con owner e deadline.' : 'Segnala azioni come note generiche.',
      'Invia bozza per review e raccogli correzioni.',
    ].filter(Boolean);

    return {
      summary: `Meeting notes per ${meetingType} (${durationMinutes} minuti, ${attendees} partecipanti).`,
      meetingType,
      durationMinutes,
      attendees,
      includeActionItems,
      template,
      pipeline,
      qaChecklist: [
        'Verifica accuratezza nomi e decisioni.',
        'Controlla che action items abbiano owner e scadenza.',
        'Assicurati che eventuali informazioni sensibili siano rimosse prima della condivisione.',
      ],
      distribution: [
        'Invia note via email/Slack entro 24h.',
        'Archivia su Notion/Confluence con tag meetingType.',
        'Aggiorna task manager (Jira/Asana) con action items confermati.',
      ],
    };
  },
};










