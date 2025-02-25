<template>
  <!-- ViewedProducts    SoldProducts -->
  <div class="product-slider q-pa-md">
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
      <h4 class="title text-bold">Best Selling</h4>
      <!-- {{ Categories }} -->
    </div>

    <Carousel
      :wrap-around="true"
      :breakpoints="breakpoints"
      :pagination-enabled="true"
      :pagination-padding="4"
      :items-to-show="1"
    >
      <Slide v-for="product in SoldProducts" :key="product.id">
        <q-card class="product-card q-ma-sm">
          <q-img
            :src="product.image"
            :ratio="1"
            class="product-image cursor-pointer"
            @click="goToProductDetail(product.id)"
            width="100%"
            height="300"
            loading="lazy"
          >
            <div v-if="!product.is_in_stock" class="out-of-stock-badge">
              Out of Stock
            </div>
          </q-img>
          <q-card-section>
            <div
              class="text-subtitle2 product-category cursor-pointer"
              @click="goToProductDetail(product.id)"
            >
              #{{ product.id }}
            </div>
            <div
              class="text-h6 product-title cursor-pointer"
              @click="goToProductDetail(product.id)"
            >
              {{ product.name }}
            </div>
            <div class="text-subtitle2 product-category">
              {{ product.category }}
            </div>
            <div class="text-h6 product-price">
              NRS {{ product.price }}
              <q-badge
                v-if="product.is_in_stock"
                color="positive"
                class="q-ml-sm"
              >
                In Stock
              </q-badge>
            </div>
            <div class="row q-gutter-sm justify-center">
              <q-btn
                color="primary"
                class="q-mt-sm"
                label="Add to Cart"
                style="width: 100%"
                @click="addToCart(product)"
                :disable="!product.is_in_stock"
              />
              <!-- <q-btn 
              outline
                color="primary" 
                class="q-mt-sm"
                label="Checkout"
                @click="goToCheckout(product.id)"
              /> -->
            </div>
          </q-card-section>
        </q-card>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination :page-count="5" class="hide-on-mobile" />
      </template>
    </Carousel>

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
  <div class="product-slider q-pa-md">
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
      <h4 class="title text-bold">Most Viewed</h4>
      <!-- {{ Categories }} -->
    </div>

    <Carousel
      :wrap-around="true"
      :breakpoints="breakpoints"
      :pagination-enabled="true"
      :pagination-padding="4"
      :items-to-show="1"
    >
      <Slide v-for="product in ViewedProducts" :key="product.id">
        <q-card class="product-card q-ma-sm">
          <q-img
            :src="product.image"
            :ratio="1"
            class="product-image cursor-pointer"
            @click="goToProductDetail(product.id)"
            width="100%"
            height="300"
            loading="lazy"
          >
            <div v-if="!product.is_in_stock" class="out-of-stock-badge">
              Out of Stock
            </div>
          </q-img>
          <q-card-section>
            <div
              class="text-subtitle2 product-category cursor-pointer"
              @click="goToProductDetail(product.id)"
            >
              #{{ product.id }}
            </div>
            <div
              class="text-h6 product-title cursor-pointer"
              @click="goToProductDetail(product.id)"
            >
              {{ product.name }}
            </div>
            <div class="text-subtitle2 product-category">
              {{ product.category }}
            </div>
            <div class="text-h6 product-price">
              NRS {{ product.price }}
              <q-badge
                v-if="product.is_in_stock"
                color="positive"
                class="q-ml-sm"
              >
                In Stock
              </q-badge>
            </div>
            <div class="row q-gutter-sm justify-center">
              <q-btn
                color="primary"
                class="q-mt-sm"
                label="Add to Cart"
                style="width: 100%"
                @click="addToCart(product)"
                :disable="!product.is_in_stock"
              />
              <!-- <q-btn 
              outline
                color="primary" 
                class="q-mt-sm"
                label="Checkout"
                @click="goToCheckout(product.id)"
              /> -->
            </div>
          </q-card-section>
        </q-card>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination :page-count="5" class="hide-on-mobile" />
      </template>
    </Carousel>

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
import { ref, computed, onBeforeMount, watch } from "vue";
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

const breakpoints = {
  // Mobile
  320: {
    itemsToShow: 1,
    snapAlign: "center",
    itemsToScroll: 1,
  },
  // Tablet
  640: {
    itemsToShow: 2,
    snapAlign: "center",
    itemsToScroll: 2,
  },
  // Small Laptop
  1024: {
    itemsToShow: 4,
    snapAlign: "start",
  },
  // Large Laptop/Desktop
  1440: {
    itemsToShow: 5,
    snapAlign: "start",
  },
  // // Extra Large Screens
  // 1800: {
  //   itemsToShow: 5,
  //   snapAlign: 'start',
  // },
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

const addToCart = (product: any) => {
  generalStore.addToCart(product);
  $q.notify({
    type: "positive",
    message: "Added to cart successfully!",
  });
};

const goToCheckout = (productId: any) => {
  // You can pass product data as route query parameters if needed
  router.push({
    name: "checkout",
    query: { productId: productId },
  });
};

const goToProductDetail = (productId: number) => {
  router.push({
    name: "product-detail",
    params: { productId: productId },
  });
};
</script>

<style lang="scss">
.product-slider {
  padding: 2rem 0;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}
.title {
  font-family: "Playfair Display", serif;
  margin: 0;
  width: 100%;
  text-align: center;
}
.product-card {
  transition: transform 0.3s ease;
  width: 260px;
  margin: 0 auto;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-title {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.product-category {
  color: #666;
  font-size: 0.9rem;
}

.product-price {
  font-weight: bold;
  color: #2c3e50;
  margin: 0.5rem 0;
}

:deep(.carousel__viewport) {
  width: 100%;
  padding: 0 20px;
}

:deep(.carousel__slide) {
  padding: 10px 15px;
  width: 260px !important;
  min-width: 260px;
}

:deep(.carousel__track) {
  gap: 1.5rem;
  padding: 0.5rem 0;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: #1976d2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  margin: 0 -10px;
}

:deep(.carousel__pagination) {
  padding: 0;
  margin-top: 20px;
  flex-wrap: wrap;
  max-width: 100%;
  overflow: hidden;
}

:deep(.carousel__pagination-button) {
  background-color: #ccc;
}

:deep(.carousel__pagination-button--active) {
  background-color: #1976d2;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  position: relative;
}

.category-select {
  width: 200px;
  left: 0;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 8px 0;
}

.tag-chip {
  font-size: 0.8rem;
  padding: 2px 8px;
}

@media (max-width: 599px) {
  .hide-on-mobile {
    display: none !important;
  }
}

.product-image {
  aspect-ratio: 1;
  width: 100%;
  height: auto;
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
}
</style>
