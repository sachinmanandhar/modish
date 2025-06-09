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
                <div class="faq-content">
                  {{ faq.answer }}
                  <div class="q-mt-md">
                    <router-link
                      :to="{
                        name: 'faq-detail',
                        params: {
                          questionId: faq.id,
                          questionSlug: generateSlug(faq.question),
                        },
                      }"
                      class="text-primary"
                    >
                      Read more details
                    </router-link>
                  </div>
                </div>
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
import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

const router = useRouter();
var FAQs: any = ref([]);

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Create computed property for FAQ schema
const faqSchema = computed(() => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQs.value.map((faq: any) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return JSON.stringify(schema);
});

onBeforeMount(async () => {
  FAQs.value = await GENERALAPI.fetchFAQs();

  // Use useHead to set meta tags and structured data
  useHead({
    title: "Frequently Asked Questions | Modish Era Nepal",
    meta: [
      {
        name: "description",
        content:
          "Find answers to common questions about Modish Era's jewelry, shipping, returns, and more. Learn about gold-plated jewelry, care instructions, and shopping policies.",
      },
      {
        name: "keywords",
        content:
          "jewelry FAQ, gold plated jewelry FAQ, jewelry care instructions, jewelry return policy, jewelry shipping Nepal, jewelry maintenance, jewelry cleaning, jewelry storage, jewelry warranty, jewelry quality",
      },
      {
        property: "og:title",
        content: "Frequently Asked Questions | Modish Era Nepal",
      },
      {
        property: "og:description",
        content:
          "Find answers to common questions about Modish Era's jewelry, shipping, returns, and more.",
      },
    ],
    // script: [
    //   {
    //     type: "application/ld+json",
    //     children: faqSchema.value,
    //   },
    // ],
    link: [
      {
        rel: "canonical",
        href: window.location.href,
      },
    ],
  });
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

  .faq-content {
    line-height: 1.6;
  }
}
</style>
