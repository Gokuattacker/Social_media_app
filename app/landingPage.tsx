"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Count-up animation hook
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started, startOnView]);

  useEffect(() => {
    if (!started) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, ref };
}

const LandingPage = () => {
  const router = useRouter();
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const stat1 = useCountUp(10, 2000);
  const stat2 = useCountUp(50, 2500);
  const stat3 = useCountUp(100, 2000);

  return (
    <div className="w-full min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header />

      {/* Hero Section */}
      <section className="w-full px-6 md:px-12 py-20 md:py-32 relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl -z-10 animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/15 dark:bg-purple-600/10 rounded-full blur-3xl -z-10 animate-float delay-300" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 animate-fade-in-up">
              Connect. Share. <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Inspire.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200" style={{ opacity: 0 }}>
              Join millions of people sharing their stories, connecting with friends, and discovering new communities every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400" style={{ opacity: 0 }}>
              <Button
                label="Create Account"
                className="px-8 py-3 text-lg rounded-2xl bg-indigo-600 text-white border-none hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-300 hover:-translate-y-0.5"
                onClick={() => router.push("/signupPage")}
              />
              <Button
                label="Learn More"
                className="px-8 py-3 text-lg rounded-2xl text-zinc-900 dark:text-zinc-100 border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300"
                outlined
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative mt-16 rounded-3xl overflow-hidden shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 animate-scale-in delay-500" style={{ opacity: 0 }}>
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] rounded-3xl">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl">
                <div className="aspect-video flex items-center justify-center relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30" />
                  
                  <div className="relative z-10 text-center p-8">
                    {/* Mock UI */}
                    <div className="flex items-center justify-center gap-6 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-3xl animate-float">💬</div>
                      <div className="w-20 h-20 rounded-2xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-4xl animate-float delay-200">📱</div>
                      <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-3xl animate-float delay-400">🌍</div>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Your Social Experience Awaits</p>
                    <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                      Post updates, chat with friends, and discover communities — all in one beautifully designed place.
                    </p>
                  </div>
                </div>
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
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm card-hover">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-3xl mb-5">🔒</div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">Privacy First</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Your data is yours. We use end-to-end encryption and give you complete control over your privacy settings.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm card-hover">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-3xl mb-5">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">Lightning Fast</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Experience blazing-fast performance with our optimized platform. Share moments instantly, anywhere, anytime.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm card-hover">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-3xl mb-5">🌍</div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">Global Community</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Connect with people from around the world. Join communities, discover new interests, and make lasting friendships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full px-6 md:px-12 py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div ref={stat1.ref}>
              <div className="text-5xl font-bold mb-2">{stat1.count}M+</div>
              <div className="text-xl opacity-90">Active Users</div>
            </div>
            <div ref={stat2.ref}>
              <div className="text-5xl font-bold mb-2">{stat2.count}M+</div>
              <div className="text-xl opacity-90">Posts Shared</div>
            </div>
            <div ref={stat3.ref}>
              <div className="text-5xl font-bold mb-2">{stat3.count}+</div>
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
            className="px-10 py-4 text-lg rounded-2xl bg-indigo-600 text-white border-none hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => router.push("/signupPage")}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
