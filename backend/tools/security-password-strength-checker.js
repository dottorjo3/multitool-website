// 🔧 File: backend/tools/security-password-strength-checker.js
// 🔗 Verifica robustezza password

module.exports = {
  async run({ params }) {
    const password = params.password?.trim() || '';
    
    if (!password) {
      throw new Error('Inserisci una password da analizzare');
    }

    let score = 0;
    const feedback = [];
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      noCommon: !['password', '123456', 'admin', 'qwerty'].includes(password.toLowerCase()),
      noRepeating: !/(.)\1{2,}/.test(password),
      longEnough: password.length >= 12,
    };
    
    if (checks.length) score += 1;
    if (checks.uppercase) score += 1;
    if (checks.lowercase) score += 1;
    if (checks.numbers) score += 1;
    if (checks.special) score += 1;
    if (checks.noCommon) score += 1;
    if (checks.longEnough) score += 1;
    
    if (!checks.length) feedback.push('Usa almeno 8 caratteri');
    if (!checks.uppercase) feedback.push('Aggiungi lettere maiuscole');
    if (!checks.lowercase) feedback.push('Aggiungi lettere minuscole');
    if (!checks.numbers) feedback.push('Aggiungi numeri');
    if (!checks.special) feedback.push('Aggiungi caratteri speciali (!@#$%)');
    if (!checks.noCommon) feedback.push('Evita password comuni');
    if (!checks.longEnough) feedback.push('Usa almeno 12 caratteri per maggiore sicurezza');
    
    let strength = 'Debole';
    if (score >= 6) strength = 'Forte';
    else if (score >= 4) strength = 'Media';
    
    return {
      password: '***',
      strength,
      score,
      maxScore: 7,
      checks,
      feedback,
      length: password.length,
      recommendations: feedback,
    };
  },
};


