<template>
  <q-carousel
    :autoplay="5000"
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    infinite
    swipeable
    animated
    navigation
    padding
    arrows
    control-text-color="white"
    :height="$q.screen.lt.sm ? '50vh' : '80vh'"
    class="fashion-carousel"
  >
    <q-carousel-slide
      v-for="(content, index) in ProductContent"
      :key="index"
      :name="index.toString()"
      class="column no-wrap"
      :img-src="content.image"
    >
      <div class="carousel-caption left">
        <h2 class="text-h2 text-weight-light">{{ content.title }}</h2>
        <div class="subtitle">{{ content.subtitle }}</div>
        <q-btn
          class="q-mt-md"
          color="secondary"
          label="Shop Now"
          padding="sm lg"
          unelevated
          @click="scrollToSection('shop',content.category)"
        />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>
<script setup lang="ts">
import { ref,computed ,onBeforeMount} from 'vue';
import { useProductsStore } from '@/stores/products';

const ProductStore = useProductsStore()
const ProductContent = computed((): any => {
  return ProductStore.getFrontContent;
});

const slide = ref("0");

const scrollToSection = (elementId: string,category:string) => {
  ProductStore.SelectedCategory = category
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
onBeforeMount(async () => {
  await ProductStore.fetchFrontContent()
})
</script>
<style scoped>
.fashion-carousel {
  background: #1a1a1a;
}

.carousel-caption {
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 2.5rem;
  max-width: 500px;
  color: #333;
  
  @media (max-width: 600px) {
    padding: 2rem;
    max-width: 90%;
    left: 50% !important;
    right: auto !important;
    transform: translate(-50%, -50%);
  }
}

.carousel-caption.left {
  left: 10%;
}

.carousel-caption h2 {
  font-family: 'Playfair Display', serif;
  margin: 0;
  line-height: 1.2;
  
  @media (max-width: 600px) {
    font-size: 1.75rem !important;
  }
}

.subtitle {
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: 300;
  color: #666;
  
  @media (max-width: 600px) {
    font-size: 1rem;
    margin-top: 0.5rem;
  }
}

/* Hover effect for buttons */
.q-btn {
  transition: all 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>
