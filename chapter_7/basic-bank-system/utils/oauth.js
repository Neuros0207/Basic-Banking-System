const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://long-jade-gharial-wrap.cyclic.app/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log(profile);
        const findUsers = await prisma.accounts.findFirst({
          where: {
            email: profile.emails[0].value,
          },
          select: {
            user_id: true,
            account_id: true,
            account_number: true,
            email: true,
            balance: true,
            googleId: true,
            status: true,
            role: true,
            users: {
              select: {
                user_id: true,
                user_name: true,
                identity_number: true,
                profiles: true,
              },
            },
          },
        });
        let user = await prisma.accounts.upsert({
          where: {
            account_id: findUsers.account_id,
          },
          update: {
            googleId: profile.id,
          },
          create: {
            email: profile.emails[0].value,
            googleId: profile.id,
            password: "null",
            status: "Open",
            role: "User",
            users: {
              create: {
                user_name: findUsers.users.user_name,
                identity_number: findUsers.users.identity_number,
              },
            },
          },
        });
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
module.exports = passport;
