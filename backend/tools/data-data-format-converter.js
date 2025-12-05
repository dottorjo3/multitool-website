// 🔧 File: backend/tools/data-data-format-converter.js
// 🔗 Convertitore universale tra formati (JSON, CSV, YAML, XML)

const yaml = require('js-yaml');
const { parse, stringify } = require('csv-parse/sync');
const { parseString, Builder } = require('xml2js');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const fromFormat = params.fromFormat || 'json';
    const toFormat = params.toFormat || 'csv';
    
    if (!input) {
      throw new Error('Inserisci i dati da convertire');
    }

    if (fromFormat === toFormat) {
      throw new Error('Il formato di origine e destinazione sono identici');
    }

    try {
      // Parse dal formato source
      let parsed;
      switch (fromFormat) {
        case 'json':
          parsed = JSON.parse(input);
          break;
        case 'yaml':
          parsed = yaml.load(input);
          break;
        case 'csv':
          parsed = parse(input, { columns: true, skip_empty_lines: true });
          break;
        case 'xml':
          // XML parsing asincrono - semplificato
          throw new Error('Conversione XML richiede implementazione asincrona');
        default:
          throw new Error(`Formato source non supportato: ${fromFormat}`);
      }
      
      // Converti al formato target
      let output;
      switch (toFormat) {
        case 'json':
          output = JSON.stringify(parsed, null, 2);
          break;
        case 'yaml':
          output = yaml.dump(parsed, { indent: 2 });
          break;
        case 'csv':
          if (Array.isArray(parsed)) {
            output = stringify(parsed, { header: true });
          } else {
            throw new Error('Per convertire in CSV, il JSON deve essere un array');
          }
          break;
        default:
          throw new Error(`Formato target non supportato: ${toFormat}`);
      }
      
      return {
        original: input,
        converted: output,
        fromFormat,
        toFormat,
        originalLength: input.length,
        convertedLength: output.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};


