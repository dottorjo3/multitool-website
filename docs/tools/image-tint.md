# Image Tint

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-tint`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Applica una tinta colore uniforme sull’immagine usando `sharp.tint`.

## Parametri principali
- `color` – colore HEX (es. `#FF6B6B`)
- `quality` – qualità di output (per JPEG/WebP/AVIF)

## Schema
```json
{
  "$id": "image-tint.schema.json",
  "type": "object",
  "properties": {
    "color": {
      "type": "string",
      "pattern": "^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$",
      "default": "#FF6B6B",
      "errorMessage": "Inserisci un colore HEX valido"
    },
    "quality": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "85"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


