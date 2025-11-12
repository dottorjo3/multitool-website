# Random Line Picker

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `text-random-line`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Pick random lines from text with uniqueness and filters
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `input` — Tipo: string • minLength: 1
- `count` — Tipo: integer/string • Default: 1
- `unique` — Tipo: string • Valori: true, false • Default: false
- `removeEmpty` — Tipo: string • Valori: true, false • Default: true

## Schema
```json
{
  "$id": "text-random-line.schema.json",
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci del testo da cui estrarre le righe"
    },
    "count": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{1,3}$",
      "default": "1",
      "errorMessage": "Inserisci un numero tra 1 e 999"
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
