# Remove Duplicates

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `text-duplicate-remover`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Remove duplicate lines or words from text
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1
- `mode` — Tipo: string • Valori: lines, words • Default: lines
- `caseSensitive` — Tipo: string • Valori: true, false • Default: false

## Schema
```json
{
  "$id": "text-duplicate-remover.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Incolla il testo da ripulire"
    },
    "mode": {
      "type": "string",
      "enum": [
        "lines",
        "words"
      ],
      "default": "lines"
    },
    "caseSensitive": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "false"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
