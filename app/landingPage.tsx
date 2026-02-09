"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const LandingPage = () => {
  const router = useRouter();
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header />

      {/* Hero Section */}
      <section className="w-full px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
              Connect. Share. Inspire.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join millions of people sharing their stories, connecting with friends, and discovering new communities every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                label="Create Account"
                className="px-8 py-3 text-lg rounded-2xl bg-indigo-600 text-white border-none hover:bg-indigo-500 shadow-sm"
                onClick={() => router.push("/signup")}
              />
              <Button
                label="Learn More"
                className="px-8 py-3 text-lg rounded-2xl text-zinc-900 dark:text-zinc-100 border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                outlined
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </div>

          {/* Hero Image/Preview */}
          <div className="relative mt-16 rounded-3xl overflow-hidden shadow-sm border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-xl text-zinc-900 dark:text-zinc-100">Your Social Experience Awaits</p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Post updates, chat, and discover communities — all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full px-6 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-zinc-900 dark:text-zinc-100">
            Why Choose SocialConnect?
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
            Everything you need to stay connected and share what matters most.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">Privacy First</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Your data is yours. We use end-to-end encryption and give you complete control over your privacy settings.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">Lightning Fast</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Experience blazing-fast performance with our optimized platform. Share moments instantly, anywhere, anytime.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">Global Community</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Connect with people from around the world. Join communities, discover new interests, and make lasting friendships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full px-6 md:px-12 py-20 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">10M+</div>
              <div className="text-xl opacity-90">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50M+</div>
              <div className="text-xl opacity-90">Posts Shared</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-xl opacity-90">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-6 md:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Join SocialConnect today and start connecting with people who share your passions.
          </p>
          <Button
            label="Create Your Account"
            className="px-10 py-4 text-lg rounded-2xl bg-indigo-600 text-white border-none hover:bg-indigo-500 shadow-sm"
            onClick={() => router.push("/signup")}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
