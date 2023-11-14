const { PrismaClient } = require('@prisma/client')
const { hashPassword } = require('../utils/auth')
const prisma = new PrismaClient()

async function main() {
  const seedUsers = await prisma.users.create({
    data: {
      user_name: 'Super Admin',
      identity_number: '666666666',
      profiles: {
        create: {
          identity_type: 'KTP',
          address: 'Balikpapan',
          profile_picture: 'https://ik.imagekit.io/neuros123/default-profile-pic.png',
          phone_number: ''
        },
      },
    },
  })
  const hashed_password = await hashPassword("12345678")
  const seedAccounts = await prisma.accounts.create({
    data: {
      user_id: 1,
      password: hashed_password,
      email: "superadmin@gmail.com",
      status : "Open",
      role: "Admin"
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })