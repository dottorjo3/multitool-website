# HTML Encode

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `html-encode`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Encode text to HTML entities
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1

## Schema
```json
{
  "$id": "html-encode.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da convertire in entità HTML"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
