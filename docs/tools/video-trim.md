# Video Trimmer

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `video-trim`
- **Categoria:** `video`
- **Free:** Sì
- **Descrizione breve:** Cut clips by start time and duration without re-encoding
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `start` — Tipo: string • Default: 
- `duration` — Tipo: string • Default: 

## Schema
```json
{
  "$id": "video-trim.schema.json",
  "type": "object",
  "properties": {
    "start": {
      "type": "string",
      "default": ""
    },
    "duration": {
      "type": "string",
      "default": ""
    }
  },
  "anyOf": [
    {
      "required": [
        "start"
      ]
    },
    {
      "required": [
        "duration"
      ]
    }
  ],
  "additionalProperties": false
}
```
