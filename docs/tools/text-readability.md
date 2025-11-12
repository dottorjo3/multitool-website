# Readability Analyzer

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-readability`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Calcola gli indici di leggibilità Flesch e Flesch-Kincaid.

## Panoramica
Conta frasi, parole e sillabe (stima per lingua latina) e restituisce punteggi utili per copywriting/SEO.

## Parametri principali
- `text` – testo da analizzare (almeno 50 caratteri)

## Schema
```json
{
  "$id": "text-readability.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 50,
      "errorMessage": "Incolla un testo di almeno 50 caratteri"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


