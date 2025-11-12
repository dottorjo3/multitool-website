# Image Batch Convert

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `image-batch-convert`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Convert multiple images at once and download as ZIP
- **Input:** `file`
- **Output:** `archive`

## Parametri principali
- `format` — Tipo: string • Valori: jpeg, jpg, png, webp, avif, tiff • Default: jpeg
- `quality` — Tipo: integer/string • Default: 85

## Schema
```json
{
  "$id": "image-batch-convert.schema.json",
  "type": "object",
  "properties": {
    "format": {
      "type": "string",
      "enum": [
        "jpeg",
        "jpg",
        "png",
        "webp",
        "avif",
        "tiff"
      ],
      "default": "jpeg"
    },
    "quality": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[1-9][0-9]?$|^100$",
      "default": "85",
      "errorMessage": "La qualità deve essere tra 1 e 100"
    }
  },
  "required": [
    "format"
  ],
  "additionalProperties": false
}
```
