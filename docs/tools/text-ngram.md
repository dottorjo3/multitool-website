# N-gram Generator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-ngram`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Estrae n-gram (1-5) dal testo con conteggio di frequenza.

## Panoramica
Normalizza il testo, genera gli n-gram richiesti e ordina i risultati per frequenza (utile per keyword research).

## Parametri principali
- `text` – testo da analizzare
- `n` – dimensione dell’n-gram (1…5)
- `top` – quanti risultati mostrare
- `caseSensitive` – distinzione maiuscole/minuscole

## Schema
```json
{
  "$id": "text-ngram.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 10,
      "errorMessage": "Incolla un testo da analizzare"
    },
    "n": {
      "type": ["integer", "string"],
      "pattern": "^[1-5]$",
      "default": "2",
      "errorMessage": "Il valore di N deve essere tra 1 e 5"
    },
    "top": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "20"
    },
    "caseSensitive": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "false"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


