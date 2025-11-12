# Vowel vs Consonant Analyzer

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-vowel-consonant`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Conta vocali, consonanti, cifre, spazi e simboli, restituendo percentuali sul totale.

## Parametri principali
- `text` – testo da analizzare

## Output
- `totalCharacters`
- Oggetti `vowels`, `consonants`, `digits`, `whitespace`, `symbols` con `count` e `percentage`

## Schema
```json
{
  "$id": "text-vowel-consonant.schema.json",
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


