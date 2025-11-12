# Sentence Extractor

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-sentence-extractor`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Estrae ciascuna frase dal testo restituendo indice, lunghezza e posizione.

## Parametri principali
- `text` – testo di input

## Output
- `total` — numero di frasi
- `sentences` — array con `index`, `text`, `length`, `start`, `end`

## Schema
```json
{
  "$id": "text-sentence-extractor.schema.json",
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


