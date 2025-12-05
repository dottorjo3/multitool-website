# 🧪 TESTING NUOVI TOOL

**Data:** Dicembre 2024  
**Tool da testare:** Audio, Video e PDF tool appena creati

---

## ✅ CHECKLIST PRE-TEST

- [x] Backend tool implementati
- [x] Frontend components creati
- [x] Schemas JSON presenti
- [x] Tool registrati in `backend/db/tools_registry.json`
- [x] Tool registrati in `frontend/src/tools/index.js`
- [x] Nessun errore di linting

---

## 🎵 AUDIO TOOLS

### 1. audio-convert
**Test:**
- [ ] Carica file audio (MP3/WAV/OGG)
- [ ] Seleziona formato destinazione
- [ ] Imposta bitrate (64-512 kbps)
- [ ] Verifica download file convertito
- [ ] Verifica dimensioni file corrette

**Parametri da testare:**
- Formati: MP3, WAV, OGG, AAC, FLAC, M4A
- Bitrate: 64, 128, 192, 320 kbps

### 2. audio-trim
**Test:**
- [ ] Carica file audio
- [ ] Imposta start time (HH:MM:SS o secondi)
- [ ] Imposta end time O duration
- [ ] Verifica file tagliato corretto
- [ ] Test con solo start e duration

**Parametri da testare:**
- Start: "00:00:05", "5.5", "00:01:00"
- End: "00:01:30", "90"
- Duration: "60", "00:01:00"

### 3. audio-merge
**Test:**
- [ ] Carica 2+ file audio
- [ ] Verifica unione corretta
- [ ] Verifica ordine file mantenuto
- [ ] Verifica dimensione totale

### 4. audio-compress
**Test:**
- [ ] Carica file audio
- [ ] Imposta bitrate target (64-320)
- [ ] Verifica compressione effettiva
- [ ] Verifica qualità audio accettabile

### 5. audio-normalize
**Test:**
- [ ] Carica file audio
- [ ] Imposta target level (-60 a 0 dB)
- [ ] Verifica normalizzazione
- [ ] Test con default (-23 dB EBU R128)

---

## 🎬 VIDEO TOOLS

### 6. video-merge
**Test:**
- [ ] Carica 2+ video
- [ ] Verifica unione corretta
- [ ] Verifica risoluzione mantenuta
- [ ] Verifica audio mantenuto

### 7. video-split
**Test:**
- [ ] Carica video
- [ ] Imposta durata segmento (1-3600s)
- [ ] Verifica creazione ZIP
- [ ] Verifica numero segmenti corretto
- [ ] Estrai ZIP e verifica file

### 8. video-rotate
**Test:**
- [ ] Carica video
- [ ] Ruota 90°, 180°, 270°
- [ ] Verifica orientamento corretto
- [ ] Verifica audio mantenuto

### 9. video-mute
**Test:**
- [ ] Carica video con audio
- [ ] Verifica rimozione audio
- [ ] Verifica video funzionante
- [ ] Verifica dimensione file ridotta

---

## 📄 PDF TOOLS

### 10. pdf-compare
**Test:**
- [ ] Carica 2 PDF
- [ ] Verifica confronto pagine
- [ ] Verifica confronto testo
- [ ] Verifica confronto metadata
- [ ] Verifica visualizzazione differenze

**Casi da testare:**
- PDF identici
- PDF con pagine diverse
- PDF con contenuto diverso

### 11. pdf-images-to-pdf
**Test:**
- [ ] Carica 1+ immagini (JPG/PNG)
- [ ] Verifica creazione PDF
- [ ] Verifica ogni immagine = 1 pagina
- [ ] Verifica ordine mantenuto
- [ ] Verifica qualità immagini

### 12. pdf-crop
**Test:**
- [ ] Carica PDF
- [ ] Imposta X, Y, width, height
- [ ] Seleziona pagine (all o 1,2,3)
- [ ] Verifica ritaglio corretto
- [ ] Test con valori diversi

**Casi da testare:**
- Ritaglio su tutte le pagine
- Ritaglio su pagine specifiche
- Coordinate valide/invalide

### 13. pdf-flatten
**Test:**
- [ ] Carica PDF con form fields
- [ ] Verifica appiattimento
- [ ] Verifica form fields rimossi
- [ ] Verifica contenuto visibile mantenuto
- [ ] Verifica annotazioni rimosse

---

## 🔍 VERIFICA TECNICA

### Backend
- [ ] Tutti i tool rispondono correttamente
- [ ] Error handling funziona
- [ ] Validazione input corretta
- [ ] File temporanei vengono puliti

### Frontend
- [ ] UI carica correttamente
- [ ] Form validation funziona
- [ ] Download file funziona
- [ ] Messaggi di errore chiari
- [ ] Loading states appropriati

### Schemas
- [ ] Validazione parametri corretta
- [ ] Default values applicati
- [ ] Range limits rispettati

---

## 🐛 PROBLEMI COMUNI DA VERIFICARE

1. **File upload:**
   - Dimensione file eccessiva
   - Formato file non supportato
   - File corrotto

2. **FFmpeg (audio/video):**
   - FFmpeg installato?
   - Codec supportati?
   - Permessi file temporanei

3. **PDF-lib:**
   - File PDF corrotto
   - PDF protetto da password
   - Dimensioni eccessive

4. **Memory:**
   - File molto grandi
   - Processing multipli simultanei

---

## 📝 NOTE TESTING

### Ordine consigliato:
1. Test backend isolati (se possibile)
2. Test frontend integrazione
3. Test end-to-end completo
4. Test edge cases
5. Test performance con file grandi

### File di test consigliati:
- Audio: file MP3/WAV piccoli (< 5MB)
- Video: file MP4 piccoli (< 10MB, durata < 1min)
- PDF: file semplici (1-10 pagine)
- Immagini: JPG/PNG standard (< 5MB)

---

## ✅ ESITO TESTING

**Data completamento:** _[da compilare]_  
**Tester:** _[da compilare]_  
**Tool testati:** _[da compilare]_  
**Problemi trovati:** _[da compilare]_  
**Problemi risolti:** _[da compilare]_

---

**Ultimo aggiornamento:** Dicembre 2024


