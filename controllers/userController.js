import passport from 'passport'

import routes from '../routes'
import User from '../models/User'

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'join' })
}

export const postJoin = async (req, res, next) => {
  const {
    body: {
      name,
      email,
      password,
      verifyPassword
    }
  } = req

  if (password !== verifyPassword) {
    res.status(400)
    res.render('join', { pageTitle: 'join' })
    return
  }

  try {
    const user = await User({
      name,
      email,
    })
    await User.register(user, password)

    next()
  } catch (err) {
    console.error(err)
    res.redirect(routes.home)
  }
}

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' })
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
})

export const logout = (req, res) => {
  // TODO: precess log out

  res.redirect(routes.home)
}

export const userDetails = (req, res) => res.send('Logout')
export const editProfile = (req, res) =>
  res.render('editProfile', { pageTitle: 'Edit Profile' })
export const changePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'Change Password' })
