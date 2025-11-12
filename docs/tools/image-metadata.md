# Image Metadata Cleaner

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `image-metadata`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Inspect and remove EXIF/ICC metadata
- **Input:** `file`
- **Output:** `json`

## Parametri principali
- `clean` — Tipo: string • Valori: true, false • Default: false

## Schema
```json
{
  "$id": "image-metadata.schema.json",
  "type": "object",
  "properties": {
    "clean": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "false"
    }
  },
  "additionalProperties": false
}
```
