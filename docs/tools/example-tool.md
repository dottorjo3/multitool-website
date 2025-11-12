# Example Echo Tool

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `example-tool`
- **Categoria:** `utility`
- **Free:** Sì
- **Descrizione breve:** Esempio per testare il nuovo gateway
- **Input:** `form`
- **Output:** `json`

## Parametri principali
- `message` — Tipo: string • Default: Ciao dal tool di esempio

## Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ExampleToolSchema",
  "type": "object",
  "properties": {
    "message": {
      "type": "string",
      "default": "Ciao dal tool di esempio"
    }
  },
  "required": [],
  "additionalProperties": false
}
```
