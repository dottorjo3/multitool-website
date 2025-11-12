# Image Sharpen

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-sharpen`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Aumenta la nitidezza regolando sigma/flat/jagged.

## Panoramica
Si appoggia a `sharp.sharpen(sigma, flat, jagged)` per regolare la nitidezza, accettando valori da 0 a 10.

## Parametri principali
- `sigma` – definisce la rilevanza dei bordi
- `flat` – controlla le superfici piatte
- `jagged` – controlla gli spigoli marcati

## Schema
```json
{
  "$id": "image-sharpen.schema.json",
  "type": "object",
  "properties": {
    "sigma": {
      "type": ["number", "string"],
      "pattern": "^(10|\\d(\\.\\d+)?)$",
      "default": "1",
      "errorMessage": "Sigma deve essere tra 0 e 10"
    },
    "flat": {
      "type": ["number", "string"],
      "pattern": "^(10|\\d(\\.\\d+)?)$",
      "default": "1",
      "errorMessage": "Flat deve essere tra 0 e 10"
    },
    "jagged": {
      "type": ["number", "string"],
      "pattern": "^(10|\\d(\\.\\d+)?)$",
      "default": "2",
      "errorMessage": "Jagged deve essere tra 0 e 10"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


