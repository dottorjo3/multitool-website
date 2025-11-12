# PDF to Text (Advanced)

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-to-text`
- **Categoria:** `pdf`
- **Free:** No
- **Descrizione breve:** Extract text with layout or raw mode
- **Input:** `file`
- **Output:** `text`

## Parametri principali
- `raw` — Usa -raw (true) o -layout (false) • Tipo: string • Valori: true, false • Default: false
- `firstPage` — Tipo: integer
- `lastPage` — Tipo: integer

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfToTextSchema",
  "type": "object",
  "properties": {
    "raw": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "false",
      "description": "Usa -raw (true) o -layout (false)"
    },
    "firstPage": {
      "type": "integer",
      "minimum": 1
    },
    "lastPage": {
      "type": "integer",
      "minimum": 1
    }
  },
  "required": [],
  "additionalProperties": false
}
```
