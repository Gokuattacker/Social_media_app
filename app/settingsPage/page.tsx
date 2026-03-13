"use client";

import { useEffect, useState } from "react";

type NotificationSettings = {
  email: boolean;
  push: boolean;
  likes: boolean;
  comments: boolean;
  follows: boolean;
};

type PrivacySettings = {
  publicProfile: boolean;
  allowMessages: boolean;
  showActivity: boolean;
  allowSearch: boolean;
};

type DisplaySettings = {
  darkMode: boolean;
  compactMode: boolean;
  reducedMotion: boolean;
};

type Settings = {
  fullName: string;
  email: string;
  username: string;
  bio: string;
  avatar: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  display: DisplaySettings;
};

const DEFAULT_SETTINGS: Settings = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe",
  bio: "Passionate developer and tech enthusiast",
  avatar: "👤",
  notifications: {
    email: true,
    push: true,
    likes: true,
    comments: true,
    follows: false,
  },
  privacy: {
    publicProfile: true,
    allowMessages: true,
    showActivity: false,
    allowSearch: true,
  },
  display: {
    darkMode: true,
    compactMode: false,
    reducedMotion: false,
  },
};

const SettingsPage = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [lastSavedSettings, setLastSavedSettings] =
    useState<Settings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const handleInputChange = <K extends keyof Settings>(
    field: K,
    value: Settings[K],
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedToggle = (
    category: "notifications" | "privacy" | "display",
    field: string,
  ) => {
    setSettings((prev) => {
      const group = prev[category] as Record<string, boolean>;
      return {
        ...prev,
        [category]: {
          ...group,
          [field]: !group[field],
        } as typeof group,
      };
    });
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setLastSavedSettings(settings);
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  const handleCancelChanges = () => {
    if (
      window.confirm(
        "Discard all unsaved changes and revert to the last saved settings?",
      )
    ) {
      setSettings(lastSavedSettings);
    }
  };

  const handleResetAllSettings = () => {
    if (
      window.confirm(
        "Reset all settings back to their defaults? This cannot be undone.",
      )
    ) {
      setSettings(DEFAULT_SETTINGS);
      setLastSavedSettings(DEFAULT_SETTINGS);
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action is permanent.",
      )
    ) {
      alert("Account deletion flow would be triggered here.");
    }
  };

  return (
    <section className="w-full px-6 md:px-12 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Settings ⚙️
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Manage your account and preferences
          </p>
        </div>

        {/* Account Settings */}
        <form className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Account Settings
          </h2>

          <div className="space-y-5">
            {/* Avatar */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                Avatar
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-4xl">
                  {settings.avatar}
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold text-sm"
                >
                  Change Avatar
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={settings.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                autoComplete="name"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={settings.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                autoComplete="username"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                autoComplete="email"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Bio
              </label>
              <textarea
                value={settings.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
        </form>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Notification Preferences
          </h2>

          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800"
              >
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 capitalize">
                    {key} Notifications
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Receive {key} updates about your activity
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={value}
                  aria-label={`${key} notifications`}
                  onClick={() =>
                    handleNestedToggle(
                      "notifications",
                      key as keyof typeof settings.notifications,
                    )
                  }
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    value ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      value ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Privacy Settings
          </h2>

          <div className="space-y-4">
            {Object.entries(settings.privacy).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800"
              >
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Control who can see your information
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={value}
                  aria-label={key.replace(/([A-Z])/g, " $1").trim()}
                  onClick={() =>
                    handleNestedToggle(
                      "privacy",
                      key as keyof typeof settings.privacy,
                    )
                  }
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    value ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      value ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Display Settings
          </h2>

          <div className="space-y-4">
            {Object.entries(settings.display).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800"
              >
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Customize how the app looks
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={value}
                  aria-label={key.replace(/([A-Z])/g, " $1").trim()}
                  onClick={() =>
                    handleNestedToggle(
                      "display",
                      key as keyof typeof settings.display,
                    )
                  }
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    value ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      value ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl shadow-sm p-6 border border-red-200 dark:border-red-900">
          <h2 className="text-xl font-bold text-red-900 dark:text-red-300 mb-4">
            Danger Zone
          </h2>
          <p className="text-red-800 dark:text-red-400 mb-6 text-sm">
            These actions are irreversible. Please proceed with caution.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleResetAllSettings}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-semibold text-sm"
            >
              Reset All Settings
            </button>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-semibold text-sm"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3 sticky bottom-0 bg-zinc-50 dark:bg-zinc-950 p-6 -m-6 rounded-2xl border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-colors ${
              isSaving
                ? "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleCancelChanges}
            className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
