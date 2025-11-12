# AI Summarizer

_Generated manually on 2025-11-08_

- **Tool ID:** `ai-summarizer`
- **Categoria:** `ai`
- **Free:** Sì
- **Descrizione breve:** Riassume testi lunghi in pochi secondi scegliendo la lunghezza desiderata.

## Panoramica
Utilizza `helpers.dispatchJob` per inviare il prompt alla Farm. In modalità mock produce un riassunto sintetico locale.

## Parametri principali
- `content` (string, obbligatorio, minimo 40 caratteri)
- `length` (enum: short, medium, long)
- `focus` (string opzionale)

## TODO
- [ ] Connettere un modello AI reale con supporto multi-lingua
- [ ] Restituire anche punti elenco/estratti chiave
- [ ] Supportare upload file (PDF/Doc) con estrazione automatica

## Schema
```json
{
  "$id": "ai-summarizer.schema.json",
  "type": "object",
  "properties": {
    "content": {
      "type": "string",
      "minLength": 40,
      "errorMessage": "Incolla un testo sufficientemente lungo da riassumere"
    },
    "length": {
      "type": "string",
      "enum": ["short", "medium", "long"],
      "default": "medium"
    },
    "focus": {
      "type": "string",
      "maxLength": 120,
      "default": ""
    }
  },
  "required": ["content"],
  "additionalProperties": false
}
```

