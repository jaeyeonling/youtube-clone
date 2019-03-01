import passport from 'passport'
import GithubStrategy from 'passport-github'

import routes from './routes'
import User from './models/User'
import { githubLoginCallback } from './controllers/userController'

passport.use(User.createStrategy())
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback,
  )
)

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())