# ⚡ Comandi Rapidi per Aggiornare GitHub

## 🎯 Situazione

Repository git è configurato e collegato a GitHub, ma le modifiche di oggi (340 tool completati) devono essere aggiunte e pushatte.

---

## 🚀 Comandi da Eseguire (Copy-Paste)

Apri PowerShell e incolla questi comandi uno alla volta:

### 1️⃣ Aggiungi Tutti i File

```powershell
cd C:\Users\Intel\Desktop\multitool-website
git add .
```

### 2️⃣ Crea Commit

```powershell
git commit -m "Completamento 340 tool: 426 tool backend, 502 schemas, 426 frontend completati"
```

### 3️⃣ Push su GitHub

```powershell
git push origin main
```

**Quando chiede le credenziali:**
- Username: `dottorjo3`
- Password: **Personal Access Token** (vedi come ottenerlo sotto)

---

## 🔐 Come Ottenere Personal Access Token

1. Apri: https://github.com/settings/tokens
2. Clicca: **"Generate new token"** → **"Generate new token (classic)"**
3. Nome: `multitool-website-push`
4. Seleziona scope: ✅ **`repo`** (tutti i permessi repo)
5. Clicca: **"Generate token"**
6. **COPIA IL TOKEN** (lo vedi solo questa volta!)
7. Quando git chiede la password, **incolla il token** (NON la password GitHub)

---

## ⚠️ Se ci sono Errori

### Errore: "Updates were rejected"

GitHub ha commit diversi. Fai merge prima:

```powershell
git pull origin main --allow-unrelated-histories
git push origin main
```

### Errore: "Permission denied"

Il token non è valido. Genera un nuovo token e riprova.

### Errore: "Authentication failed"

- Verifica di usare il **token** come password, non la password GitHub
- Verifica che il token abbia i permessi `repo`

---

## ✅ Verifica Dopo il Push

1. Vai su: https://github.com/dottorjo3/multitool-website
2. Verifica che l'ultimo commit sia quello nuovo
3. Controlla i file:
   - `backend/tools/` dovrebbe avere 426 file `.js`
   - `backend/tools/schemas/` dovrebbe avere 502 file `.json`
   - `frontend/src/tools/` dovrebbe avere 426 cartelle

---

## 📋 Versione Tutto-in-Uno

Se vuoi eseguire tutto in sequenza:

```powershell
cd C:\Users\Intel\Desktop\multitool-website
git add .
git commit -m "Completamento 340 tool: 426 tool backend, 502 schemas, 426 frontend completati"
git push origin main
```

---

**🎉 Esegui questi comandi e GitHub sarà aggiornato con tutti i 340 tool completati!**

