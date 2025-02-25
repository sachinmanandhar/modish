<template>
  <div class="about-us">
    <div class="text-content">
      <h1 class="title">Welcome to Modish Era</h1>
      <div class="description">
        <p>
          We offer stylish and lasting accessories for women who want to look
          great and express their personal style. From gold-plated rings to
          traditional Newari Makasi, we have something special for everyone.
        </p>
        <p>
          We hand-pick our collections to match your style and make every outfit
          look better. Our selection includes chunky earrings, beautiful rings ,
          and modern takes on classic Nepali jewelry. Whether you need a special
          piece or everyday accessories, Modish Era has what you're looking for.
        </p>
        <p>Join us at Modish Era and find your perfect style!</p>
      </div>
    </div>
    <div class="image-content">
      <img src="@/assets/images/IMG_1889.png" alt="About Modish Era" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.about-us {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.text-content {
  flex: 1 1 50%;
  padding: 2rem 4rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 600;
  line-height: 1.2;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.description p {
  margin-bottom: 1.5rem;
}

.image-content {
  flex: 1 1 50%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-content img {
  max-width: 120%;
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-content img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .about-us {
    flex-direction: column;
    padding: 2rem 1rem;
  }

  .text-content {
    flex: 1 1 100%;
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .image-content {
    flex: 1 1 100%;
    padding: 1rem;
  }

  .image-content img {
    max-width: 100%;
    width: 100%;
  }
}
</style>
