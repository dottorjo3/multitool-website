// Tool: Dev Incident Playbook
// Crafts an incident response playbook with runbooks, communication and postmortem flow.

module.exports = {
  async run({ params }) {
    const severityLevels = Array.isArray(params?.severityLevels) && params.severityLevels.length > 0
      ? params.severityLevels
      : ['SEV1', 'SEV2', 'SEV3'];
    const communicationChannels = Array.isArray(params?.communicationChannels) && params.communicationChannels.length > 0
      ? params.communicationChannels
      : ['Slack', 'Email', 'StatusPage'];
    const onCallRotation = params?.onCallRotation || 'weekly';

    const playbook = [
      `Definisci criteri severità: ${severityLevels.join(', ')}.`,
      `Stabilisci on-call rotation ${onCallRotation} con escalation.`,
      `Apri war-room su ${communicationChannels.join(', ')} con ruoli (incident commander, comms lead).`,
      'Utilizza runbook per servizi critici (restart, failover, debug).',
      'Documenta timeline e decisioni in incident doc.',
      'Conduci postmortem entro 5 giorni con RCA, azioni follow-up, owner.',
    ];

    return {
      summary: `Incident playbook (severity ${severityLevels.join(', ')}, comms ${communicationChannels.join(', ')})`,
      severityLevels,
      communicationChannels,
      onCallRotation,
      playbook,
      tooling: [
        'PagerDuty / Opsgenie per on-call',
        'Jira/Linear per tracking incident',
        'Statuspage / Atlassian Opsgenie comms',
      ],
      qaChecklist: [
        'Esercitare incident drill trimestrali.',
        'Aggiornare runbook post-release major.',
        'Monitorare MTTR/MTTA e migliorare processi.',
      ],
    };
  },
};









