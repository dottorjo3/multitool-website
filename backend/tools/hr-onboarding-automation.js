// Tool: HR Onboarding Automation
// Designs automated onboarding workflows with tasks, systems and reminders.

module.exports = {
  async run({ params }) {
    const departments = Array.isArray(params?.departments) && params.departments.length > 0
      ? params.departments
      : ['Engineering', 'Sales', 'Customer Success'];
    const automationTools = Array.isArray(params?.automationTools) && params.automationTools.length > 0
      ? params.automationTools
      : ['BambooHR', 'Zapier', 'Slack'];
    const onboardingLengthDays = Number(params?.onboardingLengthDays) || 30;

    const workflow = [
      { day: -7, tasks: ['Invio welcome kit', 'Setup account IT', 'Firma contratti'], owners: ['HR', 'IT'] },
      { day: 0, tasks: ['Welcome call', 'Tour aziendale', 'Presentazione team'], owners: ['HR', 'Team Lead'] },
      { day: 7, tasks: ['Training ruolo', 'Shadowing', 'Obiettivi primo mese'], owners: ['Manager', 'Buddy'] },
      { day: onboardingLengthDays, tasks: ['Feedback survey', 'Allineamento performance', 'Certificazioni'], owners: ['HR', 'Manager'] },
    ];

    return {
      summary: `Automazione onboarding (${departments.length} dipartimenti, durata ${onboardingLengthDays} giorni).`,
      departments,
      automationTools,
      onboardingLengthDays,
      workflow,
      automation: [
        `Integrazione ${automationTools.join(', ')} per task automatici.`,
        'Template email e reminder Slack.',
        'Dashboard avanzamento onboarding.',
      ],
      qaChecklist: [
        'Aggiornare contenuti training dopo ogni release.',
        'Raccogliere feedback nuovi assunti e manager.',
        'Assicurare compliance con normativa locale.',
      ],
    };
  },
};






