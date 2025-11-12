# SHA256 Hash Generator

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `sha256-hash`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Generate SHA256 hash from text
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1

## Schema
```json
{
  "$id": "sha256-hash.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da convertire in hash"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
