<template>
    <section class="pagination">
        <NuxtLink v-if="currentPage !== 1 && currentPage > 2" :to="`${baseUrl}?page=1`">
            1
        </NuxtLink>
        <NuxtLink v-if="hasPreviousPage" :to="`${baseUrl}?page=${currentPage - 1}`">
            {{ currentPage - 1 }}
        </NuxtLink>
        <NuxtLink :to="`${baseUrl}?page=${currentPage}`" class="active">
            {{ currentPage }}
        </NuxtLink>
        <NuxtLink v-if="hasNextPage" :to="`${baseUrl}?page=${currentPage + 1}`">
            {{ currentPage + 1 }}
        </NuxtLink>
        <NuxtLink v-if="totalPages !== currentPage && currentPage + 1 < totalPages"
            :to="`${baseUrl}?page=${totalPages}`">
            {{ totalPages }}
        </NuxtLink>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    baseUrl: string;
}>();
</script>
