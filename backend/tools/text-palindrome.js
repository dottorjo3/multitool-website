// 🔧 File: backend/tools/text-palindrome.js
// 🔗 Verifica se frasi o parole sono palindromi

function normalize(value, ignoreCase, ignoreSpaces) {
  let output = value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  if (ignoreSpaces) {
    output = output.replace(/\s+/g, '');
  }
  return ignoreCase ? output.toLowerCase() : output;
}

function isPalindrome(value, options) {
  const normalized = normalize(value, options.ignoreCase, options.ignoreSpaces);
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    const ignoreCase = params.ignoreCase !== 'false';
    const ignoreSpaces = params.ignoreSpaces !== 'false';

    if (!text) {
      throw new Error('Inserisci il testo da analizzare');
    }

    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

    const results = lines.map((line) => ({
      original: line,
      normalized: normalize(line, ignoreCase, ignoreSpaces),
      isPalindrome: isPalindrome(line, { ignoreCase, ignoreSpaces }),
    }));

    const overall = isPalindrome(text, { ignoreCase, ignoreSpaces });

    return {
      ignoreCase,
      ignoreSpaces,
      overallPalindrome: overall,
      items: results,
    };
  },
};


