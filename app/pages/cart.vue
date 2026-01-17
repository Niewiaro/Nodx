<template>
    <main>
        <div v-if="pending" class="centered">
            <p>Ładowanie koszyka...</p>
        </div>
        <div v-else-if="error" class="centered">
            <p class="user-message user-message--error">{{ error.message }}</p>
        </div>
        <template v-else-if="cart && cart.cart && cart.cart.items && cart.cart.items.length > 0">
            <ul class="cart__item-list">
                <li v-for="item in cart.cart.items" :key="item.productId._id" class="cart__item">
                    <h1>{{ item.productId.title }}</h1>
                    <h2>Quantity: {{ item.quantity }}</h2>
                    <button @click="removeFromCart(item.productId._id)" class="btn danger" type="button">
                        Delete
                    </button>
                </li>
            </ul>
            <hr>
            <div class="centered">
                <button @click="createOrder" class="btn" type="button" :disabled="isCreatingOrder">
                    {{ isCreatingOrder ? 'Creating...' : 'Order Now!' }}
                </button>
            </div>
        </template>
        <h1 v-else class="centered">No Products in Cart!</h1>
    </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';

useHead({
    title: 'Your Cart',
});

const authStore = useAuthStore();
const userId = computed(() => authStore.user?.id || '');

const { data: cart, pending, error, refresh } = await useFetch(() => `/api/cart/${userId.value}`, {
    watch: [userId],
});

const isCreatingOrder = ref(false);

const removeFromCart = async (productId: string) => {
    try {
        await $fetch('/api/cart/remove', {
            method: 'POST',
            body: {
                userId: userId.value,
                productId,
            },
        });
        refresh();
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
};

const createOrder = async () => {
    try {
        isCreatingOrder.value = true;
        await $fetch('/api/orders/create', {
            method: 'POST',
            body: {
                userId: userId.value,
            },
        });
        navigateTo('/orders');
    } catch (error) {
        console.error('Error creating order:', error);
    } finally {
        isCreatingOrder.value = false;
    }
};
</script>
