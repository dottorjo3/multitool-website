# Text Prefix & Suffix

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `text-prefix-suffix`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Add custom prefixes and suffixes to every line of text
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `input` — Tipo: string • minLength: 1
- `prefix` — Tipo: string • Default: 
- `suffix` — Tipo: string • Default: 
- `skipEmpty` — Tipo: string • Valori: true, false • Default: true

## Schema
```json
{
  "$id": "text-prefix-suffix.schema.json",
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci del testo da modificare"
    },
    "prefix": {
      "type": "string",
      "default": ""
    },
    "suffix": {
      "type": "string",
      "default": ""
    },
    "skipEmpty": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "true"
    }
  },
  "required": [
    "input"
  ],
  "additionalProperties": false
}
```
