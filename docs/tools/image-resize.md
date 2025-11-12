# Image Resize

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `image-resize`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Resize images with custom sizes or social presets
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `width` — Tipo: integer/string
- `height` — Tipo: integer/string
- `fit` — Tipo: string • Valori: cover, contain, inside, outside, fill • Default: cover
- `preset` — Tipo: string • Valori: instagram-post, instagram-story, facebook-cover, linkedin-banner, youtube-thumbnail
- `withoutEnlargement` — Tipo: string • Valori: true, false • Default: true
- `format` — Tipo: string • Valori: jpeg, jpg, png, webp, avif, tiff
- `quality` — Tipo: integer/string

## Schema
```json
{
  "$id": "image-resize.schema.json",
  "type": "object",
  "properties": {
    "width": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]+$",
      "errorMessage": "La larghezza deve essere un numero intero"
    },
    "height": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]+$",
      "errorMessage": "L'altezza deve essere un numero intero"
    },
    "fit": {
      "type": "string",
      "enum": [
        "cover",
        "contain",
        "inside",
        "outside",
        "fill"
      ],
      "default": "cover"
    },
    "preset": {
      "type": "string",
      "enum": [
        "instagram-post",
        "instagram-story",
        "facebook-cover",
        "linkedin-banner",
        "youtube-thumbnail"
      ]
    },
    "withoutEnlargement": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "true"
    },
    "format": {
      "type": "string",
      "enum": [
        "jpeg",
        "jpg",
        "png",
        "webp",
        "avif",
        "tiff"
      ]
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
  "additionalProperties": false
}
```
