import BlogPostClient from "../../../components/blog/BlogPostClient";

// Provide static params so `output: export` can include generated pages.
export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:5000/api/blogs/public");
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((b) => ({ slug: b.slug }));
  } catch (e) {
    console.error("generateStaticParams error:", e);
    return [];
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

  return <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} slug={slug} />;
}
