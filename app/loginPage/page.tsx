"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import type { Toast as ToastType } from "primereact/toast";

interface LoginProps {
  to?: string;
}

const Login = ({ to }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useRef<ToastType>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  useLayoutEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedChecked = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedChecked) {
      flushSync(() => {
        setEmail(savedEmail);
        setChecked(savedChecked);
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSignIn = () => {
    setUsernameError("");
    setPasswordError("");
    setAuthError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setUsernameError("Please enter a valid email address");
      return;
    }

    if (email.length > 80) {
      setUsernameError("Email must be less than 80 characters");
      return;
    }

    if (password.length < 5 || password.length > 50) {
      setPasswordError("Password must be between 5 and 50 characters");
      return;
    }

    setLoading(true);

    // Fake Login Simulation (No API)
    timeoutRef.current = setTimeout(() => {
      setLoading(false);

      if (checked) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberMe");
      }

      toast.current?.show({
        severity: "success",
        summary: "Login Successful",
        detail: "Welcome back!",
        life: 2000,
      });

      // Redirect after login
      router.push(to || "/feedPage");
    }, 1500);
  };

  const signInOnEnterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  const handleForgotPassword = () => {
    toast.current?.show({
      severity: "info",
      summary: "Forgot Password",
      detail: "Password reset feature is not connected yet.",
      life: 3000,
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-10 bg-zinc-50 dark:bg-zinc-950">
      <Toast ref={toast} />

      {/* Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8">
        <div onKeyDown={signInOnEnterKeyPress}>
          {/* Title */}
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Welcome Back
          </h2>

          {/* Email */}
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 mt-6">
            Email
          </label>
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`w-full p-3 rounded-xl border ${
              usernameError
                ? "border-red-500"
                : "border-zinc-200 dark:border-zinc-700"
            } bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
          />

          {usernameError && (
            <p className="text-red-500 text-sm mt-2">{usernameError}</p>
          )}

          {/* Password */}
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 mt-6">
            Password
          </label>
          <div className="relative w-full">
            <InputText
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full p-3 pr-12 rounded-xl border ${
                passwordError
                  ? "border-red-500"
                  : "border-zinc-200 dark:border-zinc-700"
              } bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
          )}

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.checked || false)}
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Remember me
              </span>
            </div>

            <button
              onClick={handleForgotPassword}
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Auth Error */}
          {authError && (
            <p className="text-red-500 text-sm mt-4">{authError}</p>
          )}

          {/* Button */}
          <Button
            disabled={loading}
            onClick={handleSignIn}
            className="w-full mt-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 border-none text-white font-semibold py-3 flex justify-center"
          >
            {loading ? (
              <i
                className="pi pi-spin pi-spinner"
                style={{ fontSize: "1.5em" }}
              ></i>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/signupPage")}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>

          {/* Footer */}
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
            By signing in, you agree to our{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">
              Terms
            </span>{" "}
            &{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
