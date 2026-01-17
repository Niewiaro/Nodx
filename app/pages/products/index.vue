<template>
    <main>
        <div v-if="pending" class="centered">
            <p>Ładowanie produktów...</p>
        </div>
        <div v-else-if="error" class="centered">
            <p class="user-message user-message--error">{{ error.message }}</p>
        </div>
        <template v-else-if="data && data.products && data.products.length > 0">
            <div class="grid">
                <ProductCard v-for="product in data.products" :key="product._id" :product="product" />
            </div>
            <Pagination :current-page="data.currentPage" :total-pages="data.totalPages"
                :has-next-page="data.hasNextPage" :has-previous-page="data.hasPreviousPage" base-url="/products" />
        </template>
        <h1 v-else class="centered">No Products Found!</h1>
    </main>
</template>

<script setup lang="ts">
useHead({
    title: 'Products - Lista produktów',
});

const route = useRoute();
const page = computed(() => parseInt(route.query.page as string) || 1);

const { data, pending, error, refresh } = await useFetch('/api/products', {
    query: {
        page: page,
        limit: 3,
    },
    watch: [page],
});
</script>
