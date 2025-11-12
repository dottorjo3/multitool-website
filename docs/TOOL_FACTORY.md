# 🏭 Tool Factory CLI — Bibble 2.0

La Tool Factory CLI automatizza la creazione di nuovi microtool generando in pochi secondi tutti i file necessari lato backend e frontend.

```bash
npm run tool:factory
```

## Cosa genera
- `backend/tools/<id>.js`
- `backend/tools/schemas/<id>.schema.json`
- `frontend/src/tools/<id>/index.jsx`
- Registrazione in `backend/db/tools_registry.json`
- Registrazione in `frontend/src/tools/index.js`
- Documento tecnico `docs/tools/<id>.md`

## Blueprint disponibili
| Codice | Quando usarlo | Input registry | Output registry |
| --- | --- | --- | --- |
| `text-basic` | Trasformazioni di testo con output testuale | `text` | `text` |
| `file-single` | Tool basati su un singolo file (PDF, immagini, ecc.) | `file` | `object` |
| `file-multi` | Batch processing e output ZIP | `file` | `archive` |
| `ai-text` | Stub AI pronto per collegarsi al Farm Connector | `text` | `text` |

Ogni blueprint include:
- Schema AJV con validazioni minime
- UI React con campi coerenti
- Stub backend con TODO commentati
- Nota riassuntiva nel documento generato

## Workflow consigliato
1. Esegui `npm run tool:factory` e compila i prompt
2. Apri i file generati per implementare la logica reale
3. Aggiorna le traduzioni in `frontend/src/locales/` se servono stringhe dedicate
4. Aggiorna pagine categoria (es. `VideoToolsPage`) se il tool deve apparire in una suite specifica
5. Compila il documento `docs/tools/<id>.md` con note tecniche e casi d’uso
6. Esegui `npm run build` (frontend) e test manuali del tool

## Personalizzazioni rapide
- Modifica `SUPPORTED_BLUEPRINTS` in `scripts/tool-factory.js` per aggiungere nuovi preset
- Adegua la generazione della documentazione aggiungendo sezioni personalizzate
- Se serve creare directory extra, aggiorna l’array `required` in `ensureDirectories()`

## Troubleshooting
- **Errore “tool già esistente”**: controlla l’ID nel registry o rinomina il tool
- **File non sovrascritti**: la CLI evita di sovrascrivere file esistenti; rimuovi manualmente prima di rigenerare
- **Blueprint non elencato**: assicurati di aver aggiornato l’oggetto `SUPPORTED_BLUEPRINTS`

Buona produzione di microtool! 🚀

