# JSON to CSV

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `json-to-csv`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Convert JSON data to CSV format
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `json` — Tipo: string • minLength: 2
- `delimiter` — Tipo: string • Default: , • minLength: 1 • maxLength: 1

## Schema
```json
{
  "$id": "json-to-csv.schema.json",
  "type": "object",
  "properties": {
    "json": {
      "type": "string",
      "minLength": 2,
      "errorMessage": "Incolla un array JSON da convertire"
    },
    "delimiter": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1,
      "default": ","
    }
  },
  "required": [
    "json"
  ],
  "additionalProperties": false
}
```
