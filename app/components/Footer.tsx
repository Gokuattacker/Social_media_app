import React from "react";

const Footer = () => {
  return (
    <footer className="w-full px-6 md:px-12 py-12 border-t border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              SocialConnect
            </div>
            <p className="text-sm">Connecting the world, one post at a time.</p>
          </div>
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Product
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Company
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Support
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 text-center text-sm">
          © 2024 SocialConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
