// 🔧 File: backend/tools/math-currency-converter.js
// 🔗 Convertitore valute (usa API esterna se disponibile, altrimenti mock)

const Currency = require('currency.js');

module.exports = {
  async run({ params }) {
    const amount = parseFloat(params.amount) || 0;
    const fromCurrency = params.fromCurrency || 'USD';
    const toCurrency = params.toCurrency || 'EUR';
    
    if (isNaN(amount) || amount < 0) {
      throw new Error('Inserisci un importo valido');
    }

    // TODO: Integrare API reale per tassi di cambio (es: Currency API)
    // Per ora usa conversioni mock/fixed
    const exchangeRates = {
      'USD': { 'EUR': 0.85, 'GBP': 0.73, 'JPY': 110, 'USD': 1 },
      'EUR': { 'USD': 1.18, 'GBP': 0.86, 'JPY': 129.5, 'EUR': 1 },
      'GBP': { 'USD': 1.37, 'EUR': 1.16, 'JPY': 150.7, 'GBP': 1 },
      'JPY': { 'USD': 0.0091, 'EUR': 0.0077, 'GBP': 0.0066, 'JPY': 1 },
    };
    
    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (!rate) {
      throw new Error(`Conversione da ${fromCurrency} a ${toCurrency} non disponibile`);
    }
    
    const converted = amount * rate;
    
    return {
      amount,
      fromCurrency,
      toCurrency,
      rate,
      converted,
      formatted: Currency(converted, { symbol: '', separator: '.', decimal: ',' }).format(),
      note: 'Tassi di cambio approssimativi. Per dati reali, configura Currency API.',
    };
  },
};


