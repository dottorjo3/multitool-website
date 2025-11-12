# Regex Tester

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-regex-tester`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Applica una regex a un testo e mostra tutti i match, con gruppi e posizioni.

## Panoramica
Compila l’espressione regolare con i flag forniti (aggiungendo sempre la `g` per iterare) e limita i risultati a 5000 match per evitare loop infiniti.

## Parametri principali
- `pattern` – espressione regolare
- `flags` – flag standard JavaScript (`g`,`i`,`m`,`s`,`u`,`y`)
- `text` – testo da esaminare

## Schema
```json
{
  "$id": "developer-regex-tester.schema.json",
  "type": "object",
  "properties": {
    "pattern": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci una regex"
    },
    "flags": {
      "type": "string",
      "pattern": "^[gimsuy]*$",
      "default": "g"
    },
    "text": {
      "type": "string",
      "default": ""
    }
  },
  "required": ["pattern", "text"],
  "additionalProperties": false
}
```

