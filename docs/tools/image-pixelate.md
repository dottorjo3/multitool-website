# Image Pixelate

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-pixelate`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Applica un effetto pixel art ridimensionando l’immagine.

## Panoramica
Ridimensiona drasticamente l’immagine con kernel `nearest` e la riporta alla dimensione originale per ottenere blocchi quadrati.

## Parametri principali
- `blockSize` – ampiezza blocchi (2-200 px)

## Schema
```json
{
  "$id": "image-pixelate.schema.json",
  "type": "object",
  "properties": {
    "blockSize": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "16",
      "errorMessage": "La dimensione dei blocchi deve essere tra 2 e 200"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


