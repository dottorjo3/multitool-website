# Feedback Prompt Refiner

- **Tool ID:** `ai-prompt-feedback-refiner`
- **Categoria:** `ai-prompt`
- **Free:** Sì
- **Descrizione breve:** Crea un prompt per far rivedere feedback o testi critici con tono controllato.
- **Input:** `form`
- **Output:** `json`

## Campi di input
- `draft` (richiesto) — Testo originale che necessita di revisione.
- `objective` (richiesto) — Risultato desiderato dalla riscrittura.
- `tone` — Stile di comunicazione da adottare.
- `audience` (richiesto) — Chi riceverà il feedback rielaborato.

## Output
- Prompt principale: Prompt di riscrittura
- Outline/Sezioni: Sezioni guida
- Metadata: Parametri
- Suggerimenti: Suggerimenti

## Consigli d'uso
- Allega contesto aggiuntivo (metriche, dati) per feedback più specifici.
- Chiedi sempre una check-list finale di punti da verificare prima dell’invio.
