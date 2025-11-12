# PDF Reorder Pages

_Generated manualmente il 2025-11-08_

- **Tool ID:** `pdf-reorder-pages`
- **Categoria:** `pdf`
- **Free:** Sì
- **Descrizione breve:** Cambia l'ordine delle pagine secondo una sequenza scelta.

## Panoramica
Parse la stringa fornita (es. `3,1,2`) e usa `pdf-lib` per copiare le pagine nell'ordine indicato, consentendo anche duplicati.

## Parametri principali
- `order` – elenco di numeri di pagina separati da virgola

## TODO
- [ ] Supporto per intervalli (es. `1-3,5`)
- [ ] Opzione per invertire o duplicare pagine automaticamente
- [ ] Anteprima dell'ordine prima di scaricare

## Schema
```json
{
  "$id": "pdf-reorder-pages.schema.json",
  "type": "object",
  "properties": {
    "order": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci la sequenza di pagine (es. 3,1,2)"
    }
  },
  "required": ["order"],
  "additionalProperties": false
}
```


