# PDF Watermark

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-watermark`
- **Categoria:** `pdf`
- **Free:** Sì
- **Descrizione breve:** Add a diagonal text watermark to each page
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `text` — Tipo: string • minLength: 1
- `opacity` — Tipo: number • Default: 0.2
- `fontSize` — Tipo: integer • Default: 48

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfWatermarkSchema",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1
    },
    "opacity": {
      "type": "number",
      "minimum": 0.05,
      "maximum": 1,
      "default": 0.2
    },
    "fontSize": {
      "type": "integer",
      "minimum": 12,
      "maximum": 120,
      "default": 48
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
