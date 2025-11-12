# Trim Lines

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-trim-lines`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Rimuove gli spazi superflui all’inizio e alla fine di ogni riga, mantenendo la struttura del testo.

## Parametri principali
- `text` – testo multilinea da ripulire

## Output
- `originalLineCount`, `trimmedLineCount`
- `result` — testo ripulito con le stesse righe

## Schema
```json
{
  "$id": "text-trim-lines.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo da ripulire"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


