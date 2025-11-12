# PDF Rotate

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-rotate`
- **Categoria:** `pdf`
- **Free:** Sì
- **Descrizione breve:** Rotate all pages of a PDF by 90/180/270 degrees
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `rotation` — Tipo: integer • Valori: 90, 180, 270 • Default: 90

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfRotateSchema",
  "type": "object",
  "properties": {
    "rotation": {
      "type": "integer",
      "enum": [
        90,
        180,
        270
      ],
      "default": 90
    }
  },
  "required": [],
  "additionalProperties": false
}
```
