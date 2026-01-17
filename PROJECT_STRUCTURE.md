# Struktura projektu Nuxt 4 - Giełda Internetowa

## 📁 Pełna struktura katalogów

```
Nodx/
│
├── 📁 app/
│   └── app.vue                           # Główny plik aplikacji z CSS imports
│
├── 📁 components/
│   ├── TheNavigation.vue                 # Główna nawigacja (desktop + mobile)
│   ├── ProductCard.vue                   # Komponent karty produktu
│   └── Pagination.vue                    # Komponent paginacji
│
├── 📁 layouts/
│   └── default.vue                       # Domyślny layout ze slotami
│
├── 📁 pages/
│   ├── index.vue                         # 🏠 Strona główna / powitalna
│   ├── cart.vue                          # 🛒 Koszyk zakupowy
│   ├── orders.vue                        # 📦 Lista zamówień użytkownika
│   ├── 404.vue                           # ❌ Strona 404
│   │
│   ├── 📁 products/
│   │   ├── index.vue                     # 📋 Lista wszystkich produktów
│   │   └── [id].vue                      # 📄 Szczegóły pojedynczego produktu
│   │
│   ├── 📁 auth/
│   │   ├── login.vue                     # 🔐 Strona logowania
│   │   ├── signup.vue                    # ✍️ Strona rejestracji
│   │   ├── reset.vue                     # 🔄 Żądanie resetu hasła
│   │   └── new-password.vue              # 🔑 Ustawienie nowego hasła
│   │
│   └── 📁 admin/
│       ├── products.vue                  # ⚙️ Zarządzanie produktami (admin)
│       ├── add-product.vue               # ➕ Dodawanie nowego produktu
│       └── 📁 edit-product/
│           └── [id].vue                  # ✏️ Edycja istniejącego produktu
│
├── 📁 server/
│   ├── 📁 api/                           # API Routes (RESTful endpoints)
│   │   │
│   │   ├── 📁 products/
│   │   │   ├── index.get.ts              # GET /api/products - lista
│   │   │   ├── index.post.ts             # POST /api/products - dodaj
│   │   │   ├── [id].get.ts               # GET /api/products/:id - szczegóły
│   │   │   ├── [id].put.ts               # PUT /api/products/:id - edytuj
│   │   │   └── [id].delete.ts            # DELETE /api/products/:id - usuń
│   │   │
│   │   ├── 📁 auth/
│   │   │   ├── signup.post.ts            # POST /api/auth/signup - rejestracja
│   │   │   ├── login.post.ts             # POST /api/auth/login - logowanie
│   │   │   ├── reset.post.ts             # POST /api/auth/reset - reset hasła
│   │   │   └── new-password.post.ts      # POST /api/auth/new-password - nowe hasło
│   │   │
│   │   ├── 📁 cart/
│   │   │   ├── [userId].get.ts           # GET /api/cart/:userId - pobierz koszyk
│   │   │   ├── add.post.ts               # POST /api/cart/add - dodaj do koszyka
│   │   │   └── remove.post.ts            # POST /api/cart/remove - usuń z koszyka
│   │   │
│   │   └── 📁 orders/
│   │       ├── [userId].get.ts           # GET /api/orders/:userId - lista zamówień
│   │       ├── create.post.ts            # POST /api/orders/create - utwórz zamówienie
│   │       └── 📁 invoice/
│   │           └── [orderId].get.ts      # GET /api/orders/invoice/:id - PDF faktura
│   │
│   ├── 📁 models/                        # Modele Mongoose (baza danych)
│   │   ├── product.ts                    # Model: Product
│   │   ├── user.ts                       # Model: User (z koszykiem)
│   │   └── order.ts                      # Model: Order
│   │
│   └── 📁 plugins/
│       └── mongoose.ts                   # Plugin Nitro: połączenie z MongoDB
│
├── 📁 stores/                            # Pinia Stores (zarządzanie stanem)
│   └── auth.ts                           # Store: autoryzacja i koszyk
│
├── 📁 plugins/                           # Pluginy Nuxt
│   └── auth.client.ts                    # Plugin: inicjalizacja auth z localStorage
│
├── 📁 public/                            # Pliki statyczne (dostępne publicznie)
│   ├── 📁 css/
│   │   ├── main.css                      # Główne style
│   │   ├── product.css                   # Style produktów
│   │   ├── forms.css                     # Style formularzy
│   │   ├── auth.css                      # Style autoryzacji
│   │   ├── cart.css                      # Style koszyka
│   │   └── orders.css                    # Style zamówień
│   ├── 📁 img/
│   │   ├── pk.png
│   │   ├── wm.png
│   │   └── m7.png
│   ├── 📁 js/
│   │   ├── admin.js                      # JS dla admina
│   │   └── main.js                       # Główny JS
│   └── robots.txt
│
├── 📁 express/                           # Oryginalny projekt Express (referencja)
│   └── ...                               # (zachowany do porównania)
│
├── 📄 nuxt.config.ts                     # Konfiguracja Nuxt
├── 📄 tsconfig.json                      # Konfiguracja TypeScript
├── 📄 package.json                       # Zależności projektu
├── 📄 error.vue                          # Globalna strona błędów
│
└── 📄 Dokumentacja/
    ├── README.md                         # Podstawowe info
    ├── MIGRATION.md                      # Podstawowa dokumentacja migracji
    ├── COMPLETE_MIGRATION.md             # Pełna dokumentacja migracji ⭐
    ├── QUICKSTART.md                     # Szybki start i przykłady API
    └── PROJECT_STRUCTURE.md              # Ten plik (struktura projektu)
```

## 🎯 Routing (automatyczny, file-based)

| URL | Plik | Opis |
|-----|------|------|
| `/` | `pages/index.vue` | Strona główna |
| `/products` | `pages/products/index.vue` | Lista produktów |
| `/products/123` | `pages/products/[id].vue` | Szczegóły produktu (dynamic) |
| `/cart` | `pages/cart.vue` | Koszyk |
| `/orders` | `pages/orders.vue` | Zamówienia |
| `/auth/login` | `pages/auth/login.vue` | Logowanie |
| `/auth/signup` | `pages/auth/signup.vue` | Rejestracja |
| `/auth/reset` | `pages/auth/reset.vue` | Reset hasła |
| `/auth/new-password` | `pages/auth/new-password.vue` | Nowe hasło |
| `/admin/products` | `pages/admin/products.vue` | Admin: produkty |
| `/admin/add-product` | `pages/admin/add-product.vue` | Admin: dodaj |
| `/admin/edit-product/123` | `pages/admin/edit-product/[id].vue` | Admin: edytuj (dynamic) |

## 🔌 API Endpoints

### Produkty
- `GET /api/products?page=1&limit=10` - lista z paginacją
- `GET /api/products/:id` - szczegóły
- `POST /api/products` - dodaj nowy
- `PUT /api/products/:id` - aktualizuj
- `DELETE /api/products/:id` - usuń

### Autoryzacja
- `POST /api/auth/signup` - rejestracja
- `POST /api/auth/login` - logowanie
- `POST /api/auth/reset` - żądanie resetu hasła
- `POST /api/auth/new-password` - ustawienie nowego hasła

### Koszyk
- `GET /api/cart/:userId` - pobierz koszyk użytkownika
- `POST /api/cart/add` - dodaj produkt do koszyka
- `POST /api/cart/remove` - usuń produkt z koszyka

### Zamówienia
- `GET /api/orders/:userId` - lista zamówień użytkownika
- `POST /api/orders/create` - utwórz nowe zamówienie
- `GET /api/orders/invoice/:orderId` - pobierz fakturę PDF

## 🗄️ Modele bazy danych (MongoDB + Mongoose)

### Product
```typescript
{
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: ObjectId;
}
```

### User
```typescript
{
  email: string;
  password: string; // hashed with bcrypt
  resetToken?: string;
  resetTokenExpiration?: Date;
  cart: {
    items: [{
      productId: ObjectId;
      quantity: number;
    }]
  }
}
```

### Order
```typescript
{
  products: [{
    product: Object;
    quantity: number;
  }];
  user: {
    email: string;
    userId: ObjectId;
  }
}
```

## 🎨 Komponenty wielokrotnego użytku

- `TheNavigation.vue` - Responsywna nawigacja z menu mobilnym
- `ProductCard.vue` - Karta produktu z obrazkiem, ceną, opisem
- `Pagination.vue` - Nawigacja po stronach (prev/next)

## 💾 Store (Pinia)

**auth.ts** - główny store aplikacji:
- `state`: user, isAuthenticated, cart
- `actions`: login(), signup(), logout(), addToCart(), removeFromCart(), createOrder()
- `getters`: cartItemCount, cartTotal

## 🔧 Konfiguracja

**nuxt.config.ts**:
- MongoDB URI
- Secrets (session, CSRF)
- Modules: Pinia
- Nitro experimental features

**package.json** - główne zależności:
- `nuxt` - framework
- `mongoose` - ODM dla MongoDB
- `pinia` - state management
- `bcryptjs` - hashing haseł
- `pdfkit` - generowanie PDF

## 📝 Konwencje nazewnictwa

- **Pages**: PascalCase dla komponentów Vue (`index.vue`, `[id].vue`)
- **API**: kebab-case + HTTP method (`index.get.ts`, `[id].delete.ts`)
- **Components**: PascalCase (`TheNavigation.vue`, `ProductCard.vue`)
- **Stores**: camelCase (`auth.ts`)
- **Dynamic routes**: `[param].vue` (nawiasy kwadratowe)

## 🚀 Polecenia npm

```bash
npm run dev        # Uruchom serwer deweloperski
npm run build      # Zbuduj dla produkcji
npm run preview    # Podgląd buildu produkcyjnego
npm run generate   # Generuj statyczną stronę (SSG)
```

## 📚 Dodatkowe informacje

- **Auto-imports**: Vue Composables, Nuxt utils - automatycznie importowane
- **TypeScript**: Pełne wsparcie + type inference
- **Hot Module Replacement**: Zmiany widoczne natychmiast
- **SSR/SSG**: Server-Side Rendering lub Static Site Generation
- **API Routes**: Backend i frontend w jednym projekcie

## 🔐 Bezpieczeństwo

⚠️ **TODO** - do implementacji:
- CSRF protection
- Rate limiting
- Input sanitization
- File upload validation
- Environment variables dla secrets

## 🎓 Dla celów edukacyjnych

Ten projekt został stworzony jako część przedmiotu "Programowanie back-end" na studiach magisterskich Informatyki Stosowanej na Politechnice Krakowskiej.

---

**Autor**: Student M7 WM PK  
**Przedmiot**: Programowanie back-end  
**Stopień**: II (magisterskie)
