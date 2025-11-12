# CSS Color Parser

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-css-color-parser`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Analizza colori in formato HEX/RGB/HSL restituendo conversioni e palette lighten/darken.

## Parametri principali
- `color` – colore in formato HEX, `rgb(...)` oppure `hsl(...)`

## Output
- `normalized` – HEX, RGB e HSL normalizzati
- `channels` – componenti numeriche
- `palette` – varianti lighten/darken con conversioni complete

## Schema
```json
{
  "$id": "developer-css-color-parser.schema.json",
  "type": "object",
  "properties": {
    "color": {
      "type": "string",
      "minLength": 3,
      "errorMessage": "Inserisci un colore in formato HEX, RGB o HSL"
    }
  },
  "required": ["color"],
  "additionalProperties": false
}
```


