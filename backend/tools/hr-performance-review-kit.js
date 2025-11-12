// Tool: HR Performance Review Kit
// Provides a performance review program with cycles, templates and calibration.

module.exports = {
  async run({ params }) {
    const reviewCadence = params?.reviewCadence || 'biannual';
    const frameworks = Array.isArray(params?.frameworks) && params.frameworks.length > 0
      ? params.frameworks
      : ['OKR', 'Competency', '360 feedback'];
    const platforms = Array.isArray(params?.platforms) && params.platforms.length > 0
      ? params.platforms
      : ['Lattice', 'CultureAmp', 'Google Workspace'];

    const program = [
      { phase: 'Preparation', tasks: ['Aggiornare obiettivi', 'Formare manager', 'Aprire ciclo'], owners: ['HR', 'Leadership'] },
      { phase: 'Self Review', tasks: ['Guideline per dipendenti', 'Promemoria automatici'], owners: ['Dipendente', 'Manager'] },
      { phase: 'Manager Review', tasks: ['Valutazione competenze', 'Raccolta feedback 360'], owners: ['Manager', 'Peers'] },
      { phase: 'Calibration', tasks: ['Sessioni cross-team', 'Analisi bias'], owners: ['HRBP', 'Leadership'] },
      { phase: 'Finalize & Development', tasks: ['Consegna risultati', 'Piani sviluppo'], owners: ['Manager', 'HR'] },
    ];

    return {
      summary: `Performance review kit (${reviewCadence}, framework ${frameworks.join(', ')}).`,
      reviewCadence,
      frameworks,
      platforms,
      program,
      templates: [
        'Modello self-review e manager review.',
        'Guida conversazioni di crescita.',
        'Checklist calibration meeting.',
      ],
      automation: [
        `Workflow su ${platforms.join(', ')} per reminder e raccolta feedback.`,
        'Dashboard progress ciclo e completion rate.',
        'Analisi risultati e salary planning export.',
      ],
      qaChecklist: [
        'Verificare compliance normativa locale.',
        'Monitorare bias e fairness.',
        'Raccogliere feedback post-ciclo per migliorare.',
      ],
    };
  },
};






