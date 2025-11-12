# Video Converter

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `video-convert`
- **Categoria:** `video`
- **Free:** No
- **Descrizione breve:** Convert videos to MP4, WebM, MKV or AVI
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `format` — Tipo: string • Valori: mp4, webm, mkv, avi • Default: mp4
- `crf` — Tipo: integer/string • Default: 23
- `videoBitrate` — Tipo: integer/string • Default: 3500
- `audioBitrate` — Tipo: integer/string • Default: 192
- `preset` — Tipo: string • Valori: ultrafast, superfast, veryfast, faster, fast, medium, slow, slower • Default: medium

## Schema
```json
{
  "$id": "video-convert.schema.json",
  "type": "object",
  "properties": {
    "format": {
      "type": "string",
      "enum": [
        "mp4",
        "webm",
        "mkv",
        "avi"
      ],
      "default": "mp4"
    },
    "crf": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{1,2}$",
      "default": "23",
      "errorMessage": "Il valore CRF deve essere tra 18 e 32"
    },
    "videoBitrate": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{3,5}$",
      "default": "3500",
      "errorMessage": "Inserisci un bitrate video valido (kbit)"
    },
    "audioBitrate": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{2,3}$",
      "default": "192",
      "errorMessage": "Inserisci un bitrate audio valido (kbit)"
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
  "required": [
    "format"
  ],
  "additionalProperties": false
}
```
