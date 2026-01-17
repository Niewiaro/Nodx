# 🛒 Giełda Internetowa - Nuxt 4 Edition

E-commerce aplikacja zbudowana w **Nuxt 4** z backendem API w **Nitro** i bazą danych **MongoDB**.

> Pełna migracja z Express.js → Nuxt 4 dla przedmiotu "Programowanie back-end" na studiach magisterskich.

## 🌟 Główne cechy

- ✅ **Full-stack framework** - frontend Vue 3 + backend Node.js w jednym projekcie
- ✅ **TypeScript** - cała aplikacja w TypeScript dla lepszego type-safety
- ✅ **MongoDB** - baza danych z Mongoose
- ✅ **Zarządzanie stanem** - Pinia store + localStorage
- ✅ **Responsywny UI** - CSS z oryginalnego Express projektu
- ✅ **API REST** - pełne CRUD operacje
- ✅ **Autoryzacja** - logowanie, rejestracja, reset hasła
- ✅ **Koszyk i zamówienia** - pełna funkcjonalność e-commerce
- ✅ **Faktury PDF** - generowanie faktur w PDF

## 📋 Funkcjonalności

### 👥 Dla użytkowników
- [x] Rejestracja i logowanie
- [x] Reset hasła
- [x] Przeglądanie produktów z paginacją
- [x] Szczegóły produktu
- [x] Dodawanie do koszyka
- [x] Zarządzanie koszykiem
- [x] Tworzenie zamówień
- [x] Historia zamówień
- [x] Pobieranie faktur PDF

### 🛠️ Dla administratorów
- [x] Dodawanie produktów
- [x] Edycja produktów
- [x] Usuwanie produktów
- [x] Zarządzanie własnymi produktami

## 🚀 Quick Start

### Wymagania
- Node.js 18+
- MongoDB 4.4+
- npm lub yarn

### Instalacja

```bash
# 1. Zainstaluj zależności
npm install

# 2. Uruchom MongoDB (jeśli lokalnie)
mongod

# 3. Uruchom serwer deweloperski
npm run dev
```

Aplikacja będzie dostępna na `http://localhost:3000`

## 📚 Dokumentacja

- **[COMPLETE_MIGRATION.md](COMPLETE_MIGRATION.md)** ⭐ - Pełna dokumentacja migracji Express → Nuxt
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Struktura projektu i routing
- **[QUICKSTART.md](QUICKSTART.md)** - Przykłady API i testowanie
- **[MIGRATION.md](MIGRATION.md)** - Podstawowa dokumentacja

## 🏗️ Struktura projektu

```
Nodx/
├── app/                    # Główna aplikacja
├── components/             # Komponenty Vue
├── pages/                  # Strony (file-based routing)
├── server/api/             # API endpoints
├── server/models/          # Modele Mongoose
├── stores/                 # Pinia stores
├── public/                 # Pliki statyczne
└── nuxt.config.ts          # Konfiguracja
```

Pełna struktura: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 🔑 Główne strony

| URL | Opis |
|-----|------|
| `/` | Strona główna |
| `/products` | Lista produktów |
| `/products/:id` | Szczegóły produktu |
| `/cart` | Koszyk |
| `/orders` | Moje zamówienia |
| `/auth/login` | Logowanie |
| `/auth/signup` | Rejestracja |
| `/admin/products` | Zarządzanie produktami |
| `/admin/add-product` | Dodaj produkt |

## 🔌 API Endpoints

### Produkty
```
GET    /api/products              # Lista produktów
GET    /api/products/:id          # Szczegóły
POST   /api/products              # Dodaj produkt
PUT    /api/products/:id          # Edytuj produkt
DELETE /api/products/:id          # Usuń produkt
```

### Autoryzacja
```
POST   /api/auth/signup           # Rejestracja
POST   /api/auth/login            # Logowanie
POST   /api/auth/reset            # Reset hasła
POST   /api/auth/new-password     # Nowe hasło
```

### Koszyk
```
GET    /api/cart/:userId          # Pobierz koszyk
POST   /api/cart/add              # Dodaj do koszyka
POST   /api/cart/remove           # Usuń z koszyka
```

### Zamówienia
```
GET    /api/orders/:userId        # Lista zamówień
POST   /api/orders/create         # Utwórz zamówienie
GET    /api/orders/invoice/:id    # Pobierz fakturę PDF
```

Przykłady testowania: [QUICKSTART.md](QUICKSTART.md)

## 💾 Baza danych

**MongoDB** z modelami:
- **Product** - produkty
- **User** - użytkownicy z koszykiem
- **Order** - zamówienia

## 🔐 Autoryzacja

- Hasła hashowane z **bcryptjs** (12 rounds)
- Token reset hasła z 1-godzinnym TTL
- Stan użytkownika w **Pinia store** + **localStorage**

## 🛠️ Technologia

### Frontend
- **Nuxt 4** - framework
- **Vue 3** - UI library
- **TypeScript** - typowanie
- **Pinia** - state management
- **CSS** - stylowanie

### Backend
- **Nitro** - API runtime
- **Node.js** - JavaScript runtime
- **MongoDB** - baza danych
- **Mongoose** - ODM
- **bcryptjs** - hashing haseł
- **PDFKit** - generowanie PDF

## 📦 Zbuduj dla produkcji

```bash
# Zbuduj dla produkcji
npm run build

# Podgląd buildu
npm run preview

# Generuj statyczną stronę (SSG)
npm run generate
```

## 🐛 Debugowanie

```bash
# Z verbose output
npm run dev -- --verbose

# Z debuggingiem
DEBUG=* npm run dev
```

## 🤝 Migracja z Express

Projekt jest pełną migracją z Express.js. Oryginalny projekt dostępny w `/express`:

```
Express (stara struktura)       →  Nuxt 4 (nowa struktura)
├── controllers/                →  server/api/
├── routes/                     →  file-based routing w pages/
├── views/                      →  components/ + pages/
├── models/                     →  server/models/
└── public/                     →  public/
```

Szczegóły: [COMPLETE_MIGRATION.md](COMPLETE_MIGRATION.md)

## 📝 Uwagi dla developerów

### TODO / Ulepszenia

- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Upload plików (obrazki)
- [ ] Email dla resetowania hasła
- [ ] Walidacja formularzy (Zod/Yup)
- [ ] Toast notifications
- [ ] Auth middleware
- [ ] Tests (Vitest)
- [ ] Image optimization (Nuxt Image)
- [ ] i18n (wielojęzyczność)

### Known Issues
- ⚠️ Placeholder `USER_ID_PLACEHOLDER` - zamień na ID z store w komponentach cart/orders
- ⚠️ Upload plików wymaga implementacji
- ⚠️ CSRF protection - do dodania

## 🎓 Edukacyjny projekt

Realizowany jako część przedmiotu:
- **Przedmiot**: Programowanie back-end
- **Stopień**: II (magisterskie)
- **Kierunek**: Informatyka Stosowana
- **Instytucja**: Politechnika Krakowska

Autor: Grzegorz Filo  
Wersja: 2.0 (Nuxt 4)

## 📄 Licencja

AFL-3.0

---

**Gotowe do uruchomienia!** 🚀

```bash
npm install && npm run dev
```
