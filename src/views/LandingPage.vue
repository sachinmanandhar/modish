<template>
  <div class="column">
    <CarouselComponent id="home" />
    <WomensWear id="shop" />
    <ProductSlider id="sale" />
    <AboutUs id="about" />
    <!-- <Video /> -->
    <Review />
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
<script lang="ts" setup>
import '@/assets/carousel.css'
// import GeospatialMap from "@/components/GeospatialMap.vue";
import CarouselComponent from "@/components/landing/CarouselComponent.vue";
import WomensWear from "@/components/landing/WomensWear.vue";
import ProductSlider from "@/components/landing/ProductSlider.vue";
import AboutUs from "@/components/landing/AboutUs.vue";
// import Video from "@/components/landing/Video.vue";
import Review from "@/components/landing/Review.vue";
import { useGeneralStore } from '@/stores/general';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const generalStore = useGeneralStore();

const goToCheckout = () => {
  router.push({ name: 'checkout' });
};

</script>
