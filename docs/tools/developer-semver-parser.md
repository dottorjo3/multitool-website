# SemVer Parser

_Generated manualmente il 2025-11-08_

- **Tool ID:** `developer-semver-parser`
- **Categoria:** `developer`
- **Free:** Sì
- **Descrizione breve:** Analizza una versione SemVer (es. `1.2.3-beta+build`) e ne estrae le componenti.

## Parametri principali
- `version` – stringa in formato SemVer

## Output
- `major`, `minor`, `patch`
- `prerelease` – array di tag pre-release
- `buildMetadata` – array di tag build
- `stable` – boolean (true se nessun prerelease)

## Schema
```json
{
  "$id": "developer-semver-parser.schema.json",
  "type": "object",
  "properties": {
    "version": {
      "type": "string",
      "minLength": 1,
      "errorMessage": "Inserisci una versione SemVer (es. 1.2.3-beta+build)"
    }
  },
  "required": ["version"],
  "additionalProperties": false
}
```


