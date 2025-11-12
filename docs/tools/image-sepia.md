# Image Sepia

_Generated manualmente il 2025-11-08_

- **Tool ID:** `image-sepia`
- **Categoria:** `image`
- **Free:** Sì
- **Descrizione breve:** Aggiunge un effetto seppia modulabile alle foto.

## Panoramica
Calcola una matrice di ricombinazione (`sharp.recomb`) basata sull’intensità desiderata per simulare il tono seppia.

## Parametri principali
- `intensity` – valore tra 0 e 1 che controlla la forza dell’effetto

## Schema
```json
{
  "$id": "image-sepia.schema.json",
  "type": "object",
  "properties": {
    "intensity": {
      "type": ["number", "string"],
      "pattern": "^(0(\\.\\d+)?|1(\\.0+)?)$",
      "default": "0.8",
      "errorMessage": "L’intensità deve essere tra 0 e 1"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


