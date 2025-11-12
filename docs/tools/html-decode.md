# HTML Decode

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `html-decode`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Decode HTML entities to text
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1

## Schema
```json
{
  "$id": "html-decode.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo con entità HTML da decodificare"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
