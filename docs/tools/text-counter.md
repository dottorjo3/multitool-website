# Word & Character Counter

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `text-counter`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Count words, characters, lines and paragraphs in text
- **Input:** `text`
- **Output:** `object`

## Parametri principali
- `text` — Tipo: string • minLength: 1

## Schema
```json
{
  "$id": "text-counter.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da analizzare"
    }
  },
  "required": [
    "text"
  ],
  "additionalProperties": false
}
```
