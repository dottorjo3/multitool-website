# Image Shadow

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-shadow`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Genera una drop shadow personalizzata con offset, blur, spread e colore.

## Parametri principali
- `offsetX`, `offsetY` – posizionamento dell’ombra
- `blur` – intensità sfocatura
- `spread` – estensione
- `color` – colore (HEX)
- `opacity` – opacità (0–1)
- `quality` – qualità di output (solo per WebP/AVIF)

## Output
- Parametri utilizzati
- `outputFile` – immagine risultante con base64 e path temporaneo

## Schema
```json
{
  "$id": "image-shadow.schema.json",
  "type": "object",
  "properties": {
    "offsetX": {
      "type": ["integer", "string"],
      "pattern": "^-?[0-9]{1,4}$",
      "default": "20"
    },
    "offsetY": {
      "type": ["integer", "string"],
      "pattern": "^-?[0-9]{1,4}$",
      "default": "20"
    },
    "blur": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,4}$",
      "default": "30"
    },
    "spread": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,4}$",
      "default": "40"
    },
    "opacity": {
      "type": ["number", "string"],
      "pattern": "^(1(\\.0+)?|0(\\.\\d+)?)$",
      "default": "0.35"
    },
    "color": {
      "type": "string",
      "pattern": "^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$",
      "default": "#000000"
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


