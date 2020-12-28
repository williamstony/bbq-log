import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {

  // Configure one or more authentication providers

  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
],
// database: {
//     type: "mongodb",
//     useNewUrlParser: true,
//     url: process.env.MONGO_URL,
//     ssl: true,
//     useUnifiedTopology: true,
//   },
};

export default (req, res) => NextAuth(req, res, options);