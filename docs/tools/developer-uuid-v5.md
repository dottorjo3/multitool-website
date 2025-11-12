# UUID v5 Generator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-uuid-v5`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Crea UUID v5 basati su namespace (DNS/URL o personalizzato).

## Panoramica
Usa `uuid.v5(name, namespace)` con namespace predefiniti (`uuidv5.DNS`, `uuidv5.URL`) o UUID personalizzato per generare identificativi deterministici.

## Parametri principali
- `name` – valore da hashare
- `namespace` – `dns`, `url` o `custom`
- `customNamespace` – UUID da usare quando `namespace=custom`

## Schema
```json
{
  "$id": "developer-uuid-v5.schema.json",
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


