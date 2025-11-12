# Image Background Remover

_Generated automaticamente il 2025-11-09_

- **Tool ID:** `image-background-remover`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Remove solid backgrounds by color tolerance
- **Input:** `file`
- **Output:** `file`

## Parametri principali
- `backgroundColor` — Tipo: string • Default: #FFFFFF
- `tolerance` — Tipo: integer/string • Default: 35

## Schema
```json
{
  "$id": "image-background-remover.schema.json",
  "type": "object",
  "properties": {
    "backgroundColor": {
      "type": "string",
      "pattern": "^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$",
      "default": "#FFFFFF",
      "errorMessage": "Inserisci un colore esadecimale valido (es. #FFFFFF)"
    },
    "tolerance": {
      "type": [
        "integer",
        "string"
      ],
      "pattern": "^[0-9]{1,3}$",
      "default": "35",
      "errorMessage": "La tolleranza deve essere tra 0 e 255"
    }
  },
  "required": [],
  "additionalProperties": false
}
```
