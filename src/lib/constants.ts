export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Plans", href: "/plans" },
  { name: "Trainers", href: "/trainers" },
  { name: "Transformations", href: "/transformations" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
] as const;

export const MEMBERSHIP_PLANS = [
  {
    name: "Monthly",
    duration: 1,
    price: 1500,
    popular: false,
    features: [
      "Full Gym Access",
      "Locker Room Access",
      "Free Fitness Assessment",
      "Basic Workout Plan",
    ],
  },
  {
    name: "Quarterly",
    duration: 3,
    price: 4000,
    popular: true,
    features: [
      "Full Gym Access",
      "Locker Room Access",
      "Free Fitness Assessment",
      "Personalized Workout Plan",
      "Diet Consultation",
      "1 Personal Training Session",
    ],
  },
  {
    name: "Half-Yearly",
    duration: 6,
    price: 7000,
    popular: false,
    features: [
      "Full Gym Access",
      "Locker Room Access",
      "Free Fitness Assessment",
      "Personalized Workout Plan",
      "Monthly Diet Plan",
      "3 Personal Training Sessions",
      "Progress Tracking",
    ],
  },
  {
    name: "Annual",
    duration: 12,
    price: 12000,
    popular: false,
    features: [
      "Full Gym Access",
      "Locker Room Access",
      "Free Fitness Assessment",
      "Personalized Workout Plan",
      "Weekly Diet Plan",
      "6 Personal Training Sessions",
      "Progress Tracking",
      "Priority Support",
      "Guest Pass (2/month)",
    ],
  },
] as const;

export const GYM_INFO = {
  name: "Vikings Gym",
  tagline: "Unleash The Warrior Within",
  description: "Premium fitness center in Aurangabad, Bihar. Transform your body, conquer your limits.",
  established: 2024,
  address: "MG Road, Near Reliance Jewels, Aurangabad Kutchehry, Aurangabad, Bihar — 824101",
  phone: "+91 77649 22023",
  email: "info@vikingsgym.in",
  instagram: "https://www.instagram.com/vikings_fitness/",
  googleMaps: "https://www.google.com/maps/place/VIKINGS+GYM/@24.7517185,84.3681875,17z",
  coordinates: { lat: 24.7517185, lng: 84.3707624 },
  rating: 4.3,
  totalReviews: 28,
  hours: {
    weekdays: "6:00 AM – 10:00 PM",
    weekends: "7:00 AM – 9:00 PM",
  },
} as const;

export const DASHBOARD_SIDEBAR_LINKS = {
  admin: [
    { name: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
    { name: "Members", href: "/admin/members", icon: "Users" },
    { name: "Memberships", href: "/admin/memberships", icon: "CreditCard" },
    { name: "Attendance", href: "/admin/attendance", icon: "CalendarCheck" },
    { name: "Trainers", href: "/admin/trainers", icon: "Dumbbell" },
    { name: "Payments", href: "/admin/payments", icon: "IndianRupee" },
    { name: "Leads", href: "/admin/leads", icon: "Target" },
    { name: "Inventory", href: "/admin/inventory", icon: "Package" },
    { name: "Reports", href: "/admin/reports", icon: "BarChart3" },
    { name: "Coupons", href: "/admin/coupons", icon: "Ticket" },
    { name: "Announcements", href: "/admin/announcements", icon: "Megaphone" },
    { name: "Notifications", href: "/admin/notifications", icon: "Bell" },
    { name: "Audit Logs", href: "/admin/audit-logs", icon: "ScrollText" },
    { name: "Settings", href: "/admin/settings", icon: "Settings" },
  ],
  trainer: [
    { name: "Dashboard", href: "/trainer/dashboard", icon: "LayoutDashboard" },
    { name: "My Clients", href: "/trainer/clients", icon: "Users" },
    { name: "Workout Plans", href: "/trainer/workout-plans", icon: "Dumbbell" },
    { name: "Diet Plans", href: "/trainer/diet-plans", icon: "Apple" },
    { name: "Schedule", href: "/trainer/schedule", icon: "Calendar" },
  ],
  member: [
    { name: "Dashboard", href: "/member/dashboard", icon: "LayoutDashboard" },
    { name: "My Profile", href: "/member/profile", icon: "UserCircle" },
    { name: "Membership", href: "/member/membership", icon: "CreditCard" },
    { name: "Attendance", href: "/member/attendance", icon: "CalendarCheck" },
    { name: "Workout Plan", href: "/member/workout", icon: "Dumbbell" },
    { name: "Diet Plan", href: "/member/diet", icon: "Apple" },
    { name: "Progress", href: "/member/progress", icon: "TrendingUp" },
  ],
} as const;

export const FITNESS_GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "Strength Training",
  "Endurance",
  "Flexibility",
  "General Fitness",
  "Body Building",
  "Sports Training",
  "Rehabilitation",
] as const;

export const SPECIALIZATIONS = [
  "Strength & Conditioning",
  "Weight Loss",
  "Bodybuilding",
  "CrossFit",
  "Yoga",
  "Cardio Training",
  "Functional Training",
  "Nutrition",
  "Rehabilitation",
  "Sports Performance",
] as const;

export const FAQS = [
  {
    question: "What are the gym timings?",
    answer: "We are open from 6:00 AM to 10:00 PM on weekdays and 7:00 AM to 9:00 PM on weekends.",
  },
  {
    question: "Do you provide personal training?",
    answer: "Yes! We have certified personal trainers who create customized workout and diet plans based on your fitness goals.",
  },
  {
    question: "Can I freeze my membership?",
    answer: "Yes, you can freeze your membership for up to 30 days per year for medical or personal reasons.",
  },
  {
    question: "Is there a trial session available?",
    answer: "Absolutely! We offer a complimentary trial session so you can experience our facilities before committing.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash, UPI, PhonePe, Credit/Debit Cards, and Net Banking.",
  },
  {
    question: "Do you have separate sections for men and women?",
    answer: "Our gym has a co-ed environment with all modern equipment. We ensure a comfortable and respectful atmosphere for everyone.",
  },
  {
    question: "What should I bring for my first visit?",
    answer: "Bring comfortable workout clothes, a pair of training shoes, a water bottle, and a towel. We provide locker room access.",
  },
  {
    question: "Can I upgrade my membership plan?",
    answer: "Yes, you can upgrade your plan anytime. The remaining balance from your current plan will be adjusted.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Rahul Kumar",
    role: "Member since 2024",
    content: "Vikings Gym completely transformed my fitness journey. The trainers are incredibly knowledgeable and the atmosphere is electric. Lost 15 kgs in just 4 months!",
    rating: 5,
    image: "/testimonials/member1.jpg",
  },
  {
    name: "Priya Singh",
    role: "Member since 2024",
    content: "Best gym in Aurangabad, hands down! The equipment is top-notch and the trainers really push you to achieve your goals. The personal training is worth every rupee.",
    rating: 5,
    image: "/testimonials/member2.jpg",
  },
  {
    name: "Amit Verma",
    role: "Member since 2024",
    content: "I've been to many gyms before, but Vikings is different. The Viking warrior theme keeps you motivated, and the community here is amazing. Highly recommended!",
    rating: 5,
    image: "/testimonials/member3.jpg",
  },
  {
    name: "Sneha Gupta",
    role: "Member since 2024",
    content: "The diet plans and workout routines they create are personalized and effective. I've seen incredible results. The staff is friendly and always willing to help.",
    rating: 4,
    image: "/testimonials/member4.jpg",
  },
] as const;
