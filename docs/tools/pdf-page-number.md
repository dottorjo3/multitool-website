# PDF Page Number

_Generated manually on 2025-11-08_

- **Tool ID:** `pdf-page-number`
- **Categoria:** `pdf`
- **Free:** No (premium)
- **Descrizione breve:** Aggiunge numerazione personalizzata alle pagine del documento.

## Panoramica
Utilizza `pdf-lib` per iterare le pagine e disegnare il numero nel punto richiesto (alto/basso, sinistra/centro/destra) con font e margine configurabili.

## Parametri principali
- `startNumber` – numero iniziale della numerazione
- `prefix` – testo facoltativo da anteporre (es. “Pag.”)
- `position` – posizione del numero (bottom-left, top-right, …)
- `fontSize`, `margin`

## TODO
- [ ] Supporto colore personalizzato e template di stile
- [ ] Opzione per mostrare “pagina X di Y”
- [ ] Scelta di font personalizzati

## Schema
```json
{
  "$id": "pdf-page-number.schema.json",
  "type": "object",
  "properties": {
    "startNumber": {
      "type": ["integer", "string"],
      "pattern": "^-?[0-9]{1,6}$",
      "default": "1",
      "errorMessage": "Inserisci un numero iniziale valido"
    },
    "prefix": {
      "type": "string",
      "maxLength": 20,
      "default": ""
    },
    "position": {
      "type": "string",
      "enum": ["bottom-left", "bottom-center", "bottom-right", "top-left", "top-center", "top-right"],
      "default": "bottom-center"
    },
    "fontSize": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,2}$",
      "default": "12",
      "errorMessage": "La dimensione del font deve essere un numero positivo"
    },
    "margin": {
      "type": ["integer", "string"],
      "pattern": "^[0-9]{1,3}$",
      "default": "24",
      "errorMessage": "Il margine deve essere un numero positivo"
    }
  },
  "required": [],
  "additionalProperties": false
}
```


