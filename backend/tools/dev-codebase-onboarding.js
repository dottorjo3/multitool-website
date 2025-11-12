// Tool: Dev Codebase Onboarding Guide
// Creates an onboarding playbook for new engineers covering setup, architecture and standards.

module.exports = {
  async run({ params }) {
    const repoCount = Number(params?.repoCount) || 5;
    const stack = params?.stack || 'TypeScript/Node.js';
    const onboardingDurationDays = Number(params?.onboardingDurationDays) || 14;

    const guide = [
      'Overview architettura e domini principali.',
      `Setup ambiente locale (dipendenze, Docker, env) per stack ${stack}.`,
      'Walkthrough processi CI/CD e deploy.',
      'Linee guida coding standard, lint, testing.',
      'Tour strumenti di osservabilità e debugging.',
      `Percorso affiancamento (buddy) della durata di ${onboardingDurationDays} giorni con milestone.`,
      `Elenco repository principali (${repoCount}) con documentazione e owner.`,
    ];

    return {
      summary: `Codebase onboarding (${stack}) con durata ${onboardingDurationDays} giorni.`,
      repoCount,
      stack,
      onboardingDurationDays,
      guide,
      automation: [
        'Checklist su Notion/Confluence per tracking progresso.',
        'Script bootstrap (dotfiles, tool) automatico.',
        'Survey post-onboarding per migliorare documentazione.',
      ],
      qaChecklist: [
        'Aggiornare guida ad ogni major change architetturale.',
        'Verificare accessi e permessi prima del day-one.',
        'Assicurare visibilità roadmap e backlog per contesto.',
      ],
    };
  },
};









