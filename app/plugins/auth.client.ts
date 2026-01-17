import { useAuthStore } from '../stores/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
  // Odłóż inicjalizację aż do momentu, gdy Pinia będzie gotowe
  await nuxtApp.hook('app:mounted', () => {
    const authStore = useAuthStore();
    // Przywróć stan autoryzacji z localStorage
    authStore.initAuth();
  });
});
