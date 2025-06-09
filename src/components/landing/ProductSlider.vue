<template>
  <!-- ViewedProducts    SoldProducts -->
  <div class="product-grid q-pa-md">
    <!-- Latest Arrivals Section -->
    <div class="section-container">
      <div class="header-container">
        <!-- <q-select
          v-model="selectedCategory"
          :options="Categories"
          label="Category"
          @update:model-value="handleCategoryChange"
          outlined
          dense
          class="category-select"
          map-options
          emit-value
        /> -->
        <div class="title-wrapper">
          <h4 class="title text-bold">Latest Arrivals</h4>
          <p class="subtitle">
            Discover our newest collection of exquisite pieces, crafted with
            precision and passion
          </p>
        </div>
      </div>
      <div class="products-grid">
        <div v-if="NewProducts.length === 0" class="products-grid">
          <q-card v-for="i in 6" :key="i" class="product-card">
            <div class="image-container">
              <q-skeleton type="rect" class="product-image" height="300px" />
            </div>
          </q-card>
        </div>
        <q-card
          v-else
          v-for="(item, index) in NewProducts.slice(0, 6)"
          :key="item.id"
          class="product-card"
          @click="goToProductDetail(item.id, item.name)"
        >
          <div class="image-container">
            <q-img
              :src="
                selectedProduct(item)?.image_medium_url ||
                selectedProduct(item)?.image
              "
              :alt="item.name"
              :title="item.name"
              :ratio="1"
              class="product-image"
              :placeholder-src="placeholderImage"
            >
              <template v-slot:loading>
                <div class="image-placeholder" />
              </template>
              <div v-if="!item.is_in_stock" class="out-of-stock-badge">
                Out of Stock
              </div>
            </q-img>
          </div>

          <div class="product-overlay">
            <div class="product-info">
              <div class="text-subtitle2 product-category">
                #{{ selectedProduct(item)?.id }}
              </div>
              <div class="text-h6 product-title">
                {{ item.name }}
              </div>
              <div class="text-subtitle2 product-category">
                {{ item.category }}
              </div>
              <div class="product-price">
                <div class="price-container">
                  <template v-if="item.discount_percentage > 0">
                    <span class="original-price">NRS {{ item.price }}</span>
                    <span class="final-price">NRS {{ item.final_price }}</span>
                    <q-badge color="negative" class="discount-badge text-white">
                      {{ item.discount_percentage }}% OFF
                    </q-badge>
                  </template>
                  <template v-else>
                    <span class="final-price">NRS {{ item.final_price }}</span>
                  </template>
                </div>
                <div>
                  <q-badge
                    v-if="item.is_in_stock"
                    color="positive"
                    class="q-ml-sm"
                  >
                    In Stock
                  </q-badge>
                </div>
              </div>
              <div class="product-actions">
                <q-btn
                  color="primary"
                  class="q-mt-sm"
                  label="Add to Cart"
                  style="width: 100%"
                  @click.stop="addToCart(item, selectedProduct(item)?.id)"
                  :disable="!item.is_in_stock"
                />
              </div>
            </div>
          </div>

          <div class="product-images-list" @click.stop>
            <div
              v-for="product in item.products"
              :key="product.id"
              class="product-thumb-container"
              :class="{ selected: selectedProductIds[item.id] === product.id }"
              @click="selectProduct(item.id, product.id)"
            >
              <q-img
                :src="product.image_thumbnail_url || product.image"
                :alt="`${item.name} - Variant ${product.id}`"
                :title="`${item.name} - Variant ${product.id}`"
                :ratio="1"
                class="product-thumb"
                loading="lazy"
                :placeholder-src="placeholderImage"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Trending Now Section -->
    <div class="section-container q-mt-xl">
      <div class="header-container">
        <!-- <q-select
          v-model="selectedCategory"
          :options="Categories"
          label="Category"
          @update:model-value="handleCategoryChange"
          outlined
          dense
          class="category-select"
          map-options
          emit-value
        /> -->
        <div class="title-wrapper">
          <h4 class="title text-bold">Trending Now</h4>
          <p class="subtitle">
            Explore our most admired designs, capturing the essence of
            contemporary elegance
          </p>
        </div>
        <!-- {{ Categories }} -->
      </div>

      <div class="products-grid">
        <div v-if="ViewedProducts.length === 0" class="products-grid">
          <q-card v-for="i in 6" :key="i" class="product-card">
            <div class="image-container">
              <q-skeleton type="rect" class="product-image" height="300px" />
            </div>
          </q-card>
        </div>
        <q-card
          v-else
          v-for="(item, index) in ViewedProducts.slice(0, 6)"
          :key="item.id"
          class="product-card"
          @click="goToProductDetail(item.id, item.name)"
        >
          <div class="image-container">
            <q-img
              :src="
                selectedProduct(item)?.image_medium_url ||
                selectedProduct(item)?.image
              "
              :alt="item.name"
              :title="item.name"
              :ratio="1"
              class="product-image"
              :placeholder-src="placeholderImage"
            >
              <template v-slot:loading>
                <div class="image-placeholder" />
              </template>
              <div v-if="!item.is_in_stock" class="out-of-stock-badge">
                Out of Stock
              </div>
            </q-img>
          </div>

          <div class="product-overlay">
            <div class="product-info">
              <div class="text-subtitle2 product-category">#{{ item.id }}</div>
              <div class="text-h6 product-title">
                {{ item.name }}
              </div>
              <div class="text-subtitle2 product-category">
                {{ item.category }}
              </div>
              <div class="product-price">
                <div class="price-container">
                  <template v-if="item.discount_percentage > 0">
                    <span class="original-price">NRS {{ item.price }}</span>
                    <span class="final-price">NRS {{ item.final_price }}</span>
                    <q-badge color="negative" class="discount-badge text-white">
                      {{ item.discount_percentage }}% OFF
                    </q-badge>
                  </template>
                  <template v-else>
                    <span class="final-price">NRS {{ item.final_price }}</span>
                  </template>
                </div>
                <div>
                  <q-badge
                    v-if="item.is_in_stock"
                    color="positive"
                    class="q-ml-sm"
                  >
                    In Stock
                  </q-badge>
                </div>
              </div>
              <div class="product-actions">
                <q-btn
                  color="primary"
                  class="q-mt-sm"
                  label="Add to Cart"
                  style="width: 100%"
                  @click.stop="addToCart(item, selectedProduct(item)?.id)"
                  :disable="!item.is_in_stock"
                />
              </div>
            </div>
          </div>

          <div class="product-images-list" @click.stop>
            <div
              v-for="product in item.products"
              :key="product.id"
              class="product-thumb-container"
              :class="{ selected: selectedProductIds[item.id] === product.id }"
              @click="selectProduct(item.id, product.id)"
            >
              <q-img
                :src="product.image_thumbnail_url || product.image"
                :alt="`${item.name} - Variant ${product.id}`"
                :title="`${item.name} - Variant ${product.id}`"
                :ratio="1"
                class="product-thumb"
                loading="lazy"
                :placeholder-src="placeholderImage"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Top Sellers Section -->
    <div class="section-container q-mt-xl">
      <div class="header-container">
        <!-- <q-select
          v-model="selectedCategory"
          :options="Categories"
          label="Category"
          @update:model-value="handleCategoryChange"
          outlined
          dense
          class="category-select"
          map-options
          emit-value
        /> -->
        <div class="title-wrapper">
          <h4 class="title text-bold">Top Sellers</h4>
          <p class="subtitle">
            Our most cherished pieces, loved by discerning customers worldwide
          </p>
        </div>
        <!-- {{ Categories }} -->
      </div>

      <div class="products-grid">
        <div v-if="SoldProducts.length === 0" class="products-grid">
          <q-card v-for="i in 6" :key="i" class="product-card">
            <div class="image-container">
              <q-skeleton type="rect" class="product-image" height="300px" />
            </div>
          </q-card>
        </div>
        <q-card
          v-else
          v-for="(item, index) in SoldProducts.slice(0, 6)"
          :key="item.id"
          class="product-card"
          @click="goToProductDetail(item.id, item.name)"
        >
          <div class="image-container">
            <q-img
              :src="
                selectedProduct(item)?.image_medium_url ||
                selectedProduct(item)?.image
              "
              :alt="item.name"
              :title="item.name"
              :ratio="1"
              class="product-image"
              :placeholder-src="placeholderImage"
            >
              <template v-slot:loading>
                <div class="image-placeholder" />
              </template>
              <div v-if="!item.is_in_stock" class="out-of-stock-badge">
                Out of Stock
              </div>
            </q-img>
          </div>

          <div class="product-overlay">
            <div class="product-info">
              <div class="text-subtitle2 product-category">#{{ item.id }}</div>
              <div class="text-h6 product-title">
                {{ item.name }}
              </div>
              <div class="text-subtitle2 product-category">
                {{ item.category }}
              </div>
              <div class="product-price">
                <div class="price-container">
                  <template v-if="item.discount_percentage > 0">
                    <span class="original-price">NRS {{ item.price }}</span>
                    <span class="final-price">NRS {{ item.final_price }}</span>
                    <q-badge color="negative" class="discount-badge text-white">
                      {{ item.discount_percentage }}% OFF
                    </q-badge>
                  </template>
                  <template v-else>
                    <span class="final-price">NRS {{ item.final_price }}</span>
                  </template>
                </div>
                <div>
                  <q-badge
                    v-if="item.is_in_stock"
                    color="positive"
                    class="q-ml-sm"
                  >
                    In Stock
                  </q-badge>
                </div>
              </div>
              <div class="product-actions">
                <q-btn
                  color="primary"
                  class="q-mt-sm"
                  label="Add to Cart"
                  style="width: 100%"
                  @click.stop="addToCart(item, selectedProduct(item)?.id)"
                  :disable="!item.is_in_stock"
                />
              </div>
            </div>
          </div>

          <div class="product-images-list" @click.stop>
            <div
              v-for="product in item.products"
              :key="product.id"
              class="product-thumb-container"
              :class="{ selected: selectedProductIds[item.id] === product.id }"
              @click="selectProduct(item.id, product.id)"
            >
              <q-img
                :src="product.image_thumbnail_url || product.image"
                :alt="`${item.name} - Variant ${product.id}`"
                :title="`${item.name} - Variant ${product.id}`"
                :ratio="1"
                class="product-thumb"
                loading="lazy"
                :placeholder-src="placeholderImage"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="orderDialog">
      <q-card style="min-width: 400px; border-radius: 12px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            <q-icon name="shopping_cart" size="sm" class="q-mr-sm" />
            Place Order
          </div>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit="submitOrder" class="q-gutter-md">
            <q-input
              v-model="orderForm.name"
              label="Full Name"
              filled
              :rules="[(val:any) => !!val || 'Name is required']"
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              v-model="orderForm.phone_number"
              label="Phone Number"
              filled
              :rules="[
                (val:any) => !!val || 'Phone number is required',
                (val:any) => /^\d{10}$/.test(val) || 'Invalid phone number'
              ]"
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>

            <q-input
              v-model="orderForm.address"
              label="Delivery Address"
              filled
              type="textarea"
              :rules="[(val:any) => !!val || 'Address is required']"
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="location_on" />
              </template>
            </q-input>

            <q-input
              v-model="orderForm.quantity"
              type="number"
              label="Quantity"
              filled
              :rules="[
                (val:any) => val > 0 || 'Quantity must be greater than 0'
              ]"
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="shopping_bag" />
              </template>
            </q-input>

            <div class="row justify-end q-mt-lg">
              <q-btn
                label="Cancel"
                color="grey-7"
                v-close-popup
                class="q-mr-sm"
                flat
              />
              <q-btn
                label="Place Order"
                type="submit"
                color="primary"
                icon="check"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="imageDialog"
      style="width: 100vw; height: 100vh; overflow: hidden"
    >
      <q-img
        :src="selectedImage"
        style="object-fit: contain; overflow: hidden"
      />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, watch, onMounted } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useProductsStore } from "@/stores/products";
import ProductsAPI from "@/api/products";
import { useQuasar } from "quasar";
import { useGeneralStore } from "@/stores/general";
import { useRouter } from "vue-router";
const ProductStore = useProductsStore();
const generalStore = useGeneralStore();
const router = useRouter();

const selectedCategory = ref(null);
// const categoryOptions = ref(['all', 'electronics', 'clothing', 'accessories']);

const ViewedProducts = computed((): any => {
  const data = ProductStore.getTopProducts;
  if (data && data.most_viewed) {
    return data.most_viewed;
  }
  return [];
});
const SoldProducts = computed((): any => {
  const data = ProductStore.getTopProducts;
  if (data && data.most_sold) {
    return data.most_sold;
  }
  return [];
});
const NewProducts = computed((): any => {
  const data = ProductStore.getTopProducts;
  if (data && data.most_recent) {
    return data.most_recent;
  }
  return [];
});
const Categories = computed((): any => {
  const data = [{ label: "All", value: null }, ...ProductStore.getCategories];
  return data;
});
const SelectedCategory = computed((): any => {
  return ProductStore.getSelectedCategory;
});

const handleCategoryChange = async () => {
  console.log("selected category", selectedCategory.value);
  await ProductStore.fetchProducts(selectedCategory.value);
};

// Add this constant for the placeholder image
const placeholderImage = ref(
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'
);

// Modify breakpoints to reduce initial items shown
const breakpoints = {
  320: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  640: {
    itemsToShow: 2,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 3, // Reduced from 4
    snapAlign: "start",
  },
  1440: {
    itemsToShow: 4, // Reduced from 5
    snapAlign: "start",
  },
};

onBeforeMount(async () => {
  await ProductStore.fetchTopProduct();
  await ProductStore.fetchCategories();
});

const $q = useQuasar();
const orderDialog = ref(false);
const orderForm = ref({
  quantity: 1,
  phone_number: "",
  name: "",
  address: "",
});
const selectedProductId: any = ref(null);

const showOrderDialog = (productId: number) => {
  selectedProductId.value = productId;
  orderDialog.value = true;
};

const submitOrder = async () => {
  try {
    const orderData = {
      product: selectedProductId.value,
      ...orderForm.value,
    };

    await ProductsAPI.postOrders(orderData);

    orderDialog.value = false;
    orderForm.value = {
      quantity: 1,
      phone_number: "",
      name: "",
      address: "",
    };

    $q.notify({
      type: "positive",
      message: "Your order has been placed, we will get back to you shortly",
    });

    router.push({ name: "product", params: { categoryId: "0" } });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Failed to place order. Please try again.",
    });
  }
};

const imageDialog = ref(false);
const selectedImage = ref("");

const showImageDialog = (imageUrl: string) => {
  selectedImage.value = imageUrl;
  imageDialog.value = true;
};

watch(SelectedCategory, async (newValue) => {
  selectedCategory.value = newValue;
  await ProductStore.fetchProducts(selectedCategory.value);
});

const selectedProductIds: any = ref({});

const selectProduct = (itemId: number, productId: number) => {
  selectedProductIds.value[itemId] = productId;
};

// Add this new function to initialize default selection
const initializeDefaultSelection = (item: any) => {
  if (!selectedProductIds.value[item.id] && item.products.length > 0) {
    selectedProductIds.value[item.id] = item.products[0].id;
  }
};

const selectedProduct = (item: any) => {
  // Initialize default selection when accessing product
  initializeDefaultSelection(item);
  const selectedId = selectedProductIds.value[item.id];

  // Handle case where products array is empty
  if (!item.products || item.products.length === 0) {
    return null;
  }

  return (
    item.products.find((p: any) => p.id === selectedId) || item.products[0]
  );
};

const addToCart = (item: any, productId: number) => {
  const selectedVariant = item.products.find((p: any) => p.id === productId);
  if (selectedVariant) {
    const cartItem = {
      id: selectedVariant.id,
      name: item.name,
      price: item.final_price,
      quantity: 1,
      image: selectedVariant.image_small_url || selectedVariant.image, // Use optimized image
      parentId: item.id,
    };
    generalStore.addToCart(cartItem);
    $q.notify({
      type: "positive",
      message: "Added to cart successfully!",
    });
  }
};

const goToCheckout = (productId: any) => {
  router.push({
    name: "checkout",
    query: { productId: productId },
  });
};

const goToProductDetail = (productId: number, productName: string) => {
  const formattedName = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens

  router.push({
    name: "product-detail",
    params: { productId: productId, productName: formattedName },
  });
};

// Add preloading for the first visible image
onMounted(() => {
  if (NewProducts.value.length > 0) {
    const firstProduct = NewProducts.value[0];
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href =
      firstProduct.products[0]?.image_medium_url ||
      firstProduct.products[0]?.image;
    document.head.appendChild(link);
  }
});

// Add intersection observer to load images only when needed
const setupImageObserver = () => {
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          imageObserver.unobserve(img);
        }
      });
    },
    { rootMargin: "50px" }
  );

  return imageObserver;
};
</script>

<style lang="scss">
.product-grid {
  padding: 2rem 0;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
}

.section-container {
  margin-bottom: 2rem;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.title-wrapper {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-family: "Playfair Display", serif;
  margin: 0;
  font-size: 2rem;
  color: #2c3e50;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background-color: #1976d2;
  }
}

.subtitle {
  font-family: "Playfair Display", serif;
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
  letter-spacing: 0.3px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 0 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.product-card {
  transition: all 0.3s ease;
  background: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.image-container {
  position: relative;
  background-color: #f8f8f8;
  overflow: hidden;
  aspect-ratio: 1;
  width: 100%;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  padding: 2rem;
  pointer-events: none;
}

.product-card:hover .product-overlay,
.product-card:active .product-overlay {
  opacity: 1;
  pointer-events: auto;
}

.product-info {
  text-align: center;
  width: 100%;
  max-width: 80%;
}

.product-title {
  font-size: 1.2rem;
  line-height: 1.4;
  margin: 0.5rem 0;
  font-family: "Playfair Display", serif;
  color: #2c3e50;
}

.product-category {
  color: #666;
  font-size: 0.85rem;
  margin: 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-price {
  margin-top: 1rem;
}

.price-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.original-price {
  text-decoration: line-through;
  color: #666;
  font-size: 0.9rem;
}

.final-price {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.2rem;
  font-family: "Playfair Display", serif;
}

.discount-badge {
  background-color: #ffd700;
  color: #2c3e50;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.product-images-list {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 8px;
  padding: 12px;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border-top: 1px solid #eee;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
  pointer-events: none;
}

.product-card:hover .product-images-list,
.product-card:active .product-images-list {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.product-thumb-container {
  width: 45px;
  height: 45px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.product-thumb-container:hover {
  transform: scale(1.1);
}

.product-thumb-container.selected {
  border-color: #1976d2;
}

.product-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.out-of-stock-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  z-index: 1;
}

.product-actions {
  margin-top: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.product-card:hover .product-actions,
.product-card:active .product-actions {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0 1rem;
  }
}

@media (max-width: 600px) {
  .products-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 1rem;
    padding: 0.5rem 1rem;
    margin: 0 -1rem;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }

  .product-card {
    flex: 0 0 85%;
    scroll-snap-align: start;
    margin-right: 1rem;
    aspect-ratio: 1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .section-container {
    margin-bottom: 2.5rem;
  }

  .header-container {
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }

  .title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 0.9rem;
    line-height: 1.4;
    color: #666;
    margin-bottom: 1rem;
  }

  .product-info {
    max-width: 90%;
  }

  .product-overlay {
    opacity: 1;
    pointer-events: auto;
    background: rgba(255, 255, 255, 0.98);
    padding: 1.5rem;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .product-card:active .product-overlay {
    transform: translateY(0);
  }

  .product-actions {
    opacity: 1;
    transform: translateY(0);
  }

  .product-images-list {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    background: rgba(255, 255, 255, 0.98);
  }

  .product-thumb-container {
    width: 40px;
    height: 40px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .product-thumb-container:active {
    transform: scale(0.95);
  }

  .product-image {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
}
</style>
