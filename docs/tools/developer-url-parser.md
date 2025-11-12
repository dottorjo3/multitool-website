# URL Parser

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-url-parser`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Analizza un URL restituendo protocol, host, path, query e frammento.

## Panoramica
Utilizza l’oggetto `URL` di Node.js per scomporre l’URL e restituisce anche i parametri query deduplicando chiavi multiple.

## Parametri principali
- `url` – stringa URL da analizzare

## Schema
```json
{
  "$id": "developer-url-parser.schema.json",
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "minLength": 3,
      "errorMessage": "Inserisci un URL valido"
    }
  },
  "required": ["url"],
  "additionalProperties": false
}
```


