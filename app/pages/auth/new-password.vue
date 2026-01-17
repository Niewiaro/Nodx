<template>
    <main>
        <div v-if="errorMessage" class="user-message user-message--error">
            {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="user-message user-message--success">
            {{ successMessage }}
        </div>
        <form class="login-form" @submit.prevent="handleNewPassword">
            <div class="form-control">
                <label for="password">New Password</label>
                <input type="password" name="password" id="password" v-model="formData.password" required>
            </div>
            <div class="form-control">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" v-model="formData.confirmPassword"
                    required>
            </div>
            <button class="btn" type="submit" :disabled="isLoading">
                {{ isLoading ? 'Updating...' : 'Update Password' }}
            </button>
        </form>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();
const token = route.query.token as string;

useHead({
    title: 'New Password',
});

const formData = ref({
    password: '',
    confirmPassword: '',
});

const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const handleNewPassword = async () => {
    try {
        isLoading.value = true;
        errorMessage.value = '';
        successMessage.value = '';

        if (formData.value.password !== formData.value.confirmPassword) {
            errorMessage.value = 'Passwords do not match';
            return;
        }

        if (!token) {
            errorMessage.value = 'Invalid or missing token';
            return;
        }

        const response = await $fetch('/api/auth/new-password', {
            method: 'POST',
            body: {
                token,
                password: formData.value.password,
            },
        });

        successMessage.value = 'Password updated successfully! Redirecting to login...';
        setTimeout(() => {
            navigateTo('/auth/login');
        }, 2000);
    } catch (error: any) {
        errorMessage.value = error.data?.message || 'Error updating password';
        console.error('New password error:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>
