<template>
  <div class="womens-wear q-mt-md">
    <h4 class="title text-bold">Women's Wear</h4>
    <Carousel
      :wrap-around="true"
      :breakpoints="breakpoints"
      :pagination-enabled="true"
      :pagination-padding="4"
    >
      <!-- Show skeletons when no items -->
      <template v-if="items.length === 0">
        <Slide v-for="n in 4" :key="n">
          <div class="card">
            <div class="card-inner skeleton">
              <q-skeleton type="rect" class="card-image" />
            </div>
            <q-skeleton type="text" class="category-name-skeleton" />
          </div>
        </Slide>
      </template>
      <!-- Show actual items when available -->
      <Slide v-else v-for="item in items" :key="item.name">
        <router-link
          :to="{ name: 'product', query: { categoryId: item.category } }"
          class="card"
        >
          <div class="card-inner">
            <q-img
              :src="item.image_small_url"
              :alt="item.name"
              class="card-image"
              loading="lazy"
              width="120"
              height="120"
            />
          </div>
          <div class="category-name">{{ item.category_name }}</div>
        </router-link>
      </Slide>

      <template #addons>
        <Navigation />
        <!-- <Pagination /> -->
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
// import "vue3-carousel/dist/carousel.css";
import ProductsAPI from "@/api/products";

const items: any = ref([]);
// :autoplay="3000"
// :pause-autoplay-on-hover="true"
const breakpoints = {
  // Mobile
  320: {
    itemsToShow: 1.3,
    snapAlign: "center",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  // Small tablets
  550: {
    itemsToShow: 2,
    snapAlign: "center",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  // Tablets & small desktops
  768: {
    itemsToShow: 3,
    snapAlign: "center",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  // Large desktops
  1024: {
    itemsToShow: 5,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
};

onBeforeMount(async () => {
  const data = await ProductsAPI.getWomensWear();
  items.value = data;
});
</script>

<style scoped>
.womens-wear {
  text-align: center;
  padding: 20px;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
}

.title {
  font-family: "Playfair Display", serif;
  margin-bottom: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 220px;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  text-decoration: none;
  margin: 0 auto;
}

.card-inner {
  background-color: #8f0005;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover .card-inner {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.category-name {
  font-family: "Playfair Display", serif;
  color: #333;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.skeleton {
  background-color: #f0f0f0;
}

.category-name-skeleton {
  width: 120px;
  height: 24px;
}

:deep(.carousel__viewport) {
  width: 100%;
  padding: 0 20px;
}

:deep(.carousel__slide) {
  padding: 10px 15px;
}

:deep(.carousel__track) {
  gap: 1.5rem;
  padding: 0.5rem 0;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: #8f0005;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  color: white;
  margin: 0 -8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background-color: #d4a0dc;
  opacity: 1;
  transform: scale(1.1);
}

:deep(.carousel__prev .carousel__icon),
:deep(.carousel__next .carousel__icon) {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

@media (max-width: 1024px) {
  .card-inner {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 600px) {
  .card-inner {
    width: 150px;
    height: 150px;
  }

  .category-name {
    font-size: 16px;
  }

  :deep(.carousel__prev),
  :deep(.carousel__next) {
    width: 24px;
    height: 24px;
  }

  :deep(.carousel__prev .carousel__icon),
  :deep(.carousel__next .carousel__icon) {
    width: 16px;
    height: 16px;
  }
}

:deep(.carousel__pagination) {
  margin-top: 1rem;
}

:deep(.carousel__prev) {
  left: -5px;
}

:deep(.carousel__next) {
  right: -5px;
}
</style>
