# JSON Pretty Printer

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-json-pretty`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Formatta JSON con indentazione configurabile.

## Panoramica
Effettua `JSON.parse` e `JSON.stringify` con numero di spazi personalizzabile; restituisce il JSON formattato.

## Parametri principali
- `json` – stringa JSON sorgente
- `spaces` – numero di spazi per indentazione

## Schema
```json
{
  "$id": "developer-json-pretty.schema.json",
  "type": "object",
  "properties": {
    "json": {
      "type": "string",
      "minLength": 2,
      "errorMessage": "Inserisci il JSON da formattare"
    },
    "spaces": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,2}$",
      "default": "2"
    }
  },
  "required": ["json"],
  "additionalProperties": false
}
```


