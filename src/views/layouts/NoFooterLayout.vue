<script setup lang="ts">
import SiteHeader from "@/components/Header.vue";
</script>

<template>
  <q-layout view="hhr lpR fff" class="text-black custom-layout">
    <SiteHeader />
    <q-page-container>
      <section
        class="container-width q-mx-auto"
        style="min-height: 90vh; width: 100%"
      >
        <router-view class="full-width" />
      </section>
    </q-page-container>
  </q-layout>
</template>

<style>
* {
  line-height: 1.7rem;
}

.container-width {
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
}

.custom-layout .q-layout__section--marginal {
  background-color: white;
  color: black;
}

.full-width {
  width: 100%;
}
</style>
