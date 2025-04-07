import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupDuplicateUsers() {
  try {
    // Get all users from the database, grouped by email
    const users = await prisma.user.findMany({
      where: {},
      select: {
        id: true,
        email: true,
      },
    });

    // Find duplicates by grouping by email
    const groupedUsers = users.reduce((acc, user) => {
      if (!acc[user.userEmail]) {
        acc[user.userEmail] = [];
      }
      acc[user.userEmail].push(user);
      return acc;
    }, {});

    // Iterate over each group of users with the same email
    for (const email in groupedUsers) {
      const usersWithSameEmail = groupedUsers[email];
      
      if (usersWithSameEmail.length > 1) {
        // Keep the first user and delete the others
        const userToKeep = usersWithSameEmail[0];

        console.log(`Keeping user with email: ${email}, deleting ${usersWithSameEmail.length - 1} duplicates.`);

        // Delete all other users with the same email
        for (let i = 1; i < usersWithSameEmail.length; i++) {
          const userToDelete = usersWithSameEmail[i];

          // Delete user by ID
          await prisma.user.delete({
            where: {
              id: userToDelete.id,
            },
          });

          console.log(`Deleted user with ID: ${userToDelete.id}`);
        }
      }
    }

    console.log('Cleanup completed successfully.');
  } catch (error) {
    console.error('Error cleaning up users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupDuplicateUsers();
