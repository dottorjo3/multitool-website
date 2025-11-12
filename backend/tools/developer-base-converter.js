// 🔧 File: backend/tools/developer-base-converter.js
// 🔗 Converte numeri tra basi 2-36 con supporto BigInt

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';

function parseValue(value, base) {
  const trimmed = value.trim();
  if (trimmed === '') {
    throw new Error('Inserisci un valore da convertire');
  }

  let sign = 1n;
  let digits = trimmed;
  if (trimmed.startsWith('-')) {
    sign = -1n;
    digits = trimmed.slice(1);
  } else if (trimmed.startsWith('+')) {
    digits = trimmed.slice(1);
  }

  const radix = BigInt(base);
  let total = 0n;

  for (let i = 0; i < digits.length; i += 1) {
    const char = digits[i].toLowerCase();
    const index = ALPHABET.indexOf(char);
    if (index === -1 || index >= base) {
      throw new Error(`Carattere "${char}" non valido per la base ${base}`);
    }
    total = total * radix + BigInt(index);
  }

  return sign * total;
}

function convertToBase(value, base) {
  if (value === 0n) {
    return '0';
  }

  const targetBase = BigInt(base);
  let remaining = value < 0n ? -value : value;
  let converted = '';

  while (remaining > 0n) {
    const remainder = remaining % targetBase;
    converted = ALPHABET[Number(remainder)] + converted;
    remaining /= targetBase;
  }

  if (value < 0n) {
    converted = `-${converted}`;
  }
  return converted;
}

module.exports = {
  async run({ params }) {
    const value = params.value ?? '';
    const fromBase = Number(params.fromBase || 10);
    const toBase = Number(params.toBase || 16);

    if (Number.isNaN(fromBase) || fromBase < 2 || fromBase > 36) {
      throw new Error('Base di origine non valida (2-36)');
    }
    if (Number.isNaN(toBase) || toBase < 2 || toBase > 36) {
      throw new Error('Base di destinazione non valida (2-36)');
    }

    const numericValue = parseValue(value, fromBase);

    return {
      input: value,
      fromBase,
      toBase,
      decimal: numericValue.toString(10),
      output: convertToBase(numericValue, toBase),
    };
  },
};

