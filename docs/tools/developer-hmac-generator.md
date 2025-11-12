# HMAC Generator

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-hmac-generator`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Calcola l’HMAC di un testo con chiave segreta (SHA/MD5).

## Panoramica
Utilizza `crypto.createHmac` con gli algoritmi supportati (`sha1`, `sha256`, `sha384`, `sha512`, `md5`) e output `hex`/`base64`.

## Parametri principali
- `text` – testo di input
- `secret` – chiave segreta
- `algorithm` – algoritmo HMAC (default `sha256`)
- `encoding` – `hex` o `base64`

## Schema
```json
{
  "$id": "developer-hmac-generator.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci il testo"
    },
    "secret": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci la chiave segreta"
    },
    "algorithm": {
      "type": "string",
      "enum": ["sha1", "sha256", "sha384", "sha512", "md5"],
      "default": "sha256"
    },
    "encoding": {
      "type": "string",
      "enum": ["hex", "base64"],
      "default": "hex"
    }
  },
  "required": ["text", "secret"],
  "additionalProperties": false
}
```


