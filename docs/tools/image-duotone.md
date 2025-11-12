# Image Duotone

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-duotone`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Applica un effetto duotone mappando le tonalità verso due colori personalizzabili.

## Parametri principali
- `shadowColor` – colore ombra (HEX)
- `highlightColor` – colore highlight (HEX)
- `quality` – qualità di output (se applicabile)

## Output
- `shadowColor`, `highlightColor`
- `outputFile` – immagine risultante con base64 e path temporaneo

## Schema
```json
{
  "$id": "image-duotone.schema.json",
  "type": "object",
  "properties": {
    "shadowColor": {
      "type": "string",
      "pattern": "^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$",
      "default": "#1F2937"
    },
    "highlightColor": {
      "type": "string",
      "pattern": "^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$",
      "default": "#F59E0B"
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


