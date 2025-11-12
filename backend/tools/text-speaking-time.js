// 🔧 File: backend/tools/text-speaking-time.js
// 🔗 Stima il tempo di esposizione orale del testo

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    const wordsPerMinute = params.wordsPerMinute ? Number(params.wordsPerMinute) : 130;

    if (!text) {
      throw new Error('Inserisci il testo da analizzare');
    }

    if (Number.isNaN(wordsPerMinute) || wordsPerMinute < 60 || wordsPerMinute > 250) {
      throw new Error('Le parole al minuto devono essere tra 60 e 250');
    }

    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = words / wordsPerMinute;
    const seconds = Math.round(minutes * 60);

    const minutesRounded = Math.max(Math.ceil(minutes), 1);

    return {
      words,
      wordsPerMinute,
      minutesExact: Number(minutes.toFixed(2)),
      minutesRounded,
      seconds,
      formatted: minutesRounded <= 1 ? 'circa 1 minuto' : `${minutesRounded} minuti`,
    };
  },
};


