<template>
    <main>
        <h2 class="grid">Witamy w naszej aplikacji "giełda internetowa"</h2>
        <p class="grid">
            <img class="image" src="/img/pk.png" alt="PK">
            <img class="image" src="/img/wm.png" alt="WM PK">
            <img class="image" src="/img/m7.png" alt="M7 WM PK">
        </p>
        <p class="centered">
            Informatyka stosowana, stopień {{ config.studyLevel }}, laboratorium z przedmiotu
            "{{ config.classesName }}".<br>
            Budowa serwera node.js - migracja na Nuxt 4
        </p>
    </main>
</template>

<script setup lang="ts">
useHead({
    title: 'Market - Strona główna',
});

// Wczytaj konfigurację z course.json
const config = {
    studyLevel: 'II (magisterskie)',
    classesName: 'Programowanie back-end',
};
</script>
