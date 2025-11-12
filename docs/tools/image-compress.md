# Image Compress

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `image-compress`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Compress images with adjustable quality
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `quality` — Tipo: integer/string • Default: 75
- `format` — Tipo: string • Valori: jpeg, jpg, png, webp, avif

## Schema
```json
{
  "$id": "image-compress.schema.json",
  "type": "object",
  "properties": {
    "quality": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^(100|[1-9]?[0-9])$",
      "default": "75",
      "errorMessage": "La qualità deve essere compresa tra 1 e 100"
    },
    "format": {
      "type": "string",
      "enum": [
        "jpeg",
        "jpg",
        "png",
        "webp",
        "avif"
      ],
      "errorMessage": "Formato di uscita non supportato"
    }
  },
  "additionalProperties": false
}
```
