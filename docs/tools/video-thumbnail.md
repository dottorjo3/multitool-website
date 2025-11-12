# Video Thumbnail Extractor

_Generated manualmente il 2025-11-08_

- **Tool ID:** `video-thumbnail`
- **Categoria:** `video`
- **Free:** Sì
- **Descrizione breve:** Estrae un frame da un video in formato JPG/PNG/WebP.

## Panoramica
Esegue FFmpeg con `-ss` e `-frames:v 1` per salvare l’immagine al timestamp desiderato. Supporta ridimensionamento in larghezza.

## Parametri principali
- `timestamp` – formato `HH:MM:SS` (default 00:00:01)
- `width` – larghezza opzionale (mantiene aspect ratio)
- `format` – `jpg`, `png` o `webp`

## Schema
```json
{
  "$id": "video-thumbnail.schema.json",
  "type": "object",
  "properties": {
    "timestamp": {
      "type": "string",
      "pattern": "^\\d{2}:\\d{2}:\\d{2}(\\.\\d{1,3})?$",
      "default": "00:00:01",
      "errorMessage": "Inserisci un timestamp nel formato HH:MM:SS"
    },
    "width": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{2,4}$",
      "default": "",
      "errorMessage": "La larghezza deve essere tra 16 e 3840"
    },
    "format": {
      "type": "string",
      "enum": ["jpg", "jpeg", "png", "webp"],
      "default": "jpg"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


