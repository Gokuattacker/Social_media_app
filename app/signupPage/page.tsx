"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import type { Toast as ToastType } from "primereact/toast";

interface SignupProps {
  to?: string;
}

const Signup = ({ to }: SignupProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useRef<ToastType>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSignUp = () => {
    setFirstNameError("");
    setLastNameError("");
    setDobError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setAuthError("");

    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      return;
    }

    if (!lastName.trim()) {
      setLastNameError("Last name is required");
      return;
    }

    if (!dob) {
      setDobError("Date of birth is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (password.length < 5 || password.length > 50) {
      setPasswordError("Password must be between 5 and 50 characters");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    if (!checked) {
      setAuthError("You must agree to the Terms & Privacy Policy");
      return;
    }

    setLoading(true);

    timeoutRef.current = setTimeout(() => {
      setLoading(false);

      toast.current?.show({
        severity: "success",
        summary: "Account Created",
        detail: "Welcome! Your account has been created.",
        life: 2000,
      });

      router.push(to || "/feedPage");
    }, 1500);
  };

  const signUpOnEnterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") handleSignUp();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-10 bg-zinc-50 dark:bg-zinc-950">
      <Toast ref={toast} />

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 w-[420px]">
        <div onKeyDown={signUpOnEnterKeyPress}>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Create Account
          </h2>

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <InputText
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700"
            />

            <InputText
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700"
            />
          </div>

          {firstNameError && (
            <p className="text-red-500 text-sm mt-1">{firstNameError}</p>
          )}
          {lastNameError && (
            <p className="text-red-500 text-sm mt-1">{lastNameError}</p>
          )}

          {/* Date of Birth */}
          <InputText
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 mt-4"
          />
          {dobError && <p className="text-red-500 text-sm mt-1">{dobError}</p>}

          {/* Email */}
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 mt-4"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}

          {/* Password */}
          <div className="relative w-full mt-4">
            <InputText
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}

          {/* Confirm Password */}
          <div className="relative w-full mt-4">
            <InputText
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className={`w-full p-3 pr-12 rounded-xl border ${
                confirmPasswordError
                  ? "border-red-500"
                  : "border-zinc-200 dark:border-zinc-700"
              } bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 focus:outline-none"
              tabIndex={-1}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
          )}

          {/* Terms */}
          <div className="flex items-center gap-2 mt-4">
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.checked || false)}
            />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              I agree to the Terms & Privacy Policy
            </span>
          </div>

          {authError && (
            <p className="text-red-500 text-sm mt-2">{authError}</p>
          )}

          {/* Button */}
          <Button
            disabled={loading}
            onClick={handleSignUp}
            className="w-full mt-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 border-none text-white font-semibold py-3"
          >
            {loading ? <i className="pi pi-spin pi-spinner"></i> : "Sign Up"}
          </Button>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-3">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/loginPage")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
