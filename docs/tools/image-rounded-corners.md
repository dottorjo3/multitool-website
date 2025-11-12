# Image Rounded Corners

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-rounded-corners`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Applica una maschera SVG per arrotondare gli angoli dell’immagine.

## Panoramica
Genera un rettangolo SVG con raggio `rx/ry` e lo applica con `sharp.composite(..., blend: 'dest-in')`, supportando output PNG/WebP/AVIF.

## Parametri principali
- `radius` – raggio angoli in pixel (1–2000)

## Schema
```json
{
  "$id": "image-rounded-corners.schema.json",
  "type": "object",
  "properties": {
    "radius": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,4}$",
      "default": "32",
      "errorMessage": "Il raggio deve essere compreso tra 1 e 2000"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


