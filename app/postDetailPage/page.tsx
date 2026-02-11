"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { useParams, useRouter } from "next/navigation";
import { initialPosts, userProfile, suggestions } from "./data";

interface Post {
  id: number;
  name: string;
  username: string;
  avatar: string;
  time: string;
  content: string;
  liked: boolean;
  likes: number;
  comments: number;
  shares: number;
}

interface Comment {
  id: number;
  username: string;
  avatar: string;
  text: string;
  time: string;
}

interface User {
  username: string;
  avatar: string;
  description?: string;
}

const PostDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const postId = parseInt(String(id || "0"));

  // Find selected post
  const selectedPost = initialPosts.find((post: Post) => post.id === postId);

  const [post, setPost] = useState<Post | undefined>(selectedPost);
  const [commentText, setCommentText] = useState("");

  // Dummy Comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: "john_doe",
      avatar: "👨",
      text: "This is really awesome 🔥",
      time: "2h",
    },
    {
      id: 2,
      username: "alex_queen",
      avatar: "👩",
      text: "Nice post bro 💯",
      time: "1h",
    },
  ]);

  if (!post) {
    return (
      <div className="text-center mt-20 text-xl font-bold text-red-500">
        Post Not Found ❌
      </div>
    );
  }

  const handleLike = () => {
    setPost((prev: Post | undefined) =>
      prev
        ? {
            ...prev,
            liked: !prev.liked,
            likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
          }
        : prev,
    );
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        username: userProfile.username,
        avatar: userProfile.avatar,
        text: commentText,
        time: "now",
      };

      setComments([newComment, ...comments]);
      setCommentText("");

      // Optional: update comment count
      setPost(
        (prev: Post | undefined) =>
          ({
            ...prev,
            comments: prev ? prev.comments + 1 : 1,
          }) as Post,
      );
    }
  };

  return (
    <section className="w-full px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center text-4xl text-white">
                    {userProfile.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {userProfile.name}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    @{userProfile.username}
                  </p>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 mt-6 border border-zinc-200 dark:border-zinc-800">
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                  Suggestions
                </h4>

                <div className="space-y-4">
                  {suggestions.map((user: User, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                            {user.username}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {user.description}
                          </p>
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

          {/* Main Post Detail */}
          <div className="lg:col-span-2 space-y-6">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              ⬅ Back to Feed
            </button>

            {/* Post Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
                  {post.avatar}
                </div>

                <div className="flex-1">
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100">
                    {post.name}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    @{post.username} · {post.time}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p className="text-zinc-800 dark:text-zinc-200 mb-4 leading-relaxed">
                {post.content}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    post.liked
                      ? "text-indigo-600 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-950/40"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="text-xl">{post.liked ? "❤️" : "🤍"}</span>
                  <span className="font-semibold">{post.likes}</span>
                </button>

                <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400">
                  <span className="text-xl">💬</span>
                  <span className="font-semibold">{post.comments}</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400">
                  <span className="text-xl">🔗</span>
                  <span className="font-semibold">{post.shares}</span>
                </div>
              </div>
            </div>

            {/* Add Comment Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                Comments
              </h3>

              <div className="flex gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-xl text-white">
                  {userProfile.avatar}
                </div>

                <div className="flex-1">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
                  />

                  <div className="flex justify-end mt-3">
                    <Button
                      label="Comment"
                      className="px-6 py-2 rounded-2xl bg-indigo-600 text-white border-none hover:bg-indigo-500"
                      onClick={handleAddComment}
                    />
                  </div>
                </div>
              </div>

              {/* Comment List */}
              <div className="space-y-4">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="flex gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xl">
                      {c.avatar}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-zinc-900 dark:text-zinc-100">
                          @{c.username}
                        </p>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {c.time}
                        </span>
                      </div>

                      <p className="text-zinc-700 dark:text-zinc-200 mt-1">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetailPage;
