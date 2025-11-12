# PDF Metadata Cleaner

_Generated manualmente il 2025-11-08_

- **Tool ID:** `pdf-remove-metadata`
- **Categoria:** `pdf`
- **Free:** Sì
- **Descrizione breve:** Elimina le informazioni sensibili (autore, titolo, parole chiave) da un PDF.

## Panoramica
Carica il documento con `pdf-lib`, svuota i campi Title/Author/Subject/Keywords/Producer e aggiorna la data di modifica.

## Parametri principali
Nessun parametro aggiuntivo: basta caricare il PDF.

## TODO
- [ ] Mostrare i metadati originali nella risposta
- [ ] Permettere di impostare nuovi valori personalizzati
- [ ] Opzione per rimuovere dictionary XMP avanzati

## Schema
```json
{
  "$id": "pdf-remove-metadata.schema.json",
  "type": "object",
  "properties": {},
  "additionalProperties": false
}
```


