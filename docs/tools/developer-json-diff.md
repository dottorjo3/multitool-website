# JSON Diff

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-json-diff`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Confronta due JSON e segnala proprietà aggiunte, rimosse o modificate.

## Panoramica
Effettua un confronto ricorsivo tra oggetti/array; restituisce tre liste con path e valori. Ideale per review di configurazioni e payload API.

## Parametri principali
- `jsonA` – primo documento JSON
- `jsonB` – secondo documento JSON

## Schema
```json
{
  "$id": "developer-json-diff.schema.json",
  "type": "object",
  "properties": {
    "jsonA": {
      "type": "string",
      "minLength": 2,
      "errorMessage": "Inserisci il primo JSON"
    },
    "jsonB": {
      "type": "string",
      "minLength": 2,
      "errorMessage": "Inserisci il secondo JSON"
    }
  },
  "required": ["jsonA", "jsonB"],
  "additionalProperties": false
}
```

