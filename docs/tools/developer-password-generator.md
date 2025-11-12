# Password Generator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-password-generator`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Produce password complesse con lunghezza e charset personalizzati.

## Panoramica
Consente di scegliere numero di password, lunghezza e set (maiuscole, minuscole, numeri, simboli). Output in JSON con array di stringhe.

## Parametri principali
- `length` – lunghezza di ogni password
- `count` – numero di password da generare
- `uppercase`, `lowercase`, `digits`, `symbols`

## Schema
```json
{
  "$id": "developer-password-generator.schema.json",
  "type": "object",
  "properties": {
    "length": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "12",
      "errorMessage": "Lunghezza tra 4 e 128"
    },
    "count": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,2}$",
      "default": "1",
      "errorMessage": "Numero di password tra 1 e 50"
    },
    "uppercase": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "true"
    },
    "lowercase": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "true"
    },
    "digits": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "true"
    },
    "symbols": {
      "type": "string",
      "enum": ["true", "false"],
      "default": "false"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


