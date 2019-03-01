import express from 'express'
import passport from 'passport'

import routes from '../routes'
import { home, search } from '../controllers/videoController'
import { 
  getJoin, postJoin, 
  getLogin, postLogin, 
  logout, 
  getGithubLogin, postGithubLogin, 
  getFacebookLogin, postFacebookLogin, 
} from '../controllers/userController'
import { onlyPublic, onlyPrivate } from '../middlewares'

const globalRouter = express.Router()

globalRouter.get(routes.home, home)

globalRouter.get(routes.join, onlyPublic, getJoin)
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin)

globalRouter.get(routes.login, onlyPublic, getLogin)
globalRouter.post(routes.login, onlyPublic, postLogin)

globalRouter.get(routes.logout, onlyPrivate, logout)
globalRouter.get(routes.search, search)

globalRouter.get(routes.github, getGithubLogin)
globalRouter.get(
  routes.githubCallback, 
  passport.authenticate('github', {
    failureRedirect: routes.login,
  }),
  postGithubLogin,
)

globalRouter.get(routes.facebook, getFacebookLogin)
globalRouter.get(
  routes.facebookCallback, 
  passport.authenticate('facebook', {
    failureRedirect: routes.login,
  }),
  postFacebookLogin,
)

export default globalRouter