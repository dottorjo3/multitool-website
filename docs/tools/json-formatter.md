# JSON Formatter

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `json-formatter`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Format and beautify JSON code
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `json` — Tipo: string • minLength: 1
- `spaces` — Tipo: integer/string • Default: 2
- `minify` — Tipo: string • Valori: true, false • Default: false

## Schema
```json
{
  "$id": "json-formatter.schema.json",
  "type": "object",
  "properties": {
    "json": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci un JSON valido da formattare"
    },
    "spaces": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^([0-9]|1[0-6])$",
      "default": "2",
      "errorMessage": "Il numero di spazi deve essere compreso tra 0 e 16"
    },
    "minify": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "false"
    }
  },
  "required": [
    "json"
  ],
  "additionalProperties": false
}
```
