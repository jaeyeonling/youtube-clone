import passport from 'passport'
import GithubStrategy from 'passport-github'
import FacebookStrategy from 'passport-facebook'

import routes from './routes'
import User from './models/User'
import { githubLoginCallback, facebookLoginCallback } from './controllers/userController'

passport.use(User.createStrategy())
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `${process.env.SERVER_HOST}${routes.githubCallback}`,
    },
    githubLoginCallback,
  )
)
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: `${process.env.SERVER_HOST}${routes.facebookCallback}`,
      profileFields: [ 
        'id', 
        'displayName', 
        'photos', 
        'email',
      ],
      scope: [
        'public_profile', 
        'email',
      ],
    },
    facebookLoginCallback,
  )
)

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())