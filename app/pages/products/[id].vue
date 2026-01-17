<template>
  <main class="centered">
    <div v-if="pending">
      <p>Ładowanie produktu...</p>
    </div>
    <div v-else-if="error">
      <p class="user-message user-message--error">{{ error.message }}</p>
    </div>
    <template v-else-if="product">
      <h1>{{ product.title }}</h1>
      <hr>
      <div class="image">
        <img :src="`/${product.imageUrl}`" :alt="product.title">
      </div>
      <h2>{{ product.price }} PLN</h2>
      <p>{{ product.description }}</p>
      <button v-if="isAuthenticated" @click="addToCart" class="btn" type="button">
        Add to Cart
      </button>
    </template>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth';

const route = useRoute();
const productId = route.params.id as string;

useHead({
  title: 'Product Details',
});

const authStore = useAuthStore();
const { data: product, pending, error } = await useFetch(`/api/products/${productId}`);

const isAuthenticated = computed(() => authStore.isAuthenticated);

const addToCart = async () => {
  try {
    if (!isAuthenticated.value) {
      alert('Please login first');
      navigateTo('/auth/login');
      return;
    }
    await authStore.addToCart(productId);
    alert('Product added to cart!');
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Error adding to cart');
  }
};
</script>
