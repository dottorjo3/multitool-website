# Image Color Palette

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `image-color-palette`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Extract dominant colors from images for palettes
- **Input:** `file`
- **Output:** `json`

## Parametri principali
- `count` — Tipo: integer/string • Default: 5
- `sampleSize` — Tipo: integer/string • Default: 64
- `ignoreTransparency` — Tipo: string • Valori: true, false • Default: true

## Schema
```json
{
  "$id": "image-color-palette.schema.json",
  "type": "object",
  "properties": {
    "count": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[1-9]$|^1[0-6]$",
      "default": "5",
      "errorMessage": "Il numero di colori deve essere tra 1 e 16"
    },
    "sampleSize": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[1-9][0-9]?$|^1[0-9]{2}$",
      "default": "64",
      "errorMessage": "La dimensione di campionamento deve essere tra 1 e 199"
    },
    "ignoreTransparency": {
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
