// 🔧 File: backend/tools/data-json-validate-schema.js
// 🔗 Valida JSON contro uno schema JSON Schema

const Ajv = require('ajv');
const addFormats = require('ajv-formats');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const schema = params.schema?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci del JSON da validare');
    }

    if (!schema) {
      throw new Error('Inserisci uno schema JSON Schema');
    }

    try {
      const data = JSON.parse(input);
      const jsonSchema = JSON.parse(schema);
      
      const ajv = new Ajv({ allErrors: true });
      addFormats(ajv);
      
      const validate = ajv.compile(jsonSchema);
      const valid = validate(data);
      
      return {
        input: input,
        schema: schema,
        isValid: valid,
        errors: validate.errors || [],
        errorCount: validate.errors ? validate.errors.length : 0,
      };
    } catch (error) {
      throw new Error(`Errore durante la validazione: ${error.message}`);
    }
  },
};


