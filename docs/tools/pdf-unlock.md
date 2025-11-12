# PDF Unlock

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-unlock`
- **Categoria:** `pdf`
- **Free:** No
- **Descrizione breve:** Remove password protection from a PDF file
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `password` — Password corrente del PDF • Tipo: string • minLength: 1

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfUnlockSchema",
  "type": "object",
  "properties": {
    "password": {
      "type": "string",
      "minLength": 1,
      "description": "Password corrente del PDF"
    }
  },
  "required": [
    "password"
  ],
  "additionalProperties": false
}
```
