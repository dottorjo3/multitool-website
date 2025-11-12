# Text Shuffle

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `text-shuffle`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Shuffle text lines randomly with filters and limits
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `input` — Tipo: string • minLength: 1
- `limit` — Tipo: integer/string • Default: 
- `unique` — Tipo: string • Valori: true, false • Default: false
- `removeEmpty` — Tipo: string • Valori: true, false • Default: true

## Schema
```json
{
  "$id": "text-shuffle.schema.json",
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci del testo da mescolare"
    },
    "limit": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{0,4}$",
      "default": "",
      "errorMessage": "Il limite deve essere un numero positivo (max 9999)"
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
