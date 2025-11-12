# AI Writer

_Generated manually on 2025-11-08_

- **Tool ID:** `ai-writer`
- **Categoria:** `ai`
- **Blueprint:** AI writer custom
- **Free:** No (premium)
- **Descrizione breve:** Genera articoli strutturati partendo da un argomento e un tono desiderato.

## Panoramica
Il tool invia il prompt a `farmConnector` (mock/local/farm). In modalità mock restituisce un testo generato lato server.

## Parametri principali
- `topic` (string, obbligatorio)
- `tone` (enum: balanced, friendly, professional, persuasive)
- `temperature` (numero 0-1, default 0.7)

## TODO next steps
- [ ] Collegare un modello AI reale attraverso `helpers.dispatchJob`
- [ ] Consentire output in Markdown/HTML multipli
- [ ] Aggiungere esempi di prompt predefiniti

## Schema
```json
{
  "$id": "ai-writer.schema.json",
  "type": "object",
  "properties": {
    "topic": {
      "type": "string",
      "minLength": 4,
      "errorMessage": "Inserisci un argomento (almeno 4 caratteri)"
    },
    "tone": {
      "type": "string",
      "enum": ["balanced", "friendly", "professional", "persuasive"],
      "default": "balanced"
    },
    "temperature": {
      "type": ["number", "string"],
      "minimum": 0,
      "maximum": 1,
      "default": 0.7
    }
  },
  "required": ["topic"],
  "additionalProperties": false
}
```

