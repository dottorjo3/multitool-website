# Querystring Builder

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-querystring-builder`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Trasforma coppie chiave/valore in una query string URL encoded, con anteprima di URL completa.

## Parametri principali
- `lines` – elenco di coppie chiave/valore (una per riga)
- `delimiter` – separatore (default `=`)
- `encode` – se `true` applica l’URL encoding ai valori
- `baseUrl` – eventuale URL di partenza per concatenare la query string

## Output
- `pairs` – coppie chiave/valore riconosciute
- `queryString` – stringa finale
- `fullUrl` – URL completo se fornita `baseUrl`

## Schema
```json
{
  "$id": "developer-querystring-builder.schema.json",
  "type": "object",
  "properties": {
    "lines": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci almeno una coppia chiave/valore"
    },
    "delimiter": {
      "type": "string",
      "maxLength": 3,
      "default": "="
    },
    "encode": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "true"
    },
    "baseUrl": {
      "type": "string",
      "default": ""
    }
  },
  "required": ["lines"],
  "additionalProperties": false
}
```


