// 🔧 File: backend/tools/data-json-to-xml.js
// 🔗 Converte JSON a XML

const { Builder } = require('xml2js');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const rootElement = params.rootElement || 'root';
    const pretty = params.pretty !== 'false';
    
    if (!input) {
      throw new Error('Inserisci del JSON da convertire');
    }

    try {
      const json = JSON.parse(input);
      const builder = new Builder({
        rootName: rootElement,
        renderOpts: {
          pretty,
          indent: pretty ? '  ' : '',
          newline: pretty ? '\n' : '',
        },
      });
      
      const xml = builder.buildObject(json);
      
      return {
        original: input,
        xml,
        rootElement,
        jsonLength: input.length,
        xmlLength: xml.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione JSON: ${error.message}`);
    }
  },
};


