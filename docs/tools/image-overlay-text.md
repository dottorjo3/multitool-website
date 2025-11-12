# Image Text Overlay

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-overlay-text`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Aggiunge testo sovrapposto con posizione, colore, opacità e padding personalizzabili.

## Panoramica
Genera un layer SVG con le impostazioni scelte e lo unisce all’immagine tramite `sharp.composite`.

## Parametri principali
- `text` – contenuto da sovrapporre
- `position` – top-left, top-right, center, bottom-left, bottom-right
- `fontSize`, `color`, `opacity`, `padding`

## Schema
```json
{
  "$id": "image-overlay-text.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da sovrapporre"
    },
    "position": {
      "type": "string",
      "enum": ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
      "default": "center"
    },
    "fontSize": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "48",
      "errorMessage": "La dimensione del font deve essere tra 8 e 200"
    },
    "color": {
      "type": "string",
      "pattern": "^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$",
      "default": "#FFFFFF",
      "errorMessage": "Inserisci un colore HEX valido"
    },
    "opacity": {
      "type": ["number", "string"],
      "pattern": "^(1(\\.0+)?|0(\\.\\d+)?)$",
      "default": "0.9",
      "errorMessage": "L’opacità deve essere tra 0 e 1"
    },
    "padding": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "20"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


