"use client";

import { useEffect, useMemo, useState } from "react";
import { initialPosts } from "./data";

const categories = [
  "All",
  "Sports",
  "Tech",
  "Movies",
  "Travel",
  "Gaming",
  "Music",
];

const ExplorePage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const categorizedPosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      category:
        post.id % 3 === 0 ? "Tech" : post.id % 3 === 1 ? "Sports" : "Movies",
    }));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return categorizedPosts.filter((post) => {
      const matchesSearch =
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [categorizedPosts, searchQuery, selectedCategory]);

  return (
    <section className="w-full px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search Bar Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Explore 🔍
          </h2>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts, users, hashtags..."
            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
          />
        </div>

        {/* Category Filters Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl font-semibold text-sm transition-colors ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Posts Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Trending Posts 🔥
          </h3>

          {filteredPosts.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              No posts found 😢
            </p>
          ) : (
            <div className="columns-1 sm:columns-2 gap-6 space-y-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="break-inside-avoid bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-zinc-900 dark:text-zinc-100">
                        {post.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        @{post.username} · {post.time}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300">
                      {post.category}
                    </span>
                  </div>

                  <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed mb-4">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                        post.liked
                          ? "text-indigo-600 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-950/40"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <span className="text-lg">
                        {post.liked ? "❤️" : "🤍"}
                      </span>
                      <span className="font-semibold text-sm">
                        {post.likes}
                      </span>
                    </button>

                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      💬 <span className="font-semibold">{post.comments}</span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      🔗 <span className="font-semibold">{post.shares}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExplorePage;
