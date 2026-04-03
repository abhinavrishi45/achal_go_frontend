"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, Share2, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/blogs/slug/${params.slug}`
      );
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
        // Fetch related blogs
        fetchRelatedBlogs();
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs/public");
      if (response.ok) {
        const data = await response.json();
        setRelatedBlogs(data.filter((b) => b.slug !== params.slug).slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const copyToClipboard = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Back Button */}
      {/* <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>
        </div>
      </div> */}

      {/* Article Content */}
      <article className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block mt-20 bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Featured Article
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.headline}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-8 border-b-2 border-gray-100">
              {blog.author && (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-900" />
                  <span className="font-medium">{blog.author}</span>
                </div>
              )}
              {blog.publishedAt && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-900" />
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>
              )}
              <button
                onClick={copyToClipboard}
                className="ml-auto flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                title="Copy link"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={blog.image}
                alt={blog.headline}
                className="w-full h-[500px] object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {/* Excerpt Highlight */}
            {blog.excerpt && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-900 p-6 rounded-lg mb-8 italic text-lg text-gray-700">
                "{blog.excerpt}"
              </div>
            )}

            {/* Main Content */}
            <div className="text-gray-700 leading-relaxed space-y-6">
              {blog.content ? (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              ) : (
                <p>
                  Full article content will appear here. The blog system supports
                  HTML and Markdown content.
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 border-b-2 border-gray-100"></div>

          {/* Author Card */}
          <div className="bg-white rounded-xl border-2 border-gray-100 p-8 mb-12 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  About the Author
                </h3>
                <p className="text-gray-600">
                  {blog.author || "Our Expert Team"}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-900 rounded-full"></div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.slug}`}
                  >
                    <div className="group cursor-pointer">
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                        <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-900 overflow-hidden">
                          {relatedBlog.image ? (
                            <img
                              src={relatedBlog.image}
                              alt={relatedBlog.headline}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-500">
                              <span className="text-white/20 text-4xl font-bold">
                                Blog
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-900 transition-colors">
                            {relatedBlog.headline}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2 line-clamp-1">
                            {formatDate(relatedBlog.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">
              Want to stay updated with more insights?
            </h3>
            <p className="mb-6 text-blue-100">
              Subscribe to our newsletter for the latest articles and industry
              news.
            </p>
            {/* <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors">
              Subscribe Now
            </button> */}
          </div>
        </div>
      </article>
    </div>
  );
}
