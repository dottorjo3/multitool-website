# Lorem Ipsum Generator

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `lorem-ipsum`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Generate placeholder text
- **Input:** `form`
- **Output:** `text`

## Parametri principali
- `paragraphs` — Tipo: integer/string • Default: 3
- `sentences` — Tipo: integer/string • Default: 3

## Schema
```json
{
  "$id": "lorem-ipsum.schema.json",
  "type": "object",
  "properties": {
    "paragraphs": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[1-9]$|^10$",
      "default": "3"
    },
    "sentences": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[1-5]$",
      "default": "3"
    }
  },
  "additionalProperties": false
}
```
