<template>
  <q-footer class="bg-primary text-white q-mt-lg">
    <div class="q-pa-lg">
      <div class="row q-col-gutter-lg">
        <!-- Company Info -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-h6 q-mb-md">About Us</div>
          <img src="@/assets/images/modish.jpg" style="height: 100px; margin-bottom: 16px" alt="Logo" />
          <p class="text-body2">
            Your trusted fashion destination. We provide quality clothing and accessories
            for the modern woman.
          </p>
          <!-- Social Media Icons -->
          <div class="row q-gutter-sm q-mt-md">
            <q-btn round flat icon="fab fa-facebook" href="https://www.facebook.com/profile.php?id=61556899834852" target="_blank" />
            <q-btn round flat icon="fab fa-instagram" href="https://www.instagram.com/themodish_era/" target="_blank" />
            <q-btn round flat icon="fab fa-twitter" href="#" target="_blank" />
            <q-btn round flat icon="fab fa-pinterest" href="#" target="_blank" />
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-h6 q-mb-md">Quick Links</div>
          <div class="column q-gutter-sm">
            <a
              v-for="link in quickLinks" 
              :key="link.title"
              :href="link.route"
              class="footer-link"
              @click="(e) => scrollToSection(e, link.route)"
            >
              {{ link.title }}
            </a>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-h6 q-mb-md">Contact Us</div>
          <div class="column q-gutter-sm">
            <div class="row items-center">
              <q-icon name="location_on" size="sm" class="q-mr-sm" />
              <span>Baluwatar, Kathmandu, Nepal</span>
            </div>
            <div class="row items-center">
              <q-icon name="phone" size="sm" class="q-mr-sm" />
              <span>+1 234 567 890</span>
            </div>
            <div class="row items-center">
              <q-icon name="email" size="sm" class="q-mr-sm" />
              <span>modishinfo@gmail.com</span>
            </div>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-h6 q-mb-md">Newsletter</div>
          <p class="text-body2 q-mb-md">
            Contact us for any inquiries or feedback.
          </p>
          <q-input
            v-model="email"
            filled
            dense
            dark
            type="email"
            placeholder="Enter your email"
            class="q-mb-sm"
          >
            <template v-slot:append>
              <q-btn
                unelevated
                color="secondary"
                label="Submit"
                @click="subscribeNewsletter"
              />
            </template>
          </q-input>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="row justify-between items-center q-mt-xl footer-bottom">
        <div class="text-caption">
          © {{ new Date().getFullYear() }} Your Store. All rights reserved.
        </div>
        <div class="row q-gutter-sm">
          <router-link 
            v-for="link in bottomLinks" 
            :key="link.title"
            :to="link.route"
            class="footer-link text-caption"
          >
            {{ link.title }}
          </router-link>
        </div>
      </div>
    </div>
  </q-footer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const email = ref('');

const quickLinks = [
  { title: 'Home', route: '/#home' },
  { title: 'Shop', route: '/#shop' },
  { title: 'Sale', route: '/#sale' },
  { title: 'About Us', route: '/#about' },
  { title: 'Contact', route: '/contact' }
];

const bottomLinks = [
  { title: 'Privacy Policy', route: '/privacy' },
  { title: 'Terms of Service', route: '/terms' },
  { title: 'Shipping Info', route: '/shipping' },
  { title: 'Returns', route: '/returns' }
];

const subscribeNewsletter = () => {
  // Implement newsletter subscription logic
  console.log('Subscribe:', email.value);
};

const scrollToSection = (event: Event, route: string) => {
  if (route.includes('#')) {
    event.preventDefault();
    const elementId = route.split('#')[1];
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.footer-link {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.footer-link:hover {
  opacity: 0.8;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 20px;
  margin-top: 40px;
}

/* Responsive adjustments */
@media (max-width: 599px) {
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>
