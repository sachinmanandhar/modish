<template>
    <div class="video-section">
      <!-- <h2 class="section-title">Featured Collections</h2> -->
      <div class="video-grid">
        <div class="video-card">
          <div class="video-container">
            <q-video
              class="absolute-full"
              src="https://www.youtube.com/embed/8XJluAuGNcA"
            />
          </div>
          <h3 class="video-title">Summer Collection 2024</h3>
        </div>
  
        <div class="video-card">
          <div class="video-container">
            <q-video
              class="absolute-full"
              src="https://www.youtube.com/embed/StwBN67rc6w"
            />
          </div>
          <h3 class="video-title">Spring Essentials</h3>
        </div>
  
        <div class="video-card">
          <div class="video-container">
            <q-video
              class="absolute-full"
              src="https://www.youtube.com/embed/iAVF2phsym4"
            />
          </div>
          <h3 class="video-title">Autumn Lookbook</h3>
        </div>
  
        <div class="video-card">
          <div class="video-container">
            <q-video
              class="absolute-full"
              src="https://www.youtube.com/embed/TU8sJpJfVG4"
            />
          </div>
          <h3 class="video-title">Winter Fashion Guide</h3>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.video-section {
  padding: 10rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  color: #333;
  margin-bottom: 4rem;
  font-weight: 600;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.video-card {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 50%;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
}

.video-title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .video-section {
    padding: 6rem 0;
  }

  .video-grid {
    width: 85%;
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  .video-title {
    font-size: 2rem;
  }
}
</style>