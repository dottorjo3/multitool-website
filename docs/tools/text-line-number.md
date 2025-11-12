# Text Line Numbering

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `text-line-number`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Add line numbers with custom start, padding and separators
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `input` — Tipo: string • minLength: 1
- `start` — Tipo: integer/string • Default: 1
- `padWidth` — Tipo: integer/string • Default: 2
- `separator` — Tipo: string • Default: .  • maxLength: 10
- `removeEmpty` — Tipo: string • Valori: true, false • Default: false

## Schema
```json
{
  "$id": "text-line-number.schema.json",
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci del testo da numerare"
    },
    "start": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^-?[0-9]{1,6}$",
      "default": "1",
      "errorMessage": "Inserisci un numero valido"
    },
    "padWidth": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{1,2}$",
      "default": "2",
      "errorMessage": "Inserisci un numero tra 0 e 10"
    },
    "separator": {
      "type": "string",
      "maxLength": 10,
      "default": ". "
    },
    "removeEmpty": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ],
      "default": "false"
    }
  },
  "required": [
    "input"
  ],
  "additionalProperties": false
}
```
