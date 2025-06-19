<template>
  <div class="blog-list-page">
    <div class="container">
      <!-- Header Section -->
      <div class="header-section">
        <h1 class="page-title">Latest Blog Posts</h1>
        <p class="page-subtitle">
          Discover the latest trends and insights in Nepali jewelry and fashion
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading blog posts...</p>
      </div>

      <!-- Blog Grid -->
      <div v-else-if="blogs && blogs.length > 0" class="blog-grid">
        <article
          v-for="blog in blogs"
          :key="blog.id"
          class="blog-card"
          @click="navigateToBlog(blog.slug)"
        >
          <!-- Featured Badge -->
          <div v-if="blog.is_featured" class="featured-badge">
            <span>Featured</span>
          </div>

          <!-- Blog Image -->
          <div class="blog-image">
            <img
              :src="blog.featured_image_url"
              :alt="blog.title"
              @error="handleImageError"
            />
          </div>

          <!-- Blog Content -->
          <div class="blog-content">
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
                <svg class="meta-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
                <span>{{ formatDate(blog.published_at) }}</span>
              </div>

              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
                <span>{{ blog.author.username }}</span>
              </div>

              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  />
                </svg>
                <span>{{ blog.views }} views</span>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="blog.tags && blog.tags.length > 0" class="blog-tags">
              <span v-for="tag in blog.tags" :key="tag.id" class="tag">
                #{{ tag.name }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
            />
          </svg>
        </div>
        <h3>No blog posts found</h3>
        <p>Check back later for new content!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  onBeforeMount,
  onMounted,
  ref,
  watch,
  type Ref,
  type PropType,
} from "vue";
import BLOGAPI from "@/api/blog";
import { useRouter } from "vue-router";
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

const $router = useRouter();
const blogs: Ref<Blog[] | null> = ref(null);
const loading = ref(true);

onMounted(async (): Promise<void> => {
  try {
    blogs.value = await BLOGAPI.fetchBlogs();
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    loading.value = false;
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
  // Navigate to individual blog post
  // You can implement this based on your routing setup
  console.log("Navigating to blog:", slug);
  $router.push({ name: "blog-detail-page", params: { blogSlug: slug } });
};

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement;
  target.src = "/placeholder-image.jpg"; // Fallback image
};
</script>

<style lang="scss" scoped>
.blog-list-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .page-subtitle {
    font-size: 1.1rem;
    color: #718096;
    max-width: 600px;
    margin: 0 auto;
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  p {
    color: #718096;
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

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .featured-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    z-index: 2;
  }

  .blog-image {
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover .blog-image img {
    transform: scale(1.05);
  }

  .blog-content {
    padding: 1.5rem;
  }

  .blog-category {
    margin-bottom: 0.75rem;

    span {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  .blog-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.75rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .blog-excerpt {
    color: #718096;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .blog-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: #a0aec0;
      font-size: 0.85rem;

      .meta-icon {
        width: 16px;
        height: 16px;
      }
    }
  }

  .blog-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .tag {
      background: #f7fafc;
      color: #4a5568;
      padding: 0.25rem 0.5rem;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 500;
      border: 1px solid #e2e8f0;

      &:hover {
        background: #edf2f7;
      }
    }
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;

  .empty-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    color: #cbd5e0;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  p {
    color: #718096;
    font-size: 1.1rem;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .container {
    padding: 0 0.75rem;
  }

  .header-section {
    margin-bottom: 2rem;

    .page-title {
      font-size: 2rem;
    }

    .page-subtitle {
      font-size: 1rem;
    }
  }

  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .blog-card {
    .blog-content {
      padding: 1.25rem;
    }

    .blog-title {
      font-size: 1.1rem;
    }
  }
}

@media (max-width: 480px) {
  .blog-list-page {
    padding: 1rem 0;
  }

  .header-section {
    .page-title {
      font-size: 1.75rem;
    }
  }

  .blog-card {
    .blog-image {
      height: 180px;
    }

    .blog-content {
      padding: 1rem;
    }

    .blog-meta {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>
