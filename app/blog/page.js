"use client";

import { useState, useEffect } from "react";
import { Search, Calendar, User, ArrowRight, BookOpen, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/blogs/public");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
        setFilteredBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let results = blogs;

    if (searchQuery) {
      results = results.filter(
        (blog) =>
          blog.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(results);
  }, [searchQuery, blogs]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPlaceholderImage = (index) => {
    const colors = [
      "from-orange-400 to-red-500",
      "from-blue-400 to-cyan-500",
      "from-purple-400 to-pink-500",
      "from-green-400 to-emerald-500",
      "from-yellow-400 to-orange-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text mb-4">
              <BookOpen className="w-5 h-5 text-blue-900" />
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
                INSIGHTS & STORIES
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Explore Our <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">Latest Articles</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Discover industry insights, expert tips, and inspiring stories about logistics, technology, and innovation.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-500 shadow-lg bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <div className="group h-full cursor-pointer">
                    {/* Card Container */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                      {/* Image Section */}
                      <div className={`relative h-64 bg-gradient-to-br ${getPlaceholderImage(index)} overflow-hidden`}>
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.headline}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-white/30" />
                          </div>
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            Featured
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Headline */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-900 transition-colors">
                          {blog.headline}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                          {blog.excerpt || "Interesting content awaits you..."}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            {blog.author && (
                              <div className="flex items-center space-x-1">
                                <User className="w-3.5 h-3.5" />
                                <span>{blog.author}</span>
                              </div>
                            )}
                            {blog.publishedAt && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDate(blog.publishedAt)}</span>
                              </div>
                            )}
                          </div>

                          {/* Read More Arrow */}
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-900 transition-colors">
                            <ArrowRight className="w-4 h-4 text-blue-900 group-hover:text-white transition-colors transform group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Zap className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? "Try adjusting your search query."
                  : "Check back soon for new content!"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  <span>Clear Search</span>
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay Updated with Our Latest News
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Subscribe to our newsletter and never miss an important update or industry insight.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-auto min-w-64"
            />
            {/* <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors whitespace-nowrap">
              Subscribe
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
}
