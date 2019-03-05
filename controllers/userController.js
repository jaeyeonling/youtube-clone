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

export const getGithubLogin = passport.authenticate('github')
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home)
}
export const githubLoginCallback = async (accessToken, refreshToken, profile, callback) => {
  const {
    _json: {
      id,
      avatar_url: avatarUrl,
      name,
      email,
    },
  } = profile

  if (!id) {
    return callback(new Error('id is empty'))
  }
  if (!name) {
    return callback(new Error('name is empty'))
  }
  if (!email) {
    return callback(new Error('email is empty'))
  }

  try {
    let user = await User.findOne({
      email,
    })

    if (!user) {
      user = await User.create({
        email,
        name,
        avatarUrl,
      })
    }

    user.githubId = id
    user.save()

    return callback(null, user)
  } catch (err) {
    return callback(err)
  }
}

export const getFacebookLogin = passport.authenticate('facebook')
export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home)
}
export const facebookLoginCallback = async (accessToken, refreshToken, profile, callback) => {
  const {
    _json: {
      id,
      name,
      email,
    },
  } = profile

  if (!id) {
    return callback(new Error('id is empty'))
  }
  if (!name) {
    return callback(new Error('name is empty'))
  }
  if (!email) {
    return callback(new Error('email is empty'))
  }

  try {
    let user = await User.findOne({
      email,
    })

    if (!user) {
      user = await User.create({
        email,
        name,
        avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
      })
    }

    user.facebookId = id
    user.save()

    return callback(null, user)
  } catch (err) {
    return callback(err)
  }
}

export const logout = (req, res) => {
  req.logout()
  res.redirect(routes.home)
}

export const userDetails = async (req, res) => {
  const {
    params: {
      userId,
    },
  } = req

  try {
    const user = await User.findById(userId).populate('videos')

    res.render('userDetail', {
      pageTitle: user.name,
      user,
    })
  } catch (err) {
    console.error(err)
    res.redirect(routes.home)
  }
}
export const getEditProfile = (req, res) =>
  res.render('editProfile', { pageTitle: 'Edit Profile' })

export const postEditProfile = async (req, res) => {
  const {
    body: {
      name,
    },
    file,
  } = req


  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name,
      avatarUrl: file && file.path ? file.path : req.user.avatarUrl,
    })

    res.redirect(routes.userDetail(user.id))
  } catch (err) {
    console.error(err)
    res.render('editProfile', {
      pageTitle: 'Edit Profile',
    })
  }
}

  
export const getChangePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'Change Password' })

export const postChangePassword = async (req, res) => {
  const {
    body: {
      currentPassword,
      newPassword,
      verifyNewPassword,
    },
  } = req

  if (newPassword === verifyNewPassword) {
    try {
      await req.user.changePassword(currentPassword, newPassword)
      res.redirect(routes.userDetail(req.user.id))
    } catch (err) {
      console.error(err)
    }
  }

  res.status(400)
  res.redirect(`${routes.users}${routes.changePassword}`)
}
