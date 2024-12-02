<template>
  <div class="column">
    <CarouselComponent id="home" />
    <WomensWear id="shop" />
    <ProductSlider id="sale" />
    <AboutUs id="about" />
    <Video />
    <Review />
  </div>
</template>
<script lang="ts" setup>
import '@/assets/carousel.css'
// import GeospatialMap from "@/components/GeospatialMap.vue";
import CarouselComponent from "@/components/landing/CarouselComponent.vue";
import WomensWear from "@/components/landing/WomensWear.vue";
import ProductSlider from "@/components/landing/ProductSlider.vue";
import AboutUs from "@/components/landing/AboutUs.vue";
import Video from "@/components/landing/Video.vue";
import Review from "@/components/landing/Review.vue";
</script>
