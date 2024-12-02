<template>
  <div class="q-pa-md">
    <div class="text-h4 text-center q-mb-lg title text-bold">Customer Reviews</div>
    
    <div class="row q-col-gutter-md justify-around">
      <div
        v-for="(review, index) in reviews"
        :key="index"
        class="col-12 col-sm-6 col-md-3 flex justify-center"
      >
        <q-card class="review-reel" @click="openModal(review.screenshot)">
          <q-img
            :src="review.screenshot"
            :ratio="9/16"
            class="review-image"
          >
            <div class="absolute-bottom text-subtitle2 text-center q-pa-xs">
              {{ review.customerName }}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="isModalOpen">
      <q-img :src="currentImage" class="full-screen-image" />
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const reviews = ref([
  {
    customerName: 'Sarah J.',
    screenshot: '/static/images/reviews/review1.png'
  },
  {
    customerName: 'Mike S.',
    screenshot: '/static/images/reviews/review2.png'
  },
  {
    customerName: 'Emma D.',
    screenshot: '/static/images/reviews/review3.png'
  },
  {
    customerName: 'John W.',
    screenshot: '/static/images/reviews/review4.png'
  },
]);

const isModalOpen = ref(false);
const currentImage = ref('');

function openModal(imageSrc: string) {
  currentImage.value = imageSrc;
  isModalOpen.value = true;
}
</script>

<style scoped>
.review-reel {
  width: 250px;
  height: 444px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}

.review-reel:hover {
  transform: scale(1.05);
}

.review-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.full-screen-image {
  width: 100vw;
  height: 100vh;
  object-fit: contain;
  background-color: black;
}
</style>
