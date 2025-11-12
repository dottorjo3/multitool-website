# Remove Punctuation

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-remove-punctuation`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Elimina la punteggiatura e normalizza gli spazi.

## Panoramica
Sostituisce caratteri di punteggiatura più comuni con stringa vuota e riduce spazi multipli.

## Parametri principali
- `text` – testo sorgente

## Schema
```json
{
  "$id": "text-remove-punctuation.schema.json",
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


