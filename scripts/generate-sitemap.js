const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const fs = require("fs");

// Define your routes
const routes = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/product", changefreq: "daily", priority: 0.9 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/faqs", changefreq: "monthly", priority: 0.7 },
  // Excluding checkout as it shouldn't be indexed
];

// Create sitemap
async function generateSitemap() {
  try {
    // Create a stream to write to
    const stream = new SitemapStream({ hostname: "https://themodishera.com" });

    // Return a promise that resolves with your XML string
    const data = await streamToPromise(Readable.from(routes).pipe(stream));

    // Write the file to disk
    fs.writeFileSync("./public/sitemap.xml", data.toString());

    console.log("Sitemap generated successfully!");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
}

// Run the generation
generateSitemap();
