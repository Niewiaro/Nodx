<template>
    <article class="card product-item">
        <header class="card__header">
            <h1 class="product__title">{{ product.title }}</h1>
        </header>
        <div class="card__image">
            <img :src="`/${product.imageUrl}`" :alt="product.title">
        </div>
        <div class="card__content">
            <h2 class="product__price">{{ product.price }} PLN</h2>
            <p class="product__description">{{ product.description }}</p>
        </div>
        <div class="card__actions">
            <NuxtLink :to="`/products/${product._id}`" class="btn">Details</NuxtLink>
            <button v-if="showAddToCart && isAuthenticated" @click="addToCart" class="btn" type="button">
                Add to Cart
            </button>
        </div>
    </article>
</template>

<script setup lang="ts">
interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    userId?: string;
}

const props = defineProps<{
    product: Product;
    showAddToCart?: boolean;
}>();

// TODO: Połączyć z Pinia store
const isAuthenticated = ref(false);

const addToCart = async () => {
    try {
        // TODO: Wywołać API do dodania do koszyka
        console.log('Adding to cart:', props.product._id);
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};
</script>
