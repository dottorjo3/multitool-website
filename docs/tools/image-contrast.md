# Image Contrast

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-contrast`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Modifica il contrasto di un’immagine ottenendo un risultato più incisivo o morbido.

## Parametri principali
- `contrast` – fattore compreso tra 0.1 e 3
- `quality` – qualità di output (se applicabile)

## Output
- `contrast`
- `outputFile` – immagine elaborata con base64 e path temporaneo

## Schema
```json
{
  "$id": "image-contrast.schema.json",
  "type": "object",
  "properties": {
    "contrast": {
      "type": ["number", "string"],
      "pattern": "^[0-9]+(\\.[0-9]+)?$",
      "default": "1",
      "errorMessage": "Il contrasto deve essere compreso tra 0.1 e 3"
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


