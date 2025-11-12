# Color Converter

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-color-converter`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Converte colori tra HEX, RGB e HSL, rilevando automaticamente il formato.

## Panoramica
Analizza il valore fornito, effettua la conversione in tutti i principali formati e restituisce componenti normalizzate.

## Parametri principali
- `input` – colore in formato HEX, `rgb(...)` o `hsl(...)`
- `mode` – forza un formato specifico o lascia auto detection

## Schema
```json
{
  "$id": "developer-color-converter.schema.json",
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "minLength": 3,
      "errorMessage": "Inserisci un colore in formato HEX, RGB o HSL"
    },
    "mode": {
      "type": "string",
      "enum": ["auto", "hex", "rgb", "hsl"],
      "default": "auto"
    }
  },
  "required": ["input"],
  "additionalProperties": false
}
```


