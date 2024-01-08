const GithubProvider = require("next-auth/providers/github");
const GoogleAuthProvider = require("next-auth/providers/google");
const { getServerSession } = require("next-auth");

const config = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleAuthProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};

function auth(req, res) {
  return getServerSession(req, res, config);
}

module.exports = { config, auth };
