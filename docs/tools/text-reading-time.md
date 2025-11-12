# Reading Time Estimator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-reading-time`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Stima il tempo di lettura di un testo in base alle parole al minuto.

## Panoramica
Conta le parole, divide per le parole/minuto e fornisce minuti (exact/rounded) e secondi totali.

## Parametri principali
- `text` – contenuto da analizzare
- `wordsPerMinute` – velocità di lettura (default 200 wpm)

## Schema
```json
{
  "$id": "text-reading-time.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 5,
      "errorMessage": "Incolla un testo da analizzare"
    },
    "wordsPerMinute": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{2,4}$",
      "default": "200",
      "errorMessage": "Le parole al minuto devono essere tra 50 e 1000"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


