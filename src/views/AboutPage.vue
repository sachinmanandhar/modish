<template>
  <div class="about-container q-pa-md">
    <div class="row justify-center items-center q-col-gutter-lg">
      <!-- Image Section -->
      <div class="col-12 col-md-6">
        <q-img
          src="@/assets/images/about.png"
          style="height: 400px; border-radius: 15px"
          fit="cover"
          class="shadow-2"
        />
      </div>

      <!-- Content Section -->
      <div class="col-12 col-md-6">
        <h1 class="text-h3 q-mb-lg text-primary" style="font-family: 'Dancing Script', cursive;">
          About The Modish Era
        </h1>
        
        <p class="text-body1 q-mb-lg">
          The Modish Era is a women-led brand in Nepal, dedicated to bringing you trendy and high-quality accessories. 
          We specialize in elegant earrings, chic bags, dazzling rings, and stylish bracelets designed to complement every look.
        </p>
        
        <p class="text-body1 q-mb-xl">
          Our mission is to empower women through fashion, offering timeless pieces that are both affordable and fashionable. 
          Shop with The Modish Era and celebrate your style with accessories crafted for modern, confident women.
        </p>

        <!-- Contact Information -->
        <div class="contact-info q-mb-xl">
          <h2 class="text-h5 q-mb-md text-primary">Contact Us</h2>
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="location_on" color="primary" />
                </q-item-section>
                <q-item-section>Baluwatar, Kathmandu, Nepal</q-item-section>
              </q-item>
            </div>
            <div class="col-12">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="phone" color="primary" />
                </q-item-section>
                <q-item-section>+977- 9860913842</q-item-section>
              </q-item>
            </div>
            <div class="col-12">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="email" color="primary" />
                </q-item-section>
                <q-item-section>themodishera@gmail.com</q-item-section>
              </q-item>
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="social-links">
          <h2 class="text-h5 q-mb-md text-primary">Follow Us</h2>
          <div class="row q-gutter-md">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional script needed for this component
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.social-btn {
  transition: transform 0.2s ease;
}

.social-btn:hover {
  transform: scale(1.1);
}

.contact-info .q-item {
  min-height: 40px;
}

@media (max-width: 600px) {
  .about-container {
    padding-top: 1rem;
  }
}
</style>
