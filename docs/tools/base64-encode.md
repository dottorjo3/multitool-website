# Base64 Encode

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `base64-encode`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Encode text to Base64
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1
- `urlSafe` — Tipo: string • Valori: true, false • Default: false

## Schema
```json
{
  "$id": "base64-encode.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da codificare"
    },
    "urlSafe": {
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
