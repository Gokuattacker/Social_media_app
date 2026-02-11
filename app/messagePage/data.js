// data.js

export const userProfile = {
  id: 1,
  name: "Abhigyan Goswami",
  username: "abhigyan",
  avatar: "🧑‍💻",
  stats: {
    posts: 25,
    followers: 1200,
    following: 310,
  },
};

export const suggestions = [
  { id: 1, username: "rohit_dev", avatar: "👨‍💻", description: "Frontend Dev" },
  { id: 2, username: "priya_codes", avatar: "👩‍💻", description: "MERN Dev" },
  { id: 3, username: "ai_guru", avatar: "🤖", description: "AI Enthusiast" },
  { id: 4, username: "travel_vibes", avatar: "🌍", description: "Traveler" },
];

// Chat Users
export const chatUsersData = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    avatar: "👨",
    lastMessage: "Hey, how are you?",
    time: "5m",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    avatar: "👩",
    lastMessage: "See you soon!",
    time: "10m",
  },
  {
    id: 3,
    name: "AI Guru",
    username: "ai_guru",
    avatar: "🤖",
    lastMessage: "Try adding AI recommendation system 🔥",
    time: "1h",
  },
];

// Messages for each user
export const chatMessagesData = {
  johndoe: [
    { id: 1, sender: "johndoe", text: "Hey 👋", time: "2h" },
    { id: 2, sender: "me", text: "Hello bro 😄", time: "2h" },
    { id: 3, sender: "johndoe", text: "How's your project going?", time: "1h" },
  ],

  janesmith: [
    { id: 1, sender: "janesmith", text: "Hi Abhigyan!", time: "3h" },
    { id: 2, sender: "me", text: "Hey Jane 👋", time: "3h" },
    { id: 3, sender: "janesmith", text: "See you soon!", time: "10m" },
  ],

  ai_guru: [
    {
      id: 1,
      sender: "ai_guru",
      text: "Bro AI + social media is future 🔥",
      time: "5h",
    },
    {
      id: 2,
      sender: "me",
      text: "Yes I'm adding that in final year project 😄",
      time: "4h",
    },
  ],
};
