<template>
  <section class="landing-blogs-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="header-content">
          <h2 class="section-title">Latest from Our Blog</h2>
          <p class="section-subtitle">
            Discover the latest trends, styling tips, and fashion insights
          </p>
        </div>
        <div class="header-actions">
          <q-btn
            flat
            color="white"
            label="View All Posts"
            class="view-all-btn"
            @click="navigateToBlogs"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading latest posts...</p>
      </div>

      <!-- Blog Carousel -->
      <div
        v-else-if="blogs && blogs.length > 0"
        class="blog-carousel-container"
      >
        <div class="blog-carousel" ref="carouselRef">
          <div
            v-for="(blog, index) in blogs"
            :key="blog.id"
            class="blog-slide"
            :class="{ active: currentIndex === index }"
            :style="{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }"
          >
            <!-- Background Image -->
            <div class="slide-background">
              <img
                :src="blog.featured_image_url"
                :alt="blog.title"
                @error="handleImageError"
              />
              <div class="background-overlay"></div>
            </div>

            <!-- Content Overlay -->
            <div class="slide-content">
              <div class="content-wrapper">
                <!-- Featured Badge -->
                <div v-if="blog.is_featured" class="featured-badge">
                  <q-icon name="star" size="16px" />
                  <span>Featured Post</span>
                </div>

                <!-- Category -->
                <div class="blog-category">
                  <span>{{ blog.category.name }}</span>
                </div>

                <!-- Title -->
                <h2 class="blog-title">{{ blog.title }}</h2>

                <!-- Excerpt -->
                <p class="blog-excerpt">{{ blog.excerpt }}</p>

                <!-- Meta Information -->
                <div class="blog-meta">
                  <div class="meta-item">
                    <q-icon name="schedule" size="16px" />
                    <span>{{ formatDate(blog.published_at) }}</span>
                  </div>

                  <div class="meta-item">
                    <q-icon name="person" size="16px" />
                    <span>{{ blog.author.username }}</span>
                  </div>

                  <div class="meta-item">
                    <q-icon name="visibility" size="16px" />
                    <span>{{ blog.views }} views</span>
                  </div>
                </div>

                <!-- Tags -->
                <div v-if="blog.tags && blog.tags.length > 0" class="blog-tags">
                  <span
                    v-for="tag in blog.tags.slice(0, 3)"
                    :key="tag.id"
                    class="tag"
                  >
                    #{{ tag.name }}
                  </span>
                  <span v-if="blog.tags.length > 3" class="tag-more">
                    +{{ blog.tags.length - 3 }}
                  </span>
                </div>

                <!-- Read More Button -->
                <q-btn
                  color="white"
                  text-color="primary"
                  label="Read Full Article"
                  class="read-more-btn"
                  @click="navigateToBlog(blog.slug)"
                  size="lg"
                  rounded
                >
                  <q-icon name="arrow_forward" class="q-ml-sm" />
                </q-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <div class="carousel-nav">
          <q-btn
            round
            color="white"
            icon="chevron_left"
            size="lg"
            class="nav-btn prev-btn"
            @click="previousSlide"
          />
          <q-btn
            round
            color="white"
            icon="chevron_right"
            size="lg"
            class="nav-btn next-btn"
            @click="nextSlide"
          />
        </div>

        <!-- Slide Indicators -->
        <div class="slide-indicators">
          <div
            v-for="(blog, index) in blogs"
            :key="blog.id"
            class="indicator"
            :class="{ active: currentIndex === index }"
            @click="goToSlide(index)"
          ></div>
        </div>

        <!-- Slide Counter -->
        <div class="slide-counter">
          <span class="current">{{ currentIndex + 1 }}</span>
          <span class="separator">/</span>
          <span class="total">{{ blogs.length }}</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <q-icon name="article" size="48px" color="grey-4" />
        </div>
        <h3>No blog posts available</h3>
        <p>Check back soon for new content!</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import BLOGAPI from "@/api/blog";

// TypeScript interfaces
interface Author {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  author: Author;
  category: Category;
  tags: Tag[];
  excerpt: string;
  featured_image_url: string;
  is_featured: boolean;
  views: number;
  published_at: string;
}

const router = useRouter();
const blogs = ref<Blog[] | null>(null);
const loading = ref(true);
const currentIndex = ref(0);
const carouselRef = ref<HTMLElement | null>(null);
let autoPlayInterval: NodeJS.Timeout | null = null;

onMounted(async () => {
  try {
    const allBlogs = await BLOGAPI.fetchBlogs();
    blogs.value = allBlogs.slice(0, 6);
    startAutoPlay();
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
});

// Utility functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const navigateToBlog = (slug: string): void => {
  router.push({ name: "blog-detail-page", params: { blogSlug: slug } });
};

const navigateToBlogs = (): void => {
  router.push({ name: "blog-list" });
};

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement;
  target.src = "/placeholder-image.jpg";
};

// Carousel navigation
const nextSlide = (): void => {
  if (blogs.value) {
    currentIndex.value = (currentIndex.value + 1) % blogs.value.length;
  }
};

const previousSlide = (): void => {
  if (blogs.value) {
    currentIndex.value =
      currentIndex.value === 0
        ? blogs.value.length - 1
        : currentIndex.value - 1;
  }
};

const goToSlide = (index: number): void => {
  currentIndex.value = index;
};

// Auto-play functionality
const startAutoPlay = (): void => {
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
};

const stopAutoPlay = (): void => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

// Pause auto-play on hover
const pauseAutoPlay = (): void => {
  stopAutoPlay();
};

const resumeAutoPlay = (): void => {
  startAutoPlay();
};
</script>

<style lang="scss" scoped>
.landing-blogs-section {
  padding: 0;
  background: #000;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.container {
  max-width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}

.section-header {
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  .header-content {
    flex: 1;

    .section-title {
      font-size: 3rem;
      font-weight: 800;
      color: white;
      margin-bottom: 0.5rem;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .section-subtitle {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.9);
      max-width: 500px;
      line-height: 1.6;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }
  }

  .header-actions {
    .view-all-btn {
      font-weight: 600;
      text-transform: none;
      border-radius: 25px;
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      }
    }
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #000;

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.blog-carousel-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.blog-carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.blog-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;

  .slide-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s ease;
    }

    .background-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.6) 50%,
        rgba(0, 0, 0, 0.8) 100%
      );
    }
  }

  .slide-content {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 800px;
    padding: 0 2rem;
    text-align: center;
    color: white;

    .content-wrapper {
      animation: slideInUp 0.8s ease-out;
    }

    .featured-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #ff6b6b, #ee5a24);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
    }

    .blog-category {
      margin-bottom: 1rem;

      span {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
      }
    }

    .blog-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .blog-excerpt {
      font-size: 1.3rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .blog-meta {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: rgba(255, 255, 255, 0.8);
        font-size: 1rem;
        background: rgba(255, 255, 255, 0.1);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }

    .blog-tags {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 2.5rem;

      .tag {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }
      }

      .tag-more {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.7);
        padding: 0.5rem 1rem;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }

    .read-more-btn {
      font-weight: 600;
      text-transform: none;
      border-radius: 30px;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);

      &:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: translateY(-3px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
      }
    }
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  z-index: 15;
  pointer-events: none;

  .nav-btn {
    position: absolute;
    pointer-events: all;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
    }

    &.prev-btn {
      left: 2rem;
    }

    &.next-btn {
      right: 2rem;
    }
  }
}

.slide-indicators {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 15;

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    &.active {
      background: white;
      transform: scale(1.2);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
  }
}

.slide-counter {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  z-index: 15;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);

  .current {
    color: #667eea;
  }

  .separator {
    margin: 0 0.5rem;
    opacity: 0.7;
  }

  .total {
    opacity: 0.7;
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .empty-icon {
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 2rem;
    color: white;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .section-header {
    top: 1rem;
    left: 1rem;
    right: 1rem;
    flex-direction: column;
    gap: 1rem;

    .header-content {
      .section-title {
        font-size: 2rem;
      }

      .section-subtitle {
        font-size: 1rem;
      }
    }
  }

  .blog-slide {
    .slide-content {
      padding: 0 1rem;

      .blog-title {
        font-size: 2.5rem;
      }

      .blog-excerpt {
        font-size: 1.1rem;
      }

      .blog-meta {
        gap: 1rem;

        .meta-item {
          font-size: 0.9rem;
          padding: 0.4rem 0.8rem;
        }
      }
    }
  }

  .carousel-nav {
    .nav-btn {
      &.prev-btn {
        left: 1rem;
      }

      &.next-btn {
        right: 1rem;
      }
    }
  }

  .slide-counter {
    bottom: 1rem;
    right: 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .blog-slide {
    .slide-content {
      .blog-title {
        font-size: 2rem;
      }

      .blog-excerpt {
        font-size: 1rem;
      }

      .blog-meta {
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
      }

      .read-more-btn {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
      }
    }
  }

  .slide-indicators {
    bottom: 2rem;
    gap: 0.5rem;

    .indicator {
      width: 10px;
      height: 10px;
    }
  }
}
</style>
