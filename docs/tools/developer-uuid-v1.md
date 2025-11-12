# UUID v1 Generator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-uuid-v1`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Genera identificativi UUID v1 (time-based).

## Panoramica
Si appoggia a `uuid` (v1) per produrre fino a 100 ID alla volta, includendo informazioni temporali.

## Parametri principali
- `count` – numero di UUID da generare (1-100)

## Schema
```json
{
  "$id": "developer-uuid-v1.schema.json",
  "type": "object",
  "properties": {
    "count": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "1",
      "errorMessage": "Inserisci un numero tra 1 e 100"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


