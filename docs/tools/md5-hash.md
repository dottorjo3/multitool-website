# MD5 Hash Generator

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `md5-hash`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Generate MD5 hash from text
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1

## Schema
```json
{
  "$id": "md5-hash.schema.json",
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
