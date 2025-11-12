# PDF Metadata

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-metadata`
- **Categoria:** `pdf`
- **Free:** Sì
- **Descrizione breve:** View or remove document metadata
- **Input:** `file`
- **Output:** `json`

## Parametri principali
- `mode` — Tipo: string • Valori: view, clean • Default: view

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfMetadataSchema",
  "type": "object",
  "properties": {
    "mode": {
      "type": "string",
      "enum": [
        "view",
        "clean"
      ],
      "default": "view"
    }
  },
  "required": [],
  "additionalProperties": false
}
```
