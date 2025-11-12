# Image Add Border

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-add-border`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Aggiunge un bordo uniforme attorno all’immagine con colore personalizzato.

## Panoramica
Utilizza `sharp.extend` per espandere la canvas e riempirla con un colore HEX specificato.

## Parametri principali
- `border` – spessore del bordo in pixel (1-500)
- `color` – colore bordo in formato HEX

## Schema
```json
{
  "$id": "image-add-border.schema.json",
  "type": "object",
  "properties": {
    "border": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "20",
      "errorMessage": "Lo spessore del bordo deve essere tra 1 e 500 pixel"
    },
    "color": {
      "type": "string",
      "pattern": "^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$",
      "default": "#000000",
      "errorMessage": "Inserisci un colore HEX valido"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


