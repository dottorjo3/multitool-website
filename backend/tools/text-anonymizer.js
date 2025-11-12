// 🔧 File: backend/tools/text-anonymizer.js
// 🔗 Anonimizza email, numeri di telefono e cifre sensibili

const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_REGEX = /(\+?\d[\d .\-()]{6,}\d)/g;
const NUMBER_REGEX = /\b\d{4,}\b/g;

module.exports = {
  async run({ params }) {
    const text = params.text ?? '';
    const maskEmail = params.maskEmail !== 'false';
    const maskPhone = params.maskPhone !== 'false';
    const maskNumbers = params.maskNumbers === 'true';

    if (!text.trim()) {
      throw new Error('Inserisci un testo da anonimizzare');
    }

    const replacements = [];
    let anonymized = text;

    if (maskEmail) {
      anonymized = anonymized.replace(EMAIL_REGEX, (match) => {
        replacements.push({ type: 'email', original: match });
        return '[email_redacted]';
      });
    }

    if (maskPhone) {
      anonymized = anonymized.replace(PHONE_REGEX, (match) => {
        replacements.push({ type: 'phone', original: match.trim() });
        return '[phone_redacted]';
      });
    }

    if (maskNumbers) {
      anonymized = anonymized.replace(NUMBER_REGEX, (match) => {
        replacements.push({ type: 'number', original: match });
        return '[number_redacted]';
      });
    }

    return {
      originalLength: text.length,
      anonymizedLength: anonymized.length,
      replacementsCount: replacements.length,
      replacements,
      anonymized,
    };
  },
};

