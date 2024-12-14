<template>
    <div class="">
        
    </div>
  <div class="product-list-container">
    <!-- Hero Section -->
    <div class="hero-section q-pa-xl text-center" v-if="CategoryDetail && CategoryDetail.length > 0">
      <h1 class="text-h3 text-weight-bold q-mb-md"> {{ CategoryDetail[0].title }}</h1>
      <p class="description q-mx-auto">
        {{ CategoryDetail[0].description }}
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
      <div class="row q-col-gutter-md">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-card flat bordered class="product-card">
            <div class="image-container">
              <q-img
                :src="product.image"
                :ratio="1"
                class="product-image"
                @click="showImageDialog(product.image)"
              />
            </div>
            <q-card-section class="q-pa-sm text-center">
              <div class="product-info">
                <span class="text-subtitle2 product-title">{{ product.name }}</span>
                <span class="text-subtitle2">NPR {{ product.price }}</span>
              </div>
              <q-btn
                outline
                color="primary"
                class="buy-button q-mt-sm"
                label="Buy Now"
                size="sm"
                @click="showOrderDialog(product.id)"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Order Dialog -->
    <q-dialog v-model="orderDialog">
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
    </q-dialog>

    <!-- Image Dialog -->
    <q-dialog v-model="imageDialog">
      <q-img :src="selectedImage" style="max-width: 90vw; max-height: 90vh;overflow: hidden;" />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
const ProductStore = useProductsStore();
const $q = useQuasar();
const $route = useRoute();

// Filter and Sort
const selectedCategory = ref(null);
const searchQuery = ref('');
const sortBy = ref('name');
const sortOptions = [
  { label: 'Name (A-Z)', value: 'name' },
  { label: 'Price (Low to High)', value: 'price_asc' },
  { label: 'Price (High to Low)', value: 'price_desc' },
];
// Computed Properties
const Categories = computed(() => {
  return [{ label: 'All', value: null }, ...ProductStore.getCategories];
});
const CategoryDetail = computed((): any => {
  return ProductStore.getCategoryDetail;
});
const filteredProducts = computed(() => {
  let products :any= ProductStore.getProducts;
//   products = [{"id":3,"name":"bracelet","description":"demo des","price":800,"category":"Jewellery","image":"http://127.0.0.1:8000/media/products/download_2.jpeg"},{"id":2,"name":"bag","description":"demo bag","price":1000,"category":"Bags","image":"http://127.0.0.1:8000/media/products/download_1.jpeg"},{"id":1,"name":"Earrings","description":"earrings","price":200,"category":"Jewellery","image":"http://127.0.0.1:8000/media/products/download.jpeg"},{"id":3,"name":"bracelet","description":"demo des","price":800,"category":"Jewellery","image":"http://127.0.0.1:8000/media/products/download_2.jpeg"},{"id":2,"name":"bag","description":"demo bag","price":1000,"category":"Bags","image":"http://127.0.0.1:8000/media/products/download_1.jpeg"},{"id":1,"name":"Earrings","description":"earrings","price":200,"category":"Jewellery","image":"http://127.0.0.1:8000/media/products/download.jpeg"},{"id":3,"name":"bracelet","description":"demo des","price":800,"category":"Jewellery","image":"http://127.0.0.1:8000/media/products/download_2.jpeg"},{"id":2,"name":"bag","description":"demo bag","price":1000,"category":"Bags","image":"http://127.0.0.1:8000/media/products/download_1.jpeg"},{"id":1,"name":"Earrings","description":"earrings","price":200,"category":"Jewellery","image":"http://127.0.0.1:8000/media/products/download.jpeg"},{"id":3,"name":"bracelet","description":"demo des","price":800,"category":"Jewellery","image":"http://127.0.0.1:8000/media/products/download_2.jpeg"},{"id":2,"name":"bag","description":"demo bag","price":1000,"category":"Bags","image":"http://127.0.0.1:8000/media/products/download_1.jpeg"},{"id":1,"name":"Earrings","description":"earrings","price":200,"category":"Jewellery","image":"http://127.0.0.1:8000/media/products/download.jpeg"}]
  // Search filter
  if (searchQuery.value) {
    products = products.filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Sort
  products = [...products].sort((a: any, b: any) => {
    switch (sortBy.value) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return products;
});

// Methods
const handleCategoryChange = async () => {
  await ProductStore.fetchProducts(selectedCategory.value);
};

// Dialog controls and other functionality
const orderDialog = ref(false);
const imageDialog = ref(false);
const selectedImage = ref('');
const selectedProductId :any= ref(null);

// Form handling
const orderForm = ref({
  name: '',
  phone: '',
  address: '',
  quantity: 1
});

const submitOrder = async () => {
  try {
    // You can add your order submission logic here
    // For example:
    // await ProductStore.submitOrder({
    //   ...orderForm.value,
    //   productId: selectedProductId.value
    // });
    
    $q.notify({
      type: 'positive',
      message: 'Order placed successfully!'
    });
    
    orderDialog.value = false;
    orderForm.value = {
      name: '',
      phone: '',
      address: '',
      quantity: 1
    };
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Failed to place order. Please try again.'
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

onBeforeMount(async () => {
  const categoryId = $route.params.categoryId
  await ProductStore.fetchCategoryDetail(categoryId);
  await ProductStore.fetchProducts(categoryId);
  await ProductStore.fetchCategories();

  selectedProductId.value=  categoryId
  console.log("categoryId",categoryId);
});
</script>

<style lang="scss" scoped>
.hero-section {
  background: linear-gradient(to right, #f3e7e9, #e3eeff);
  padding: 4rem 2rem !important;
  margin-bottom: 2rem;
  
  h1 {
    font-family: 'Playfair Display', serif;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
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
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    
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
</style>
