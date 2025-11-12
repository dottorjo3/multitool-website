# PDF Keep Pages

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `pdf-keep-pages`
- **Categoria:** `pdf`
- **Free:** Sì
- **Descrizione breve:** Keep only the specified pages from a PDF
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `pages` — Elenco pagine da mantenere (es: 1,3-6) • Tipo: string • minLength: 1

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PdfKeepPagesSchema",
  "type": "object",
  "properties": {
    "pages": {
      "type": "string",
      "minLength": 1,
      "description": "Elenco pagine da mantenere (es: 1,3-6)"
    }
  },
  "required": [
    "pages"
  ],
  "additionalProperties": false
}
```
