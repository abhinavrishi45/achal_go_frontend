// Force this blog post page to be dynamic at runtime (server-rendered)
export const dynamic = "force-dynamic";
import { API_BASE } from '@/lib/api';

export default async function BlogPostPage({ params }) {
  const slug = params?.slug;
  let blog = null;
  let relatedBlogs = [];

  try {
    const res = await fetch(`${API_BASE}/api/blogs/slug/${slug}`);
    if (res.ok) {
      const contentType = String(res.headers.get("content-type") || "").toLowerCase();
      if (contentType.includes("application/json") || contentType.includes("/json")) {
        try {
          blog = await res.json();
        } catch (err) {
          console.error("Error parsing blog JSON, using fallback:", err);
        }
      } else {
        const txt = await res.text();
        console.warn("Blog detail: non-JSON response, ignoring and using fallback:", txt);
      }
    }
  } catch (e) {
    console.error("Error fetching blog on server:", e);
  }

  try {
    const r = await fetch(`${API_BASE}/api/blogs/public`);
    if (r.ok) {
      const contentType = String(r.headers.get("content-type") || "").toLowerCase();
      if (contentType.includes("application/json") || contentType.includes("/json")) {
        try {
          const all = await r.json();
          if (Array.isArray(all)) {
            relatedBlogs = all.filter((b) => b.slug !== slug).slice(0, 3);
          }
        } catch (err) {
          console.error("Error parsing related blogs JSON, skipping related list:", err);
        }
      } else {
        const txt = await r.text();
        console.warn("Related blogs: non-JSON response, ignoring:", txt);
      }
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

  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "Unknown";

  return (
    <main className="min-h-screen bg-white">
      {/* Hero / Header */}
      <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3a6b] text-white pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <a href="/blog" className="inline-block mb-6 text-[#c8a96e] hover:text-[#b8954a] text-sm font-semibold">
            ← Back to Blog
          </a>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{blog.headline || "Blog Post"}</h1>
          <p className="text-lg text-gray-300 mb-4">{blog.excerpt || ""}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{blog.author || "Admin"}</span>
            <span>•</span>
            <span>{publishedDate}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.image && (
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8 mb-8">
          <img
            src={blog.image}
            alt={blog.headline}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <article
          className="prose prose-lg max-w-none font-[DM_Sans,sans-serif] text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />
      </div>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div className="bg-[#f5f3ef] py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-serif text-[#0a1628] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  {post.image && (
                    <img src={post.image} alt={post.headline} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-[#0a1628] mb-2 line-clamp-2">{post.headline}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
