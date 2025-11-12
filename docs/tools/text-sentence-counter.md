# Sentence Counter

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-sentence-counter`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Conta le frasi, le parole totali e la media di parole per frase.

## Parametri principali
- `text` – testo da analizzare

## Output
- `sentences` — numero di frasi individuate
- `totalWords` — numero totale di parole
- `averageWordsPerSentence` — media parole/frase
- `sentencesDetail` — array con testo e conteggio parole per frase

## Schema
```json
{
  "$id": "text-sentence-counter.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 2,
      "errorMessage": "Inserisci il testo da analizzare"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


