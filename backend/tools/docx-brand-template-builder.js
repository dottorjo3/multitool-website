// Tool: DOCX Brand Template Builder
// Creates a plan for building branded DOCX templates with styles, components and automation.

module.exports = {
  async run({ params }) {
    const brandPalette = Array.isArray(params?.brandPalette) && params.brandPalette.length > 0
      ? params.brandPalette
      : ['#2D3FE5', '#FFB400', '#0F172A'];
    const fonts = params?.fonts || 'Inter / Calibri';
    const templateTypes = Array.isArray(params?.templateTypes) && params.templateTypes.length > 0
      ? params.templateTypes
      : ['proposal', 'report'];
    const automation = Boolean(params?.automation);

    const styles = [
      'Heading 1-3 con font e colori brand',
      'Body text, quote, callout',
      'Tabella standard (header colorato, zebra)',
      'Bullet e numbering coerenti',
      'Stili per cover page e sommario',
    ];

    const components = [
      'Cover con logo, claim e dati cliente',
      'Indice auto-aggiornante',
      'Sezione “About us” precompilata',
      'Tabella prezzi / deliverable',
      'Footer con contatti e disclaimer',
    ];

    const workflow = [
      'Imposta theme DOCX (colori, font) con tool come ThemeColors/ThemeFonts.',
      'Crea file base .dotx con stili personalizzati.',
      'Inserisci quick parts (AutoText) per blocchi riutilizzabili.',
      automation
        ? 'Integra script (docxtemplater/Templater) per compilazione automatica da CRM.'
        : 'Distribuisci template e guida d’uso ai team.',
      'Versiona template e programma review trimestrale.',
    ].filter(Boolean);

    return {
      summary: `Template DOCX brand (palette ${brandPalette.join(', ')}) per ${templateTypes.join(', ')}.`,
      brandPalette,
      fonts,
      templateTypes,
      automation,
      styles,
      components,
      workflow,
      qaChecklist: [
        'Verifica compatibilità con Word desktop/web e Google Docs.',
        'Controlla TOC, numerazione e riferimenti automatici.',
        'Testa merge con dati dinamici (se automation attivata).',
      ],
      tooling: [
        'Microsoft Word (Theme builder + Quick Parts)',
        'docxtemplater / Carbone.io per automazioni',
        'PowerAutomate / Zapier per generazione massiva',
      ],
    };
  },
};










