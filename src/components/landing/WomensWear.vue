<template>
  <div class="womens-wear q-mt-md" v-if="items.length > 0">
    <h4 class="title text-bold">Women's Wear</h4>
    <div class="card-container flex justify-around">
      <div 
        class="card" 
        v-for="item in items" 
        :key="item.name"
        @click="navigateToProduct(item.category)"
        style="cursor: pointer"
      >
        <img :src="item.image" :alt="item.name" class="card-image" />
        <div class="card-title">{{ item.category_name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from 'vue';
import ProductsAPI from '@/api/products';
import { useRouter } from 'vue-router';

const router = useRouter();
const items :any = ref([]);

const navigateToProduct = (categoryId: string) => {
  router.push({
    name: 'product',
    params: { categoryId }
  });
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
}

.title {
  font-family: 'Playfair Display', serif;
  /* color: #e0b9e6; */
  margin-bottom: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}

.card {
  background-color: #e0b9e6;
  border-radius: 50%;
  width: 220px;
  height: 220px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.card-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(224, 185, 230, 0.7);
  color: white;
  font-weight: bold;
  font-size: 24px;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 50%;
}

.card:hover .card-title {
  opacity: 1;
}

@media (max-width: 1024px) {
  .card {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 600px) {
  .card {
    width: 150px;
    height: 150px;
  }

  .card-image {
    width: 90px;
    height: 90px;
  }

  .card-title {
    font-size: 16px;
  }
}
</style>
