<template>
    <main>
        <div v-if="errorMessage" class="user-message user-message--error">
            {{ errorMessage }}
        </div>
        <form class="login-form" @submit.prevent="handleLogin">
            <div class="form-control">
                <label for="email">E-Mail</label>
                <input :class="{ invalid: errors.email }" type="email" name="email" id="email" v-model="formData.email"
                    required>
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input :class="{ invalid: errors.password }" type="password" name="password" id="password"
                    v-model="formData.password" required>
            </div>
            <button class="btn" type="submit" :disabled="isLoading">
                {{ isLoading ? 'Loading...' : 'Login' }}
            </button>
        </form>
        <div class="centered">
            <NuxtLink to="/auth/reset">Reset Password</NuxtLink>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth';

useHead({
    title: 'Login',
});

const authStore = useAuthStore();

const formData = ref({
    email: '',
    password: '',
});

const errors = ref({
    email: false,
    password: false,
});

const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
    try {
        isLoading.value = true;
        errorMessage.value = '';
        errors.value = { email: false, password: false };

        // Użyj auth store do zalogowania
        await authStore.login(formData.value.email, formData.value.password);

        console.log('Login successful');
        navigateTo('/');
    } catch (error: any) {
        errorMessage.value = error.data?.message || 'Invalid email or password';
        console.error('Login error:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>
