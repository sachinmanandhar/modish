<template>
  <div class="checkout-container q-pa-md">
    <h2 class="text-h4 q-mb-lg">Checkout</h2>
    <!-- {{ cart }} -->
    <!-- Cart Items -->
    <div class="cart-items q-mb-xl">
      <div v-for="item in cart" :key="item.id" class="cart-item q-mb-md">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center">
              <q-img :src="item.image" style="width: 100px" />
              <div class="col q-px-md">
                <div class="text-h6">{{ item.name }}</div>
                <div class="text-subtitle2">NPR {{ item.price }}</div>
              </div>
              <div class="col-auto">
                <q-input
                  v-model.number="item.quantity"
                  type="number"
                  dense
                  outlined
                  style="width: 80px"
                  @update:model-value="(value:any) => value !== null && updateQuantity(item.id, Number(value))"
                />
              </div>
              <div class="col-auto q-pl-md">
                <q-btn
                  flat
                  round
                  color="negative"
                  icon="delete"
                  @click="removeFromCart(item.id)"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Checkout Form -->
    <div class="row q-mt-sm">
      <div class="col-12 col-md-8">
        <q-form @submit="submitOrder" class="q-gutter-md">
          <q-input
            v-model="orderForm.name"
            label="Full Name"
            :rules="[(val:any) => !!val || 'Name is required']"
            outlined
          />
          <q-input
            v-model="orderForm.phone"
            label="Phone Number"
            :rules="[
              (val:any) => !!val || 'Phone number is required',
              (val:any) => /^\d{10}$/.test(val) || 'Phone number must be exactly 10 digits'
            ]"
            outlined
          />
          <q-input
            v-model="orderForm.address"
            label="Delivery Address"
            type="textarea"
            :rules="[(val:any) => !!val || 'Address is required']"
            outlined
          />
          <!-- <q-select
            v-model="orderForm.location"
            :options="locationOptions"
            label="Delivery Location"
            :rules="[(val:any) => !!val || 'Location is required']"
            outlined
          /> -->

          <div class="row justify-end q-mt-lg">
            <q-btn
              type="submit"
              color="primary"
              label="Place Order"
              :disable="cart.length === 0"
            />
          </div>
        </q-form>
      </div>

      <div class="col-12 col-md-4 q-pl-md q-mt-sm">
        <q-card class="order-summary">
          <q-card-section>
            <div class="text-h6">Order Summary</div>
            <div class="row justify-between q-mt-md">
              <span>Subtotal:</span>
              <span>NPR {{ cartTotal }}</span>
            </div>
            <q-separator class="q-my-md" />
            <div class="row justify-between text-weight-bold">
              <span>Total:</span>
              <span>NPR {{ finalTotal }}</span>
            </div>

            <div class="text-caption q-mt-md">
              <p class="text-bold">Delivery Charges:</p>
              <ul class="q-mt-sm">
                <li>Inside Ring Road: NPR 100</li>
                <li>Outside Ring Road: NPR 150</li>
                <li>Outside Valley: Depends on location</li>
              </ul>
              <p class="q-mt-sm text-bold">
                Note: Orders within Kathmandu Valley will be delivered within 24
                hours.
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useGeneralStore } from "@/stores/general";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import GENERALAPI from "@/api/general";
const generalStore = useGeneralStore();
const $q = useQuasar();
const router = useRouter();
const cart = computed(() => generalStore.cart);
const cartTotal = computed(() => generalStore.cartTotal);

const deliveryCharge = computed(() => {
  switch (orderForm.value.location) {
    case "inside_ring_road":
      return 100;
    case "outside_ring_road":
      return 150;
    case "outside_valley":
      return 0; // This will be calculated separately
    default:
      return 0;
  }
});

const finalTotal = computed(() => cartTotal.value + deliveryCharge.value);

const locationOptions = [
  {
    label: "Inside Ring Road",
    value: "inside_ring_road",
  },
  {
    label: "Outside Ring Road",
    value: "outside_ring_road",
  },
  {
    label: "Outside Valley",
    value: "outside_valley",
  },
];

const orderForm = ref({
  name: "",
  phone: "",
  address: "",
  location: "",
});

const updateQuantity = (productId: number, quantity: number) => {
  generalStore.updateQuantity(productId, quantity);
};

const removeFromCart = (productId: number) => {
  generalStore.removeFromCart(productId);
};

const submitOrder = async () => {
  try {
    const transformedData = {
      products: cart.value.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
      phone_number: orderForm.value.phone,
      full_name: orderForm.value.name,
      address: orderForm.value.address,
      location: orderForm.value.location,
    };

    await GENERALAPI.postBulkOrder(transformedData).then((res: any) => {
      $q.notify({
        type: "positive",
        message: "Order placed successfully!",
      });
      generalStore.clearCart();
      orderForm.value = {
        name: "",
        phone: "",
        address: "",
        location: "",
      };
      router.push({ name: "product", params: { categoryId: "0" } });
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Failed to place order. Please try again.",
    });
  }
};
</script>

<style scoped>
.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
}

.order-summary {
  position: sticky;
  top: 20px;
}
</style>
