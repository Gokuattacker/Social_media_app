"use client";

import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { initialPosts, userProfile, suggestions } from "./data";

const FeedPage = () => {
  const [posts, setPosts] = useState(initialPosts);

  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        username: userProfile.username,
        name: userProfile.name,
        avatar: userProfile.avatar,
        time: "now",
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  return (
    <>
      {/* Main Feed Section */}
      <section className="w-full px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - User Profile */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center text-4xl text-white">
                      {userProfile.avatar}
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{userProfile.name}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">@{userProfile.username}</p>
                  </div>
                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-600 dark:text-zinc-400">Posts</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{userProfile.stats.posts}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-600 dark:text-zinc-400">Followers</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{userProfile.stats.followers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Following</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{userProfile.stats.following}</span>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 mt-6 border border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Suggestions</h4>
                  <div className="space-y-4">
                    {suggestions.map((user, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{user.username}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.description}</p>
                          </div>
                        </div>
                        <Button
                          label="Follow"
                          className="px-4 py-1 text-xs rounded-xl bg-indigo-600 text-white border-none hover:bg-indigo-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Center Feed */}
            <div className="lg:col-span-2">
              {/* Create Post */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 mb-6 border border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-2xl shrink-0 text-white">
                    {userProfile.avatar}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="What's on your mind?"
                      className="w-full p-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                      rows="3"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                          📷
                        </button>
                        <button className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                          🎥
                        </button>
                        <button className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                          😊
                        </button>
                      </div>
                      <Button
                        label="Post"
                        className="px-6 py-2 rounded-2xl bg-indigo-600 text-white border-none hover:bg-indigo-500"
                        onClick={handlePost}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts Feed */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                    {/* Post Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{post.name}</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">@{post.username} · {post.time}</p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-zinc-800 dark:text-zinc-200 mb-4 leading-relaxed">{post.content}</p>

                    {/* Post Actions */}
                    <div className="flex items-center gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          post.liked
                            ? "text-indigo-600 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-950/40"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        <span className="text-xl">{post.liked ? "❤️" : "🤍"}</span>
                        <span className="font-semibold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <span className="text-xl">💬</span>
                        <span className="font-semibold">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <span className="text-xl">🔗</span>
                        <span className="font-semibold">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeedPage;
