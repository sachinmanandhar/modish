<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { useMeta } from "quasar";
import { useJwtStore } from "@/stores/jwt";
import { onBeforeMount } from "vue";
useMeta({
  title: "Modish Era",
});

const JwtStore = useJwtStore();

onBeforeMount(async () => {
  // await JwtStore.refreshAccessToken();
});
</script>

<template>
  <!-- <HelloWorld /> -->
  <RouterView />
</template>

<style>
@import "@/assets/base.css";

body {
  background-color: #fafafa;
  color: black;
}
</style>
