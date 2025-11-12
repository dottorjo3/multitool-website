# Image Batch Resize

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `image-batch-resize`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Resize multiple images simultaneously with presets and ZIP output
- **Input:** `file`
- **Output:** `archive`

## Parametri principali
- `width` — Tipo: integer/string
- `height` — Tipo: integer/string
- `fit` — Tipo: string • Valori: cover, contain, inside, outside, fill • Default: cover
- `withoutEnlargement` — Tipo: string • Valori: true, false • Default: true
- `format` — Tipo: string • Valori: jpeg, jpg, png, webp, avif, tiff • Default: 
- `quality` — Tipo: integer/string • Default: 85

## Schema
```json
{
  "$id": "image-batch-resize.schema.json",
  "type": "object",
  "properties": {
    "width": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{1,5}$",
      "errorMessage": "La larghezza deve essere un numero positivo"
    },
    "height": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{1,5}$",
      "errorMessage": "L'altezza deve essere un numero positivo"
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
      ],
      "default": ""
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
  "anyOf": [
    {
      "required": [
        "width"
      ]
    },
    {
      "required": [
        "height"
      ]
    }
  ],
  "additionalProperties": false
}
```
