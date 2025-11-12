# PDF to HTML

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-to-html`
- **Categoria:** `pdf`
- **Free:** No
- **Descrizione breve:** Convert PDF pages to a single HTML file
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `zoom` — Percentuale di zoom (default 100) • Tipo: number • Default: 100
- `firstPage` — Prima pagina da convertire • Tipo: integer
- `lastPage` — Ultima pagina da convertire • Tipo: integer

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfToHtmlSchema",
  "type": "object",
  "properties": {
    "zoom": {
      "type": "number",
      "minimum": 10,
      "maximum": 500,
      "default": 100,
      "description": "Percentuale di zoom (default 100)"
    },
    "firstPage": {
      "type": "integer",
      "minimum": 1,
      "description": "Prima pagina da convertire"
    },
    "lastPage": {
      "type": "integer",
      "minimum": 1,
      "description": "Ultima pagina da convertire"
    }
  },
  "required": [],
  "additionalProperties": false
}
```
