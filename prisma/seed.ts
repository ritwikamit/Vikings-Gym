import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  await prisma.referral.deleteMany();
  await prisma.ticketMessage.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.commissionLog.deleteMany();
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
  await prisma.featureFlag.deleteMany();
  await prisma.gymSettings.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.tenant.deleteMany();

  const password = await bcrypt.hash("password123", 12);

  // ── Tenant ──
  const tenant = await prisma.tenant.create({
    data: {
      name: "Vikings Gym Aurangabad",
      slug: "vikings-gym",
      domain: "vikingsgym.in",
      brandColor: "#E11D48",
    },
  });

  const tid = tenant.id;

  await prisma.organization.create({
    data: {
      tenantId: tid,
      name: "Vikings Gym",
      email: "info@vikingsgym.in",
      phone: "+91 77649 22023",
      address: "MG Road, Near Reliance Jewels, Aurangabad Kutchehry",
      city: "Aurangabad",
      state: "Bihar",
      pincode: "824101",
    },
  });

  await prisma.gymSettings.create({
    data: {
      tenantId: tid,
      checkInMode: "QR_AND_MANUAL",
      enableEmail: true,
      enableReferral: true,
      enableCoupons: true,
      enableBirthdayAlerts: true,
      reminderDays: "7,3,1",
    },
  });

  await prisma.featureFlag.create({
    data: { tenantId: tid, key: "qr_attendance", enabled: true, description: "QR Code check-in" },
  });

  // ── Users ──
  const superAdmin = await prisma.user.create({
    data: { tenantId: tid, email: "admin@vikingsgym.in", password, name: "Vikings Admin", phone: "7764922023", role: "SUPER_ADMIN" },
  });

  const gymOwner = await prisma.user.create({
    data: { tenantId: tid, email: "owner@vikingsgym.in", password, name: "Raj Kumar", phone: "9876543210", role: "GYM_OWNER" },
  });

  await prisma.user.create({
    data: { tenantId: tid, email: "reception@vikingsgym.in", password, name: "Priya Sharma", phone: "9876543211", role: "RECEPTIONIST" },
  });

  // ── Trainers ──
  const trainerUsers = await Promise.all([
    prisma.user.create({
      data: {
        tenantId: tid, email: "rahul.trainer@vikingsgym.in", password, name: "Rahul Singh", phone: "9876543220", role: "TRAINER",
        trainer: { create: { tenantId: tid, experience: 5, certifications: "ACE Certified,NASM-CPT,Sports Nutrition", specialization: "Strength & Conditioning,Bodybuilding", salary: 25000, bio: "5+ years in strength training and bodybuilding.", rating: 4.8 } },
      },
      include: { trainer: true },
    }),
    prisma.user.create({
      data: {
        tenantId: tid, email: "amit.trainer@vikingsgym.in", password, name: "Amit Verma", phone: "9876543221", role: "TRAINER",
        trainer: { create: { tenantId: tid, experience: 3, certifications: "ISSA Certified,CrossFit L1", specialization: "CrossFit,Functional Training,Weight Loss", salary: 20000, bio: "CrossFit enthusiast.", rating: 4.6 } },
      },
      include: { trainer: true },
    }),
    prisma.user.create({
      data: {
        tenantId: tid, email: "sneha.trainer@vikingsgym.in", password, name: "Sneha Gupta", phone: "9876543222", role: "TRAINER",
        trainer: { create: { tenantId: tid, experience: 4, certifications: "Yoga Alliance RYT-200,Pilates Certified", specialization: "Yoga,Flexibility,Rehabilitation", salary: 22000, bio: "Certified yoga instructor.", rating: 4.9 } },
      },
      include: { trainer: true },
    }),
    prisma.user.create({
      data: {
        tenantId: tid, email: "vikash.trainer@vikingsgym.in", password, name: "Vikash Kumar", phone: "9876543223", role: "TRAINER",
        trainer: { create: { tenantId: tid, experience: 6, certifications: "NSCA-CSCS,Sports Performance Coach", specialization: "Sports Performance,Cardio Training,Nutrition", salary: 28000, bio: "Former state-level athlete.", rating: 4.7 } },
      },
      include: { trainer: true },
    }),
  ]);

  // ── Membership Plans ──
  const plans = await Promise.all([
    prisma.membershipPlan.create({ data: { tenantId: tid, name: "Monthly", duration: 1, price: 1500, description: "Perfect for trying out our facilities", features: "Full Gym Access,Locker Room Access,Free Fitness Assessment,Basic Workout Plan", isActive: true, sortOrder: 1 } }),
    prisma.membershipPlan.create({ data: { tenantId: tid, name: "Quarterly", duration: 3, price: 4000, discountPrice: 3800, description: "Best value for committed members", features: "Full Gym Access,Locker Room Access,Free Fitness Assessment,Personalized Workout Plan,Diet Consultation,1 Personal Training Session", isActive: true, isPopular: true, sortOrder: 2 } }),
    prisma.membershipPlan.create({ data: { tenantId: tid, name: "Half-Yearly", duration: 6, price: 7000, description: "For serious fitness enthusiasts", features: "Full Gym Access,Locker Room Access,Free Fitness Assessment,Personalized Workout Plan,Monthly Diet Plan,3 Personal Training Sessions,Progress Tracking", isActive: true, sortOrder: 3 } }),
    prisma.membershipPlan.create({ data: { tenantId: tid, name: "Annual", duration: 12, price: 12000, description: "Best value — premium plan with maximum benefits", features: "Full Gym Access,Locker Room Access,Free Fitness Assessment,Personalized Workout Plan,Weekly Diet Plan,6 Personal Training Sessions,Progress Tracking,Priority Support,Guest Pass (2/month)", isActive: true, sortOrder: 4 } }),
  ]);

  // ── Members ──
  const memberData = [
    { name: "Arjun Patel", email: "arjun@email.com", phone: "9876543001", gender: "MALE", weight: 75, height: 175, goal: "Muscle Gain" },
    { name: "Neha Sharma", email: "neha@email.com", phone: "9876543002", gender: "FEMALE", weight: 62, height: 160, goal: "Weight Loss" },
    { name: "Ravi Kumar", email: "ravi@email.com", phone: "9876543003", gender: "MALE", weight: 85, height: 180, goal: "Strength Training" },
    { name: "Anita Devi", email: "anita@email.com", phone: "9876543004", gender: "FEMALE", weight: 58, height: 155, goal: "General Fitness" },
    { name: "Suresh Yadav", email: "suresh@email.com", phone: "9876543005", gender: "MALE", weight: 90, height: 178, goal: "Weight Loss" },
    { name: "Pooja Mishra", email: "pooja@email.com", phone: "9876543006", gender: "FEMALE", weight: 55, height: 162, goal: "Flexibility" },
    { name: "Mohit Gupta", email: "mohit@email.com", phone: "9876543007", gender: "MALE", weight: 70, height: 172, goal: "Bodybuilding" },
    { name: "Kavita Singh", email: "kavita@email.com", phone: "9876543008", gender: "FEMALE", weight: 65, height: 158, goal: "Endurance" },
    { name: "Deepak Verma", email: "deepak@email.com", phone: "9876543009", gender: "MALE", weight: 78, height: 176, goal: "Sports Training" },
    { name: "Suman Kumari", email: "suman@email.com", phone: "9876543010", gender: "FEMALE", weight: 60, height: 163, goal: "Weight Loss" },
    { name: "Aakash Jha", email: "aakash@email.com", phone: "9876543011", gender: "MALE", weight: 82, height: 182, goal: "Muscle Gain" },
    { name: "Ritika Sinha", email: "ritika@email.com", phone: "9876543012", gender: "FEMALE", weight: 57, height: 157, goal: "General Fitness" },
  ];

  const members = [];
  for (let i = 0; i < memberData.length; i++) {
    const m = memberData[i];
    const trainerId = trainerUsers[i % trainerUsers.length].trainer!.id;
    const user = await prisma.user.create({
      data: {
        tenantId: tid, email: m.email, password, name: m.name, phone: m.phone, role: "MEMBER",
        member: {
          create: {
            tenantId: tid, gender: m.gender, weight: m.weight, height: m.height, fitnessGoal: m.goal,
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

  // ── Memberships ──
  for (let i = 0; i < members.length; i++) {
    const planIndex = i % plans.length;
    const startDate = new Date(Date.now() - Math.floor(Math.random() * 60) * 86400000);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + plans[planIndex].duration);
    const status = i < 9 ? "ACTIVE" : i === 9 ? "FROZEN" : "EXPIRED";

    await prisma.membership.create({
      data: {
        tenantId: tid, memberId: members[i].member!.id, planId: plans[planIndex].id,
        startDate, endDate: status === "EXPIRED" ? new Date(Date.now() - 5 * 86400000) : endDate,
        status: status as any,
      },
    });
  }

  // ── Payments ──
  for (let i = 0; i < members.length; i++) {
    const planIndex = i % plans.length;
    await prisma.payment.create({
      data: {
        tenantId: tid, memberId: members[i].member!.id,
        amount: plans[planIndex].price, totalAmount: plans[planIndex].price,
        method: ["CASH", "UPI", "CARD", "RAZORPAY"][i % 4] as any,
        status: "PAID", description: `Membership: ${plans[planIndex].name}`,
        invoiceNumber: `VGM-SEED-${i + 1}`,
        paidAt: new Date(Date.now() - Math.random() * 60 * 86400000),
      },
    });
  }

  // ── Attendance ──
  for (let day = 0; day < 30; day++) {
    const date = new Date(Date.now() - day * 86400000);
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
          tenantId: tid, memberId: member.member!.id, date: new Date(date), checkIn,
          checkOut: day > 0 ? checkOut : (Math.random() > 0.5 ? checkOut : null),
          method: Math.random() > 0.3 ? "QR" : "MANUAL",
        },
      });
    }
  }

  // ── Progress ──
  for (const member of members.slice(0, 6)) {
    for (let month = 5; month >= 0; month--) {
      const date = new Date();
      date.setMonth(date.getMonth() - month);
      const baseWeight = member.member!.weight || 70;

      await prisma.progressTracking.create({
        data: {
          tenantId: tid, memberId: member.member!.id, date,
          weight: Math.round((baseWeight + (member.member!.fitnessGoal === "Weight Loss" ? month * 1.2 : -month * 0.5)) * 10) / 10,
          chest: 38 + Math.random() * 4, waist: 32 - month * 0.3, arms: 13 + month * 0.2,
          bmi: 22 + Math.random() * 4, bodyFatPercent: 20 - month * 0.8,
        },
      });
    }
  }

  // ── Leads ──
  await prisma.lead.createMany({
    data: [
      { tenantId: tid, name: "Rohit Sharma", phone: "9876543100", email: "rohit@email.com", source: "WALK_IN", stage: "NEW_LEAD" },
      { tenantId: tid, name: "Sunita Devi", phone: "9876543101", email: "sunita@email.com", source: "SOCIAL_MEDIA", stage: "CONTACTED" },
      { tenantId: tid, name: "Manish Tiwari", phone: "9876543102", email: "manish@email.com", source: "REFERRAL", stage: "TRIAL_SCHEDULED" },
      { tenantId: tid, name: "Meena Kumari", phone: "9876543103", email: "meena@email.com", source: "WEBSITE", stage: "TRIAL_COMPLETED" },
      { tenantId: tid, name: "Ajay Singh", phone: "9876543104", email: "ajay@email.com", source: "PHONE", stage: "NEW_LEAD" },
      { tenantId: tid, name: "Rekha Patel", phone: "9876543105", email: "rekha@email.com", source: "SOCIAL_MEDIA", stage: "CONTACTED" },
      { tenantId: tid, name: "Vijay Kumar", phone: "9876543106", source: "WALK_IN", stage: "CONVERTED" },
      { tenantId: tid, name: "Geeta Devi", phone: "9876543107", source: "REFERRAL", stage: "LOST" },
      { tenantId: tid, name: "Pankaj Mishra", phone: "9876543108", email: "pankaj@email.com", source: "WEBSITE", stage: "NEW_LEAD" },
      { tenantId: tid, name: "Shweta Gupta", phone: "9876543109", source: "PHONE", stage: "TRIAL_SCHEDULED" },
    ] as any,
  });

  // ── Inventory ──
  await prisma.inventoryItem.createMany({
    data: [
      { tenantId: tid, name: "Whey Protein (1kg)", category: "SUPPLEMENT", quantity: 25, minQuantity: 5, unitPrice: 2500, sellingPrice: 2500 },
      { tenantId: tid, name: "BCAA Powder", category: "SUPPLEMENT", quantity: 15, minQuantity: 5, unitPrice: 1200, sellingPrice: 1200 },
      { tenantId: tid, name: "Pre-Workout", category: "SUPPLEMENT", quantity: 3, minQuantity: 5, unitPrice: 1800, sellingPrice: 1800 },
      { tenantId: tid, name: "Vikings T-Shirt", category: "MERCHANDISE", quantity: 50, minQuantity: 10, unitPrice: 400, sellingPrice: 699 },
      { tenantId: tid, name: "Vikings Hoodie", category: "MERCHANDISE", quantity: 20, minQuantity: 5, unitPrice: 800, sellingPrice: 1499 },
      { tenantId: tid, name: "Gym Gloves", category: "ACCESSORY", quantity: 30, minQuantity: 10, unitPrice: 250, sellingPrice: 499 },
      { tenantId: tid, name: "Resistance Bands Set", category: "ACCESSORY", quantity: 12, minQuantity: 5, unitPrice: 400, sellingPrice: 799 },
      { tenantId: tid, name: "Shaker Bottle", category: "ACCESSORY", quantity: 40, minQuantity: 10, unitPrice: 150, sellingPrice: 299 },
      { tenantId: tid, name: "Yoga Mat", category: "EQUIPMENT", quantity: 2, minQuantity: 5, unitPrice: 500, sellingPrice: 899 },
      { tenantId: tid, name: "Jump Rope", category: "ACCESSORY", quantity: 8, minQuantity: 5, unitPrice: 200, sellingPrice: 399 },
    ] as any,
  });

  // ── Coupons ──
  await prisma.coupon.createMany({
    data: [
      { tenantId: tid, code: "WELCOME10", discountType: "PERCENTAGE", discountValue: 10, maxUses: 100, minAmount: 1000, validUntil: new Date("2026-12-31"), isActive: true },
      { tenantId: tid, code: "SUMMER500", discountType: "FIXED", discountValue: 500, maxUses: 50, minAmount: 3000, validUntil: new Date("2026-09-30"), isActive: true },
      { tenantId: tid, code: "VIKINGVIP", discountType: "PERCENTAGE", discountValue: 20, maxUses: 20, minAmount: 5000, validUntil: new Date("2026-12-31"), isActive: true },
    ] as any,
  });

  // ── Announcements ──
  await prisma.announcement.createMany({
    data: [
      { tenantId: tid, title: "Summer Special Offer!", content: "Get 20% off on all annual memberships this summer! Use code SUMMER500 at checkout.", isActive: true, priority: 1 },
      { tenantId: tid, title: "New Yoga Classes Starting Soon", content: "New yoga and meditation classes starting next week. Join us every morning at 7 AM!", isActive: true, priority: 0 },
      { tenantId: tid, title: "Gym Closed on Independence Day", content: "Vikings Gym will remain closed on August 15th in observance of Independence Day.", isActive: true, priority: 2 },
    ] as any,
  });

  // ── Blog ──
  await prisma.blogPost.createMany({
    data: [
      { tenantId: tid, title: "5 Essential Tips for Beginners at the Gym", slug: "5-tips-for-gym-beginners", content: "Starting your fitness journey can be overwhelming. Here are 5 essential tips...\n\n1. Start Slow\n2. Stay Hydrated\n3. Get Proper Rest\n4. Follow a Plan\n5. Be Consistent", excerpt: "Starting your fitness journey can be overwhelming. Here are 5 essential tips.", author: "Rahul Singh", tags: "fitness,beginners,tips,workout", isPublished: true, publishedAt: new Date("2026-01-15") },
      { tenantId: tid, title: "The Ultimate Guide to Building Muscle Mass", slug: "ultimate-guide-building-muscle", content: "Building muscle requires a combination of proper training, nutrition, and recovery...\n\nTraining: Focus on compound movements.\nNutrition: Consume 1.6-2.2g protein per kg body weight.\nRecovery: Allow 48-72 hours between training.", excerpt: "Complete guide to building muscle mass effectively.", author: "Vikash Kumar", tags: "muscle,bodybuilding,nutrition,training", isPublished: true, publishedAt: new Date("2026-02-10") },
      { tenantId: tid, title: "Nutrition Myths Debunked: What Really Works", slug: "nutrition-myths-debunked", content: "Common nutrition myths debunked...\n\nMyth 1: Carbs are bad — False.\nMyth 2: You need supplements — Not if balanced.\nMyth 3: Eating fat makes you fat — Healthy fats are essential.", excerpt: "Separating nutrition fact from fiction.", author: "Sneha Gupta", tags: "nutrition,diet,health,myths", isPublished: true, publishedAt: new Date("2026-03-05") },
    ] as any,
  });

  console.log("✅ Seed completed successfully!");
  console.log("📊 Created: 1 Tenant, 3 Admins, 4 Trainers, 12 Members, 4 Plans, 30d Attendance, 12 Payments, 10 Leads, 10 Inventory Items, 3 Coupons, 3 Announcements, 3 Blog Posts");
  console.log("🔑 Login: admin@vikingsgym.in / password123");
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
