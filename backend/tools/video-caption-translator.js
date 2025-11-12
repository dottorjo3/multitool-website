// Tool: Video Caption Translator
// Designs a workflow to translate captions/subtitles with QA and style alignment.

module.exports = {
  async run({ params }) {
    const sourceLang = params?.sourceLang || 'en';
    const targetLang = params?.targetLang || 'it';
    const captionFormat = params?.captionFormat || 'srt';

    const pipeline = [
      `Importa file ${captionFormat} originale in lingua ${sourceLang}.`,
      'Segmenta e normalizza testo (rimozione markup, correzioni baseline).',
      'Traduci con modello/servizio e applica glossario approvato.',
      'Adatta timing per mantenere sync con video.',
      'Esegui QA linguistico + layout (linee brevi, due righe max).',
      'Esporta file in formato target e, se necessario, crea versione burn-in.',
    ];

    const qaChecklist = [
      'Verifica che la traduzione mantenga tono e registro.',
      'Controlla eventuali tag <i>, <b>, note musicali.',
      'Assicurati che i timecode siano coerenti e senza overlap.',
    ];

    return {
      summary: `Traduzione sottotitoli ${captionFormat} da ${sourceLang} a ${targetLang}.`,
      sourceLang,
      targetLang,
      captionFormat,
      pipeline,
      qaChecklist,
      automation: [
        'Integra pipeline in workflow di localization (Lokalise, Memsource).',
        'Genera anteprima video con sottotitoli per review stakeholder.',
        'Programma aggiornamenti automatici quando cambia la lingua sorgente.',
      ],
      tools: [
        'Subtitle Edit / Aegisub',
        'DeepL API / Google Translate + glossari',
        'ffmpeg per burn-in',
      ],
    };
  },
};

// Tool: Video Caption Translator
// Creates a plan for translating video captions and keeping sync with audio.

module.exports = {
  async run({ params }) {
    const sourceLang = params?.sourceLang || 'en';
    const targetLang = params?.targetLang || 'it';
    const format = params?.format || 'srt';
    const includeQC = Boolean(params?.includeQC);

    const workflow = [
      `Converti sottotitoli ${sourceLang} in formato standard (${format}).`,
      'Utilizza CAT tool / API di traduzione mantenendo timestamp.',
      'Adatta lunghezza per rispettare limiti (max 42 caratteri per riga, 2 righe).',
      'Sincronizza eventuali audio voice-over se necessario.',
      includeQC ? 'Esegui controllo qualità con revisore madrelingua e view test.' : null,
    ].filter(Boolean);

    const automation = [
      'Script per traduzione massiva: download SRT → traduci → upload.',
      'Genera pacchetto multi-lingua (.srt, .vtt) e carica su piattaforme.',
      'Usa TMS (Smartcat, Memsource) per memorie e glossari.',
    ];

    return {
      summary: `Traduzione sottotitoli ${sourceLang} → ${targetLang} (${format}).`,
      sourceLang,
      targetLang,
      format,
      includeQC,
      workflow,
      automation,
      qaChecklist: [
        'Verifica che gli idiomi locali siano corretti.',
        'Controlla timing e legibilità su diversi dispositivi.',
        'Aggiorna memorie di traduzione con termini approvati.',
      ],
    };
  },
};


