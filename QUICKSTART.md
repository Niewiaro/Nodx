# Quick Start Guide - Nuxt E-commerce

## Uruchomienie projektu

1. **Start MongoDB** (jeśli używasz lokalnie):
```bash
mongod
```

2. **Uruchom aplikację Nuxt**:
```bash
npm run dev
```

3. **Otwórz przeglądarkę**:
```
http://localhost:3000
```

## Testowanie API

### 1. Rejestracja użytkownika

**Endpoint:** `POST /api/auth/signup`

**PowerShell:**
```powershell
$body = @{
    email = "test@example.com"
    password = "test123"
    confirmPassword = "test123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/auth/signup" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**cURL (Git Bash):**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","confirmPassword":"test123"}'
```

### 2. Logowanie

**Endpoint:** `POST /api/auth/login`

**PowerShell:**
```powershell
$body = @{
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"

$response.Content | ConvertFrom-Json
```

### 3. Dodanie produktu

**Endpoint:** `POST /api/products`

**PowerShell** (zamień USER_ID na prawdziwe ID z logowania):
```powershell
$body = @{
    title = "Laptop Dell XPS 15"
    price = 4999.99
    description = "Wydajny laptop do pracy i rozrywki"
    imageUrl = "/images/laptop.jpg"
    userId = "USER_ID_TUTAJ"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/products" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### 4. Pobranie listy produktów

**Endpoint:** `GET /api/products`

**PowerShell:**
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/products?page=1&limit=10"
$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

**Przeglądarka:**
```
http://localhost:3000/api/products?page=1&limit=10
```

### 5. Szczegóły produktu

**Endpoint:** `GET /api/products/:id`

**PowerShell** (zamień PRODUCT_ID):
```powershell
$productId = "PRODUCT_ID_TUTAJ"
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/products/$productId"
$response.Content | ConvertFrom-Json
```

### 6. Dodanie do koszyka

**Endpoint:** `POST /api/cart/add`

**PowerShell:**
```powershell
$body = @{
    userId = "USER_ID_TUTAJ"
    productId = "PRODUCT_ID_TUTAJ"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/cart/add" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### 7. Pobranie koszyka

**Endpoint:** `GET /api/cart/:userId`

**PowerShell:**
```powershell
$userId = "USER_ID_TUTAJ"
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/cart/$userId"
$response.Content | ConvertFrom-Json
```

### 8. Utworzenie zamówienia

**Endpoint:** `POST /api/orders/create`

**PowerShell:**
```powershell
$body = @{
    userId = "USER_ID_TUTAJ"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/orders/create" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### 9. Lista zamówień

**Endpoint:** `GET /api/orders/:userId`

**PowerShell:**
```powershell
$userId = "USER_ID_TUTAJ"
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/orders/$userId"
$response.Content | ConvertFrom-Json
```

### 10. Pobranie faktury PDF

**Endpoint:** `GET /api/orders/invoice/:orderId`

**PowerShell:**
```powershell
$orderId = "ORDER_ID_TUTAJ"
Invoke-WebRequest -Uri "http://localhost:3000/api/orders/invoice/$orderId" `
    -OutFile "faktura.pdf"
```

**Przeglądarka:**
```
http://localhost:3000/api/orders/invoice/ORDER_ID_TUTAJ
```

## Pełny przykład workflow

```powershell
# 1. Rejestracja
$signup = @{
    email = "jan@example.com"
    password = "haslo123"
    confirmPassword = "haslo123"
} | ConvertTo-Json

$signupResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/signup" `
    -Method POST -Body $signup -ContentType "application/json"
Write-Host "Użytkownik utworzony!"

# 2. Logowanie
$login = @{
    email = "jan@example.com"
    password = "haslo123"
} | ConvertTo-Json

$loginResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" `
    -Method POST -Body $login -ContentType "application/json"
$user = $loginResponse.Content | ConvertFrom-Json
$userId = $user.user.id
Write-Host "Zalogowano! User ID: $userId"

# 3. Dodanie produktu
$product = @{
    title = "Smartfon Samsung"
    price = 2999
    description = "Nowy smartfon z flagowej serii"
    imageUrl = "/images/samsung.jpg"
    userId = $userId
} | ConvertTo-Json

$productResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/products" `
    -Method POST -Body $product -ContentType "application/json"
$newProduct = $productResponse.Content | ConvertFrom-Json
$productId = $newProduct.product._id
Write-Host "Produkt dodany! Product ID: $productId"

# 4. Dodanie do koszyka
$addToCart = @{
    userId = $userId
    productId = $productId
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/cart/add" `
    -Method POST -Body $addToCart -ContentType "application/json"
Write-Host "Dodano do koszyka!"

# 5. Sprawdzenie koszyka
$cartResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/cart/$userId"
$cart = $cartResponse.Content | ConvertFrom-Json
Write-Host "Koszyk:" 
$cart | ConvertTo-Json -Depth 10

# 6. Utworzenie zamówienia
$createOrder = @{
    userId = $userId
} | ConvertTo-Json

$orderResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/orders/create" `
    -Method POST -Body $createOrder -ContentType "application/json"
$order = $orderResponse.Content | ConvertFrom-Json
$orderId = $order.order._id
Write-Host "Zamówienie utworzone! Order ID: $orderId"

# 7. Pobranie faktury
Invoke-WebRequest -Uri "http://localhost:3000/api/orders/invoice/$orderId" `
    -OutFile "faktura_$orderId.pdf"
Write-Host "Faktura zapisana jako faktura_$orderId.pdf"
```

## Frontend Pages

### Strona główna (Lista produktów)
```
http://localhost:3000/
```

### Szczegóły produktu
```
http://localhost:3000/products/PRODUCT_ID
```

## Typowe problemy

### 1. MongoDB nie działa
```powershell
# Sprawdź czy MongoDB jest uruchomione
Get-Process mongod

# Jeśli nie, uruchom:
mongod
```

### 2. Port 3000 zajęty
```powershell
# Zmień port w package.json lub .env
PORT=3001 npm run dev
```

### 3. Błędy importów TypeScript
```powershell
# Przebuduj typy Nuxt
npm run postinstall
```

## Narzędzia pomocnicze

### REST Client (VS Code Extension)
Zainstaluj "REST Client" w VS Code i utwórz plik `api-tests.http`:

```http
### Rejestracja
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123",
  "confirmPassword": "test123"
}

### Logowanie
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}

### Lista produktów
GET http://localhost:3000/api/products?page=1&limit=10
```

## Dalsze kroki

1. ✅ Backend API - **GOTOWE**
2. ✅ Modele bazy danych - **GOTOWE**
3. ✅ Podstawowe strony - **GOTOWE**
4. 🚧 System autoryzacji (JWT/sessions)
5. 🚧 Pełny frontend UI
6. 🚧 Upload plików (obrazy produktów)
7. 🚧 Panel administratora
8. 🚧 Walidacja danych
9. 🚧 Testy
10. 🚧 Deployment
