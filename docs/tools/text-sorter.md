# Text Sorter

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `text-sorter`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Sort text lines with options for order, uniqueness and case sensitivity
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `input` — Tipo: string • minLength: 1
- `order` — Tipo: string • Valori: asc, desc • Default: asc
- `caseSensitive` — Tipo: string • Valori: true, false • Default: false
- `unique` — Tipo: string • Valori: true, false • Default: false
- `removeEmpty` — Tipo: string • Valori: true, false • Default: true

## Schema
```json
{
  "$id": "text-sorter.schema.json",
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci del testo da ordinare"
    },
    "order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "default": "asc"
    },
    "caseSensitive": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "false"
    },
    "unique": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "false"
    },
    "removeEmpty": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "true"
    }
  },
  "required": [
    "input"
  ],
  "additionalProperties": false
}
```
