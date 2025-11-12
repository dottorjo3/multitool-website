// Tool: Contract Version Diff
// Outlines a workflow to compare contract versions and highlight legal changes.

module.exports = {
  async run({ params }) {
    const baselineVersion = params?.baselineVersion || 'v1.0';
    const newVersion = params?.newVersion || 'v2.0';
    const focusAreas = Array.isArray(params?.focusAreas) && params.focusAreas.length > 0
      ? params.focusAreas
      : ['pricing', 'sla', 'liability'];

    const comparisonSteps = [
      `Confronta ${baselineVersion} vs ${newVersion} con diff testuale (es. redline).`,
      'Normalizza formattazione (indentazione, numerazione clausole).',
      'Classifica modifiche: testo aggiunto, rimosso, modificato.',
      'Evidenzia clausole sensibili (termini pagamento, responsabilità, privacy).',
    ];

    const tooling = [
      'Microsoft Word Track Changes',
      'Pandoc + git diff',
      'ClauseBase / Juro / Contractbook comparator',
    ];

    const reportStructure = [
      'Sintesi modifiche principali con impatto legale.',
      'Tabella comparativa clausole chiave (prima vs dopo).',
      'Azioni raccomandate (approvazione, negoziazione).',
      'Note per stakeholder (Sales, Legal, Finance).',
    ];

    return {
      summary: `Diff contratto ${baselineVersion} → ${newVersion}.`,
      baselineVersion,
      newVersion,
      focusAreas,
      comparisonSteps,
      tooling,
      reportStructure,
      qaChecklist: [
        'Verifica che numerazione clausole sia allineata.',
        'Controlla che revisioni track changes siano accettate o rifiutate correttamente.',
        'Assicurati che allegati e appendici siano inclusi nella comparazione.',
      ],
      automationIdeas: [
        'Setup pipeline git per commit firmati delle versioni contratto.',
        'Invia email automatica agli stakeholder quando viene caricata una nuova versione.',
        'Integra un bot che segnala clausole modificate in Slack/Teams.',
      ],
    };
  },
};










