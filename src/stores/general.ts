import { defineStore } from "pinia";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const useGeneralStore = defineStore("general", {
  state: () => ({
    isLoading: false,
    cart: [] as CartItem[],
  }),

  getters: {
    cartTotal(): number {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    cartItemCount(): number {
      return this.cart.reduce((count, item) => count + item.quantity, 0);
    },
  },

  actions: {
    addToCart(product: any) {
      const existingItem = this.cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        });
      }
    },

    removeFromCart(productId: number) {
      this.cart = this.cart.filter(item => item.id !== productId);
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.cart.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart() {
      this.cart = [];
    },
  },
});
