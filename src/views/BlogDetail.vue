<template>
  <div class="blog-detail-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <q-spinner-dots size="50px" color="primary" />
      <p class="text-grey-6 q-mt-md">Loading blog post...</p>
    </div>

    <!-- Blog Content -->
    <div v-else-if="blogDetail" class="blog-content">
      <!-- Header Section -->
      <div class="blog-header">
        <div class="container">
          <!-- Breadcrumb -->
          <div class="breadcrumb q-mb-md">
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" to="/" />
              <q-breadcrumbs-el label="Blog" to="/blog" />
              <q-breadcrumbs-el :label="blogDetail.title" />
            </q-breadcrumbs>
          </div>

          <!-- Title -->
          <h1 class="blog-title">{{ blogDetail.title }}</h1>

          <!-- Meta Information -->
          <div class="blog-meta">
            <div class="meta-item">
              <q-icon name="person" size="16px" class="q-mr-xs" />
              <span>{{ blogDetail.author.username }}</span>
            </div>
            <div class="meta-item">
              <q-icon name="category" size="16px" class="q-mr-xs" />
              <q-chip
                :label="blogDetail.category.name"
                size="sm"
                color="primary"
                text-color="white"
                :to="`/category/${blogDetail.category.slug}`"
              />
            </div>
            <div class="meta-item">
              <q-icon name="schedule" size="16px" class="q-mr-xs" />
              <span>{{ formatDate(blogDetail.published_at) }}</span>
            </div>
            <div class="meta-item">
              <q-icon name="visibility" size="16px" class="q-mr-xs" />
              <span>{{ blogDetail.views }} views</span>
            </div>
          </div>

          <!-- Tags -->
          <div
            v-if="blogDetail.tags && blogDetail.tags.length"
            class="blog-tags q-mt-md"
          >
            <q-chip
              v-for="tag in blogDetail.tags"
              :key="tag.id"
              :label="tag.name"
              size="sm"
              color="grey-3"
              text-color="grey-8"
              :to="`/tag/${tag.slug}`"
              class="q-mr-sm q-mb-sm"
            />
          </div>
        </div>
      </div>

      <!-- Featured Image -->
      <div
        v-if="blogDetail.featured_image_url"
        class="featured-image-container"
      >
        <div class="container">
          <q-img
            :src="blogDetail.featured_image_url"
            :alt="blogDetail.title"
            class="featured-image"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>
      </div>

      <!-- Main Content -->
      <div class="blog-main-content">
        <div class="container">
          <div class="content-wrapper">
            <!-- Article Content -->
            <div class="article-content">
              <div class="ckeditor-content" v-html="blogDetail.content"></div>
            </div>

            <!-- Sidebar -->
            <div class="sidebar">
              <!-- Author Info -->
              <q-card class="author-card q-mb-lg">
                <q-card-section>
                  <div class="text-h6 q-mb-md">About the Author</div>
                  <div class="author-info">
                    <q-avatar
                      size="60px"
                      color="primary"
                      text-color="white"
                      class="q-mb-md"
                    >
                      {{ blogDetail.author.username.charAt(0).toUpperCase() }}
                    </q-avatar>
                    <div class="author-details">
                      <div class="author-name">
                        {{ blogDetail.author.username }}
                      </div>
                      <div class="author-bio text-grey-6">
                        {{
                          blogDetail.author.first_name ||
                          blogDetail.author.last_name ||
                          "Blog contributor"
                        }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>

              <!-- Related Posts -->
              <q-card
                v-if="
                  blogDetail.related_posts && blogDetail.related_posts.length
                "
                class="related-posts"
              >
                <q-card-section>
                  <div class="text-h6 q-mb-md">Related Posts</div>
                  <div
                    class="related-post-item q-mb-md"
                    v-for="post in blogDetail.related_posts"
                    :key="post.id"
                  >
                    <q-item clickable :to="`/blog/${post.slug}`">
                      <q-item-section avatar>
                        <q-img
                          v-if="post.featured_image_url"
                          :src="post.featured_image_url"
                          :alt="post.title"
                          width="60px"
                          height="60px"
                          class="rounded-borders"
                        />
                        <q-avatar v-else color="grey-3" text-color="grey-8">
                          <q-icon name="article" />
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-weight-medium">{{
                          post.title
                        }}</q-item-label>
                        <q-item-label caption>{{
                          formatDate(post.published_at)
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="error-container">
      <q-icon name="error" size="64px" color="negative" />
      <h3 class="text-negative q-mt-md">Blog post not found</h3>
      <p class="text-grey-6">
        The blog post you're looking for doesn't exist or has been removed.
      </p>
      <q-btn label="Go Back Home" color="primary" to="/" class="q-mt-md" />
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
import { useRoute } from "vue-router";
import { useMeta } from "quasar";
import BLOGAPI from "@/api/blog";

const $route = useRoute();

const blogSlug: any = ref(null);
const blogDetail: any = ref(null);
const loading = ref(true);
const error = ref(false);

// Meta tags for SEO
const metaTitle = computed(() => {
  const title =
    blogDetail.value?.meta_title || blogDetail.value?.title || "Blog Post";
  return sanitizeMetaContent(title);
});

const metaDescription = computed(() => {
  const description =
    blogDetail.value?.meta_description ||
    blogDetail.value?.excerpt ||
    "Read our latest blog post";
  return sanitizeMetaContent(description);
});

// Sanitize meta content to prevent invalid characters
const sanitizeMetaContent = (content: string) => {
  if (!content) return "";

  return content
    .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII characters
    .replace(/[<>]/g, "") // Remove HTML tags
    .replace(/&/g, "&amp;") // Escape ampersands
    .replace(/"/g, "&quot;") // Escape quotes
    .replace(/'/g, "&#39;") // Escape single quotes
    .trim()
    .substring(0, 160); // Limit length for meta description
};

useMeta(() => ({
  title: metaTitle.value,
  meta: {
    description: { name: "description", content: metaDescription.value },
    "og:title": { property: "og:title", content: metaTitle.value },
    "og:description": {
      property: "og:description",
      content: metaDescription.value,
    },
    "og:image": {
      property: "og:image",
      content: blogDetail.value?.featured_image_url || "",
    },
    "og:type": { property: "og:type", content: "article" },
    "twitter:card": { name: "twitter:card", content: "summary_large_image" },
    "twitter:title": { name: "twitter:title", content: metaTitle.value },
    "twitter:description": {
      name: "twitter:description",
      content: metaDescription.value,
    },
    "twitter:image": {
      name: "twitter:image",
      content: blogDetail.value?.featured_image_url || "",
    },
  },
}));

// Format date function
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Fetch blog detail
const fetchBlogDetail = async () => {
  try {
    loading.value = true;
    error.value = false;
    blogSlug.value = $route.params.blogSlug;
    blogDetail.value = await BLOGAPI.fetchBlogDetail(blogSlug.value);
  } catch (err) {
    console.error("Error fetching blog detail:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

// Watch for route changes
watch(
  () => $route.params.blogSlug,
  () => {
    if ($route.params.blogSlug) {
      fetchBlogDetail();
    }
  }
);

onMounted(async (): Promise<void> => {
  await fetchBlogDetail();
});
</script>

<style lang="scss" scoped>
.blog-detail-container {
  min-height: 100vh;
  background-color: #fafafa;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.blog-header {
  background: white;
  padding: 3rem 0 2rem;
  border-bottom: 1px solid #e0e0e0;

  .blog-title {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    color: #1a1a1a;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .blog-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 1rem;

    .meta-item {
      display: flex;
      align-items: center;
      color: #666;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      gap: 1rem;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .blog-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

.featured-image-container {
  background: white;
  padding: 2rem 0;

  .featured-image {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
}

.blog-main-content {
  padding: 3rem 0;

  .content-wrapper {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .article-content {
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  }

  .sidebar {
    @media (max-width: 1024px) {
      order: -1;
    }
  }
}

// CKEditor Content Styling
:deep(.ckeditor-content) {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;

  // Headings
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  h1 {
    font-size: 2rem;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  // Paragraphs
  p {
    margin-bottom: 1.5rem;
  }

  // Lists
  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  // Links
  a {
    color: #1976d2;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s ease;

    &:hover {
      border-bottom-color: #1976d2;
    }
  }

  // Strong text
  strong {
    font-weight: 600;
    color: #1a1a1a;
  }

  // Tables
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #1a1a1a;
    }

    tr:hover {
      background-color: #fafafa;
    }
  }

  // Blockquotes
  blockquote {
    border-left: 4px solid #1976d2;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #666;
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 0 8px 8px 0;
  }

  // Horizontal rules
  hr {
    border: none;
    height: 1px;
    background-color: #e0e0e0;
    margin: 2rem 0;
  }

  // Images
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  // Code blocks
  pre {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;

    code {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
    }
  }

  // Inline code
  code {
    background-color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: "Courier New", monospace;
    font-size: 0.9rem;
  }
}

.author-card {
  .author-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  .author-name {
    font-weight: 600;
    font-size: 1.1rem;
    color: #1a1a1a;
    margin-bottom: 0.25rem;
  }

  .author-bio {
    font-size: 0.9rem;
  }
}

.related-posts {
  .related-post-item {
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      border-bottom: none;
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .blog-header {
    padding: 2rem 0 1.5rem;
  }

  .blog-main-content {
    padding: 2rem 0;
  }

  .featured-image-container {
    padding: 1rem 0;
  }
}
</style>
