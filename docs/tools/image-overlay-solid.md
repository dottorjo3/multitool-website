# Image Overlay Solid

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-overlay-solid`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Applica un overlay pieno sopra l’immagine con colore e opacità personalizzabili.

## Parametri principali
- `color` – colore overlay (HEX)
- `opacity` – intensità (0–1)
- `quality` – qualità di output (se applicabile)

## Output
- `color`, `opacity`
- `outputFile` – immagine risultante in base64 con path temporaneo

## Schema
```json
{
  "$id": "image-overlay-solid.schema.json",
  "type": "object",
  "properties": {
    "color": {
      "type": "string",
      "pattern": "^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$",
      "default": "#1F2937"
    },
    "opacity": {
      "type": ["number", "string"],
      "pattern": "^(1(\\.0+)?|0(\\.\\d+)?)$",
      "default": "0.5"
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


