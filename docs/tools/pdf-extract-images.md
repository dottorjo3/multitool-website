# PDF Extract Images

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-extract-images`
- **Categoria:** `pdf`
- **Free:** No
- **Descrizione breve:** Extract embedded images from a PDF document
- **Input:** `file`
- **Output:** `json`

## Parametri principali
- `format` — Tipo: string • Valori: png, tiff, jpeg, jpg, jp2, jbig2, ccitt • Default: png
- `includePageNumber` — Tipo: string • Valori: true, false • Default: true

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfExtractImagesSchema",
  "type": "object",
  "properties": {
    "format": {
      "type": "string",
      "enum": [
        "png",
        "tiff",
        "jpeg",
        "jpg",
        "jp2",
        "jbig2",
        "ccitt"
      ],
      "default": "png"
    },
    "includePageNumber": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "true"
    }
  },
  "required": [],
  "additionalProperties": false
}
```
