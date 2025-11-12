// 🔧 File: backend/tools/text-reading-time.js
// 🔗 Stima il tempo di lettura con velocità personalizzabile

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    const wordsPerMinute = params.wordsPerMinute ? Number(params.wordsPerMinute) : 200;

    if (!text) {
      throw new Error('Inserisci un testo da analizzare');
    }

    if (Number.isNaN(wordsPerMinute) || wordsPerMinute < 50 || wordsPerMinute > 1000) {
      throw new Error('Le parole al minuto devono essere tra 50 e 1000');
    }

    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = words / wordsPerMinute;

    const minutesRounded = Math.max(Math.ceil(minutes), 1);
    const seconds = Math.round(minutes * 60);

    return {
      words,
      wordsPerMinute,
      minutesExact: Number(minutes.toFixed(2)),
      minutesRounded,
      seconds,
      formatted: minutesRounded <= 1 ? 'meno di 1 minuto' : `${minutesRounded} minuti`,
    };
  },
};



