// 🔧 File: backend/tools/text-extract-emails.js
// 🔗 Estrae indirizzi email da un testo

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

module.exports = {
  async run({ params }) {
    const text = params.input?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci il testo da cui estrarre le email');
    }

    const emails = [];
    const seen = new Set();
    let match;

    while ((match = EMAIL_REGEX.exec(text)) !== null) {
      const email = match[0].toLowerCase();
      if (!seen.has(email)) {
        seen.add(email);
        emails.push({
          email,
          position: match.index,
        });
      }
    }

    return {
      count: emails.length,
      emails: emails.map(e => e.email),
      emailsWithPosition: emails,
    };
  },
};

