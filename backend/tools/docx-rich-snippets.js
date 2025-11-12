// Tool: DOCX Rich Snippets Library
// Creates reusable DOCX snippets with placeholders, auto-fill rules and governance.

module.exports = {
  async run({ params }) {
    const snippetCount = Number(params?.snippetCount) || 20;
    const placeholderSyntax = params?.placeholderSyntax || '{{variable}}';
    const storageLocation = params?.storageLocation || 'SharePoint';

    const steps = [
      `Catalogare snippet più usati (target ${snippetCount}).`,
      `Standardizzare placeholder con sintassi ${placeholderSyntax}.`,
      'Inserire snippet in libreria Quick Parts o Add-in custom.',
      'Definire categorie (clausole, CTA, disclaimers).',
      `Salvare libreria in ${storageLocation} con controllo versioni.`,
    ];

    const automation = [
      'Script per sostituire placeholder con dati CRM/ERP.',
      'Validazione snippet prima del merge (lunghezza, variabili mancanti).',
      'Log utilizzo snippet per aggiornamenti periodici.',
    ];

    return {
      summary: `Libreria DOCX snippet (${snippetCount} elementi) con placeholder ${placeholderSyntax}.`,
      snippetCount,
      placeholderSyntax,
      storageLocation,
      steps,
      automation,
      qaChecklist: [
        'Verifica che gli snippet non contengano formattazioni errate.',
        'Aggiorna versioni quando cambiano termini legali.',
        'Garantisci accesso controllato e audit trail.',
      ],
    };
  },
};










