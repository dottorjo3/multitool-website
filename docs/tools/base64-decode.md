# Base64 Decode

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `base64-decode`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Decode Base64 to text
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1
- `urlSafe` — Tipo: string • Valori: true, false • Default: false

## Schema
```json
{
  "$id": "base64-decode.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci la stringa Base64 da decodificare"
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
