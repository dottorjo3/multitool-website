# Palindrome Checker

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-palindrome`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Verifica se parole o frasi sono palindromi (anche multi riga).

## Panoramica
Normalizza ogni riga (ignora opzionalmente spazi e maiuscole) e indica se è palindroma. Restituisce anche l’esito complessivo del testo.

## Parametri principali
- `text` – una o più frasi/righe
- `ignoreSpaces` – rimuove spazi e punteggiatura
- `ignoreCase` – ignora le maiuscole/minuscole

## Schema
```json
{
  "$id": "text-palindrome.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 2,
      "errorMessage": "Inserisci una parola o frase da analizzare"
    },
    "ignoreCase": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "true"
    },
    "ignoreSpaces": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "true"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


