<template>
  <!-- {{ product }} -->
  <div class="product-detail-container" v-if="product">
    <div class="product-grid">
      <!-- Product Image Section -->
      <div class="product-image-container">
        <div class="product-image cursor-pointer">
          <q-img :src="product.image" :alt="product.title" @click="showImageDialog(product.image)" style="max-height: 80vh;" />
        </div>
      </div>

      <!-- Product Info Section -->
      <div class="product-info">
        <div class="tags">
          <span v-for="tag in product.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>

        <div class="category" v-if="product.category">
          <span class="category-label">Category:</span>
          <span class="category-value">{{ product.category }}</span>
        </div>

        <h1 class="product-title">{{ product.name }}</h1>
        <p class="price">NPR {{ formatPrice(product.price) }}</p>
        
        <div class="description">
          <h6>Description</h6>
          <p>{{ product.description }}</p>
        </div>

        <div class="actions q-mb-sm">
          <q-btn  color="primary" size="md" @click="buyNow(product)" outline>
            Buy Now
          </q-btn>
          <q-btn color="secondary" @click="addToCart(product)" size="md" outline>
            Add to Cart
          </q-btn>

        </div>
      </div>
    </div>

    <!-- Image Dialog -->
    <q-dialog v-model="imageDialog" style="width: 100vw; height: 100vh;overflow: hidden;">
      <q-img 
        :src="selectedImage" 
        style="object-fit: contain;overflow: hidden;" 
      />
    </q-dialog>

    <!-- Floating Checkout Button -->
    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn
        fab
        color="primary"
        icon="shopping_cart"
        class="checkout-fab"
        @click="goToCheckout"
      >
        <q-tooltip>Go to Checkout</q-tooltip>
        <q-badge
          v-if="generalStore.cartItemCount > 0"
          color="red"
          floating
          class="cart-badge"
        >
          {{ generalStore.cartItemCount }}
        </q-badge>
      </q-btn>
    </q-page-sticky>
    <q-dialog v-model="imageDialog" style="width: 100vw; height: 100vh;overflow: hidden;">
      <q-img 
        :src="selectedImage" 
        style="object-fit: contain;;overflow: hidden;" 
      />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import ProductsAPI from '@/api/products'
import { useGeneralStore } from '@/stores/general'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const generalStore = useGeneralStore()

// State
const product :any= ref(null)

// Dialog controls
const imageDialog = ref(false)
const selectedImage = ref('')

// Methods
const formatPrice = (price: number) => {
  return `${price.toFixed(0)}`
}

const showImageDialog = (image: string) => {
  selectedImage.value = image
  imageDialog.value = true
}

const addToCart = (product: any) => {
  generalStore.addToCart(product)
  $q.notify({
    type: 'positive',
    message: 'Added to cart successfully!'
  })
}

const buyNow = (product: any) => {
  addToCart(product)
  router.push({ name: 'checkout' })
}

const goToCheckout = () => {
  router.push({ name: 'checkout' })
}

// Lifecycle hooks
onBeforeMount(async () => {
  console.log("product",route.params.productId)
  try {
    const productId = route.params.productId
    const response = await ProductsAPI.retrieveSingleProduct(productId)
    product.value = response
  } catch (error) {
    console.error('Error fetching product:', error)
    $q.notify({
      type: 'negative',
      message: 'Failed to load product details'
    })
  }
})
</script>

<style lang="scss" scoped>
.product-detail-container {
  max-width: 1400px;
  margin: 3rem auto;
  padding: 0 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.product-image-container {
  position: sticky;
  top: 2rem;
}

.product-image {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.product-image img {
  width: 100%;
  max-height: 80vh;
  height: auto;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.2;
}

.tags {
  display: flex;
  gap: 0.75rem;
}

.tag {
  background-color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #666;
}

.price {
  font-size: 2rem;
  font-weight: 600;
  color: #2c5282;
  margin: 0;
}

.description {
  color: #666;
  line-height: 1.6;
}

.description h2 {
  color: #333;
  margin-bottom: 0.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart {
  background-color: #fff;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.add-to-cart:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.buy-now {
  background-color: #2c5282;
  color: #fff;
}

.buy-now:hover {
  background-color: #1a365d;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  
  .product-image-container {
    position: static;
  }
  
  .product-title {
    font-size: 2rem;
  }
  
  .price {
    font-size: 1.5rem;
  }
}

/* :root {
  --primary-color: #2c5282;
  --primary-dark: #1a365d;
} */

.category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.category-label {
  font-weight: 600;
}

.category-value {
  color: #2c5282;
}
</style>
