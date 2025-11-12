# Text Case Converter

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `text-case-converter`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Convert text to uppercase, lowercase, title case or sentence case
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1
- `mode` — Tipo: string • Valori: upper, lower, title, sentence • Default: upper

## Schema
```json
{
  "$id": "text-case-converter.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da convertire"
    },
    "mode": {
      "type": "string",
      "enum": [
        "upper",
        "lower",
        "title",
        "sentence"
      ],
      "default": "upper"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
