<template>
    <main>
        <div v-if="pending" class="centered">
            <p>Ładowanie produktu...</p>
        </div>
        <div v-else-if="fetchError" class="centered">
            <p class="user-message user-message--error">{{ fetchError.message }}</p>
        </div>
        <template v-else-if="product">
            <div v-if="errorMessage" class="user-message user-message--error">
                {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="user-message user-message--success">
                {{ successMessage }}
            </div>
            <form class="product-form" @submit.prevent="handleSubmit">
                <div class="form-control">
                    <label for="title">Title</label>
                    <input :class="{ invalid: errors.title }" type="text" name="title" id="title"
                        v-model="formData.title" required>
                </div>
                <div class="form-control">
                    <label for="image">Image</label>
                    <input type="file" name="image" id="image" @change="handleFileChange" accept="image/*">
                    <small>Current: {{ product.imageUrl }}</small>
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
                    {{ isLoading ? 'Updating...' : 'Update Product' }}
                </button>
            </form>
        </template>
    </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../../stores/auth';

const route = useRoute();
const productId = route.params.id as string;

useHead({
    title: 'Edit Product',
});

const authStore = useAuthStore();
const userId = computed(() => authStore.user?.id || '');

const { data: product, pending, error: fetchError } = await useFetch(`/api/products/${productId}`);

const formData = ref({
    title: product.value?.title || '',
    price: product.value?.price || 0,
    description: product.value?.description || '',
    imageUrl: product.value?.imageUrl || '',
});

// Aktualizuj formData gdy produkt się załaduje
watch(product, (newProduct) => {
    if (newProduct) {
        formData.value = {
            title: newProduct.title,
            price: newProduct.price,
            description: newProduct.description,
            imageUrl: newProduct.imageUrl,
        };
    }
});

const errors = ref({
    title: false,
    price: false,
    description: false,
});

const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        // TODO: Implementować upload pliku
        console.log('File selected:', file.name);
        formData.value.imageUrl = `images/${file.name}`;
    }
};

const handleSubmit = async () => {
    try {
        isLoading.value = true;
        errorMessage.value = '';
        successMessage.value = '';
        errors.value = { title: false, price: false, description: false };

        await $fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: {
                ...formData.value,
                userId: userId.value,
            },
        });

        successMessage.value = 'Product updated successfully!';

        setTimeout(() => {
            navigateTo('/admin/products');
        }, 1500);
    } catch (error: any) {
        errorMessage.value = error.data?.message || 'Error updating product';
        console.error('Update product error:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>
