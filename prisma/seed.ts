import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data
  await prisma.referral.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.inventoryTransaction.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.progressTracking.deleteMany();
  await prisma.dietMeal.deleteMany();
  await prisma.dietPlan.deleteMany();
  await prisma.workoutExercise.deleteMany();
  await prisma.workoutPlan.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.membershipPlan.deleteMany();
  await prisma.member.deleteMany();
  await prisma.trainerSchedule.deleteMany();
  await prisma.trainer.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("password123", 12);

  // ============================================
  // USERS
  // ============================================

  const superAdmin = await prisma.user.create({
    data: {
      email: "admin@vikingsgym.in",
      password,
      name: "Vikings Admin",
      phone: "7764922023",
      role: "SUPER_ADMIN",
      avatar: null,
    },
  });

  const gymOwner = await prisma.user.create({
    data: {
      email: "owner@vikingsgym.in",
      password,
      name: "Raj Kumar",
      phone: "9876543210",
      role: "GYM_OWNER",
    },
  });

  const receptionist = await prisma.user.create({
    data: {
      email: "reception@vikingsgym.in",
      password,
      name: "Priya Sharma",
      phone: "9876543211",
      role: "RECEPTIONIST",
    },
  });

  // ============================================
  // TRAINERS
  // ============================================

  const trainerUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: "rahul.trainer@vikingsgym.in",
        password,
        name: "Rahul Singh",
        phone: "9876543220",
        role: "TRAINER",
        trainer: {
          create: {
            experience: 5,
            certifications: ["ACE Certified", "NASM-CPT", "Sports Nutrition"],
            specialization: ["Strength & Conditioning", "Bodybuilding"],
            salary: 25000,
            bio: "5+ years of experience in strength training and bodybuilding. Specialized in transforming beginners into competitive athletes.",
            rating: 4.8,
          },
        },
      },
      include: { trainer: true },
    }),
    prisma.user.create({
      data: {
        email: "amit.trainer@vikingsgym.in",
        password,
        name: "Amit Verma",
        phone: "9876543221",
        role: "TRAINER",
        trainer: {
          create: {
            experience: 3,
            certifications: ["ISSA Certified", "CrossFit L1"],
            specialization: ["CrossFit", "Functional Training", "Weight Loss"],
            salary: 20000,
            bio: "CrossFit enthusiast with a passion for functional fitness. Helped 100+ clients achieve their weight loss goals.",
            rating: 4.6,
          },
        },
      },
      include: { trainer: true },
    }),
    prisma.user.create({
      data: {
        email: "sneha.trainer@vikingsgym.in",
        password,
        name: "Sneha Gupta",
        phone: "9876543222",
        role: "TRAINER",
        trainer: {
          create: {
            experience: 4,
            certifications: ["Yoga Alliance RYT-200", "Pilates Certified"],
            specialization: ["Yoga", "Flexibility", "Rehabilitation"],
            salary: 22000,
            bio: "Certified yoga instructor specializing in flexibility, rehabilitation, and mindfulness. Creates holistic fitness programs.",
            rating: 4.9,
          },
        },
      },
      include: { trainer: true },
    }),
    prisma.user.create({
      data: {
        email: "vikash.trainer@vikingsgym.in",
        password,
        name: "Vikash Kumar",
        phone: "9876543223",
        role: "TRAINER",
        trainer: {
          create: {
            experience: 6,
            certifications: ["NSCA-CSCS", "Sports Performance Coach"],
            specialization: ["Sports Performance", "Cardio Training", "Nutrition"],
            salary: 28000,
            bio: "Former state-level athlete turned fitness coach. Specializes in sports performance and athletic conditioning.",
            rating: 4.7,
          },
        },
      },
      include: { trainer: true },
    }),
  ]);

  // ============================================
  // MEMBERSHIP PLANS
  // ============================================

  const plans = await Promise.all([
    prisma.membershipPlan.create({
      data: {
        name: "Monthly",
        duration: 1,
        price: 1500,
        description: "Perfect for trying out our facilities",
        features: ["Full Gym Access", "Locker Room Access", "Free Fitness Assessment", "Basic Workout Plan"],
        isActive: true,
      },
    }),
    prisma.membershipPlan.create({
      data: {
        name: "Quarterly",
        duration: 3,
        price: 4000,
        description: "Our most popular plan — best value for committed members",
        features: ["Full Gym Access", "Locker Room Access", "Free Fitness Assessment", "Personalized Workout Plan", "Diet Consultation", "1 Personal Training Session"],
        isActive: true,
      },
    }),
    prisma.membershipPlan.create({
      data: {
        name: "Half-Yearly",
        duration: 6,
        price: 7000,
        description: "For serious fitness enthusiasts",
        features: ["Full Gym Access", "Locker Room Access", "Free Fitness Assessment", "Personalized Workout Plan", "Monthly Diet Plan", "3 Personal Training Sessions", "Progress Tracking"],
        isActive: true,
      },
    }),
    prisma.membershipPlan.create({
      data: {
        name: "Annual",
        duration: 12,
        price: 12000,
        description: "Ultimate value — our premium plan with maximum benefits",
        features: ["Full Gym Access", "Locker Room Access", "Free Fitness Assessment", "Personalized Workout Plan", "Weekly Diet Plan", "6 Personal Training Sessions", "Progress Tracking", "Priority Support", "Guest Pass (2/month)"],
        isActive: true,
      },
    }),
  ]);

  // ============================================
  // MEMBERS
  // ============================================

  const memberData = [
    { name: "Arjun Patel", email: "arjun@email.com", phone: "9876543001", gender: "MALE" as const, weight: 75, height: 175, goal: "Muscle Gain" },
    { name: "Neha Sharma", email: "neha@email.com", phone: "9876543002", gender: "FEMALE" as const, weight: 62, height: 160, goal: "Weight Loss" },
    { name: "Ravi Kumar", email: "ravi@email.com", phone: "9876543003", gender: "MALE" as const, weight: 85, height: 180, goal: "Strength Training" },
    { name: "Anita Devi", email: "anita@email.com", phone: "9876543004", gender: "FEMALE" as const, weight: 58, height: 155, goal: "General Fitness" },
    { name: "Suresh Yadav", email: "suresh@email.com", phone: "9876543005", gender: "MALE" as const, weight: 90, height: 178, goal: "Weight Loss" },
    { name: "Pooja Mishra", email: "pooja@email.com", phone: "9876543006", gender: "FEMALE" as const, weight: 55, height: 162, goal: "Flexibility" },
    { name: "Mohit Gupta", email: "mohit@email.com", phone: "9876543007", gender: "MALE" as const, weight: 70, height: 172, goal: "Bodybuilding" },
    { name: "Kavita Singh", email: "kavita@email.com", phone: "9876543008", gender: "FEMALE" as const, weight: 65, height: 158, goal: "Endurance" },
    { name: "Deepak Verma", email: "deepak@email.com", phone: "9876543009", gender: "MALE" as const, weight: 78, height: 176, goal: "Sports Training" },
    { name: "Suman Kumari", email: "suman@email.com", phone: "9876543010", gender: "FEMALE" as const, weight: 60, height: 163, goal: "Weight Loss" },
    { name: "Aakash Jha", email: "aakash@email.com", phone: "9876543011", gender: "MALE" as const, weight: 82, height: 182, goal: "Muscle Gain" },
    { name: "Ritika Sinha", email: "ritika@email.com", phone: "9876543012", gender: "FEMALE" as const, weight: 57, height: 157, goal: "General Fitness" },
  ];

  const members = [];
  for (let i = 0; i < memberData.length; i++) {
    const m = memberData[i];
    const trainerId = trainerUsers[i % trainerUsers.length].trainer!.id;
    const user = await prisma.user.create({
      data: {
        email: m.email,
        password,
        name: m.name,
        phone: m.phone,
        role: "MEMBER",
        member: {
          create: {
            gender: m.gender,
            weight: m.weight,
            height: m.height,
            fitnessGoal: m.goal,
            dateOfBirth: new Date(1995 + (i % 10), i % 12, (i * 3 + 5) % 28 + 1),
            address: "Aurangabad, Bihar",
            emergencyContact: "Emergency Contact " + (i + 1),
            emergencyPhone: "98765" + (43100 + i).toString(),
            qrCode: `VGM-${Date.now()}-${i}`,
            referralCode: `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            trainerId,
          },
        },
      },
      include: { member: true },
    });
    members.push(user);
  }

  // ============================================
  // MEMBERSHIPS
  // ============================================

  for (let i = 0; i < members.length; i++) {
    const planIndex = i % plans.length;
    const daysAgo = Math.floor(Math.random() * 60);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + plans[planIndex].duration);

    const status = i < 9 ? "ACTIVE" : i === 9 ? "FROZEN" : "EXPIRED";

    await prisma.membership.create({
      data: {
        memberId: members[i].member!.id,
        planId: plans[planIndex].id,
        startDate,
        endDate: status === "EXPIRED" ? new Date(Date.now() - 86400000 * 5) : endDate,
        status: status as any,
      },
    });
  }

  // ============================================
  // PAYMENTS
  // ============================================

  for (let i = 0; i < members.length; i++) {
    const planIndex = i % plans.length;
    await prisma.payment.create({
      data: {
        memberId: members[i].member!.id,
        amount: plans[planIndex].price,
        method: ["CASH", "UPI", "CARD", "RAZORPAY"][i % 4] as any,
        status: "COMPLETED",
        description: `Membership: ${plans[planIndex].name}`,
        invoiceNumber: `VGM-SEED-${i + 1}`,
        paidAt: new Date(Date.now() - Math.random() * 60 * 86400000),
      },
    });
  }

  // ============================================
  // ATTENDANCE (Last 30 days)
  // ============================================

  for (let day = 0; day < 30; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    date.setHours(0, 0, 0, 0);

    const numAttendees = 5 + Math.floor(Math.random() * 7);
    const shuffled = [...members].sort(() => Math.random() - 0.5).slice(0, numAttendees);

    for (const member of shuffled) {
      const checkInHour = 6 + Math.floor(Math.random() * 12);
      const checkIn = new Date(date);
      checkIn.setHours(checkInHour, Math.floor(Math.random() * 60));

      const checkOut = new Date(checkIn);
      checkOut.setHours(checkIn.getHours() + 1 + Math.floor(Math.random() * 2));

      await prisma.attendance.create({
        data: {
          memberId: member.member!.id,
          date: new Date(date),
          checkIn,
          checkOut: day > 0 ? checkOut : (Math.random() > 0.5 ? checkOut : null),
          method: Math.random() > 0.3 ? "QR_CODE" : "MANUAL",
        },
      });
    }
  }

  // ============================================
  // PROGRESS TRACKING
  // ============================================

  for (const member of members.slice(0, 6)) {
    for (let month = 5; month >= 0; month--) {
      const date = new Date();
      date.setMonth(date.getMonth() - month);
      const baseWeight = member.member!.weight || 70;
      const weightChange = member.member!.fitnessGoal === "Weight Loss" ? month * 1.2 : -month * 0.5;

      await prisma.progressTracking.create({
        data: {
          memberId: member.member!.id,
          date,
          weight: Math.round((baseWeight + weightChange) * 10) / 10,
          chest: 38 + Math.random() * 4,
          waist: 32 - month * 0.3,
          arms: 13 + month * 0.2,
          bmi: 22 + Math.random() * 4,
          bodyFatPercent: 20 - month * 0.8,
        },
      });
    }
  }

  // ============================================
  // LEADS
  // ============================================

  const leads = [
    { name: "Rohit Sharma", phone: "9876543100", email: "rohit@email.com", source: "WALK_IN", stage: "NEW_LEAD" },
    { name: "Sunita Devi", phone: "9876543101", email: "sunita@email.com", source: "SOCIAL_MEDIA", stage: "CONTACTED" },
    { name: "Manish Tiwari", phone: "9876543102", email: "manish@email.com", source: "REFERRAL", stage: "TRIAL_SCHEDULED" },
    { name: "Meena Kumari", phone: "9876543103", email: "meena@email.com", source: "WEBSITE", stage: "TRIAL_COMPLETED" },
    { name: "Ajay Singh", phone: "9876543104", email: "ajay@email.com", source: "PHONE", stage: "NEW_LEAD" },
    { name: "Rekha Patel", phone: "9876543105", email: "rekha@email.com", source: "SOCIAL_MEDIA", stage: "CONTACTED" },
    { name: "Vijay Kumar", phone: "9876543106", source: "WALK_IN", stage: "CONVERTED" },
    { name: "Geeta Devi", phone: "9876543107", source: "REFERRAL", stage: "LOST" },
    { name: "Pankaj Mishra", phone: "9876543108", email: "pankaj@email.com", source: "WEBSITE", stage: "NEW_LEAD" },
    { name: "Shweta Gupta", phone: "9876543109", source: "PHONE", stage: "TRIAL_SCHEDULED" },
  ];

  for (const lead of leads) {
    await prisma.lead.create({
      data: {
        name: lead.name,
        phone: lead.phone,
        email: lead.email || null,
        source: lead.source as any,
        stage: lead.stage as any,
      },
    });
  }

  // ============================================
  // INVENTORY
  // ============================================

  const inventoryItems = [
    { name: "Whey Protein (1kg)", category: "SUPPLEMENT", quantity: 25, minQuantity: 5, price: 2500 },
    { name: "BCAA Powder", category: "SUPPLEMENT", quantity: 15, minQuantity: 5, price: 1200 },
    { name: "Pre-Workout", category: "SUPPLEMENT", quantity: 3, minQuantity: 5, price: 1800 },
    { name: "Vikings T-Shirt", category: "MERCHANDISE", quantity: 50, minQuantity: 10, price: 699 },
    { name: "Vikings Hoodie", category: "MERCHANDISE", quantity: 20, minQuantity: 5, price: 1499 },
    { name: "Gym Gloves", category: "ACCESSORY", quantity: 30, minQuantity: 10, price: 499 },
    { name: "Resistance Bands Set", category: "ACCESSORY", quantity: 12, minQuantity: 5, price: 799 },
    { name: "Shaker Bottle", category: "ACCESSORY", quantity: 40, minQuantity: 10, price: 299 },
    { name: "Yoga Mat", category: "EQUIPMENT", quantity: 2, minQuantity: 5, price: 899 },
    { name: "Jump Rope", category: "ACCESSORY", quantity: 8, minQuantity: 5, price: 399 },
  ];

  for (const item of inventoryItems) {
    await prisma.inventoryItem.create({
      data: {
        name: item.name,
        category: item.category as any,
        quantity: item.quantity,
        minQuantity: item.minQuantity,
        price: item.price,
      },
    });
  }

  // ============================================
  // COUPONS
  // ============================================

  await prisma.coupon.createMany({
    data: [
      { code: "WELCOME10", discountType: "PERCENTAGE", discountValue: 10, maxUses: 100, minAmount: 1000, validUntil: new Date("2026-12-31"), isActive: true },
      { code: "SUMMER500", discountType: "FIXED", discountValue: 500, maxUses: 50, minAmount: 3000, validUntil: new Date("2026-09-30"), isActive: true },
      { code: "VIKINGVIP", discountType: "PERCENTAGE", discountValue: 20, maxUses: 20, minAmount: 5000, validUntil: new Date("2026-12-31"), isActive: true },
    ],
  });

  // ============================================
  // ANNOUNCEMENTS
  // ============================================

  await prisma.announcement.createMany({
    data: [
      { title: "Summer Special Offer! 🌞", content: "Get 20% off on all annual memberships this summer! Use code SUMMER500 at checkout. Offer valid till September 30th.", isActive: true, priority: 1 },
      { title: "New Yoga Classes Starting Soon 🧘", content: "We're excited to announce new yoga and meditation classes starting from next week. Join us every morning at 7 AM!", isActive: true, priority: 0 },
      { title: "Gym Closed on Independence Day 🇮🇳", content: "Vikings Gym will remain closed on August 15th in observance of Independence Day. Regular hours resume August 16th.", isActive: true, priority: 2 },
    ],
  });

  // ============================================
  // BLOG POSTS
  // ============================================

  await prisma.blogPost.createMany({
    data: [
      {
        title: "5 Essential Tips for Beginners at the Gym",
        slug: "5-tips-for-gym-beginners",
        content: "Starting your fitness journey can be overwhelming. Here are 5 essential tips to help you get started...\n\n## 1. Start Slow\nDon't try to lift heavy weights on your first day. Start with lighter weights and focus on proper form.\n\n## 2. Stay Hydrated\nDrink plenty of water before, during, and after your workout.\n\n## 3. Get Proper Rest\nYour muscles grow during rest, not during exercise. Aim for 7-8 hours of sleep.\n\n## 4. Follow a Plan\nDon't just go to the gym without a plan. Our trainers can create a personalized workout routine for you.\n\n## 5. Be Consistent\nConsistency is key. Even 30 minutes of exercise 4-5 times a week can lead to significant results.",
        excerpt: "Starting your fitness journey can be overwhelming. Here are 5 essential tips to help you get started at the gym.",
        author: "Rahul Singh",
        tags: ["fitness", "beginners", "tips", "workout"],
        isPublished: true,
        publishedAt: new Date("2026-01-15"),
      },
      {
        title: "The Ultimate Guide to Building Muscle Mass",
        slug: "ultimate-guide-building-muscle",
        content: "Building muscle requires a combination of proper training, nutrition, and recovery. Let's dive into each aspect...\n\n## Training\nFocus on compound movements like squats, deadlifts, bench press, and overhead press.\n\n## Nutrition\nConsume 1.6-2.2g of protein per kg of body weight daily.\n\n## Recovery\nAllow 48-72 hours between training the same muscle group.",
        excerpt: "Building muscle requires a combination of proper training, nutrition, and recovery. Here's your complete guide.",
        author: "Vikash Kumar",
        tags: ["muscle", "bodybuilding", "nutrition", "training"],
        isPublished: true,
        publishedAt: new Date("2026-02-10"),
      },
      {
        title: "Nutrition Myths Debunked: What Really Works",
        slug: "nutrition-myths-debunked",
        content: "There are countless nutrition myths floating around. Let's separate fact from fiction...\n\n## Myth 1: Carbs are bad\nCarbs are your body's primary energy source. Choose complex carbs.\n\n## Myth 2: You need supplements\nSupplements are not necessary if you have a balanced diet.\n\n## Myth 3: Eating fat makes you fat\nHealthy fats are essential for hormone production and nutrient absorption.",
        excerpt: "There are countless nutrition myths floating around. Let's separate fact from fiction and learn what really works.",
        author: "Sneha Gupta",
        tags: ["nutrition", "diet", "health", "myths"],
        isPublished: true,
        publishedAt: new Date("2026-03-05"),
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
  console.log("📊 Created:");
  console.log("   - 3 Admin users (admin, owner, receptionist)");
  console.log("   - 4 Trainers");
  console.log("   - 12 Members with memberships");
  console.log("   - 4 Membership plans");
  console.log("   - 30 days of attendance data");
  console.log("   - 12 Payment records");
  console.log("   - 10 Leads");
  console.log("   - 10 Inventory items");
  console.log("   - 3 Coupons");
  console.log("   - 3 Announcements");
  console.log("   - 3 Blog posts");
  console.log("   - Progress tracking data");
  console.log("");
  console.log("🔑 Login credentials:");
  console.log("   Admin: admin@vikingsgym.in / password123");
  console.log("   Owner: owner@vikingsgym.in / password123");
  console.log("   Trainer: rahul.trainer@vikingsgym.in / password123");
  console.log("   Member: arjun@email.com / password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
