# AI Paraphraser

_Generated manually on 2025-11-08_

- **Tool ID:** `ai-paraphraser`
- **Categoria:** `ai`
- **Free:** No (premium)
- **Descrizione breve:** Riscrive frasi mantenendo il significato originale con tono e lingua personalizzabili.

## Panoramica
Il tool crea un prompt su misura e lo invia alla Farm tramite `dispatchJob`. In assenza di modelli reali usa un fallback mock con testo riformulato lato server.

## Parametri principali
- `text` (string, obbligatorio)
- `tone` (enum: neutral, friendly, professional)
- `language` (codice ISO, default `it`)
- `temperature` (numero 0-1)

## TODO
- [ ] Agganciare modelli AI reali multi-lingua
- [ ] Aggiungere comparazione originale/parafrasi affiancata
- [ ] Supportare batch multipli

## Schema
```json
{
  "$id": "ai-paraphraser.schema.json",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 20,
      "errorMessage": "Incolla un testo da parafrasare (minimo 20 caratteri)"
    },
    "tone": {
      "type": "string",
      "enum": ["neutral", "friendly", "professional"],
      "default": "neutral"
    },
    "language": {
      "type": "string",
      "default": "it"
    },
    "temperature": {
      "type": ["number", "string"],
      "minimum": 0,
      "maximum": 1,
      "default": 0.4
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```

