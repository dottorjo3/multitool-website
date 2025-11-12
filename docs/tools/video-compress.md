# Video Compressor

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `video-compress`
- **Categoria:** `video`
- **Free:** No
- **Descrizione breve:** Reduce video size by controlling bitrate and resolution
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `width` — Tipo: integer/string • Default: 
- `height` — Tipo: integer/string • Default: 
- `videoBitrate` — Tipo: integer/string • Default: 2500
- `audioBitrate` — Tipo: integer/string • Default: 128
- `crf` — Tipo: integer/string • Default: 24
- `preset` — Tipo: string • Valori: ultrafast, superfast, veryfast, faster, fast, medium, slow, slower • Default: medium

## Schema
```json
{
  "$id": "video-compress.schema.json",
  "type": "object",
  "properties": {
    "width": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{2,4}$",
      "default": ""
    },
    "height": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{2,4}$",
      "default": ""
    },
    "videoBitrate": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{3,5}$",
      "default": "2500",
      "errorMessage": "Inserisci un bitrate video valido (kbit)"
    },
    "audioBitrate": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{2,3}$",
      "default": "128",
      "errorMessage": "Inserisci un bitrate audio valido (kbit)"
    },
    "crf": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{1,2}$",
      "default": "24",
      "errorMessage": "CRF deve essere compreso tra 18 e 35"
    },
    "preset": {
      "type": "string",
      "enum": [
        "ultrafast",
        "superfast",
        "veryfast",
        "faster",
        "fast",
        "medium",
        "slow",
        "slower"
      ],
      "default": "medium"
    }
  },
  "required": [],
  "additionalProperties": false
}
```
