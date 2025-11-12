# PDF Delete Pages

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-delete-pages`
- **Categoria:** `pdf`
- **Free:** Sì
- **Descrizione breve:** Remove selected pages from a PDF document
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `pages` — Elenco pagine da eliminare (es: 2,5,8-10) • Tipo: string • minLength: 1

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfDeletePagesSchema",
  "type": "object",
  "properties": {
    "pages": {
      "type": "string",
      "minLength": 1,
      "description": "Elenco pagine da eliminare (es: 2,5,8-10)"
    }
  },
  "required": [
    "pages"
  ],
  "additionalProperties": false
}
```
