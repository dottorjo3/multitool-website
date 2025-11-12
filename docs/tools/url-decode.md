# URL Decode

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `url-decode`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Decode URL encoded text
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1
- `plusAsSpace` — Tipo: string • Valori: true, false • Default: true

## Schema
```json
{
  "$id": "url-decode.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci la stringa codificata da decodificare"
    },
    "plusAsSpace": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "true"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
