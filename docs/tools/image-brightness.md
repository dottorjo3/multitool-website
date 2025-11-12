# Image Brightness

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-brightness`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Regola la luminosità delle immagini utilizzando Sharp.

## Parametri principali
- `brightness` – fattore compreso tra 0.1 e 3
- `quality` – qualità di output (se applicabile)

## Output
- `brightness`
- `outputFile` – immagine risultante con base64 e path temporaneo

## Schema
```json
{
  "$id": "image-brightness.schema.json",
  "type": "object",
  "properties": {
    "brightness": {
      "type": ["number", "string"],
      "pattern": "^[0-9]+(\\.[0-9]+)?$",
      "default": "1",
      "errorMessage": "La luminosità deve essere compresa tra 0.1 e 3"
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


