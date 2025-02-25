<template>
  <div class="womens-wear q-mt-md" v-if="items.length > 0">
    <h4 class="title text-bold">Women's Wear</h4>
    <div class="card-container flex justify-around">
      <router-link 
        v-for="item in items" 
        :key="item.name"
        :to="{ name: 'product', query: { categoryId: item.category }}"
        class="card"
      >
        <div class="card-inner">
          <img 
            :src="item.image" 
            :alt="item.name" 
            class="card-image" 
            loading="lazy"
            width="220"
            height="220"
          />
        </div>
        <div class="category-name">{{ item.category_name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from 'vue';
import ProductsAPI from '@/api/products';

const items :any = ref([]);

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 220px;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  text-decoration: none;
}

.card-inner {
  background-color: #e0b9e6;
  border-radius: 50%;
  width: 220px;
  height: 220px;
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
  font-family: 'Playfair Display', serif;
  color: #333;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

@media (max-width: 1024px) {
  .card {
    width: 180px;
  }

  .card-inner {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 600px) {
  .card {
    width: 150px;
  }

  .card-inner {
    width: 150px;
    height: 150px;
  }

  .category-name {
    font-size: 16px;
  }
}
</style>
