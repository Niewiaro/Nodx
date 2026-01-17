<template>
    <main>
        <div v-if="errorMessage" class="user-message user-message--error">
            {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="user-message user-message--success">
            {{ successMessage }}
        </div>
        <form class="login-form" @submit.prevent="handleReset">
            <div class="form-control">
                <label for="email">E-Mail</label>
                <input type="email" name="email" id="email" v-model="email" required>
            </div>
            <button class="btn" type="submit" :disabled="isLoading">
                {{ isLoading ? 'Sending...' : 'Reset Password' }}
            </button>
        </form>
    </main>
</template>

<script setup lang="ts">
useHead({
    title: 'Reset Password',
});

const email = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const handleReset = async () => {
    try {
        isLoading.value = true;
        errorMessage.value = '';
        successMessage.value = '';

        const response = await $fetch('/api/auth/reset', {
            method: 'POST',
            body: { email: email.value },
        });

        successMessage.value = 'Password reset link has been sent to your email!';
        email.value = '';
    } catch (error: any) {
        errorMessage.value = error.data?.message || 'Error sending reset link';
        console.error('Reset error:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>
