import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.SITE || 'http://localhost:3000',

  // Configure one or more authentication providers

  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
],
database: process.env.MONGO_URL,
};

export default (req, res) => NextAuth(req, res, options);