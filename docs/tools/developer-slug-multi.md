# Slugify Lines

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-slug-multi`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Converte ciascuna riga di input in uno slug coerente.

## Panoramica
Rimuove accenti (opzionale), sostituisce spazi/punteggiatura con il separatore indicato e restituisce coppie originale/slug.

## Parametri principali
- `lines` – righe separate da newline
- `separator` – simbolo da usare fra le parole
- `lowercase`, `keepAccents`

## Schema
```json
{
  "$id": "developer-slug-multi.schema.json",
  "type": "object",
  "properties": {
    "lines": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci almeno una riga"
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
  "required": ["lines"],
  "additionalProperties": false
}
```


