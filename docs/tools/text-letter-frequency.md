# Letter Frequency

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-letter-frequency`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Conta l’occorrenza delle lettere A-Z (case insensitive) e ne calcola la percentuale.

## Parametri principali
- `text` – testo da analizzare

## Output
- `totalLetters`, `uniqueLetters`
- `frequencies` — array ordinato per frequenza con percentuali
- `topFive` — prime cinque lettere

## Schema
```json
{
  "$id": "text-letter-frequency.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da analizzare"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


