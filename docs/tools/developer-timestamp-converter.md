# Timestamp Converter

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-timestamp-converter`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Converte timestamp Unix in ISO8601 (e viceversa).

## Panoramica
Accetta valori in secondi/millisecondi o stringhe ISO e restituisce tutte le rappresentazioni principali (Unix, ISO, locale, UTC).

## Parametri principali
- `input` – valore da convertire (obbligatorio)
- `mode` – `unix-to-iso` o `iso-to-unix`

## Schema
```json
{
  "$id": "developer-timestamp-converter.schema.json",
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci un valore da convertire"
    },
    "mode": {
      "type": "string",
      "enum": ["unix-to-iso", "iso-to-unix"],
      "default": "unix-to-iso"
    }
  },
  "required": ["input"],
  "additionalProperties": false
}
```


