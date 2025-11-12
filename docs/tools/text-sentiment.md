# Sentiment Analyzer

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-sentiment`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Stima il sentiment (positivo/negativo/neutro) con un dizionario di parole chiave.

## Panoramica
Tokenizza il testo, conta termini positivi/negativi (IT/EN) e produce uno score complessivo con elenco delle parole trovate.

## Parametri principali
- `text` – testo da analizzare

## Schema
```json
{
  "$id": "text-sentiment.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 3,
      "errorMessage": "Incolla un testo da analizzare"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


