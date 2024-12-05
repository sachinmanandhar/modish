<template>
  <div class="product-slider q-pa-md">
    <div class="header-container">
      <q-select
        v-model="selectedCategory"
        :options="Categories"
        label="Category"
        @update:model-value="handleCategoryChange"
        outlined
        dense
        class="category-select"
        map-options
        emit-value
      />
      <h4 class="title text-bold">Featured Products</h4>
      <!-- {{ Categories }} -->
    </div>
  <Carousel :wrap-around="true" :autoplay="3000" :breakpoints="breakpoints">
      <Slide v-for="product in Products" :key="product.id">
        <q-card class="product-card q-ma-sm">
          <q-img
            :src="product.image"
            :ratio="1"
            class="product-image"
            @click="showImageDialog(product.image)"
          />
          <q-card-section>
            <div class="text-subtitle2 product-category">#{{ product.id }}</div>
            <div class="text-h6 product-title">{{ product.name }}</div>
            <div class="text-subtitle2 product-category">{{ product.category }}</div>
            <div class="text-h6 product-price">NPR {{ product.price }}</div>
            <q-btn 
              color="primary" 
              class="full-width q-mt-sm"
              label="Buy Now"
              @click="showOrderDialog(product.id)"
            />
            <q-expansion-item
              class="q-mt-sm"
              switch-toggle-side
              dense
              expand-separator
              label="Description"
            >
              <q-card>
                <q-card-section>
                  {{ product.description }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

    <q-dialog v-model="orderDialog">
      <q-card style="min-width: 400px; border-radius: 12px;">
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

    <q-dialog v-model="imageDialog" style="width: 100vw; height: 100vh;overflow: hidden;">
      <q-img 
        :src="selectedImage" 
        style="object-fit: contain;;overflow: hidden;" 
      />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref,computed ,onBeforeMount, watch} from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useProductsStore } from '@/stores/products';
import ProductsAPI from '@/api/products';
import { useQuasar } from 'quasar';
const ProductStore = useProductsStore()

const selectedCategory = ref(null);
// const categoryOptions = ref(['all', 'electronics', 'clothing', 'accessories']);

const Products = computed((): any => {
  return ProductStore.getProducts;
});
const Categories = computed((): any => {
  const data = [{ "label": 'All', value: null }, ...ProductStore.getCategories];
  return data
});
const SelectedCategory = computed((): any => {
  return ProductStore.getSelectedCategory;
});

const handleCategoryChange =async () => {
  console.log("selected category",selectedCategory.value)
  await ProductStore.fetchProducts(selectedCategory.value)
}

const breakpoints = {
  // Mobile
  320: {
    itemsToShow: 1,
    snapAlign: 'center',
  },
  // Tablet
  640: {
    itemsToShow: 2,
    snapAlign: 'center',
  },
  // Desktop
  1024: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
}

onBeforeMount(async () => {
  await ProductStore.fetchProducts()
  await ProductStore.fetchCategories()
});

const $q = useQuasar();
const orderDialog = ref(false);
const orderForm = ref({
  quantity: 1,
  phone_number: '',
  name: '',
  address: '',
});
const selectedProductId :any= ref(null);

const showOrderDialog = (productId: number) => {
  selectedProductId.value = productId;
  orderDialog.value = true;
};

const submitOrder = async () => {
  try {
    const orderData = {
      product: selectedProductId.value,
      ...orderForm.value
    };
    
    await ProductsAPI.postOrders(orderData);
    
    orderDialog.value = false;
    orderForm.value = {
      quantity: 1,
      phone_number: '',
      name: '',
      address: '',
    };
    
    $q.notify({
      type: 'positive',
      message: 'Your order has been placed, we will get back to you shortly'
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Failed to place order. Please try again.'
    });
  }
};

const imageDialog = ref(false);
const selectedImage = ref('');

const showImageDialog = (imageUrl: string) => {
  selectedImage.value = imageUrl;
  imageDialog.value = true;
};

watch(SelectedCategory, async (newValue) => {
  selectedCategory.value = newValue;
  await ProductStore.fetchProducts(selectedCategory.value);
});

</script>

<style lang="scss" >
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
  font-family: 'Playfair Display', serif;
  margin: 0;
  width: 100%;
  text-align: center;
}
.product-card {
  transition: transform 0.3s ease;
  width: 280px;
  margin: 0 auto;
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
  padding: 10px;
  width: 280px !important;
  min-width: 280px;
}

:deep(.carousel__track) {
  gap: 1rem;
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
</style>
