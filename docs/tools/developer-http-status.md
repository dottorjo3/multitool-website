# HTTP Status Lookup

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-http-status`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Restituisce informazioni su un codice di stato HTTP (categoria, frase, descrizione).

## Parametri principali
- `code` – codice HTTP a tre cifre

## Output
- `code`, `category`, `phrase`, `description`, `standardized`

## Schema
```json
{
  "$id": "developer-http-status.schema.json",
  "type": "object",
  "properties": {
    "code": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{3}$",
      "errorMessage": "Inserisci un codice HTTP a tre cifre"
    }
  },
  "required": ["code"],
  "additionalProperties": false
}
```


