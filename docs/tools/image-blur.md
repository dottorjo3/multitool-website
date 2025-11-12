# Image Blur

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-blur`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Applica un blur gaussiano con intensità personalizzabile.

## Panoramica
Si appoggia a `sharp.blur(sigma)` per sfocare l’immagine. Supporta JPEG, PNG, WebP e AVIF in output.

## Parametri principali
- `sigma` – intensità del blur (0.3 – 1000)

## Schema
```json
{
  "$id": "image-blur.schema.json",
  "type": "object",
  "properties": {
    "sigma": {
      "type": ["integer", "number", "string"],
      "pattern": "^[0-9]+(\\.[0-9]+)?$",
      "default": "5",
      "errorMessage": "Il valore di blur deve essere compreso tra 0.3 e 1000"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


