# Random Bytes Generator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-random-bytes`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Genera byte criptograficamente sicuri in formato hex o base64.

## Panoramica
Chiama `crypto.randomBytes(length)` e restituisce la stringa codificata nel formato richiesto.

## Parametri principali
- `length` – numero di byte da generare (1-1024)
- `encoding` – `hex` o `base64`

## Schema
```json
{
  "$id": "developer-random-bytes.schema.json",
  "type": "object",
  "properties": {
    "length": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,4}$",
      "default": "32",
      "errorMessage": "La lunghezza deve essere compresa tra 1 e 1024 byte"
    },
    "encoding": {
      "type": "string",
      "enum": ["hex", "base64"],
      "default": "hex"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


