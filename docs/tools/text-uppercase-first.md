# Sentence Capitalizer

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `text-uppercase-first`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Uppercase the first letter of each sentence
- **Input:** `text`
- **Output:** `text`

## Parametri principali
- `text` — Tipo: string • minLength: 1

## Schema
```json
{
  "$id": "text-uppercase-first.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da trasformare"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
