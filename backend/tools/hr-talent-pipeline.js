// Tool: HR Talent Pipeline Planner
// Creates a hiring pipeline plan with stages, metrics and automation.

module.exports = {
  async run({ params }) {
    const roles = Array.isArray(params?.roles) && params.roles.length > 0
      ? params.roles
      : ['Software Engineer', 'Product Manager', 'Customer Success'];
    const hiringHorizonMonths = Number(params?.hiringHorizonMonths) || 6;
    const atsPlatform = params?.atsPlatform || 'Greenhouse';

    const pipeline = [
      { stage: 'Sourcing', activities: ['Job description', 'Outbound campaigns', 'Referral drive'], metrics: ['pipeline volume', 'source mix'] },
      { stage: 'Screening', activities: ['Resume screen', 'Recruiter call'], metrics: ['pass rate', 'time in stage'] },
      { stage: 'Interview', activities: ['Panel interviews', 'Assessment'], metrics: ['candidate NPS', 'offer ratio'] },
      { stage: 'Offer', activities: ['Offer letter', 'Comp review', 'References'], metrics: ['acceptance rate', 'time to offer'] },
      { stage: 'Pre-boarding', activities: ['Paperwork', 'Equipment', 'Welcome communications'], metrics: ['start readiness', 'drop-off'] },
    ];

    return {
      summary: `Talent pipeline (${roles.length} ruoli, orizzonte ${hiringHorizonMonths} mesi, ATS ${atsPlatform}).`,
      roles,
      hiringHorizonMonths,
      atsPlatform,
      pipeline,
      automation: [
        'Workflow ATS per reminder stage e SLAs.',
        'Dashboard capacity hiring vs target.',
        'Template email automatizzati per candidati.',
      ],
      qaChecklist: [
        'Rivedere bias e diversity metriche ogni trimestre.',
        'Aggiornare job description con hiring manager.',
        'Monitorare compliance privacy/regolatoria.',
      ],
    };
  },
};






