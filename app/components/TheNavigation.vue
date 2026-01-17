<template>
    <div>
        <div class="backdrop" :class="{ open: isMobileMenuOpen }" @click="toggleMobileMenu"></div>
        <ClientOnly>
            <header class="main-header">
                <button id="side-menu-toggle" @click="toggleMobileMenu">Menu</button>
                <nav class="main-header__nav">
                    <ul class="main-header__item-list">
                        <li class="main-header__item">
                            <NuxtLink to="/" :class="{ active: route.path === '/' }">Main</NuxtLink>
                        </li>
                        <li class="main-header__item">
                            <NuxtLink to="/products" :class="{ active: route.path === '/products' }">Products</NuxtLink>
                        </li>
                        <template v-if="isAuthenticated">
                            <li class="main-header__item">
                                <NuxtLink to="/cart" :class="{ active: route.path === '/cart' }">Cart</NuxtLink>
                            </li>
                            <li class="main-header__item">
                                <NuxtLink to="/orders" :class="{ active: route.path === '/orders' }">Orders</NuxtLink>
                            </li>
                            <li class="main-header__item">
                                <NuxtLink to="/admin/add-product"
                                    :class="{ active: route.path === '/admin/add-product' }">
                                    Add Product
                                </NuxtLink>
                            </li>
                            <li class="main-header__item">
                                <NuxtLink to="/admin/products" :class="{ active: route.path === '/admin/products' }">
                                    Admin Products
                                </NuxtLink>
                            </li>
                        </template>
                    </ul>
                    <ul class="main-header__item-list">
                        <template v-if="!isAuthenticated">
                            <li class="main-header__item">
                                <NuxtLink to="/auth/login" :class="{ active: route.path === '/auth/login' }">Login
                                </NuxtLink>
                            </li>
                            <li class="main-header__item">
                                <NuxtLink to="/auth/signup" :class="{ active: route.path === '/auth/signup' }">Signup
                                </NuxtLink>
                            </li>
                        </template>
                        <template v-else>
                            <li class="main-header__item">
                                <button type="button" @click="logout" class="btn-logout">Logout</button>
                            </li>
                        </template>
                    </ul>
                </nav>
            </header>

            <nav class="mobile-nav" :class="{ open: isMobileMenuOpen }">
                <ul class="mobile-nav__item-list">
                    <li class="mobile-nav__item">
                        <NuxtLink to="/" :class="{ active: route.path === '/' }" @click="toggleMobileMenu">Main
                        </NuxtLink>
                    </li>
                    <li class="mobile-nav__item">
                        <NuxtLink to="/products" :class="{ active: route.path === '/products' }"
                            @click="toggleMobileMenu">
                            Products
                        </NuxtLink>
                    </li>
                    <template v-if="isAuthenticated">
                        <li class="mobile-nav__item">
                            <NuxtLink to="/cart" :class="{ active: route.path === '/cart' }" @click="toggleMobileMenu">
                                Cart
                            </NuxtLink>
                        </li>
                        <li class="mobile-nav__item">
                            <NuxtLink to="/orders" :class="{ active: route.path === '/orders' }"
                                @click="toggleMobileMenu">
                                Orders
                            </NuxtLink>
                        </li>
                        <li class="mobile-nav__item">
                            <NuxtLink to="/admin/add-product" :class="{ active: route.path === '/admin/add-product' }"
                                @click="toggleMobileMenu">
                                Add Product
                            </NuxtLink>
                        </li>
                        <li class="mobile-nav__item">
                            <NuxtLink to="/admin/products" :class="{ active: route.path === '/admin/products' }"
                                @click="toggleMobileMenu">
                                Admin Products
                            </NuxtLink>
                        </li>
                    </template>
                    <template v-if="!isAuthenticated">
                        <li class="mobile-nav__item">
                            <NuxtLink to="/auth/login" :class="{ active: route.path === '/auth/login' }"
                                @click="toggleMobileMenu">
                                Login
                            </NuxtLink>
                        </li>
                        <li class="mobile-nav__item">
                            <NuxtLink to="/auth/signup" :class="{ active: route.path === '/auth/signup' }"
                                @click="toggleMobileMenu">
                                Signup
                            </NuxtLink>
                        </li>
                    </template>
                    <template v-else>
                        <li class="mobile-nav__item">
                            <button type="button" @click="logout">Logout</button>
                        </li>
                    </template>
                </ul>
            </nav>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';

const route = useRoute();
const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);

// Pobierz isAuthenticated z store
const isAuthenticated = computed(() => authStore.isAuthenticated);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const logout = async () => {
    try {
        await authStore.logout();
        navigateTo('/');
    } catch (error) {
        console.error('Logout error:', error);
    }
};
</script>

<style scoped>
.btn-logout {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    padding: 0;
}

.btn-logout:hover {
    color: #ffeb3b;
}
</style>
