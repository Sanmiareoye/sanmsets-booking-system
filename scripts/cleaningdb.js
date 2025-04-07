// scripts/cleaningdb.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    console.log("Starting database cleanup...");

    // Delete all records from all tables (adjust as needed)
    await prisma.booking.deleteMany();
    await prisma.user.deleteMany();
    // Add other models as needed

    console.log("✅ Database cleaned successfully");
  } catch (error) {
    console.error("❌ Error cleaning database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanDatabase();
