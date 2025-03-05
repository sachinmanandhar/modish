<template>
  <!-- {{ product }} -->
  <div class="product-detail-container" v-if="product">
    <div class="product-grid">
      <!-- Product Image Section -->
      <div class="product-image-container">
        <div class="product-image-detail cursor-pointer">
          <q-img
            :src="
              selectedVariant?.image_medium_url ||
              selectedVariant?.image ||
              product.image
            "
            :alt="product.title"
            @click="
              showImageDialog(
                selectedVariant?.image_medium_url ||
                  selectedVariant?.image ||
                  product.image
              )
            "
            style="max-height: 60vh"
            loading="lazy"
            :placeholder-src="placeholderImage"
          >
            <template v-slot:loading>
              <div class="image-placeholder" />
            </template>
          </q-img>
        </div>

        <!-- Product Variants Selection -->
        <div
          v-if="product.products?.length > 0"
          class="product-variants-list q-mt-md"
        >
          <div
            v-for="variant in product.products"
            :key="variant.id"
            class="variant-thumb-container"
            :class="{ selected: selectedVariantId === variant.id }"
            @click="selectVariant(variant)"
          >
            <q-img
              :src="variant.image_thumbnail_url || variant.image"
              :ratio="1"
              class="variant-thumb"
              loading="lazy"
              :placeholder-src="placeholderImage"
            >
              <template v-slot:loading>
                <div class="image-placeholder" />
              </template>
            </q-img>
          </div>
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
        <div class="price-container">
          <template v-if="product.discount_percentage > 0">
            <span class="original-price"
              >NPR {{ formatPrice(product.price) }}</span
            >
            <span class="final-price"
              >NPR {{ formatPrice(product.final_price) }}</span
            >
            <q-badge color="negative" class="discount-badge text-white">
              {{ product.discount_percentage }}% OFF
            </q-badge>
          </template>
          <template v-else>
            <span class="final-price"
              >NPR {{ formatPrice(product.final_price) }}</span
            >
          </template>
        </div>

        <div class="description">
          <h6>Description</h6>
          <p>{{ product.description }}</p>
        </div>

        <div class="actions q-mb-sm">
          <q-btn color="primary" size="md" @click="buyNow(product)" outline>
            Buy Now
          </q-btn>
          <q-btn
            color="secondary"
            @click="addToCart(product)"
            size="md"
            outline
          >
            Add to Cart
          </q-btn>
        </div>
      </div>
    </div>

    <!-- Image Dialog -->
    <q-dialog
      v-model="imageDialog"
      style="width: 100vw; height: 100vh; overflow: hidden"
    >
      <q-img
        :src="selectedImage"
        style="object-fit: contain; overflow: hidden"
        :placeholder-src="placeholderImage"
      >
        <template v-slot:loading>
          <div class="image-placeholder" />
        </template>
      </q-img>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import ProductsAPI from "@/api/products";
import { useGeneralStore } from "@/stores/general";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const generalStore = useGeneralStore();

// State
const product: any = ref(null);

// Dialog controls
const imageDialog = ref(false);
const selectedImage = ref("");

// Add new refs for variant selection
const selectedVariantId = ref<number | null>(null);
const selectedVariant = computed(() => {
  if (!product.value?.products?.length) return null;
  return product.value.products.find(
    (variant: any) => variant.id === selectedVariantId.value
  );
});

// Add placeholder image
const placeholderImage = ref(
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'
);

// Methods
const formatPrice = (price: number) => {
  return `${price.toFixed(0)}`;
};

const showImageDialog = (image: string) => {
  selectedImage.value = image;
  imageDialog.value = true;
};

const selectVariant = (variant: any) => {
  console.log("Selecting variant:", variant.id); // Debug log
  selectedVariantId.value = variant.id;
  // router.push({ name: "product-detail", params: { productId: variant.id } });
};

const addToCart = (item: any) => {
  const variantToAdd = selectedVariant.value || item.products[0];
  if (variantToAdd) {
    const cartItem = {
      id: variantToAdd.id,
      name: item.name,
      price: item.final_price,
      quantity: 1,
      image: variantToAdd.image_small_url || variantToAdd.image,
      parentId: item.id,
    };
    generalStore.addToCart(cartItem);
    $q.notify({
      type: "positive",
      message: "Added to cart successfully!",
    });
  }
};

const buyNow = (product: any) => {
  addToCart(product);
  router.push({ name: "checkout" });
};

const goToCheckout = () => {
  router.push({ name: "checkout" });
};

// Lifecycle hooks
onBeforeMount(async () => {
  console.log("product", route.params.productId);
  try {
    const productId = route.params.productId;
    const response = await ProductsAPI.retrieveSingleProduct(productId);
    product.value = response;
    // Set initial selected variant
    if (product.value?.products?.length > 0) {
      selectedVariantId.value = product.value.products[0].id;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    $q.notify({
      type: "negative",
      message: "Failed to load product details",
    });
  }
});

// Update selectedVariantImage computed property
const selectedVariantImage = computed(() => {
  if (!selectedVariant.value) return product.value?.image;
  return selectedVariant.value.image_medium_url || selectedVariant.value.image;
});
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

.product-image-detail {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-height: 700px;
}

.product-image-detail img {
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 700px;
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

.price-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;

  .original-price {
    text-decoration: line-through;
    color: #666;
    font-size: 1.5rem;
  }

  .final-price {
    font-size: 2rem;
    font-weight: 600;
    color: #2c5282;
  }

  .discount-badge {
    font-size: 1rem;
    padding: 4px 8px;
  }
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

  .product-image-detail {
    max-height: 500px;
  }

  .product-image img {
    max-height: 500px;
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

.product-variants-list {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  overflow-x: auto;
}

.variant-thumb-container {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &.selected {
    border-color: var(--q-primary);
  }
}

.variant-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .variant-thumb-container {
    width: 60px;
    height: 60px;
  }

  .product-variants-list {
    gap: 0.5rem;
  }
}
</style>
