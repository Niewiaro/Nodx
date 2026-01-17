# Migracja projektu z Express.js na Nuxt 3

## Przegląd projektu

Ten projekt to migracja aplikacji e-commerce z Express.js na Nuxt 3. Aplikacja zawiera:
- Zarządzanie produktami (CRUD)
- System autoryzacji (rejestracja, logowanie, resetowanie hasła)
- Koszyk zakupowy
- Zamówienia
- Generowanie faktur PDF

## Struktura projektu

```
Nodx/
├── server/
│   ├── api/                    # API endpoints (Nuxt Server Routes)
│   │   ├── products/           # Endpoints produktów
│   │   ├── auth/              # Endpoints autoryzacji
│   │   ├── cart/              # Endpoints koszyka
│   │   └── orders/            # Endpoints zamówień
│   ├── models/                # Modele Mongoose
│   │   ├── product.ts
│   │   ├── user.ts
│   │   └── order.ts
│   ├── plugins/               # Pluginy Nitro
│   │   └── mongoose.ts        # Połączenie z MongoDB
│   └── utils/                 # Funkcje pomocnicze
│       └── file.ts
├── pages/                     # Strony aplikacji (Vue Router)
│   ├── index.vue             # Lista produktów
│   └── products/
│       └── [id].vue          # Szczegóły produktu
├── express/                   # Oryginalny projekt Express (referencja)
└── nuxt.config.ts            # Konfiguracja Nuxt

```

## Co zostało zmigrowane

### ✅ Backend (Server API)

1. **Modele bazy danych** (Mongoose)
   - `Product` - produkty
   - `User` - użytkownicy z koszykiem
   - `Order` - zamówienia

2. **API Endpoints**
   
   **Produkty:**
   - `GET /api/products` - lista produktów z paginacją
   - `GET /api/products/:id` - szczegóły produktu
   - `POST /api/products` - dodanie produktu
   - `PUT /api/products/:id` - edycja produktu
   - `DELETE /api/products/:id` - usunięcie produktu

   **Autoryzacja:**
   - `POST /api/auth/signup` - rejestracja
   - `POST /api/auth/login` - logowanie
   - `POST /api/auth/reset` - żądanie resetu hasła
   - `POST /api/auth/new-password` - ustawienie nowego hasła

   **Koszyk:**
   - `GET /api/cart/:userId` - pobranie koszyka
   - `POST /api/cart/add` - dodanie do koszyka
   - `POST /api/cart/remove` - usunięcie z koszyka

   **Zamówienia:**
   - `GET /api/orders/:userId` - lista zamówień użytkownika
   - `POST /api/orders/create` - utworzenie zamówienia
   - `GET /api/orders/invoice/:orderId` - generowanie faktury PDF

### 🚧 Do zrobienia

1. **Zarządzanie sesją/stanem**
   - W Express używano `express-session`
   - W Nuxt trzeba zaimplementować:
     - JWT tokens + cookies, lub
     - Nuxt Auth module (@sidebase/nuxt-auth), lub
     - Pinia store + localStorage

2. **Upload plików**
   - Express używał `multer`
   - W Nuxt można użyć `h3-formidable` lub innych rozwiązań

3. **CSRF Protection**
   - Express używał `tiny-csrf`
   - W Nuxt należy zaimplementować własne middleware

4. **Walidacja**
   - Express używał `express-validator`
   - W Nuxt można użyć `zod`, `yup` lub `valibot`

5. **Frontend (Pages/Components)**
   - Strony autoryzacji (login, signup, reset)
   - Strona koszyka
   - Strona zamówień
   - Panel admina
   - Komponenty UI

## Instalacja i uruchomienie

### Wymagania
- Node.js 18+
- MongoDB (lokalnie lub Atlas)

### Kroki

1. **Zainstaluj zależności:**
```bash
npm install
```

2. **Skonfiguruj MongoDB:**
   
   Edytuj `nuxt.config.ts` i ustaw URI MongoDB:
```typescript
runtimeConfig: {
  mongodbUri: "mongodb://127.0.0.1:27017/g_back_05"
}
```

3. **Uruchom serwer deweloperski:**
```bash
npm run dev
```

4. **Otwórz w przeglądarce:**
```
http://localhost:3000
```

## Różnice między Express a Nuxt

| Aspekt | Express | Nuxt 3 |
|--------|---------|--------|
| Routing | `router.get/post()` | File-based w `server/api/` |
| Middleware | `app.use()` | Nitro middleware |
| Sesje | `express-session` | JWT/cookies lub Auth module |
| Views | EJS templates | Vue 3 SFC |
| Static files | `express.static()` | `public/` folder |
| Walidacja | `express-validator` | Zod/Yup/własne |

## API Testing

Możesz testować API używając:

### Przykład - Pobranie produktów
```bash
curl http://localhost:3000/api/products?page=1&limit=10
```

### Przykład - Rejestracja użytkownika
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","confirmPassword":"test123"}'
```

### Przykład - Dodanie produktu
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Test Product",
    "price":99.99,
    "description":"Test description",
    "imageUrl":"/images/test.jpg",
    "userId":"USER_ID_HERE"
  }'
```

## Kolejne kroki

1. **Implementacja zarządzania stanem użytkownika**
   - Zainstaluj Pinia: `npm install pinia @pinia/nuxt`
   - Utwórz store dla użytkownika i koszyka

2. **Dodanie autentykacji**
   - Implementacja JWT lub użycie `@sidebase/nuxt-auth`

3. **Stworzenie kompletnego UI**
   - Formularze logowania/rejestracji
   - Interfejs administratora
   - Widok koszyka i checkout

4. **Obsługa uploadów**
   - Implementacja uploadu obrazków produktów

5. **Deployment**
   - Vercel/Netlify dla frontendu
   - Railway/Render dla MongoDB

## Zasoby

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Nitro Documentation](https://nitro.unjs.io/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Vue 3 Documentation](https://vuejs.org/)

## Licencja

AFL-3.0 (zgodnie z oryginalnym projektem)
