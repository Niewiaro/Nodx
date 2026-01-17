<template>
    <main class="centered">
        <h1>404 - Page Not Found!</h1>
        <p>The page you are looking for does not exist.</p>
        <NuxtLink to="/" class="btn">Go to Home</NuxtLink>
    </main>
</template>

<script setup lang="ts">
useHead({
    title: '404 - Page Not Found',
});
</script>
