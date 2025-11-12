# Slug Generator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-slug-generator`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Trasforma stringhe in slug SEO-friendly.

## Panoramica
Rimuove accenti (opzionale), sostituisce spazi/punteggiatura con un separatore e restituisce lo slug finale.

## Parametri principali
- `text` – testo di input
- `separator` – simbolo da usare (default `-`)
- `lowercase` – forza le minuscole
- `keepAccents` – mantiene gli accenti originali

## Schema
```json
{
  "$id": "developer-slug-generator.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci un testo da convertire in slug"
    },
    "separator": {
      "type": "string",
      "maxLength": 3,
      "default": "-"
    },
    "lowercase": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "true"
    },
    "keepAccents": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "false"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


