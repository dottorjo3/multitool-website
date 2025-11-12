# Keyword Density

_Generated manualmente il 2025-11-08_

- **Tool ID:** `text-keyword-density`
- **Categoria:** `text`
- **Free:** Sì
- **Descrizione breve:** Calcola la densità delle keyword escludendo stopword comuni.

## Panoramica
Normalizza il testo, filtra termini brevi/stopword e restituisce frequenza + percentuale (densità) ordinata discendente.

## Parametri principali
- `text` – testo da analizzare
- `minLength` – lunghezza minima delle keyword
- `top` – numero massimo di risultati

## Schema
```json
{
  "$id": "text-keyword-density.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 20,
      "errorMessage": "Incolla un testo di almeno 20 caratteri"
    },
    "minLength": {
      "type": ["integer", "string"],
      "pattern": "^[1-9][0-9]?$",
      "default": "3"
    },
    "top": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "20"
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```


