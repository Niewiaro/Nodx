<template>
    <main>
        <div v-if="errorMessage" class="user-message user-message--error">
            {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="user-message user-message--success">
            {{ successMessage }}
        </div>
        <form class="login-form" @submit.prevent="handleSignup">
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
            <div class="form-control">
                <label for="confirmPassword">Confirm Password</label>
                <input :class="{ invalid: errors.confirmPassword }" type="password" name="confirmPassword"
                    id="confirmPassword" v-model="formData.confirmPassword" required>
            </div>
            <button class="btn" type="submit" :disabled="isLoading">
                {{ isLoading ? 'Loading...' : 'Signup' }}
            </button>
        </form>
    </main>
</template>

<script setup lang="ts">
useHead({
    title: 'Signup',
});

const formData = ref({
    email: '',
    password: '',
    confirmPassword: '',
});

const errors = ref({
    email: false,
    password: false,
    confirmPassword: false,
});

const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const handleSignup = async () => {
    try {
        isLoading.value = true;
        errorMessage.value = '';
        successMessage.value = '';
        errors.value = { email: false, password: false, confirmPassword: false };

        if (formData.value.password !== formData.value.confirmPassword) {
            errorMessage.value = 'Passwords do not match';
            errors.value.confirmPassword = true;
            return;
        }

        const response = await $fetch('/api/auth/signup', {
            method: 'POST',
            body: formData.value,
        });

        successMessage.value = 'Account created successfully! Redirecting to login...';
        setTimeout(() => {
            navigateTo('/auth/login');
        }, 2000);
    } catch (error: any) {
        errorMessage.value = error.data?.message || 'Error creating account';
        console.error('Signup error:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>
