# Whitespace Remover

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `whitespace-remover`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Remove or clean whitespace from text
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1
- `mode` — Tipo: string • Valori: trim, collapse, remove-all, trim-lines • Default: trim

## Schema
```json
{
  "$id": "whitespace-remover.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da pulire"
    },
    "mode": {
      "type": "string",
      "enum": [
        "trim",
        "collapse",
        "remove-all",
        "trim-lines"
      ],
      "default": "trim"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
