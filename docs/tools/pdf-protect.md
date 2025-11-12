# PDF Protect

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-protect`
- **Categoria:** `pdf`
- **Free:** No
- **Descrizione breve:** Add password protection to a PDF file
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `userPassword` — Password che verrà richiesta per aprire il PDF • Tipo: string • minLength: 4
- `ownerPassword` — Password proprietario (opzionale, default = password utente) • Tipo: string • minLength: 4

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfProtectSchema",
  "type": "object",
  "properties": {
    "userPassword": {
      "type": "string",
      "minLength": 4,
      "description": "Password che verrà richiesta per aprire il PDF"
    },
    "ownerPassword": {
      "type": "string",
      "minLength": 4,
      "description": "Password proprietario (opzionale, default = password utente)"
    }
  },
  "required": [
    "userPassword"
  ],
  "additionalProperties": false
}
```
