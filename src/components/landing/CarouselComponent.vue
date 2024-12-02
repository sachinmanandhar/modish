<script setup lang="ts">
import { ref } from "vue";
const slide = ref("style");

const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

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
      name="style"
      class="column no-wrap"
      img-src="@/assets/images/slider1.jpeg"
    >
      <div class="carousel-caption right">
        <h2 class="text-h2 text-weight-light">Summer Collection</h2>
        <div class="subtitle">Discover the latest trends in summer fashion</div>
        <q-btn
          class="q-mt-md"
          color="secondary"
          label="Shop Now"
          padding="sm lg"
          unelevated
          @click="scrollToSection('shop')"
        />
      </div>
    </q-carousel-slide>

    <q-carousel-slide
      name="tv"
      class="column no-wrap"
      img-src="@/assets/images/slider2.jpeg"
    >
      <div class="carousel-caption right">
        <h2 class="text-h2 text-weight-light">Accessories Edit</h2>
        <div class="subtitle">Complete your look with our curated accessories</div>
        <q-btn
          class="q-mt-md"
          color="secondary"
          label="Explore More"
          padding="sm lg"
          unelevated
          @click="scrollToSection('shop')"
        />
      </div>
    </q-carousel-slide>

    <q-carousel-slide
      name="layers"
      class="column no-wrap"
      img-src="@/assets/images/slider3.jpeg"
    >
      <div class="carousel-caption left">
        <h2 class="text-h2 text-weight-light">Designer Collection</h2>
        <div class="subtitle">Elevate your style with exclusive pieces</div>
        <q-btn
          class="q-mt-md"
          color="secondary"
          label="View Collection"
          padding="sm lg"
          unelevated
          @click="scrollToSection('shop')"
        />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<style scoped>
.fashion-carousel {
  background: #1a1a1a;
}

.carousel-caption {
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 2rem;
  max-width: 450px;
  color: #333;
  
  @media (max-width: 600px) {
    padding: 1.5rem;
    max-width: 85%;
    left: 50% !important;
    right: auto !important;
    transform: translate(-50%, -50%);
  }
}

.carousel-caption.right {
  right: 10%;
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
