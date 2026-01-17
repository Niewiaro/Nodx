<template>
    <main>
        <div v-if="pending" class="centered">
            <p>Ładowanie zamówień...</p>
        </div>
        <div v-else-if="error" class="centered">
            <p class="user-message user-message--error">{{ error.message }}</p>
        </div>
        <template v-else-if="orders && orders.orders && orders.orders.length > 0">
            <ul class="orders">
                <li v-for="order in orders.orders" :key="order._id" class="orders__item">
                    <h1>
                        Order - # {{ order._id }} -
                        <a :href="`/api/orders/invoice/${order._id}`" target="_blank">Invoice</a>
                    </h1>
                    <ul class="orders__products">
                        <li v-for="(item, index) in order.products" :key="index" class="orders__products-item">
                            {{ item.product.title }} ({{ item.quantity }})
                        </li>
                    </ul>
                </li>
            </ul>
        </template>
        <h1 v-else class="centered">Nothing there!</h1>
    </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';

useHead({
    title: 'Your Orders',
});

const authStore = useAuthStore();
const userId = computed(() => authStore.user?.id || '');

const { data: orders, pending, error } = await useFetch(() => `/api/orders/${userId.value}`, {
    watch: [userId],
});
</script>
