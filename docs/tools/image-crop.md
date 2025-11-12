# Image Crop

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-crop`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Ritaglia una porzione dell’immagine a partire da coordinate e dimensioni.

## Panoramica
Usa `sharp.extract` dopo aver validato che l’area richiesta rientri nelle dimensioni originali.

## Parametri principali
- `left`, `top` – coordinate iniziali
- `width`, `height` – dimensioni dell’area da ritagliare

## Schema
```json
{
  "$id": "image-crop.schema.json",
  "type": "object",
  "properties": {
    "left": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,5}$",
      "default": "0"
    },
    "top": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,5}$",
      "default": "0"
    },
    "width": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,5}$",
      "errorMessage": "Inserisci la larghezza dell’area da ritagliare"
    },
    "height": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,5}$",
      "errorMessage": "Inserisci l’altezza dell’area da ritagliare"
    }
  },
  "required": ["width", "height"],
  "additionalProperties": false
}
```


