"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import type { Toast as ToastType } from "primereact/toast";

const CreatePostPage = () => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech");
  const categories = ["Sports", "Tech", "Movies", "Travel", "Gaming", "Music"];
  const [loading, setLoading] = useState(false);
  
  const toast = useRef<ToastType>(null);

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const handlePost = () => {
    if (!content.trim()) return;
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setContent("");
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Post created successfully!",
        life: 3000,
      });
    }, 1500);
  };

  return (
    <section className="w-full px-6 md:px-12 py-8 min-h-screen">
      <Toast ref={toast} />
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Create a New Post ✨
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                What's on your mind?
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, discoveries, or ask a question..."
                rows={6}
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100 resize-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${
                      category === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <Button
                disabled={loading || !content.trim()}
                onClick={handlePost}
                className={`w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 border-none text-white font-semibold py-3 md:py-4 flex justify-center shadow-md transition-all duration-200 ${
                  (!content.trim() || loading) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <i className="pi pi-spin pi-spinner" style={{ fontSize: "1.5rem" }}></i>
                ) : (
                  <span className="text-base md:text-lg flex items-center gap-2">
                    <i className="pi pi-send"></i> Publish Post
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePostPage;
