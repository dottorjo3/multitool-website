# JSON Minify

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-json-minify`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Converte un JSON leggibile in formato minificato, eliminando spazi e ritorni a capo.

## Parametri principali
- `json` – stringa JSON da minificare

## Output
- `minified` – JSON compatto pronto per essere trasmesso o salvato

## Schema
```json
{
  "$id": "developer-json-minify.schema.json",
  "type": "object",
  "properties": {
    "json": {
      "type": "string",
      "minLength": 2,
      "errorMessage": "Inserisci il JSON da minificare"
    }
  },
  "required": ["json"],
  "additionalProperties": false
}
```


