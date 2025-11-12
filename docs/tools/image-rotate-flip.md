# Image Rotate & Flip

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `image-rotate-flip`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Rotate or flip images with custom degrees and export format
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `rotation` — Tipo: integer/string • Default: 0
- `flipHorizontal` — Tipo: string • Valori: true, false • Default: false
- `flipVertical` — Tipo: string • Valori: true, false • Default: false
- `format` — Tipo: string • Valori: , jpeg, jpg, png, webp, avif • Default: 
- `quality` — Tipo: integer/string • Default: 90

## Schema
```json
{
  "$id": "image-rotate-flip.schema.json",
  "type": "object",
  "properties": {
    "rotation": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^-?[0-9]{1,3}$",
      "default": "0",
      "errorMessage": "Inserisci un angolo di rotazione valido"
    },
    "flipHorizontal": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "false"
    },
    "flipVertical": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "false"
    },
    "format": {
      "type": "string",
      "enum": [
        "",
        "jpeg",
        "jpg",
        "png",
        "webp",
        "avif"
      ],
      "default": ""
    },
    "quality": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[1-9][0-9]?$|^100$",
      "default": "90",
      "errorMessage": "La qualità deve essere tra 1 e 100"
    }
  },
  "required": [],
  "additionalProperties": false
}
```
