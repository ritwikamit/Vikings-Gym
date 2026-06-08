const fs = require('fs');

let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

// Replace datasource
schema = schema.replace(/provider = "postgresql"/, 'provider = "sqlite"');
schema = schema.replace(/url\s+=\s+env\("DATABASE_URL"\)/, 'url      = "file:./dev.db"');

// Remove enums and map them to Strings
const enumsToRemove = [
  'UserRole', 'Gender', 'MembershipStatus', 'PaymentStatus', 'PaymentMethod',
  'AttendanceMethod', 'LeadStage', 'LeadSource', 'NotificationType',
  'NotificationChannel', 'InventoryCategory', 'DiscountType', 'ReferralStatus'
];

for (const e of enumsToRemove) {
  const regex = new RegExp(`enum ${e} \\{[\\s\\S]*?\\}`, 'g');
  schema = schema.replace(regex, '');
  
  // Replace enum usages
  const usageRegex = new RegExp(`\\b${e}\\b`, 'g');
  schema = schema.replace(usageRegex, 'String');
}

// Replace @default(ENUM_VAL) to @default("ENUM_VAL")
const enumVals = [
  'SUPER_ADMIN', 'GYM_OWNER', 'RECEPTIONIST', 'TRAINER', 'MEMBER', 'MALE', 'FEMALE',
  'OTHER', 'ACTIVE', 'EXPIRED', 'FROZEN', 'CANCELLED', 'PENDING', 'COMPLETED',
  'FAILED', 'REFUNDED', 'CASH', 'UPI', 'CARD', 'NET_BANKING', 'RAZORPAY',
  'QR_CODE', 'MANUAL', 'NEW_LEAD', 'CONTACTED', 'TRIAL_SCHEDULED', 'TRIAL_COMPLETED',
  'CONVERTED', 'LOST', 'WALK_IN', 'REFERRAL', 'SOCIAL_MEDIA', 'WEBSITE', 'PHONE',
  'MEMBERSHIP_EXPIRY', 'PAYMENT_REMINDER', 'BIRTHDAY', 'ANNOUNCEMENT', 'GENERAL',
  'EMAIL', 'WHATSAPP', 'IN_APP', 'SUPPLEMENT', 'MERCHANDISE', 'ACCESSORY',
  'EQUIPMENT', 'PERCENTAGE', 'FIXED'
];

for (const val of enumVals) {
  const defaultRegex = new RegExp(`@default\\(${val}\\)`, 'g');
  schema = schema.replace(defaultRegex, `@default("${val}")`);
}

// Replace String[] with String
schema = schema.replace(/String\[\]/g, 'String');

fs.writeFileSync('prisma/schema.prisma', schema);
console.log("Schema converted to SQLite!");
