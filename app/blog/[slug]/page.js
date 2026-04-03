import BlogPostClient from "../../../components/blog/BlogPostClient";

// Provide static params so `output: export` can include generated pages.
export async function generateStaticParams() {
  const fallback = [{ slug: "welcome-to-our-blog" }];
  const API_BASE = process.env.API_BASE || "http://localhost:5000";
  try {
    const res = await fetch(`${API_BASE}/api/blogs/public`);
    if (!res.ok) return fallback;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return fallback;
    return data.map((b) => ({ slug: b.slug }));
  } catch (e) {
    console.warn("generateStaticParams fetch failed, using fallback:", e);
    return fallback;
  }
}

export default async function BlogPostPage({ params }) {
  const slug = params?.slug;
  let blog = null;
  let relatedBlogs = [];

  try {
    const res = await fetch(`http://localhost:5000/api/blogs/slug/${slug}`);
    if (res.ok) {
      blog = await res.json();
    }
  } catch (e) {
    console.error("Error fetching blog on server:", e);
  }

  try {
    const r = await fetch("http://localhost:5000/api/blogs/public");
    if (r.ok) {
      const all = await r.json();
      relatedBlogs = all.filter((b) => b.slug !== slug).slice(0, 3);
    }
  } catch (e) {
    console.error("Error fetching related blogs on server:", e);
  }

  // Provide a minimal fallback blog so the page can render even when backend is down.
  const MOCK_BLOG = {
    id: "fallback",
    slug,
    headline: "Article Unavailable",
    content: "<p>This article is temporarily unavailable.</p>",
    excerpt: "Content unavailable at build time.",
    author: "Admin",
    publishedAt: new Date().toISOString(),
    image: "",
  };

  if (!blog) blog = { ...MOCK_BLOG, slug };

  return <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} slug={slug} />;
}
