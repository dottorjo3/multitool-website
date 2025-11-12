# UUID Generator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-uuid-generator`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Genera UUID v4 multipli per test e sviluppo.

## Panoramica
Utilizza la libreria `uuid` lato backend per produrre da 1 a 100 identificativi univoci.

## Parametri principali
- `count` – numero di UUID da generare (default 1)

## Schema
```json
{
  "$id": "developer-uuid-generator.schema.json",
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


