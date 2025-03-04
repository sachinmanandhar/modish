<template>
  <div class=""></div>
  {{ hasMorePages }}
  <div class="product-list-container">
    <!-- Hero Section -->
    <div class="hero-section q-pa-xl text-center">
      <h1 class="text-h3 text-weight-bold q-mb-md">
        {{
          CategoryDetail && CategoryDetail.length > 0
            ? CategoryDetail[0].title
            : title
        }}
      </h1>
      <p class="description q-mx-auto">
        {{
          CategoryDetail && CategoryDetail.length > 0
            ? CategoryDetail[0].description
            : description
        }}
      </p>
    </div>

    <!-- Add this right after the hero section for better organization -->
    <div class="section-divider q-my-lg">
      <div class="line"></div>
      <q-icon name="diamond" size="2rem" color="primary" class="q-px-md" />
      <div class="line"></div>
    </div>

    <!-- Filter Section -->
    <div class="q-pa-md">
      <div class="filter-section q-mb-lg">
        <div class="row q-col-gutter-md justify-center">
          <div class="col-12 col-sm-4 col-md-3 col-lg-2">
            <q-select
              v-model="selectedCategory"
              :options="Categories"
              label="Category"
              outlined
              dense
              class="full-width"
              map-options
              emit-value
              @update:model-value="handleCategoryChange"
            />
          </div>
          <div class="col-12 col-sm-4 col-md-3 col-lg-2">
            <q-select
              v-model="sortBy"
              :options="sortOptions"
              label="Sort by"
              outlined
              dense
              class="full-width"
            />
          </div>
          <div class="col-12 col-sm-4 col-md-3 col-lg-2">
            <q-input
              v-model="searchQuery"
              outlined
              dense
              label="Search products"
              class="full-width"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <q-infinite-scroll @load="onLoad" :offset="250">
        <div class="row q-col-gutter-md">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <q-card flat bordered class="product-card">
              <div class="image-container">
                <q-img
                  :src="
                    selectedProduct(product)?.image_medium_url ||
                    selectedProduct(product)?.image
                  "
                  :ratio="1"
                  class="product-image"
                  @click="goToProductDetail(product.id)"
                  loading="lazy"
                  :placeholder-src="placeholderImage"
                >
                  <template v-slot:loading>
                    <div class="image-placeholder" />
                  </template>
                </q-img>
              </div>

              <!-- Add Product images selection -->
              <div class="product-images-list">
                <div
                  v-for="variant in product.products"
                  :key="variant.id"
                  class="product-thumb-container"
                  :class="{
                    selected: selectedProductIds[product.id] === variant.id,
                  }"
                  @click="selectProduct(product.id, variant.id)"
                >
                  <q-img
                    :src="variant.image_thumbnail_url || variant.image"
                    :ratio="1"
                    class="product-thumb"
                    width="50"
                    height="50"
                    loading="lazy"
                    :placeholder-src="placeholderImage"
                  >
                    <template v-slot:loading>
                      <div class="image-placeholder" />
                    </template>
                  </q-img>
                </div>
              </div>

              <q-card-section class="q-pa-sm text-center">
                <div class="product-info">
                  <span
                    class="text-subtitle2 product-title cursor-pointer"
                    @click="goToProductDetail(product.id)"
                  >
                    {{ product.name }}
                  </span>
                  <span class="text-subtitle2">NPR {{ product.price }}</span>
                </div>
                <div class="row q-gutter-sm justify-center q-mt-sm">
                  <q-btn
                    outline
                    color="primary"
                    class="buy-button"
                    label="Buy Now"
                    size="sm"
                    @click="buyNow(product, selectedProduct(product)?.id)"
                  />
                  <q-btn
                    outline
                    color="secondary"
                    class="cart-button"
                    label="Add to Cart"
                    size="sm"
                    @click="addToCart(product, selectedProduct(product)?.id)"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>

    <!-- Order Dialog -->
    <!-- <q-dialog v-model="orderDialog">
      <q-card style="min-width: 300px; width: 100%; max-width: 400px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Place Order</div>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit="submitOrder" class="q-gutter-md">
            <q-input
              v-model="orderForm.name"
              label="Full Name"
              :rules="[(val:any) => !!val || 'Name is required']"
              outlined
            />
            <q-input
              v-model="orderForm.phone"
              label="Phone Number"
              :rules="[(val:any) => !!val || 'Phone number is required']"
              outlined
            />
            <q-input
              v-model="orderForm.address"
              label="Delivery Address"
              type="textarea"
              :rules="[(val:any) => !!val || 'Address is required']"
              outlined
            />
            <q-input
              v-model="orderForm.quantity"
              label="Quantity"
              type="number"
              :rules="[
                (val:any) => val > 0 || 'Quantity must be greater than 0',
                (val:any) => val <= 10 || 'Maximum quantity is 10'
              ]"
              outlined
            />
            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="grey" v-close-popup class="q-mr-sm" />
              <q-btn label="Place Order" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog> -->

    <!-- Image Dialog -->
    <q-dialog
      v-model="imageDialog"
      style="width: 100vw; height: 100vh; overflow: hidden"
    >
      <q-img
        :src="selectedImage"
        style="object-fit: contain; overflow: hidden"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useProductsStore } from "@/stores/products";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useGeneralStore } from "@/stores/general";
import { useRouter } from "vue-router";
const ProductStore = useProductsStore();
const $q = useQuasar();
const $route = useRoute();
const generalStore = useGeneralStore();
const router = useRouter();

// Filter and Sort
const selectedCategory: any = ref(null);
const searchQuery = ref("");
const sortBy = ref("name");
const sortOptions = [
  { label: "Name (A-Z)", value: "name" },
  { label: "Price (Low to High)", value: "price_asc" },
  { label: "Price (High to Low)", value: "price_desc" },
];

//ref
const title = ref("The Modish Era");
const description = ref(
  "Discover an exquisite collection of women's accessories at The Modish Era. From elegant earrings and chic bags to dazzling rings and bracelets, we offer timeless pieces that elevate your style. Perfect for every occasion, our curated items combine quality and affordability, making them ideal for modern fashion enthusiasts in Nepal. Shop now and redefine your wardrobe with The Modish Era!"
);
// Computed Properties
const Categories = computed(() => {
  return [
    { label: "All", value: null },
    ...ProductStore.getCategories.map((category: string) => ({
      label: category,
      value: category,
    })),
  ];
});
const CategoryDetail = computed((): any => {
  return ProductStore.getCategoryDetail;
});
const hasMorePages = computed(() => {
  // let products: any = ProductStore.NextPage;
  if (ProductStore.NextPage) {
    return true;
  }
  return false;
});
const currentPage = computed(() => {
  let products: any = ProductStore.CurrentPage;
  return products;
});
const filteredProducts = computed(() => {
  let products: any = ProductStore.getProducts;

  // Search filter
  if (searchQuery.value) {
    products = products.filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Category filter
  if (selectedCategory.value) {
    products = products.filter(
      (product: any) => product.category === selectedCategory.value
    );
  }

  // Sort products
  if (sortBy.value === "price_asc") {
    return [...products].sort((a: any, b: any) => a.price - b.price);
  } else if (sortBy.value === "price_desc") {
    return [...products].sort((a: any, b: any) => b.price - a.price);
  }

  return products;
});
const onLoad = async (index: any, done: any) => {
  console.log("calling on Load", index, done);
  if (hasMorePages.value) {
    await ProductStore.fetchProducts({ page: index + 1 });
  }
};
// Methods
const handleCategoryChange = async () => {
  await ProductStore.fetchProducts({
    category: selectedCategory.value,
  });
};

// Dialog controls and other functionality
const orderDialog = ref(false);
const imageDialog = ref(false);
const selectedImage = ref("");
const selectedProductId: any = ref(null);

// Form handling
const orderForm = ref({
  name: "",
  phone: "",
  address: "",
  quantity: 1,
});

const submitOrder = async () => {
  try {
    // Your order submission logic here
    // ...

    $q.notify({
      type: "positive",
      message: "Order placed successfully!",
    });

    orderDialog.value = false;
    orderForm.value = {
      name: "",
      phone: "",
      address: "",
      quantity: 1,
    };

    // Navigate using router
    router.push({ name: "product", query: { categoryId: "0" } });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Failed to place order. Please try again.",
    });
  }
};

// Add these method definitions
const showImageDialog = (image: string) => {
  selectedImage.value = image;
  imageDialog.value = true;
};

const showOrderDialog = (productId: number) => {
  selectedProductId.value = productId;
  orderDialog.value = true;
};

const selectedProductIds: any = ref({});

const selectProduct = (itemId: number, productId: number) => {
  selectedProductIds.value[itemId] = productId;
};

const initializeDefaultSelection = (item: any) => {
  if (!selectedProductIds.value[item.id] && item.products.length > 0) {
    selectedProductIds.value[item.id] = item.products[0].id;
  }
};

const selectedProduct = (item: any) => {
  initializeDefaultSelection(item);
  const selectedId = selectedProductIds.value[item.id];
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
      price: item.price,
      quantity: 1,
      image: selectedVariant.image_medium_url || selectedVariant.image,
      parentId: item.id,
    };
    generalStore.addToCart(cartItem);
    $q.notify({
      type: "positive",
      message: "Added to cart successfully!",
    });
  }
};

const buyNow = (item: any, productId: number) => {
  addToCart(item, productId);
  router.push({ name: "checkout" });
};

const goToCheckout = () => {
  router.push({ name: "checkout" });
};

const goToProductDetail = (productId: number) => {
  router.push({
    name: "product-detail",
    params: { productId: productId.toString() },
  });
};

// Add placeholder image constant if not already present
const placeholderImage = ref(
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'
);

onBeforeMount(async () => {
  await ProductStore.fetchCategories();
  const categoryId = $route.query.categoryId as string;
  if (categoryId && categoryId !== "0") {
    await ProductStore.fetchCategoryDetail(categoryId);
    await ProductStore.fetchProducts({
      category: categoryId,
    });

    selectedCategory.value = categoryId;
  } else {
    selectedCategory.value = null;
    await ProductStore.fetchProducts();
    await ProductStore.fetchCategories();
  }

  console.log("categoryId", categoryId);
});
</script>

<style lang="scss" scoped>
.hero-section {
  background: linear-gradient(to right, #f3e7e9, #e3eeff);
  padding: 4rem 2rem !important;
  margin-bottom: 2rem;

  h1 {
    font-family: "Playfair Display", serif;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: #1976d2;
    }
  }

  .description {
    max-width: 800px;
    line-height: 1.8;
    color: #546e7a;
    font-size: 1.1rem;
  }
}

.product-list-container {
  max-width: 1400px;
  margin: 0 auto;
}

.filter-section {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.product-card {
  height: 100%;
  transition: all 0.3s ease;
  max-width: 300px;
  margin: 0 auto;
  background: white;
  border: 1px solid #eee;

  &:hover {
    border-color: transparent;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

    .product-image {
      transform: scale(1.05);
    }
  }

  .image-container {
    position: relative;
    overflow: hidden;

    .product-image {
      transition: transform 0.3s ease;
      height: 300px;
      object-fit: cover;
      cursor: pointer;
    }
  }

  .product-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .product-title {
    flex: 1;
    text-align: left;
    margin-right: 8px;
  }

  .buy-button {
    min-width: 120px;
    text-transform: none;
    font-weight: 400;
  }
}

// Responsive adjustments
@media (max-width: 599px) {
  .hero-section {
    padding: 2rem 1rem !important;

    h1 {
      font-size: 2rem;
    }

    .description {
      font-size: 1rem;
      line-height: 1.6;
    }
  }

  .filter-section {
    padding: 0.75rem;
  }

  .product-card {
    max-width: 100%;

    .image-container {
      .product-image {
        height: 250px;
      }
    }

    .product-title {
      font-size: 0.95rem;
    }

    .product-price {
      font-size: 1rem;
    }
  }
}

.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;

  .line {
    height: 1px;
    background: #ddd;
    flex: 1;
    max-width: 200px;
  }
}

.checkout-fab {
  z-index: 1000;

  .q-btn__content {
    position: relative;
  }
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 50%;
  padding: 4px;
  min-width: 20px;
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

// Media query for mobile devices
@media (max-width: 599px) {
  .checkout-fab {
    transform: scale(0.9); // Slightly smaller on mobile
  }
}

.product-images-list {
  display: flex;
  gap: 8px;
  padding: 10px;
  justify-content: center;
  overflow-x: auto;
}

.product-thumb-container {
  width: 50px;
  height: 50px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.selected {
    border-color: #1976d2;
  }
}

.product-thumb {
  border-radius: 2px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 600px) {
  .product-thumb-container {
    width: 40px;
    height: 40px;
  }
}

// Add placeholder styles if not already present
.image-placeholder {
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
}
</style>
