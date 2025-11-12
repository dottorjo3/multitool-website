# Paragraph Counter

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-paragraph-counter`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Analizza il testo per paragrafi, mostrando parole e caratteri per ciascuno.

## Parametri principali
- `text` – testo con paragrafi separati (anche tramite righe vuote)

## Output
- `paragraphs`, `totalWords`, `totalCharacters`
- `averageWords`, `averageCharacters`
- `details` — array con testo, parole e caratteri per paragrafo

## Schema
```json
{
  "$id": "text-paragraph-counter.schema.json",
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


