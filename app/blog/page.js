"use client";

import { useState, useEffect } from "react";
import { Search, Calendar, User, BookOpen, Zap } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://achal-backend-trial.tannis.in/api/blogs/public");
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

  return (
    <div className="w-full bg-white overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .playfair { font-family: 'Playfair Display', serif; }

        /* Ticker */
        .ticker-inner { display: flex; animation: ticker 28s linear infinite; white-space: nowrap; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* Blog card hover */
        .blog-card { transition: transform .3s, box-shadow .3s; }
        .blog-card:hover { transform: translateY(-6px); }
        .blog-card img { transition: transform .7s, filter .7s; filter: saturate(.4); }
        .blog-card:hover img { transform: scale(1.06); filter: saturate(.75); }

        /* Arrow animation */
        .read-arrow { transition: transform .3s; display: inline-block; }
        .blog-card:hover .read-arrow { transform: translateX(5px); }

        /* Search focus */
        .search-input:focus { outline: none; border-color: #c8a96e; box-shadow: 0 0 0 3px rgba(200,169,110,.15); }

        /* Slide label pop */
        @keyframes slidePopOut {
          from { opacity: 0; transform: scale(0.5) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative px-6 md:px-16 pt-24 pb-20 bg-slate-900 overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle,rgba(200,169,110,.35) 0%,transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 pointer-events-none opacity-10"
          style={{ background: "radial-gradient(circle,rgba(200,169,110,.5) 0%,transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto relative">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-6 h-px bg-amber-600" />
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Insights & Stories</span>
          </div>

          <h1 className="playfair text-5xl md:text-7xl font-black leading-tight text-white mb-6">
            Explore Our<br />
            <span className="text-amber-600">Latest Articles</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mb-14 font-light leading-relaxed">
            Discover industry insights, expert tips, and inspiring stories about logistics, technology, and innovation.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input w-full pl-12 pr-6 py-4 bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm tracking-wide transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-slate-900 py-3.5 overflow-hidden border-t border-amber-800/30">
        <div className="ticker-inner">
          {[...Array(2)].flatMap(() => [
            { label: "Years of Excellence", value: "12+" },
            { label: "Projects Delivered", value: "500+" },
            { label: "Clients Served", value: "4,000+" },
            { label: "Industry Verticals", value: "5" },
            { label: "Civil · Parking · Hospitality · Cargo · EV", value: "" },
            { label: "Registered in Bihar, India", value: "" },
          ]).map((item, i) => (
            <div key={i} className="px-12 text-xs tracking-widest text-white/60 uppercase border-r border-white/15 flex-shrink-0 py-1">
              {item.value && <strong className="text-amber-600 font-semibold">{item.value} </strong>}
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── BLOG GRID ── */}
      <section className="px-6 md:px-16 py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Results label */}
          {!loading && (
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="block w-6 h-px bg-amber-600" />
                  <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Our Blog</span>
                </div>
                <h2 className="playfair text-3xl md:text-4xl font-bold text-slate-900">
                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : "All Articles"}
                </h2>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs tracking-widest uppercase text-amber-700 border border-amber-700/40 px-5 py-2.5 hover:border-amber-700 transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* Loading Skeletons */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-50">
                  <div className="h-64 bg-gray-200" />
                  <div className="p-8">
                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-5 bg-gray-200 rounded w-1/2 mb-6" />
                    <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
              {filteredBlogs.map((blog, index) => (
                <a key={blog.id} href={`/blog/${blog.slug}`} className="block group">
                  <div className="blog-card bg-white border border-gray-100 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-slate-900">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.headline}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-white/10" />
                        </div>
                      )}
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top,rgba(10,22,40,.85) 0%,rgba(10,22,40,.1) 60%)" }}
                      />
                      {/* Index number */}
                      <div className="absolute top-5 left-5 playfair text-5xl font-black text-white/10 leading-none select-none">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      {/* Tag */}
                      <div className="absolute bottom-5 left-5">
                        <span className="text-xs tracking-widest uppercase text-amber-600 font-semibold">Featured</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-gray-400 tracking-wide uppercase mb-4">
                        {blog.author && (
                          <span className="flex items-center gap-1.5">
                            <User className="w-3 h-3" />
                            {blog.author}
                          </span>
                        )}
                        {blog.publishedAt && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {formatDate(blog.publishedAt)}
                          </span>
                        )}
                      </div>

                      {/* Headline */}
                      <h3 className="playfair text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-amber-800 transition-colors line-clamp-2 flex-1">
                        {blog.headline}
                      </h3>

                      {/* Excerpt */}
                      {blog.excerpt && (
                        <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2">
                          {blog.excerpt}
                        </p>
                      )}

                      {/* Read More */}
                      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                        <span className="text-xs tracking-widest uppercase text-amber-700 font-semibold">Read Article</span>
                        <span className="read-arrow text-amber-700 text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-28 border border-gray-100">
              <div className="playfair text-8xl font-black text-gray-100 mb-6 select-none">?</div>
              <div className="flex items-center gap-3 justify-center mb-4">
                <span className="block w-6 h-px bg-amber-600" />
                <Zap className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">No Results</span>
                <span className="block w-6 h-px bg-amber-600" />
              </div>
              <h3 className="playfair text-3xl font-bold text-slate-900 mb-3">No Articles Found</h3>
              <p className="text-gray-500 mb-8 text-sm">
                {searchQuery
                  ? "Try adjusting your search query."
                  : "Check back soon for new content!"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-10 py-3.5 bg-amber-600 text-blue-950 font-semibold text-xs tracking-widest uppercase hover:bg-amber-700 transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA / NEWSLETTER ── */}
      <section className="relative px-6 md:px-16 py-24 md:py-32 bg-amber-50 overflow-hidden">
        {/* Decorative number */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 playfair text-[200px] font-black text-amber-100 leading-none select-none pointer-events-none hidden lg:block">
          &amp;
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-6 h-px bg-amber-600" />
              <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Stay Updated</span>
            </div>
            <h2 className="playfair text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Never Miss an<br />Important Update
            </h2>
            <p className="text-base text-gray-600 mb-10 leading-relaxed">
              Subscribe to our newsletter and get industry insights, project updates, and expert commentary delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="search-input flex-1 px-6 py-4 bg-white border border-gray-200 text-slate-900 placeholder-gray-400 text-sm transition-all"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <button className="px-10 py-4 bg-slate-900 text-white font-semibold text-xs tracking-widest uppercase hover:bg-amber-700 transition-colors cursor-pointer whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}