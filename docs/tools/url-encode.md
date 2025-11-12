# URL Encode

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `url-encode`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Encode text to URL format
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1
- `encodeSpaces` — Tipo: string • Valori: true, false • Default: false

## Schema
```json
{
  "$id": "url-encode.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da codificare"
    },
    "encodeSpaces": {
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
