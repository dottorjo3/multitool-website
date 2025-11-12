# Extract Audio

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `video-extract-audio`
- **Categoria:** `video`
- **Free:** No
- **Descrizione breve:** Extract MP3, WAV, AAC or FLAC from any video
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `format` — Tipo: string • Valori: mp3, wav, aac, flac • Default: mp3
- `audioBitrate` — Tipo: integer/string • Default: 192

## Schema
```json
{
  "$id": "video-extract-audio.schema.json",
  "type": "object",
  "properties": {
    "format": {
      "type": "string",
      "enum": [
        "mp3",
        "wav",
        "aac",
        "flac"
      ],
      "default": "mp3"
    },
    "audioBitrate": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{2,3}$",
      "default": "192",
      "errorMessage": "Il bitrate audio deve essere compreso tra 64 e 512 kbps"
    }
  },
  "required": [
    "format"
  ],
  "additionalProperties": false
}
```
