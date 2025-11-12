// Tool: Operations Travel Policy Planner
// Designs corporate travel policy with allowances, approvals and duty of care.

module.exports = {
  async run({ params }) {
    const travelRegions = Array.isArray(params?.travelRegions) && params.travelRegions.length > 0
      ? params.travelRegions
      : ['Domestic', 'EU', 'International'];
    const approvalMatrix = Array.isArray(params?.approvalMatrix) && params.approvalMatrix.length > 0
      ? params.approvalMatrix
      : ['Manager', 'Finance', 'Exec'];
    const expensePlatform = params?.expensePlatform || 'Navan';

    const policy = {
      allowances: travelRegions.map((region) => ({
        region,
        perDiem: 'Definire per diem giornaliero (alloggio, pasti, trasporti).',
        bookingGuidelines: 'Preferenze fornitori, anticipo minimo, classi consentite.',
      })),
      approvals: [
        `Workflow approvazione: ${approvalMatrix.join(' → ')}.`,
        'Soglie spesa per classe viaggio e durata.',
        'Eccezioni e processi emergenza.',
      ],
      dutyOfCare: [
        'Registrazione viaggiatori e contatti emergenza.',
        'Monitoraggio rischi paese (assicurazione, advisory).',
        'Canale comunicazione urgente (SMS/email).',
      ],
      expenseManagement: [
        `Integrazione con ${expensePlatform} per report spesa.`,
        'Linee guida ricevute e carbon footprint tracking.',
        'Auditing e riconciliazione mensile.',
      ],
    };

    return {
      summary: `Travel policy planner (${travelRegions.length} regioni, piattaforma ${expensePlatform}).`,
      travelRegions,
      approvalMatrix,
      expensePlatform,
      policy,
      automation: [
        'Template approvazione automations in HRIS/Expense.',
        'Alert budget superato e violazioni policy.',
        'Dashboard viaggi e KPI sostenibilità.',
      ],
      qaChecklist: [
        'Aggiornare policy annualmente o su cambi normativi.',
        'Allineare con legale e HR per benefit.',
        'Condurre survey dipendenti per miglioramento continuo.',
      ],
    };
  },
};

