<template>
  <div class="faqs-container q-pa-md">
    <h1 class="text-h4 q-mb-lg">Frequently Asked Questions</h1>

    <div class="row q-col-gutter-md" v-if="FAQs && FAQs.length > 0">
      <template v-for="faq in FAQs" :key="faq.id">
        <!-- On web: col-6 (two columns), On mobile: col-12 (one column) -->
        <div class="col-12 col-sm-6">
          <q-expansion-item
            group="faqs"
            icon="help_outline"
            :label="faq.question"
          >
            <q-card>
              <q-card-section>
                {{ faq.answer }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GENERALAPI from "@/api/general";
import { ref, computed, onBeforeMount, watch } from "vue";

var FAQs: any = ref([]);

onBeforeMount(async () => {
  FAQs.value = await GENERALAPI.fetchFAQs();
});
</script>

<style lang="scss" scoped>
.faqs-container {
  max-width: 1200px;
  margin: 0 auto;

  .q-expansion-item {
    margin-bottom: 8px;

    :deep(.q-expansion-item__content) {
      background-color: #f8f8f8;
    }
  }
}
</style>
