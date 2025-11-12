# Base Converter

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-base-converter`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Converte numeri tra basi 2-36 con supporto BigInt.

## Panoramica
Accetta input testuale, lo interpreta nella base di origine e restituisce sia il valore decimale sia la conversione nella base desiderata.

## Parametri principali
- `value` – numero da convertire (stringa)
- `fromBase` – base di partenza (2-36)
- `toBase` – base di arrivo (2-36)

## Schema
```json
{
  "$id": "developer-base-converter.schema.json",
  "type": "object",
  "properties": {
    "value": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci un numero da convertire"
    },
    "fromBase": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,2}$",
      "default": "10"
    },
    "toBase": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,2}$",
      "default": "16"
    }
  },
  "required": ["value"],
  "additionalProperties": false
}
```

