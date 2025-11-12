# PDF Header & Footer

_Generated manualmente il 2025-11-08_

- **Tool ID:** `pdf-header-footer`
- **Categoria:** `pdf`
- **Free:** No (premium)
- **Descrizione breve:** Inserisce testi di intestazione e/o piè di pagina su ogni pagina del PDF.

## Panoramica
Sfrutta `pdf-lib` per disegnare testo centrato in alto e/o in basso con font Helvetica, margini personalizzabili e colore HEX.

## Parametri principali
- `headerText`, `footerText` – testi da applicare (almeno uno obbligatorio)
- `fontSize`, `margin` – stile tipografico e distanza dai bordi
- `color` – colore esadecimale (es. #333333)

## TODO
- [ ] Supportare allineamento sinistra/destra
- [ ] Possibilità di usare variabili (es. numero pagina)
- [ ] Caricamento di font personalizzati

## Schema
```json
{
  "$id": "pdf-header-footer.schema.json",
  "type": "object",
  "properties": {
    "headerText": {
      "type": "string",
      "default": ""
    },
    "footerText": {
      "type": "string",
      "default": ""
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
    },
    "color": {
      "type": "string",
      "pattern": "^#?[0-9a-fA-F]{6}$",
      "default": "#333333",
      "errorMessage": "Inserisci un colore esadecimale valido"
    }
  },
  "anyOf": [
    { "required": ["headerText"] },
    { "required": ["footerText"] }
  ],
  "additionalProperties": false
}
```


