# Image Watermark

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `image-watermark`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Add text watermark with position, opacity and angle
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `text` — Tipo: string • minLength: 1 • maxLength: 120
- `position` — Tipo: string • Valori: center, top-left, top-right, bottom-left, bottom-right • Default: center
- `opacity` — Tipo: number/string • Default: 0.35
- `fontSize` — Tipo: integer/string • Default: 64
- `angle` — Tipo: integer/string • Default: -35
- `color` — Tipo: string • Default: #FFFFFF

## Schema
```json
{
  "$id": "image-watermark.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "maxLength": 120,
      "errorMessage": "Inserisci il testo del watermark (max 120 caratteri)"
    },
    "position": {
      "type": "string",
      "enum": [
        "center",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right"
      ],
      "default": "center"
    },
    "opacity": {
      "type": [
        "number",
        "string"
      ],
      "pattern": "^(0(\\.\\d+)?|1(\\.0+)?)$",
      "default": "0.35",
      "errorMessage": "L'opacità deve essere compresa tra 0 e 1"
    },
    "fontSize": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^([1-9][0-9]{0,2})$",
      "default": "64",
      "errorMessage": "La dimensione del font deve essere compresa tra 1 e 999"
    },
    "angle": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^-?[0-9]{1,3}$",
      "default": "-35"
    },
    "color": {
      "type": "string",
      "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
      "default": "#FFFFFF",
      "errorMessage": "Inserisci un colore esadecimale valido (es. #ffffff)"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
