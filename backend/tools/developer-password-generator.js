// 🔧 File: backend/tools/developer-password-generator.js
// 🔗 Genera password complesse con set personalizzabili

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>?';

function buildCharset(options) {
  let charset = '';
  if (options.uppercase) charset += UPPER;
  if (options.lowercase) charset += LOWER;
  if (options.digits) charset += DIGITS;
  if (options.symbols) charset += SYMBOLS;
  return charset;
}

function generatePassword(length, charset) {
  if (!charset) {
    throw new Error('Seleziona almeno un set di caratteri');
  }
  let password = '';
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

module.exports = {
  async run({ params }) {
    const length = params.length ? Number(params.length) : 12;
    const count = params.count ? Number(params.count) : 1;

    const options = {
      uppercase: params.uppercase !== 'false',
      lowercase: params.lowercase !== 'false',
      digits: params.digits !== 'false',
      symbols: params.symbols === 'true',
    };

    if (!Number.isInteger(length) || length < 4 || length > 128) {
      throw new Error('La lunghezza deve essere compresa tra 4 e 128');
    }
    if (!Number.isInteger(count) || count < 1 || count > 50) {
      throw new Error('Il numero di password deve essere compreso tra 1 e 50');
    }

    const charset = buildCharset(options);

    const passwords = Array.from({ length: count }, () => generatePassword(length, charset));

    return {
      count,
      length,
      options,
      passwords,
    };
  },
};


