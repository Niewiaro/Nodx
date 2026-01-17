<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Załaduj wszystkie style CSS z Express
useHead({
  link: [
    { rel: 'stylesheet', href: '/css/main.css' },
    { rel: 'stylesheet', href: '/css/product.css' },
    { rel: 'stylesheet', href: '/css/forms.css' },
    { rel: 'stylesheet', href: '/css/auth.css' },
    { rel: 'stylesheet', href: '/css/cart.css' },
    { rel: 'stylesheet', href: '/css/orders.css' },
  ],
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ],
});
</script>
