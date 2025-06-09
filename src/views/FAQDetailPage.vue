<template>
  <div class="faq-detail-container q-pa-md q-mt-md">
    <div v-if="faq" class="faq-content">
      <h1 class="text-h4 q-mb-lg text-bold">{{ faq.question }}</h1>

      <div class="answer-section q-mb-lg">
        <h2 class="text-h6 q-mb-md">Answer</h2>
        <div class="answer-content">{{ faq.answer }}</div>
      </div>

      <div class="related-faqs q-mt-xl" v-if="relatedFAQs.length > 0">
        <h2 class="text-h5 q-mb-md">Related Questions</h2>
        <div class="row q-col-gutter-md">
          <div
            v-for="relatedFaq in relatedFAQs"
            :key="relatedFaq.id"
            class="col-12 col-sm-6"
          >
            <q-card class="related-faq-card">
              <q-card-section>
                <router-link
                  :to="{
                    name: 'faq-detail',
                    params: {
                      questionId: relatedFaq.id,
                      questionSlug: generateSlug(relatedFaq.question),
                    },
                  }"
                  class="text-primary"
                >
                  {{ relatedFaq.question }}
                </router-link>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- FAQ Schema for individual question -->
      <!-- <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "{{ faq.question }}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "{{ faq.answer }}"
              }
            }
          ]
        }
      </script> -->
    </div>
    <div v-else class="text-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
      <p class="q-mt-md">Loading FAQ...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import GENERALAPI from "@/api/general";

const route = useRoute();
const faq = ref<any>(null);
const allFAQs = ref<any[]>([]);

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const relatedFAQs = computed(() => {
  if (!faq.value || !allFAQs.value.length) return [];
  return allFAQs.value.filter((f) => f.id !== faq.value.id).slice(0, 4);
});

onMounted(async () => {
  try {
    const questionId = route.params.questionId;
    console.log("Fetching FAQ with ID:", questionId);

    // Fetch the specific FAQ
    const response = await GENERALAPI.fetchFAQs(questionId);
    faq.value = response; // Directly assign the response as it's a single object

    // Fetch all FAQs for related questions
    const allFaqsResponse = await GENERALAPI.fetchFAQs();
    allFAQs.value = Array.isArray(allFaqsResponse)
      ? allFaqsResponse
      : [allFaqsResponse];

    if (faq.value) {
      document.title = `${faq.value.question} | Modish Era FAQs`;
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          faq.value.answer.substring(0, 160)
        );
      }
    }
  } catch (error) {
    console.error("Error fetching FAQ:", error);
  }
});
</script>

<style lang="scss" scoped>
.faq-detail-container {
  max-width: 1200px;
  margin: 0 auto;

  .faq-content {
    .answer-section {
      background-color: #f8f8f8;
      padding: 2rem;
      border-radius: 8px;
    }

    .answer-content {
      line-height: 1.8;
      font-size: 1.1rem;
    }
  }

  .related-faq-card {
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
