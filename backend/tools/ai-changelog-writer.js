// Tool: AI Changelog Writer
// Generates a plan for drafting changelogs from commits, tickets and release notes.

module.exports = {
  async run({ params }) {
    const sourceSystems = Array.isArray(params?.sourceSystems) && params.sourceSystems.length > 0
      ? params.sourceSystems
      : ['git', 'jira', 'ci'];
    const tone = params?.tone || 'friendly';
    const sections = Array.isArray(params?.sections) && params.sections.length > 0
      ? params.sections
      : ['New', 'Improved', 'Fixed'];

    const workflow = [
      `Raccogli changelog data da ${sourceSystems.join(', ')} (tag release, ticket, commit).`,
      'Classifica modifiche per categoria/section.',
      `Genera testo finale con tone ${tone}, includendo CTA o link doc.`,
      'Review manuale rapida e approvazione PM.',
      'Pubblica su blog, email, in-app, changelog page.',
    ];

    return {
      summary: `Changelog writer tone ${tone}, sezioni ${sections.join(', ')}.`,
      sourceSystems,
      tone,
      sections,
      workflow,
      tooling: [
        'Git log parser / Conventional Commits',
        'Linear/Jira API',
        'Notion/Airtable per gestione pubblicazione',
      ],
      automation: [
        'Pipeline CI per generare bozza changelog ad ogni release.',
        'Template multi lingua / multi canale.',
        'Metriche apertura e feedback per iterare.',
      ],
      qaChecklist: [
        'Verifica accuratezza e assenza di info sensibili.',
        'Assicurati coerenza con brand voice.',
        'Controlla link e formattazione su canali target.',
      ],
    };
  },
};









