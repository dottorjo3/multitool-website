# PDF Compress

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-compress`
- **Categoria:** `pdf`
- **Free:** Sì
- **Descrizione breve:** Reduce PDF size by rebuilding the document
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `quality` — Tipo: integer • Default: 75

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfCompressSchema",
  "type": "object",
  "properties": {
    "quality": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 75
    }
  },
  "required": [],
  "additionalProperties": false
}
```
