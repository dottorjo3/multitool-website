# 🔑 Setup API Keys - Multitool Website

Questa guida spiega come configurare le API keys necessarie per i vari tool.

## 📋 API Keys Richieste

### 🤖 AI Tools (Livello Finale) - Budget: 8-10€/mese

Questi tool richiedono API keys per servizi AI esterni:

#### Groq API (Consigliato - Veloce)
- **URL**: https://console.groq.com/keys
- **Costo**: Gratuito con limiti generosi
- **Veloce**: Inferenza molto rapida
- **Setup**:
  1. Registrati su Groq
  2. Crea una API key
  3. Aggiungi a `.env`: `GROQ_API_KEY=your_key_here`

#### DeepSeek API (Alternativa)
- **URL**: https://platform.deepseek.com/api_keys
- **Costo**: Pay-as-you-go, molto economico
- **Setup**:
  1. Registrati su DeepSeek
  2. Crea una API key
  3. Aggiungi a `.env`: `DEEPSEEK_API_KEY=your_key_here`

#### Mistral AI (Backup)
- **URL**: https://console.mistral.ai/api-keys/
- **Costo**: Pay-as-you-go
- **Setup**:
  1. Registrati su Mistral
  2. Crea una API key
  3. Aggiungi a `.env`: `MISTRAL_API_KEY=your_key_here`

**Nota**: Per iniziare, Groq è sufficiente. Gli altri servono come backup.

---

### 💱 Currency Converter

#### ExchangeRate-API (Consigliato - Gratuito)
- **URL**: https://www.exchangerate-api.com/
- **Costo**: Gratuito con 1.500 richieste/mese
- **Setup**:
  1. Registrati gratuitamente
  2. Ottieni la API key (automatica dopo registrazione)
  3. Aggiungi a `.env`: `CURRENCY_API_KEY=your_key_here`

**Alternativa**: Fixer.io, CurrencyLayer, OpenExchangeRates

---

### 📍 Geocoding (GPS ↔ Address)

#### OpenCage Geocoding (Consigliato - Generoso free tier)
- **URL**: https://opencagedata.com/api
- **Costo**: Gratuito con 2.500 richieste/giorno
- **Setup**:
  1. Registrati su OpenCage
  2. Crea una API key
  3. Aggiungi a `.env`: `GEOCODING_API_KEY=your_key_here`

**Alternative**:
- Google Maps Geocoding API (richiede billing, ma molto accurato)
- Mapbox Geocoding API
- Here Geocoding API

---

### 🌍 Timezone Converter

#### WorldTimeAPI (Gratuito - Nessuna API key)
- **URL**: http://worldtimeapi.org/
- **Costo**: Completamente gratuito, nessuna API key richiesta
- **Setup**: Nessuna configurazione necessaria!

**Alternativa**: TimezoneDB API (richiede API key)

---

## 🚀 Quick Start

1. **Crea il file `.env`** nella root del progetto:
   ```bash
   cp .env.example .env
   ```

2. **Aggiungi almeno Groq API Key** (per AI tools):
   ```env
   GROQ_API_KEY=your_groq_key_here
   ```

3. **Aggiungi Currency API Key** (per currency converter):
   ```env
   CURRENCY_API_KEY=your_currency_key_here
   ```

4. **Aggiungi Geocoding API Key** (per GPS converter):
   ```env
   GEOCODING_API_KEY=your_geocoding_key_here
   ```

5. **Riavvia il backend** per applicare le modifiche

---

## 💡 Tool che Funzionano Senza API Keys

La maggior parte dei tool **non richiede** API keys:
- ✅ Tutti i Text Tools (Livello 1)
- ✅ Tutti i Developer Tools (Livello 2)
- ✅ Tutti i Data/CSV/JSON Tools (Livello 3)
- ✅ Tutti i Security Tools (Livello 4) - usa crypto nativo
- ✅ La maggior parte dei Math Tools (Livello 5)
- ✅ Tutti i PDF Tools (Livello 6)
- ✅ Tutti i Image Tools (Livello 7)
- ✅ Tutti gli Audio Tools (Livello 8)
- ✅ Tutti i Video Tools (Livello 9)

**Solo questi tool richiedono API keys:**
- ❌ AI Tools (Livello Finale) → Groq/DeepSeek/Mistral
- ❌ Currency Converter → Currency API
- ❌ GPS ↔ Address → Geocoding API

---

## 🔒 Sicurezza

- **NON committare** il file `.env` nel repository
- Il file `.env` è già nel `.gitignore`
- Usa variabili d'ambiente diverse per sviluppo e produzione
- Ruota le API keys periodicamente

---

## 📊 Costi Stimati

| Servizio | Costo/Mese | Uso |
|----------|-----------|-----|
| Groq | Gratuito (con limiti) | AI Tools |
| Currency API | Gratuito (1.5k/mese) | Currency Converter |
| Geocoding | Gratuito (2.5k/giorno) | GPS Converter |
| **Totale** | **~0€/mese** | Per uso moderato |

Per uso intensivo:
- Groq Pro: ~$10/mese
- Currency API Pro: ~$10/mese
- Geocoding Pro: ~$10/mese

**Totale stimato per uso intensivo: ~30€/mese**

