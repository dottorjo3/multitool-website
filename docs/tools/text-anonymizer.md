# Text Anonymizer

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-anonymizer`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Sostituisce email, numeri di telefono e valori numerici lunghi con placeholder.

## Panoramica
Usa regex predefinite per email, telefoni e cifre (>=4) e produce un report delle sostituzioni, oltre al testo anonimizzato.

## Parametri principali
- `text` – testo da anonimizzare
- `maskEmail` – abilita/disabilita mascheramento email
- `maskPhone` – abilita/disabilita mascheramento telefoni
- `maskNumbers` – maschera numeri lunghi

## Schema
```json
{
  "$id": "text-anonymizer.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 5,
      "errorMessage": "Incolla un testo da anonimizzare"
    },
    "maskEmail": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "true"
    },
    "maskPhone": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "true"
    },
    "maskNumbers": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "false"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```

