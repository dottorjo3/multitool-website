# Speaking Time Estimator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-speaking-time`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Stima il tempo necessario per leggere ad alta voce un testo.

## Panoramica
Conta le parole e usa la velocità di lettura vocale (default 130 wpm) per fornire tempo esatto, arrotondato e secondi.

## Parametri principali
- `text` – contenuto del discorso
- `wordsPerMinute` – velocità voce (60-250)

## Schema
```json
{
  "$id": "text-speaking-time.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 5,
      "errorMessage": "Incolla un testo da analizzare"
    },
    "wordsPerMinute": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{2,3}$",
      "default": "130",
      "errorMessage": "Le parole al minuto devono essere tra 60 e 250"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


