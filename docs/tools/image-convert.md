# Image Convert

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `image-convert`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Convert images to JPEG, PNG, WebP, AVIF or TIFF
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `format` — Tipo: string • Valori: jpeg, jpg, png, webp, avif, tiff
- `quality` — Tipo: integer/string

## Schema
```json
{
  "$id": "image-convert.schema.json",
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
      "errorMessage": "Seleziona un formato supportato"
    },
    "quality": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^(100|[1-9]?[0-9])$",
      "errorMessage": "La qualità deve essere compresa tra 1 e 100"
    }
  },
  "required": [
    "format"
  ],
  "additionalProperties": false
}
```
