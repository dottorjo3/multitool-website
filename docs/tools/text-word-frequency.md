# Word Frequency Counter

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-word-frequency`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Conta quante volte appare ogni parola e ordina per frequenza.

## Panoramica
Tokenizza il testo (con opzione case sensitive) e restituisce la classifica delle parole più utilizzate. Adatto per analisi SEO e copywriting.

## Parametri principali
- `text` – testo da analizzare (obbligatorio)
- `top` – limita il numero di risultati (opzionale)
- `caseSensitive` – distingue o meno tra maiuscole/minuscole

## Schema
```json
{
  "$id": "text-word-frequency.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 5,
      "errorMessage": "Incolla un testo da analizzare"
    },
    "top": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "",
      "errorMessage": "Inserisci un numero tra 1 e 200"
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


