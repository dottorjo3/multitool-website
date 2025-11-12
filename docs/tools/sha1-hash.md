# SHA1 Hash Generator

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `sha1-hash`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Generate SHA1 hash from text
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1

## Schema
```json
{
  "$id": "sha1-hash.schema.json",
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
