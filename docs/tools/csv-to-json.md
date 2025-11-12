# CSV to JSON

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `csv-to-json`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Convert CSV data to JSON format
- **Input:** `text`
- **Output:** `json`

## Parametri principali
- `csv` — Tipo: string • minLength: 1
- `delimiter` — Tipo: string • Default: , • minLength: 1 • maxLength: 1
- `pretty` — Tipo: string • Valori: true, false • Default: true

## Schema
```json
{
  "$id": "csv-to-json.schema.json",
  "type": "object",
  "properties": {
    "csv": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Incolla il contenuto CSV da convertire"
    },
    "delimiter": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1,
      "default": ","
    },
    "pretty": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "true"
    }
  },
  "required": [
    "csv"
  ],
  "additionalProperties": false
}
```
