<template>
    <main>
        <div v-if="errorMessage" class="user-message user-message--error">
            {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="user-message user-message--success">
            {{ successMessage }}
        </div>
        <form class="product-form" @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <div class="form-control">
                <label for="title">Title</label>
                <input :class="{ invalid: errors.title }" type="text" name="title" id="title" v-model="formData.title"
                    required>
            </div>
            <div class="form-control">
                <label for="image">Image</label>
                <select v-model="formData.imageUrl" name="image" id="image" required>
                    <option value="img/pk.png">PK Logo</option>
                    <option value="img/wm.png">WM Logo</option>
                    <option value="img/m7.png">M7 Logo</option>
                    <option value="img/notready.jpg">Not Ready</option>
                </select>
            </div>
            <div class="form-control">
                <label for="price">Price</label>
                <input :class="{ invalid: errors.price }" type="number" name="price" id="price" step="0.01"
                    v-model.number="formData.price" required>
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea :class="{ invalid: errors.description }" name="description" id="description" rows="5"
                    v-model="formData.description" required></textarea>
            </div>
            <button class="btn" type="submit" :disabled="isLoading">
                {{ isLoading ? 'Saving...' : 'Add Product' }}
            </button>
        </form>
    </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth';

useHead({
    title: 'Add Product',
});

const authStore = useAuthStore();
const userId = computed(() => authStore.user?.id || '');

const formData = ref({
    title: '',
    price: 0,
    description: '',
    imageUrl: 'img/pk.png', // Placeholder - istnieje w public/img
});

const errors = ref({
    title: false,
    price: false,
    description: false,
});

const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
    try {
        isLoading.value = true;
        errorMessage.value = '';
        successMessage.value = '';
        errors.value = { title: false, price: false, description: false };

        const response = await $fetch('/api/products', {
            method: 'POST',
            body: {
                ...formData.value,
                userId: userId.value,
            },
        });

        successMessage.value = 'Product added successfully!';

        // Reset form
        formData.value = {
            title: '',
            price: 0,
            description: '',
            imageUrl: 'img/pk.png',
        };

        setTimeout(() => {
            navigateTo('/admin/products');
        }, 1500);
    } catch (error: any) {
        errorMessage.value = error.data?.message || 'Error adding product';
        console.error('Add product error:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>
