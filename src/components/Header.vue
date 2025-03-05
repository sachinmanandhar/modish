<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useMeta } from "quasar";
import {
  fasArrowRightToBracket,
  fasUserPlus,
  fabFacebook,
  fabInstagram,
  fabTwitter,
  fabLinkedin,
} from "@quasar/extras/fontawesome-v6";

import type { UserDetail } from "@/models/User.interface";
import { useJwtStore } from "@/stores/jwt";

const isLoginModalVisible = ref(false);
const showDarkModeBtn = ref(false);
const JwtStore = useJwtStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const isLoggedIn = computed((): boolean => {
  return JwtStore.isLoggedIn;
});

const userDetail = computed((): UserDetail => {
  return JwtStore.UserDetail;
});

const userFirstName = computed((): string => {
  return userDetail.value.firstName;
});

const logout = async (): Promise<void> => {
  await JwtStore.clearJWT();
  if ($route.name != "landing-page") {
    $router.push({ name: "landing-page" });
  }
};

const sidebarOpen = ref(false);

const toggleSidebar = (_: any) => {
  sidebarOpen.value = !sidebarOpen.value;
  document.body.style.overflow = sidebarOpen.value ? "hidden" : "auto";
};

const closeSidebar = (_: any) => {
  if (sidebarOpen.value) {
    sidebarOpen.value = !sidebarOpen.value;
    document.body.style.overflow = "auto";
  }
};

const openLoginModal = (_: any) => {
  isLoginModalVisible.value = true;
};

// const goToProfile = () => {
//   if (isLoggedIn.value && userDetail.value.profile) {
//     if (userDetail.value.profile.role == "volunteer") {
//       $router.push({
//         name: "volunteer-profile",
//         params: { volunteerId: userDetail.value.id },
//       });
//     } else if (userDetail.value.profile.role == "municipality") {
//       {
//         $router.push({
//           name: "palika-profile",
//           params: { palikaId: userDetail.value.profile.municipality },
//         });
//       }
//     }
//   }
// };

const username = ref("");
const password = ref("");
const onSubmit = async (): Promise<void> => {
  await JwtStore.getJWT({
    username: username.value,
    password: password.value,
  });
  $q.notify({
    message: "Login successful",
    type: "positive",
    position: "top",
  });
  username.value = "";
  password.value = "";
  isLoginModalVisible.value = !isLoginModalVisible.value;
  // $router.push({ name: "landing-page" });
};

const scrollToSection = (route: string) => {
  const elementId = route.split("#")[1];
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const quickLinks = [
  { title: "Home", route: "/" },
  { title: "Shop", route: "/product" },
  // { title: 'Sale', route: '#sale' },
  { title: "About Us", route: "/about" },

  // { title: 'Contact', route: '/contact' },
  { title: "Checkout", route: "/checkout" },
];

const phoneNumber = "+9779860913842"; // Store phone number as a constant for reuse

const copyToClipboard = async (e: Event) => {
  e.preventDefault(); // Prevent the default tel: behavior
  try {
    await navigator.clipboard.writeText(phoneNumber);
    $q.notify({
      message: "Phone number copied to clipboard!",
      type: "positive",
      position: "top",
      timeout: 2000,
    });
    // Optional: Still trigger the call after copying
    window.location.href = `tel:${phoneNumber}`;
  } catch (err) {
    $q.notify({
      message: "Failed to copy number",
      type: "negative",
      position: "top",
    });
  }
};

const websiteStructuredData = computed(() => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Modish Era", // Replace with your site name
  url: "https://modishera.com", // Replace with your domain
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://modishera.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61556899834852", // Add your social media links
    "https://www.instagram.com/themodish_era/",
  ],
}));

const navigationStructuredData = computed(() => ({
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: quickLinks.map((link) => link.title),
  url: quickLinks.map((link) => getFullUrl(link.route)),
}));

// Helper function to get full URLs
const getFullUrl = (route: string) => {
  const baseUrl = "https://modishera.com"; // Replace with your domain
  return route.startsWith("#") ? `${baseUrl}/${route}` : `${baseUrl}${route}`;
};

useMeta({
  title: "Modish Era - Stylish Gold Plated Jewelry & Women's Fashion in Nepal",
  meta: {
    description: {
      name: "description",
      content:
        "Discover trendy gold plated jewelry, earrings, lockets, bangles, rings, bags and women's fashion accessories at Modish Era. Quality fashion delivered across Nepal.",
    },
    keywords: {
      name: "keywords",
      content:
        "jewelry, fashion, women's wear, accessories, nepal, gold plated jewelry",
    },
  },
  script: {
    "website-schema": {
      type: "application/ld+json",
      innerHTML: JSON.stringify(websiteStructuredData.value),
    },
    "navigation-schema": {
      type: "application/ld+json",
      innerHTML: JSON.stringify(navigationStructuredData.value),
    },
  },
});

// Add these new refs
const showWelcome = ref(true);
const displayText = ref("");
const fullText = "Welcome to The Modish Era";

const typeWriter = async (text: string, speed = 50) => {
  for (let i = 0; i <= text.length; i++) {
    displayText.value = text.substring(0, i);
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
};

onMounted(async () => {
  await typeWriter(fullText);
  // Hide after 4 seconds
  setTimeout(() => {
    showWelcome.value = false;
  }, 1200);
});
</script>

<template>
  <header role="banner">
    <q-header :reveal="true">
      <q-toolbar
        class="container-width"
        :class="{
          'text-light bg-dark': $q.dark.isActive,
          'text-black bg-white': !$q.dark.isActive,
        }"
        style="flex-wrap: wrap"
      >
        <q-toolbar-title
          shrink
          class="toolbar-title row items-center cursor-pointer"
        >
          <q-btn
            flat
            round
            icon="menu"
            class="hamburger-menu"
            @click="toggleSidebar"
          />
          <div class="row">
            <router-link to="/" class="site-logo row q-mr-xs">
              <img
                style="height: 6.2rem; width: auto"
                width="3"
                height="103"
                src="@/assets/images/new-modish.jpeg"
                alt="Modish Era Logo - Fashion & Style Store"
                loading="eager"
              />
              <!-- <div class="site-title column justify-center q-ml-sm q-mr-md">
                <h1 class="text-h4 text-weight-bold">Modish</h1>
                <h2 class="text-subtitle1">Era</h2>
              </div> -->
            </router-link>
          </div>
        </q-toolbar-title>

        <div :data-expanded="sidebarOpen" id="site-controls">
          <!-- Only show close button in mobile view -->
          <div class="close-button-container mobile-only">
            <q-btn
              flat
              round
              color="grey-7"
              icon="close"
              @click="closeSidebar"
              class="close-sidebar-btn"
              size="md"
            >
              <q-tooltip>Close Menu</q-tooltip>
            </q-btn>
          </div>

          <nav id="site-nav" role="navigation" aria-label="Main navigation">
            <div class="hamburger-menu-container row items-center q-mb-md">
              <q-btn
                flat
                round
                icon="menu"
                class="hamburger-menu"
                @click="closeSidebar"
              />

              <div class="row">
                <router-link to="/" class="site-logo row q-mr-xs">
                  <img
                    style="height: 5.5rem; width: auto"
                    width="88"
                    height="88"
                    src="@/assets/images/new-modish.jpeg"
                    alt="Modish Era Logo - Fashion & Style Store"
                    loading="eager"
                  />
                  <div class="site-title column justify-center q-ml-sm">
                    <h1 class="text-h4 text-weight-bold">Modish</h1>
                    <h2 class="text-subtitle1">Era</h2>
                  </div>
                </router-link>
                <div
                  class="column justify-center q-mr-xl"
                  style="
                    font-size: 0.62rem;
                    font-family: sans-serif;
                    font-stretch: condensed;
                  "
                ></div>
              </div>
            </div>
          </nav>

          <div id="site-right-controls" class="row items-center justify-end">
            <div class="quick-links row q-gutter-md">
              <q-btn
                v-for="link in quickLinks"
                :key="link.title"
                flat
                no-caps
                :label="link.title"
                @click="
                  link.route.startsWith('#')
                    ? scrollToSection(link.route)
                    : $router.push(link.route)
                "
                class="quick-link-btn"
                :aria-label="`Navigate to ${link.title}`"
              >
                <link :href="getFullUrl(link.route)" rel="prerender" />
              </q-btn>
            </div>
            <div class="social-links row q-gutter-md">
              <q-btn
                flat
                round
                color="primary"
                icon="fab fa-facebook"
                type="a"
                href="https://www.facebook.com/profile.php?id=61556899834852"
                target="_blank"
                class="social-btn"
              />
              <q-btn
                flat
                round
                color="pink-6"
                icon="fab fa-instagram"
                type="a"
                href="https://www.instagram.com/themodish_era/"
                target="_blank"
                class="social-btn"
              />
              <q-btn
                flat
                round
                stack
                color="green-7"
                icon="fab fa-whatsapp"
                @click="copyToClipboard"
                class="social-btn"
                aria-label="Call us on WhatsApp"
              >
                <q-tooltip
                  anchor="bottom middle"
                  self="top middle"
                  :offset="[0, 8]"
                >
                  Click to copy: {{ phoneNumber }}
                </q-tooltip>
              </q-btn>
              <!-- <q-btn
                flat
                round
                color="blue-9"
                icon="fab fa-linkedin"
                type="a"
                href="https://linkedin.com"
                target="_blank"
                class="social-btn"
              /> -->
            </div>
          </div>
        </div>
      </q-toolbar>

      <!-- Welcome Message -->
      <div v-if="showWelcome" class="welcome-message text-center">
        <span class="typewriter">{{ displayText }}</span>
        <q-icon name="sentiment_very_satisfied" size="sm" class="q-ml-sm" />
      </div>
    </q-header>
  </header>
</template>

<style>
.q-header {
  border-bottom: 1px solid var(--q-primary);
  background-color: white;
}
.site-logo-label-container {
  font-size: 0.62rem;
  font-family: sans-serif;
  font-stretch: condensed;
}
.site-logo-label-container * {
  line-height: 1.1;
}
.site-logo a {
  text-decoration: none;
  color: #222;
}
.hamburger-menu-container,
.hamburger-menu {
  display: none;
}
#site-controls {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
#site-nav {
  display: flex;
  gap: 1rem;
}

@media only screen and (max-width: 1000px) {
  .hamburger-menu-container,
  .hamburger-menu {
    display: flex;
  }
  #site-nav .hamburger-menu {
    align-self: flex-start;
    margin: 1rem 0;
  }
  #site-controls {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    min-width: 350px;
    height: 100%;
    background-color: #eee;
    padding: 0 1rem 1rem 1rem;
    box-shadow: 15px 0px 26px -13px rgba(26, 26, 26, 1);
  }
  #site-controls[data-expanded="true"] {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
  }
  .q-footer {
    z-index: inherit;
  }
  #site-nav {
    flex-direction: column;
  }
  #site-right-controls {
    display: flex;
    justify-content: space-evenly;
  }
  #site-right-controls > * {
    flex-grow: 1;
  }
}
#site-nav .router-link-exact-active {
  background-color: var(--q-primary);
  color: #fff;
}
.toolbar-title .router-link-exact-active,
#site-nav .hamburger-menu-container .router-link-exact-active {
  background: none;
}

.login-modal {
  width: 100%;
  max-width: 40rem;
}

.login-modal-img {
  width: 80%;
}

.q-dialog__backdrop {
  backdrop-filter: blur(7px);
  background: rgba(0, 0, 0, 0.8);
}

.social-btn {
  transition: transform 0.2s ease;
}
.social-btn:hover {
  transform: scale(1.1);
}

.site-title {
  font-family: "Dancing Script", cursive;
  line-height: 1;
}

.site-title .text-h4 {
  color: #8f0005;
  margin: 0;
  font-size: 2.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 2px;
}

.site-title .text-subtitle1 {
  color: #666;
  margin: 0;
  font-size: 1.5rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
}

.q-toolbar {
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 8px 16px;
}

.quick-links {
  margin-right: 2rem;
}

.quick-link-btn {
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.quick-link-btn:hover {
  color: var(--q-primary);
}

@media only screen and (max-width: 1000px) {
  .quick-links {
    flex-direction: column;
    margin-right: 0;
    margin-bottom: 1rem;
  }

  #site-right-controls {
    flex-direction: column;
  }
}

.welcome-message {
  background: linear-gradient(to right, #8f0005, #666);
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
  animation: fadeOut 0.5s ease-in-out 2.5s forwards;
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Add these styles to maintain aspect ratio and prevent layout shift */
img {
  aspect-ratio: attr(width) / attr(height);
}

.site-logo img {
  aspect-ratio: 1 / 1; /* Since the logo appears to be square */
}

.close-button-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  display: none; /* Hide by default */
}

.close-sidebar-btn {
  transition: transform 0.2s ease;
}

.close-sidebar-btn:hover {
  transform: rotate(90deg);
}

@media only screen and (max-width: 1000px) {
  #site-controls {
    padding-top: 1rem;
  }

  .close-button-container {
    display: block; /* Only show in mobile view */
  }
}
</style>
