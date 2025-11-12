# Video to GIF

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `video-to-gif`
- **Categoria:** `video`
- **Free:** Sì
- **Descrizione breve:** Create GIF animations from video clips
- **Input:** `file`
- **Output:** `image`

## Parametri principali
- `fps` — Tipo: integer/string • Default: 12
- `width` — Tipo: integer/string • Default: 
- `start` — Tipo: string • Default: 
- `duration` — Tipo: string • Default: 

## Schema
```json
{
  "$id": "video-to-gif.schema.json",
  "type": "object",
  "properties": {
    "fps": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{1,2}$",
      "default": "12",
      "errorMessage": "FPS deve essere tra 1 e 30"
    },
    "width": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{2,4}$",
      "default": "",
      "errorMessage": "Inserisci una larghezza valida (px)"
    },
    "start": {
      "type": "string",
      "default": ""
    },
    "duration": {
      "type": "string",
      "default": ""
    }
  },
  "required": [],
  "additionalProperties": false
}
```
