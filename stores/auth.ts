import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
}

interface CartItem {
  productId: any;
  quantity: number;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    cart: [] as CartItem[],
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        });

        this.user = response.user;
        this.isAuthenticated = true;
        
        // Zapisz w localStorage
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        // Załaduj koszyk
        await this.loadCart();
        
        return response;
      } catch (error) {
        throw error;
      }
    },

    async signup(email: string, password: string, confirmPassword: string) {
      try {
        const response = await $fetch('/api/auth/signup', {
          method: 'POST',
          body: { email, password, confirmPassword },
        });
        return response;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.cart = [];
      
      if (process.client) {
        localStorage.removeItem('user');
      }
    },

    async loadCart() {
      if (!this.user?.id) return;
      
      try {
        const response = await $fetch(`/api/cart/${this.user.id}`);
        this.cart = response.cart?.items || [];
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    },

    async addToCart(productId: string) {
      if (!this.user?.id) {
        throw new Error('User not authenticated');
      }

      try {
        const response = await $fetch('/api/cart/add', {
          method: 'POST',
          body: {
            userId: this.user.id,
            productId,
          },
        });

        this.cart = response.cart?.items || [];
        return response;
      } catch (error) {
        throw error;
      }
    },

    async removeFromCart(productId: string) {
      if (!this.user?.id) {
        throw new Error('User not authenticated');
      }

      try {
        const response = await $fetch('/api/cart/remove', {
          method: 'POST',
          body: {
            userId: this.user.id,
            productId,
          },
        });

        this.cart = response.cart?.items || [];
        return response;
      } catch (error) {
        throw error;
      }
    },

    async createOrder() {
      if (!this.user?.id) {
        throw new Error('User not authenticated');
      }

      try {
        const response = await $fetch('/api/orders/create', {
          method: 'POST',
          body: {
            userId: this.user.id,
          },
        });

        this.cart = [];
        return response;
      } catch (error) {
        throw error;
      }
    },

    // Przywróć sesję z localStorage
    initAuth() {
      if (process.client) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          this.user = JSON.parse(savedUser);
          this.isAuthenticated = true;
          this.loadCart();
        }
      }
    },
  },

  getters: {
    cartItemCount: (state) => state.cart.length,
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => {
        return total + (item.productId?.price || 0) * item.quantity;
      }, 0);
    },
  },
});
