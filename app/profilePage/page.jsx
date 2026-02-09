"use client";

import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { profileUser, userPosts, aboutInfo, photos } from "./data";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState(userPosts);
  const [isFollowing, setIsFollowing] = useState(profileUser.isFollowing);

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

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      {/* Profile Header */}
      <section className="w-full">
        {/* Cover Photo */}
        <div className="w-full h-64 bg-zinc-900 relative">
          <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-15">
            🏔️
          </div>
        </div>

        {/* Profile Info */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="relative -mt-20 pb-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-5xl border-4 border-white shadow-sm mb-4 text-white dark:border-zinc-950">
              {profileUser.avatar}
            </div>

            {/* Profile Details */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{profileUser.name}</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">@{profileUser.username}</p>
                {profileUser.bio && (
                  <p className="text-zinc-700 dark:text-zinc-300 mb-2 max-w-2xl">{profileUser.bio}</p>
                )}
                <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {profileUser.location && (
                    <span className="flex items-center gap-1">📍 {profileUser.location}</span>
                  )}
                  {profileUser.website && (
                    <a href={profileUser.website} className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline">
                      🔗 {profileUser.website}
                    </a>
                  )}
                  <span className="flex items-center gap-1">📅 Joined {profileUser.joinDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {profileUser.isOwnProfile ? (
                  <Button
                    label="Edit Profile"
                    className="px-6 py-2 rounded-2xl border-2 border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    outlined
                  />
                ) : (
                  <>
                    <Button
                      label={isFollowing ? "Following" : "Follow"}
                      className={`px-6 py-2 ${
                        isFollowing
                          ? "rounded-2xl bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                          : "rounded-2xl bg-indigo-600 text-white border-none hover:bg-indigo-500"
                      }`}
                      onClick={handleFollow}
                    />
                    <Button
                      label="Message"
                      className="px-6 py-2 rounded-2xl border-2 border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                      outlined
                    />
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{profileUser.stats.posts}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{profileUser.stats.followers}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{profileUser.stats.following}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Following</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("posts")}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === "posts"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === "about"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === "photos"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              Photos
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Posts Tab */}
          {activeTab === "posts" && (
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
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-8 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">About</h2>
              <div className="space-y-6">
                {aboutInfo.education && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Education</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{aboutInfo.education}</p>
                  </div>
                )}
                {aboutInfo.work && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Work</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{aboutInfo.work}</p>
                  </div>
                )}
                {aboutInfo.location && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Location</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{aboutInfo.location}</p>
                  </div>
                )}
                {aboutInfo.birthday && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Birthday</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{aboutInfo.birthday}</p>
                  </div>
                )}
                {aboutInfo.joined && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Joined</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{aboutInfo.joined}</p>
                  </div>
                )}
                {aboutInfo.interests && aboutInfo.interests.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {aboutInfo.interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-full text-sm border border-zinc-200 dark:border-zinc-700"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === "photos" && (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-4xl hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    📷
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
