# JWT Decoder

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-jwt-decoder`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Decodifica header e payload di un JWT senza verificarne la firma.

## Panoramica
Divide il token nelle sue parti, converte Base64URL in JSON e mostra header/payload in modo leggibile.

## Parametri principali
- `token` – stringa JWT (header.payload.signature)

## Schema
```json
{
  "$id": "developer-jwt-decoder.schema.json",
  "type": "object",
  "properties": {
    "token": {
      "type": "string",
      "minLength": 10,
      "errorMessage": "Inserisci un token JWT valido"
    }
  },
  "required": ["token"],
  "additionalProperties": false
}
```


