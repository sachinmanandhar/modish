<template>
  <div class="product-slider q-pa-md">
    <h4 class="title text-bold text-center">Featured Products</h4>
    <Carousel :wrap-around="true" :autoplay="3000" :breakpoints="breakpoints">
      <Slide v-for="product in products" :key="product.id">
        <q-card class="product-card q-ma-sm">
          <q-img
            :src="product.image"
            :ratio="1"
            class="product-image"
          />
          <q-card-section>
            <div class="text-h6 product-title">{{ product.title }}</div>
            <div class="text-subtitle2 product-category">{{ product.category }}</div>
            <div class="text-h6 product-price">${{ product.price }}</div>
            <q-btn 
              color="primary" 
              class="full-width q-mt-sm"
              label="Buy Now"
            />
          </q-card-section>
        </q-card>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">

import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
// import 'vue3-carousel/dist/vue3-carousel.css'

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

const products = [
  {
    id: 1,
    title: "Summer Dress",
    category: "Women's Fashion",
    price: 89.99,
    image: "/images/product1.jpg"
  },
  {
    id: 2,
    title: "Floral Maxi Dress",
    category: "Women's Fashion",
    price: 99.99,
    image: "/images/product2.jpg"
  },
  {
    id: 3,
    title: "Denim Jacket",
    category: "Women's Fashion",
    price: 79.99,
    image: "/images/product3.jpg"
  },
  {
    id: 4,
    title: "Casual Blouse",
    category: "Women's Fashion",
    price: 49.99,
    image: "/images/product4.jpg"
  }
]
</script>

<style >
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
  /* color: #e0b9e6; */
  margin-bottom: 20px;
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

/* Carousel custom styles */
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
</style>
