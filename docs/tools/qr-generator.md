# QR Code Generator

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `qr-generator`
- **Categoria:** `other`
- **Free:** Sì
- **Descrizione breve:** Generate QR codes for text or URLs
- **Input:** `text`
- **Output:** `image`

## Parametri principali
- `text` — Tipo: string • minLength: 1
- `width` — Tipo: integer/string • Default: 512
- `margin` — Tipo: integer/string • Default: 2
- `colorDark` — Tipo: string • Default: #000000
- `colorLight` — Tipo: string • Default: #FFFFFF

## Schema
```json
{
  "$id": "qr-generator.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il contenuto del QR code"
    },
    "width": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[1-9][0-9]{1,3}$",
      "default": "512"
    },
    "margin": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{1,2}$",
      "default": "2"
    },
    "colorDark": {
      "type": "string",
      "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
      "default": "#000000"
    },
    "colorLight": {
      "type": "string",
      "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
      "default": "#FFFFFF"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
