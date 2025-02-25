<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useMeta } from "quasar";
import { useJwtStore } from "@/stores/jwt";
import { onBeforeMount, ref } from "vue";

const showDialog = ref(true);

useMeta({
  title: "Modish Era",
});

const JwtStore = useJwtStore();

onBeforeMount(async () => {
  await JwtStore.refreshAccessToken();
});
</script>

<template>
  <!-- <HelloWorld /> -->
  <RouterView />
  
  <!-- Discount Dialog -->
  <!-- <q-dialog v-model="showDialog">
    <q-card :style="$q.screen.lt.sm ? 'width: 90vw' : 'width: 50vw'" style="max-width: 100vw;">
      <q-card-section class="row items-center">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pa-none">
        <img src="@/assets/images/discount.jpeg" style="width: 100%;overflow: hidden;" />
      </q-card-section>
    </q-card>
  </q-dialog> -->
</template>

<style>
@import "@/assets/base.css";

body {
  background-color: #fafafa;
  color: black;
}
</style>
