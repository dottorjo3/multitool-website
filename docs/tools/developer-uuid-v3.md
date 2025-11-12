# UUID v3 Generator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-uuid-v3`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Genera UUID v3 deterministici basati su namespace e valore stringa.

## Parametri principali
- `name` – valore d’ingresso
- `namespace` – `dns`, `url` oppure `custom`
- `customNamespace` – UUID da usare come namespace personalizzato (se `namespace = custom`)

## Output
- `uuid` – risultato v3
- `namespace`, `name`

## Schema
```json
{
  "$id": "developer-uuid-v3.schema.json",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il valore su cui calcolare l'UUID"
    },
    "namespace": {
      "type": "string",
      "enum": ["dns", "url", "custom"],
      "default": "dns"
    },
    "customNamespace": {
      "type": "string",
      "minLength": 36,
      "maxLength": 36
    }
  },
  "required": ["name"],
  "additionalProperties": false
}
```


