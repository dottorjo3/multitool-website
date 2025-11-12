# Text Cleaner

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `text-cleaner`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Clean text by trimming lines, collapsing spaces and removing empty lines
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `input` — Tipo: string • minLength: 1
- `trimLines` — Tipo: string • Valori: true, false • Default: true
- `collapseSpaces` — Tipo: string • Valori: true, false • Default: true
- `removeEmptyLines` — Tipo: string • Valori: true, false • Default: false

## Schema
```json
{
  "$id": "text-cleaner.schema.json",
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci del testo da pulire"
    },
    "trimLines": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "true"
    },
    "collapseSpaces": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "true"
    },
    "removeEmptyLines": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "false"
    }
  },
  "required": [
    "input"
  ],
  "additionalProperties": false
}
```
