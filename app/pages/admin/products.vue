<template>
    <main>
        <div v-if="pending" class="centered">
            <p>Ładowanie produktów...</p>
        </div>
        <div v-else-if="error" class="centered">
            <p class="user-message user-message--error">{{ error.message }}</p>
        </div>
        <template v-else-if="products && products.length > 0">
            <div class="grid">
                <article v-for="product in products" :key="product._id" class="card product-item">
                    <header class="card__header">
                        <h1 class="product__title">{{ product.title }}</h1>
                    </header>
                    <div class="card__image">
                        <img :src="`/${product.imageUrl}`" :alt="product.title">
                    </div>
                    <div class="card__content">
                        <h2 class="product__price">{{ product.price }}&nbsp;zł</h2>
                        <p class="product__description">{{ product.description }}</p>
                    </div>
                    <div class="card__actions">
                        <NuxtLink :to="`/admin/edit-product/${product._id}`" class="btn">Edit</NuxtLink>
                        <button @click="deleteProduct(product._id)" class="btn" type="button">Delete</button>
                    </div>
                </article>
            </div>
        </template>
        <h1 v-else class="centered">No Products Found!</h1>
    </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth';

useHead({
    title: 'Admin Products',
});

const authStore = useAuthStore();
const userId = computed(() => authStore.user?.id || '');

const { data, pending, error, refresh } = await useFetch(() => `/api/products?userId=${userId.value}`, {
    watch: [userId],
    query: {
        page: 1,
        limit: 100,
    },
});

const products = computed(() => {
    return data.value?.products || [];
});

const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    try {
        await $fetch(`/api/products/${productId}`, {
            method: 'DELETE',
            body: {
                userId: userId.value,
            },
        });
        refresh();
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
    }
};
</script>
