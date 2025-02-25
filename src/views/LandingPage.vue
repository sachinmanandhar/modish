<template>
  <main class="column">
    <CarouselComponent id="home" />
    <WomensWear id="shop" />
    <ProductSlider id="sale" />
    <AboutUs id="about" />
    <Review />

    <!-- Floating Checkout Button -->
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      class="mobile-sticky"
    >
      <q-btn
        fab
        color="primary"
        icon="shopping_cart"
        class="checkout-fab"
        @click="goToCheckout"
        size="md"
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
  </main>
</template>
<script lang="ts" setup>
import "@/assets/carousel.css";
// import GeospatialMap from "@/components/GeospatialMap.vue";
import CarouselComponent from "@/components/landing/CarouselComponent.vue";
import WomensWear from "@/components/landing/WomensWear.vue";
import ProductSlider from "@/components/landing/ProductSlider.vue";
import AboutUs from "@/components/landing/AboutUs.vue";
// import Video from "@/components/landing/Video.vue";
// import Review from "@/components/landing/Review.vue";
import { useGeneralStore } from "@/stores/general";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const generalStore = useGeneralStore();

// Add meta information
const metaInfo = {
  title: "Fashion Boutique | Women's Clothing & Accessories",
  meta: [
    {
      name: "description",
      content:
        "Discover our curated collection of women's fashion, accessories, and more. Shop the latest trends with free shipping on orders over $50.",
    },
    {
      name: "keywords",
      content:
        "women's fashion, clothing, accessories, dresses, boutique, online shopping",
    },
    {
      property: "og:title",
      content: "Fashion Boutique | Women's Clothing & Accessories",
    },
    {
      property: "og:description",
      content:
        "Discover our curated collection of women's fashion, accessories, and more. Shop the latest trends with free shipping on orders over $50.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
};

const goToCheckout = () => {
  router.push({ name: "checkout" });
};
</script>

<style scoped>
.mobile-sticky {
  z-index: 1000;
}

@media (max-width: 600px) {
  .checkout-fab {
    transform: scale(0.9);
  }

  .mobile-sticky {
    right: 0 !important;
  }
}
</style>
