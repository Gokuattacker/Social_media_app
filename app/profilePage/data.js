// Profile user data
export const profileUser = {
  name: "John Doe",
  username: "johndoe",
  avatar: "👤",
  coverPhoto: null, // Can be a URL if you have a cover photo
  bio: "Adventure enthusiast | Nature lover | Photographer 📸 | Living life one hike at a time 🌄",
  location: "San Francisco, CA",
  website: "johndoe.com",
  joinDate: "January 2020",
  stats: {
    posts: 156,
    followers: "12.5K",
    following: 342,
  },
  isFollowing: false,
  isOwnProfile: false,
};

// User's posts
export const userPosts = [
  {
    id: 1,
    username: "johndoe",
    name: "John Doe",
    avatar: "👤",
    time: "2h ago",
    content: "Just finished an amazing hike! The view was absolutely breathtaking. Nature never fails to amaze me. 🌄 #hiking #nature #adventure",
    likes: 42,
    comments: 8,
    shares: 3,
    liked: false,
  },
  {
    id: 2,
    username: "johndoe",
    name: "John Doe",
    avatar: "👤",
    time: "1d ago",
    content: "Sunset vibes from yesterday's adventure. Sometimes the best views come after the hardest climbs. 🏔️✨",
    likes: 89,
    comments: 15,
    shares: 7,
    liked: true,
  },
  {
    id: 3,
    username: "johndoe",
    name: "John Doe",
    avatar: "👤",
    time: "3d ago",
    content: "New camera gear arrived! Can't wait to test it out on my next photography expedition. 📷 #photography #gear",
    likes: 67,
    comments: 12,
    shares: 4,
    liked: false,
  },
  {
    id: 4,
    username: "johndoe",
    name: "John Doe",
    avatar: "👤",
    time: "1w ago",
    content: "Weekend camping trip was exactly what I needed. Disconnected from the digital world and reconnected with nature. 🏕️🌲",
    likes: 124,
    comments: 23,
    shares: 9,
    liked: true,
  },
];

// About information
export const aboutInfo = {
  education: "University of California, Berkeley",
  work: "Freelance Photographer",
  location: "San Francisco, CA",
  birthday: "March 15, 1995",
  joined: "January 2020",
  interests: ["Photography", "Hiking", "Nature", "Travel", "Adventure"],
};

// Photos (can be URLs or placeholders)
export const photos = [
  { id: 1, url: null, alt: "Photo 1" },
  { id: 2, url: null, alt: "Photo 2" },
  { id: 3, url: null, alt: "Photo 3" },
  { id: 4, url: null, alt: "Photo 4" },
  { id: 5, url: null, alt: "Photo 5" },
  { id: 6, url: null, alt: "Photo 6" },
];
