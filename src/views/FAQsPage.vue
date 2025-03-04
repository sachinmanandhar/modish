<template>
  <div class="faqs-container q-pa-md">
    <h1 class="text-h4 q-mb-lg">Frequently Asked Questions</h1>

    <q-list bordered separator>
      <!-- Care & Maintenance -->
      <q-expansion-item
        group="faqs"
        icon="diamond"
        label="How should I care for my gold-plated jewelry to make it last longer?"
        caption="Learn about proper storage and maintenance"
      >
        <q-card>
          <q-card-section>
            Store in airtight bags, avoid contact with water, perfumes, or
            chemicals, and clean with a soft, dry cloth. Remove jewelry before
            swimming, showering, or applying cosmetics.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Quality & Durability -->
      <q-expansion-item
        group="faqs"
        icon="verified"
        label="How long does gold plating typically last on jewelry?"
        caption="Understanding the durability of gold-plated pieces"
      >
        <q-card>
          <q-card-section>
            With proper care, our gold plating can last 1-2 years. The longevity
            depends on wear frequency, care routine, and environmental factors.
            Regular maintenance helps extend its life.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Authenticity -->
      <q-expansion-item
        group="faqs"
        icon="check_circle"
        label="Are your Indian and Korean jewelry pieces authentic designs?"
        caption="Information about our jewelry origins"
      >
        <q-card>
          <q-card-section>
            Yes, our pieces are authentic designs inspired by traditional Indian
            and Korean jewelry aesthetics, crafted with attention to cultural
            details and modern styling.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Allergies -->
      <q-expansion-item
        group="faqs"
        icon="health_and_safety"
        label="Is gold-plated jewelry suitable for sensitive skin?"
        caption="Understanding skin sensitivity and our materials"
      >
        <q-card>
          <q-card-section>
            Our gold-plated jewelry is nickel-free and hypoallergenic. However,
            if you have known metal allergies, we recommend doing a patch test
            or consulting your healthcare provider.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Shipping -->
      <q-expansion-item
        group="faqs"
        icon="local_shipping"
        label="Do you offer international shipping for your jewelry?"
        caption="Shipping information and delivery times"
      >
        <q-card>
          <q-card-section>
            Yes, we ship worldwide. Domestic orders typically arrive in 3-5
            business days, while international shipping takes 7-14 business
            days, depending on the destination.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Returns -->
      <q-expansion-item
        group="faqs"
        icon="assignment_return"
        label="What is your return and exchange policy?"
        caption="Understanding our return process"
      >
        <q-card>
          <q-card-section>
            We offer a 30-day return policy for unworn items in original
            packaging. Custom orders are final sale. Contact our customer
            service for return authorization.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Sizing -->
      <q-expansion-item
        group="faqs"
        icon="straighten"
        label="How can I find my correct jewelry size?"
        caption="Guide to finding your perfect fit"
      >
        <q-card>
          <q-card-section>
            Use our size guide available on the product pages. For rings, we
            recommend using our printable size guide. For necklaces and
            bracelets, measure your preferred length.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Customization -->
      <q-expansion-item
        group="faqs"
        icon="design_services"
        label="Do you offer customization for your jewelry pieces?"
        caption="Information about custom orders"
      >
        <q-card>
          <q-card-section>
            Yes, we offer customization for select pieces. Contact our customer
            service team for custom length adjustments, engraving options, or
            special design requests.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script lang="ts" setup>
// Add any necessary script logic here
</script>

<style lang="scss" scoped>
.faqs-container {
  max-width: 800px;
  margin: 0 auto;

  .q-expansion-item {
    margin-bottom: 8px;

    :deep(.q-expansion-item__content) {
      background-color: #f8f8f8;
    }
  }
}
</style>
